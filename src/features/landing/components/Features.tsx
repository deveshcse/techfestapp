"use client";

import React from "react";
import {
    Calendar,
    Users,
    Clock,
    BarChart3,
    ShieldCheck,
    Zap
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const features = [
    {
        title: "Event Management",
        description: "Easily create and manage multiple techfests with dedicated dashboards and reporting.",
        icon: Calendar,
    },
    {
        title: "Activity Scheduling",
        description: "Plan workshops, hackathons, and seminars with a robust scheduling system.",
        icon: Clock,
    },
    {
        title: "Waitlist Automation",
        description: "Automatically handle over-subscriptions and manage waitlists for popular activities.",
        icon: Zap,
    },
    {
        title: "Attendance Tracking",
        description: "Track participant attendance in real-time with integrated check-in tools.",
        icon: Users,
    },
    {
        title: "Analytics Dashboard",
        description: "Get deep insights into registration trends, attendee demographics, and activity performance.",
        icon: BarChart3,
    },
    {
        title: "Role-based Access",
        description: "Secure your platform with granular permissions for organizers, students, and admins.",
        icon: ShieldCheck,
    },
];

export const Features = () => {
    return (
        <section id="features" className="py-24 bg-landing-bg relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-base font-semibold leading-7 text-landing-primary uppercase tracking-wider">
                        Powerful Features
                    </h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Everything you need to manage your TechFest
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        TechFestApp provides a comprehensive suite of tools designed to handle every aspect of technical festivals.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            className="border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-landing-muted/30"
                        >
                            <CardHeader>
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-landing-primary text-landing-primary-foreground shadow-lg shadow-landing-primary/20">
                                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                                </div>
                                <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                                <CardDescription className="text-base text-gray-600">
                                    {feature.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent />
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};
