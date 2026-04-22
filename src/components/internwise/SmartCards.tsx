import { Button } from "@/components/ui/button";
import { CheckCircle2, Check, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import sofia from "@/assets/avatar-sofia.jpg";
import lukas from "@/assets/avatar-lukas.jpg";
import marta from "@/assets/avatar-marta.jpg";

const SmartCard = ({
  img, name, role, location, match, skills, fit, points,
}: any) => (
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
        {skills.map((s: string) => (
          <span key={s} className="text-[11px] px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground">{s}</span>
        ))}
      </div>
      <div className="text-xs font-semibold text-foreground mb-2">{fit}</div>
      <ul className="space-y-1.5 mb-4">
        {points.map((p: string) => (
          <li key={p} className="flex items-start gap-2 text-xs text-muted-foreground">
            <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" strokeWidth={3} />
            {p}
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
    "Skills & strengths",
    "Why they're a great fit",
    "Verified information",
  ];

  return (
    <section className="bg-blue-soft relative py-24 overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle at 80% 20%, hsl(209 73% 80% / 0.4), transparent 50%)" }} />
      <div className="container mx-auto relative grid lg:grid-cols-[1fr_2fr] gap-12 items-center">
        <div className="text-white">
          <div className="text-xs font-semibold tracking-widest text-white/70 mb-4">SMART CARDS. SMARTER HIRING.</div>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-8">
            See beyond the CV.<br />See the potential.
          </h2>
          <ul className="space-y-3 mb-8">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-3 text-white/90">
                <CheckCircle2 className="w-5 h-5 text-primary-light" />
                {f}
              </li>
            ))}
          </ul>
          <Button variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white rounded-xl">
            Explore Smart Cards <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <SmartCard img={lukas} name="Lukas Schneider" role="Product Designer" location="Berlin, Germany"
              match={86} skills={["Figma", "UX/UI", "Prototyping", "User Research"]}
              fit="Why he's a great fit"
              points={["Strong portfolio in SaaS products", "Experience in user-centered design", "Great collaboration & communication"]} />
            <SmartCard img={sofia} name="Sofia Lindström" role="Data Analyst" location="Stockholm, Sweden"
              match={82} skills={["SQL", "Python", "Excel"]}
              fit="Why she's a great fit"
              points={["Strong analytical skills", "Experience with large datasets", "Detail-oriented & reliable"]} />
            <SmartCard img={marta} name="Marta Rossi" role="Marketing Intern" location="Milan, Italy"
              match={78} skills={["SEO", "Analytics", "Content"]}
              fit="Why she's a great fit"
              points={["Creative & data-driven", "Hands-on experience", "Fast learner"]} />
          </div>
          <button className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 text-primary grid place-items-center shadow-card-soft hover:scale-110 transition">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white text-primary grid place-items-center shadow-card-soft hover:scale-110 transition">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SmartCards;