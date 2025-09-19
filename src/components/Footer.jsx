import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaReddit,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { SiQuora } from "react-icons/si"; // Quora comes from Simple Icons

export default function Footer() {
  return (
    <footer
      className="text-white py-10 mt-12"
      style={{ backgroundColor: "rgb(0 128 128)" }}
    >
      <div className="container mx-auto px-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div>
            <h2 className="text-2xl font-bold mb-3">Vaidam Clone</h2>
            <p className="text-sm opacity-90 leading-relaxed">
              Bringing trusted healthcare information and connections closer to
              you. Built for learning and development purposes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:underline hover:opacity-80">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:underline hover:opacity-80">
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="hover:underline hover:opacity-80"
                >
                  Services
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline hover:opacity-80">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: info@vaidamclone.com</li>
              <li>Phone: +91-123-456-7890</li>
              <li>Location: Delhi, India</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
            <div className="flex space-x-4 text-xl">
              <a href="#" className="hover:opacity-80 transition">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:opacity-80 transition">
                <FaTwitter />
              </a>
              <a href="#" className="hover:opacity-80 transition">
                <FaLinkedinIn />
              </a>
              <a href="#" className="hover:opacity-80 transition">
                <FaInstagram />
              </a>
              <a href="#" className="hover:opacity-80 transition">
                <FaYoutube />
              </a>
              <a href="#" className="hover:opacity-80 transition">
                <SiQuora />
              </a>
              <a href="#" className="hover:opacity-80 transition">
                <FaReddit />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white border-opacity-20 mt-8 pt-6 text-center text-sm opacity-80">
          ©️ {new Date().getFullYear()} Vaidam Clone. All rights reserved.
        </div>
      </div>
    </footer>
  );
}