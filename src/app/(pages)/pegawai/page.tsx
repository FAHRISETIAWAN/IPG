'use client'

import {
  daftarPegawaiRole,
  ROLE_CONFIG,
  type PegawaiRole,
  type Role,
} from '@/data/pegawai-role-data'
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  UserGroupIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

const ROLES: Role[] = ['admin', 'verifikator_ipg', 'verifikator_tubel']

const filterTabs: { key: Role | 'semua'; label: string }[] = [
  { key: 'semua',            label: 'Semua' },
  { key: 'admin',            label: 'Admin' },
  { key: 'verifikator_ipg',  label: 'Verifikator IPG' },
  { key: 'verifikator_tubel',label: 'Verifikator TUBEL' },
  { key: 'pegawai',          label: 'Pegawai' },
]

// ── Edit Role Sheet ────────────────────────────────────────────────────────
function EditRoleSheet({
  pegawai,
  onClose,
  onSave,
}: {
  pegawai: PegawaiRole | null
  onClose: () => void
  onSave: (nip: string, role: Role) => void
}) {
  const [selectedRole, setSelectedRole] = useState<Role>(pegawai?.role ?? 'verifikator_ipg')

  if (!pegawai) return null

  const handleSave = () => {
    onSave(pegawai.nip, selectedRole)
    onClose()
  }

  return (
    <AnimatePresence>
      {pegawai && (
        <>
          <motion.div key="bd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={onClose} />

          <motion.div key="sh" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 340, damping: 38 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl dark:bg-slate-900"
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                  <XMarkIcon className="h-5 w-5" />
                </button>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-100">Edit Akses</p>
                  <p className="text-xs text-slate-400">{pegawai.nama}</p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {/* Info pegawai */}
              <div className="mb-6 flex items-center gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-base font-bold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400">
                  {pegawai.nama.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-slate-800 dark:text-slate-100">{pegawai.nama}</p>
                  <p className="truncate text-xs text-slate-400">{pegawai.nip}</p>
                  <p className="truncate text-xs text-slate-500">{pegawai.jabatan} · {pegawai.unit}</p>
                </div>
              </div>

              {/* Pilih role */}
              <div className="mb-6">
                <p className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-200">Hak Akses</p>
                <div className="space-y-2">
                  {ROLES.map(role => {
                    const cfg = ROLE_CONFIG[role]
                    return (
                      <button
                        key={role}
                        onClick={() => setSelectedRole(role)}
                        className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition ${
                          selectedRole === role
                            ? 'border-indigo-400 bg-indigo-50 dark:border-indigo-600 dark:bg-indigo-900/20'
                            : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600'
                        }`}
                      >
                        <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                          selectedRole === role ? 'border-indigo-500 bg-indigo-500' : 'border-slate-300 dark:border-slate-600'
                        }`}>
                          {selectedRole === role && <span className="h-2 w-2 rounded-full bg-white" />}
                        </span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{cfg.label}</span>
                            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${cfg.bg} ${cfg.text}`}>{cfg.label}</span>
                          </div>
                          <p className="mt-0.5 text-xs text-slate-400">{cfg.desc}</p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="shrink-0 border-t border-slate-200 bg-white px-5 py-4 dark:border-slate-700 dark:bg-slate-900">
              <div className="flex gap-3">
                <button onClick={onClose}
                  className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800">
                  Batal
                </button>
                <button onClick={handleSave}
                  className="flex-1 rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500">
                  Simpan
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function PegawaiPage() {
  const [data, setData]             = useState<PegawaiRole[]>(daftarPegawaiRole)
  const [activeFilter, setActiveFilter] = useState<Role | 'semua'>('semua')
  const [search, setSearch]         = useState('')
  const [editTarget, setEditTarget] = useState<PegawaiRole | null>(null)

  const filtered = data.filter(p => {
    const matchRole   = activeFilter === 'semua' || p.role === activeFilter
    const q = search.toLowerCase()
    const matchSearch = !q || p.nama.toLowerCase().includes(q) || p.nip.includes(q) || p.unit.toLowerCase().includes(q)
    return matchRole && matchSearch
  })

  const counts: Record<string, number> = { semua: data.length }
  data.forEach(p => { counts[p.role] = (counts[p.role] ?? 0) + 1 })

  const handleSave = (nip: string, role: Role) => {
    setData(prev => prev.map(p => p.nip === nip ? { ...p, role } : p))
  }

  // summary cards
  const summary = [
    { role: 'admin'             as Role, count: data.filter(p => p.role === 'admin').length },
    { role: 'verifikator_ipg'  as Role, count: data.filter(p => p.role === 'verifikator_ipg').length },
    { role: 'verifikator_tubel'as Role, count: data.filter(p => p.role === 'verifikator_tubel').length },
    { role: 'pegawai'           as Role, count: data.filter(p => p.role === 'pegawai').length },
  ]

  return (
    <>
      <div className="flex h-full flex-col overflow-hidden">
        {/* Header */}
        <div className="shrink-0 border-b border-slate-200 bg-white px-4 py-4 dark:border-slate-700 dark:bg-slate-800 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100">Manajemen Pegawai</h1>
              <p className="mt-0.5 text-sm text-slate-400">Kelola hak akses dan role pengguna sistem</p>
            </div>
          </div>

          {/* Summary cards */}
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {summary.map(({ role, count }) => {
              const cfg = ROLE_CONFIG[role]
              return (
                <button key={role} onClick={() => setActiveFilter(role)}
                  className={`flex items-center gap-2.5 rounded-xl border p-3 text-left transition ${
                    activeFilter === role
                      ? 'border-indigo-300 bg-indigo-50 dark:border-indigo-700 dark:bg-indigo-900/20'
                      : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800/50'
                  }`}
                >
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${cfg.bg} ${cfg.text}`}>
                    {count}
                  </span>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{cfg.label}</span>
                </button>
              )
            })}
          </div>

          {/* Filter + Search */}
          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {filterTabs.map(tab => (
                <button key={tab.key} onClick={() => setActiveFilter(tab.key as Role | 'semua')}
                  className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                    activeFilter === tab.key
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
                  }`}
                >
                  {tab.label}
                  <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                    activeFilter === tab.key ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600 dark:bg-slate-600 dark:text-slate-300'
                  }`}>
                    {counts[tab.key] ?? 0}
                  </span>
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-60">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Cari nama, NIP, unit..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-200 dark:placeholder-slate-400"
              />
            </div>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto bg-white px-4 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden dark:bg-slate-800 sm:px-6">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <UserGroupIcon className="mb-3 h-10 w-10 text-slate-300 dark:text-slate-600" />
              <p className="text-sm font-medium text-slate-500">Tidak ada data pegawai</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {filtered.map(p => {
                const cfg = ROLE_CONFIG[p.role]
                return (
                  <div key={p.nip} className="flex items-center gap-4 py-3.5 transition hover:bg-slate-50 dark:hover:bg-slate-700/20 sm:px-1">
                    {/* Avatar */}
                    <div className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                      p.aktif ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400' : 'bg-slate-100 text-slate-400 dark:bg-slate-700'
                    }`}>
                      {p.nama.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      {!p.aktif && (
                        <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-800">
                          <XMarkIcon className="h-2 w-2 text-white" />
                        </span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{p.nama}</span>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${cfg.bg} ${cfg.text}`}>{cfg.label}</span>
                        {!p.aktif && <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold text-red-600 dark:bg-red-900/30 dark:text-red-400">Nonaktif</span>}
                      </div>
                      <p className="mt-0.5 truncate text-xs text-slate-400">{p.nip} · {p.jabatan} · {p.unit}</p>
                      <p className="truncate text-[11px] text-slate-400">{p.email}</p>
                    </div>

                    {/* Edit button */}
                    <button onClick={() => { setEditTarget(p) }}
                      className="flex shrink-0 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-300 dark:hover:border-indigo-500 dark:hover:text-indigo-400"
                    >
                      <PencilSquareIcon className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Edit Akses</span>
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Sheet */}
      <EditRoleSheet
        pegawai={editTarget}
        onClose={() => setEditTarget(null)}
        onSave={handleSave}
      />
    </>
  )
}
