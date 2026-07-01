import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <nav className="nav-container">
        <Link href="/" className="logo">
          Portfolio
        </Link>
        <ul className="nav-links">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/experience">Experience</Link>
          </li>
          <li>
            <Link href="/certifications">Certifications</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
