import type { AttentionItem, PendingReview } from "./dashboard.types";

/**
 * Simulated data for the Dashboard.
 *
 * **This is the only file deleted when real data arrives.** Nothing imports
 * it except `dashboard.service.ts`, so replacing the source touches no
 * component and no page.
 *
 * Every value is shaped like something Atlas could genuinely derive from
 * video and coach input. Product Architecture §1.5: mock data that could
 * never exist trains the product's structure on a fiction.
 */
export const MOCK_ATTENTION_ITEMS: AttentionItem[] = [
  {
    id: "att_01",
    playerId: "ply_01",
    playerName: "Marta Iglesias",
    state: "WORK_NOW",
    reason:
      "El desplazamiento lateral llega tarde en bola larga, lo que limita todo el juego de revés.",
    evidenceAnalysisId: "anl_114",
    confidence: "high",
    raisedAt: "2026-07-30T09:12:00.000Z",
  },
  {
    id: "att_02",
    playerId: "ply_04",
    playerName: "Daniel Ferrer",
    state: "WORK_NOW",
    reason:
      "El saque corto pierde profundidad de forma sistemática bajo presión de puntuación.",
    evidenceAnalysisId: "anl_112",
    confidence: "medium",
    raisedAt: "2026-07-29T17:40:00.000Z",
  },
  {
    id: "att_03",
    playerId: "ply_02",
    playerName: "Lucía Bernal",
    state: "MONITOR",
    reason:
      "El nuevo agarre del revés se mantiene en ejercicio cerrado; falta comprobar si sobrevive a juego libre.",
    evidenceAnalysisId: "anl_109",
    confidence: "medium",
    raisedAt: "2026-07-28T11:05:00.000Z",
  },
  {
    id: "att_04",
    playerId: "ply_07",
    playerName: "Adrián Costa",
    state: "MONITOR",
    reason:
      "Vuelve tras una semana sin entrenar; conviene observar carga antes de retomar la progresión.",
    evidenceAnalysisId: "anl_107",
    confidence: "low",
    raisedAt: "2026-07-27T08:20:00.000Z",
  },
  {
    id: "att_05",
    playerId: "ply_03",
    playerName: "Nerea Pardo",
    state: "WAIT",
    reason:
      "El remate necesita una base de consistencia que aún se está construyendo. Aplazado a propósito.",
    evidenceAnalysisId: "anl_101",
    confidence: "high",
    raisedAt: "2026-07-21T15:30:00.000Z",
  },
];

export const MOCK_PENDING_REVIEWS: PendingReview[] = [
  {
    id: "anl_118",
    playerId: "ply_02",
    playerName: "Lucía Bernal",
    videoId: "vid_233",
    completedAt: "2026-08-02T18:05:00.000Z",
  },
  {
    id: "anl_117",
    playerId: "ply_05",
    playerName: "Iván Salas",
    videoId: "vid_231",
    completedAt: "2026-08-02T16:48:00.000Z",
  },
  {
    id: "anl_116",
    playerId: "ply_01",
    playerName: "Marta Iglesias",
    videoId: "vid_229",
    completedAt: "2026-08-01T19:22:00.000Z",
  },
];
