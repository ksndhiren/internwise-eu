import { Link } from "react-router-dom";

type Section = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

type LegalLayoutProps = {
  title: string;
  intro: string[];
  sections: Section[];
};

const LegalLayout = ({ title, intro, sections }: LegalLayoutProps) => {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border/60 bg-white/95 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between py-5">
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="Internwise Europe" className="h-12 w-auto" />
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link to="/" className="transition hover:text-primary">Home</Link>
            <Link to="/terms" className="transition hover:text-primary">Terms</Link>
            <Link to="/privacy" className="transition hover:text-primary">Privacy</Link>
          </nav>
        </div>
      </header>

      <section className="container mx-auto py-16 lg:py-20">
        <div className="max-w-4xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            Internwise Policies
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
            {title}
          </h1>
          <div className="space-y-4 text-base leading-8 text-muted-foreground">
            {intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-8">
          {sections.map((section) => (
            <section key={section.title} className="rounded-3xl border border-border/70 bg-white p-8 shadow-card-soft">
              <h2 className="text-2xl font-bold text-foreground mb-4">{section.title}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="mb-4 text-sm leading-7 text-muted-foreground">
                  {paragraph}
                </p>
              ))}
              {section.bullets && (
                <ul className="space-y-3 text-sm leading-7 text-muted-foreground list-disc pl-5">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </section>
    </main>
  );
};

export default LegalLayout;
