export type StatusPengajuan = 'menunggu' | 'diproses' | 'diverifikasi' | 'ditolak'
export type JenisLayanan =
  | 'IPG Profesi' | 'IPG Sertifikasi' | 'IPG Akademik'
  | 'Tugas Belajar Mandiri' | 'Tugas Belajar Beasiswa'
  | 'Pindah Wilayah Kerja'
  | 'Uji Kompetensi JF - Perpindahan Jabatan'
  | 'Uji Kompetensi JF - Kenaikan Jenjang'

export interface DokumenItem {
  nama: string
  file: string
  ukuran: string
}

export interface DataProfesiPegawai {
  klasifikasiProfesi: string
  namaProfesi: string
  nomorSertifikat: string
  tanggalTerbit: string
  gelarDepan?: string
  gelarBelakang?: string
  lembagaPenyelenggara: string
  jenisProfesi: string
}

export interface DataPendidikanPegawai {
  nama: string
  nip: string
  golongan: string
  jabatan: string
  unitKerja: string
  sponsor: string
  jurusan: string
  programStudi: string
  namaUniversitas: string
  namaJabatan?: string
}

export interface DataUjiKomPerpindahan {
  jenisPerpindahan: string
  dari: string
  ke: string
}

export interface DataUjiKomKenaikan {
  dari: string
  ke: string
}

export interface PegawaiPengajuan {
  nama: string
  nip: string
  jabatan: string
  unit: string
  formData?: DataProfesiPegawai | DataPendidikanPegawai | DataUjiKomPerpindahan | DataUjiKomKenaikan
  dokumen: DokumenItem[]
}

export interface PengajuanVerifikasi {
  id: string
  kode: string
  tanggal: string
  layanan: JenisLayanan
  nomorSurat: string
  status: StatusPengajuan
  pegawai: PegawaiPengajuan[]
}

export const alasanPenolakan = [
  'Dokumen tidak lengkap',
  'Format dokumen tidak sesuai',
  'NIP pegawai tidak valid',
  'Nomor surat tidak terdaftar',
  'Pegawai tidak memenuhi syarat',
  'Masa kerja belum mencukupi',
  'Kuota sudah terpenuhi',
  'Lainnya',
]

