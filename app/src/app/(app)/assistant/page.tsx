import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { SETTINGS_NAV_ITEM, findNavItem } from "@/config/navigation";
import { ROUTES } from "@/config/routes";

const navItem = findNavItem(ROUTES.assistant) ?? SETTINGS_NAV_ITEM;

export default function AssistantPage() {
  return (
    <PageContainer>
      <PageHeader
        title={navItem.label}
        description="Una sola inteligencia con el contexto completo de cada jugador."
      />

      <ComingSoon
        icon={navItem.icon}
        title="El Asistente todavía no está disponible"
        description="Atlas responderá con el historial completo del jugador delante, y explicará siempre en qué evidencia se apoya."
        capabilities={[
          "Consultas sobre cualquier jugador con su historial como contexto",
          "Explicación de por qué una prioridad es una prioridad",
          "Propuestas de entrenamiento a partir del análisis",
        ]}
        plannedFor="una versión posterior"
      />
    </PageContainer>
  );
}
