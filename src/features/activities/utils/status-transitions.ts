import { ActivityStatus } from "@/generated/prisma/enums";

/**
 * Defines the valid status transitions for activities.
 * COMPLETED and CANCELLED are terminal states (no outgoing transitions).
 */
export const VALID_TRANSITIONS: Record<ActivityStatus, ActivityStatus[]> = {
    [ActivityStatus.DRAFT]: [ActivityStatus.PUBLISHED, ActivityStatus.CANCELLED],
    [ActivityStatus.PUBLISHED]: [
        ActivityStatus.REGISTRATION_CLOSED,
        ActivityStatus.CANCELLED,
        ActivityStatus.COMPLETED,
    ],
    [ActivityStatus.REGISTRATION_CLOSED]: [
        ActivityStatus.PUBLISHED,
        ActivityStatus.COMPLETED,
        ActivityStatus.CANCELLED,
    ],
    [ActivityStatus.COMPLETED]: [],
    [ActivityStatus.CANCELLED]: [],
};

/**
 * Returns the valid next statuses for a given current status.
 */
export function getValidNextStatuses(currentStatus: ActivityStatus): ActivityStatus[] {
    return VALID_TRANSITIONS[currentStatus] ?? [];
}
