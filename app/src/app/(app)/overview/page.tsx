import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  AttentionList,
  PendingReviewList,
  SampleDataNotice,
  dashboardService,
} from "@/features/dashboard";

/**
 * The Dashboard answers exactly one question: what needs my attention today.
 *
 * A Server Component that awaits the dashboard service. When that service
 * starts reading real data, this page does not change.
 */
export default async function OverviewPage() {
  const [attentionItems, pendingReviews] = await Promise.all([
    dashboardService.getAttentionItems(),
    dashboardService.getPendingReviews(),
  ]);

  return (
    <PageContainer>
      <PageHeader
        title="Inicio"
        description="Lo que necesita tu atención hoy."
      />

      {dashboardService.isUsingSampleData() && <SampleDataNotice />}

      <div className="grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <AttentionList items={attentionItems} />
        <PendingReviewList reviews={pendingReviews} />
      </div>
    </PageContainer>
  );
}
