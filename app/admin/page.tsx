"use client"

import { useEffect, useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { toast } from "sonner"
import { ArrowUpDown, PlusCircle, RefreshCcw } from "lucide-react"

interface TrainingResult {
  id?: number
  staff_id: string
  full_name: string
  department: string
  acls_theory_marks: number | null
  acls_practical_marks: number | null
  bls_theory_marks: number | null
  bls_practical_marks: number | null
}

type SortKey = keyof Pick<TrainingResult, "staff_id" | "full_name" | "department" | "acls_theory_marks" | "acls_practical_marks" | "bls_theory_marks" | "bls_practical_marks">

export default function AdminPage() {
  const [results, setResults] = useState<TrainingResult[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState<TrainingResult>({
    staff_id: "",
    full_name: "",
    department: "",
    acls_theory_marks: null,
    acls_practical_marks: null,
    bls_theory_marks: null,
    bls_practical_marks: null,
  })

  const [search, setSearch] = useState("")
  const [sortKey, setSortKey] = useState<SortKey>("staff_id")
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc")
  const [page, setPage] = useState(1)
  const pageSize = 10

  const fetchResults = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/results")
      if (!res.ok) throw new Error("Failed to load results")
      const data = await res.json()
      setResults(data)
    } catch (error) {
      console.error(error)
      toast.error("Failed to load results")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchResults()
  }, [])

  const handleChange = (field: keyof TrainingResult, value: string) => {
    if (
      field === "acls_theory_marks" ||
      field === "acls_practical_marks" ||
      field === "bls_theory_marks" ||
      field === "bls_practical_marks"
    ) {
      setForm((prev) => ({
        ...prev,
        [field]: value === "" ? null : Number(value),
      }))
    } else {
      setForm((prev) => ({
        ...prev,
        [field]: value,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.staff_id.trim() || !form.full_name.trim()) {
      toast.error("Staff ID and Full Name are required")
      return
    }

    setSaving(true)
    try {
      const res = await fetch("/api/admin/results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => null)
        throw new Error(body?.error || "Failed to save result")
      }

      toast.success("Result saved")
      setForm({
        staff_id: "",
        full_name: "",
        department: "",
        acls_theory_marks: null,
        acls_practical_marks: null,
        bls_theory_marks: null,
        bls_practical_marks: null,
      })
      setPage(1)
      fetchResults()
    } catch (error) {
      console.error(error)
      toast.error(error instanceof Error ? error.message : "Failed to save result")
    } finally {
      setSaving(false)
    }
  }

  const toggleSort = (key: SortKey) => {
    setPage(1)
    setSortKey((prevKey) => {
      if (prevKey === key) {
        setSortDir((prevDir) => (prevDir === "asc" ? "desc" : "asc"))
        return prevKey
      }
      setSortDir("asc")
      return key
    })
  }

  const filteredAndSorted = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    let data = results

    if (normalizedSearch) {
      data = data.filter((r) => {
        const haystack = `${r.staff_id} ${r.full_name} ${r.department}`.toLowerCase()
        return haystack.includes(normalizedSearch)
      })
    }

    const sorted = [...data].sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]

      if (aVal == null && bVal == null) return 0
      if (aVal == null) return 1
      if (bVal == null) return -1

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDir === "asc" ? aVal - bVal : bVal - aVal
      }

      const aStr = String(aVal).toLowerCase()
      const bStr = String(bVal).toLowerCase()

      if (aStr < bStr) return sortDir === "asc" ? -1 : 1
      if (aStr > bStr) return sortDir === "asc" ? 1 : -1
      return 0
    })

    return sorted
  }, [results, search, sortKey, sortDir])

  const totalItems = filteredAndSorted.length
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const currentPage = Math.min(page, totalPages)
  const startIndex = (currentPage - 1) * pageSize
  const pageItems = filteredAndSorted.slice(startIndex, startIndex + pageSize)

  const totalPassed = useMemo(
    () =>
      results.filter((r) => {
        if (
          r.acls_theory_marks == null ||
          r.acls_practical_marks == null ||
          r.bls_theory_marks == null ||
          r.bls_practical_marks == null
        ) {
          return false
        }
        const aclsAverage = (r.acls_theory_marks + r.acls_practical_marks) / 2
        const blsAverage = (r.bls_theory_marks + r.bls_practical_marks) / 2
        const overall = (aclsAverage + blsAverage) / 2
        return overall >= 80
      }).length,
    [results],
  )

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-4 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <header className="flex flex-col gap-4 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Manage ACLS / BLS training results for Gudele Hospital staff.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <div className="rounded-lg bg-white px-4 py-2 shadow-sm">
              <p className="text-xs text-muted-foreground">Total Records</p>
              <p className="text-lg font-semibold">{results.length}</p>
            </div>
            <div className="rounded-lg bg-white px-4 py-2 shadow-sm">
              <p className="text-xs text-muted-foreground">Passing (&ge; 80%)</p>
              <p className="text-lg font-semibold">{totalPassed}</p>
            </div>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-[2fr,3fr]">
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between gap-2">
              <div>
                <CardTitle className="text-base sm:text-lg">Add / Update Result</CardTitle>
                <p className="mt-1 text-xs text-muted-foreground">
                  Use the staff ID to create a new record or update an existing one.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() =>
                  setForm({
                    staff_id: "",
                    full_name: "",
                    department: "",
                    acls_theory_marks: null,
                    acls_practical_marks: null,
                    bls_theory_marks: null,
                    bls_practical_marks: null,
                  })
                }
              >
                <PlusCircle className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <Label htmlFor="staff_id">Staff ID</Label>
                    <Input
                      id="staff_id"
                      value={form.staff_id}
                      onChange={(e) => handleChange("staff_id", e.target.value)}
                      placeholder="GH-0001"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                      id="full_name"
                      value={form.full_name}
                      onChange={(e) => handleChange("full_name", e.target.value)}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={form.department}
                      onChange={(e) => handleChange("department", e.target.value)}
                      placeholder="Nursing, Emergency, ICU..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div className="space-y-1">
                    <Label htmlFor="acls_theory">ACLS Theory</Label>
                    <Input
                      id="acls_theory"
                      type="number"
                      min={0}
                      max={100}
                      value={form.acls_theory_marks ?? ""}
                      onChange={(e) => handleChange("acls_theory_marks", e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="acls_practical">ACLS Practical</Label>
                    <Input
                      id="acls_practical"
                      type="number"
                      min={0}
                      max={100}
                      value={form.acls_practical_marks ?? ""}
                      onChange={(e) => handleChange("acls_practical_marks", e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="bls_theory">BLS Theory</Label>
                    <Input
                      id="bls_theory"
                      type="number"
                      min={0}
                      max={100}
                      value={form.bls_theory_marks ?? ""}
                      onChange={(e) => handleChange("bls_theory_marks", e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="bls_practical">BLS Practical</Label>
                    <Input
                      id="bls_practical"
                      type="number"
                      min={0}
                      max={100}
                      value={form.bls_practical_marks ?? ""}
                      onChange={(e) => handleChange("bls_practical_marks", e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs text-muted-foreground">
                    Tip: Leave score fields empty if a staff member has not completed a component yet.
                  </p>
                  <div className="flex gap-2">
                    <Button type="button" variant="outline" onClick={() => fetchResults()} disabled={loading}>
                      <RefreshCcw className="mr-1 h-4 w-4" />
                      Refresh List
                    </Button>
                    <Button type="submit" disabled={saving}>
                      {saving ? "Saving..." : "Save Result"}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-base sm:text-lg">Existing Results</CardTitle>
                <p className="mt-1 text-xs text-muted-foreground">
                  Search, sort and browse all recorded training results.
                </p>
              </div>
              <div className="flex w-full items-center gap-2 sm:w-auto">
                <Input
                  placeholder="Search by staff ID, name or department..."
                  value={search}
                  onChange={(e) => {
                    setPage(1)
                    setSearch(e.target.value)
                  }}
                  className="h-9 text-sm"
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-3 pt-4">
              {loading ? (
                <p className="text-sm text-muted-foreground">Loading...</p>
              ) : totalItems === 0 ? (
                <p className="text-sm text-muted-foreground">No results found.</p>
              ) : (
                <>
                  <div className="border rounded-md overflow-auto max-h-[500px] bg-white">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="whitespace-nowrap">
                            <button
                              type="button"
                              className="inline-flex items-center gap-1 text-xs font-semibold"
                              onClick={() => toggleSort("staff_id")}
                            >
                              Staff ID
                              <ArrowUpDown className="h-3 w-3" />
                            </button>
                          </TableHead>
                          <TableHead className="whitespace-nowrap">
                            <button
                              type="button"
                              className="inline-flex items-center gap-1 text-xs font-semibold"
                              onClick={() => toggleSort("full_name")}
                            >
                              Name
                              <ArrowUpDown className="h-3 w-3" />
                            </button>
                          </TableHead>
                          <TableHead className="whitespace-nowrap">
                            <button
                              type="button"
                              className="inline-flex items-center gap-1 text-xs font-semibold"
                              onClick={() => toggleSort("department")}
                            >
                              Dept
                              <ArrowUpDown className="h-3 w-3" />
                            </button>
                          </TableHead>
                          <TableHead className="whitespace-nowrap text-center">
                            <button
                              type="button"
                              className="inline-flex items-center gap-1 text-xs font-semibold"
                              onClick={() => toggleSort("acls_theory_marks")}
                            >
                              ACLS T
                              <ArrowUpDown className="h-3 w-3" />
                            </button>
                          </TableHead>
                          <TableHead className="whitespace-nowrap text-center">
                            <button
                              type="button"
                              className="inline-flex items-center gap-1 text-xs font-semibold"
                              onClick={() => toggleSort("acls_practical_marks")}
                            >
                              ACLS P
                              <ArrowUpDown className="h-3 w-3" />
                            </button>
                          </TableHead>
                          <TableHead className="whitespace-nowrap text-center">
                            <button
                              type="button"
                              className="inline-flex items-center gap-1 text-xs font-semibold"
                              onClick={() => toggleSort("bls_theory_marks")}
                            >
                              BLS T
                              <ArrowUpDown className="h-3 w-3" />
                            </button>
                          </TableHead>
                          <TableHead className="whitespace-nowrap text-center">
                            <button
                              type="button"
                              className="inline-flex items-center gap-1 text-xs font-semibold"
                              onClick={() => toggleSort("bls_practical_marks")}
                            >
                              BLS P
                              <ArrowUpDown className="h-3 w-3" />
                            </button>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pageItems.map((r) => (
                          <TableRow key={r.staff_id} className="hover:bg-slate-50">
                            <TableCell className="font-mono text-xs">{r.staff_id}</TableCell>
                            <TableCell className="text-sm">{r.full_name}</TableCell>
                            <TableCell className="text-sm">{r.department}</TableCell>
                            <TableCell className="text-center text-xs">{r.acls_theory_marks ?? "-"}</TableCell>
                            <TableCell className="text-center text-xs">{r.acls_practical_marks ?? "-"}</TableCell>
                            <TableCell className="text-center text-xs">{r.bls_theory_marks ?? "-"}</TableCell>
                            <TableCell className="text-center text-xs">{r.bls_practical_marks ?? "-"}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="flex flex-col items-center justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
                    <p>
                      Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                      <span className="font-medium">{Math.min(startIndex + pageSize, totalItems)}</span> of{" "}
                      <span className="font-medium">{totalItems}</span> records
                    </p>
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              setPage((prev) => Math.max(1, prev - 1))
                            }}
                          />
                        </PaginationItem>
                        {Array.from({ length: totalPages }).map((_, index) => {
                          const pageNumber = index + 1
                          return (
                            <PaginationItem key={pageNumber}>
                              <PaginationLink
                                href="#"
                                isActive={pageNumber === currentPage}
                                onClick={(e) => {
                                  e.preventDefault()
                                  setPage(pageNumber)
                                }}
                              >
                                {pageNumber}
                              </PaginationLink>
                            </PaginationItem>
                          )
                        })}
                        <PaginationItem>
                          <PaginationNext
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              setPage((prev) => Math.min(totalPages, prev + 1))
                            }}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
