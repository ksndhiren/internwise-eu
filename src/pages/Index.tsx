import Navbar from "@/components/internwise/Navbar";
import Hero from "@/components/internwise/Hero";
import HowItWorks from "@/components/internwise/HowItWorks";
import SmartCards from "@/components/internwise/SmartCards";
import Stats from "@/components/internwise/Stats";
import ProductPreview from "@/components/internwise/ProductPreview";
import FinalCta from "@/components/internwise/FinalCta";
import Footer from "@/components/internwise/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <HowItWorks />
      <SmartCards />
      <Stats />
      <ProductPreview />
      <FinalCta />
      <Footer />
    </main>
  );
};

export default Index;
