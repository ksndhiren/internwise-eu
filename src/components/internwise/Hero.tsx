import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Check, Briefcase, Palette, Megaphone } from "lucide-react";
import sofia from "@/assets/avatar-sofia.jpg";
import lukas from "@/assets/avatar-lukas.jpg";
import marta from "@/assets/avatar-marta.jpg";
import male1 from "@/assets/avatar-male1.jpg";
import female1 from "@/assets/avatar-female1.jpg";

const CandidateCard = ({
  img, name, role, location, skills, highlighted, delay,
}: {
  img: string; name: string; role: string; location: string; skills: string[]; highlighted?: boolean; delay?: string;
}) => (
  <div
    className={`rounded-2xl p-4 flex items-center gap-4 transition-all ${
      highlighted
        ? "bg-white/[0.07] border border-primary-light/60 shadow-glow animate-pulse-glow"
        : "glass"
    } ${delay || "animate-float"}`}
  >
    <img src={img} alt={name} width={56} height={56} loading="lazy" className="w-14 h-14 rounded-xl object-cover" />
    <div className="flex-1 min-w-0">
      <div className="text-white font-semibold text-sm">{name}</div>
      <div className="text-white/60 text-xs">{role}</div>
      <div className="text-white/50 text-xs mb-2">{location}</div>
      <div className="flex flex-wrap gap-1.5">
        {skills.map((s) => (
          <span key={s} className="text-[10px] px-2 py-0.5 rounded-md bg-white/10 text-white/80 border border-white/10">
            {s}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const JobCard = ({
  icon: Icon, title, company, location, highlighted, delay,
}: {
  icon: any; title: string; company: string; location: string; highlighted?: boolean; delay?: string;
}) => (
  <div
    className={`rounded-2xl p-4 flex items-center gap-3 transition-all ${
      highlighted
        ? "bg-white border border-white shadow-glow animate-pulse-glow"
        : "glass"
    } ${delay || "animate-float-delay"}`}
  >
    <div className={`w-11 h-11 rounded-xl grid place-items-center ${highlighted ? "bg-primary-gradient" : "bg-white/10 border border-white/10"}`}>
      <Icon className={`w-5 h-5 ${highlighted ? "text-white" : "text-white/80"}`} />
    </div>
    <div className="flex-1 min-w-0">
      <div className={`font-semibold text-sm ${highlighted ? "text-foreground" : "text-white"}`}>{title}</div>
      <div className={`text-xs ${highlighted ? "text-muted-foreground" : "text-white/60"}`}>{company}</div>
      <div className={`text-xs ${highlighted ? "text-muted-foreground" : "text-white/50"}`}>{location}</div>
    </div>
  </div>
);

const Hero = () => {
  return (
    <section className="relative bg-hero-gradient overflow-hidden pt-28 pb-40">
      {/* subtle grid / glow */}
      <div className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ background: "radial-gradient(circle at 70% 40%, hsl(209 73% 64% / 0.35), transparent 50%)" }} />
      <div className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "50px 50px" }} />

      <div className="container mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div className="text-white">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-primary/40 border border-primary-light/40 text-white mb-7">
            AI-POWERED MATCHING
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-6">
            Get <span className="text-gradient-blue">matched</span>.<br />
            Get <span className="text-gradient-orange">hired</span> faster.
          </h1>
          <p className="text-white/75 text-lg max-w-md mb-8 leading-relaxed">
            Internwise connects top talent with the right opportunities across Europe. Smarter matching. Better outcomes.
          </p>
          <div className="flex flex-wrap gap-4 mb-10">
            <Button size="lg" className="bg-primary-gradient text-white hover:opacity-95 rounded-xl px-6 h-12 shadow-card-soft border-0 group">
              I'm a Candidate <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition" />
            </Button>
            <Button size="lg" className="bg-cta-gradient text-white hover:opacity-95 rounded-xl px-6 h-12 shadow-cta border-0 group">
              I'm Hiring <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition" />
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {[sofia, lukas, marta, female1].map((a, i) => (
                <img key={i} src={a} alt="" width={36} height={36} loading="lazy" className="w-9 h-9 rounded-full border-2 border-primary-navy object-cover" />
              ))}
            </div>
            <div>
              <div className="flex gap-0.5 mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-accent-orange text-accent-orange" />
                ))}
              </div>
              <div className="text-white/70 text-xs leading-tight">
                Trusted by 100+ employers<br />and 20K+ candidates across Europe
              </div>
            </div>
          </div>
        </div>

        {/* Right - matching visual */}
        <div className="relative">
          <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-center">
            {/* Candidates column */}
            <div className="space-y-3">
              <div className="text-white/60 text-xs font-medium pl-2 mb-1">Top Candidates</div>
              <CandidateCard img={sofia} name="Sofia Lindström" role="Data Analyst" location="Stockholm, Sweden" skills={["SQL", "Python", "Excel"]} />
              <CandidateCard img={lukas} name="Lukas Schneider" role="Product Designer" location="Berlin, Germany" skills={["Figma", "UX/UI", "Prototyping"]} highlighted delay="animate-float-delay" />
              <CandidateCard img={marta} name="Marta Rossi" role="Marketing Intern" location="Milan, Italy" skills={["SEO", "Analytics", "Content"]} />
            </div>

            {/* Match badge + connections */}
            <div className="relative flex flex-col items-center justify-center h-full px-1">
              <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 300">
                <defs>
                  <linearGradient id="lg" x1="0" x2="1">
                    <stop offset="0" stopColor="hsl(209 73% 64%)" stopOpacity="0.2"/>
                    <stop offset="0.5" stopColor="hsl(209 73% 75%)" stopOpacity="1"/>
                    <stop offset="1" stopColor="hsl(209 73% 64%)" stopOpacity="0.2"/>
                  </linearGradient>
                </defs>
                <path d="M 0 50 Q 50 50 50 150" stroke="url(#lg)" strokeWidth="1.5" fill="none" className="animate-pulse-line" />
                <path d="M 0 150 L 100 150" stroke="url(#lg)" strokeWidth="2" fill="none" className="animate-pulse-line" />
                <path d="M 100 50 Q 50 50 50 150" stroke="url(#lg)" strokeWidth="1.5" fill="none" className="animate-pulse-line" />
                <path d="M 0 250 Q 50 250 50 150" stroke="url(#lg)" strokeWidth="1.5" fill="none" className="animate-pulse-line" />
                <path d="M 100 250 Q 50 250 50 150" stroke="url(#lg)" strokeWidth="1.5" fill="none" className="animate-pulse-line" />
              </svg>
              <div className="relative w-20 h-20 rounded-full bg-primary-deep border-2 border-primary-light grid place-items-center text-white shadow-glow animate-pulse-glow z-10">
                <div className="text-center leading-tight">
                  <div className="font-bold text-lg">86%</div>
                  <div className="text-[10px] text-white/70">Match</div>
                </div>
              </div>
            </div>

            {/* Jobs column */}
            <div className="space-y-3">
              <div className="text-white/60 text-xs font-medium pl-2 mb-1">Open Roles</div>
              <JobCard icon={Briefcase} title="Product Intern" company="FinTech Startup" location="Berlin, Germany" />
              <JobCard icon={Palette} title="Junior UX Designer" company="SaaS Company" location="Berlin, Germany" highlighted delay="animate-float" />
              <JobCard icon={Megaphone} title="Marketing Intern" company="E-commerce" location="Amsterdam, Netherlands" />
            </div>
          </div>

          {/* Shortlisted pill */}
          <div className="flex justify-center mt-6">
            <div className="glass rounded-full px-4 py-2 flex items-center gap-3 animate-fade-in-out">
              <div className="w-5 h-5 rounded-full bg-emerald-400 grid place-items-center">
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              </div>
              <span className="text-white text-xs font-medium">Shortlisted</span>
              <div className="flex -space-x-1.5">
                <img src={sofia} alt="" width={20} height={20} loading="lazy" className="w-5 h-5 rounded-full border border-primary-navy object-cover" />
                <img src={lukas} alt="" width={20} height={20} loading="lazy" className="w-5 h-5 rounded-full border border-primary-navy object-cover" />
                <img src={marta} alt="" width={20} height={20} loading="lazy" className="w-5 h-5 rounded-full border border-primary-navy object-cover" />
              </div>
              <span className="text-white/70 text-xs">+3</span>
            </div>
          </div>
        </div>
      </div>

      {/* Curved divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 block">
          <path d="M0,80 C480,0 960,0 1440,80 L1440,80 L0,80 Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;