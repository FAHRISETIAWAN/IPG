import { AuthSessionProvider } from '@/components/auth/session-provider'
import { ThemeProvider } from '@/components/theme-provider'
import '@/styles/tailwind.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    template: '%s - Layanan Pegawai',
    default: 'Layanan Pegawai',
  },
  description: 'Sistem Manajemen Izin Pengembangan dan Tugas Belajar Aparatur Sipil Negara.',
  keywords: ['IPG', 'TUBEL', 'ASN', 'BKN', 'Izin Pengembangan', 'Tugas Belajar'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning className={inter.variable}>
      <body className="font-sans antialiased">
        <AuthSessionProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
            {children}
          </ThemeProvider>
        </AuthSessionProvider>
      </body>
    </html>
  )
}
