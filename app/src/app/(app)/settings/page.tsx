import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { SETTINGS_NAV_ITEM } from "@/config/navigation";

export default function SettingsPage() {
  return (
    <PageContainer>
      <PageHeader
        title={SETTINGS_NAV_ITEM.label}
        description="Tu cuenta y tus preferencias."
      />

      <ComingSoon
        icon={SETTINGS_NAV_ITEM.icon}
        title="Los ajustes aún no están disponibles"
        description="Atlas debe funcionar bien por defecto: se configuran jugadores y entrenamientos, no el software."
        capabilities={[
          "Perfil y datos de la cuenta",
          "Preferencias de la interfaz",
          "Gestión de la sesión",
        ]}
        plannedFor="una versión posterior"
      />
    </PageContainer>
  );
}
