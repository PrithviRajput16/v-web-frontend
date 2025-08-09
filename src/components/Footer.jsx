import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-12">
      <div className="container mx-auto px-4 py-8 text-sm text-gray-600">
        <div className="flex flex-col md:flex-row md:justify-between gap-4">
          <div>
            <h3 className="font-semibold text-gray-800">Vaidam Clone</h3>
            <p>
              © {new Date().getFullYear()} Vaidam Clone. All rights reserved.
            </p>
          </div>
          <div>
            <p>Designed for learning — replace with your own footer content.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
