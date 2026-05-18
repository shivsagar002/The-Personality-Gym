import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Trainers from '../components/Trainers';
import MembershipPricing from '../components/MembershipPricing';
import Footer from '../components/Footer';

const LandingPage = ({ onOpenAuth }) => (
  <div className="bg-gym-dark min-h-screen font-sans selection:bg-gym-orange selection:text-white">
    <Navbar onOpenAuth={onOpenAuth} />
    <main>
      <Hero onOpenAuth={onOpenAuth} />
      <Features />
      <Trainers />
      <MembershipPricing onOpenAuth={onOpenAuth} />
    </main>
    <Footer />
  </div>
);

export default LandingPage;
