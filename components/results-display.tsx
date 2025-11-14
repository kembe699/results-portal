'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft, Check, AlertCircle } from 'lucide-react'

interface TrainingResult {
  staff_id: string
  full_name: string
  department: string
  acls_theory_marks: number
  acls_practical_marks: number
  bls_theory_marks: number
  bls_practical_marks: number
}

interface ResultsDisplayProps {
  result: TrainingResult
  onBack: () => void
}

export default function ResultsDisplay({ result, onBack }: ResultsDisplayProps) {
  const aclsAverage = Math.round((result.acls_theory_marks + result.acls_practical_marks) / 2)
  const blsAverage = Math.round((result.bls_theory_marks + result.bls_practical_marks) / 2)
  const overallAverage = Math.round((aclsAverage + blsAverage) / 2)

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getStatusBadgeColor = (score: number) => {
    if (score >= 90) return 'bg-green-50 text-green-700'
    if (score >= 80) return 'bg-blue-50 text-blue-700'
    if (score >= 70) return 'bg-yellow-50 text-yellow-700'
    return 'bg-red-50 text-red-700'
  }

  const passed = overallAverage >= 80

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Section - Employee Info */}
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
          {/* Header with Back Button */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-primary mb-2">Training Results</h1>
              <p className="text-muted-foreground">Your ACLS and BLS Certification Scores</p>
            </div>
            <Button
              onClick={onBack}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Check Another Result
            </Button>
          </div>

          {/* Employee Information Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border-t-4 border-primary">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-muted-foreground font-medium mb-1">Full Name</p>
                <p className="text-xl font-bold text-foreground">{result.full_name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium mb-1">Staff ID</p>
                <p className="text-xl font-bold text-primary">{result.staff_id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium mb-1">Department</p>
                <p className="text-xl font-bold text-foreground">{result.department}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium mb-1">Overall Score</p>
                <div className="flex items-center gap-2">
                  <p className={`text-3xl font-bold ${getScoreColor(overallAverage)}`}>
                    {overallAverage}%
                  </p>
                  {passed ? (
                    <Check className="w-6 h-6 text-green-600" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Results Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border">
                  <th className="px-3 py-4 text-left text-xs sm:text-sm font-semibold text-primary w-1/4">Program</th>
                  <th className="px-2 sm:px-4 py-4 text-center text-xs sm:text-sm font-semibold text-foreground w-1/6">Theory</th>
                  <th className="px-2 sm:px-4 py-4 text-center text-xs sm:text-sm font-semibold text-foreground w-1/6">Practical</th>
                  <th className="px-2 sm:px-4 py-4 text-center text-xs sm:text-sm font-semibold text-foreground w-1/6">Avg</th>
                  <th className="px-2 sm:px-4 py-4 text-center text-xs sm:text-sm font-semibold text-foreground w-1/6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {/* ACLS Row */}
                <tr className="hover:bg-primary/5 transition-colors">
                  <td className="px-3 py-4">
                    <div>
                      <p className="font-semibold text-xs sm:text-sm text-foreground">ACLS</p>
                      <p className="text-xs text-muted-foreground hidden sm:block">Advanced Cardiovascular</p>
                    </div>
                  </td>
                  <td className="px-2 sm:px-4 py-4 text-center">
                    <p className={`text-base sm:text-lg font-bold ${getScoreColor(result.acls_theory_marks)}`}>
                      {result.acls_theory_marks}
                    </p>
                    <p className="text-xs text-muted-foreground">/100</p>
                  </td>
                  <td className="px-2 sm:px-4 py-4 text-center">
                    <p className={`text-base sm:text-lg font-bold ${getScoreColor(result.acls_practical_marks)}`}>
                      {result.acls_practical_marks}
                    </p>
                    <p className="text-xs text-muted-foreground">/100</p>
                  </td>
                  <td className="px-2 sm:px-4 py-4 text-center">
                    <div className={`inline-flex items-center justify-center px-2 py-1 rounded-full font-bold text-xs sm:text-sm ${getStatusBadgeColor(aclsAverage)}`}>
                      {aclsAverage}%
                    </div>
                  </td>
                  <td className="px-2 sm:px-4 py-4 text-center">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${aclsAverage >= 80 ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                      {aclsAverage >= 80 ? '✓' : '!'} {aclsAverage >= 80 ? 'Pass' : 'Review'}
                    </span>
                  </td>
                </tr>

                {/* BLS Row */}
                <tr className="hover:bg-secondary/5 transition-colors">
                  <td className="px-3 py-4">
                    <div>
                      <p className="font-semibold text-xs sm:text-sm text-foreground">BLS</p>
                      <p className="text-xs text-muted-foreground hidden sm:block">Basic Life Support</p>
                    </div>
                  </td>
                  <td className="px-2 sm:px-4 py-4 text-center">
                    <p className={`text-base sm:text-lg font-bold ${getScoreColor(result.bls_theory_marks)}`}>
                      {result.bls_theory_marks}
                    </p>
                    <p className="text-xs text-muted-foreground">/100</p>
                  </td>
                  <td className="px-2 sm:px-4 py-4 text-center">
                    <p className={`text-base sm:text-lg font-bold ${getScoreColor(result.bls_practical_marks)}`}>
                      {result.bls_practical_marks}
                    </p>
                    <p className="text-xs text-muted-foreground">/100</p>
                  </td>
                  <td className="px-2 sm:px-4 py-4 text-center">
                    <div className={`inline-flex items-center justify-center px-2 py-1 rounded-full font-bold text-xs sm:text-sm ${getStatusBadgeColor(blsAverage)}`}>
                      {blsAverage}%
                    </div>
                  </td>
                  <td className="px-2 sm:px-4 py-4 text-center">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${blsAverage >= 80 ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                      {blsAverage >= 80 ? '✓' : '!'} {blsAverage >= 80 ? 'Pass' : 'Review'}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Overall Status Card */}
          <div className="mt-8 bg-white rounded-xl shadow-lg p-8 border-l-4 border-primary">
            {passed ? (
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-700 mb-2">Certification Passed</h3>
                  <p className="text-muted-foreground">
                    Congratulations! You have successfully completed both ACLS and BLS training programs with an overall score of <span className="font-bold text-green-600">{overallAverage}%</span>. Your certifications are now valid.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <AlertCircle className="w-8 h-8 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-yellow-700 mb-2">Review Required</h3>
                  <p className="text-muted-foreground">
                    Your overall score is <span className="font-bold text-yellow-600">{overallAverage}%</span>. Please review your results and contact your training coordinator for guidance on improving your scores.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
