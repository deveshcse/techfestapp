import { CTA } from "./CTA";
import { Features } from "./Features";
import { Footer } from "./Footer";
import { Hero } from "./Hero";
import { HowItWorks } from "./HowItWorks";
import { Navbar } from "./Navbar";


const LandingPage = () => {
    return (
        <div className="flex min-h-screen flex-col bg-landing-bg font-sans antialiased text-gray-900 selection:bg-landing-primary/10 selection:text-landing-primary">
            <Navbar />
            <main className="flex-1">
                <Hero />
                <Features />
                <HowItWorks />
                <CTA />
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;
