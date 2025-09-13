import { useEffect, useState } from "react";
import url_prefix from "../data/variable";

export default function Footer() {

  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        // Using the endpoint from your curl command
        const response = await fetch(url_prefix + '/api/about?page=1&limit=1');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
          setAboutData(result.data);
        } else {
          throw new Error(result.message || "Failed to load data");
        }
      } catch (err) {
        setError(err.message || "An error occurred while fetching data");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
    return (
      <section className="relative bg-white py-16 overflow-hidden">
        <div className="container relative mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-pulse flex flex-col items-center">
              <div className="rounded-full bg-teal-100 h-12 w-12 mb-4"></div>
              <p className="text-teal-600">Loading...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative bg-white py-16 overflow-hidden">
        <div className="container relative mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex justify-center items-center min-h-[50vh]">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </section>
    );
  }
  return (
    <footer
      className="text-white py-10 mt-12"
      style={{ backgroundColor: "rgb(0 128 128)" }}
    >
      <div className="container   mx-auto px-6">
        {/* Top Section */}
        <div className="flex flex-row  grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div>
            <h2 className="text-2xl font-bold mb-3">Vaidam Clone</h2>
            <p className="text-sm opacity-90 leading-relaxed">
              Bringing trusted healthcare information and connections closer to
              you. Built for learning and development purposes.
            </p>
          </div>



          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold  mb-3">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: info@vaidamclone.com</li>
              <li>Phone: +91-123-456-7890</li>
              <li>Location: Delhi, India</li>
            </ul>
          </div>

          {/* Social Media */}
          {/* <div>
            <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:opacity-80 transition">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="hover:opacity-80 transition">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="hover:opacity-80 transition">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="hover:opacity-80 transition">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div> */}
        </div>

        {/* Divider */}
        <div className="border-t border-white border-opacity-20 mt-8 pt-6 text-center text-sm opacity-80">
          © {new Date().getFullYear()} Vaidam Clone. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
