import Image from "next/image";
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <Image 
        src='/images/McMeansLogo_transparent.png'
        width={60}
        height={60}
      />
      <div className="centered-items">
        <Link href="/" class="navbar-item">Home</Link>
        <Link href="/resume" class="navbar-item">Resume</Link>
      </div>
    </nav>
  );
}