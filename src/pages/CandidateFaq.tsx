import { ArrowRight, Sparkles } from "lucide-react";
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
          "Internwise is an AI-powered matching platform that helps candidates across Europe get connected to internships and early-career roles that fit their skills, goals, and preferences.",
      },
      {
        question: "How is this different from job boards?",
        answer:
          "Instead of asking you to search through long lists of vacancies, Internwise focuses on matching. Your profile, skills, and preferences are used to surface stronger-fit opportunities faster and help employers find you more intentionally.",
      },
      {
        question: "Do I need to apply for jobs?",
        answer:
          "Internwise is built to reduce repetitive applying. Once your profile is complete, the platform can surface strong matches and help put you in front of employers without the usual job-board friction.",
      },
    ],
  },
  {
    title: "Matching & Profile",
    items: [
      {
        question: "How does the matching work?",
        answer:
          "Internwise looks at your role interest, skills, experience, location preferences, and profile strength, then compares that to what employers are looking for. The result is a more tailored shortlist of opportunities instead of generic listings.",
      },
      {
        question: "What is a match percentage?",
        answer:
          "The match percentage is a signal showing how closely your current profile lines up with a role. It considers multiple factors together, so it should be treated as guidance rather than a hard pass-or-fail score.",
      },
      {
        question: "What if I don’t match perfectly?",
        answer:
          "That is completely normal. Many strong opportunities are still worth exploring even if the match is not perfect. Internwise highlights where you already fit well and where a few updates could improve your chances.",
      },
      {
        question: "How do I improve my matches?",
        answer:
          "Add stronger skills, upload your CV, include relevant projects, keep your links up to date, and make your role and location preferences clear. Small profile improvements can make your best-fit opportunities much easier to surface.",
      },
    ],
  },
  {
    title: "Visibility & Hiring",
    items: [
      {
        question: "Can employers see my profile?",
        answer:
          "Employers can view candidate information when it is relevant to their hiring needs and when your profile is being considered as a match. The goal is to create qualified visibility rather than exposing your profile broadly without context.",
      },
      {
        question: "What happens when I get shortlisted?",
        answer:
          "Being shortlisted means an employer has identified your profile as a strong fit and wants to review you more closely. This can lead to profile review, outreach, interview requests, or next-step conversations.",
      },
      {
        question: "How will employers contact me?",
        answer:
          "Employers will contact you through the contact details and profile information you choose to provide. Keeping your CV, LinkedIn, and preferred contact information current helps that process move faster.",
      },
    ],
  },
  {
    title: "Account & Usage",
    items: [
      {
        question: "Do I need a CV?",
        answer:
          "A CV is highly recommended because it strengthens your profile and gives employers more confidence when reviewing you. Even so, you can still start building your profile before uploading one.",
      },
      {
        question: "Can I update my profile?",
        answer:
          "Yes. Your profile should evolve as you gain new skills, projects, education, or experience. Updating it regularly gives the matching engine and employers a more accurate picture of where you fit best.",
      },
      {
        question: "Is Internwise free?",
        answer:
          "For candidates, the experience is designed to stay accessible and low-friction. The current product flow is built to help you discover and unlock opportunities without introducing unnecessary barriers.",
      },
    ],
  },
  {
    title: "General",
    items: [
      {
        question: "Is my data safe?",
        answer:
          "Internwise is designed with candidate trust in mind. Your profile data is used to power matching and hiring workflows, and the platform is built to handle that information responsibly across the product experience.",
      },
      {
        question: "Can I use Internwise across Europe?",
        answer:
          "Yes. Internwise is built for the European internship market, helping candidates and employers connect across multiple cities, countries, and remote-friendly opportunities.",
      },
    ],
  },
];

const CandidateFaq = () => {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar variant="solid" />

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#eef2f8_0%,#f7f9fc_100%)] px-4 pb-20 pt-36 text-slate-950">
        <div
          className="absolute inset-0 opacity-70"
          style={{ background: "radial-gradient(circle at 80% 20%, rgba(95,167,229,0.18), transparent 30%), radial-gradient(circle at 20% 25%, rgba(27,51,93,0.08), transparent 28%)" }}
        />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.55fr] lg:items-center">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary shadow-sm backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Candidate support
            </div>
            <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-slate-950 md:text-6xl">
              Candidate FAQs
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Everything you need to know about getting matched and hired through Internwise.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-card-soft backdrop-blur">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
              <Sparkles className="h-6 w-6" />
            </div>
            <h2 className="mt-5 text-2xl font-extrabold text-slate-950">Fast answers, less friction</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              From profile setup to employer visibility, this page is designed to remove doubts quickly so you can focus on finding the right internship.
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
              <FaqAccordion items={section.items} groupKey={section.title.toLowerCase().replace(/\s+/g, "-")} />
            </section>
          ))}
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-hero-gradient px-6 py-12 text-white shadow-card-soft md:px-10 md:py-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Next step</p>
              <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">Ready to get matched?</h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/76 md:text-lg">
                Start with a quick profile, preview your strongest opportunities, and move into the product with clarity.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Button asChild className="bg-cta-gradient text-white shadow-cta">
                <Link to="/candidate-matches">
                  See Your Matches
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/15 hover:text-white">
                <Link to="/candidate-onboarding">Create Profile</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CandidateFaq;
