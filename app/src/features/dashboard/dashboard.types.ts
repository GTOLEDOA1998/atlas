/**
 * The Dashboard's data contract.
 *
 * Every field here is derivable from observable data — video observation or
 * coach-provided information — as required by Product Architecture §1.5. No
 * composite scores, no indices, nothing that could not be traced back to
 * evidence. These shapes mirror the Priority Engine's output, not what
 * happens to be convenient to render.
 */

/**
 * The three priority states defined by the Intelligence Core. `WAIT` items
 * are deliberately deferred, not forgotten.
 */
export type PriorityState = "WORK_NOW" | "MONITOR" | "WAIT";

/** Confidence is stated, never implied. Thin evidence must read as thin. */
export type ConfidenceLevel = "high" | "medium" | "low";

export interface AttentionItem {
  id: string;
  playerId: string;
  /** Denormalised for reading; a real query resolves it by join. */
  playerName: string;
  state: PriorityState;
  /** One sentence, carried from the priority's own reasoning. */
  reason: string;
  /** The analysis this priority was raised from — the evidence trail. */
  evidenceAnalysisId: string;
  confidence: ConfidenceLevel;
  /** ISO 8601. */
  raisedAt: string;
}

export interface PendingReview {
  /** The analysis id. */
  id: string;
  playerId: string;
  playerName: string;
  videoId: string;
  /** ISO 8601. */
  completedAt: string;
}
