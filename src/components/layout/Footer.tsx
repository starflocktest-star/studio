import { Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} StarConnect. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link href="#" className="text-gray-500 hover:text-primary transition-colors">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-gray-500 hover:text-primary transition-colors">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-gray-500 hover:text-primary transition-colors">
              <Youtube className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
