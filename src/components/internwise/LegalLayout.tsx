import Navbar from "@/components/internwise/Navbar";

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
      <Navbar variant="solid" />

      <section className="container mx-auto pt-32 pb-16 lg:pt-36 lg:pb-20">
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
