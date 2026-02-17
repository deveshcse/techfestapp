import Link from "next/link";
import { Timer, ArrowLeft, Rocket } from "lucide-react";

interface ComingSoonProps {
    title?: string;
    description?: string;
    returnTo?: string;
    showBackButton?: boolean;
}

export function ComingSoon({
    title = "Coming Soon",
    description = "We're currently building this feature to give you the best experience possible. Check back later!",
    returnTo = "/dashboard",
    showBackButton = true
}: ComingSoonProps) {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center space-y-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent rounded-[2rem] border border-primary/10 shadow-sm">
            {/* Visual Icon Area */}
            <div className="relative inline-flex">
                <div className="absolute inset-0 blur-2xl bg-primary/20 rounded-full animate-pulse" />
                <div className="relative bg-card border shadow-xl rounded-3xl p-6">
                    <Rocket className="h-10 w-10 text-primary" />
                </div>
                <div className="absolute -top-1.5 -right-1.5">
                    <span className="relative flex h-5 w-5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-5 w-5 bg-primary flex items-center justify-center">
                            <Timer className="h-2.5 w-2.5 text-primary-foreground" />
                        </span>
                    </span>
                </div>
            </div>

            {/* Content Area */}
            <div className="space-y-2 max-w-sm">
                <h2 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70">
                    {title}
                </h2>
                <p className="text-muted-foreground">
                    {description}
                </p>
            </div>

            {/* Action Area */}
            {showBackButton && (
                <div className="pt-2">
                    <Link
                        href={returnTo}
                        className="inline-flex items-center justify-center h-10 px-8 rounded-full bg-primary text-primary-foreground text-sm font-bold transition-all hover:scale-105 active:scale-95 group shadow-lg shadow-primary/20"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Return
                    </Link>
                </div>
            )}
        </div>
    );
}
