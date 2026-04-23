import { Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/internwise/Footer";
import Navbar from "@/components/internwise/Navbar";

const phoneCountries = [
  { flag: "🇬🇧", country: "United Kingdom", code: "+44" },
  { flag: "🇮🇪", country: "Ireland", code: "+353" },
  { flag: "🇫🇷", country: "France", code: "+33" },
  { flag: "🇩🇪", country: "Germany", code: "+49" },
  { flag: "🇪🇸", country: "Spain", code: "+34" },
  { flag: "🇮🇹", country: "Italy", code: "+39" },
  { flag: "🇳🇱", country: "Netherlands", code: "+31" },
  { flag: "🇧🇪", country: "Belgium", code: "+32" },
  { flag: "🇨🇭", country: "Switzerland", code: "+41" },
  { flag: "🇦🇹", country: "Austria", code: "+43" },
  { flag: "🇵🇹", country: "Portugal", code: "+351" },
  { flag: "🇩🇰", country: "Denmark", code: "+45" },
  { flag: "🇸🇪", country: "Sweden", code: "+46" },
  { flag: "🇳🇴", country: "Norway", code: "+47" },
  { flag: "🇫🇮", country: "Finland", code: "+358" },
  { flag: "🇵🇱", country: "Poland", code: "+48" },
  { flag: "🇨🇿", country: "Czechia", code: "+420" },
  { flag: "🇸🇰", country: "Slovakia", code: "+421" },
  { flag: "🇭🇺", country: "Hungary", code: "+36" },
  { flag: "🇷🇴", country: "Romania", code: "+40" },
  { flag: "🇧🇬", country: "Bulgaria", code: "+359" },
  { flag: "🇬🇷", country: "Greece", code: "+30" },
  { flag: "🇭🇷", country: "Croatia", code: "+385" },
  { flag: "🇸🇮", country: "Slovenia", code: "+386" },
  { flag: "🇪🇪", country: "Estonia", code: "+372" },
  { flag: "🇱🇻", country: "Latvia", code: "+371" },
  { flag: "🇱🇹", country: "Lithuania", code: "+370" },
  { flag: "🇱🇺", country: "Luxembourg", code: "+352" },
  { flag: "🇲🇹", country: "Malta", code: "+356" },
  { flag: "🇨🇾", country: "Cyprus", code: "+357" },
  { flag: "🇮🇸", country: "Iceland", code: "+354" },
  { flag: "🇺🇦", country: "Ukraine", code: "+380" },
  { flag: "🇹🇷", country: "Turkey", code: "+90" },
  { flag: "🇬🇪", country: "Georgia", code: "+995" },
];

const Contact = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar variant="solid" />

      <section className="relative overflow-hidden bg-hero-gradient pt-36 pb-20 text-white">
        <div
          className="absolute inset-0 opacity-35"
          style={{ background: "radial-gradient(circle at 75% 20%, hsl(209 73% 64% / 0.55), transparent 42%)" }}
        />
        <div className="container mx-auto relative grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-white/65">
              Contact us
            </p>
            <h1 className="mb-6 max-w-xl text-4xl font-extrabold leading-tight md:text-6xl">
              We are here to help you move faster.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-white/78">
              Questions, comments, suggestions, or recommendations are welcome.
              Tell us what you need and the Internwise team will respond within 48 hours.
            </p>

            <div className="mt-10 grid gap-4 text-sm text-white/82 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur">
                <Mail className="mb-3 h-5 w-5 text-primary-light" />
                <p className="font-semibold text-white">Email support</p>
                <p className="mt-1">Use the form and we will route your request.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur">
                <MessageCircle className="mb-3 h-5 w-5 text-primary-light" />
                <p className="font-semibold text-white">48h response</p>
                <p className="mt-1">We aim to reply within two working days.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/12 bg-white p-6 text-foreground shadow-card-soft md:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-semibold">
                Name
                <input className="w-full rounded-xl border border-border bg-muted/35 px-4 py-3 font-normal outline-none transition focus:border-primary focus:bg-white" placeholder="Your name" />
              </label>
              <label className="space-y-2 text-sm font-semibold">
                Email address
                <input type="email" className="w-full rounded-xl border border-border bg-muted/35 px-4 py-3 font-normal outline-none transition focus:border-primary focus:bg-white" placeholder="you@example.com" />
              </label>
              <label className="space-y-2 text-sm font-semibold">
                Direct contact
                <div className="flex overflow-hidden rounded-xl border border-border bg-muted/35 transition focus-within:border-primary focus-within:bg-white">
                  <select
                    className="w-[7.5rem] border-r border-border bg-transparent px-3 py-3 text-sm font-normal outline-none"
                    defaultValue="+44"
                    aria-label="Phone country code"
                  >
                    {phoneCountries.map((item) => (
                      <option key={`${item.country}-${item.code}`} value={item.code}>
                        {item.flag} {item.code} {item.country}
                      </option>
                    ))}
                  </select>
                  <input className="min-w-0 flex-1 bg-transparent px-4 py-3 font-normal outline-none" placeholder="7000 000000" />
                </div>
              </label>
              <label className="space-y-2 text-sm font-semibold">
                Subject
                <input className="w-full rounded-xl border border-border bg-muted/35 px-4 py-3 font-normal outline-none transition focus:border-primary focus:bg-white" placeholder="How can we help?" />
              </label>
            </div>
            <label className="mt-4 block space-y-2 text-sm font-semibold">
              Message
              <textarea className="min-h-36 w-full resize-none rounded-xl border border-border bg-muted/35 px-4 py-3 font-normal outline-none transition focus:border-primary focus:bg-white" placeholder="Share a few details about your request." />
            </label>
            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-6 text-muted-foreground">
                This form is a visual placeholder for now. We can connect it to Supabase or Worker email routing next.
              </p>
              <Button className="bg-cta-gradient text-white hover:opacity-90 shadow-cta rounded-xl border-0">
                Submit <Send className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto grid gap-4 py-12 md:grid-cols-2">
        <div className="rounded-3xl border border-border/70 bg-white p-6 shadow-card-soft">
          <MapPin className="mb-4 h-6 w-6 text-primary" />
          <h2 className="mb-2 text-xl font-bold">Based in Europe</h2>
          <p className="text-sm leading-7 text-muted-foreground">
            Connecting employers and candidates across European internship markets.
          </p>
        </div>
        <div className="rounded-3xl border border-border/70 bg-white p-6 shadow-card-soft">
          <Phone className="mb-4 h-6 w-6 text-primary" />
          <h2 className="mb-2 text-xl font-bold">Support for both sides</h2>
          <p className="text-sm leading-7 text-muted-foreground">
            Candidates and employers can use this page for account, hiring, or platform questions.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Contact;
