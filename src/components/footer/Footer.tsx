import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <h2 className="text-white text-xl font-bold">CourseHub</h2>
            <p className="mt-3 text-sm text-gray-400">
              Learn, Teach and Grow with our modern online learning platform.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li><Link href="/courses" className="hover:text-white">Courses</Link></li>
              <li><Link href="/join" className="hover:text-white">Join</Link></li>
              <li><Link href="/about" className="hover:text-white">About</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-3">Contact</h3>
            <p className="text-sm text-gray-400">
              Email: support@coursehub.com
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Phone: +880 1234-567890
            </p>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="mt-10 border-t border-gray-700 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">

          <p>© {new Date().getFullYear()} CourseHub. All rights reserved.</p>

          <div className="flex gap-4 mt-3 sm:mt-0">
            <Link href="#" className="hover:text-white">Facebook</Link>
            <Link href="#" className="hover:text-white">Twitter</Link>
            <Link href="#" className="hover:text-white">LinkedIn</Link>
          </div>

        </div>

      </div>
    </footer>
  );
}