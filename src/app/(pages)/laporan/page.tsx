'use client'

import { dataLaporan, namaBulan } from '@/data/laporan-data'
import type { StatusPengajuan } from '@/data/verifikasi-data'
import {
  AcademicCapIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  DocumentArrowDownIcon,
  FunnelIcon,
  UserGroupIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const statusConfig: Record<StatusPengajuan, { label: string; bg: string; text: string }> = {
  menunggu:     { label: 'Menunggu',     bg: 'bg-amber-100 dark:bg-amber-900/30',     text: 'text-amber-700 dark:text-amber-400' },
  diproses:     { label: 'Diproses',     bg: 'bg-indigo-100 dark:bg-indigo-900/30',   text: 'text-indigo-700 dark:text-indigo-400' },
  diverifikasi: { label: 'Diverifikasi', bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-400' },
  ditolak:      { label: 'Ditolak',      bg: 'bg-red-100 dark:bg-red-900/30',         text: 'text-red-700 dark:text-red-400' },
}

const tahunList = [2025, 2026]

const statusFilterList: { key: StatusPengajuan | 'semua'; label: string }[] = [
  { key: 'semua',        label: 'Semua Status' },
  { key: 'diverifikasi', label: 'Diverifikasi' },
  { key: 'ditolak',      label: 'Ditolak' },
  { key: 'diproses',     label: 'Diproses' },
  { key: 'menunggu',     label: 'Menunggu' },
]

// ── Dropdown wrapper untuk filter (value bisa number) ────────────────────────
function FilterDropdown<T extends string | number>({
  value, onChange, options,
}: {
  value: T
  onChange: (v: T) => void
  options: { value: T; label: string }[]
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const label = options.find(o => o.value === value)?.label ?? ''

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className={`flex h-9 items-center gap-2 rounded-xl border px-3.5 text-sm font-medium transition ${
          open
            ? 'border-indigo-500 bg-white ring-1 ring-indigo-500 dark:border-indigo-500 dark:bg-slate-800'
            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-slate-500'
        }`}
      >
        <span>{label}</span>
        <ChevronDownIcon className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.13 }}
            className="absolute left-0 top-full z-50 mt-1.5 min-w-[10rem] max-h-64 overflow-y-auto rounded-xl border border-slate-200 bg-white py-1 shadow-lg [scrollbar-width:none] [&::-webkit-scrollbar]:hidden dark:border-slate-700 dark:bg-slate-800"
          >
            {options.map(opt => (
              <li key={String(opt.value)}>
                <button
                  onClick={() => { onChange(opt.value); setOpen(false) }}
                  className={`flex w-full items-center justify-between px-3.5 py-2 text-sm transition ${
                    opt.value === value
                      ? 'bg-indigo-50 font-semibold text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'
                      : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700/50'
                  }`}
                >
                  {opt.label}
                  {opt.value === value && <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, icon, accent }: {
  label: string; value: number; sub: string; icon: React.ReactNode; accent: string
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-0">
      <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${accent}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{value}</p>
        <p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">{label}</p>
        <p className="mt-0.5 text-[11px] text-slate-400 dark:text-slate-500">{sub}</p>
      </div>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function LaporanPage() {
  const now = new Date()
  const [bulan, setBulan] = useState<number>(now.getMonth() + 1)
  const [tahun, setTahun] = useState<number>(2026)
  const [status, setStatus] = useState<StatusPengajuan | 'semua'>('semua')

  const bulanOptions = [
    { value: 0, label: 'Semua Bulan' },
    ...namaBulan.map((n, i) => ({ value: i + 1, label: n })),
  ]
  const tahunOptions = tahunList.map(t => ({ value: t, label: String(t) }))
  const statusOptions = statusFilterList.map(s => ({ value: s.key, label: s.label }))

  const filtered = dataLaporan.filter((item) => {
    const matchBulan = bulan === 0 || item.bulan === bulan
    const matchTahun = item.tahun === tahun
    const matchStatus = status === 'semua' || item.status === status
    return matchBulan && matchTahun && matchStatus
  })

  const total          = filtered.length
  const totalVerifikasi = filtered.filter(d => d.status === 'diverifikasi').length
  const totalDitolak   = filtered.filter(d => d.status === 'ditolak').length
  const totalPegawai   = filtered.reduce((s, d) => s + d.pegawai.length, 0)
  const periodeLabel   = bulan === 0 ? `Tahun ${tahun}` : `${namaBulan[bulan - 1]} ${tahun}`

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <div className="shrink-0 border-b border-slate-200 bg-white px-4 py-4 dark:border-slate-700 dark:bg-slate-800 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100">Laporan Pengajuan</h1>
            <p className="mt-0.5 text-sm text-slate-400">Rekap data IPG &amp; TUBEL · {periodeLabel}</p>
          </div>
          <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-300 dark:hover:border-indigo-500 dark:hover:text-indigo-400">
            <DocumentArrowDownIcon className="h-4 w-4" />
            Export Excel
          </button>
        </div>

        {/* Filters */}
        <div className="mt-4 flex flex-wrap gap-2">
          <FilterDropdown value={bulan} onChange={setBulan} options={bulanOptions} />
          <FilterDropdown value={tahun} onChange={setTahun} options={tahunOptions} />
          <FilterDropdown value={status} onChange={v => setStatus(v as StatusPengajuan | 'semua')} options={statusOptions} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-white px-4 py-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden dark:bg-slate-800 sm:px-6">

        {/* Stat cards */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard
            label="Total Pengajuan" value={total} sub={periodeLabel}
            accent="bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400"
            icon={<DocumentArrowDownIcon className="h-4 w-4" />}
          />
          <StatCard
            label="Diverifikasi" value={totalVerifikasi}
            sub={`${total ? Math.round(totalVerifikasi / total * 100) : 0}% dari total`}
            accent="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400"
            icon={<CheckCircleIcon className="h-4 w-4" />}
          />
          <StatCard
            label="Ditolak" value={totalDitolak}
            sub={`${total ? Math.round(totalDitolak / total * 100) : 0}% dari total`}
            accent="bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400"
            icon={<XCircleIcon className="h-4 w-4" />}
          />
          <StatCard
            label="Total Pegawai" value={totalPegawai} sub="diajukan periode ini"
            accent="bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400"
            icon={<UserGroupIcon className="h-4 w-4" />}
          />
        </div>

        {/* Detail list */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <FunnelIcon className="mb-3 h-10 w-10 text-slate-300 dark:text-slate-600" />
            <p className="text-sm font-medium text-slate-500">Tidak ada data untuk filter ini</p>
            <p className="text-xs text-slate-400">Coba ubah bulan, tahun, atau status</p>
          </div>
        ) : (
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Detail Pengajuan</h2>
              <span className="text-xs text-slate-400">{filtered.length} data · {totalPegawai} pegawai</span>
            </div>

            {/* Desktop table */}
            <div className="hidden overflow-hidden rounded-2xl ring-1 ring-slate-200 dark:ring-slate-700/50 sm:block">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50 dark:border-slate-700/50 dark:bg-slate-700/20">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">Kode</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">Layanan</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">Nomor Surat</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">Pegawai</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">Tanggal</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                  {filtered.map((item) => {
                    const st = statusConfig[item.status]
                    const isIPG = item.layanan.startsWith('IPG')
                    return (
                      <tr key={item.id} className="transition hover:bg-slate-50 dark:hover:bg-slate-700/20">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                              isIPG ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400'
                                    : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400'
                            }`}>
                              {isIPG ? <BriefcaseIcon className="h-3.5 w-3.5" /> : <AcademicCapIcon className="h-3.5 w-3.5" />}
                            </div>
                            <span className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-200">{item.kode}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-600 dark:text-slate-300">{item.layanan}</td>
                        <td className="px-4 py-3 font-mono text-xs text-slate-500 dark:text-slate-400">{item.nomorSurat}</td>
                        <td className="px-4 py-3 text-xs text-slate-700 dark:text-slate-200">
                          {item.pegawai[0].nama}
                          {item.pegawai.length > 1 && (
                            <span className="ml-1 rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500 dark:bg-slate-700 dark:text-slate-400">
                              +{item.pegawai.length - 1}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-500 dark:text-slate-400">{item.tanggal}</td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${st.bg} ${st.text}`}>
                            {st.label}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile list */}
            <div className="divide-y divide-slate-100 dark:divide-slate-700/50 sm:hidden">
              {filtered.map((item) => {
                const st = statusConfig[item.status]
                const isIPG = item.layanan.startsWith('IPG')
                return (
                  <div key={item.id} className="flex items-center gap-3 py-3">
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                      isIPG ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400'
                            : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400'
                    }`}>
                      {isIPG ? <BriefcaseIcon className="h-4 w-4" /> : <AcademicCapIcon className="h-4 w-4" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-200">{item.kode}</p>
                      <p className="truncate text-[11px] text-slate-400">{item.layanan} · {item.tanggal}</p>
                      <p className="truncate text-[11px] text-slate-500">{item.pegawai[0].nama}{item.pegawai.length > 1 ? ` +${item.pegawai.length - 1}` : ''}</p>
                    </div>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${st.bg} ${st.text}`}>
                      {st.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
