'use client'

import { daftarHukdis } from '@/data/hukdis-data'
import type { Pegawai } from '@/data/pegawai-data'
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  ShieldExclamationIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline'
import { CheckCircleIcon as CheckSolid } from '@heroicons/react/24/solid'
import * as Headless from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export interface PWKTujuan {
  nip: string
  kantahTujuan: string
}

interface Props {
  open: boolean
  onClose: () => void
  onConfirm: (extra?: PWKTujuan[]) => void
  pegawai: Pegawai[]
  layanan: string
}

type Phase = 'checking' | 'blocked' | 'syarat'

const DAFTAR_KANTAH = [
  'Kantah Kota Administrasi Jakarta Pusat',
  'Kantah Kota Administrasi Jakarta Utara',
  'Kantah Kota Administrasi Jakarta Barat',
  'Kantah Kota Administrasi Jakarta Selatan',
  'Kantah Kota Administrasi Jakarta Timur',
  'Kantah Kabupaten Administrasi Kepulauan Seribu',
  'Kantah Kota Bogor',
  'Kantah Kabupaten Bogor',
  'Kantah Kota Depok',
  'Kantah Kota Bekasi',
  'Kantah Kabupaten Bekasi',
  'Kantah Kota Tangerang',
  'Kantah Kota Tangerang Selatan',
  'Kantah Kabupaten Tangerang',
  'Kantah Kota Bandung',
  'Kantah Kabupaten Bandung',
  'Kantah Kabupaten Bandung Barat',
  'Kantah Kota Cimahi',
  'Kantah Kota Cirebon',
  'Kantah Kabupaten Cirebon',
  'Kantah Kabupaten Garut',
  'Kantah Kabupaten Sukabumi',
  'Kantah Kota Sukabumi',
  'Kantah Kabupaten Cianjur',
  'Kantah Kabupaten Tasikmalaya',
  'Kantah Kota Tasikmalaya',
  'Kantah Kabupaten Ciamis',
  'Kantah Kota Banjar',
  'Kantah Kabupaten Kuningan',
  'Kantah Kabupaten Majalengka',
  'Kantah Kabupaten Sumedang',
  'Kantah Kabupaten Indramayu',
  'Kantah Kabupaten Subang',
  'Kantah Kabupaten Purwakarta',
  'Kantah Kabupaten Karawang',
  'Kantah Kabupaten Pangandaran',
  'Kantah Kota Semarang',
  'Kantah Kabupaten Semarang',
  'Kantah Kota Surakarta',
  'Kantah Kota Yogyakarta',
  'Kantah Kabupaten Sleman',
  'Kantah Kabupaten Bantul',
  'Kantah Kabupaten Kulon Progo',
  'Kantah Kabupaten Gunungkidul',
  'Kantah Kota Surabaya',
  'Kantah Kabupaten Sidoarjo',
  'Kantah Kabupaten Gresik',
  'Kantah Kota Malang',
  'Kantah Kabupaten Malang',
  'Kantah Kota Batu',
  'Kantah Kota Medan',
  'Kantah Kabupaten Deli Serdang',
  'Kantah Kota Makassar',
  'Kantah Kota Denpasar',
  'Kantah Kabupaten Badung',
  'Kantah Kota Balikpapan',
  'Kantah Kota Samarinda',
  'Kantah Kota Banjarmasin',
  'Kantah Kota Palembang',
  'Kantah Kota Pekanbaru',
  'Kantah Kota Padang',
  'Kantah Kota Batam',
  'Kantah Kota Pontianak',
  'Kantah Kota Manado',
  'Kantah Kota Ambon',
  'Kantah Kota Jayapura',
].sort()

