import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { SETTINGS_NAV_ITEM, findNavItem } from "@/config/navigation";
import { ROUTES } from "@/config/routes";

const navItem = findNavItem(ROUTES.videos) ?? SETTINGS_NAV_ITEM;

export default function VideosPage() {
  return (
    <PageContainer>
      <PageHeader
        title={navItem.label}
        description="El vídeo es la evidencia sobre la que se apoya todo lo demás."
      />

      <ComingSoon
        icon={navItem.icon}
        title="La biblioteca de vídeo aún no está disponible"
        description="Subir metraje será cuestión de un par de toques desde la pista, y el procesamiento ocurrirá en segundo plano."
        capabilities={[
          "Subida rápida desde el dispositivo que ya tienes en la mano",
          "Asignación del vídeo al jugador analizado",
          "Estado de procesamiento siempre visible",
        ]}
        plannedFor="una versión posterior"
      />
    </PageContainer>
  );
}
