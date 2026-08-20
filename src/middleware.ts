import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const runtime = 'nodejs'

/**
 * Server-to-server handshake: fetch CSRF token lalu POST ke /api/auth/signin/keycloak.
 * Browser langsung redirect ke Keycloak tanpa mampir ke halaman /login.
 */
async function getKeycloakRedirect(origin: string, callbackUrl: string) {
  try {
    const csrfRes = await fetch(`${origin}/api/auth/csrf`)
    const csrfCookie = csrfRes.headers.getSetCookie().find(c => c.startsWith('next-auth.csrf-token='))
    const { csrfToken } = (await csrfRes.json()) as { csrfToken?: string }

    if (!csrfToken || !csrfCookie) return null

    const signInRes = await fetch(`${origin}/api/auth/signin/keycloak`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Auth-Return-Redirect': '1',
        Cookie: csrfCookie.split(';')[0],
      },
      body: new URLSearchParams({ csrfToken, callbackUrl, json: 'true' }),
    })

    const { url } = (await signInRes.json()) as { url?: string }
    if (!url) return null

    const cookies = [...signInRes.headers.getSetCookie(), csrfCookie]
    return { url, cookies }
  } catch {
    return null
  }
}

export async function middleware(_req: NextRequest) {
  // Auth dimatikan sementara — semua halaman bisa diakses tanpa login
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
