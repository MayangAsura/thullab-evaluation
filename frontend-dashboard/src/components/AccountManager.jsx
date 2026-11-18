import { useState, useEffect, useRef } from "react";
import { User, Phone, Mail, Camera, Save } from "lucide-react";
export const AccountManager = ({
  initialAccount,
  onSave,
  addToast
}) => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const fileInputRef = useRef(null);
  useEffect(() => {
    if (initialAccount) {
      setFullName(initialAccount.fullName);
      setPhoneNumber(initialAccount.phoneNumber);
      setEmail(initialAccount.email);
      setAvatar(initialAccount.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80");
    }
  }, [initialAccount]);
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        addToast("Gambar avatar maksimal berukuran 2MB", "warning");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
        addToast("Foto profil diunggah ke memori", "success");
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !phoneNumber.trim() || !email.trim()) {
      addToast("Harap isi semua kolom profil akun", "warning");
      return;
    }
    onSave({
      fullName: fullName.trim(),
      phoneNumber: phoneNumber.trim(),
      email: email.trim(),
      avatar
    });
  };
  return <div className="bg-white dark:bg-zinc-900 border border-stone-100 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-xl max-w-2xl mx-auto">
      <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-[#e8b81a] p-6 text-white text-center">
        <h2 className="text-xl sm:text-2xl font-display font-bold">
          Profil Akun Pengguna
        </h2>
        <p className="text-white/70 text-xs mt-1">
          Perbarui informasi profil personal dan foto avatar utama Anda di sini.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
        {
    /* Avatar Upload Container */
  }
        <div className="flex flex-col items-center space-y-3">
          <div className="relative group">
            <img
    src={avatar}
    alt="Avatar Profile"
    className="w-24 h-24 rounded-full object-cover border-4 border-amber-100 dark:border-zinc-800 shadow-sm"
    referrerPolicy="no-referrer"
  />
            <button
    type="button"
    onClick={() => fileInputRef.current?.click()}
    className="absolute bottom-0 right-0 bg-[#e8b81a] hover:bg-amber-600 text-white p-2 rounded-full shadow-md transition-transform active:scale-95"
  >
              <Camera className="w-4 h-4" />
            </button>
            <input
    type="file"
    ref={fileInputRef}
    onChange={handleFileChange}
    accept="image/*"
    className="hidden"
  />
          </div>
          <span className="text-[10px] text-stone-400 font-semibold uppercase">Klik ikon kamera untuk ganti avatar</span>
        </div>

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
    value={fullName}
    onChange={(e) => setFullName(e.target.value)}
    className="w-full bg-stone-50 dark:bg-zinc-850 border border-stone-200 dark:border-zinc-750 rounded-xl pl-10 pr-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#e8b81a]"
  />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {
    /* Phone Number */
  }
          <div>
            <label className="block text-xs font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
              Nomor Handphone <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <Phone className="w-4 h-4" />
              </span>
              <input
    type="tel"
    required
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
              Alamat Email <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <Mail className="w-4 h-4" />
              </span>
              <input
    type="email"
    required
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="w-full bg-stone-50 dark:bg-zinc-850 border border-stone-200 dark:border-zinc-750 rounded-xl pl-10 pr-4 py-3 text-sm font-semibold focus:outline-none"
  />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-stone-100 dark:border-zinc-800 flex justify-end">
          <button
    type="submit"
    className="px-8 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md"
  >
            <Save className="w-4 h-4" /> Simpan Profil Akun
          </button>
        </div>
      </form>
    </div>;
};
