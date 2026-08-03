import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { SETTINGS_NAV_ITEM, findNavItem } from "@/config/navigation";
import { ROUTES } from "@/config/routes";

const navItem = findNavItem(ROUTES.analysis) ?? SETTINGS_NAV_ITEM;

export default function AnalysisPage() {
  return (
    <PageContainer>
      <PageHeader
        title={navItem.label}
        description="Lo que Atlas observó, lo que significa, y en qué evidencia se apoya."
      />

      <ComingSoon
        icon={navItem.icon}
        title="El análisis todavía no está disponible"
        description="Cada hallazgo enlazará al fragmento de vídeo del que procede, para que puedas verificarlo antes de actuar."
        capabilities={[
          "Hallazgos con su evidencia y su nivel de confianza",
          "Prioridades con el motivo por el que lo son",
          "Lo que Atlas decidió no plantear, y por qué",
        ]}
        plannedFor="una versión posterior"
      />
    </PageContainer>
  );
}
