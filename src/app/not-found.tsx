import Link from "next/link";
import { ArrowLeft, Search, Map } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-destructive/5 via-background to-background">
            <div className="max-w-md w-full text-center space-y-10">
                {/* Visual Icon Area */}
                <div className="relative inline-flex">
                    {/* Glowing background effect */}
                    <div className="absolute inset-0 blur-3xl bg-destructive/20 rounded-full animate-pulse" />

                    {/* Main Icon Container */}
                    <div className="relative bg-card border shadow-2xl rounded-[2rem] p-8 backdrop-blur-sm">
                        <Search className="h-16 w-16 text-muted-foreground" />
                    </div>

                    {/* Badge/Indicator */}
                    <div className="absolute -top-3 -right-3">
                        <span className="relative flex h-8 w-8">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-40"></span>
                            <span className="relative inline-flex rounded-full h-8 w-8 bg-destructive border-4 border-background flex items-center justify-center shadow-lg">
                                <Map className="h-4 w-4 text-foreground" />
                            </span>
                        </span>
                    </div>
                </div>

                {/* Content Area */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <span className="text-sm font-black uppercase tracking-[0.3em] text-destructive/80">
                            Error 404
                        </span>
                        <h1 className="text-5xl font-black tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/50">
                            Lost in Orbit
                        </h1>
                    </div>
                    <p className="text-xl text-muted-foreground font-medium leading-relaxed">
                        The page you're looking for doesn't exist or has been moved to a different coordinate.
                    </p>
                </div>

                {/* Action Area */}
                <div className="pt-6">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center justify-center h-12 px-10 rounded-full bg-primary text-primary-foreground font-bold shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(var(--primary),0.2)] transition-all hover:scale-105 active:scale-95 group"
                    >
                        <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
                        Back to Dashboard
                    </Link>
                </div>

                {/* Footer hint */}
                <div className="pt-12 border-t">
                    <p className="text-[10px] text-muted-foreground/50 uppercase tracking-[0.2em] font-bold">
                        Techfest App Platform • {new Date().getFullYear()}
                    </p>
                </div>
            </div>
        </div>
    );
}
