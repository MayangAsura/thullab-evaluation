import { useState, useEffect } from "react";
import { User, Phone, MapPin, ArrowLeft, Save } from "lucide-react";
export const SpeakerManager = ({
  speakers,
  initialSpeaker,
  onSave,
  onCancel,
  addToast
}) => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  useEffect(() => {
    if (initialSpeaker) {
      setFullName(initialSpeaker.fullName);
      setPhoneNumber(initialSpeaker.phoneNumber);
      setAddress(initialSpeaker.address);
    } else {
      setFullName("");
      setPhoneNumber("");
      setAddress("");
    }
  }, [initialSpeaker]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !phoneNumber.trim() || !address.trim()) {
      addToast("Harap isi semua kolom data pembicara/speaker", "warning");
      return;
    }
    onSave({
      ...initialSpeaker ? { id: initialSpeaker.id } : {},
      fullName: fullName.trim(),
      phoneNumber: phoneNumber.trim(),
      address: address.trim()
    });
  };
  return <div className="bg-white dark:bg-zinc-900 border border-stone-100 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-xl">
      <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-[#e8b81a] p-6 text-white flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest bg-white/20 px-2.5 py-1 rounded-full text-[#e8b81a]">
            Speaker / Pembicara
          </span>
          <h2 className="text-xl sm:text-2xl font-display font-bold mt-1.5">
            {initialSpeaker ? `Ubah Speaker: ${initialSpeaker.fullName}` : "Tambah Speaker Baru"}
          </h2>
        </div>
        <button
    type="button"
    onClick={onCancel}
    className="bg-white/10 hover:bg-white/20 text-white rounded-xl px-4 py-2 text-xs font-semibold flex items-center gap-1 border border-white/10"
  >
          <ArrowLeft className="w-4 h-4" /> Batal
        </button>
      </div>

      <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        <form onSubmit={handleSubmit} className="md:col-span-7 space-y-6">
          {
    /* Full Name */
  }
          <div>
            <label className="block text-xs font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
              Nama Lengkap <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <User className="w-4 h-4" />
              </span>
              <input
    type="text"
    required
    placeholder="Contoh: Dr. Ir. Richard Lee, M.T."
    value={fullName}
    onChange={(e) => setFullName(e.target.value)}
    className="w-full bg-stone-50 dark:bg-zinc-850 border border-stone-200 dark:border-zinc-750 rounded-xl pl-10 pr-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#e8b81a]"
  />
            </div>
          </div>

          {
    /* Phone Number */
  }
          <div>
            <label className="block text-xs font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
              Nomor Telepon / WhatsApp <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <Phone className="w-4 h-4" />
              </span>
              <input
    type="tel"
    required
    placeholder="Contoh: 0812XXXXXXXX"
    value={phoneNumber}
    onChange={(e) => setPhoneNumber(e.target.value)}
    className="w-full bg-stone-50 dark:bg-zinc-850 border border-stone-200 dark:border-zinc-750 rounded-xl pl-10 pr-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#e8b81a]"
  />
            </div>
          </div>

          {
    /* Address */
  }
          <div>
            <label className="block text-xs font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
              Alamat Lengkap Speaker <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute top-3 left-3 text-stone-400">
                <MapPin className="w-4 h-4" />
              </span>
              <textarea
    rows={3}
    required
    placeholder="Masukkan alamat rumah atau kantor instansi asal pembicara..."
    value={address}
    onChange={(e) => setAddress(e.target.value)}
    className="w-full bg-stone-50 dark:bg-zinc-850 border border-stone-200 dark:border-zinc-750 rounded-xl pl-9 pr-4 py-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#e8b81a]"
  />
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-stone-100 dark:border-zinc-800">
            <button
    type="button"
    onClick={onCancel}
    className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-stone-600 dark:text-zinc-300 font-semibold rounded-xl text-xs"
  >
              Batalkan
            </button>
            <button
    type="submit"
    className="px-6 py-2.5 bg-gradient-to-r from-stone-900 to-zinc-800 hover:from-stone-950 hover:to-zinc-900 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm"
  >
              <Save className="w-4 h-4 text-[#e8b81a]" /> Simpan Speaker
            </button>
          </div>
        </form>

        {
    /* Right Preview Card */
  }
        <div className="md:col-span-5 bg-stone-50 dark:bg-zinc-850/40 rounded-2xl border border-stone-150 p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest">
              Kartu Profil Speaker (Preview)
            </h4>
            <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl shadow-xs border border-stone-100 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center font-bold text-lg text-[#e8b81a]">
                  {fullName ? fullName.charAt(0) : "S"}
                </div>
                <div>
                  <h5 className="text-sm font-bold text-stone-800 dark:text-zinc-200">
                    {fullName || "Nama Speaker..."}
                  </h5>
                  <p className="text-[10px] text-amber-600 font-bold uppercase tracking-wider">
                    Instruktur Utama
                  </p>
                </div>
              </div>

              <div className="space-y-2 border-t border-stone-100 pt-4 text-[11px] font-semibold text-stone-500">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-stone-400" />
                  <span>{phoneNumber || "Nomor telepon..."}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span className="line-clamp-2">{address || "Alamat..."}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#e8b81a]/10 border border-amber-200/40 p-4 rounded-xl text-xs text-[#b45309]">
            Setiap pembicara terdaftar dapat ditugaskan sebagai Author/Pembuat materi pada halaman kurikulum.
          </div>
        </div>
      </div>
    </div>;
};
