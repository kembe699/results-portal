export default function SearchHeader() {
  return (
    <header className="bg-primary text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center font-bold text-primary">
            ✓
          </div>
          <h1 className="text-2xl font-bold">Medical Training Portal</h1>
        </div>
        <p className="text-primary/90">ACLS & BLS Certification Results</p>
      </div>
    </header>
  )
}
