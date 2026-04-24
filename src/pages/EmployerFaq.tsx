import { ArrowRight, BriefcaseBusiness } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/internwise/Footer";
import Navbar from "@/components/internwise/Navbar";
import FaqAccordion, { FaqItem } from "@/components/internwise/faq/FaqAccordion";
import { Button } from "@/components/ui/button";

type FaqSection = {
  title: string;
  items: FaqItem[];
};

const faqSections: FaqSection[] = [
  {
    title: "Getting Started",
    items: [
      {
        question: "What is Internwise?",
        answer:
          "Internwise is an AI-powered matching platform that helps employers identify strong-fit candidates faster across the European internship and early-career market.",
      },
      {
        question: "How is this different from traditional hiring platforms?",
        answer:
          "Traditional hiring platforms often start with vacancy posting and manual filtering. Internwise is designed around matching first, so you see qualified, relevant candidates with clear fit signals instead of sifting through a large pool from scratch.",
      },
      {
        question: "Do I need to post a job?",
        answer:
          "No. Internwise is designed to reduce friction at the start of the hiring journey. You can define your hiring intent, skills, and requirements, then begin exploring matched candidates without relying on a long posting workflow.",
      },
    ],
  },
  {
    title: "Matching & Candidates",
    items: [
      {
        question: "How does the matching work?",
        answer:
          "Internwise compares your hiring brief with candidate profiles across role intent, skills, experience, location preference, and readiness signals. The result is a prioritised view of candidates who are more likely to be relevant from the start.",
      },
      {
        question: "What are Smart Cards?",
        answer:
          "Smart Cards are fast-scanning candidate summaries built for decision-making. They highlight match percentage, skills, location, and short AI-style fit reasons so you can evaluate a candidate in seconds rather than opening every profile first.",
      },
      {
        question: "What kind of candidates will I see?",
        answer:
          "You will see internship and early-career candidates whose profiles align with the role types, skill needs, and hiring signals you set. The experience is designed for European hiring across remote and location-based opportunities.",
      },
    ],
  },
  {
    title: "Hiring Process",
    items: [
      {
        question: "How do I shortlist candidates?",
        answer:
          "You can shortlist candidates directly from the dashboard or candidate detail view. Shortlisting is meant to be lightweight so your team can quickly build a high-intent review queue without interrupting momentum.",
      },
      {
        question: "What happens after I shortlist?",
        answer:
          "Shortlisted candidates move into a dedicated shortlist area where you can review them more closely, keep notes, and move them through the next stage of your internal process.",
      },
      {
        question: "Can I contact candidates directly?",
        answer:
          "Yes, the product flow is built to support direct outreach once a candidate is shortlisted and ready for the next step. The current experience includes placeholder contact actions, with room for deeper messaging workflows later.",
      },
    ],
  },
  {
    title: "Workflow & Setup",
    items: [
      {
        question: "Do I need ATS integration?",
        answer:
          "No. Internwise is designed to be lightweight to start with, so employers can begin using it without a complex setup. Integration can be added later if needed, but it is not required to get immediate value.",
      },
      {
        question: "Can I customise hiring requirements?",
        answer:
          "Yes. You can tailor role intent, location, experience level, and core skills so the matching system reflects the type of candidate you actually want to see.",
      },
      {
        question: "Can I manage multiple roles?",
        answer:
          "Yes. Internwise is designed to support evolving hiring needs, so the product can expand from one brief into multiple role tracks as your team grows and your hiring workflow becomes more structured.",
      },
    ],
  },
  {
    title: "Value & Efficiency",
    items: [
      {
        question: "How fast can I start hiring?",
        answer:
          "The goal is to get employers into the product in under a minute. Once your hiring intent and core skills are defined, you can move straight into matched candidates and start shortlisting immediately.",
      },
      {
        question: "How does Internwise reduce hiring time?",
        answer:
          "Internwise reduces time spent on manual searching, filtering, and low-signal review. By surfacing stronger-fit candidates first and packaging them into easy-to-scan Smart Cards, the platform helps teams make faster decisions with less friction.",
      },
      {
        question: "Is this suitable for startups and SMEs?",
        answer:
          "Yes. Internwise is especially well suited to startups and SMEs that want hiring speed, clarity, and quality without needing heavy recruiting infrastructure or large internal talent teams.",
      },
    ],
  },
];

const EmployerFaq = () => {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar variant="solid" />

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#edf2f8_0%,#f8fafc_100%)] px-4 pb-20 pt-36 text-slate-950">
        <div
          className="absolute inset-0 opacity-75"
          style={{ background: "radial-gradient(circle at 78% 18%, rgba(95,167,229,0.16), transparent 32%), radial-gradient(circle at 18% 24%, rgba(27,51,93,0.08), transparent 28%)" }}
        />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.55fr] lg:items-center">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary shadow-sm backdrop-blur">
              <BriefcaseBusiness className="h-3.5 w-3.5" />
              Employer support
            </div>
            <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-slate-950 md:text-6xl">
              Employer FAQs
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Everything you need to know about hiring smarter with Internwise.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-card-soft backdrop-blur">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
              <BriefcaseBusiness className="h-6 w-6" />
            </div>
            <h2 className="mt-5 text-2xl font-extrabold text-slate-950">Clear process, faster hiring</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              This page is designed to help employers understand the product quickly, trust the workflow, and move from curiosity to action without friction.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto max-w-5xl space-y-12">
          {faqSections.map((section) => (
            <section key={section.title}>
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{section.title}</p>
              </div>
              <FaqAccordion items={section.items} groupKey={`employer-${section.title.toLowerCase().replace(/\s+/g, "-")}`} />
            </section>
          ))}
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-hero-gradient px-6 py-12 text-white shadow-card-soft md:px-10 md:py-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Next step</p>
              <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">Start hiring smarter today</h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/76 md:text-lg">
                Set your hiring intent, explore strong-fit candidates, and start building your shortlist in a fraction of the usual time.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Button asChild className="bg-cta-gradient text-white shadow-cta">
                <Link to="/employer-onboarding">
                  I&apos;m Hiring
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/15 hover:text-white">
                <Link to="/employer-dashboard">View Candidates</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default EmployerFaq;
