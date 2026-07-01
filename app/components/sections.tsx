import Link from "next/link";
import { profile } from "@/content/site";

export function AboutSection() {
  return (
    <section id="about" className="section about-section">
      <div className="section-heading">
        <p className="eyebrow">About</p>
        <h2>Salesforce-first engineering with cloud depth.</h2>
      </div>
      <div className="about-card">
        <div className="about-copy">
          <p className="about-command">~/profile --bio</p>
          <p>{profile.bio}</p>
        </div>
        <div className="about-points">
          <details className="about-detail-card" open>
            <summary>
              <span>
                <strong>01</strong>
                <span>Platform engineering</span>
              </span>
            </summary>
            <p>
              I build reliable Salesforce delivery pipelines, automate release
              workflows, and help teams move faster without sacrificing
              governance.
            </p>
          </details>
          <details className="about-detail-card">
            <summary>
              <span>
                <strong>02</strong>
                <span>Cloud and DevOps</span>
              </span>
            </summary>
            <p>
              From CI/CD to infrastructure automation, I connect application
              delivery with the operational discipline modern teams expect.
            </p>
          </details>
        </div>
      </div>
    </section>
  );
}

export function CertificationWall() {
  return (
    <section id="certifications" className="section certifications-section">
      <div className="section-heading">
        <p className="eyebrow">Certifications</p>
        <h2>Credentials that reinforce the craft.</h2>
      </div>
      <div className="ticker">
        {profile.certifications?.map((cert, idx) => (
          <span key={idx}>
            {cert.name} • {cert.issuer} • {cert.date}
          </span>
        ))}
      </div>
    </section>
  );
}

export function ExperienceShowcase() {
  return (
    <section id="experience" className="section experience-section">
      <div className="section-heading">
        <p className="eyebrow">Experience</p>
        <h2>Work shaped around delivery and scale.</h2>
      </div>
      <div className="about-points">
        {profile.experience?.map((job, idx) => (
          <div key={idx} className="about-detail-card">
            <summary>
              <span>
                <strong>{idx + 1}</strong>
                <span>
                  {job.title} • {job.company}
                </span>
              </span>
              <small>{job.period}</small>
            </summary>
            {job.description && <p>{job.description}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

export function SkillProcessBoard() {
  return (
    <section className="section skills-section">
      <div className="section-heading">
        <p className="eyebrow">Skills</p>
        <h2>Core capabilities across the delivery stack.</h2>
      </div>
      <div className="about-points">
        {profile.skills?.map((skill, idx) => (
          <div key={idx} className="about-detail-card">
            <summary>
              <span>
                <strong>{idx + 1}</strong>
                <span>{skill.category}</span>
              </span>
            </summary>
            <p>{skill.items?.join(" • ")}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ContactCTA() {
  return (
    <section id="contact" className="section contact-section">
      <div className="section-heading">
        <p className="eyebrow">Contact</p>
        <h2>Let’s build reliable systems together.</h2>
      </div>
      <div className="about-card">
        <div className="about-copy">
          <p>
            Feel free to reach out for opportunities, collaborations, or
            conversations about Salesforce and DevOps architecture.
          </p>
        </div>
        <div className="about-points">
          {profile.social?.map((link, idx) => (
            <Link
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="button"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
