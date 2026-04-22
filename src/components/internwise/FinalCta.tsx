import { Button } from "@/components/ui/button";
import { ArrowRight, Check, BarChart3, Rocket } from "lucide-react";
import sofia from "@/assets/avatar-sofia.jpg";
import lukas from "@/assets/avatar-lukas.jpg";
import marta from "@/assets/avatar-marta.jpg";
import male1 from "@/assets/avatar-male1.jpg";
import female1 from "@/assets/avatar-female1.jpg";

const FloatingAvatar = ({ img, className, delay }: any) => (
  <img src={img} alt="" loading="lazy"
    className={`absolute rounded-full object-cover border-2 border-white/20 shadow-glow ${className} ${delay}`} />
);

const FinalCta = () => {
  return (
    <section className="relative bg-hero-gradient overflow-hidden py-24">
      <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 50% 60%, hsl(209 73% 64% / 0.45), transparent 50%)" }} />
      <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      {/* Floating avatars */}
      <FloatingAvatar img={male1} className="w-14 h-14 left-[8%] top-[20%]" delay="animate-float" />
      <FloatingAvatar img={female1} className="w-12 h-12 left-[14%] bottom-[25%]" delay="animate-float-delay" />
      <FloatingAvatar img={marta} className="w-16 h-16 right-[10%] top-[18%]" delay="animate-float-delay" />
      <FloatingAvatar img={lukas} className="w-14 h-14 right-[6%] bottom-[22%]" delay="animate-float" />
      <div className="absolute left-[20%] top-[35%] w-9 h-9 rounded-full glass-light grid place-items-center text-white animate-float-delay">
        <BarChart3 className="w-4 h-4" />
      </div>
      <div className="absolute right-[18%] bottom-[35%] w-9 h-9 rounded-full glass-light grid place-items-center text-white animate-float">
        <Rocket className="w-4 h-4" />
      </div>

      <div className="container mx-auto relative text-center text-white max-w-2xl">
        <div className="text-xs font-semibold tracking-widest text-white/70 mb-5">READY TO GET STARTED?</div>
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-10">
          Your next opportunity<br />is just one <span className="text-gradient-orange">match</span> away.
        </h2>
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <Button size="lg" className="bg-primary-gradient text-white hover:opacity-95 rounded-xl px-7 h-12 shadow-card-soft border-0">
            Find Internships <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <Button size="lg" className="bg-cta-gradient text-white hover:opacity-95 rounded-xl px-7 h-12 shadow-cta border-0">
            Hire Talent <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-white/70">
          {["Free to join", "AI-powered matching", "Trusted across Europe"].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" strokeWidth={3} />{t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FinalCta;