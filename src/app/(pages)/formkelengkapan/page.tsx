'use client'

import { FileUpload } from '@/components/form/file-upload'
import { daftarPegawai } from '@/data/pegawai-data'
import {
  CheckCircleIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'
import { CheckCircleIcon as CheckSolid } from '@heroicons/react/24/solid'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'

// ── Dokumen per layanan ────────────────────────────────────────────────────
interface DocField { key: string; label: string; required: boolean; note?: string }

const DOCS_IPG_PROFESI: DocField[] = [
  { key: 'skp',     label: 'SKP 2 Tahun Terakhir',              required: true, note: 'Minimal bernilai Baik' },
  { key: 'pangkat', label: 'SK Pangkat dan SK Jabatan Terakhir', required: true },
  { key: 'sk_pns',  label: 'SK PNS dan SK CPNS',                required: true },
  { key: 'ijazah',  label: 'Ijazah Terakhir',                   required: true },
]

const DOCS_IPG_SERTIFIKASI: DocField[] = [
  { key: 'skp',       label: 'SKP 2 Tahun Terakhir',              required: true, note: 'Minimal bernilai Baik' },
  { key: 'pangkat',   label: 'SK Pangkat dan SK Jabatan Terakhir', required: true },
  { key: 'sk_pns',    label: 'SK PNS dan SK CPNS',                required: true },
  { key: 'sertif',    label: 'Ijazah',                            required: true },
  { key: 'transkrip', label: 'Transkrip Nilai',                   required: true },
]

const DOCS_IPG_AKADEMIK: DocField[] = [
  { key: 'skp',      label: 'SKP 2 Tahun Terakhir',              required: true, note: 'Minimal bernilai Baik' },
  { key: 'pangkat',  label: 'SK Pangkat dan SK Jabatan Terakhir', required: true },
  { key: 'sk_pns',   label: 'SK PNS dan SK CPNS',                required: true },
  { key: 'ijazah',   label: 'Ijazah Terakhir',                   required: true },
  { key: 'proposal', label: 'Proposal Studi / Rencana Akademik', required: true },
]

const DOCS_TUBEL_MANDIRI: DocField[] = [
  { key: 'permohonan',  label: 'Surat Permohonan Pribadi',                        required: true,  note: 'Tertulis jelas nama univ, prodi, dan waktu kuliah' },
  { key: 'sk_pns',      label: 'SK PNS dan SK CPNS',                              required: true },
  { key: 'pangkat',     label: 'SK Pangkat dan SK Jabatan Terakhir',              required: true },
  { key: 'skp',         label: 'SKP 2 Tahun Terakhir',                            required: true,  note: 'Minimal bernilai Baik' },
  { key: 'bebas_hukdis',label: 'Surat Bebas Hukdis',                             required: true,  note: 'Dari Kakanwil / Kabiro SDM untuk PNS Pusat' },
  { key: 'pengantar',   label: 'Surat Usulan Pengantar dari Kanwil',             required: true,  note: 'Tertulis jelas nama univ, prodi, dan waktu mulai kuliah' },
  { key: 'mhs',         label: 'Surat Keterangan Mahasiswa',                      required: false, note: 'Jika sudah aktif sebagai mahasiswa' },
]

const DOCS_TUBEL_BEASISWA: DocField[] = [
  { key: 'permohonan',  label: 'Surat Permohonan Pribadi',                        required: true,  note: 'Tertulis jelas nama univ, prodi, dan waktu kuliah' },
  { key: 'sk_pns',      label: 'SK PNS dan SK CPNS',                              required: true },
  { key: 'pangkat',     label: 'SK Pangkat dan SK Jabatan Terakhir',              required: true },
  { key: 'skp',         label: 'SKP 2 Tahun Terakhir',                            required: true,  note: 'Minimal bernilai Baik' },
  { key: 'bebas_hukdis',label: 'Surat Bebas Hukdis',                             required: true,  note: 'Dari Kakanwil / Kabiro SDM untuk PNS Pusat' },
  { key: 'pengantar',   label: 'Surat Usulan Pengantar dari Kanwil',             required: true,  note: 'Tertulis jelas nama univ, prodi, dan waktu mulai kuliah' },
  { key: 'loa',         label: 'LOA (Letter of Acceptance)',                      required: true,  note: 'Beasiswa' },
  { key: 'pernyataan',  label: 'Surat Pernyataan dan Perjanjian Tugas Belajar',  required: true,  note: 'Beasiswa' },
]

const DOCS_PWK: DocField[] = [
  { key: 'rekomendasi',    label: 'Rekomendasi Pimpinan',               required: true },
  { key: 'analisis',       label: 'Analisis Rekomendasi Pimpinan',       required: true },
  { key: 'bebas_hukdis',   label: 'Surat Bebas Hukdis',                 required: true },
  { key: 'bebas_tunggakan',label: 'Surat Bebas Tunggakan Pekerjaan',     required: true },
  { key: 'permohonan',     label: 'Surat Permohonan Pribadi',            required: true },
  { key: 'eviden',         label: 'Surat Eviden Alasan Perpindahan',     required: true },
]

function getDocs(layanan: string, subLayanan: string): DocField[] {
  if (layanan === 'PWK') return DOCS_PWK
  if (layanan === 'TUBEL') {
    return subLayanan === 'Beasiswa' ? DOCS_TUBEL_BEASISWA : DOCS_TUBEL_MANDIRI
  }
  if (subLayanan === 'Sertifikasi') return DOCS_IPG_SERTIFIKASI
  if (subLayanan === 'Akademik')    return DOCS_IPG_AKADEMIK
  return DOCS_IPG_PROFESI
}

// ── Success Modal ──────────────────────────────────────────────────────────
function SuccessModal({ kode, layanan, subLayanan, totalDok, onDashboard }: {
  kode: string; layanan: string; subLayanan: string; totalDok: number; onDashboard: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-sm overflow-hidden rounded-2xl bg-white dark:bg-slate-900"
      >
        <div className="h-1.5 w-full bg-gradient-to-r from-emerald-400 to-emerald-500" />
        <div className="flex flex-col items-center px-6 pb-2 pt-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 10, stiffness: 200, delay: 0.1 }}
            className="relative mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30"
          >
            <motion.span
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-emerald-200 dark:bg-emerald-700"
            />
            <CheckSolid className="h-10 w-10 text-emerald-500" />
          </motion.div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Dokumen Terkirim!</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
            Semua dokumen berhasil diunggah. Tim kami akan memverifikasi dalam 1–3 hari kerja.
          </p>
        </div>
        <div className="mx-6 my-5 divide-y divide-slate-100 rounded-xl border border-slate-100 dark:divide-slate-700 dark:border-slate-700">
          {[
            { label: 'Kode Pengajuan', value: kode, bold: true },
            { label: 'Layanan', value: `${layanan} – ${subLayanan}` },
            { label: 'Total Dokumen', value: `${totalDok} file terunggah`, green: true },
            { label: 'Status', value: 'Menunggu Verifikasi', badge: true },
          ].map(({ label, value, bold, green, badge }) => (
            <div key={label} className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-slate-400">{label}</span>
              {badge ? (
                <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">{value}</span>
              ) : (
                <span className={`text-sm ${bold ? 'font-bold text-slate-700 dark:text-slate-200' : green ? 'font-semibold text-emerald-600 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-300'}`}>{value}</span>
              )}
            </div>
          ))}
        </div>
        <div className="px-6 pb-6">
          <button onClick={onDashboard} className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500">
            Kembali ke Dashboard
          </button>
        </div>
      </motion.div>
    </div>
  )
}

// ── Main Content ───────────────────────────────────────────────────────────
function FormKelengkapanContent() {
  const params     = useSearchParams()
  const router     = useRouter()
  const layanan    = params.get('layanan') ?? ''
  const subLayanan = params.get('subLayanan') ?? ''
  const kode       = params.get('kode') ?? '-'
  const nips       = (params.get('nips') ?? '').split(',').filter(Boolean)

  const pegawaiList = nips
    .map(nip => daftarPegawai.find(p => p.nip === nip))
    .filter(Boolean) as typeof daftarPegawai

  // fallback: jika tidak ada pegawai dari URL, buat satu slot kosong
  const list = pegawaiList.length > 0 ? pegawaiList : [{ nip: '-', nama: 'Pegawai', jabatan: '', unit: '' }]

  const docs = getDocs(layanan, subLayanan)

  const [step, setStep]       = useState(0)
  const [submitted, setSubmitted] = useState(false)

  // files per pegawai: array of Record<key, File|null>
  const [allFiles, setAllFiles] = useState<Record<string, File | null>[]>(
    list.map(() => Object.fromEntries(docs.map(d => [d.key, null])))
  )

  const currentFiles = allFiles[step]
  const setFile = (key: string, file: File | null) => {
    setAllFiles(prev => {
      const next = [...prev]
      next[step] = { ...next[step], [key]: file }
      return next
    })
  }

  const uploadedCount  = (f: Record<string, File | null>) => Object.values(f).filter(Boolean).length
  const isComplete     = (f: Record<string, File | null>) => docs.every(d => !d.required || f[d.key])
  const totalDokumen   = allFiles.reduce((s, f) => s + uploadedCount(f), 0)
  const isLast         = step === list.length - 1

  const handleNext = () => {
    if (!isLast) { setStep(step + 1) }
    else { setSubmitted(true) }
  }

  if (submitted) {
    return <SuccessModal kode={kode} layanan={layanan} subLayanan={subLayanan} totalDok={totalDokumen} onDashboard={() => router.push('/dashboard')} />
  }

  const current = list[step]

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 dark:bg-slate-950 sm:px-6 lg:px-10">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-slate-400">
        <span className="cursor-pointer hover:text-slate-600 dark:hover:text-slate-300" onClick={() => router.push('/dashboard')}>Dashboard</span>
        <ChevronRightIcon className="h-3.5 w-3.5" />
        <span className="cursor-pointer hover:text-slate-600 dark:hover:text-slate-300" onClick={() => router.push('/formpermintaan')}>Form Permintaan</span>
        <ChevronRightIcon className="h-3.5 w-3.5" />
        <span className="font-medium text-slate-700 dark:text-slate-200">Kelengkapan Dokumen</span>
      </nav>

      {/* Header info */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-base font-semibold text-slate-800 dark:text-slate-100">Kelengkapan Dokumen</h1>
          <p className="mt-0.5 text-sm text-slate-400">{kode} · {layanan}{subLayanan ? ` ${subLayanan}` : ''}</p>
        </div>
        <span className="text-sm text-slate-500 dark:text-slate-400">
          Pegawai <span className="font-semibold text-slate-800 dark:text-slate-100">{step + 1}</span> dari <span className="font-semibold text-slate-800 dark:text-slate-100">{list.length}</span>
        </span>
      </div>

      {/* Stepper pill */}
      {list.length > 1 && (
        <div className="mb-5 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {list.map((p, i) => (
            <button
              key={p.nip}
              onClick={() => setStep(i)}
              className={`flex shrink-0 items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                i === step
                  ? 'bg-indigo-600 text-white'
                  : isComplete(allFiles[i])
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                  : 'bg-white text-slate-600 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700'
              }`}
            >
              {isComplete(allFiles[i]) && i !== step
                ? <CheckCircleIcon className="h-3.5 w-3.5" />
                : <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/20 text-[10px] font-bold">{i + 1}</span>
              }
              <span className="max-w-[120px] truncate">{p.nama.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      )}

      {/* Form card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="rounded-2xl bg-white dark:bg-slate-900"
        >
          {/* Card header */}
          <div className="flex flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400">
                {current.nama.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-100">{current.nama}</p>
                <p className="text-xs text-slate-400">{current.nip !== '-' ? `${current.nip} · ` : ''}{current.jabatan}</p>
              </div>
            </div>

            {/* Progress ring */}
            <div className="flex items-center gap-3 self-start rounded-xl border border-slate-100 bg-slate-50 px-4 py-2.5 dark:border-slate-700 dark:bg-slate-800 sm:self-auto">
              <div className="text-right">
                <p className="text-xs text-slate-400">Dokumen</p>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {uploadedCount(currentFiles)} / {docs.length}
                </p>
              </div>
              <div className="relative h-10 w-10">
                <svg className="h-10 w-10 -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15" fill="none" stroke="#e2e8f0" strokeWidth="3" className="dark:stroke-slate-700" />
                  <circle cx="18" cy="18" r="15" fill="none" stroke="#6366f1" strokeWidth="3"
                    strokeDasharray={`${(uploadedCount(currentFiles) / docs.length) * 94.2} 94.2`}
                    strokeLinecap="round"
                  />
                </svg>
                {isComplete(currentFiles) && <CheckCircleIcon className="absolute inset-0 m-auto h-5 w-5 text-indigo-500" />}
              </div>
            </div>
          </div>

          {/* Upload fields */}
          <div className="grid grid-cols-1 gap-5 px-6 py-6 sm:grid-cols-2">
            {docs.map((doc, idx) => {
              const isFullWidth = layanan !== 'PWK' && (doc.key === 'permohonan' || doc.key === 'pengantar')
              const isLastOdd   = docs.length % 2 !== 0 && idx === docs.length - 1
              return (
              <div key={doc.key} className={isFullWidth || isLastOdd ? 'sm:col-span-2' : ''}>
                <FileUpload
                  label={doc.label}
                  required={doc.required}
                  value={currentFiles[doc.key]}
                  onChange={file => setFile(doc.key, file)}
                />
                {doc.note && (
                  <p className="mt-1 text-[11px] text-slate-400">{doc.note}</p>
                )}
              </div>
              )
            })}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-4">
            <button
              type="button"
              onClick={() => step > 0 ? setStep(step - 1) : router.back()}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-transparent dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {step === 0 ? 'Kembali' : 'Sebelumnya'}
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={!isComplete(currentFiles)}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isLast ? (
                <><CheckSolid className="h-4 w-4" /> Kirim Semua Dokumen</>
              ) : (
                <>Pegawai Berikutnya <ChevronRightIcon className="h-4 w-4" /></>
              )}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
          <span>Progress keseluruhan</span>
          <span>{allFiles.filter(isComplete).length} / {list.length} pegawai selesai</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-700">
          <motion.div
            className="h-1.5 rounded-full bg-indigo-600"
            animate={{ width: `${(allFiles.filter(isComplete).length / list.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>
    </div>
  )
}

export default function FormKelengkapanPage() {
  return (
    <Suspense fallback={
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      </div>
    }>
      <FormKelengkapanContent />
    </Suspense>
  )
}
