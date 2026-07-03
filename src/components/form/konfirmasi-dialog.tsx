'use client'

import * as Headless from '@headlessui/react'
import {
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline'
import { CheckCircleIcon as CheckSolid } from '@heroicons/react/24/solid'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { Pegawai } from '@/data/pegawai-data'

interface Props {
  open: boolean
  onClose: () => void
  data: {
    layanan: string
    subLayanan: string
    nomorSurat: string
    pegawai: Pegawai[]
  }
}

interface CheckItem {
  label: string
  detail: string
  valid: boolean
}

function buildChecks(data: Props['data']): CheckItem[] {
  const nomorValid = /^[A-Z]\/\d+\/[\w.]+\/\d{4}$/.test(data.nomorSurat.trim())
  return [
    {
      label: 'Layanan dipilih',
      detail: data.layanan ? `Layanan: ${data.layanan}` : 'Belum memilih layanan (IPG / TUBEL)',
      valid: !!data.layanan,
    },
    {
      label: 'Jenis layanan dipilih',
      detail: data.subLayanan
        ? `Jenis: ${data.subLayanan}`
        : `Belum memilih jenis ${data.layanan || 'layanan'}`,
      valid: !!data.subLayanan,
    },
    {
      label: 'Nomor Surat Entri',
      detail: nomorValid
        ? data.nomorSurat
        : data.nomorSurat.trim()
        ? 'Format tidak valid (contoh: B/1234/KP.02.03/2025)'
        : 'Nomor surat belum diisi',
      valid: nomorValid,
    },
    {
      label: 'Pegawai diajukan',
      detail:
        data.pegawai.length > 0
          ? `${data.pegawai.length} pegawai: ${data.pegawai.map((p) => p.nama).join(', ')}`
          : 'Belum memilih pegawai',
      valid: data.pegawai.length > 0,
    },
  ]
}

// Generate kode pengajuan
function generateKode(layanan: string) {
  const today = new Date()
  const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '')
  const rand = String(Math.floor(Math.random() * 900) + 100)
  return `${layanan}-${dateStr}-${rand}`
}

function formatTanggal() {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  }).format(new Date())
}

