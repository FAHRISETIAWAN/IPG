'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  ChartBarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  DocumentCheckIcon,
  HomeIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import {
  ChartBarIcon as ChartBarSolid,
  ClipboardDocumentCheckIcon as ClipboardCheckSolid,
  ClipboardDocumentListIcon as ClipboardSolid,
  Cog6ToothIcon as CogSolid,
  DocumentCheckIcon as DocumentCheckSolid,
  HomeIcon as HomeSolid,
  UserGroupIcon as UserGroupSolid,
} from '@heroicons/react/24/solid'

const navItems = [
  { label: 'Dashboard',       href: '/dashboard',      icon: HomeIcon,                   iconActive: HomeSolid },
  { label: 'Form Permintaan', href: '/formpermintaan', icon: ClipboardDocumentListIcon,  iconActive: ClipboardSolid },
  { label: 'Verifikasi',      href: '/verifikasi',     icon: ClipboardDocumentCheckIcon, iconActive: ClipboardCheckSolid },
  { label: 'SK Pegawai',      href: '/sk',             icon: DocumentCheckIcon,          iconActive: DocumentCheckSolid },
  { label: 'Laporan',         href: '/laporan',        icon: ChartBarIcon,               iconActive: ChartBarSolid },
  { label: 'Pegawai',         href: '/pegawai',        icon: UserGroupIcon,              iconActive: UserGroupSolid },
]

const bottomNavItems = [
  { label: 'Dashboard', href: '/dashboard',          icon: HomeIcon,                   iconActive: HomeSolid },
  { label: 'Form',      href: '/formpermintaan',     icon: ClipboardDocumentListIcon,  iconActive: ClipboardSolid },
  { label: 'Verifikasi',href: '/verifikasi',         icon: ClipboardDocumentCheckIcon, iconActive: ClipboardCheckSolid },
  { label: 'Laporan',   href: '/laporan',            icon: ChartBarIcon,               iconActive: ChartBarSolid },
  { label: 'Settings',  href: '/dashboard/settings', icon: Cog6ToothIcon,             iconActive: CogSolid },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(true)

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
          {navItems.map((item) => {
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

        {/* Bottom: Settings + collapse toggle */}
        <div className={clsx('flex flex-col gap-1', collapsed ? 'items-center' : 'px-3')}>
          <Link
            href="/dashboard/settings"
            title={collapsed ? 'Settings' : undefined}
            className={clsx(
              'group relative flex h-10 items-center rounded-xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200',
              collapsed ? 'w-10 justify-center' : 'w-full gap-3 px-3'
            )}
          >
            <Cog6ToothIcon className="h-5 w-5 shrink-0" />
            {collapsed ? (
              <span className="pointer-events-none absolute left-14 z-50 whitespace-nowrap rounded-lg bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-100 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                Settings
              </span>
            ) : (
              <span className="text-sm font-medium">Settings</span>
            )}
          </Link>

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
