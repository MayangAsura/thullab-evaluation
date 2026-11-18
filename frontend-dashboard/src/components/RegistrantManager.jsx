import { useState, useEffect } from "react";
import { INDONESIAN_CITIES } from "../mockData";
import { User, Phone, Mail, MapPin, Search, Save, Sparkles } from "lucide-react";
export const RegistrantManager = ({
  registrants,
  onSave,
  addToast
}) => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [domicile, setDomicile] = useState("");
  const [status, setStatus] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("fullName");
  const [sortDir, setSortDir] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetchingCities, setIsFetchingCities] = useState(false);
  const [apiCities, setApiCities] = useState([]);
  useEffect(() => {
    const fetchRegions = async () => {
      setIsFetchingCities(true);
      await new Promise((resolve) => setTimeout(resolve, 600));
      setApiCities(INDONESIAN_CITIES);
      setIsFetchingCities(false);
    };
    fetchRegions();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !phoneNumber.trim() || !email.trim() || !address.trim() || !domicile) {
      addToast("Silakan isi seluruh formulir pendaftaran secara lengkap", "warning");
      return;
    }
    onSave({
      fullName: fullName.trim(),
      phoneNumber: phoneNumber.trim(),
      email: email.trim(),
      address: address.trim(),
      domicile,
      status
    });
    setFullName("");
    setPhoneNumber("");
    setEmail("");
    setAddress("");
    setDomicile("");
    setStatus("active");
  };
  const filteredRegistrants = registrants.filter(
    (r) => r.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || r.domicile.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const sortedRegistrants = [...filteredRegistrants].sort((a, b) => {
    const valA = a[sortField].toLowerCase();
    const valB = b[sortField].toLowerCase();
    if (valA < valB) return sortDir === "asc" ? -1 : 1;
    if (valA > valB) return sortDir === "asc" ? 1 : -1;
    return 0;
  });
  const cardsPerPage = 3;
  const totalPages = Math.ceil(sortedRegistrants.length / cardsPerPage);
  const paginatedRegistrants = sortedRegistrants.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );
  return <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {
    /* Left side: Add New Registrant Form */
  }
      <div className="lg:col-span-6 bg-white dark:bg-zinc-900 border border-stone-100 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="bg-gradient-to-r from-amber-500 to-yellow-600 p-6 text-white">
          <span className="text-[10px] uppercase font-bold tracking-widest bg-white/20 px-2.5 py-1 rounded-full text-white">
            Registrasi Baru
          </span>
          <h3 className="text-xl font-display font-bold mt-1.5">
            Pendaftaran Registran Baru
          </h3>
          <p className="text-white/80 text-xs mt-1">
            Tambahkan calon siswa/peserta baru secara manual ke dalam waiting list.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
          {
    /* Full Name */
  }
          <div>
            <label className="block text-xs font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
              Nama Lengkap Pendaftar <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <User className="w-4 h-4" />
              </span>
              <input
    type="text"
    required
    placeholder="Masukkan nama lengkap siswa..."
    value={fullName}
    onChange={(e) => setFullName(e.target.value)}
    className="w-full bg-stone-50 dark:bg-zinc-850 border border-stone-200 dark:border-zinc-750 rounded-xl pl-10 pr-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#e8b81a]"
  />
            </div>
          </div>

          {
    /* Contact Group */
  }
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {
    /* Phone Number */
  }
            <div>
              <label className="block text-xs font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                Nomor Telepon / WA <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <Phone className="w-4 h-4" />
                </span>
                <input
    type="tel"
    required
    placeholder="08XXXXXXXXXX"
    value={phoneNumber}
    onChange={(e) => setPhoneNumber(e.target.value)}
    className="w-full bg-stone-50 dark:bg-zinc-850 border border-stone-200 dark:border-zinc-750 rounded-xl pl-10 pr-4 py-3 text-sm font-semibold focus:outline-none"
  />
              </div>
            </div>

            {
    /* Email */
  }
            <div>
              <label className="block text-xs font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                Email Aktif <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <Mail className="w-4 h-4" />
                </span>
                <input
    type="email"
    required
    placeholder="nama@email.com"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="w-full bg-stone-50 dark:bg-zinc-850 border border-stone-200 dark:border-zinc-750 rounded-xl pl-10 pr-4 py-3 text-sm font-semibold focus:outline-none"
  />
              </div>
            </div>
          </div>

          {
    /* Domicile city fetched from simulated api wilayah */
  }
          <div>
            <label className="block text-xs font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Kota Domisili (API Wilayah) <span className="text-rose-500">*</span></span>
              {isFetchingCities && <span className="text-[10px] text-amber-600 animate-pulse font-semibold">Mengambil Data API...</span>}
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <MapPin className="w-4 h-4" />
              </span>
              <select
    required
    value={domicile}
    onChange={(e) => setDomicile(e.target.value)}
    className="w-full bg-stone-50 dark:bg-zinc-850 border border-stone-200 dark:border-zinc-750 rounded-xl pl-10 pr-4 py-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#e8b81a]"
  >
                <option value="">-- Pilih Kota Domisili --</option>
                {apiCities.map((city) => <option key={city} value={city}>
                    {city}
                  </option>)}
              </select>
            </div>
            <p className="text-[10px] text-stone-400 mt-1">
              Data kota ditarik secara dinamis dari API Wilayah Indonesia.
            </p>
          </div>

          {
    /* Address */
  }
          <div>
            <label className="block text-xs font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
              Alamat Domisili Lengkap <span className="text-rose-500">*</span>
            </label>
            <textarea
    rows={2}
    required
    placeholder="Masukkan nama jalan, nomor rumah, RT/RW, kecamatan..."
    value={address}
    onChange={(e) => setAddress(e.target.value)}
    className="w-full bg-stone-50 dark:bg-zinc-850 border border-stone-200 dark:border-zinc-750 rounded-xl p-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#e8b81a]"
  />
          </div>

          {
    /* Status (active / inactive) */
  }
          <div>
            <label className="block text-xs font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
              Status Registran
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-stone-600 dark:text-zinc-300">
                <input
    type="radio"
    name="registrant_status"
    checked={status === "active"}
    onChange={() => setStatus("active")}
    className="accent-[#e8b81a]"
  />
                Aktif
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-stone-600 dark:text-zinc-300">
                <input
    type="radio"
    name="registrant_status"
    checked={status === "inactive"}
    onChange={() => setStatus("inactive")}
    className="accent-[#e8b81a]"
  />
                Nonaktif
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 dark:border-zinc-800 flex justify-end">
            <button
    type="submit"
    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md"
  >
              <Save className="w-4 h-4" /> Daftarkan Registran
            </button>
          </div>
        </form>
      </div>

      {
    /* Right side: Waiting list registry display */
  }
      <div className="lg:col-span-6 bg-white dark:bg-zinc-900 border border-stone-100 dark:border-zinc-800 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="border-b border-stone-100 dark:border-zinc-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-stone-800 dark:text-zinc-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#e8b81a]" /> Waiting List Registran Baru ({filteredRegistrants.length})
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">Daftar calon peserta yang mendaftar secara berkala.</p>
          </div>
        </div>

        {
    /* Searching & Sorting Controls */
  }
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pb-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-stone-400" />
            <input
    type="text"
    placeholder="Cari registran..."
    value={searchQuery}
    onChange={(e) => {
      setSearchQuery(e.target.value);
      setCurrentPage(1);
    }}
    className="w-full bg-stone-50 dark:bg-zinc-850 border border-stone-200 dark:border-zinc-750 rounded-lg pl-8 pr-2 py-1.5 text-[11px] font-semibold focus:outline-none"
  />
          </div>

          <div className="flex gap-1">
            <select
    value={sortField}
    onChange={(e) => {
      setSortField(e.target.value);
      setCurrentPage(1);
    }}
    className="w-full bg-stone-50 dark:bg-zinc-850 border border-stone-200 dark:border-zinc-750 text-[11px] font-semibold px-2 py-1.5 rounded-lg focus:outline-none"
  >
              <option value="fullName">Urut Nama</option>
              <option value="domicile">Urut Domisili</option>
              <option value="status">Urut Status</option>
            </select>
            <button
    type="button"
    onClick={() => {
      setSortDir((prev) => prev === "asc" ? "desc" : "asc");
      setCurrentPage(1);
    }}
    className="px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 dark:bg-zinc-800 rounded-lg text-xs font-bold transition-colors"
  >
              {sortDir === "asc" ? "\u25B2" : "\u25BC"}
            </button>
          </div>
        </div>

        {registrants.length === 0 ? <div className="text-center py-20 text-stone-400 text-xs italic">
            Belum ada registran terdaftar. Silakan tambahkan registran baru pada form kiri.
          </div> : paginatedRegistrants.length === 0 ? <div className="text-center py-20 text-stone-400 text-xs italic">
            Hasil pencarian tidak ditemukan.
          </div> : <div className="space-y-4">
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
              {paginatedRegistrants.map((reg) => <div
    key={reg.id}
    className="bg-stone-50/70 dark:bg-zinc-850 p-4 rounded-2xl border border-stone-200/60 dark:border-zinc-800 space-y-3"
  >
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-stone-800 dark:text-zinc-100">{reg.fullName}</h4>
                      <p className="text-[10px] text-stone-400 mt-0.5">{reg.email} &bull; {reg.phoneNumber}</p>
                    </div>
                    <span className={`px-2 py-0.5 text-[9px] font-bold rounded-full ${reg.status === "active" ? "bg-emerald-100 text-emerald-800" : "bg-stone-100 text-stone-600"}`}>
                      {reg.status === "active" ? "Aktif" : "Nonaktif"}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-stone-150/60 text-[10px] font-semibold text-stone-500 dark:text-zinc-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{reg.address} ({reg.domicile})</span>
                  </div>
                </div>)}
            </div>

            {
    /* Pagination Controls */
  }
            {totalPages > 1 && <div className="flex items-center justify-between pt-3 border-t border-stone-100 dark:border-zinc-800">
                <span className="text-[10px] font-bold text-stone-500">
                  Hal {currentPage} dari {totalPages}
                </span>
                <div className="flex items-center gap-1">
                  <button
    type="button"
    disabled={currentPage === 1}
    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
    className="px-2 py-1 bg-stone-50 hover:bg-stone-100 dark:bg-zinc-800 text-[10px] font-bold text-stone-700 rounded-md disabled:opacity-40 transition-colors"
  >
                    Sblm
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => <button
    key={page}
    type="button"
    onClick={() => setCurrentPage(page)}
    className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold rounded-md transition-colors ${currentPage === page ? "bg-stone-900 text-white dark:bg-zinc-700" : "bg-stone-50 hover:bg-stone-100 text-stone-750"}`}
  >
                      {page}
                    </button>)}
                  <button
    type="button"
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
    className="px-2 py-1 bg-stone-50 hover:bg-stone-100 dark:bg-zinc-800 text-[10px] font-bold text-stone-770 rounded-md disabled:opacity-40 transition-colors"
  >
                    Sel
                  </button>
                </div>
              </div>}
          </div>}
      </div>
    </div>;
};
