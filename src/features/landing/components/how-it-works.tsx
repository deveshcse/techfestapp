"use client";

import { PlusCircle, ClipboardList, UserCheck } from "lucide-react";

const steps = [
    {
        title: "Create TechFest",
        description: "Initialize your technical festival with key dates, logo, and basic configuration.",
        icon: PlusCircle,
    },
    {
        title: "Add Activities",
        description: "Define workshops, hackathons, and competitions with specific rules and capacities.",
        icon: ClipboardList,
    },
    {
        title: "Manage Registrations",
        description: "Open registrations, track attendee interest, and automate waitlists with ease.",
        icon: UserCheck,
    },
];

export const HowItWorks = () => {
    return (
        <section id="how-it-works" className="py-24 bg-[hsl(var(--landing-bg))]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-base font-semibold leading-7 text-[hsl(var(--landing-primary))] uppercase tracking-wider">
                        Simple Process
                    </h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        How TechFestApp Works
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Getting your technical festival up and running is as easy as 1-2-3.
                    </p>
                </div>

                <div className="relative">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8 relative z-10">
                        {steps.map((step, index) => (
                            <div key={index} className="flex flex-col items-center text-center group relative">
                                {/* Connecting Line - Desktop */}
                                {index < steps.length - 1 && (
                                    <div className="absolute top-10 left-[calc(50%)] right-[calc(-50%)] hidden lg:block h-0.5" aria-hidden="true">
                                        <svg className="w-full h-full" preserveAspectRatio="none">
                                            <line
                                                x1="0" y1="50%" x2="100%" y2="50%"
                                                strokeDasharray="1,12"
                                                className="stroke-landing-primary/50 stroke-[3] animate-dash transition-all duration-300"
                                            />
                                        </svg>
                                    </div>
                                )}

                                {/* Connecting Line - Mobile/Tablet */}
                                {index < steps.length - 1 && (
                                    <div className="absolute top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 lg:hidden w-0.5 h-10" aria-hidden="true">
                                        <svg className="w-full h-full" preserveAspectRatio="none">
                                            <line
                                                x1="50%" y1="0" x2="50%" y2="100%"
                                                strokeDasharray="1,12"
                                                strokeLinecap="round"
                                                className="stroke-landing-primary/50 stroke-[3] animate-dash"
                                            />
                                        </svg>
                                    </div>
                                )}

                                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white border-2 border-landing-primary text-landing-primary shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-landing-primary group-hover:text-white relative z-20">
                                    <step.icon className="h-10 w-10" aria-hidden="true" />
                                </div>
                                <div className="mt-6">
                                    <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                                    <p className="mt-4 text-gray-600 leading-relaxed max-w-sm">
                                        {step.description}
                                    </p>
                                </div>
                                <div className="mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-landing-primary/10 text-landing-primary text-sm font-bold hover:border-landing-primary hover:border hover:text-landing-primary hover:bg-landing-primary/20 transition-all duration-300">
                                    {index + 1}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
