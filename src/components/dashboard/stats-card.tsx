'use client'

import { statsData } from '@/data/dashboard-data'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

function ProgressBar({ percentage, color = 'bg-indigo-500', light = false }: { percentage: number; color?: string; light?: boolean }) {
  return (
    <div className={`mt-3 h-1.5 w-full rounded-full ${light ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-700'}`}>
      <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${percentage}%` }} />
    </div>
  )
}

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
      {/* Pengajuan Hari Ini */}
      <div className="rounded-2xl bg-indigo-600 p-4 text-white sm:p-5">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium opacity-90">Pengajuan Hari Ini</span>
          <ChevronRightIcon className="h-4 w-4 opacity-70" />
        </div>
        <div className="mt-3 flex items-end gap-2 sm:mt-4">
          <span className="text-3xl font-bold sm:text-4xl">{statsData.pengajuanHariIni.total}</span>
          <span className="mb-1 text-sm opacity-80">/ {statsData.pengajuanHariIni.target} target</span>
        </div>
        <ProgressBar percentage={statsData.pengajuanHariIni.percentage} color="bg-white/60" light />
        <div className="mt-2 text-right text-xs opacity-70">{statsData.pengajuanHariIni.percentage}%</div>
      </div>

      {/* Total IPG */}
      <div className="rounded-2xl bg-white p-4 text-slate-800 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-white dark:ring-0 sm:p-5">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Total IPG</span>
          <ChevronRightIcon className="h-4 w-4 text-slate-400 dark:text-slate-500" />
        </div>
        <div className="mt-3 flex items-end gap-2 sm:mt-4">
          <span className="text-3xl font-bold sm:text-4xl">{statsData.totalIPG.total}</span>
          <span className="mb-1 text-sm text-slate-400">
            / {statsData.totalIPG.target} — {statsData.totalIPG.bulan}
          </span>
        </div>
        <div className="mt-3 h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-700">
          <div className="h-1.5 rounded-full bg-indigo-500" style={{ width: `${statsData.totalIPG.percentage}%` }} />
        </div>
        <div className="mt-2 text-right text-xs text-slate-400 dark:text-slate-500">{statsData.totalIPG.percentage}%</div>
      </div>

      {/* Total TUBEL */}
      <div className="rounded-2xl bg-white p-4 text-slate-800 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-white dark:ring-0 sm:p-5">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Total Tugas Belajar</span>
          <ChevronRightIcon className="h-4 w-4 text-slate-400 dark:text-slate-500" />
        </div>
        <div className="mt-3 flex items-end gap-2 sm:mt-4">
          <span className="text-3xl font-bold sm:text-4xl">{statsData.totalTUBEL.total}</span>
          <span className="mb-1 text-sm text-slate-400">
            / {statsData.totalTUBEL.target} — {statsData.totalTUBEL.bulan}
          </span>
        </div>
        <div className="mt-3 h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-700">
          <div className="h-1.5 rounded-full bg-emerald-500" style={{ width: `${statsData.totalTUBEL.percentage}%` }} />
        </div>
        <div className="mt-2 text-right text-xs text-slate-400 dark:text-slate-500">{statsData.totalTUBEL.percentage}%</div>
      </div>
    </div>
  )
}
