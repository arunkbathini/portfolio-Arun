import Link from "next/link";
import { navLinks, profile } from "@/content/site";

export default function SiteHeader() {
  return (
    <header className="site-header" id="top">
      <Link className="brand" href="/" aria-label={`${profile.name} home`}>
        <span>{profile.initials}</span>
        <strong>{profile.name}</strong>
      </Link>
      <nav aria-label="Primary navigation">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
