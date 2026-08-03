import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { SETTINGS_NAV_ITEM, findNavItem } from "@/config/navigation";
import { ROUTES } from "@/config/routes";

const navItem = findNavItem(ROUTES.library) ?? SETTINGS_NAV_ITEM;

export default function LibraryPage() {
  return (
    <PageContainer>
      <PageHeader
        title={navItem.label}
        description="Material de consulta: técnicas, progresiones y ejercicios."
      />

      <ComingSoon
        icon={navItem.icon}
        title="La biblioteca todavía no está disponible"
        description="El conocimiento del deporte estructurado, y la base sobre la que el Asistente fundamenta lo que propone."
        capabilities={[
          "Técnicas con sus prerrequisitos y progresiones",
          "Ejercicios asociados a cada técnica",
          "Consulta rápida durante la sesión",
        ]}
        plannedFor="una versión posterior"
      />
    </PageContainer>
  );
}
