import CircularCarousel from "@/components/CircularCarousel";
import Hero from "@/components/Hero";
import OurServices from "@/components/OurServices";
import WhyDecofice from "@/components/WhyDecofice";
import Stats from "@/components/Stats";
import Presence from "@/components/Presence";
import VisitUs from "@/components/VisitUs";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Hero />
      <CircularCarousel />
      <OurServices />
      <WhyDecofice />
      <Stats />
      <Presence />
      <VisitUs />
      <Testimonials />
      <Footer />
    </div>
  );
}
