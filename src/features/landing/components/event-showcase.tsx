import { EventCard } from "./event-card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface Event {
    title: string;
    description: string;
    date: string;
    location: string;
    category: string;
    image: string;
}

interface EventShowcaseProps {
    events: Event[];
}

export function EventShowcase({ events }: EventShowcaseProps) {
    return (
        <section className="relative bg-background py-24">
            <div className="container mx-auto px-4">
                <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-bold text-foreground md:text-5xl">
                            Featured <span className="text-cyan-400">Events</span>
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Discover the highlights of Techfest 2026. From coding marathons to robotic battles, we have it all.
                        </p>
                    </div>
                    <Button variant="ghost" className="group text-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-300" asChild>
                        <Link href="/events">
                            View All Events
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {events.map((event) => (
                        <EventCard key={event.title} {...event} />
                    ))}
                </div>
            </div>
        </section>
    );
}

