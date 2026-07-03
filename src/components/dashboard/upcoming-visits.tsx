'use client'

import { AcademicCapIcon, BriefcaseIcon, CheckCircleIcon, ClockIcon, DocumentTextIcon, XCircleIcon } from '@heroicons/react/24/outline'

type StatusType = 'selesai' | 'proses' | 'ditolak' | 'menunggu'
type JenisType = 'IPG' | 'TUBEL'

interface Activity {
  id: string
  nama: string
  nip: string
  jenis: JenisType
  layanan: string
  status: StatusType
  waktu: string
}

const activities: Activity[] = [
  { id: '1', nama: 'Ahmad Fauzi', nip: '198501012010011001', jenis: 'IPG', layanan: 'IPG Profesi', status: 'selesai', waktu: '14:32' },
  { id: '2', nama: 'Siti Rahayu', nip: '198703152011012002', jenis: 'TUBEL', layanan: 'TUBEL Beasiswa', status: 'proses', waktu: '13:55' },
  { id: '3', nama: 'Budi Santoso', nip: '199002202012011003', jenis: 'IPG', layanan: 'IPG Sertifikasi', status: 'menunggu', waktu: '13:20' },
  { id: '4', nama: 'Dewi Kusuma', nip: '198811102013012004', jenis: 'TUBEL', layanan: 'TUBEL Mandiri', status: 'ditolak', waktu: '11:48' },
  { id: '5', nama: 'Eko Prasetyo', nip: '199205182014011005', jenis: 'IPG', layanan: 'IPG Akademik', status: 'selesai', waktu: '11:10' },
  { id: '6', nama: 'Fitri Handayani', nip: '198604252015012006', jenis: 'IPG', layanan: 'IPG Profesi', status: 'proses', waktu: '10:33' },
  { id: '7', nama: 'Galih Permana', nip: '199108302016011007', jenis: 'TUBEL', layanan: 'TUBEL Beasiswa', status: 'selesai', waktu: '09:55' },
  { id: '8', nama: 'Hani Lestari', nip: '199307122017012008', jenis: 'IPG', layanan: 'IPG Profesi', status: 'menunggu', waktu: '09:10' },
  { id: '9', nama: 'Irfan Maulana', nip: '198912052018011009', jenis: 'TUBEL', layanan: 'TUBEL Mandiri', status: 'selesai', waktu: '08:45' },
]

const statusConfig: Record<StatusType, { label: string; bg: string; text: string; icon: React.ReactNode }> = {
  selesai: {
    label: 'Selesai',
    bg: 'bg-emerald-100 dark:bg-emerald-900/30',
    text: 'text-emerald-700 dark:text-emerald-400',
    icon: <CheckCircleIcon className="h-3 w-3" />,
  },
  proses: {
    label: 'Diproses',
    bg: 'bg-indigo-100 dark:bg-indigo-900/30',
    text: 'text-indigo-700 dark:text-indigo-400',
    icon: <ClockIcon className="h-3 w-3" />,
  },
  menunggu: {
    label: 'Menunggu',
    bg: 'bg-amber-100 dark:bg-amber-900/30',
    text: 'text-amber-700 dark:text-amber-400',
    icon: <DocumentTextIcon className="h-3 w-3" />,
  },
  ditolak: {
    label: 'Ditolak',
    bg: 'bg-red-100 dark:bg-red-900/30',
    text: 'text-red-700 dark:text-red-400',
    icon: <XCircleIcon className="h-3 w-3" />,
  },
}

export function UpcomingVisits() {
  return (
    <div className="flex h-full flex-col rounded-2xl bg-white ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-0">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 p-4 dark:border-slate-700 sm:p-5">
        <div>
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-100">Aktivitas Terkini</h2>
          <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">{activities.length} pengajuan hari ini</p>
        </div>
        <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
          Hari ini
        </span>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <ul className="divide-y divide-slate-100 dark:divide-slate-700/50">
          {activities.map((act) => {
            const st = statusConfig[act.status]
            return (
              <li key={act.id} className="flex items-center gap-3 px-4 py-3 transition hover:bg-slate-50 dark:hover:bg-slate-700/30 sm:px-5">
                {/* Icon jenis */}
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                  act.jenis === 'IPG'
                    ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400'
                    : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400'
                }`}>
                  {act.jenis === 'IPG'
                    ? <BriefcaseIcon className="h-4 w-4" />
                    : <AcademicCapIcon className="h-4 w-4" />
                  }
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-slate-700 dark:text-slate-200">{act.nama}</p>
                  <p className="truncate text-[11px] text-slate-400">{act.layanan} · {act.nip.slice(0, 8)}...</p>
                </div>

                {/* Status + waktu */}
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <span className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${st.bg} ${st.text}`}>
                    {st.icon}
                    {st.label}
                  </span>
                  <span className="text-[10px] text-slate-400">{act.waktu}</span>
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-100 px-4 py-3 dark:border-slate-700">
        <button className="w-full text-center text-xs font-medium text-indigo-600 transition hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
          Lihat semua aktivitas →
        </button>
      </div>
    </div>
  )
}
