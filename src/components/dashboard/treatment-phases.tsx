'use client'

import { layananPhases, totalPengajuanAktif } from '@/data/dashboard-data'

export function TreatmentPhases() {
  return (
    <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-0 sm:p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-sm font-medium text-slate-700 dark:text-slate-200">Rekap Jenis Pengajuan</h3>
          <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
            Total {totalPengajuanAktif} pengajuan aktif bulan ini
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          {layananPhases.map((p) => (
            <div key={p.phase} className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: p.color }} />
              <span className="text-xs text-slate-500 dark:text-slate-400">{p.phase}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-4">
        {layananPhases.map((p) => (
          <div key={p.phase} className="flex-1">
            <div className="flex items-center justify-between sm:block">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-100 sm:text-lg">{p.count} pengajuan</span>
              <span className="text-xs text-slate-400 sm:hidden">{p.percentage}%</span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-700">
              <div className="h-2 rounded-full transition-all duration-500"
                style={{ width: `${p.percentage}%`, backgroundColor: p.color }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
