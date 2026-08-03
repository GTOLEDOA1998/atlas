import { MOCK_ATTENTION_ITEMS, MOCK_PENDING_REVIEWS } from "./dashboard.mock";
import type { AttentionItem, PendingReview } from "./dashboard.types";

/**
 * The Dashboard's data boundary.
 *
 * These functions are `async` even though they currently read from an
 * in-memory array. When they start querying for real, no call site changes —
 * only the body of each function does, and `dashboard.mock.ts` is deleted.
 *
 * **This service is temporary by design.** Once `features/analysis` and
 * `features/players` exist, the Dashboard becomes a composition over their
 * services and this file goes away. It should not grow domain logic.
 */
export const dashboardService = {
  async getAttentionItems(): Promise<AttentionItem[]> {
    return MOCK_ATTENTION_ITEMS;
  },

  async getPendingReviews(): Promise<PendingReview[]> {
    return MOCK_PENDING_REVIEWS;
  },

  /**
   * Whether the Dashboard is running on simulated data.
   *
   * Drives the notice in the interface. Presenting fabricated priorities to a
   * coach without saying so would assert something Atlas cannot justify.
   * Returns `false` — and the notice disappears — the moment this service
   * reads real data.
   */
  isUsingSampleData(): boolean {
    return true;
  },
};
