'use client'

import { staffInfo } from '@/data/dashboard-data'

export function DashboardHeader() {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-xl font-semibold text-slate-800 dark:text-white sm:text-2xl">
        Selamat Datang, <span className="text-indigo-600 dark:text-indigo-400">{staffInfo.name}</span>
      </h1>
      <p className="text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
        {staffInfo.unit} &nbsp;·&nbsp;{' '}
        <span className="font-medium text-slate-700 dark:text-slate-200">{staffInfo.shift}</span>
      </p>
    </div>
  )
}
