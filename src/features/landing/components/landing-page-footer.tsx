"use client";

import Link from "next/link";

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-landing-bg border-t border-landing-muted py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="inline-block">
                            <span className="text-2xl font-bold tracking-tight text-landing-primary">
                                TechFestApp
                            </span>
                        </Link>
                        <p className="mt-6 text-gray-500 max-w-sm leading-relaxed">
                            The premier platform for technical festival management.
                            Simplifying event organization for students and administrators worldwide.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Product</h3>
                        <ul className="mt-6 space-y-4">
                            <li>
                                <Link href="#features" className="text-gray-500 hover:text-landing-primary transition-colors">Features</Link>
                            </li>
                            <li>
                                <Link href="#how-it-works" className="text-gray-500 hover:text-landing-primary transition-colors">How it Works</Link>
                            </li>
                            <li>
                                <Link href="/pricing" className="text-gray-500 hover:text-landing-primary transition-colors">Pricing</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Company</h3>
                        <ul className="mt-6 space-y-4">
                            <li>
                                <Link href="/about" className="text-gray-500 hover:text-landing-primary transition-colors">About Us</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-500 hover:text-landing-primary transition-colors">Contact</Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-gray-500 hover:text-landing-primary transition-colors">Privacy Policy</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-landing-muted flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-500">
                        &copy; {currentYear} TechFestApp. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="#" className="text-gray-400 hover:text-landing-primary transition-colors">
                            Twitter
                        </Link>
                        <Link href="#" className="text-gray-400 hover:text-landing-primary transition-colors">
                            GitHub
                        </Link>
                        <Link href="#" className="text-gray-400 hover:text-landing-primary transition-colors">
                            LinkedIn
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
