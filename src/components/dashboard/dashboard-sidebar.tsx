'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  ArrowPathIcon,
  ChartBarIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  DocumentCheckIcon,
  DocumentTextIcon,
  HomeIcon,
  StarIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import {
  ArrowPathIcon as ArrowPathSolid,
  ChartBarIcon as ChartBarSolid,
  ClipboardDocumentCheckIcon as ClipboardCheckSolid,
  ClipboardDocumentListIcon as ClipboardSolid,
  Cog6ToothIcon as CogSolid,
  DocumentCheckIcon as DocumentCheckSolid,
  DocumentTextIcon as DocumentTextSolid,
  HomeIcon as HomeSolid,
  UserGroupIcon as UserGroupSolid,
} from '@heroicons/react/24/solid'

const SURAT_CHILDREN = [
  { label: 'Rekomendasi PWK',   href: '/surat/rekomendasi' },
  { label: 'Surat Keputusan',   href: '/sk' },
  { label: 'Sertifikat',        href: '/surat/sertifikat' },
]

const navItems = [
  { label: 'Dashboard',       href: '/dashboard',      icon: HomeIcon,                   iconActive: HomeSolid },
  { label: 'Form Permintaan', href: '/formpermintaan', icon: ClipboardDocumentListIcon,  iconActive: ClipboardSolid },
  { label: 'Verifikasi',      href: '/verifikasi',     icon: ClipboardDocumentCheckIcon, iconActive: ClipboardCheckSolid },
  { label: 'Perpanjangan',    href: '/perpanjangan',   icon: ArrowPathIcon,              iconActive: ArrowPathSolid },
  { label: 'Laporan',         href: '/laporan',        icon: ChartBarIcon,               iconActive: ChartBarSolid },
  { label: 'Pegawai',         href: '/pegawai',        icon: UserGroupIcon,              iconActive: UserGroupSolid },
]

const bottomNavItems = [
  { label: 'Dashboard', href: '/dashboard',          icon: HomeIcon,                   iconActive: HomeSolid },
  { label: 'Form',      href: '/formpermintaan',     icon: ClipboardDocumentListIcon,  iconActive: ClipboardSolid },
  { label: 'Verifikasi',href: '/verifikasi',         icon: ClipboardDocumentCheckIcon, iconActive: ClipboardCheckSolid },
  { label: 'Laporan',   href: '/laporan',            icon: ChartBarIcon,               iconActive: ChartBarSolid },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(true)
  const isSuratActive = SURAT_CHILDREN.some(c => pathname === c.href)
  const [suratOpen, setSuratOpen] = useState(isSuratActive)

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={clsx(
          'hidden flex-col bg-white py-6 transition-all duration-200 dark:bg-slate-900 lg:flex',
          collapsed ? 'w-16 items-center' : 'w-56 items-stretch'
        )}
      >
        {/* Logo */}
        <div className={clsx('mb-8 flex shrink-0', collapsed ? 'justify-center' : 'items-center gap-2.5 px-4')}>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600">
            <span className="text-sm font-bold text-white">IP</span>
          </div>
          {!collapsed && (
            <span className="text-sm font-bold text-slate-800 dark:text-slate-100">Layanan Pegawai</span>
          )}
        </div>

        {/* Nav */}
        <nav className={clsx('flex flex-1 flex-col gap-1', collapsed ? 'items-center' : 'px-3')}>
          {/* Dashboard, Form Permintaan, Verifikasi */}
          {navItems.slice(0, 3).map((item) => {
            const isActive = pathname === item.href
            const Icon = isActive ? item.iconActive : item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={clsx(
                  'group relative flex h-10 items-center rounded-xl transition-colors',
                  collapsed ? 'w-10 justify-center' : 'w-full gap-3 px-3',
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200'
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {collapsed ? (
                  <span className="pointer-events-none absolute left-14 z-50 whitespace-nowrap rounded-lg bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-100 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                    {item.label}
                  </span>
                ) : (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </Link>
            )
          })}

          {/* Surat Dokumen — submenu */}
          {collapsed ? (
            <div className="group relative">
              <button
                title="Surat Dokumen"
                onClick={() => { setCollapsed(false); setSuratOpen(true) }}
                className={clsx(
                  'group relative flex h-10 w-10 items-center justify-center rounded-xl transition-colors',
                  isSuratActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200'
                )}
              >
                {isSuratActive ? <DocumentCheckSolid className="h-5 w-5 shrink-0" /> : <DocumentCheckIcon className="h-5 w-5 shrink-0" />}
                <span className="pointer-events-none absolute left-14 z-50 whitespace-nowrap rounded-lg bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-100 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                  Dokumen
                </span>
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={() => setSuratOpen(v => !v)}
                className={clsx(
                  'flex h-10 w-full items-center gap-3 rounded-xl px-3 transition-colors',
                  isSuratActive
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200'
                )}
              >
                {isSuratActive ? <DocumentCheckSolid className="h-5 w-5 shrink-0" /> : <DocumentCheckIcon className="h-5 w-5 shrink-0" />}
                <span className="flex-1 text-left text-sm font-medium">Dokumen</span>
                <ChevronDownIcon className={clsx('h-3.5 w-3.5 transition-transform duration-200', suratOpen ? 'rotate-180' : '')} />
              </button>

              {suratOpen && (
                <div className="ml-8 mt-0.5 flex flex-col gap-0.5">
                  {SURAT_CHILDREN.map(child => {
                    const isActive = pathname === child.href
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={clsx(
                          'flex h-8 items-center rounded-lg px-3 text-xs font-medium transition-colors',
                          isActive
                            ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'
                            : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300'
                        )}
                      >
                        <span className={clsx('mr-2 h-1 w-1 rounded-full', isActive ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-600')} />
                        {child.label}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          {/* Perpanjangan, Laporan, Pegawai */}
          {navItems.slice(3).map((item) => {
            const isActive = pathname === item.href
            const Icon = isActive ? item.iconActive : item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={clsx(
                  'group relative flex h-10 items-center rounded-xl transition-colors',
                  collapsed ? 'w-10 justify-center' : 'w-full gap-3 px-3',
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200'
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {collapsed ? (
                  <span className="pointer-events-none absolute left-14 z-50 whitespace-nowrap rounded-lg bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-100 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                    {item.label}
                  </span>
                ) : (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Bottom: collapse toggle */}
        <div className={clsx('flex flex-col gap-1', collapsed ? 'items-center' : 'px-3')}>
          {/* Collapse toggle */}
          <button
            onClick={() => setCollapsed(v => !v)}
            title={collapsed ? 'Perluas sidebar' : 'Ciutkan sidebar'}
            className={clsx(
              'flex h-10 items-center rounded-xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200',
              collapsed ? 'w-10 justify-center' : 'w-full gap-3 px-3'
            )}
          >
            {collapsed ? (
              <ChevronRightIcon className="h-4 w-4" />
            ) : (
              <ChevronLeftIcon className="h-4 w-4 shrink-0" />
            )}
          </button>
        </div>
      </aside>

      {/* Mobile bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-slate-200 bg-white px-2 pb-safe pt-2 dark:border-slate-700/50 dark:bg-slate-900 lg:hidden">
        {bottomNavItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = isActive ? item.iconActive : item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 transition-colors',
                isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}
