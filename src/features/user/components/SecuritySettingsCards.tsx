"use client";

import { ChangePasswordCard } from "./ChangePasswordCard";

export function SecuritySettingsCards() {
    return (
        <div className="space-y-6">
            <ChangePasswordCard />
            {/* 2FA and other security cards could go here */}
        </div>
    );
}
