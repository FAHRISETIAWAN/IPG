'use client'

import { CheckCircleIcon, ClockIcon, DocumentTextIcon, UserGroupIcon, XCircleIcon } from '@heroicons/react/24/outline'

type StatusType = 'selesai' | 'proses' | 'ditolak' | 'menunggu'

interface Activity {
  id: string
  noPengajuan: string
  nomorSurat: string
  layanan: string
  pegawai: string[]
  status: StatusType
  waktu: string
}

const activities: Activity[] = [
  {
    id: '1',
    noPengajuan: 'IPG-20260601-001',
    nomorSurat: 'B/1001/KP.02.03/2026',
    layanan: 'IPG Profesi',
    pegawai: ['Ahmad Fauzi', 'Siti Rahayu'],
    status: 'selesai',
    waktu: '14:32',
  },
  {
    id: '2',
    noPengajuan: 'TUBEL-20260601-001',
    nomorSurat: 'B/1002/KP.04.01/2026',
    layanan: 'Tugas Belajar Beasiswa',
    pegawai: ['Budi Santoso'],
    status: 'proses',
    waktu: '13:55',
  },
  {
    id: '3',
    noPengajuan: 'IPG-20260601-002',
    nomorSurat: 'B/1003/KP.02.03/2026',
    layanan: 'IPG Sertifikasi',
    pegawai: ['Dewi Kusuma', 'Eko Prasetyo', 'Fitri Handayani'],
    status: 'menunggu',
    waktu: '13:20',
  },
  {
    id: '4',
    noPengajuan: 'TUBEL-20260601-002',
    nomorSurat: 'B/1004/KP.04.01/2026',
    layanan: 'Tugas Belajar Mandiri',
    pegawai: ['Galih Permana'],
    status: 'ditolak',
    waktu: '11:48',
  },
  {
    id: '5',
    noPengajuan: 'PWK-20260601-001',
    nomorSurat: 'B/1005/KP.07.02/2026',
    layanan: 'Pindah Wilayah Kerja',
    pegawai: ['Hani Lestari', 'Irfan Maulana'],
    status: 'proses',
    waktu: '11:10',
  },
  {
    id: '6',
    noPengajuan: 'IPG-20260601-003',
    nomorSurat: 'B/1006/KP.02.03/2026',
    layanan: 'IPG Akademik',
    pegawai: ['Johan Saputra'],
    status: 'selesai',
    waktu: '10:33',
  },
  {
    id: '7',
    noPengajuan: 'UJIKOM-20260601-001',
    nomorSurat: 'B/1007/KP.03.05/2026',
    layanan: 'Uji Kompetensi JF - Kenaikan Jenjang',
    pegawai: ['Kartini Widya', 'Lutfi Ananda'],
    status: 'menunggu',
    waktu: '09:55',
  },
  {
    id: '8',
    noPengajuan: 'IPG-20260601-004',
    nomorSurat: 'B/1008/KP.02.03/2026',
    layanan: 'IPG Profesi',
    pegawai: ['Mega Putri'],
    status: 'selesai',
    waktu: '09:10',
  },
]

const LAYANAN_COLOR: Record<string, string> = {
  'IPG Profesi':                              'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400',
  'IPG Sertifikasi':                          'bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400',
  'IPG Akademik':                             'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400',
  'Tugas Belajar Beasiswa':                   'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400',
  'Tugas Belajar Mandiri':                    'bg-teal-100 text-teal-600 dark:bg-teal-900/40 dark:text-teal-400',
  'Pindah Wilayah Kerja':                     'bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400',
  'Uji Kompetensi JF - Kenaikan Jenjang':     'bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400',
  'Uji Kompetensi JF - Perpindahan Jabatan':  'bg-pink-100 text-pink-600 dark:bg-pink-900/40 dark:text-pink-400',
}

