'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ResultsDisplay from './results-display'
import Header from './header'
import HeroSection from './hero-section'
import Footer from './footer'
import { Search } from 'lucide-react'

interface TrainingResult {
  staff_id: string
  full_name: string
  department: string
  acls_theory_marks: number
  acls_practical_marks: number
  bls_theory_marks: number
  bls_practical_marks: number
}

export default function SearchResults() {
  const [staffId, setStaffId] = useState('')
  const [results, setResults] = useState<TrainingResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!staffId.trim()) {
      setError('Please enter a staff ID')
      return
    }

    setLoading(true)
    setError('')
    setResults(null)

    try {
      const response = await fetch(`/api/results?staff_id=${encodeURIComponent(staffId)}`)
      
      if (!response.ok) {
        throw new Error(response.status === 404 ? 'Staff ID not found' : 'Error fetching results')
      }

      const data = await response.json()
      setResults(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    setResults(null)
    setStaffId('')
    setError('')
  }

  if (results) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <ResultsDisplay result={results} onBack={handleBack} />
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <HeroSection />
      
      <div className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-2xl">
          {/* Search Form Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-border/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Search className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-primary">Check Your Results</h2>
            </div>
            <p className="text-muted-foreground mb-6 ml-11">Enter your staff ID to view your ACLS and BLS training results</p>
            
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="staffId" className="block text-sm font-medium text-foreground">
                  Staff ID
                </label>
                <Input
                  id="staffId"
                  type="text"
                  placeholder="e.g., GH-0001"
                  value={staffId}
                  onChange={(e) => setStaffId(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                {loading ? 'Searching...' : 'Check Results'}
              </Button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
