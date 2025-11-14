import { Award } from 'lucide-react'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-primary">Gudele Hospital - HR Department</h1>
            <p className="text-xs text-muted-foreground">ACLS & BLS Training Results</p>
          </div>
        </div>
      </div>
    </header>
  )
}
