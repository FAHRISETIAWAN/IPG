'use client'

import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'

interface Props {
  open: boolean
  onClose: () => void
  title?: string
  message?: string
  duration?: number
}

export function SuccessToast({
  open,
  onClose,
  title = 'Berhasil Disimpan',
  message = 'Data berhasil disimpan.',
  duration = 2500,
}: Props) {
  useEffect(() => {
    if (!open) return
    const t = setTimeout(onClose, duration)
    return () => clearTimeout(t)
  }, [open, onClose, duration])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="fixed bottom-6 left-1/2 z-[99] -translate-x-1/2"
        >
          <div className="flex items-center gap-3 rounded-2xl bg-white px-5 py-3.5 shadow-xl ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/40">
              <CheckCircleIcon className="h-5 w-5 text-emerald-500" />
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</p>
              <p className="text-xs text-slate-400">{message}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="ml-2 rounded-lg p-1 text-slate-300 hover:bg-slate-100 hover:text-slate-500 dark:hover:bg-slate-700"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 14 14">
                <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
