import type { Pegawai } from './pegawai-data'

export type StatusVerifikasi = 'menunggu' | 'disetujui' | 'ditolak'

export interface DokumenPWK {
  nama: string
  ukuran: string
}

export interface PWKRekomendasi {
  id: string
  pegawai: Pegawai
  kantahAsal: string
  kantahTujuan: string
  dokumen: DokumenPWK[]
  tanggal: string
  verifikasiKanwil: StatusVerifikasi
  verifikasiKanwilTujuan: StatusVerifikasi
  verifikasiBiroSDM: StatusVerifikasi
  selesai: boolean
  nomorSurat?: string
  nomorSK?: string
}

const DOK_LENGKAP = (prefix: string): DokumenPWK[] => [
  { nama: `${prefix} - Rekomendasi Pimpinan.pdf`,           ukuran: '210 KB' },
  { nama: `${prefix} - Analisis Rekomendasi Pimpinan.pdf`,  ukuran: '185 KB' },
  { nama: `${prefix} - Surat Bebas Hukdis.pdf`,             ukuran: '105 KB' },
  { nama: `${prefix} - Surat Bebas Tunggakan.pdf`,          ukuran: '98 KB'  },
  { nama: `${prefix} - Surat Permohonan Pribadi.pdf`,       ukuran: '76 KB'  },
  { nama: `${prefix} - Eviden Alasan Perpindahan.pdf`,      ukuran: '290 KB' },
]

export const daftarPWK: PWKRekomendasi[] = [
  {
    id: 'PWK-001',
    pegawai: { nip: '198703152011012002', nama: 'Siti Rahayu', jabatan: 'Pranata Komputer', unit: 'Pusdatin' },
    kantahAsal: 'Kantah Kota Bogor',
    kantahTujuan: 'Kantah Kota Depok',
    dokumen: DOK_LENGKAP('Siti Rahayu'),
    tanggal: '02 Sep 2026',
    verifikasiKanwil: 'disetujui',
    verifikasiKanwilTujuan: 'menunggu',
    verifikasiBiroSDM: 'menunggu',
    selesai: false,
  },
  {
    id: 'PWK-002',
    pegawai: { nip: '199002202012011003', nama: 'Budi Santoso', jabatan: 'Auditor', unit: 'Inspektorat' },
    kantahAsal: 'Kantah Kabupaten Bogor',
    kantahTujuan: 'Kantah Kota Bekasi',
    dokumen: DOK_LENGKAP('Budi Santoso'),
    tanggal: '03 Sep 2026',
    verifikasiKanwil: 'menunggu',
    verifikasiKanwilTujuan: 'menunggu',
    verifikasiBiroSDM: 'menunggu',
    selesai: false,
  },
  {
    id: 'PWK-003',
    pegawai: { nip: '198811102013012004', nama: 'Dewi Kusuma', jabatan: 'Arsiparis', unit: 'Biro Umum' },
    kantahAsal: 'Kantah Kota Bandung',
    kantahTujuan: 'Kantah Kota Semarang',
    dokumen: DOK_LENGKAP('Dewi Kusuma'),
    tanggal: '04 Sep 2026',
    verifikasiKanwil: 'menunggu',
    verifikasiKanwilTujuan: 'menunggu',
    verifikasiBiroSDM: 'menunggu',
    selesai: false,
  },
  {
    id: 'PWK-004',
    pegawai: { nip: '199205182014011005', nama: 'Eko Prasetyo', jabatan: 'Perencana', unit: 'Biro Perencanaan' },
    kantahAsal: 'Kantah Kabupaten Bekasi',
    kantahTujuan: 'Kantah Kota Surabaya',
    dokumen: DOK_LENGKAP('Eko Prasetyo'),
    tanggal: '04 Sep 2026',
    verifikasiKanwil: 'menunggu',
    verifikasiKanwilTujuan: 'menunggu',
    verifikasiBiroSDM: 'menunggu',
    selesai: false,
  },
  {
    id: 'PWK-005',
    pegawai: { nip: '198604252015012006', nama: 'Fitri Handayani', jabatan: 'Analis SDM', unit: 'Biro Kepegawaian' },
    kantahAsal: 'Kantah Kota Tangerang',
    kantahTujuan: 'Kantah Kota Denpasar',
    dokumen: DOK_LENGKAP('Fitri Handayani'),
    tanggal: '05 Sep 2026',
    verifikasiKanwil: 'menunggu',
    verifikasiKanwilTujuan: 'menunggu',
    verifikasiBiroSDM: 'menunggu',
    selesai: false,
  },
  {
    id: 'PWK-006',
    pegawai: { nip: '199108302016011007', nama: 'Galih Permana', jabatan: 'Pranata Humas', unit: 'Biro Humas' },
    kantahAsal: 'Kantah Kota Bandung',
    kantahTujuan: 'Kantah Kota Makassar',
    dokumen: DOK_LENGKAP('Galih Permana'),
    tanggal: '05 Sep 2026',
    verifikasiKanwil: 'menunggu',
    verifikasiKanwilTujuan: 'menunggu',
    verifikasiBiroSDM: 'menunggu',
    selesai: false,
  },
  {
    id: 'PWK-007',
    pegawai: { nip: '199307122017012008', nama: 'Hani Lestari', jabatan: 'Bendahara', unit: 'Biro Keuangan' },
    kantahAsal: 'Kantah Kabupaten Tangerang',
    kantahTujuan: 'Kantah Kota Balikpapan',
    dokumen: DOK_LENGKAP('Hani Lestari'),
    tanggal: '05 Sep 2026',
    verifikasiKanwil: 'menunggu',
    verifikasiKanwilTujuan: 'menunggu',
    verifikasiBiroSDM: 'menunggu',
    selesai: false,
  },
]
