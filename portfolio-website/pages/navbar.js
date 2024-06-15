import Image from "next/image";
import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="blur">
      <nav className="bg-gray-800 p-4">
        <Link href="/" className="mcmeansLogo-dark">
          <Image 
            src='/images/dark-mode/mcmeansLogo-dark.png'
            width={50}
            height={50}
          />
          <div className="mcmeansLogo-name">
            <text>Luke</text>
            <text>McMeans</text>
          </div>
        </Link>
        <div className=".centered-items">
          <div>
            <Link href="/" className="navbar-item">Home</Link>
            <Link href="/resume" className="navbar-item">Resume</Link>
          </div>
        </div>
        <div className="socials">
          <a href="https://www.linkedin.com/in/luke-mcmeans/" target="_blank" rel="noopener noreferrer">
            <Image 
              className="linkedinLogo-dark"
              src='/images/dark-mode/linkedinLogo-dark.png'
              width={25}
              height={25}
            />
          </a>
          <a href="https://github.com/McMeans" target="_blank" rel="noopener noreferrer">
            <Image 
              className="githubLogo-dark"
              src='/images/dark-mode/githubLogo-dark.png'
              width={25}
              height={25}
            />
          </a>
        </div>
      </nav>
    </div>
  );
}
