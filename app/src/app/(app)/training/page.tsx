import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { SETTINGS_NAV_ITEM, findNavItem } from "@/config/navigation";
import { ROUTES } from "@/config/routes";

const navItem = findNavItem(ROUTES.training) ?? SETTINGS_NAV_ITEM;

export default function TrainingPage() {
  return (
    <PageContainer>
      <PageHeader
        title={navItem.label}
        description="Donde el análisis se convierte en trabajo concreto sobre la mesa."
      />

      <ComingSoon
        icon={navItem.icon}
        title="Los entrenamientos aún no están disponibles"
        description="Atlas propondrá el diseño y el razonamiento; la sesión sigue siendo tuya."
        capabilities={[
          "Objetivos trazables hasta la prioridad que los originó",
          "Planes con progresión y momento de reevaluación definidos de antemano",
          "Propuestas que puedes aceptar, modificar o rechazar",
        ]}
        plannedFor="una versión posterior"
      />
    </PageContainer>
  );
}
