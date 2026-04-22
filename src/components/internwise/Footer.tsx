import { Link } from "react-router-dom";

const Footer = () => {
  const candidateLinks = [
    { label: "How it works", href: "#how" },
    { label: "Internship Abroad", href: "#" },
    { label: "Branding", href: "#" },
  ];

  const links = [
    { label: "About", href: "#" },
    { label: "Terms", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
    { label: "Contact", href: "#" },
  ];

  return (
    <footer className="bg-primary-navy text-white">
      <div className="container mx-auto py-14">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-xl">
            <img src="/logo.png" alt="Internwise Europe" className="mb-6 h-14 w-auto" />
            <p className="text-sm leading-7 text-white/78">
              Internwise is an online job board platform for the niche of internship recruitment.
              Our vision is to help reducing youth unemployment rates by directly connecting
              Employers and Candidates in Europe.
            </p>
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
              Links
            </h3>
            <ul className="space-y-3 text-sm text-white/85">
              {links.map((item) => (
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
