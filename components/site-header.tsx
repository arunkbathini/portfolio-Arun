"use client";

import { navLinks, profile } from "@/content/site";
import { scrollToHash } from "@/lib/scroll-to";

export default function SiteHeader() {
  return (
    <header className="site-header" id="top">
      <div className="site-header-inner">
        <a
          className="brand"
          href="#top"
          aria-label={`${profile.name} home`}
          onClick={(e) => scrollToHash(e, "#top")}
        >
          <span className="brand-mark">{profile.initials}</span>
          <strong>{profile.name}</strong>
        </a>
        <nav aria-label="Primary navigation">
          {navLinks.map((link) => {
            const isExternal = link.href.startsWith("http");
            return (
              <a
                key={link.href}
                href={link.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                onClick={isExternal ? undefined : (e) => scrollToHash(e, link.href)}
              >
                {link.label}
              </a>
            );
          })}
        </nav>
        <a
          className="nav-cta"
          href={`mailto:${profile.email}`}
          data-analytics-event="email_click"
          data-analytics-label="Header get in touch"
        >
          Get in touch
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 17 17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </a>
      </div>
    </header>
  );
}
