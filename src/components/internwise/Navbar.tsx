import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type NavbarProps = {
  variant?: "transparent" | "solid";
};

const Navbar = ({ variant = "transparent" }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(variant === "solid");
  const isSolid = variant === "solid" || isScrolled;

  useEffect(() => {
    if (variant === "solid") {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [variant]);

  return (
    <nav
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        isSolid
          ? "border-b border-white/20 bg-white/65 shadow-sm backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className={cn("container mx-auto flex items-center justify-between transition-all duration-300", isSolid ? "py-4" : "py-6")}>
        <Link to="/" className="flex items-center">
          <img
            src={isSolid ? "/logo-color.png" : "/logo.png"}
            alt="Internwise Europe"
            className="h-12 w-auto"
          />
        </Link>
        <div
          className={cn(
            "hidden md:flex items-center gap-8 text-sm font-medium transition-colors",
            isSolid ? "text-slate-700" : "text-white/85"
          )}
        >
          <a href="/#candidates" className={cn("transition", isSolid ? "hover:text-primary" : "hover:text-white")}>For Candidates</a>
          <a href="/#employers" className={cn("transition", isSolid ? "hover:text-primary" : "hover:text-white")}>For Employers</a>
          <a href="/#how" className={cn("transition", isSolid ? "hover:text-primary" : "hover:text-white")}>How It Works</a>
          <Link to="/contact" className={cn("transition", isSolid ? "hover:text-primary" : "hover:text-white")}>Contact Us</Link>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className={cn(
              "rounded-lg",
              isSolid
                ? "border-primary/25 bg-white text-primary hover:bg-primary/5 hover:text-primary"
                : "border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            )}
          >
            Log in
          </Button>
          <Button className="bg-cta-gradient text-white hover:opacity-90 shadow-cta rounded-lg border-0">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
