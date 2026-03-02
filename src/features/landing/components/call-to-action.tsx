"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export const CTA = () => {
    return (
        <section className="py-24 bg-landing-primary relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-black/5 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white mb-8 border border-white/30 backdrop-blur-sm">
                        <Sparkles className="h-4 w-4" aria-hidden="true" />
                        Ready to get started?
                    </div>
                    <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl mb-8">
                        Start Managing Your <br />
                        <span className="text-black/90">TechFest Today</span>
                    </h2>
                    <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Join hundreds of organizers already using TechFestApp to power their technical events.
                        Free to start, powerful enough to scale.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Button
                            asChild
                            size="lg"
                            variant="secondary"
                            className="w-full sm:w-auto bg-white text-landing-primary hover:bg-gray-100 h-14 px-10 text-xl font-bold rounded-full shadow-2xl transition-all hover:scale-105"
                        >
                            <Link href="/dashboard/techfest/new">Get Started Now</Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="w-full sm:w-auto bg-landing border-white text-white hover:bg-white/10 h-14 px-10 text-xl font-medium rounded-full backdrop-blur-sm transition-all"
                        >
                            <Link href="/contact">Request a Demo</Link>
                        </Button>
                    </div>
                    <p className="mt-8 text-white/70 text-sm">
                        No credit card required • Seamless migration • 24/7 Support
                    </p>
                </div>
            </div>
        </section>
    );
};
