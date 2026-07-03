'use client'

import { DatePicker } from '@/components/form/date-picker'
import { DropdownSelect } from '@/components/form/dropdown-select'
import { daftarPegawai } from '@/data/pegawai-data'
import { CheckCircleIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon as CheckSolid } from '@heroicons/react/24/solid'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────
interface DataPendidikan {
  tingkatPendidikan: string
  pendidikan: string
  tanggalIjazah: string
  tahunLulus: string
  nomorIjazah: string
  namaSekolah: string
  gelarDepan: string
  gelarBelakang: string
  namaJabatan: string
  lokasiIjazah: string
}

interface DataProfesi {
  klasifikasiProfesi: string
  namaProfesi: string
  nomorSertifikat: string
  tanggalTerbit: string
  gelarDepanProfesi: string
  gelarBelakangProfesi: string
  lembagaPenyelenggara: string
  jenisProfesi: string
}

const emptyPendidikan = (): DataPendidikan => ({
  tingkatPendidikan: '', pendidikan: '', tanggalIjazah: '', tahunLulus: '',
  nomorIjazah: '', namaSekolah: '', gelarDepan: '', gelarBelakang: '',
  namaJabatan: '', lokasiIjazah: '',
})

const emptyProfesi = (): DataProfesi => ({
  klasifikasiProfesi: '', namaProfesi: '', nomorSertifikat: '', tanggalTerbit: '',
  gelarDepanProfesi: '', gelarBelakangProfesi: '', lembagaPenyelenggara: '', jenisProfesi: '',
})

const tingkatOptions  = ['SD', 'SMP', 'SMA/SMK', 'D-1', 'D-2', 'D-3', 'D-4', 'S-1', 'S-2', 'S-3']
const tahunOptions    = Array.from({ length: 30 }, (_, i) => String(new Date().getFullYear() - i))

const klasifikasiOptions = [
  'AKUNTAN DAN ANGGARAN', 'DOKTER DAN TENAGA KESEHATAN', 'HUKUM DAN PERUNDANGAN',
  'INFORMATIKA DAN TEKNOLOGI', 'KEUANGAN DAN PAJAK', 'MANAJEMEN DAN ADMINISTRASI',
  'PENDIDIKAN DAN PELATIHAN', 'PENELITIAN DAN PENGEMBANGAN', 'TEKNIK DAN REKAYASA',
]

const jenisProfesiOptions = [
  'Profesi Akuntan', 'Profesi Dokter', 'Profesi Hukum', 'Profesi IT',
  'Profesi Keuangan', 'Profesi Manajemen', 'Profesi Peneliti', 'Lainnya',
]

// ── Shared field components ────────────────────────────────────────────────
function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  )
}

function TextInput({ placeholder, value, onChange }: { placeholder?: string; value: string; onChange: (v: string) => void }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value.toUpperCase())}
      className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm uppercase text-slate-700 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder-slate-500"
    />
  )
}

function Dropdown({ value, onChange, options, placeholder }: { value: string; onChange: (v: string) => void; options: string[]; placeholder?: string }) {
  return (
    <DropdownSelect
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      options={options.map(o => ({ value: o, label: o }))}
    />
  )
}

// ── Form IPG (Profesi/Sertifikasi) ─────────────────────────────────────────
function FormIPG({ data, update }: { data: DataProfesi; update: (k: keyof DataProfesi, v: string) => void }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <Field label="Klasifikasi Profesi" required>
        <Dropdown value={data.klasifikasiProfesi} onChange={v => update('klasifikasiProfesi', v)}
          options={klasifikasiOptions} placeholder="Pilih klasifikasi" />
      </Field>
      <Field label="Nama Profesi/Sertifikasi" required>
        <TextInput placeholder="Akuntan" value={data.namaProfesi} onChange={v => update('namaProfesi', v)} />
      </Field>
      <Field label="Nomor Sertifikat" required>
        <TextInput placeholder="145/H5.2.1.5/LLS/PPAk/2010" value={data.nomorSertifikat} onChange={v => update('nomorSertifikat', v)} />
      </Field>
      <Field label="Tanggal Terbit Sertifikat" required>
        <DatePicker value={data.tanggalTerbit} onChange={v => update('tanggalTerbit', v)} placeholder="Pilih tanggal terbit" />
      </Field>
      <Field label="Gelar Depan Profesi">
        <TextInput placeholder="Dr." value={data.gelarDepanProfesi} onChange={v => update('gelarDepanProfesi', v)} />
      </Field>
      <Field label="Gelar Belakang Profesi">
        <TextInput placeholder="Ak." value={data.gelarBelakangProfesi} onChange={v => update('gelarBelakangProfesi', v)} />
      </Field>
      <Field label="Lembaga Penyelenggara" required>
        <TextInput placeholder="Universitas Sumatera Utara" value={data.lembagaPenyelenggara} onChange={v => update('lembagaPenyelenggara', v)} />
      </Field>
      <Field label="Jenis Profesi" required>
        <Dropdown value={data.jenisProfesi} onChange={v => update('jenisProfesi', v)}
          options={jenisProfesiOptions} placeholder="Pilih jenis profesi" />
      </Field>
    </div>
  )
}

