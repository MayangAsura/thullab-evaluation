import { useState, useEffect } from "react";
import { User as UserIcon, Phone, Mail, Key, Shield, ArrowLeft, Save, Eye, EyeOff } from "lucide-react";
export const UserManager = ({
  users,
  roles,
  initialUser,
  onSave,
  onCancel,
  addToast
}) => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    if (initialUser) {
      setFullName(initialUser.fullName);
      setPhoneNumber(initialUser.phoneNumber);
      setEmail(initialUser.email);
      setRole(initialUser.role);
      setPassword(initialUser.password || "");
    } else {
      setFullName("");
      setPhoneNumber("");
      setEmail("");
      setRole(roles[0]?.id || "");
      setPassword("");
    }
  }, [initialUser, roles]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !phoneNumber.trim() || !email.trim() || !role) {
      addToast("Harap lengkapi semua kolom data user", "warning");
      return;
    }
    if (!initialUser && !password) {
      addToast("Kolom password wajib diisi untuk user baru", "warning");
      return;
    }
    onSave({
      ...initialUser ? { id: initialUser.id } : {},
      fullName: fullName.trim(),
      phoneNumber: phoneNumber.trim(),
      email: email.trim(),
      role,
      password: password || void 0
    });
  };
  return <div className="bg-white dark:bg-zinc-900 border border-stone-100 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-xl">
      <div className="bg-gradient-to-r from-stone-900 to-amber-950 p-6 text-white flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest bg-white/20 px-2.5 py-1 rounded-full text-[#e8b81a]">
            Kelola Pengguna
          </span>
          <h2 className="text-xl sm:text-2xl font-display font-bold mt-1.5">
            {initialUser ? `Ubah Pengguna: ${initialUser.fullName}` : "Tambah Pengguna Baru"}
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

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-w-2xl mx-auto">
        {
    /* Full Name */
  }
        <div>
          <label className="block text-xs font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
            Nama Lengkap <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
              <UserIcon className="w-4 h-4" />
            </span>
            <input
    type="text"
    required
    placeholder="Contoh: Muhammad Farhan"
    value={fullName}
    onChange={(e) => setFullName(e.target.value)}
    className="w-full bg-stone-50 dark:bg-zinc-850 border border-stone-200 dark:border-zinc-750 rounded-xl pl-10 pr-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#e8b81a]"
  />
          </div>
        </div>

        {
    /* Contact info: Phone & Email */
  }
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
              Nomor Telepon <span className="text-rose-500">*</span>
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

          <div>
            <label className="block text-xs font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
              Email <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <Mail className="w-4 h-4" />
              </span>
              <input
    type="email"
    required
    placeholder="user@eduforge.com"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="w-full bg-stone-50 dark:bg-zinc-850 border border-stone-200 dark:border-zinc-750 rounded-xl pl-10 pr-4 py-3 text-sm font-semibold focus:outline-none"
  />
            </div>
          </div>
        </div>

        {
    /* Role Select */
  }
        <div>
          <label className="block text-xs font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-stone-400" /> Hak Akses / Role <span className="text-rose-500">*</span>
          </label>
          <select
    required
    value={role}
    onChange={(e) => setRole(e.target.value)}
    className="w-full bg-stone-50 dark:bg-zinc-850 border border-stone-200 dark:border-zinc-750 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#e8b81a]"
  >
            <option value="">-- Pilih Role Akses --</option>
            {roles.map((r) => <option key={r.id} value={r.id}>
                {r.name}
              </option>)}
          </select>
        </div>

        {
    /* Password */
  }
        <div>
          <label className="block text-xs font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Password {initialUser ? "(Biarkan kosong jika tidak diubah)" : <span className="text-rose-500">*</span>}</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
              <Key className="w-4 h-4" />
            </span>
            <input
    type={showPassword ? "text" : "password"}
    required={!initialUser}
    placeholder="Minimal 6 karakter..."
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="w-full bg-stone-50 dark:bg-zinc-850 border border-stone-200 dark:border-zinc-750 rounded-xl pl-10 pr-12 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#e8b81a]"
  />
            <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-600"
  >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="flex gap-3 pt-6 border-t border-stone-100 dark:border-zinc-800 justify-end">
          <button
    type="button"
    onClick={onCancel}
    className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-stone-600 dark:text-zinc-300 font-semibold rounded-xl text-xs"
  >
            Batalkan
          </button>
          <button
    type="submit"
    className="px-6 py-2.5 bg-gradient-to-r from-stone-900 to-zinc-850 hover:from-black hover:to-zinc-900 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm"
  >
            <Save className="w-4 h-4 text-[#e8b81a]" /> Simpan Pengguna
          </button>
        </div>
      </form>
    </div>;
};
