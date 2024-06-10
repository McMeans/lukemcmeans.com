import Image from "next/image";
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <Image 
          className="mcmeansLogo-dark"
          src='/images/dark-mode/mcmeansLogo-dark.png'
          width={60}
          height={60}
        />
      <div className="flex items-center justify-between">
        <div>
          <Link href="/" passHref>
            <span className="navbar-item">Home</span>
          </Link>
          <Link href="/resume" passHref>
            <span className="navbar-item">Resume</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
