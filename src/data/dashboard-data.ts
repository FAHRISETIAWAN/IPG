export const staffInfo = {
  name: 'Admin IPG',
  unit: 'Biro Kepegawaian',
  shift: '08:00 - 16:00 WIB',
}

export const statsData = {
  pengajuanHariIni: {
    total: 8,
    target: 15,
    percentage: 53,
  },
  totalIPG: {
    total: 142,
    target: 200,
    bulan: 'Juni',
    percentage: 71,
  },
  totalTUBEL: {
    total: 58,
    target: 80,
    bulan: 'Juni',
    percentage: 73,
  },
  totalPWK: {
    total: 24,
    target: 40,
    bulan: 'Juni',
    percentage: 60,
  },
  totalUJIKOM: {
    total: 17,
    target: 30,
    bulan: 'Juni',
    percentage: 57,
  },
}

export const chartData = [
  { date: '01-06-2026', pengajuan: 5 },
  { date: '02-06-2026', pengajuan: 8 },
  { date: '03-06-2026', pengajuan: 6 },
  { date: '04-06-2026', pengajuan: 11 },
  { date: '05-06-2026', pengajuan: 9 },
  { date: '06-06-2026', pengajuan: 4 },
  { date: '07-06-2026', pengajuan: 7 },
  { date: '08-06-2026', pengajuan: 13 },
  { date: '09-06-2026', pengajuan: 10 },
  { date: '10-06-2026', pengajuan: 15 },
  { date: '11-06-2026', pengajuan: 12 },
  { date: '12-06-2026', pengajuan: 8 },
  { date: '13-06-2026', pengajuan: 14 },
  { date: '14-06-2026', pengajuan: 17 },
  { date: '15-06-2026', pengajuan: 11 },
  { date: '16-06-2026', pengajuan: 9 },
  { date: '17-06-2026', pengajuan: 13 },
  { date: '18-06-2026', pengajuan: 16 },
  { date: '19-06-2026', pengajuan: 12 },
  { date: '20-06-2026', pengajuan: 10 },
  { date: '21-06-2026', pengajuan: 7 },
  { date: '22-06-2026', pengajuan: 9 },
  { date: '23-06-2026', pengajuan: 14 },
  { date: '24-06-2026', pengajuan: 11 },
  { date: '25-06-2026', pengajuan: 8 },
  { date: '26-06-2026', pengajuan: 6 },
  { date: '27-06-2026', pengajuan: 10 },
  { date: '28-06-2026', pengajuan: 13 },
  { date: '29-06-2026', pengajuan: 15 },
  { date: '30-06-2026', pengajuan: 8 },
]

export const layananPhases = [
  { phase: 'IPG Profesi',                   count: 54, color: '#6366f1' },
  { phase: 'IPG Sertifikasi',               count: 22, color: '#a78bfa' },
  { phase: 'IPG Akademik',                  count: 31, color: '#818cf8' },
  { phase: 'Tugas Belajar Mandiri',         count: 35, color: '#10b981' },
  { phase: 'Tugas Belajar Beasiswa',        count: 23, color: '#34d399' },
  { phase: 'Pindah Wilayah Kerja',          count: 24, color: '#f97316' },
  { phase: 'UjiKom Perpindahan Jabatan',    count: 11, color: '#f43f5e' },
  { phase: 'UjiKom Kenaikan Jenjang',       count:  6, color: '#fb7185' },
]

export const totalPengajuanAktif = 206

export type JenisPengajuan = 'ipg' | 'tubel' | 'rapat'

export interface PengajuanItem {
  id: string
  nama: string
  nip: string
  waktu: string
  waktuSelesai: string
  jenis: JenisPengajuan
  layanan: string
  color: string
}

export const pengajuanHariIni: PengajuanItem[] = [
  { id: '1', nama: 'Ahmad Fauzi', nip: '19850101...', waktu: '08:00', waktuSelesai: '08:30', jenis: 'ipg', layanan: 'IPG Profesi', color: '#6366f1' },
  { id: '2', nama: 'Siti Rahayu', nip: '19870315...', waktu: '08:30', waktuSelesai: '09:00', jenis: 'tubel', layanan: 'TUBEL Beasiswa', color: '#10b981' },
  { id: '3', nama: 'Budi Santoso', nip: '19900220...', waktu: '09:00', waktuSelesai: '09:30', jenis: 'ipg', layanan: 'IPG Sertifikasi', color: '#6366f1' },
  { id: '4', nama: 'Rapat Tim Kepegawaian', nip: '', waktu: '10:00', waktuSelesai: '11:00', jenis: 'rapat', layanan: 'Internal', color: '#f59e0b' },
  { id: '5', nama: 'Dewi Kusuma', nip: '19881110...', waktu: '11:00', waktuSelesai: '11:30', jenis: 'tubel', layanan: 'TUBEL Mandiri', color: '#10b981' },
  { id: '6', nama: 'Eko Prasetyo', nip: '19920518...', waktu: '13:00', waktuSelesai: '13:30', jenis: 'ipg', layanan: 'IPG Akademik', color: '#818cf8' },
  { id: '7', nama: 'Fitri Handayani', nip: '19860425...', waktu: '13:30', waktuSelesai: '14:00', jenis: 'ipg', layanan: 'IPG Profesi', color: '#6366f1' },
  { id: '8', nama: 'Galih Permana', nip: '19910830...', waktu: '14:00', waktuSelesai: '14:30', jenis: 'tubel', layanan: 'TUBEL Beasiswa', color: '#10b981' },
]

export const calendarDates = [
  { day: 16, dow: 'Sen', isToday: false },
  { day: 17, dow: 'Sel', isToday: false },
  { day: 18, dow: 'Rab', isToday: false },
  { day: 19, dow: 'Kam', isToday: false },
  { day: 20, dow: 'Jum', isToday: false },
  { day: 21, dow: 'Sab', isToday: false },
  { day: 22, dow: 'Min', isToday: false },
]
