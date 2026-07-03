import type { JenisLayanan, StatusPengajuan } from './verifikasi-data'

export interface LaporanItem {
  id: string
  kode: string
  tanggal: string
  bulan: number
  tahun: number
  layanan: JenisLayanan
  nomorSurat: string
  status: StatusPengajuan
  pegawai: { nama: string; nip: string; jabatan: string; unit: string }[]
}

export const dataLaporan: LaporanItem[] = [
  { id: '1',  kode: 'IPG-20260101-001',  tanggal: '05 Jan 2026', bulan: 1,  tahun: 2026, layanan: 'IPG Profesi',     nomorSurat: 'B/0101/KP.02.03/2026', status: 'diverifikasi', pegawai: [{ nama: 'Ahmad Fauzi',    nip: '198501012010011001', jabatan: 'Analis Kebijakan', unit: 'Biro Perencanaan' }] },
  { id: '2',  kode: 'TUBEL-20260108-002',tanggal: '08 Jan 2026', bulan: 1,  tahun: 2026, layanan: 'TUBEL Beasiswa',  nomorSurat: 'B/0102/KP.02.04/2026', status: 'ditolak',      pegawai: [{ nama: 'Siti Rahayu',    nip: '198703152011012002', jabatan: 'Pranata Komputer', unit: 'Pusdatin' }] },
  { id: '3',  kode: 'IPG-20260115-003',  tanggal: '15 Jan 2026', bulan: 1,  tahun: 2026, layanan: 'IPG Akademik',    nomorSurat: 'B/0103/KP.02.03/2026', status: 'diverifikasi', pegawai: [{ nama: 'Budi Santoso',    nip: '199002202012011003', jabatan: 'Auditor',           unit: 'Inspektorat' }, { nama: 'Dewi Kusuma', nip: '198811102013012004', jabatan: 'Arsiparis', unit: 'Biro Umum' }] },
  { id: '4',  kode: 'TUBEL-20260202-004',tanggal: '02 Feb 2026', bulan: 2,  tahun: 2026, layanan: 'TUBEL Mandiri',   nomorSurat: 'B/0201/KP.02.04/2026', status: 'diverifikasi', pegawai: [{ nama: 'Eko Prasetyo',    nip: '199205182014011005', jabatan: 'Perencana',         unit: 'Biro Perencanaan' }] },
  { id: '5',  kode: 'IPG-20260210-005',  tanggal: '10 Feb 2026', bulan: 2,  tahun: 2026, layanan: 'IPG Sertifikasi', nomorSurat: 'B/0202/KP.02.03/2026', status: 'ditolak',      pegawai: [{ nama: 'Fitri Handayani', nip: '198604252015012006', jabatan: 'Analis SDM',        unit: 'Biro Kepegawaian' }] },
  { id: '6',  kode: 'IPG-20260218-006',  tanggal: '18 Feb 2026', bulan: 2,  tahun: 2026, layanan: 'IPG Profesi',     nomorSurat: 'B/0203/KP.02.03/2026', status: 'diverifikasi', pegawai: [{ nama: 'Galih Permana',   nip: '199108302016011007', jabatan: 'Pranata Humas',     unit: 'Biro Humas' }] },
  { id: '7',  kode: 'TUBEL-20260305-007',tanggal: '05 Mar 2026', bulan: 3,  tahun: 2026, layanan: 'TUBEL Beasiswa',  nomorSurat: 'B/0301/KP.02.04/2026', status: 'diverifikasi', pegawai: [{ nama: 'Hani Lestari',    nip: '199307122017012008', jabatan: 'Bendahara',         unit: 'Biro Keuangan' }] },
  { id: '8',  kode: 'IPG-20260312-008',  tanggal: '12 Mar 2026', bulan: 3,  tahun: 2026, layanan: 'IPG Akademik',    nomorSurat: 'B/0302/KP.02.03/2026', status: 'ditolak',      pegawai: [{ nama: 'Irfan Maulana',   nip: '198912052018011009', jabatan: 'Auditor Kepegawaian',unit: 'Inspektorat' }] },
  { id: '9',  kode: 'IPG-20260320-009',  tanggal: '20 Mar 2026', bulan: 3,  tahun: 2026, layanan: 'IPG Profesi',     nomorSurat: 'B/0303/KP.02.03/2026', status: 'diverifikasi', pegawai: [{ nama: 'Juwita Sari',     nip: '199410082019012010', jabatan: 'Analis Hukum',      unit: 'Biro Hukum' }, { nama: 'Ahmad Fauzi', nip: '198501012010011001', jabatan: 'Analis Kebijakan', unit: 'Biro Perencanaan' }] },
  { id: '10', kode: 'TUBEL-20260404-010',tanggal: '04 Apr 2026', bulan: 4,  tahun: 2026, layanan: 'TUBEL Mandiri',   nomorSurat: 'B/0401/KP.02.04/2026', status: 'diverifikasi', pegawai: [{ nama: 'Budi Santoso',    nip: '199002202012011003', jabatan: 'Auditor',           unit: 'Inspektorat' }] },
  { id: '11', kode: 'IPG-20260415-011',  tanggal: '15 Apr 2026', bulan: 4,  tahun: 2026, layanan: 'IPG Sertifikasi', nomorSurat: 'B/0402/KP.02.03/2026', status: 'ditolak',      pegawai: [{ nama: 'Dewi Kusuma',    nip: '198811102013012004', jabatan: 'Arsiparis',         unit: 'Biro Umum' }] },
  { id: '12', kode: 'IPG-20260422-012',  tanggal: '22 Apr 2026', bulan: 4,  tahun: 2026, layanan: 'IPG Profesi',     nomorSurat: 'B/0403/KP.02.03/2026', status: 'diverifikasi', pegawai: [{ nama: 'Eko Prasetyo',    nip: '199205182014011005', jabatan: 'Perencana',         unit: 'Biro Perencanaan' }] },
  { id: '13', kode: 'TUBEL-20260510-013',tanggal: '10 Mei 2026', bulan: 5,  tahun: 2026, layanan: 'TUBEL Beasiswa',  nomorSurat: 'B/0501/KP.02.04/2026', status: 'diverifikasi', pegawai: [{ nama: 'Fitri Handayani', nip: '198604252015012006', jabatan: 'Analis SDM',        unit: 'Biro Kepegawaian' }] },
  { id: '14', kode: 'IPG-20260518-014',  tanggal: '18 Mei 2026', bulan: 5,  tahun: 2026, layanan: 'IPG Akademik',    nomorSurat: 'B/0502/KP.02.03/2026', status: 'ditolak',      pegawai: [{ nama: 'Galih Permana',   nip: '199108302016011007', jabatan: 'Pranata Humas',     unit: 'Biro Humas' }, { nama: 'Hani Lestari', nip: '199307122017012008', jabatan: 'Bendahara', unit: 'Biro Keuangan' }] },
  { id: '15', kode: 'IPG-20260525-015',  tanggal: '25 Mei 2026', bulan: 5,  tahun: 2026, layanan: 'IPG Profesi',     nomorSurat: 'B/0503/KP.02.03/2026', status: 'diverifikasi', pegawai: [{ nama: 'Irfan Maulana',   nip: '198912052018011009', jabatan: 'Auditor Kepegawaian',unit: 'Inspektorat' }] },
  { id: '16', kode: 'TUBEL-20260601-016',tanggal: '01 Jun 2026', bulan: 6,  tahun: 2026, layanan: 'TUBEL Mandiri',   nomorSurat: 'B/0601/KP.02.04/2026', status: 'diverifikasi', pegawai: [{ nama: 'Juwita Sari',     nip: '199410082019012010', jabatan: 'Analis Hukum',      unit: 'Biro Hukum' }] },
  { id: '17', kode: 'IPG-20260605-017',  tanggal: '05 Jun 2026', bulan: 6,  tahun: 2026, layanan: 'IPG Sertifikasi', nomorSurat: 'B/0602/KP.02.03/2026', status: 'ditolak',      pegawai: [{ nama: 'Ahmad Fauzi',    nip: '198501012010011001', jabatan: 'Analis Kebijakan', unit: 'Biro Perencanaan' }] },
  { id: '18', kode: 'IPG-20260612-018',  tanggal: '12 Jun 2026', bulan: 6,  tahun: 2026, layanan: 'IPG Profesi',     nomorSurat: 'B/0603/KP.02.03/2026', status: 'diverifikasi', pegawai: [{ nama: 'Siti Rahayu',    nip: '198703152011012002', jabatan: 'Pranata Komputer', unit: 'Pusdatin' }, { nama: 'Budi Santoso', nip: '199002202012011003', jabatan: 'Auditor', unit: 'Inspektorat' }] },
]

export const namaBulan = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
]
