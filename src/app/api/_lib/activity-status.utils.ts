import prisma from "@/lib/prisma";

/**
 * Lazily auto-completes all PUBLISHED or REGISTRATION_CLOSED activities
 * whose endDateTime has already passed. Called at API read time to
 * ensure statuses are always accurate without requiring a cron job.
 *
 * Debounced to run at most once every 5 minutes to avoid unnecessary
 * DB round-trips on every API call. The module-level `lastRun` variable
 * persists across calls because Node.js caches modules in memory.
 */
let lastRun = 0;
const DEBOUNCE_MS = 5 * 60 * 1000; // 5 minutes

export async function autoCompletePastActivities() {
    const now = Date.now();
    if (now - lastRun < DEBOUNCE_MS) return;
    lastRun = now;

    return prisma.activity.updateMany({
        where: {
            status: { in: ["PUBLISHED", "REGISTRATION_CLOSED"] },
            endDateTime: { lt: new Date() },
        },
        data: { status: "COMPLETED" },
    });
}
