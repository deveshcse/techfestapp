import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ErrorStateProps {
    title?: string;
    message?: string;
    action?: ReactNode;
    className?: string;
}

export function ErrorState({
    title = "An error occurred",
    message = "Please try again later.",
    action,
    className
}: ErrorStateProps) {
    return (
        <div className={cn(
            "p-8 text-center border-2 border-dashed border-destructive/50 rounded-xl bg-destructive/5",
            className
        )}>
            <div className="flex flex-col items-center">
                <AlertCircle className="h-8 w-8 text-destructive mb-3" />
                <p className="text-destructive font-semibold">{title}</p>
                <p className="text-sm text-muted-foreground mt-1 mb-6">
                    {message}
                </p>
                {action && (
                    <div className="flex justify-center">
                        {action}
                    </div>
                )}
            </div>
        </div>
    );
}