export function KonfirmasiDialog({ open, onClose, data }: Props) {
  const [phase, setPhase] = useState<'checking' | 'result'>('checking')
  const [visibleCount, setVisibleCount] = useState(0)
  const [countdown, setCountdown] = useState(3)
  const checks = buildChecks(data)
  const allValid = checks.every((c) => c.valid)
  const kode = generateKode(data.layanan || 'PMJ')
  const router = useRouter()

  // Reset dan jalankan animasi tiap kali dialog dibuka
  useEffect(() => {
    if (!open) return
    setPhase('checking')
    setVisibleCount(0)

    const timers: ReturnType<typeof setTimeout>[] = []
    checks.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleCount(i + 1), 400 + i * 500))
    })
    timers.push(setTimeout(() => setPhase('result'), 400 + checks.length * 500 + 300))
    return () => timers.forEach(clearTimeout)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  // Countdown redirect setelah result sukses
  useEffect(() => {
    if (phase !== 'result' || !allValid) return
    setCountdown(3)
    const interval = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(interval)
          return 0
        }
        return c - 1
      })
    }, 1000)

    const redirectTimer = setTimeout(() => {
      const params = new URLSearchParams({
        layanan: data.layanan,
        subLayanan: data.subLayanan,
        kode,
        nips: data.pegawai.map(p => p.nip).join(','),
      })
      router.push(`/formdatapegawai?${params.toString()}`)
    }, 3000)
    return () => { clearInterval(interval); clearTimeout(redirectTimer) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, allValid])

  return (
    <Headless.Dialog open={open} onClose={onClose}>
      {/* Backdrop */}
      <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-md overflow-hidden"
        >
        <Headless.DialogPanel className="w-full overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-slate-900">
          <AnimatePresence mode="wait">
            {/* ── PHASE: CHECKING ── */}
            {phase === 'checking' && (
              <motion.div
                key="checking"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="px-6 py-6"
              >
                <p className="mb-4 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Memeriksa data pengajuan...
                </p>
                <ul className="space-y-3">
                  {checks.map((item, i) => (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, x: -8 }}
                      animate={visibleCount > i ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.3 }}
                      className="flex items-start gap-3"
                    >
                      {visibleCount > i ? (
                        item.valid ? (
                          <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                        ) : (
                          <XCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                        )
                      ) : (
                        <span className="mt-1 h-4 w-4 shrink-0 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                          {item.label}
                        </p>
                        {visibleCount > i && (
                          <p className={`mt-0.5 text-xs ${item.valid ? 'text-slate-400' : 'text-red-500'}`}>
                            {item.detail}
                          </p>
                        )}
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* ── PHASE: RESULT ── */}
            {phase === 'result' && (
              <motion.div
                key="result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
              >
                {allValid ? (
                  /* SUCCESS */
                  <>
                    <div className="flex flex-col items-center px-6 pb-2 pt-8 text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                        className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30"
                      >
                        <CheckSolid className="h-9 w-9 text-emerald-500" />
                      </motion.div>
                      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                        Pengajuan Berhasil
                      </h2>
                      <p className="mt-1.5 text-sm text-slate-400">
                        Silakan cetak bukti pengajuan atau catat kode untuk proses verifikasi selanjutnya.
                      </p>
                    </div>

                    {/* Detail */}
                    <div className="mx-6 my-4 divide-y divide-slate-100 rounded-xl border border-slate-100 dark:divide-slate-700 dark:border-slate-700">
                      {[
                        { label: 'Kode Pengajuan', value: kode },
                        { label: 'Tanggal', value: formatTanggal() },
                        { label: 'Layanan', value: `${data.layanan} – ${data.subLayanan}` },
                        { label: 'Nomor Surat', value: data.nomorSurat },
                        {
                          label: 'Jumlah Pegawai',
                          value: `${data.pegawai.length} orang`,
                        },
                        {
                          label: 'Status',
                          value: (
                            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                              Pengajuan
                            </span>
                          ),
                        },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex items-center justify-between px-4 py-3">
                          <span className="text-sm text-slate-400">{label}</span>
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="px-6 pb-6 space-y-3">
                      <div className="flex items-center justify-center gap-2 rounded-xl bg-emerald-50 py-2.5 dark:bg-emerald-900/20">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">
                          {countdown}
                        </span>
                        <span className="text-sm text-emerald-700 dark:text-emerald-400">
                          Mengarahkan ke halaman kelengkapan dokumen...
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const params = new URLSearchParams({ layanan: data.layanan, subLayanan: data.subLayanan, kode, nips: data.pegawai.map(p => p.nip).join(',') })
                          router.push(`/formdatapegawai?${params.toString()}`)
                        }}
                        className="w-full rounded-xl bg-emerald-500 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400"
                      >
                        Lanjut Sekarang
                      </button>
                    </div>
                  </>
                ) : (
                  /* FAILED */
                  <>
                    <div className="flex flex-col items-center px-6 pb-2 pt-8 text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                        className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30"
                      >
                        <XCircleIcon className="h-9 w-9 text-red-500" />
                      </motion.div>
                      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                        Data Tidak Lengkap
                      </h2>
                      <p className="mt-1.5 text-sm text-slate-400">
                        Perbaiki item berikut sebelum mengirimkan pengajuan.
                      </p>
                    </div>

                    {/* Error list */}
                    <ul className="mx-6 my-4 space-y-2">
                      {checks.filter((c) => !c.valid).map((item) => (
                        <li
                          key={item.label}
                          className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3 dark:border-red-900/30 dark:bg-red-900/10"
                        >
                          <XCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                          <div>
                            <p className="text-sm font-medium text-red-700 dark:text-red-400">{item.label}</p>
                            <p className="text-xs text-red-500">{item.detail}</p>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div className="px-6 pb-6">
                      <button
                        type="button"
                        onClick={onClose}
                        className="w-full rounded-xl bg-slate-800 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600"
                      >
                        Kembali & Perbaiki
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </Headless.DialogPanel>
        </motion.div>
      </div>
    </Headless.Dialog>
  )
}