export const daftarPengajuan: PengajuanVerifikasi[] = [
  // ── IPG Profesi ──────────────────────────────────────────────────────────
  {
    id: '1',
    kode: 'IPG-20260601-001',
    tanggal: '01 Juni 2026',
    layanan: 'IPG Profesi',
    nomorSurat: 'B/1001/KP.02.03/2026',
    status: 'menunggu',
    pegawai: [
      {
        nama: 'Ahmad Fauzi', nip: '198501012010011001', jabatan: 'Analis Kebijakan', unit: 'Biro Perencanaan',
        formData: {
          klasifikasiProfesi: 'KEUANGAN DAN PAJAK', namaProfesi: 'AKUNTAN', nomorSertifikat: '145/H5.2.1.5/LLS/2026',
          tanggalTerbit: '15 Januari 2026', lembagaPenyelenggara: 'UNIVERSITAS INDONESIA', jenisProfesi: 'Profesi Akuntan',
        } as DataProfesiPegawai,
        dokumen: [
          { nama: 'SKP 2 Tahun Terakhir', file: 'skp_ahmad.pdf', ukuran: '0.8 MB' },
          { nama: 'SK Pangkat dan SK Jabatan Terakhir', file: 'pangkat_ahmad.pdf', ukuran: '0.5 MB' },
          { nama: 'SK PNS dan SK CPNS', file: 'sk_pns_ahmad.pdf', ukuran: '0.6 MB' },
          { nama: 'Ijazah Terakhir', file: 'ijazah_ahmad.pdf', ukuran: '0.9 MB' },
        ],
      },
      {
        nama: 'Siti Rahayu', nip: '198703152011012002', jabatan: 'Pranata Komputer', unit: 'Pusdatin',
        formData: {
          klasifikasiProfesi: 'INFORMATIKA DAN TEKNOLOGI', namaProfesi: 'PRANATA KOMPUTER', nomorSertifikat: '203/IT/KOMINFO/2026',
          tanggalTerbit: '10 Februari 2026', lembagaPenyelenggara: 'BADAN SIBER DAN SANDI NEGARA', jenisProfesi: 'Profesi IT',
        } as DataProfesiPegawai,
        dokumen: [
          { nama: 'SKP 2 Tahun Terakhir', file: 'skp_siti.pdf', ukuran: '0.7 MB' },
          { nama: 'SK Pangkat dan SK Jabatan Terakhir', file: 'pangkat_siti.pdf', ukuran: '0.4 MB' },
          { nama: 'SK PNS dan SK CPNS', file: 'sk_pns_siti.pdf', ukuran: '0.5 MB' },
          { nama: 'Ijazah Terakhir', file: 'ijazah_siti.pdf', ukuran: '0.8 MB' },
        ],
      },
    ],
  },

  // ── Tugas Belajar Beasiswa ───────────────────────────────────────────────
  {
    id: '2',
    kode: 'TUBEL-20260603-002',
    tanggal: '03 Juni 2026',
    layanan: 'Tugas Belajar Beasiswa',
    nomorSurat: 'B/1002/KP.02.04/2026',
    status: 'menunggu',
    pegawai: [
      {
        nama: 'Budi Santoso', nip: '199002202012011003', jabatan: 'Auditor', unit: 'Inspektorat',
        formData: {
          nama: 'BUDI SANTOSO', nip: '199002202012011003', golongan: 'III/B', jabatan: 'AUDITOR',
          unitKerja: 'INSPEKTORAT', sponsor: 'PEMERINTAH', jurusan: 'ILMU AKUNTANSI',
          programStudi: 'S-2', namaUniversitas: 'UNIVERSITAS GADJAH MADA',
        } as DataPendidikanPegawai,
        dokumen: [
          { nama: 'Surat Permohonan Pribadi', file: 'permohonan_budi.pdf', ukuran: '0.3 MB' },
          { nama: 'SK PNS dan SK CPNS', file: 'sk_pns_budi.pdf', ukuran: '0.6 MB' },
          { nama: 'SK Pangkat dan SK Jabatan Terakhir', file: 'pangkat_budi.pdf', ukuran: '0.4 MB' },
          { nama: 'SKP 2 Tahun Terakhir', file: 'skp_budi.pdf', ukuran: '0.6 MB' },
          { nama: 'Surat Bebas Hukdis', file: 'hukdis_budi.pdf', ukuran: '0.2 MB' },
          { nama: 'LOA (Letter of Acceptance)', file: 'loa_budi.pdf', ukuran: '1.0 MB' },
        ],
      },
    ],
  },

  // ── IPG Akademik ─────────────────────────────────────────────────────────
  {
    id: '3',
    kode: 'IPG-20260605-003',
    tanggal: '05 Juni 2026',
    layanan: 'IPG Akademik',
    nomorSurat: 'B/1003/KP.02.03/2026',
    status: 'diproses',
    pegawai: [
      {
        nama: 'Dewi Kusuma', nip: '198811102013012004', jabatan: 'Arsiparis', unit: 'Biro Umum',
        formData: {
          nama: 'DEWI KUSUMA', nip: '198811102013012004', golongan: 'III/C', jabatan: 'ARSIPARIS',
          unitKerja: 'BIRO UMUM', sponsor: 'PEMERINTAH', jurusan: 'MANAJEMEN KEARSIPAN',
          programStudi: 'S-2', namaUniversitas: 'UNIVERSITAS INDONESIA',
        } as DataPendidikanPegawai,
        dokumen: [
          { nama: 'SKP 2 Tahun Terakhir', file: 'skp_dewi.pdf', ukuran: '0.7 MB' },
          { nama: 'SK Pangkat dan SK Jabatan Terakhir', file: 'pangkat_dewi.pdf', ukuran: '0.5 MB' },
          { nama: 'SK PNS dan SK CPNS', file: 'sk_pns_dewi.pdf', ukuran: '0.4 MB' },
          { nama: 'Ijazah Terakhir', file: 'ijazah_dewi.pdf', ukuran: '0.8 MB' },
          { nama: 'Proposal Studi', file: 'proposal_dewi.pdf', ukuran: '1.0 MB' },
        ],
      },
    ],
  },

  // ── Tugas Belajar Mandiri ────────────────────────────────────────────────
  {
    id: '4',
    kode: 'TUBEL-20260608-004',
    tanggal: '08 Juni 2026',
    layanan: 'Tugas Belajar Mandiri',
    nomorSurat: 'B/1004/KP.02.04/2026',
    status: 'diverifikasi',
    pegawai: [
      {
        nama: 'Galih Permana', nip: '199108302016011007', jabatan: 'Pranata Humas', unit: 'Biro Humas',
        formData: {
          nama: 'GALIH PERMANA', nip: '199108302016011007', golongan: 'III/A', jabatan: 'PRANATA HUMAS',
          unitKerja: 'BIRO HUMAS', sponsor: 'MANDIRI', jurusan: 'ILMU KOMUNIKASI',
          programStudi: 'S-2', namaUniversitas: 'UNIVERSITAS DIPONEGORO',
        } as DataPendidikanPegawai,
        dokumen: [
          { nama: 'Surat Permohonan Pribadi', file: 'permohonan_galih.pdf', ukuran: '0.3 MB' },
          { nama: 'SK PNS dan SK CPNS', file: 'sk_pns_galih.pdf', ukuran: '0.5 MB' },
          { nama: 'SK Pangkat dan SK Jabatan Terakhir', file: 'pangkat_galih.pdf', ukuran: '0.4 MB' },
          { nama: 'SKP 2 Tahun Terakhir', file: 'skp_galih.pdf', ukuran: '0.5 MB' },
          { nama: 'Surat Bebas Hukdis', file: 'hukdis_galih.pdf', ukuran: '0.2 MB' },
        ],
      },
    ],
  },

  // ── IPG Sertifikasi ──────────────────────────────────────────────────────
  {
    id: '5',
    kode: 'IPG-20260610-005',
    tanggal: '10 Juni 2026',
    layanan: 'IPG Sertifikasi',
    nomorSurat: 'B/1005/KP.02.03/2026',
    status: 'ditolak',
    pegawai: [
      {
        nama: 'Hani Lestari', nip: '199307122017012008', jabatan: 'Bendahara', unit: 'Biro Keuangan',
        formData: {
          klasifikasiProfesi: 'KEUANGAN DAN PAJAK', namaProfesi: 'BENDAHARA MAHIR', nomorSertifikat: '301/BDH/KEMEN/2025',
          tanggalTerbit: '20 Maret 2025', lembagaPenyelenggara: 'KEMENTERIAN KEUANGAN', jenisProfesi: 'Profesi Keuangan',
        } as DataProfesiPegawai,
        dokumen: [
          { nama: 'SKP 2 Tahun Terakhir', file: 'skp_hani.pdf', ukuran: '0.6 MB' },
          { nama: 'SK Pangkat dan SK Jabatan Terakhir', file: 'pangkat_hani.pdf', ukuran: '0.5 MB' },
          { nama: 'SK PNS dan SK CPNS', file: 'sk_pns_hani.pdf', ukuran: '0.4 MB' },
          { nama: 'Ijazah', file: 'sertif_hani.pdf', ukuran: '0.7 MB' },
        ],
      },
    ],
  },

  // ── Pindah Wilayah Kerja ─────────────────────────────────────────────────
  {
    id: '6',
    kode: 'PWK-20260612-006',
    tanggal: '12 Juni 2026',
    layanan: 'Pindah Wilayah Kerja',
    nomorSurat: 'B/1006/KP.02.05/2026',
    status: 'menunggu',
    pegawai: [
      {
        nama: 'Irfan Maulana', nip: '198912052018011009', jabatan: 'Analis Kebijakan', unit: 'Kanwil Jawa Barat',
        dokumen: [
          { nama: 'Rekomendasi Pimpinan', file: 'rekomendasi_irfan.pdf', ukuran: '0.4 MB' },
          { nama: 'Analisis Rekomendasi Pimpinan', file: 'analisis_irfan.pdf', ukuran: '0.5 MB' },
          { nama: 'Surat Bebas Hukdis', file: 'hukdis_irfan.pdf', ukuran: '0.3 MB' },
          { nama: 'Surat Bebas Tunggakan Pekerjaan', file: 'tunggakan_irfan.pdf', ukuran: '0.2 MB' },
          { nama: 'Surat Permohonan Pribadi', file: 'permohonan_irfan.pdf', ukuran: '0.3 MB' },
          { nama: 'Surat Eviden Alasan Perpindahan', file: 'eviden_irfan.pdf', ukuran: '0.6 MB' },
        ],
      },
    ],
  },

  // ── Uji Kompetensi JF - Perpindahan Jabatan ──────────────────────────────
  {
    id: '7',
    kode: 'UJIKOM-20260615-007',
    tanggal: '15 Juni 2026',
    layanan: 'Uji Kompetensi JF - Perpindahan Jabatan',
    nomorSurat: 'B/1007/KP.02.06/2026',
    status: 'menunggu',
    pegawai: [
      {
        nama: 'Juwita Sari', nip: '199410082019012010', jabatan: 'Kasubbag Umum', unit: 'Sekretariat',
        formData: {
          jenisPerpindahan: 'Struktural ke Jabatan Fungsional',
          dari: 'Kasubbag Umum (Eselon IV)',
          ke: 'Analis Kebijakan Ahli Pertama',
        } as DataUjiKomPerpindahan,
        dokumen: [
          { nama: 'SKP', file: 'skp_juwita.pdf', ukuran: '0.6 MB' },
          { nama: 'SK Jabatan Terakhir', file: 'sk_jabatan_juwita.pdf', ukuran: '0.4 MB' },
          { nama: 'Pangkat Terakhir', file: 'pangkat_juwita.pdf', ukuran: '0.3 MB' },
          { nama: 'SK PNS', file: 'pns_juwita.pdf', ukuran: '0.5 MB' },
          { nama: 'SK CPNS', file: 'cpns_juwita.pdf', ukuran: '0.4 MB' },
          { nama: 'PAK', file: 'pak_juwita.pdf', ukuran: '0.7 MB' },
          { nama: 'Pernyataan Bebas Hukdis', file: 'hukdis_juwita.pdf', ukuran: '0.2 MB' },
          { nama: 'Rekomendasi Pimpinan', file: 'rekomendasi_juwita.pdf', ukuran: '0.3 MB' },
          { nama: 'Rekomendasi Penempatan', file: 'penempatan_juwita.pdf', ukuran: '0.4 MB' },
          { nama: 'Surat Pernyataan Lepas Jabatan', file: 'lepas_jabatan_juwita.pdf', ukuran: '0.3 MB' },
        ],
      },
      {
        nama: 'Krisna Wijaya', nip: '199001152017011011', jabatan: 'Pranata Komputer Terampil', unit: 'Pusdatin',
        formData: {
          jenisPerpindahan: 'Jabatan Fungsional (A) ke Jabatan Fungsional (B)',
          dari: 'Pranata Komputer Terampil',
          ke: 'Analis Data Ahli Pertama',
        } as DataUjiKomPerpindahan,
        dokumen: [
          { nama: 'SKP', file: 'skp_krisna.pdf', ukuran: '0.5 MB' },
          { nama: 'SK Jabatan Terakhir', file: 'sk_jabatan_krisna.pdf', ukuran: '0.4 MB' },
          { nama: 'Pangkat Terakhir', file: 'pangkat_krisna.pdf', ukuran: '0.3 MB' },
          { nama: 'SK PNS', file: 'pns_krisna.pdf', ukuran: '0.5 MB' },
          { nama: 'SK CPNS', file: 'cpns_krisna.pdf', ukuran: '0.4 MB' },
          { nama: 'PAK', file: 'pak_krisna.pdf', ukuran: '0.6 MB' },
          { nama: 'Pernyataan Bebas Hukdis', file: 'hukdis_krisna.pdf', ukuran: '0.2 MB' },
          { nama: 'Rekomendasi Pimpinan', file: 'rekomendasi_krisna.pdf', ukuran: '0.3 MB' },
          { nama: 'Rekomendasi Penempatan', file: 'penempatan_krisna.pdf', ukuran: '0.4 MB' },
        ],
      },
    ],
  },

  // ── Uji Kompetensi JF - Kenaikan Jenjang ────────────────────────────────
  {
    id: '8',
    kode: 'UJIKOM-20260618-008',
    tanggal: '18 Juni 2026',
    layanan: 'Uji Kompetensi JF - Kenaikan Jenjang',
    nomorSurat: 'B/1008/KP.02.06/2026',
    status: 'menunggu',
    pegawai: [
      {
        nama: 'Laila Nurjanah', nip: '199206202018012012', jabatan: 'Analis Kebijakan Ahli Pertama', unit: 'Biro Perencanaan',
        formData: {
          dari: 'Ahli Pertama',
          ke: 'Ahli Muda',
        } as DataUjiKomKenaikan,
        dokumen: [
          { nama: 'SKP', file: 'skp_laila.pdf', ukuran: '0.6 MB' },
          { nama: 'SK Jabatan Terakhir', file: 'sk_jabatan_laila.pdf', ukuran: '0.4 MB' },
          { nama: 'Pangkat Terakhir', file: 'pangkat_laila.pdf', ukuran: '0.3 MB' },
          { nama: 'SK PNS', file: 'pns_laila.pdf', ukuran: '0.5 MB' },
          { nama: 'SK CPNS', file: 'cpns_laila.pdf', ukuran: '0.4 MB' },
          { nama: 'PAK', file: 'pak_laila.pdf', ukuran: '0.8 MB' },
          { nama: 'Pernyataan Bebas Hukdis', file: 'hukdis_laila.pdf', ukuran: '0.2 MB' },
          { nama: 'Rekomendasi Pimpinan', file: 'rekomendasi_laila.pdf', ukuran: '0.3 MB' },
          { nama: 'Rekomendasi Penempatan', file: 'penempatan_laila.pdf', ukuran: '0.4 MB' },
        ],
      },
    ],
  },
]
