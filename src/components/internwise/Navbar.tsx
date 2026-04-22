import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="absolute top-0 left-0 right-0 z-30">
      <div className="container mx-auto flex items-center justify-between py-6">
        <a href="#" className="flex items-center gap-2 text-white font-bold text-xl">
          <div className="w-8 h-8 rounded-lg bg-primary-gradient grid place-items-center">
            <span className="text-white text-sm">w</span>
          </div>
          internwise
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/85 font-medium">
          <a href="#candidates" className="hover:text-white transition">For Candidates</a>
          <a href="#employers" className="hover:text-white transition">For Employers</a>
          <a href="#how" className="hover:text-white transition">How It Works</a>
          <a href="#resources" className="hover:text-white transition">Resources</a>
          <a href="#pricing" className="hover:text-white transition">Pricing</a>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white rounded-lg">
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