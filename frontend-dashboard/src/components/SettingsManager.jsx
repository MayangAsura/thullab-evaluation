import { useState } from "react";
import { Key, Save, AlertCircle } from "lucide-react";
export const SettingsManager = ({
  onResetPassword,
  addToast
}) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPassword.trim() || !confirmPassword.trim()) {
      addToast("Harap isi kedua kolom sandi baru", "warning");
      return;
    }
    if (newPassword.length < 6) {
      addToast("Sandi baru harus terdiri dari minimal 6 karakter", "warning");
      return;
    }
    if (newPassword !== confirmPassword) {
      addToast("Konfirmasi sandi tidak cocok. Harap periksa kembali!", "error");
      return;
    }
    onResetPassword(newPassword);
    setNewPassword("");
    setConfirmPassword("");
  };
  return <div className="bg-white dark:bg-zinc-900 border border-stone-100 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-xl max-w-md mx-auto">
      <div className="bg-gradient-to-r from-stone-900 to-amber-950 p-6 text-white text-center">
        <h2 className="text-xl font-display font-bold">
          Keamanan Akun
        </h2>
        <p className="text-white/70 text-xs mt-1">
          Setel ulang password akun Anda secara aman.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        <div className="bg-amber-50/10 border border-amber-200/20 p-4 rounded-xl flex items-start gap-2.5 text-[#b45309] text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <p className="font-medium">
            Gunakan minimal 6 karakter unik dengan kombinasi angka dan huruf untuk meningkatkan kekuatan password.
          </p>
        </div>

        {
    /* New Password */
  }
        <div>
          <label className="block text-xs font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
            Password Baru <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
              <Key className="w-4 h-4" />
            </span>
            <input
    type="password"
    required
    placeholder="Masukkan password baru..."
    value={newPassword}
    onChange={(e) => setNewPassword(e.target.value)}
    className="w-full bg-stone-50 dark:bg-zinc-850 border border-stone-200 dark:border-zinc-750 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#e8b81a]"
  />
          </div>
        </div>

        {
    /* Confirm Password */
  }
        <div>
          <label className="block text-xs font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
            Konfirmasi Password Baru <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
              <Key className="w-4 h-4" />
            </span>
            <input
    type="password"
    required
    placeholder="Ketik ulang password baru..."
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    className="w-full bg-stone-50 dark:bg-zinc-850 border border-stone-200 dark:border-zinc-750 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#e8b81a]"
  />
          </div>
        </div>

        <div className="pt-4 border-t border-stone-100 dark:border-zinc-800">
          <button
    type="submit"
    className="w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md"
  >
            <Save className="w-4 h-4" /> Simpan Password Baru
          </button>
        </div>
      </form>
    </div>;
};
