'use client'

import { layananPhases, totalPengajuanAktif } from '@/data/dashboard-data'

export function TreatmentPhases() {
  const max = Math.max(...layananPhases.map(p => p.count))

  return (
    <div className="h-full rounded-2xl bg-white p-4 dark:bg-slate-800 sm:p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Rekap Jenis Pengajuan</h3>
        <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
          Total {totalPengajuanAktif} pengajuan aktif bulan ini
        </p>
      </div>

      <div className="space-y-3.5">
        {layananPhases.map((p) => (
          <div key={p.phase}>
            <div className="mb-1.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ backgroundColor: p.color }} />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{p.phase}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{p.count}</span>
                <span className="w-8 text-right text-xs text-slate-400">{Math.round((p.count / max) * 100)}%</span>
              </div>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
              <div
                className="h-2 rounded-full transition-all duration-500"
                style={{ width: `${(p.count / max) * 100}%`, backgroundColor: p.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
