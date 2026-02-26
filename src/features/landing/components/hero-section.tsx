import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";

export function HeroSection() {
    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background pt-16">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute -left-[10%] -top-[10%] h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[120px]" />
                <div className="absolute -right-[10%] top-[40%] h-[500px] w-[500px] rounded-full bg-cyan-600/20 blur-[120px]" />
                <div className="absolute bottom-0 left-[20%] h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[120px]" />
            </div>

            <div className="container relative z-10 mx-auto grid place-items-center gap-8 px-4 text-center">
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 fill-mode-both">
                    <div className="inline-flex items-center rounded-full border border-border/10 bg-accent px-3 py-1 text-sm text-cyan-400 backdrop-blur-sm">
                        <span className="mr-2 flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
                        Techfest 2026 is Coming Soon
                    </div>

                    <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-7xl md:text-8xl lg:text-9xl">
                        <span className="block bg-gradient-to-r from-foreground to-foreground/50 bg-clip-text text-transparent">
                            INNOVATE
                        </span>
                        <span className="block bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                            CREATE
                        </span>
                        <span className="block bg-gradient-to-r from-foreground/50 to-foreground bg-clip-text text-transparent">
                            INSPIRE
                        </span>
                    </h1>

                    <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
                        Join the ultimate convergence of technology and creativity.
                        Experience 3 days of non-stop innovation, coding battles, and robotic wars.
                    </p>
                </div>

                <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-20 duration-1000 delay-200 fill-mode-both sm:flex-row">
                    <Button size="lg" className="h-12 border-0 bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500 rounded-full px-8 text-lg">
                        Register Now
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button size="lg" variant="outline" className="h-12 border-border/20 bg-accent text-foreground hover:bg-accent/80 hover:text-foreground rounded-full px-8 text-lg hover:border-border/40">
                        View Schedule
                        <Calendar className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </div>
        </section>
    );
}