function KantahCombobox({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [query, setQuery] = useState(value)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const filtered = query.trim().length === 0
    ? DAFTAR_KANTAH
    : DAFTAR_KANTAH.filter(k => k.toLowerCase().includes(query.toLowerCase()))

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSelect = (k: string) => {
    setQuery(k)
    onChange(k)
    setOpen(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    onChange('')
    setOpen(true)
  }

  return (
    <div ref={ref} className="relative">
      <div className={`flex h-10 items-center rounded-xl border px-3 text-sm transition ${
        open
          ? 'border-indigo-500 bg-white ring-1 ring-indigo-500 dark:border-indigo-500 dark:bg-slate-800'
          : 'border-slate-200 bg-white dark:border-slate-600 dark:bg-slate-800'
      }`}>
        <MagnifyingGlassIcon className="mr-2 h-4 w-4 shrink-0 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setOpen(true)}
          placeholder="Ketik nama kantah..."
          className="flex-1 bg-transparent text-slate-700 placeholder-slate-400 outline-none dark:text-slate-200 dark:placeholder-slate-500"
        />
        {query && (
          <button
            type="button"
            onClick={() => { setQuery(''); onChange(''); setOpen(true) }}
            className="ml-1 text-slate-300 hover:text-slate-500 dark:text-slate-600 dark:hover:text-slate-400"
          >
            ×
          </button>
        )}
      </div>

      <AnimatePresence>
        {open && filtered.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.13 }}
            className="absolute left-0 top-full z-[60] mt-1.5 max-h-48 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white py-1 shadow-lg [scrollbar-width:none] [&::-webkit-scrollbar]:hidden dark:border-slate-700 dark:bg-slate-800"
          >
            {filtered.map(k => (
              <li key={k}>
                <button
                  type="button"
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => handleSelect(k)}
                  className={`flex w-full items-center justify-between px-3.5 py-2 text-sm transition ${
                    k === value
                      ? 'bg-indigo-50 font-semibold text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'
                      : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700/50'
                  }`}
                >
                  {k}
                  {k === value && <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

// Cek hukdis aktif atau dalam 2 tahun terakhir
function cekHukdis(pegawai: Pegawai[]) {
  const dua_tahun_lalu = new Date()
  dua_tahun_lalu.setFullYear(dua_tahun_lalu.getFullYear() - 2)

  return pegawai.map(p => {
    const found = daftarHukdis.find(h => h.nip === p.nip)
    let blocked = false
    let keterangan = ''

    if (found) {
      if (found.status === 'Aktif') {
        blocked = true
        keterangan = `Sedang menjalani hukdis tingkat ${found.tingkat} (SK: ${found.nomorSK})`
      } else {
        // Cek apakah dalam 2 tahun terakhir
        const [day, month, year] = found.tanggalSK.split(' ')
        const months: Record<string, number> = {
          Jan: 0, Feb: 1, Mar: 2, Apr: 3, Mei: 4, Jun: 5,
          Jul: 6, Agu: 7, Sep: 8, Okt: 9, Nov: 10, Des: 11,
        }
        const tgl = new Date(Number(year), months[month] ?? 0, Number(day))
        if (tgl >= dua_tahun_lalu) {
          blocked = true
          keterangan = `Pernah menjalani hukdis tingkat ${found.tingkat} pada ${found.tanggalSK} (dalam 2 tahun terakhir)`
        }
      }
    }

    return { pegawai: p, blocked, keterangan }
  })
}

export function HukdisCheckDialog({ open, onClose, onConfirm, pegawai, layanan }: Props) {
  const [phase, setPhase] = useState<Phase>('checking')
  const [results, setResults] = useState<ReturnType<typeof cekHukdis>>([])
  const [agreed, setAgreed] = useState(false)
  const [pwkTujuan, setPwkTujuan] = useState<Record<string, string>>({})

  const isPWK = layanan === 'PWK'

  useEffect(() => {
    if (!open) return
    setPhase('checking')
    setAgreed(false)
    setPwkTujuan({} as Record<string, string>)

    const timer = setTimeout(() => {
      const res = cekHukdis(pegawai)
      setResults(res)
      const anyBlocked = res.some(r => r.blocked)
      setPhase(anyBlocked ? 'blocked' : 'syarat')
    }, 1800)

    return () => clearTimeout(timer)
  }, [open, pegawai])

  const allPwkFilled = !isPWK || pegawai.every(p => (pwkTujuan[p.nip] ?? '').trim().length > 0)

  const canConfirm = agreed && allPwkFilled

  return (
    <Headless.Dialog open={open} onClose={onClose}>
      <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-xl"
        >
          <Headless.DialogPanel className="flex w-full max-h-[85vh] flex-col overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-slate-900">
            <AnimatePresence mode="wait">

              {/* ── CHECKING ── */}
              {phase === 'checking' && (
                <motion.div key="checking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-6 py-8">
                  <div className="mb-5 flex items-center gap-3">
                    <ShieldExclamationIcon className="h-6 w-6 text-indigo-500 animate-pulse" />
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      Memeriksa data hukuman disiplin...
                    </p>
                  </div>
                  <ul className="space-y-3">
                    {pegawai.map(p => (
                      <li key={p.nip} className="flex items-center gap-3">
                        <span className="h-4 w-4 shrink-0 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
                        <span className="text-sm text-slate-600 dark:text-slate-300">{p.nama}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* ── BLOCKED ── */}
              {phase === 'blocked' && (
                <motion.div key="blocked" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="flex flex-col items-center px-6 pb-2 pt-8 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                      <ExclamationTriangleIcon className="h-9 w-9 text-red-500" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Pengajuan Tidak Dapat Diproses</h2>
                    <p className="mt-1.5 text-sm text-slate-400">
                      Pegawai berikut sedang atau pernah menjalani hukuman disiplin dalam 2 tahun terakhir.
                    </p>
                  </div>
                  <ul className="mx-6 my-4 space-y-2">
                    {results.filter(r => r.blocked).map(r => (
                      <li key={r.pegawai.nip} className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 dark:border-red-900/30 dark:bg-red-900/10">
                        <div className="flex items-start gap-2">
                          <XCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                          <div>
                            <p className="text-sm font-medium text-red-700 dark:text-red-400">{r.pegawai.nama}</p>
                            <p className="mt-0.5 text-xs text-red-500">{r.keterangan}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="px-6 pb-6">
                    <button onClick={onClose} className="w-full rounded-xl bg-slate-800 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-slate-700">
                      Kembali
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ── SYARAT & KETENTUAN ── */}
              {phase === 'syarat' && (
                <motion.div key="syarat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col overflow-hidden">
                  {/* Header — fixed, tidak scroll */}
                  <div className="flex flex-col items-center px-6 pb-2 pt-8 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                      <CheckCircleIcon className="h-9 w-9 text-emerald-500" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Pemeriksaan Selesai</h2>
                    <p className="mt-1.5 text-sm text-slate-400">
                      Tidak ditemukan catatan hukuman disiplin. Bacalah pernyataan di bawah sebelum melanjutkan.
                    </p>
                  </div>

                  {/* Konten — bisa scroll */}
                  <div className="overflow-y-auto px-6 pb-2">
                    {/* Hasil cek */}
                    <ul className="mt-3 space-y-1.5">
                      {results.map(r => (
                        <li key={r.pegawai.nip} className="flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 dark:border-emerald-800/30 dark:bg-emerald-900/10">
                          <CheckSolid className="h-4 w-4 shrink-0 text-emerald-500" />
                          <span className="text-sm text-emerald-700 dark:text-emerald-400">{r.pegawai.nama} — bersih</span>
                        </li>
                      ))}
                    </ul>

                    {/* Fields khusus PWK — per pegawai */}
                    {isPWK && (
                      <div className="mt-4 space-y-3">
                        {pegawai.map(p => (
                          <div key={p.nip} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/50">
                            <p className="mb-2 text-xs font-semibold text-slate-700 dark:text-slate-200">{p.nama}</p>
                            <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
                              Kantah Tujuan <span className="text-red-500">*</span>
                            </label>
                            <KantahCombobox
                              value={pwkTujuan[p.nip] ?? ''}
                              onChange={v => setPwkTujuan(prev => ({ ...prev, [p.nip]: v }))}
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Pernyataan checkbox */}
                    <div className="mt-4 pb-1">
                      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 dark:border-slate-700 dark:bg-slate-800/50">
                        <div className="relative mt-0.5 shrink-0">
                          <input
                            type="checkbox"
                            checked={agreed}
                            onChange={e => setAgreed(e.target.checked)}
                            className="sr-only"
                          />
                          <div className={`flex h-4 w-4 items-center justify-center rounded border-2 transition ${
                            agreed ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-700'
                          }`}>
                            {agreed && (
                              <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 12 12">
                                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </div>
                        </div>
                        <span className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                          Saya menyatakan bahwa pegawai yang diajukan <strong>tidak sedang dalam proses atau menjalani hukuman disiplin</strong> dalam 2 (dua) tahun terakhir, dan bertanggung jawab atas kebenaran pernyataan ini.
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Actions — fixed di bawah, tidak scroll */}
                  <div className="flex gap-3 border-t border-slate-100 px-6 pb-6 pt-4 dark:border-slate-700">
                    <button
                      onClick={onClose}
                      className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      Batal
                    </button>
                    <button
                      disabled={!canConfirm}
                      onClick={() => {
                        if (isPWK) {
                          const extra = pegawai.map(p => ({
                            nip: p.nip,
                            kantahTujuan: pwkTujuan[p.nip] ?? '',
                          }))
                          onConfirm(extra)
                        } else {
                          onConfirm()
                        }
                      }}
                      className="flex-1 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Lanjutkan
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </Headless.DialogPanel>
        </motion.div>
      </div>
    </Headless.Dialog>
  )
}
