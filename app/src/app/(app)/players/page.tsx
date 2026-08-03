import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { SETTINGS_NAV_ITEM, findNavItem } from "@/config/navigation";
import { ROUTES } from "@/config/routes";

const navItem = findNavItem(ROUTES.players) ?? SETTINGS_NAV_ITEM;

export default function PlayersPage() {
  return (
    <PageContainer>
      <PageHeader
        title={navItem.label}
        description="El jugador es la unidad de trabajo: su ficha reúne historial, análisis y entrenamiento en un solo sitio."
      />

      <ComingSoon
        icon={navItem.icon}
        title="El módulo de Jugadores llega en el próximo Sprint"
        description="Aquí vivirá tu plantilla, y dentro de cada ficha la evolución del jugador a lo largo del tiempo."
        capabilities={[
          "Plantilla con búsqueda y acceso rápido",
          "Ficha con resumen, evolución, vídeos, análisis y entrenamientos",
          "Vinculación entre una persona y su cuenta cuando exista",
        ]}
        plannedFor="Sprint 3"
      />
    </PageContainer>
  );
}
