import NextAuth from 'next-auth/next'
import KeycloakProvider from 'next-auth/providers/keycloak'

function decodeJwt(token: string) {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(Buffer.from(base64, 'base64').toString('utf-8'))
  } catch {
    return {}
  }
}

const handler = NextAuth({
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER!,
      httpOptions: { timeout: 20000 },
      profile: (profile, token) => {
        const decoded = decodeJwt(token.access_token)
        return {
          id: decoded?.sub ?? profile.sub,
          nip: decoded?.['atrbpn-profile']?.pegawaiid ?? '',
          name: decoded?.name ?? profile.name ?? '',
          email: decoded?.email ?? `${profile.preferred_username}@atrbpn.go.id`,
          kantor_id: decoded?.['atrbpn-profile']?.kantorid ?? '',
          namakantor: decoded?.['atrbpn-profile']?.namakantor ?? '',
          roles: decoded?.resource_access?.['dotnet-web']?.roles ?? [],
          access_token: token.access_token,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.nip          = (user as any).nip
        token.kantor_id    = (user as any).kantor_id
        token.namakantor   = (user as any).namakantor
        token.roles        = (user as any).roles
        token.access_token = (user as any).access_token
      }
      return token
    },
    async session({ session, token }) {
      ;(session as any).nip               = token.nip
      ;(session.user as any).kantor_id    = token.kantor_id
      ;(session.user as any).namakantor   = token.namakantor
      ;(session.user as any).roles        = token.roles
      ;(session.user as any).access_token = token.access_token
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 60,
  },
  cookies: {
    sessionToken: {
      name: 'sdm-access-token',
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
      },
    },
  },
})

export { handler as GET, handler as POST }
