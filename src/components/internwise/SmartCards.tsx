import { Button } from "@/components/ui/button";
import { ArrowRight, Check, CheckCircle2 } from "lucide-react";
import sofia from "@/assets/avatar-sofia.jpg";
import lukas from "@/assets/avatar-lukas.jpg";
import marta from "@/assets/avatar-marta.jpg";
import male1 from "@/assets/avatar-male1.jpg";
import female1 from "@/assets/avatar-female1.jpg";

const SmartCard = ({
  img,
  name,
  role,
  location,
  match,
  skills,
  fit,
  points,
}: {
  img: string;
  name: string;
  role: string;
  location: string;
  match: number;
  skills: string[];
  fit: string;
  points: string[];
}) => (
  <div className="bg-white rounded-2xl shadow-card-soft overflow-hidden hover:-translate-y-1 transition-transform">
    <div className="relative h-44 overflow-hidden">
      <img src={img} alt={name} loading="lazy" className="w-full h-full object-cover" />
      <span className="absolute top-3 right-3 bg-emerald-500/95 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
        {match}% Match
      </span>
    </div>
    <div className="p-5">
      <div className="font-bold text-foreground">{name}</div>
      <div className="text-sm text-muted-foreground">{role}</div>
      <div className="text-sm text-muted-foreground mb-3">{location}</div>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {skills.map((skill) => (
          <span key={skill} className="text-[11px] px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground">
            {skill}
          </span>
        ))}
      </div>
      <div className="text-xs font-semibold text-foreground mb-2">{fit}</div>
      <ul className="space-y-1.5 mb-4">
        {points.map((point) => (
          <li key={point} className="flex items-start gap-2 text-xs text-muted-foreground">
            <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" strokeWidth={3} />
            {point}
          </li>
        ))}
      </ul>
      <button className="text-primary text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all">
        View Profile <ArrowRight className="w-3 h-3" />
      </button>
    </div>
  </div>
);

const SmartCards = () => {
  const features = [
    "AI match score",
    "Skills and strengths",
    "Why they're a great fit",
    "Verified information",
  ];

  const smartCards = [
    {
      img: lukas,
      name: "Lukas Schneider",
      role: "Product Designer",
      location: "Berlin, Germany",
      match: 86,
      skills: ["Figma", "UX/UI", "Prototyping", "User Research"],
      fit: "Why he's a great fit",
      points: ["Strong portfolio in SaaS products", "Experience in user-centered design", "Great collaboration and communication"],
    },
    {
      img: sofia,
      name: "Sofia Lindström",
      role: "Data Analyst",
      location: "Stockholm, Sweden",
      match: 82,
      skills: ["SQL", "Python", "Excel", "Power BI"],
      fit: "Why she's a great fit",
      points: ["Strong analytical skills", "Experience with large datasets", "Detail-oriented and reliable"],
    },
    {
      img: marta,
      name: "Marta Rossi",
      role: "Marketing Intern",
      location: "Milan, Italy",
      match: 78,
      skills: ["SEO", "Analytics", "Content", "Canva"],
      fit: "Why she's a great fit",
      points: ["Creative and data-driven", "Hands-on campaign experience", "Fast learner with commercial instinct"],
    },
    {
      img: female1,
      name: "Clara Dubois",
      role: "Frontend Intern",
      location: "Paris, France",
      match: 84,
      skills: ["React", "TypeScript", "Tailwind", "Testing"],
      fit: "Why she's a great fit",
      points: ["Builds polished UI fast", "Strong product intuition", "Comfortable shipping with engineers"],
    },
    {
      img: male1,
      name: "Elias Novak",
      role: "Growth Analyst",
      location: "Prague, Czechia",
      match: 80,
      skills: ["CRM", "SQL", "Lifecycle", "A/B Testing"],
      fit: "Why he's a great fit",
      points: ["Good at funnel diagnosis", "Blends marketing and analytics", "Understands retention metrics"],
    },
    {
      img: sofia,
      name: "Noor van Dijk",
      role: "Customer Success Intern",
      location: "Rotterdam, Netherlands",
      match: 79,
      skills: ["Onboarding", "HubSpot", "Support", "Ops"],
      fit: "Why she's a great fit",
      points: ["Empathetic communicator", "Strong process mindset", "Comfortable in fast-moving teams"],
    },
  ];

  return (
    <section className="bg-blue-soft relative py-24 overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{ background: "radial-gradient(circle at 80% 20%, hsl(209 73% 80% / 0.4), transparent 50%)" }}
      />
      <div className="container mx-auto relative grid lg:grid-cols-[0.9fr_2.1fr] gap-14 items-center">
        <div className="max-w-md text-white">
          <div className="text-xs font-semibold tracking-widest text-white/70 mb-5">
            SMART CARDS. SMARTER HIRING.
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-[1.08] mb-6 text-balance">
            See beyond the CV.
            <br />
            See the potential.
          </h2>
          <p className="mb-8 max-w-sm text-base leading-7 text-white/78">
            Rich candidate summaries make strengths, context, and fit easier to understand at a glance.
          </p>
          <ul className="space-y-3 mb-9">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-white/90">
                <CheckCircle2 className="w-5 h-5 text-primary-light" />
                {feature}
              </li>
            ))}
          </ul>
          <Button variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white rounded-xl">
            Explore Smart Cards <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        <div className="relative">
          <div className="smart-cards-marquee">
            <div className="smart-cards-track">
              {[...smartCards, ...smartCards].map((card, index) => (
                <div key={`${card.name}-${index}`} className="min-w-[280px] max-w-[280px] flex-shrink-0">
                  <SmartCard {...card} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartCards;
