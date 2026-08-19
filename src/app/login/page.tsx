'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useRef } from 'react'

function AutoLogin() {
  const params = useSearchParams()
  const callbackUrl = params.get('callbackUrl') ?? '/dashboard'
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    // Fetch CSRF token dari NextAuth lalu langsung POST ke Keycloak signin
    fetch('/api/auth/csrf')
      .then(r => r.json())
      .then(({ csrfToken }) => {
        if (formRef.current) {
          ;(formRef.current.querySelector('[name=csrfToken]') as HTMLInputElement).value = csrfToken
          ;(formRef.current.querySelector('[name=callbackUrl]') as HTMLInputElement).value = callbackUrl
          formRef.current.submit()
        }
      })
  }, [callbackUrl])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <form
        ref={formRef}
        method="POST"
        action="/api/auth/signin/keycloak"
        style={{ display: 'none' }}
      >
        <input name="csrfToken" type="hidden" defaultValue="" />
        <input name="callbackUrl" type="hidden" defaultValue={callbackUrl} />
      </form>
      {/* Loading spinner agar tidak terlihat blank */}
      <div className="flex flex-col items-center gap-3">
        <svg className="h-8 w-8 animate-spin text-indigo-600" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
        <p className="text-sm text-slate-400">Mengarahkan ke halaman login...</p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <AutoLogin />
    </Suspense>
  )
}
