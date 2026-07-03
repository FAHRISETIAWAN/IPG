import {
  DashboardHeader,
  StatsCards,
  TreatmentPhases,
  UpcomingVisits,
  VisitChart,
} from '@/components/dashboard'

export default function DashboardPage() {
  return (
    <div className="flex h-full flex-col overflow-hidden lg:flex-row lg:gap-4 lg:p-4 xl:gap-6 xl:p-6">
      {/* Main content */}
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 lg:p-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <DashboardHeader />
        <StatsCards />
        <VisitChart />
        <TreatmentPhases />

        {/* Upcoming visits — mobile only */}
        <div className="lg:hidden">
          <UpcomingVisits />
        </div>
      </div>

      {/* Right panel — desktop */}
      <div className="hidden w-80 shrink-0 lg:block xl:w-96">
        <UpcomingVisits />
      </div>
    </div>
  )
}
