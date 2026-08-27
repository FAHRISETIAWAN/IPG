'use client'

import { statsData } from '@/data/dashboard-data'
import { daftarPengajuan as verifikasiData } from '@/data/verifikasi-data'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

type Layanan = 'IPG' | 'TUBEL' | 'PWK' | 'UJIKOM'

const LAYANAN_FILTER: Record<Layanan, string[]> = {
  IPG:    ['IPG Profesi', 'IPG Sertifikasi', 'IPG Akademik'],
  TUBEL:  ['Tugas Belajar Mandiri', 'Tugas Belajar Beasiswa'],
  PWK:    ['Pindah Wilayah Kerja'],
  UJIKOM: ['Uji Kompetensi JF - Perpindahan Jabatan', 'Uji Kompetensi JF - Kenaikan Jenjang'],
}

const STATUS_STYLE: Record<string, string> = {
  menunggu:    'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  diproses:    'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  diverifikasi:'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  ditolak:     'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
}

const STATUS_LABEL: Record<string, string> = {
  menunggu:    'Menunggu',
  diproses:    'Diproses',
  diverifikasi:'Diverifikasi',
  ditolak:     'Ditolak',
}

function StatCard({ label, total, target, bulan, barColor, layanan, onClick }: {
  label: string; total: number; target: number; bulan: string; barColor: string
  layanan: Layanan; onClick: (l: Layanan) => void
}) {
  const pct = Math.round((total / target) * 100)
  return (
    <button
      type="button"
      onClick={() => onClick(layanan)}
      className="w-full rounded-2xl bg-white p-4 text-left ring-1 ring-slate-200 transition hover:ring-2 hover:shadow-md dark:bg-slate-800 dark:ring-0 dark:hover:ring-slate-600 sm:p-5"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{label}</span>
        <ChevronRightIcon className="h-4 w-4 text-slate-400 dark:text-slate-500" />
      </div>
      <div className="mt-3 flex items-end gap-2 sm:mt-4">
        <span className="text-3xl font-bold text-slate-800 dark:text-white sm:text-4xl">{total}</span>
        <span className="mb-1 text-sm text-slate-400">/ {target} — {bulan}</span>
      </div>
      <div className="mt-3 h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-700">
        <div className={`h-1.5 rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-2 text-right text-xs text-slate-400 dark:text-slate-500">{pct}%</div>
    </button>
  )
}

const LABEL: Record<Layanan, string> = {
  IPG:    'Total IPG',
  TUBEL:  'Total Tugas Belajar',
  PWK:    'Pindah Wilayah Kerja',
  UJIKOM: 'Uji Kompetensi JF',
}

export function StatsCards() {
  const [active, setActive] = useState<Layanan | null>(null)

  const items = active
    ? verifikasiData.filter(v => LAYANAN_FILTER[active].includes(v.layanan))
    : []

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard label="Total IPG"            total={statsData.totalIPG.total}    target={statsData.totalIPG.target}    bulan={statsData.totalIPG.bulan}    barColor="bg-indigo-500"  layanan="IPG"    onClick={setActive} />
        <StatCard label="Total Tugas Belajar"  total={statsData.totalTUBEL.total}  target={statsData.totalTUBEL.target}  bulan={statsData.totalTUBEL.bulan}  barColor="bg-emerald-500" layanan="TUBEL"  onClick={setActive} />
        <StatCard label="Pindah Wilayah Kerja" total={statsData.totalPWK.total}    target={statsData.totalPWK.target}    bulan={statsData.totalPWK.bulan}    barColor="bg-orange-500"  layanan="PWK"    onClick={setActive} />
        <StatCard label="Uji Kompetensi JF"    total={statsData.totalUJIKOM.total} target={statsData.totalUJIKOM.target} bulan={statsData.totalUJIKOM.bulan} barColor="bg-rose-500"    layanan="UJIKOM" onClick={setActive} />
      </div>

      {/* Overlay */}
      <AnimatePresence>
        {active && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
              onClick={() => setActive(null)}
            />
            <motion.div
              key="sheet"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed right-0 top-0 z-50 flex h-full w-full flex-col bg-white shadow-2xl dark:bg-slate-900"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-700">
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-100">{LABEL[active]}</h3>
                  <p className="mt-0.5 text-xs text-slate-400">{items.length} pengajuan</p>
                </div>
                <button onClick={() => setActive(null)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              {/* List */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
                {items.length === 0 ? (
                  <p className="py-10 text-center text-sm text-slate-400">Tidak ada data</p>
                ) : items.map(item => (
                  <div key={item.id} className="rounded-xl border border-slate-100 px-4 py-3.5 dark:border-slate-700">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-xs font-mono text-slate-400">{item.kode}</p>
                        <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-200">
                          {item.pegawai.map(p => p.nama).join(', ')}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-400">{item.layanan}</p>
                        <p className="mt-0.5 text-xs text-slate-400">{item.tanggal} · {item.nomorSurat}</p>
                      </div>
                      <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${STATUS_STYLE[item.status]}`}>
                        {STATUS_LABEL[item.status]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