// ── Form TUBEL/IPG Akademik (Pendidikan) ───────────────────────────────────
function FormPendidikan({ data, update }: { data: DataPendidikan; update: (k: keyof DataPendidikan, v: string) => void }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <Field label="Tingkat Pendidikan" required>
        <Dropdown value={data.tingkatPendidikan} onChange={v => update('tingkatPendidikan', v)}
          options={tingkatOptions} placeholder="Pilih tingkat pendidikan" />
      </Field>
      <Field label="Pendidikan" required>
        <TextInput placeholder="S-2 ILMU EKONOMI" value={data.pendidikan} onChange={v => update('pendidikan', v)} />
      </Field>
      <Field label="Tanggal Dikeluarkannya Ijazah" required>
        <DatePicker value={data.tanggalIjazah} onChange={v => update('tanggalIjazah', v)} placeholder="Pilih tanggal ijazah" />
      </Field>
      <Field label="Tahun Lulus" required>
        <Dropdown value={data.tahunLulus} onChange={v => update('tahunLulus', v)}
          options={tahunOptions} placeholder="Pilih tahun" />
      </Field>
      <Field label="Nomor Ijazah" required>
        <TextInput placeholder="001002601012026100004" value={data.nomorIjazah} onChange={v => update('nomorIjazah', v)} />
      </Field>
      <Field label="Nama Sekolah/Perguruan Tinggi" required>
        <TextInput placeholder="UNIVERSITAS INDONESIA" value={data.namaSekolah} onChange={v => update('namaSekolah', v)} />
      </Field>
      <Field label="Gelar Depan">
        <TextInput placeholder="Dr." value={data.gelarDepan} onChange={v => update('gelarDepan', v)} />
      </Field>
      <Field label="Gelar Belakang">
        <TextInput placeholder="M.Sc." value={data.gelarBelakang} onChange={v => update('gelarBelakang', v)} />
      </Field>
      <div className="sm:col-span-2">
        <Field label="Nama Jabatan Kepegawaian Eselon 1 atau 2">
          <TextInput placeholder="Kepala Biro Sumber Daya Manusia" value={data.namaJabatan} onChange={v => update('namaJabatan', v)} />
        </Field>
      </div>
      <div className="sm:col-span-2">
        <Field label="Lokasi Dikeluarkannya Ijazah">
          <TextInput placeholder="JAKARTA - JAKARTA" value={data.lokasiIjazah} onChange={v => update('lokasiIjazah', v)} />
        </Field>
      </div>
    </div>
  )
}

