'use client'

import { DetailSheet } from '@/components/verifikasi/detail-sheet'
import { daftarPengajuan, type PengajuanVerifikasi } from '@/data/verifikasi-data'
import {
  BriefcaseIcon,
  AcademicCapIcon,
  MagnifyingGlassIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline'
import { useState } from 'react'

export default function VerifikasiPage() {
  const [data, setData] = useState<PengajuanVerifikasi[]>(
    daftarPengajuan.filter((d) => d.status === 'menunggu')
  )
  const [search, setSearch] = useState('')
  const [selectedItem, setSelectedItem] = useState<PengajuanVerifikasi | null>(null)

  const filtered = data.filter((item) => {
    const q = search.toLowerCase()
    return (
      !q ||
      item.kode.toLowerCase().includes(q) ||
      item.nomorSurat.toLowerCase().includes(q) ||
      item.layanan.toLowerCase().includes(q) ||
      item.pegawai.some((p) => p.nama.toLowerCase().includes(q) || p.nip.includes(q))
    )
  })

  const handleVerifikasi = (id: string) => {
    setData((prev) => prev.filter((item) => item.id !== id))
  }

  const handleTolak = (id: string) => {
    setData((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <>
      <div className="flex h-full flex-col overflow-hidden">
        {/* Page header */}
        <div className="shrink-0 border-b border-slate-200 bg-white px-4 py-4 dark:border-slate-700 dark:bg-slate-800 sm:px-6">
          <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100">Verifikasi Pengajuan</h1>
          <p className="mt-0.5 text-sm text-slate-400">Daftar pengajuan yang menunggu verifikasi</p>

          {/* Search */}
          <div className="relative mt-4 w-full sm:w-72">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari kode, pegawai, NIP..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-200 dark:placeholder-slate-400"
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto bg-white px-4 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden dark:bg-slate-800 sm:px-6">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <ClipboardDocumentCheckIcon className="mb-3 h-10 w-10 text-slate-300 dark:text-slate-600" />
              <p className="text-sm font-medium text-slate-500">Tidak ada pengajuan yang menunggu verifikasi</p>
              <p className="text-xs text-slate-400">Semua pengajuan sudah diproses</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {filtered.map((item) => {
                const isIPG = item.layanan.startsWith('IPG')
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 px-0 py-4 transition hover:bg-slate-50 dark:hover:bg-slate-700/20 sm:px-1"
                  >
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                      isIPG
                        ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400'
                        : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400'
                    }`}>
                      {isIPG ? <BriefcaseIcon className="h-5 w-5" /> : <AcademicCapIcon className="h-5 w-5" />}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="font-mono text-sm font-semibold text-slate-700 dark:text-slate-200">{item.kode}</span>
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                          Menunggu
                        </span>
                      </div>
                      <p className="mt-0.5 truncate text-xs text-slate-400">
                        {item.layanan} · {item.nomorSurat} · {item.tanggal}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
                        {item.pegawai.map(p => p.nama).join(', ')}
                        <span className="text-slate-400"> ({item.pegawai.length} orang)</span>
                      </p>
                    </div>

                    <button
                      onClick={() => setSelectedItem(item)}
                      className="shrink-0 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:border-indigo-800/50 dark:bg-indigo-900/20 dark:text-indigo-400 dark:hover:bg-indigo-900/30"
                    >
                      Detail
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <DetailSheet
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onVerifikasi={handleVerifikasi}
        onTolak={handleTolak}
      />
    </>
  )
}
