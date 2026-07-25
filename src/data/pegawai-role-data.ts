export type Role = 'admin' | 'verifikator_ipg' | 'verifikator_tubel' | 'verifikator_pwk' | 'verifikator_ujikom' | 'pegawai'

export const ROLE_CONFIG: Record<Role, { label: string; bg: string; text: string; desc: string }> = {
  admin:               { label: 'Admin',                bg: 'bg-violet-100 dark:bg-violet-900/30',  text: 'text-violet-700 dark:text-violet-400',  desc: 'Kelola semua data & pengguna sistem' },
  verifikator_ipg:     { label: 'Verifikator IPG',      bg: 'bg-indigo-100 dark:bg-indigo-900/30',  text: 'text-indigo-700 dark:text-indigo-400',  desc: 'Verifikasi pengajuan IPG' },
  verifikator_tubel:   { label: 'Verifikator TUBEL',    bg: 'bg-emerald-100 dark:bg-emerald-900/30',text: 'text-emerald-700 dark:text-emerald-400', desc: 'Verifikasi pengajuan Tugas Belajar' },
  verifikator_pwk:     { label: 'Verifikator PWK',      bg: 'bg-orange-100 dark:bg-orange-900/30',  text: 'text-orange-700 dark:text-orange-400',  desc: 'Verifikasi pengajuan Pindah Wilayah Kerja' },
  verifikator_ujikom:  { label: 'Verifikator UjiKom',   bg: 'bg-rose-100 dark:bg-rose-900/30',      text: 'text-rose-700 dark:text-rose-400',      desc: 'Verifikasi pengajuan Uji Kompetensi JF' },
  pegawai:             { label: 'Pegawai',               bg: 'bg-slate-100 dark:bg-slate-700',       text: 'text-slate-600 dark:text-slate-400',    desc: 'Mengajukan IPG / TUBEL / PWK / UjiKom' },
}

export interface PegawaiRole {
  nip: string
  nama: string
  jabatan: string
  unit: string
  email: string
  role: Role
  aktif: boolean
}

export const daftarPegawaiRole: PegawaiRole[] = [
  { nip: '198501012010011001', nama: 'Ahmad Fauzi',       jabatan: 'Analis Kebijakan',         unit: 'Biro Perencanaan',   email: 'ahmad.fauzi@bkn.go.id',       role: 'admin',             aktif: true },
  { nip: '198703152011012002', nama: 'Siti Rahayu',       jabatan: 'Pranata Komputer',          unit: 'Pusdatin',           email: 'siti.rahayu@bkn.go.id',       role: 'verifikator_ipg',   aktif: true },
  { nip: '199002202012011003', nama: 'Budi Santoso',      jabatan: 'Auditor',                   unit: 'Inspektorat',        email: 'budi.santoso@bkn.go.id',      role: 'verifikator_tubel', aktif: true },
  { nip: '198811102013012004', nama: 'Dewi Kusuma',       jabatan: 'Arsiparis',                 unit: 'Biro Umum',          email: 'dewi.kusuma@bkn.go.id',       role: 'verifikator_ipg',   aktif: true },
  { nip: '199205182014011005', nama: 'Eko Prasetyo',      jabatan: 'Perencana',                 unit: 'Biro Perencanaan',   email: 'eko.prasetyo@bkn.go.id',      role: 'pegawai',           aktif: true },
  { nip: '198604252015012006', nama: 'Fitri Handayani',   jabatan: 'Analis SDM',               unit: 'Biro Kepegawaian',   email: 'fitri.handayani@bkn.go.id',   role: 'pegawai',           aktif: true },
  { nip: '199108302016011007', nama: 'Galih Permana',     jabatan: 'Pranata Humas',             unit: 'Biro Humas',         email: 'galih.permana@bkn.go.id',     role: 'verifikator_tubel', aktif: true },
  { nip: '199307122017012008', nama: 'Hani Lestari',      jabatan: 'Bendahara',                 unit: 'Biro Keuangan',      email: 'hani.lestari@bkn.go.id',      role: 'pegawai',           aktif: false },
  { nip: '198912052018011009', nama: 'Irfan Maulana',     jabatan: 'Auditor Kepegawaian',       unit: 'Inspektorat',        email: 'irfan.maulana@bkn.go.id',     role: 'pegawai',           aktif: true },
  { nip: '199410082019012010', nama: 'Juwita Sari',       jabatan: 'Analis Hukum',              unit: 'Biro Hukum',         email: 'juwita.sari@bkn.go.id',       role: 'pegawai',           aktif: true },
  { nip: '199001152020011011', nama: 'Kurnia Wibowo',     jabatan: 'Perencana Muda',            unit: 'Biro Perencanaan',   email: 'kurnia.wibowo@bkn.go.id',     role: 'pegawai',           aktif: true },
  { nip: '198807222021012012', nama: 'Lilis Suryani',     jabatan: 'Pranata Komputer Muda',    unit: 'Pusdatin',           email: 'lilis.suryani@bkn.go.id',     role: 'pegawai',           aktif: true },
  { nip: '199603102022011013', nama: 'Muhammad Ridwan',   jabatan: 'Analis Kebijakan Muda',    unit: 'Biro Perencanaan',   email: 'muh.ridwan@bkn.go.id',        role: 'admin',             aktif: true },
  { nip: '199502282023012014', nama: 'Nadia Putri',       jabatan: 'Arsiparis Muda',            unit: 'Biro Umum',          email: 'nadia.putri@bkn.go.id',       role: 'pegawai',           aktif: true },
  { nip: '199804152024011015', nama: 'Oscar Hidayat',     jabatan: 'Auditor Muda',              unit: 'Inspektorat',        email: 'oscar.hidayat@bkn.go.id',     role: 'verifikator_tubel',  aktif: false },
  { nip: '199106082018011016', nama: 'Putri Anggraeni',  jabatan: 'Analis SDM Aparatur',       unit: 'Biro Kepegawaian',   email: 'putri.anggraeni@bkn.go.id',   role: 'verifikator_pwk',    aktif: true },
  { nip: '199308242019012017', nama: 'Rama Setiawan',    jabatan: 'Perencana Muda',            unit: 'Biro Perencanaan',   email: 'rama.setiawan@bkn.go.id',     role: 'verifikator_ujikom', aktif: true },
]
