
import { Footer } from "./landing-page-footer";
import { Hero } from "./Hero";
import { HowItWorks } from "./how-it-works";
import { Navbar } from "./landing-page-navbar";
import { Features } from "./Features";
import { CTA } from "./call-to-action";



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
