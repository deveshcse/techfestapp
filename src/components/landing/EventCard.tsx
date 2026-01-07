import Link from "next/link";
import { ArrowUpRight, Calendar, MapPin, Users } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface EventCardProps {
    title: string;
    description: string;
    date: string;
    location: string;
    category: string;
    image: string;
}

export function EventCard({ title, description, date, location, category, image }: EventCardProps) {
    return (
        <Card className="group relative overflow-hidden border-white/10 bg-white/5 transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_30px_-5px_bg-cyan-500/30]">
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <CardHeader className="p-0">
                <div className="relative h-48 w-full overflow-hidden">
                    {/* Placeholder for real image, using a gradient for now */}
                    <div className={`h-full w-full bg-gradient-to-br ${image} transition-transform duration-500 group-hover:scale-110`} />
                    <div className="absolute left-4 top-4">
                        <Badge variant="secondary" className="bg-black/50 text-white backdrop-blur-md hover:bg-black/70">
                            {category}
                        </Badge>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="relative z-10 space-y-4 p-6">
                <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
                        {title}
                    </h3>
                    <p className="mt-2 text-sm text-zinc-400 line-clamp-2">
                        {description}
                    </p>
                </div>

                <div className="flex flex-col gap-2 text-sm text-zinc-500">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-cyan-500" />
                        <span>{date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-purple-500" />
                        <span>{location}</span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="relative z-10 p-6 pt-0">
                <Button className="w-full bg-white/10 text-white hover:bg-white/20 hover:text-cyan-400" asChild>
                    <Link href="#">
                        View Details
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
