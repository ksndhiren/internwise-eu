import { Button } from "@/components/ui/button";
import { User, Sparkles, Send, FileText, Users, ShieldCheck, ArrowRight, ChevronRight } from "lucide-react";

const Step = ({ icon: Icon, num, title, desc, color }: any) => (
  <div className="flex-1 text-center group">
    <div className={`mx-auto w-16 h-16 rounded-2xl grid place-items-center mb-4 transition-transform group-hover:-translate-y-1 ${color}`}>
      <Icon className="w-7 h-7" />
    </div>
    <div className="font-semibold text-foreground mb-1.5">{num}. {title}</div>
    <div className="text-sm text-muted-foreground max-w-[180px] mx-auto leading-relaxed">{desc}</div>
  </div>
);

const Arrow = () => (
  <div className="flex-shrink-0 mt-7 hidden md:block">
    <div className="w-12 h-px border-t border-dashed border-border" />
  </div>
);

const HowItWorks = () => {
  return (
    <section id="how" className="bg-background py-24">
      <div className="container mx-auto">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground">
            How <span className="text-primary">Internwise</span> Works
          </h2>
          <Button variant="outline" className="rounded-xl border-border">
            See the Process <ChevronRight className="ml-1 w-4 h-4" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Candidates */}
          <div className="rounded-3xl p-8 border border-border/60">
            <div className="text-center text-primary font-semibold text-sm mb-8 tracking-wide">For Candidates</div>
            <div className="flex items-start justify-between gap-2">
              <Step icon={User} num="1" title="Build Profile" desc="Create a profile that shows your true potential" color="bg-primary/10 text-primary" />
              <Arrow />
              <Step icon={Sparkles} num="2" title="Get Matched" desc="Our AI matches you with the right opportunities" color="bg-primary/10 text-primary" />
              <Arrow />
              <Step icon={Send} num="3" title="Get Shortlisted" desc="Top employers find and shortlist you" color="bg-primary/10 text-primary" />
            </div>
          </div>

          {/* Employers */}
          <div className="rounded-3xl p-8 border border-border/60">
            <div className="text-center text-accent-orange font-semibold text-sm mb-8 tracking-wide">For Employers</div>
            <div className="flex items-start justify-between gap-2">
              <Step icon={FileText} num="1" title="Post Role" desc="Create a role or let us know your requirements" color="bg-accent-orange/10 text-accent-orange" />
              <Arrow />
              <Step icon={Users} num="2" title="Receive Matches" desc="Get AI-matched, pre-screened candidates" color="bg-accent-orange/10 text-accent-orange" />
              <Arrow />
              <Step icon={ShieldCheck} num="3" title="Shortlist & Connect" desc="Review Smart Cards and connect with the best" color="bg-accent-orange/10 text-accent-orange" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;