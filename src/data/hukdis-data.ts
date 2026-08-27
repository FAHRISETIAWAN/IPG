export type TingkatHukdis = 'Ringan' | 'Sedang' | 'Berat'
export type StatusHukdis  = 'Aktif' | 'Selesai'

export interface HukdisItem {
  id: string
  nip: string
  nama: string
  jabatan: string
  unit: string
  jenisPelanggaran: string
  tingkat: TingkatHukdis
  nomorSK: string
  tanggalSK: string
  masaBerlaku: string
  status: StatusHukdis
}

export const daftarHukdis: HukdisItem[] = [
  {
    id: '1',
    nip: '198501012010011001',
    nama: 'Ahmad Fauzi',
    jabatan: 'Analis Kebijakan',
    unit: 'Biro Perencanaan',
    jenisPelanggaran: 'Tidak masuk kerja tanpa keterangan',
    tingkat: 'Ringan',
    nomorSK: 'SK/HUKDIS/001/BKN/2026',
    tanggalSK: '10 Jan 2026',
    masaBerlaku: '3 bulan',
    status: 'Selesai',
  },
  {
    id: '2',
    nip: '199002202012011003',
    nama: 'Budi Santoso',
    jabatan: 'Auditor',
    unit: 'Inspektorat',
    jenisPelanggaran: 'Penyalahgunaan wewenang',
    tingkat: 'Sedang',
    nomorSK: 'SK/HUKDIS/002/BKN/2026',
    tanggalSK: '15 Feb 2026',
    masaBerlaku: '6 bulan',
    status: 'Aktif',
  },
  {
    id: '3',
    nip: '198811102013012004',
    nama: 'Dewi Kusuma',
    jabatan: 'Arsiparis',
    unit: 'Biro Umum',
    jenisPelanggaran: 'Pelanggaran kode etik',
    tingkat: 'Ringan',
    nomorSK: 'SK/HUKDIS/003/BKN/2026',
    tanggalSK: '02 Mar 2026',
    masaBerlaku: '3 bulan',
    status: 'Aktif',
  },
  {
    id: '4',
    nip: '199205182014011005',
    nama: 'Eko Prasetyo',
    jabatan: 'Perencana',
    unit: 'Biro Perencanaan',
    jenisPelanggaran: 'Gratifikasi',
    tingkat: 'Berat',
    nomorSK: 'SK/HUKDIS/004/BKN/2026',
    tanggalSK: '20 Mar 2026',
    masaBerlaku: '12 bulan',
    status: 'Aktif',
  },
  {
    id: '5',
    nip: '198604252015012006',
    nama: 'Fitri Handayani',
    jabatan: 'Analis SDM',
    unit: 'Biro Kepegawaian',
    jenisPelanggaran: 'Tidak masuk kerja lebih dari 10 hari',
    tingkat: 'Sedang',
    nomorSK: 'SK/HUKDIS/005/BKN/2026',
    tanggalSK: '05 Apr 2026',
    masaBerlaku: '6 bulan',
    status: 'Aktif',
  },
]
