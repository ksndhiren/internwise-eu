import { Button } from "@/components/ui/button";
import { Play, ArrowRight, LayoutDashboard, MessageSquare, Users, BarChart3, Settings, FileText, Heart, Building2 } from "lucide-react";
import sofia from "@/assets/avatar-sofia.jpg";
import lukas from "@/assets/avatar-lukas.jpg";
import marta from "@/assets/avatar-marta.jpg";

const Row = ({ img, name, role, match, status }: any) => (
  <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted/40 transition">
    <img src={img} alt="" loading="lazy" className="w-9 h-9 rounded-full object-cover" />
    <div className="flex-1">
      <div className="text-sm font-semibold text-foreground">{name}</div>
      <div className="text-xs text-muted-foreground">{role}</div>
    </div>
    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">{match}% Match</span>
    <span className="text-xs font-semibold text-white bg-primary px-2.5 py-1 rounded-md">{status}</span>
  </div>
);

const ProductPreview = () => {
  return (
    <section className="bg-secondary/60 py-24">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Mock dashboard */}
        <div className="relative rounded-2xl bg-white shadow-card-soft overflow-hidden">
          {/* Browser bar */}
          <div className="flex items-center gap-1.5 px-4 py-2.5 bg-muted/40 border-b border-border">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
          <div className="flex">
            {/* Sidebar */}
            <aside className="w-40 bg-muted/30 p-3 text-xs space-y-1 border-r border-border">
              <div className="font-bold text-foreground mb-3 px-2">internwise</div>
              {[
                { icon: LayoutDashboard, label: "Dashboard" },
                { icon: Users, label: "Matches", active: true },
                { icon: FileText, label: "Smart Cards" },
                { icon: MessageSquare, label: "Messages" },
                { icon: Heart, label: "Shortlisted" },
                { icon: BarChart3, label: "Analytics" },
                { icon: Building2, label: "Company Profile" },
                { icon: Settings, label: "Settings" },
              ].map(({ icon: Icon, label, active }) => (
                <div key={label} className={`flex items-center gap-2 px-2 py-1.5 rounded-md ${active ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground"}`}>
                  <Icon className="w-3.5 h-3.5" /> {label}
                </div>
              ))}
            </aside>
            {/* Main */}
            <div className="flex-1 p-4">
              <div className="font-bold text-foreground mb-3">Matches</div>
              <div className="flex gap-4 text-xs border-b border-border mb-3">
                <div className="pb-2 border-b-2 border-primary text-primary font-semibold">All Matches (120)</div>
                <div className="pb-2 text-muted-foreground">Shortlisted (12)</div>
                <div className="pb-2 text-muted-foreground">Interested (8)</div>
              </div>
              <div className="space-y-1">
                <Row img={lukas} name="Lukas Schneider" role="Product Designer" match={86} status="Shortlist" />
                <Row img={sofia} name="Sofia Lindström" role="Data Analyst" match={82} status="Shortlist" />
                <Row img={marta} name="Marta Rossi" role="Marketing Intern" match={78} status="Shortlist" />
              </div>
            </div>
          </div>

          {/* Play overlay */}
          <div className="absolute inset-0 grid place-items-center pointer-events-none">
            <button className="pointer-events-auto w-16 h-16 rounded-full bg-primary text-white grid place-items-center shadow-cta hover:scale-105 transition">
              <Play className="w-6 h-6 ml-0.5 fill-white" />
            </button>
          </div>

          {/* Video bar */}
          <div className="flex items-center gap-3 px-4 py-2 bg-foreground text-white text-xs">
            <Play className="w-3 h-3 fill-white" />
            <span>0:04 / 0:12</span>
            <div className="flex-1 h-1 bg-white/20 rounded-full">
              <div className="h-full w-1/3 bg-white rounded-full" />
            </div>
            <span>HD</span>
          </div>
        </div>

        {/* Right copy */}
        <div>
          <div className="text-xs font-semibold tracking-widest text-muted-foreground mb-4">BUILT FOR BOTH SIDES</div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-6">
            A better experience<br />for <span className="text-primary">everyone</span>.
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-md leading-relaxed">
            Powerful tools, real insights and faster connections for candidates and employers.
          </p>
          <Button variant="outline" className="rounded-xl border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            See How It Works <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductPreview;