import { ActionCard } from "./ActionCard";

export function HomeActions() {
  return (
    <section className="grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
      <ActionCard
        emoji="🏓"
        title="Entrenar"
        description="Planifica sesiones con IA y mejora tu técnica."
      />

      <ActionCard
        emoji="📊"
        title="Analizar"
        description="Revisa tu progreso y estadísticas."
      />

      <ActionCard
        emoji="🛒"
        title="Material"
        description="Encuentra la combinación ideal de madera y gomas."
      />

      <ActionCard
        emoji="👥"
        title="Club"
        description="Gestiona jugadores, entrenamientos y equipos."
      />
    </section>
  );
}