import Link from "next/link";
import { Github, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full border-t border-border/10 bg-background py-12 text-muted-foreground">
            <div className="container mx-auto px-4">
                <div className="grid gap-8 md:grid-cols-4">
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-foreground">TECHFEST</h3>
                        <p className="text-sm leading-relaxed">
                            The annual technical festival of our college. Innovate, Create, and Inspire.
                        </p>
                    </div>

                    <div>
                        <h4 className="mb-4 text-sm font-semibold text-foreground">Events</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/competitions" className="hover:text-cyan-400 transition-colors">Competitions</Link></li>
                            <li><Link href="/workshops" className="hover:text-cyan-400 transition-colors">Workshops</Link></li>
                            <li><Link href="/hackathons" className="hover:text-cyan-400 transition-colors">Hackathons</Link></li>
                            <li><Link href="/exhibitions" className="hover:text-cyan-400 transition-colors">Exhibitions</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-4 text-sm font-semibold text-foreground">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/privacy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-cyan-400 transition-colors">Terms of Service</Link></li>
                            <li><Link href="/code-of-conduct" className="hover:text-cyan-400 transition-colors">Code of Conduct</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-4 text-sm font-semibold text-foreground">Follow Us</h4>
                        <div className="flex gap-4">
                            <Link href="#" className="hover:text-foreground transition-colors"><Github className="h-5 w-5" /></Link>
                            <Link href="#" className="hover:text-foreground transition-colors"><Twitter className="h-5 w-5" /></Link>
                            <Link href="#" className="hover:text-foreground transition-colors"><Instagram className="h-5 w-5" /></Link>
                            <Link href="#" className="hover:text-foreground transition-colors"><Linkedin className="h-5 w-5" /></Link>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-border/10 pt-8 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Techfest. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
