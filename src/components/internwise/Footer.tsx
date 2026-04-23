import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  const candidateLinks = [
    { label: "How it works", href: "/#how" },
    { label: "FAQs", href: "https://www.internwise.eu/candidate-faq" },
  ];

  const employerLinks = [
    { label: "How it works", href: "/#how" },
    { label: "FAQs", href: "https://www.internwise.eu/employer-faq" },
  ];

  const legalLinks = [
    { label: "About", href: "#" },
    { label: "Terms", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
    { label: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    { label: "Facebook", href: "https://www.facebook.com/internwise", icon: Facebook },
    { label: "X", href: "https://twitter.com/internwise", icon: Twitter },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/internwise", icon: Linkedin },
    { label: "Instagram", href: "https://www.instagram.com/internwise", icon: Instagram },
    { label: "YouTube", href: "https://www.youtube.com/@internwise", icon: Youtube },
  ];

  return (
    <footer className="bg-primary-navy text-white">
      <div className="container mx-auto py-14">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.75fr_0.75fr_0.9fr]">
          <div className="max-w-xl">
            <img src="/logo.png" alt="Internwise Europe" className="mb-6 h-14 w-auto" />
            <p className="text-sm leading-7 text-white/78">
              Internwise is an AI-powered matching platform connecting candidates and employers
              across Europe.
            </p>
            <div className="mt-7">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-white/70">
                Follow us
              </h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Follow Internwise on ${label}`}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/[0.06] text-white/78 transition hover:border-primary-light/50 hover:bg-primary-light/15 hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-white/70">
              For Candidates
            </h3>
            <ul className="space-y-3 text-sm text-white/85">
              {candidateLinks.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="transition hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-white/70">
              For Employers
            </h3>
            <ul className="space-y-3 text-sm text-white/85">
              {employerLinks.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="transition hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-white/70">
              Links
            </h3>
            <ul className="space-y-3 text-sm text-white/85">
              {legalLinks.map((item) => (
                <li key={item.label}>
                  {item.href.startsWith("/") ? (
                    <Link to={item.href} className="transition hover:text-white">
                      {item.label}
                    </Link>
                  ) : (
                    <a href={item.href} className="transition hover:text-white">
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-sm text-white/78">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <p>Employers - Post your vacancies and review your applications received</p>
            <p>Candidates - Start applying for internships and review Employers feedback</p>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-5 text-sm text-white/60">
          © 2026 Internwise. A brand under Kape Strategy Ltd.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
