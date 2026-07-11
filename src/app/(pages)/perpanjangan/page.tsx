'use client'

import { DatePicker } from '@/components/form/date-picker'
import { FileUpload } from '@/components/form/file-upload'
import { daftarPerpanjangan, type PerpanjanganTubel } from '@/data/perpanjangan-data'
import {
  ArrowPathIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { CheckCircleIcon as CheckSolid } from '@heroicons/react/24/solid'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

// ── Form Sheet ─────────────────────────────────────────────────────────────
function PerpanjanganSheet({
  item,
  onClose,
  onSave,
}: {
  item: PerpanjanganTubel | null
  onClose: () => void
  onSave: (id: string, data: { nama: string; nip: string; nomorSK: string; tanggalSK: string; tmtSelesai: string; file: File | null }) => void
}) {
  const [nama, setNama]           = useState(item?.nama ?? '')
  const [nip, setNip]             = useState(item?.nip ?? '')
  const [nomorSK, setNomorSK]     = useState(item?.nomorSKPerpanjangan ?? '')
  const [tanggalSK, setTanggalSK] = useState(item?.tanggalSKPerpanjangan ?? '')
  const [tmtSelesai, setTmtSelesai] = useState(item?.tmtSelesaiPerpanjangan ?? '')
  const [file, setFile]           = useState<File | null>(null)
  const [done, setDone]           = useState(false)

  if (!item) return null

  const canSave = nama.trim() && nip.trim() && nomorSK.trim().length >= 3 && tanggalSK

  const handleSave = () => {
    if (!canSave) return
    onSave(item.id, { nama, nip, nomorSK, tanggalSK, tmtSelesai, file })
    setDone(true)
  }

  return (
    <AnimatePresence>
      {item && (
        <>
          <motion.div key="bd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={onClose} />

          <motion.div key="sh" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 340, damping: 38 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl dark:bg-slate-900"
          >
            {/* Header */}
            <div className="flex shrink-0 items-center gap-3 px-5 py-4">
              <button onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                <XMarkIcon className="h-5 w-5" />
              </button>
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-100">Perpanjangan TUBEL Beasiswa</p>
                <p className="text-xs text-slate-400">{item.kode}</p>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <AnimatePresence mode="wait">
                {done ? (
                  <motion.div key="done"
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                      className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30"
                    >
                      <CheckSolid className="h-10 w-10 text-emerald-500" />
                    </motion.div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Perpanjangan Tersimpan</h3>
                    <p className="mt-1 text-sm text-slate-400">Data perpanjangan TUBEL berhasil disimpan.</p>
                    <button onClick={onClose}
                      className="mt-6 rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500">
                      Selesai
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                    {/* Nama */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Nama <span className="text-red-500">*</span>
                      </label>
                      <input type="text" placeholder="Nama pegawai" value={nama}
                        onChange={e => setNama(e.target.value.toUpperCase())}
                        className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm uppercase text-slate-700 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder-slate-500"
                      />
                    </div>

                    {/* NIP */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                        NIP <span className="text-red-500">*</span>
                      </label>
                      <input type="text" inputMode="numeric" placeholder="198501012010011001" value={nip}
                        onChange={e => setNip(e.target.value.replace(/\D/g, ''))}
                        className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder-slate-500"
                      />
                    </div>

                    {/* Nomor SK Perpanjangan */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Nomor SK Perpanjangan <span className="text-red-500">*</span>
                      </label>
                      <input type="text" placeholder="KEP/PERP/001/BKN/2026" value={nomorSK}
                        onChange={e => setNomorSK(e.target.value.toUpperCase())}
                        className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm uppercase text-slate-700 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder-slate-500"
                      />
                    </div>

                    {/* Tanggal SK Perpanjangan */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Tanggal SK Perpanjangan <span className="text-red-500">*</span>
                      </label>
                      <DatePicker value={tanggalSK} onChange={setTanggalSK} placeholder="Pilih tanggal SK perpanjangan" />
                    </div>

                    {/* TMT Selesai Perpanjangan */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                        TMT Selesai Perpanjangan
                      </label>
                      <DatePicker value={tmtSelesai} onChange={setTmtSelesai} placeholder="Pilih TMT selesai perpanjangan" />
                    </div>

                    {/* Upload SK Perpanjangan */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Upload SK Perpanjangan
                      </label>
                      <FileUpload label="" value={file} onChange={setFile} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {!done && (
              <div className="shrink-0 px-5 py-4">
                <div className="flex gap-3">
                  <button onClick={onClose}
                    className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800">
                    Batal
                  </button>
                  <button onClick={handleSave} disabled={!canSave}
                    className="flex-1 rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40">
                    Simpan
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function PerpanjanganPage() {
  const [data, setData]         = useState<PerpanjanganTubel[]>(daftarPerpanjangan)
  const [search, setSearch]     = useState('')
  const [filter, setFilter]     = useState<'belum' | 'sudah'>('belum')
  const [selected, setSelected] = useState<PerpanjanganTubel | null>(null)

  const filtered = data.filter(p => {
    const matchStatus = p.status === filter
    const q = search.toLowerCase()
    const matchSearch = !q || p.nama.toLowerCase().includes(q) || p.nip.includes(q) || p.kode.toLowerCase().includes(q)
    return matchStatus && matchSearch
  })

  const counts = {
    belum: data.filter(p => p.status === 'belum').length,
    sudah: data.filter(p => p.status === 'sudah').length,
  }

  const handleSave = (id: string, saved: { nama: string; nip: string; nomorSK: string; tanggalSK: string; tmtSelesai: string; file: File | null }) => {
    setData(prev => prev.map(p => p.id === id
      ? { ...p, nama: saved.nama, nip: saved.nip, nomorSKPerpanjangan: saved.nomorSK, tanggalSKPerpanjangan: saved.tanggalSK, tmtSelesaiPerpanjangan: saved.tmtSelesai, fileSKPerpanjangan: saved.file?.name, status: 'sudah' }
      : p
    ))
    setSelected(null)
  }

  const filterTabs: { key: 'belum' | 'sudah'; label: string }[] = [
    { key: 'belum', label: 'Belum' },
    { key: 'sudah', label: 'Sudah' },
  ]

  return (
    <>
      <div className="min-h-screen bg-slate-50 px-4 py-8 dark:bg-slate-950 sm:px-6 lg:px-10">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-1.5 text-xs text-slate-400">
          <span className="cursor-pointer hover:text-slate-600 dark:hover:text-slate-300">Dashboard</span>
          <ChevronRightIcon className="h-3.5 w-3.5" />
          <span className="font-medium text-slate-700 dark:text-slate-200">Perpanjangan TUBEL Beasiswa</span>
        </nav>

        <div className="rounded-2xl bg-white dark:bg-slate-900">
          {/* Card header */}
          <div className="px-6 py-5">
            <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100">Perpanjangan TUBEL Beasiswa</h2>
            <p className="mt-0.5 text-sm text-slate-400">Kelola perpanjangan SK Tugas Belajar Beasiswa</p>
          </div>

          {/* Filter + Search */}
          <div className="flex flex-col gap-3 px-6 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-2">
              {filterTabs.map(tab => (
                <button key={tab.key} onClick={() => setFilter(tab.key)}
                  className={`flex items-center gap-2 rounded-xl border-2 px-4 py-2 text-sm font-medium transition ${
                    filter === tab.key
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:border-indigo-500 dark:bg-indigo-900/30 dark:text-indigo-300'
                      : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400'
                  }`}
                >
                  <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold ${
                    tab.key === 'sudah'
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400'
                      : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400'
                  }`}>
                    {counts[tab.key]}
                  </span>
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Cari nama, NIP, atau kode..."
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder-slate-400"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-100 dark:border-slate-700" />

          {/* List */}
          <div className="divide-y divide-slate-100 px-6 dark:divide-slate-700/50">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <ArrowPathIcon className="mb-3 h-10 w-10 text-slate-300 dark:text-slate-600" />
                <p className="text-sm font-medium text-slate-400">Tidak ada data</p>
              </div>
            ) : (
              filtered.map(p => (
                <div key={p.id} className="flex items-center gap-4 py-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
                    {p.nama.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{p.nama}</span>
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                        TUBEL Beasiswa
                      </span>
                      {p.status === 'sudah' && (
                        <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                          <CheckCircleIcon className="h-3 w-3" /> Selesai
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 truncate text-xs text-slate-400">{p.nip} · {p.kode}</p>
                    {p.status === 'sudah' && p.nomorSKPerpanjangan && (
                      <p className="truncate text-[11px] text-slate-400">
                        SK: {p.nomorSKPerpanjangan}{p.tanggalSKPerpanjangan ? ` · ${p.tanggalSKPerpanjangan}` : ''}
                      </p>
                    )}
                  </div>

                  <button onClick={() => setSelected(p)}
                    className={`flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                      p.status === 'sudah'
                        ? 'border-slate-200 bg-white text-slate-500 hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-400'
                        : 'border-indigo-200 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:border-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400'
                    }`}
                  >
                    <ArrowPathIcon className="h-3.5 w-3.5" />
                    {p.status === 'sudah' ? 'Edit' : 'Isi Data'}
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4">
            <p className="text-xs text-slate-400">Menampilkan {filtered.length} dari {counts[filter]} pegawai</p>
          </div>
        </div>
      </div>

      <PerpanjanganSheet item={selected} onClose={() => setSelected(null)} onSave={handleSave} />
    </>
  )
}
