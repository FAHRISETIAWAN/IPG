export interface PerpanjanganTubel {
  id: string
  nip: string
  nama: string
  jabatan: string
  unit: string
  kode: string
  tanggalPengajuan: string
  nomorSKPerpanjangan?: string
  tanggalSKPerpanjangan?: string
  tmtSelesaiPerpanjangan?: string
  fileSKPerpanjangan?: string
  status: 'belum' | 'sudah'
}

export const daftarPerpanjangan: PerpanjanganTubel[] = [
  { id: '1', nip: '199002202012011003', nama: 'Budi Santoso',  jabatan: 'Auditor',       unit: 'Inspektorat',    kode: 'TUBEL-20260603-002', tanggalPengajuan: '03 Juni 2026', status: 'belum' },
  { id: '2', nip: '199108302016011007', nama: 'Galih Permana', jabatan: 'Pranata Humas', unit: 'Biro Humas',     kode: 'TUBEL-20260608-004', tanggalPengajuan: '08 Juni 2026', status: 'sudah', nomorSKPerpanjangan: 'KEP/PERP/001/BKN/2026', tanggalSKPerpanjangan: '10 Juli 2026', tmtSelesaiPerpanjangan: '10 Juli 2028' },
  { id: '3', nip: '198604252015012006', nama: 'Fitri Handayani', jabatan: 'Analis SDM',  unit: 'Biro Kepegawaian', kode: 'TUBEL-20260605-003', tanggalPengajuan: '05 Juni 2026', status: 'belum' },
]
