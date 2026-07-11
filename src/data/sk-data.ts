export type JenisSK = 'IPG' | 'TUBEL'

export interface SKPegawai {
  id: string
  nip: string
  nama: string
  jabatan: string
  unit: string
  kode: string
  layanan: string
  jenis: JenisSK
  tanggalPengajuan: string
  nomorSK?: string
  tanggalSK?: string
  nomorST?: string
  masaTugas?: string
  tmtSelesai?: string
  fileSK?: string
  filePerjanjian?: string
  fileST?: string
  tanggalST?: string
  status: 'belum' | 'sudah'
}

export const daftarSKPegawai: SKPegawai[] = [
  { id: '1',  nip: '198501012010011001', nama: 'Ahmad Fauzi',    jabatan: 'Analis Kebijakan', unit: 'Biro Perencanaan',  kode: 'IPG-20260601-001', layanan: 'IPG Profesi',    jenis: 'IPG',  tanggalPengajuan: '01 Juni 2026', status: 'belum' },
  { id: '2',  nip: '198703152011012002', nama: 'Siti Rahayu',    jabatan: 'Pranata Komputer', unit: 'Pusdatin',          kode: 'IPG-20260601-001', layanan: 'IPG Profesi',    jenis: 'IPG',  tanggalPengajuan: '01 Juni 2026', status: 'belum' },
  { id: '3',  nip: '199002202012011003', nama: 'Budi Santoso',   jabatan: 'Auditor',          unit: 'Inspektorat',       kode: 'TUBEL-20260603-002', layanan: 'TUBEL Beasiswa', jenis: 'TUBEL', tanggalPengajuan: '03 Juni 2026', status: 'belum' },
  { id: '4',  nip: '198811102013012004', nama: 'Dewi Kusuma',    jabatan: 'Arsiparis',        unit: 'Biro Umum',         kode: 'IPG-20260605-003', layanan: 'IPG Akademik',   jenis: 'IPG',  tanggalPengajuan: '05 Juni 2026', status: 'sudah' },
  { id: '5',  nip: '199205182014011005', nama: 'Eko Prasetyo',   jabatan: 'Perencana',        unit: 'Biro Perencanaan',  kode: 'IPG-20260605-003', layanan: 'IPG Akademik',   jenis: 'IPG',  tanggalPengajuan: '05 Juni 2026', status: 'belum' },
  { id: '6',  nip: '199108302016011007', nama: 'Galih Permana',  jabatan: 'Pranata Humas',   unit: 'Biro Humas',        kode: 'TUBEL-20260608-004', layanan: 'TUBEL Mandiri',  jenis: 'TUBEL', tanggalPengajuan: '08 Juni 2026', status: 'sudah' },
  { id: '7',  nip: '198912052018011009', nama: 'Irfan Maulana',  jabatan: 'Auditor Kepegawaian', unit: 'Inspektorat',   kode: 'IPG-20260612-006', layanan: 'IPG Profesi',    jenis: 'IPG',  tanggalPengajuan: '12 Juni 2026', status: 'belum' },
  { id: '8',  nip: '199410082019012010', nama: 'Juwita Sari',    jabatan: 'Analis Hukum',    unit: 'Biro Hukum',        kode: 'IPG-20260612-006', layanan: 'IPG Profesi',    jenis: 'IPG',  tanggalPengajuan: '12 Juni 2026', status: 'belum' },
]
