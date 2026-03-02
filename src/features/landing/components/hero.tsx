"use client";

import Link from "next/link";
import { MoveRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSquares } from "./animated-squares";

export const Hero = () => {
    return (
        <section className="relative overflow-hidden bg-landing-bg py-24 sm:py-32 lg:py-40">
            <AnimatedSquares />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="mx-auto max-w-4xl text-center">
                    <div className="mb-8 flex justify-center">
                        <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-landing-primary ring-1 ring-landing-primary/20 hover:ring-landing-primary/40 transition-all bg-landing-primary/5">
                            <span className="flex items-center gap-2">
                                <Sparkles className="h-4 w-4" />
                                Empowering Technical Excellence
                            </span>
                        </div>
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
                        Streamline Your <br />
                        <span className="text-landing-primary">TechFest Experience</span>
                    </h1>
                    <p className="mt-8 text-lg leading-8 text-gray-600 sm:text-xl lg:mx-auto lg:max-w-2xl">
                        The all-in-one platform for managing technical festivals, activities, and registrations.
                        From waitlist automation to real-time analytics, we've got everything you need to run a successful event.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Button
                            asChild
                            size="lg"
                            className="w-full sm:w-auto bg-landing-primary text-landing-primary-foreground hover:bg-landing-primary/90 h-12 px-8 text-lg rounded-xl shadow-lg shadow-landing-primary/20 transition-all hover:scale-105"
                        >
                            <Link href="/dashboard/techfest/new">
                                Create TechFest
                                <MoveRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="w-full sm:w-auto border-landing-primary text-landing-primary hover:bg-landing-primary/5 h-12 px-8 text-lg rounded-xl transition-all"
                        >
                            <Link href="/events">Explore Events</Link>
                        </Button>
                    </div>
                </div>

                {/* Right side illustration placeholder as requested */}
                <div className="mt-16 flow-root sm:mt-24">
                    <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                        <div className="rounded-md bg-white shadow-2xl ring-1 ring-gray-900/10 min-h-[400px] flex items-center justify-center border border-landing-muted">
                            <div className="text-center">
                                <div className="mx-auto h-24 w-24 bg-landing-primary/10 rounded-full flex items-center justify-center mb-4">
                                    <Sparkles className="h-12 w-12 text-landing-primary" aria-hidden="true" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900">Dashboard Preview</h3>
                                <p className="text-gray-500 mt-2">Manage activities, attendees, and registrations in real-time.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
