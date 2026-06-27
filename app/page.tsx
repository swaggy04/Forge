// import HeroSection from "@/components/Herosection";
import Herosection from "@/components/Herosection";
import Navbar from "./(main)/resume/navbar";
import Features from "@/components/Features";
import Featureone from "@/components/Featureone";
import Process from "@/components/Process";
import Featuretwo from "@/components/feature2";
import CtaSection from "@/components/cta";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4">
        {/* <Herosection /> */}
        <Herosection/>
        <Features/>
        <Featureone/>
        <Featuretwo/>
        <Process/>
        <CtaSection/>
        
      </main>
    </>
  );
}