// ── Inner Content ──────────────────────────────────────────────────────────
function FormContent() {
  const router     = useRouter()
  const params     = useSearchParams()
  const layanan    = params.get('layanan') ?? ''
  const subLayanan = params.get('subLayanan') ?? ''
  const kode       = params.get('kode') ?? ''
  const nips       = (params.get('nips') ?? '').split(',').filter(Boolean)

  const pegawaiList = nips
    .map(nip => daftarPegawai.find(p => p.nip === nip))
    .filter(Boolean) as typeof daftarPegawai

  // IPG Profesi & Sertifikasi pakai form profesi, sisanya pakai form pendidikan
  const isIPGProfesiOrSertif = layanan === 'IPG' && (subLayanan === 'Profesi' || subLayanan === 'Sertifikasi')

  const [step, setStep] = useState(0)
  const [profesiData,   setProfesiData]   = useState<DataProfesi[]>(pegawaiList.map(() => emptyProfesi()))
  const [pendidikanData, setPendidikanData] = useState<DataPendidikan[]>(pegawaiList.map(() => emptyPendidikan()))

  if (pegawaiList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-sm text-slate-500">Data pegawai tidak ditemukan.</p>
        <button onClick={() => router.push('/formpermintaan')} className="mt-4 text-sm text-indigo-600 underline">Kembali ke Form Permintaan</button>
      </div>
    )
  }

  const currentProfesi    = profesiData[step]
  const currentPendidikan = pendidikanData[step]

  const updateProfesi = (k: keyof DataProfesi, v: string) =>
    setProfesiData(prev => { const n = [...prev]; n[step] = { ...n[step], [k]: v }; return n })

  const updatePendidikan = (k: keyof DataPendidikan, v: string) =>
    setPendidikanData(prev => { const n = [...prev]; n[step] = { ...n[step], [k]: v }; return n })

  const isValidProfesi   = (d: DataProfesi)    => !!(d.klasifikasiProfesi && d.namaProfesi && d.nomorSertifikat && d.tanggalTerbit && d.lembagaPenyelenggara && d.jenisProfesi)
  const isValidPendidikan = (d: DataPendidikan) => !!(d.tingkatPendidikan && d.pendidikan && d.tanggalIjazah && d.tahunLulus && d.nomorIjazah && d.namaSekolah)

  const isCurrentValid = isIPGProfesiOrSertif
    ? isValidProfesi(currentProfesi)
    : isValidPendidikan(currentPendidikan)

  const completedCount = isIPGProfesiOrSertif
    ? profesiData.filter(isValidProfesi).length
    : pendidikanData.filter(isValidPendidikan).length

  const isAllDone = (i: number) => isIPGProfesiOrSertif
    ? isValidProfesi(profesiData[i])
    : isValidPendidikan(pendidikanData[i])

  const isLast = step === pegawaiList.length - 1

  const handleNext = () => {
    if (!isLast) { setStep(step + 1) }
    else {
      const urlParams = new URLSearchParams({ layanan, subLayanan, kode, nips: nips.join(',') })
      router.push(`/formkelengkapan?${urlParams.toString()}`)
    }
  }

  const current     = pegawaiList[step]
  const formTitle   = isIPGProfesiOrSertif ? 'Data Profesi/Sertifikasi Pegawai' : 'Data Pendidikan Pegawai'
  const sectionTitle = isIPGProfesiOrSertif ? 'Profesi / Sertifikasi' : 'Pendidikan'

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 dark:bg-slate-950 sm:px-6 lg:px-10">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-slate-400">
        <span className="cursor-pointer hover:text-slate-600 dark:hover:text-slate-300" onClick={() => router.push('/dashboard')}>Dashboard</span>
        <ChevronRightIcon className="h-3.5 w-3.5" />
        <span className="cursor-pointer hover:text-slate-600 dark:hover:text-slate-300" onClick={() => router.push('/formpermintaan')}>Form Permintaan</span>
        <ChevronRightIcon className="h-3.5 w-3.5" />
        <span className="font-medium text-slate-700 dark:text-slate-200">Data Pegawai</span>
      </nav>

      {/* Header */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-base font-semibold text-slate-800 dark:text-slate-100">{formTitle}</h1>
          <p className="mt-0.5 text-sm text-slate-400">{kode} · {layanan} {subLayanan}</p>
        </div>
        <span className="text-sm text-slate-500 dark:text-slate-400">
          Pegawai <span className="font-semibold text-slate-800 dark:text-slate-100">{step + 1}</span> dari <span className="font-semibold text-slate-800 dark:text-slate-100">{pegawaiList.length}</span>
        </span>
      </div>

      {/* Stepper pill */}
      {pegawaiList.length > 1 && (
        <div className="mb-5 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {pegawaiList.map((p, i) => (
            <button key={p.nip} onClick={() => setStep(i)}
              className={`flex shrink-0 items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                i === step ? 'bg-indigo-600 text-white'
                : isAllDone(i) ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                : 'bg-white text-slate-600 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700'
              }`}
            >
              {isAllDone(i) && i !== step
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
        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}
          className="rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
        >
          {/* Card header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400">
                {current.nama.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-100">{current.nama}</p>
                <p className="text-xs text-slate-400">{current.nip} · {current.jabatan} · {current.unit}</p>
              </div>
            </div>
            <span className="hidden rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 sm:inline">
              {sectionTitle}
            </span>
          </div>

          {/* Form fields */}
          <div className="px-6 py-6">
            {isIPGProfesiOrSertif
              ? <FormIPG data={currentProfesi} update={updateProfesi} />
              : <FormPendidikan data={currentPendidikan} update={updatePendidikan} />
            }
          </div>

          {/* Card footer */}
          <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4 dark:border-slate-700">
            <button type="button"
              onClick={() => step > 0 ? setStep(step - 1) : router.push('/formpermintaan')}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-transparent dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {step === 0 ? 'Kembali' : 'Sebelumnya'}
            </button>
            <button type="button" onClick={handleNext} disabled={!isCurrentValid}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isLast ? (<><CheckSolid className="h-4 w-4" />Lanjut ke Kelengkapan Dokumen</>) : (<>Pegawai Berikutnya<ChevronRightIcon className="h-4 w-4" /></>)}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
          <span>Progress pengisian data</span>
          <span>{completedCount} / {pegawaiList.length} selesai</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-700">
          <motion.div className="h-1.5 rounded-full bg-indigo-600"
            animate={{ width: `${(completedCount / pegawaiList.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>
    </div>
  )
}

export default function FormDataPegawaiPage() {
  return (
    <Suspense fallback={
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      </div>
    }>
      <FormContent />
    </Suspense>
  )
}
