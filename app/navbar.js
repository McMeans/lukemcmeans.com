import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <Link href="/" class="navbar-item">Home</Link>
        <Link href="/resume" class="navbar-item">Resume</Link>
      </ul>
    </nav>
  );
}