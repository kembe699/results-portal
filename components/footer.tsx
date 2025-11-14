import { Code2, Heart, Shield } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    /* Professional footer with developer info and icons */
    <footer className="bg-primary text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-secondary" />
              About Results Portal
            </h3>
            <p className="text-white/80 text-sm leading-relaxed">
              A professional platform for employees to securely check their ACLS and BLS training program results.
            </p>
          </div>

          {/* Features Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-secondary" />
              Features
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>✓ Secure result lookup</li>
              <li>✓ Detailed score breakdown</li>
              <li>✓ Performance analytics</li>
              <li>✓ Printable reports</li>
            </ul>
          </div>

          {/* Developer Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-secondary" />
              Developer
            </h3>
            <p className="text-white/80 text-sm mb-2">
              Developed with care and attention to detail
            </p>
            <p className="text-white font-medium">Naggal Hassan</p>
            <p className="text-white/70 text-xs">Portal Developer</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-8">
          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/70">
            <p>© {currentYear} Medical Training Portal. All rights reserved.</p>
            <p>Developed by <span className="text-secondary font-semibold">Naggal Hassan</span></p>
          </div>
        </div>
      </div>
    </footer>
  )
}
