'use client'

import { statsData } from '@/data/dashboard-data'
import { ChevronRightIcon } from '@heroicons/react/24/outline'


function StatCard({ label, total, target, bulan, barColor }: {
  label: string; total: number; target: number; bulan: string; barColor: string
}) {
  const pct = Math.round((total / target) * 100)
  return (
    <div className="rounded-2xl bg-white p-4 text-slate-800 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-white dark:ring-0 sm:p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{label}</span>
        <ChevronRightIcon className="h-4 w-4 text-slate-400 dark:text-slate-500" />
      </div>
      <div className="mt-3 flex items-end gap-2 sm:mt-4">
        <span className="text-3xl font-bold sm:text-4xl">{total}</span>
        <span className="mb-1 text-sm text-slate-400">/ {target} — {bulan}</span>
      </div>
      <div className="mt-3 h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-700">
        <div className={`h-1.5 rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-2 text-right text-xs text-slate-400 dark:text-slate-500">{pct}%</div>
    </div>
  )
}

export function StatsCards() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      <StatCard label="Total IPG"           total={statsData.totalIPG.total}    target={statsData.totalIPG.target}    bulan={statsData.totalIPG.bulan}    barColor="bg-indigo-500" />
      <StatCard label="Total Tugas Belajar" total={statsData.totalTUBEL.total}  target={statsData.totalTUBEL.target}  bulan={statsData.totalTUBEL.bulan}  barColor="bg-emerald-500" />
      <StatCard label="Pindah Wilayah Kerja"total={statsData.totalPWK.total}    target={statsData.totalPWK.target}    bulan={statsData.totalPWK.bulan}    barColor="bg-orange-500" />
      <StatCard label="Uji Kompetensi JF"   total={statsData.totalUJIKOM.total} target={statsData.totalUJIKOM.target} bulan={statsData.totalUJIKOM.bulan} barColor="bg-rose-500" />
    </div>
  )
}
