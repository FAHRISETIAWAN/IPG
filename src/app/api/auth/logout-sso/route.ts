import { NextResponse } from 'next/server'

export async function GET() {
  const redirect = encodeURIComponent(process.env.AUTH_LOGOUT_URL ?? process.env.NEXTAUTH_URL ?? '/')
  const logoutUrl = `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/logout?redirect_uri=${redirect}`

  const res = NextResponse.redirect(logoutUrl)
  res.cookies.set('sdm-access-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: new Date(0),
  })

  return res
}
