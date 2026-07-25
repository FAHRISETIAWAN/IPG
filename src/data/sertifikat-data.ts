export interface SertifikatUjiKom {
  id: string
  nip: string
  nama: string
  jabatan: string
  unit: string
  kode: string
  subLayanan: 'Perpindahan Jabatan' | 'Kenaikan Jenjang'
  tanggalPengajuan: string
  nomorND?: string
  tanggalND?: string
  perihal?: string
  fileSertifikat?: string
  status: 'belum' | 'sudah'
}

export const daftarSertifikatUjiKom: SertifikatUjiKom[] = [
  {
    id: '1',
    nip: '199410082019012010',
    nama: 'Juwita Sari',
    jabatan: 'Kasubbag Umum',
    unit: 'Sekretariat',
    kode: 'UJIKOM-20260615-007',
    subLayanan: 'Perpindahan Jabatan',
    tanggalPengajuan: '15 Juni 2026',
    status: 'belum',
  },
  {
    id: '2',
    nip: '199001152017011011',
    nama: 'Krisna Wijaya',
    jabatan: 'Pranata Komputer Terampil',
    unit: 'Pusdatin',
    kode: 'UJIKOM-20260615-007',
    subLayanan: 'Perpindahan Jabatan',
    tanggalPengajuan: '15 Juni 2026',
    status: 'belum',
  },
  {
    id: '3',
    nip: '199206202018012012',
    nama: 'Laila Nurjanah',
    jabatan: 'Analis Kebijakan Ahli Pertama',
    unit: 'Biro Perencanaan',
    kode: 'UJIKOM-20260618-008',
    subLayanan: 'Kenaikan Jenjang',
    tanggalPengajuan: '18 Juni 2026',
    nomorND: 'ND/BKN/2026/0042',
    tanggalND: '22 Juni 2026',
    perihal: 'Penerbitan Sertifikat Uji Kompetensi JF Analis Kebijakan',
    fileSertifikat: 'sertifikat_laila.pdf',
    status: 'sudah',
  },
]
