import { navLinks, profile } from "@/content/site";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p className="footer-copy">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js.
        </p>
        <nav className="footer-links" aria-label="Footer navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-analytics-event="linkedin_click"
            data-analytics-label="Footer LinkedIn"
          >
            LinkedIn
          </a>
        </nav>
      </div>
    </footer>
  );
}
