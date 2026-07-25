'use client'

import { usePathname } from 'next/navigation'
import { ThemeToggle } from './theme-toggle'

const PAGE_LABELS: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/dashboard/patients': 'Patients',
  '/dashboard/calendar': 'Calendar',
  '/dashboard/messages': 'Messages',
  '/dashboard/reports': 'Reports',
  '/dashboard/profile': 'Profile',
  '/dashboard/settings': 'Settings',
  '/formpermintaan': 'Form Permintaan',
  '/formdatapegawai': 'Data Pendidikan Pegawai',
  '/formkelengkapan': 'Kelengkapan Dokumen',
  '/verifikasi': 'Verifikasi Pengajuan',
  '/laporan': 'Laporan Pengajuan',
  '/pegawai': 'Manajemen Pegawai',
  '/sk': 'Surat Keputusan',
  '/surat/rekomendasi': 'Surat Rekomendasi',
  '/surat/sertifikat': 'Sertifikat',
  '/perpanjangan': 'Perpanjangan TUBEL Beasiswa',
  '/formujikom': 'Uji Kompetensi JF',
}

export function DashboardTopbar() {
  const pathname = usePathname()
  const pageLabel = PAGE_LABELS[pathname] ?? 'Halaman'

  return (
    <header className="flex h-14 items-center justify-between bg-white px-4 dark:bg-slate-900 sm:px-6">
      {/* Left: logo (mobile) + breadcrumb */}
      <div className="flex items-center gap-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 lg:hidden">
          <span className="text-xs font-bold text-white">IP</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium text-slate-800 dark:text-slate-200">{pageLabel}</span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-3">
        <ThemeToggle />

        {/* Avatar */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white">
            A
          </div>
          <div className="hidden lg:block">
            <p className="text-xs font-medium text-slate-700 dark:text-slate-200">dr Alice</p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500">General Practitioner</p>
          </div>
        </div>
      </div>
    </header>
  )
}
