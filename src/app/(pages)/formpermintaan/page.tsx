'use client'

import { HukdisCheckDialog, type PWKTujuan } from '@/components/form/hukdis-check-dialog'
import { KonfirmasiDialog } from '@/components/form/konfirmasi-dialog'
import { PegawaiMultiSelect } from '@/components/form/pegawai-multiselect'
import type { Pegawai } from '@/data/pegawai-data'
import {
  CheckCircleIcon,
  ChevronRightIcon,
  ExclamationCircleIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import { useRef, useState } from 'react'

interface SuratResult {
  NOMORSURAT: string
  PERIHAL: string
  PENGIRIM: string
  TANGGAL_SURAT: string
}

type Layanan = 'IPG' | 'TUBEL' | 'PWK' | 'UJIKOM' | ''
type SubLayananIPG = 'Profesi' | 'Sertifikasi' | 'Akademik' | ''
type SubLayananTUBEL = 'Mandiri' | 'Beasiswa' | ''
type SubLayananUJIKOM = 'Perpindahan Jabatan' | 'Kenaikan Jenjang' | ''

const SUB_IPG: SubLayananIPG[] = ['Profesi', 'Sertifikasi', 'Akademik']
const SUB_TUBEL: SubLayananTUBEL[] = ['Mandiri', 'Beasiswa']
const SUB_UJIKOM: SubLayananUJIKOM[] = ['Perpindahan Jabatan', 'Kenaikan Jenjang']

const LAYANAN_OPTIONS: { value: Layanan; label: string }[] = [
  { value: 'IPG',    label: 'IPG' },
  { value: 'TUBEL',  label: 'Tugas Belajar' },
  { value: 'PWK',    label: 'Pindah Wilayah Kerja' },
  { value: 'UJIKOM', label: 'Uji Kompetensi JF' },
]

function RadioCard({
  label, checked, onClick,
}: { label: string; checked: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-1 items-center justify-center rounded-xl border-2 py-3 text-sm font-medium transition ${
        checked
          ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-500'
          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
      }`}
    >
      <span className={`mr-2 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
        checked ? 'border-indigo-600 dark:border-indigo-400' : 'border-slate-300 dark:border-slate-600'
      }`}>
        {checked && <span className="h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />}
      </span>
      {label}
    </button>
  )
}

export default function FormPermintaanPage() {
  const [layanan, setLayanan] = useState<Layanan>('')
  const [subIPG, setSubIPG] = useState<SubLayananIPG>('')
  const [subTUBEL, setSubTUBEL] = useState<SubLayananTUBEL>('')
  const [subUJIKOM, setSubUJIKOM] = useState<SubLayananUJIKOM>('')
  const [nomorSurat, setNomorSurat] = useState('')
  const [suratResult, setSuratResult] = useState<SuratResult | null>(null)
  const [suratError, setSuratError] = useState('')
  const [suratLoading, setSuratLoading] = useState(false)
  const [pegawai, setPegawai] = useState<Pegawai[]>([])
  const [showHukdisCheck, setShowHukdisCheck] = useState(false)
  const [showKonfirmasi, setShowKonfirmasi] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleNomorSurat = (val: string) => {
    setNomorSurat(val)
    setSuratResult(null)
    setSuratError('')
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (val.trim().length < 5) return
    debounceRef.current = setTimeout(async () => {
      setSuratLoading(true)
      try {
        const params = new URLSearchParams({ no_surat: val.trim() })
        const res = await fetch(`https://api-interop.atrbpn.go.id/manajemen/interop/api/persuratan/cari-surat?${params}`, {
          headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI5ZDFhZTJjNS01ZjRhLWIxYzgtZTA1My0wYzFkMTQwYTBlN2EiLCJlbWFpbCI6ImFyZGlhbnN5YWguaWxoYW1AYXRyYnBuLmdvLmlkIiwicm9sZSI6IlVzZXIiLCJuYmYiOjE2ODc1MDc0MzksImV4cCI6MjAwMzEyNjYzOSwiaWF0IjoxNjg3NTA3NDM5LCJpc3MiOiJ5b3VyaXNzdWVyMTIzIiwiYXVkIjoieW91cmF1ZGllbmNlMTIzIn0.6Q6aIkJYQDjrzf9R2MZ8z7rQ0LR7tRq4El3AbxEi6x0' },
        })
        const json = await res.json()
        const rows = Array.isArray(json) ? json : Array.isArray(json?.data) ? json.data : []
        if (!res.ok || rows.length === 0) {
          setSuratError('Surat tidak ditemukan')
        } else {
          setSuratResult(rows[0])
        }
      } catch {
        setSuratError('Gagal menghubungi server')
      } finally {
        setSuratLoading(false)
      }
    }, 600)
  }

  const handleLayanan = (val: Layanan) => {
    setLayanan(val)
    setSubIPG('')
    setSubTUBEL('')
    setSubUJIKOM('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowHukdisCheck(true)
  }

  const handleHukdisConfirm = (_extra?: PWKTujuan[]) => {
    setShowHukdisCheck(false)
    setShowKonfirmasi(true)
  }

  const subLayanan = layanan === 'IPG' ? subIPG : layanan === 'TUBEL' ? subTUBEL : layanan === 'UJIKOM' ? subUJIKOM : ''

  return (
    <>
    <HukdisCheckDialog
      open={showHukdisCheck}
      onClose={() => setShowHukdisCheck(false)}
      onConfirm={handleHukdisConfirm}
      pegawai={pegawai}
      layanan={layanan}
    />
    <KonfirmasiDialog
      open={showKonfirmasi}
      onClose={() => setShowKonfirmasi(false)}
      data={{ layanan, subLayanan, nomorSurat, pegawai }}
    />
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-8 sm:px-6 lg:px-10">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-slate-400">
        <span className="hover:text-slate-600 cursor-pointer dark:hover:text-slate-300">Dashboard</span>
        <ChevronRightIcon className="h-3.5 w-3.5" />
        <span className="font-medium text-slate-700 dark:text-slate-200">Form Permintaan</span>
      </nav>

      <form onSubmit={handleSubmit} className="w-full">
        <div className="rounded-2xl bg-white dark:bg-slate-900">
          {/* Card header */}
          <div className="px-6 py-5">
            <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100">Informasi Permintaan</h2>
            <p className="mt-0.5 text-sm text-slate-400">Lengkapi data permintaan layanan di bawah ini</p>
          </div>

          {/* Card body */}
          <div className="space-y-6 px-6 py-6">

            {/* 1. Nomor Surat Entri */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Nomor Surat Entri <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="974/ND-100.2.KP.01.01/VII/2026"
                  value={nomorSurat}
                  onChange={(e) => handleNomorSurat(e.target.value)}
                  className={`h-10 w-full rounded-xl border px-3 pr-10 text-sm text-slate-700 placeholder-slate-400 outline-none transition focus:ring-1 dark:text-slate-200 dark:placeholder-slate-500 ${
                    suratResult
                      ? 'border-emerald-400 bg-emerald-50 focus:border-emerald-500 focus:ring-emerald-500 dark:border-emerald-600 dark:bg-emerald-900/10'
                      : suratError
                      ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500 dark:border-red-600 dark:bg-red-900/10'
                      : 'border-slate-200 bg-white focus:border-indigo-500 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800'
                  }`}
                />
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                  {suratLoading ? (
                    <svg className="h-4 w-4 animate-spin text-indigo-400" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                  ) : suratResult ? (
                    <CheckCircleIcon className="h-4 w-4 text-emerald-500" />
                  ) : suratError ? (
                    <ExclamationCircleIcon className="h-4 w-4 text-red-500" />
                  ) : (
                    <MagnifyingGlassIcon className="h-4 w-4 text-slate-300" />
                  )}
                </div>
              </div>

              {/* Result card */}
              {suratResult && (
                <div className="mt-2 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 dark:border-emerald-800/40 dark:bg-emerald-900/10">
                  <CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">Surat Ditemukan</p>
                    <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-300">
                      <span className="font-medium">Pengirim:</span> {suratResult.PENGIRIM}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-medium">Tanggal:</span> {suratResult.TANGGAL_SURAT}
                    </p>
                  </div>
                </div>
              )}

              {/* Error */}
              {suratError && (
                <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
                  <ExclamationCircleIcon className="h-3.5 w-3.5" /> {suratError}
                </p>
              )}
            </div>

            {/* 2–4: hanya aktif setelah nomor surat valid */}
            <div className={!suratResult ? 'pointer-events-none opacity-40 select-none' : ''}>

            {/* Divider */}
            <div className="border-t border-slate-100 dark:border-slate-700" />

            {/* 2. Pilih Layanan */}
            <div className="pt-6">
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Pilih Layanan <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {LAYANAN_OPTIONS.map(opt => (
                  <RadioCard
                    key={opt.value}
                    label={opt.label}
                    checked={layanan === opt.value}
                    onClick={() => handleLayanan(opt.value)}
                  />
                ))}
              </div>
            </div>

            {/* 3. Sub layanan — conditional */}
            {layanan === 'IPG' && (
              <div className="pt-6">
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Jenis IPG <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {SUB_IPG.map((item) => (
                    <RadioCard key={item} label={item} checked={subIPG === item} onClick={() => setSubIPG(item)} />
                  ))}
                </div>
              </div>
            )}

            {layanan === 'TUBEL' && (
              <div className="pt-6">
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Jenis Tugas Belajar <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-3">
                  {SUB_TUBEL.map((item) => (
                    <RadioCard key={item} label={item} checked={subTUBEL === item} onClick={() => setSubTUBEL(item)} />
                  ))}
                </div>
              </div>
            )}

            {layanan === 'UJIKOM' && (
              <div className="pt-6">
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Jenis Uji Kompetensi JF <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-3">
                  {SUB_UJIKOM.map((item) => (
                    <RadioCard key={item} label={item} checked={subUJIKOM === item} onClick={() => setSubUJIKOM(item)} />
                  ))}
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="mt-6 border-t border-slate-100 dark:border-slate-700" />

            {/* 4. Nama Pegawai */}
            <div className="pt-6">
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Nama Pegawai <span className="text-red-500">*</span>
              </label>
              <p className="mb-2 text-xs text-slate-400 dark:text-slate-500">
                Dapat memilih lebih dari satu pegawai. Cari berdasarkan NIP atau nama.
              </p>
              <PegawaiMultiSelect value={pegawai} onChange={setPegawai} />
            </div>

            </div>

          </div>

          {/* Card footer — actions */}
          <div className="flex items-center gap-3 px-6 py-4">
            <button
              type="submit"
              disabled={!suratResult}
              className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-indigo-600"
            >
              Simpan
            </button>
            <button
              type="button"
              className="rounded-lg border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-transparent dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Batal
            </button>
          </div>
        </div>
      </form>
    </div>
    </>
  )
}
