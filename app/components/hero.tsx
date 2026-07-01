import Link from "next/link";
import { profile } from "@/content/site";

export default function Hero() {
  return (
    <section className="hero">
      <div className="home-hero">
        <div className="home-hero-stage">
          <div className="hero-title-stack">
            <h1>{profile.name}</h1>
            <p>{profile.title}</p>
          </div>

          <div className="operator-console">
            <div className="console-bar">
              <span className="window-dot dot-red" />
              <span className="window-dot dot-amber" />
              <span className="window-dot dot-green" />
              <strong>salesforce-devops@portfolio</strong>
            </div>

            <div className="console-body">
              <div className="identity-panel">
                <div className="avatar-frame">
                  <span>AB</span>
                </div>
                <div>
                  <h1>{profile.name}</h1>
                  <p className="role-line">{profile.title}</p>
                </div>
              </div>

              <div className="cli-window">
                <p className="cli-title">system status</p>
                <p className="cli-line">
                  <span className="cli-prompt">$</span>
                  <span className="cli-command">whoami</span>
                </p>
                <span className="cli-result">Salesforce DevOps Engineer</span>
                <p className="cli-line">
                  <span className="cli-prompt">$</span>
                  <span className="cli-command">deploy --ready</span>
                </p>
                <span className="cli-result with-dot">
                  <span className="status-dot" />
                  CI/CD, cloud automation, and release orchestration ready
                </span>
              </div>

              <div className="contact-panel">
                <Link href="/contact" className="button hero-button">
                  Start a conversation
                </Link>
                <a href={`mailto:${profile.email}`} className="button">
                  Email me
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
