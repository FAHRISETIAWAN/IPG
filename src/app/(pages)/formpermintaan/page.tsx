'use client'

import { KonfirmasiDialog } from '@/components/form/konfirmasi-dialog'
import { PegawaiMultiSelect } from '@/components/form/pegawai-multiselect'
import type { Pegawai } from '@/data/pegawai-data'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

type Layanan = 'IPG' | 'TUBEL' | 'PWK' | ''
type SubLayananIPG = 'Profesi' | 'Sertifikasi' | 'Akademik' | ''
type SubLayananTUBEL = 'Mandiri' | 'Beasiswa' | ''

const SUB_IPG: SubLayananIPG[] = ['Profesi', 'Sertifikasi', 'Akademik']
const SUB_TUBEL: SubLayananTUBEL[] = ['Mandiri', 'Beasiswa']

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
      <span className={`mr-2 flex h-4 w-4 items-center justify-center rounded-full border-2 ${
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
  const [nomorSurat, setNomorSurat] = useState('')
  const [pegawai, setPegawai] = useState<Pegawai[]>([])
  const [showKonfirmasi, setShowKonfirmasi] = useState(false)

  const handleLayanan = (val: Layanan) => {
    setLayanan(val)
    setSubIPG('')
    setSubTUBEL('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowKonfirmasi(true)
  }

  const subLayanan = layanan === 'IPG' ? subIPG : layanan === 'TUBEL' ? subTUBEL : ''

  return (
    <>
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
              <input
                type="text"
                placeholder="B/1234/KP.02.03/2025"
                value={nomorSurat}
                onChange={(e) => setNomorSurat(e.target.value.toUpperCase())}
                className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm uppercase text-slate-700 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder-slate-500"
              />
            </div>

            {/* Divider */}
            <div className="border-t border-slate-100 dark:border-slate-700" />

            {/* 2. Pilih Layanan */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Pilih Layanan <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-3">
                <RadioCard label="IPG" checked={layanan === 'IPG'} onClick={() => handleLayanan('IPG')} />
                <RadioCard label="TUBEL" checked={layanan === 'TUBEL'} onClick={() => handleLayanan('TUBEL')} />
                <RadioCard label="PWK" checked={layanan === 'PWK'} onClick={() => handleLayanan('PWK')} />
              </div>
            </div>

            {/* 3. Sub layanan — conditional */}
            {layanan === 'IPG' && (
              <div>
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
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Jenis TUBEL <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-3">
                  {SUB_TUBEL.map((item) => (
                    <RadioCard key={item} label={item} checked={subTUBEL === item} onClick={() => setSubTUBEL(item)} />
                  ))}
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="border-t border-slate-100 dark:border-slate-700" />

            {/* 4. Nama Pegawai */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Nama Pegawai <span className="text-red-500">*</span>
              </label>
              <p className="mb-2 text-xs text-slate-400 dark:text-slate-500">
                Dapat memilih lebih dari satu pegawai. Cari berdasarkan NIP atau nama.
              </p>
              <PegawaiMultiSelect value={pegawai} onChange={setPegawai} />
            </div>

          </div>

          {/* Card footer — actions */}
          <div className="flex items-center gap-3 px-6 py-4">
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
