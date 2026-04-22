import { Users, UserPlus, Rocket, Star } from "lucide-react";

const Stat = ({ icon: Icon, value, label }: any) => (
  <div className="flex items-center gap-4 justify-center">
    <div className="w-12 h-12 rounded-full bg-primary/10 grid place-items-center text-primary">
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <div className="text-2xl md:text-3xl font-extrabold text-primary">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  </div>
);

const Stats = () => (
  <section className="bg-background py-16">
    <div className="container mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
      <Stat icon={Users} value="20K+" label="Candidates Matched" />
      <Stat icon={UserPlus} value="500+" label="Employers Onboarded" />
      <Stat icon={Rocket} value="95%" label="Faster Hiring" />
      <Stat icon={Star} value={<span>4.8<span className="text-base text-muted-foreground">/5</span></span>} label="Employer Rating" />
    </div>
  </section>
);

export default Stats;