const LAYANAN_ABBR: Record<string, string> = {
  'IPG Profesi':                              'IPG',
  'IPG Sertifikasi':                          'IPG',
  'IPG Akademik':                             'IPG',
  'Tugas Belajar Beasiswa':                   'TBL',
  'Tugas Belajar Mandiri':                    'TBL',
  'Pindah Wilayah Kerja':                     'PWK',
  'Uji Kompetensi JF - Kenaikan Jenjang':     'UJK',
  'Uji Kompetensi JF - Perpindahan Jabatan':  'UJK',
}

const statusConfig: Record<StatusType, { label: string; bg: string; text: string; icon: React.ReactNode }> = {
  selesai:  { label: 'Selesai',   bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-400', icon: <CheckCircleIcon className="h-3 w-3" /> },
  proses:   { label: 'Diproses',  bg: 'bg-indigo-100 dark:bg-indigo-900/30',   text: 'text-indigo-700 dark:text-indigo-400',   icon: <ClockIcon className="h-3 w-3" /> },
  menunggu: { label: 'Menunggu',  bg: 'bg-amber-100 dark:bg-amber-900/30',     text: 'text-amber-700 dark:text-amber-400',     icon: <DocumentTextIcon className="h-3 w-3" /> },
  ditolak:  { label: 'Ditolak',   bg: 'bg-red-100 dark:bg-red-900/30',         text: 'text-red-700 dark:text-red-400',         icon: <XCircleIcon className="h-3 w-3" /> },
}

function formatPegawai(pegawai: string[]) {
  if (pegawai.length === 1) return pegawai[0]
  if (pegawai.length === 2) return `${pegawai[0]}, ${pegawai[1]}`
  return `${pegawai[0]}, ${pegawai[1]}, +${pegawai.length - 2} lainnya`
}

export function UpcomingVisits() {
  return (
    <div className="flex flex-col rounded-2xl bg-white dark:bg-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between p-4 sm:p-5">
        <div>
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-100">Aktivitas Terkini</h2>
          <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">{activities.length} pengajuan hari ini</p>
        </div>
        <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
          Hari ini
        </span>
      </div>

      {/* List */}
      <ul>
        {activities.map((act) => {
          const st = statusConfig[act.status]
          const colorClass = LAYANAN_COLOR[act.layanan] ?? 'bg-slate-100 text-slate-600'
          const abbr = LAYANAN_ABBR[act.layanan] ?? '?'
          const jumlah = act.pegawai.length

          return (
            <li key={act.id} className="flex items-center gap-3 px-4 py-3.5 transition hover:bg-slate-50 dark:hover:bg-slate-700/30 sm:px-5">
              {/* Avatar abbr */}
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[11px] font-bold ${colorClass}`}>
                {abbr}
              </div>

              {/* Info — 2 baris */}
              <div className="min-w-0 flex-1">
                {/* Baris 1: no pengajuan · no surat · layanan */}
                <p className="truncate text-xs font-medium text-slate-700 dark:text-slate-200">
                  <span className="font-mono">{act.noPengajuan}</span>
                  <span className="mx-1.5 text-slate-300 dark:text-slate-600">·</span>
                  <span className="font-mono">{act.nomorSurat}</span>
                  <span className="mx-1.5 text-slate-300 dark:text-slate-600">·</span>
                  <span className="text-slate-500 dark:text-slate-400">{act.layanan}</span>
                </p>

                {/* Baris 2: pegawai (N orang) + status + waktu */}
                <div className="mt-1 flex items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-1 text-[11px] text-slate-400">
                    <UserGroupIcon className="h-3 w-3 shrink-0" />
                    <span className="truncate">{formatPegawai(act.pegawai)} ({jumlah} orang)</span>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${st.bg} ${st.text}`}>
                      {st.icon}
                      {st.label}
                    </span>
                    <span className="text-[10px] text-slate-400">{act.waktu}</span>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>

      {/* Footer */}
      <div className="px-4 py-3">
        <button className="w-full text-center text-xs font-medium text-indigo-600 transition hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
          Lihat semua aktivitas →
        </button>
      </div>
    </div>
  )
}
