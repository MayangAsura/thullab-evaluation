import { useState } from "react";
import { useAuth } from "../lib/auth";
import { GraduationCap, Mail, Lock, User, Eye, EyeOff, AlertCircle } from "lucide-react";


export const LoginRegister = () => {
  const { login, register, loading } = useAuth();
  const [isLoginView, setIsLoginView] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    try {
      if (isLoginView) {
        if (!email || !password) {
          setErrorMsg("Silakan lengkapi semua kolom input.");
          return;
        }
        await login(email, password);
      } else {
        if (!name || !email || !password) {
          setErrorMsg("Silakan lengkapi semua kolom input.");
          return;
        }
        if (password.length < 6) {
          setErrorMsg("Password minimal terdiri dari 6 karakter.");
          return;
        }
        await register(name, email, password);
      }
    } catch (err) {
      setErrorMsg(err.message || "Terjadi kesalahan.");
    }
  };
  const fillAdminCredentials = () => {
    setEmail("mayang.asura123@gmail.com");
    setPassword("password123");
    setIsLoginView(true);
    setErrorMsg(null);
  };
  return <div className="min-h-screen bg-[#fbfaf6] dark:bg-zinc-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {
    /* Visual Brand Header */
  }
        <div className="flex justify-center">
          <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/10">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-display font-extrabold text-stone-900 dark:text-zinc-100">
          EduForge LMS
        </h2>
        <p className="mt-2 text-center text-xs font-bold text-[#e8b81a] uppercase tracking-widest">
          Sistem Manajemen Pembelajaran &amp; Registrasi
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-zinc-900 py-8 px-6 shadow-xl border border-stone-200/40 dark:border-zinc-800 rounded-3xl space-y-6">
          {
    /* Header switch buttons */
  }
          <div className="grid grid-cols-2 p-1.5 bg-stone-100 dark:bg-zinc-800 rounded-2xl">
            <button
    onClick={() => {
      setIsLoginView(true);
      setErrorMsg(null);
    }}
    className={`py-2 px-4 text-xs font-bold rounded-xl transition-all ${isLoginView ? "bg-white dark:bg-zinc-700 text-stone-900 dark:text-white shadow-sm" : "text-stone-500 hover:text-stone-800 dark:text-zinc-400"}`}
  >
              Masuk (Login)
            </button>
            <button
    onClick={() => {
      setIsLoginView(false);
      setErrorMsg(null);
    }}
    className={`py-2 px-4 text-xs font-bold rounded-xl transition-all ${!isLoginView ? "bg-white dark:bg-zinc-700 text-stone-900 dark:text-white shadow-sm" : "text-stone-500 hover:text-stone-800 dark:text-zinc-400"}`}
  >
              Daftar (Register)
            </button>
          </div>

          {errorMsg && <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 p-3.5 rounded-2xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              <div className="text-xs font-semibold text-rose-700 dark:text-rose-300">
                {errorMsg}
              </div>
            </div>}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLoginView && <div>
                <label className="block text-xs font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-400">
                    <User className="w-4 h-4" />
                  </span>
                  <input
    type="text"
    required
    placeholder="Masukkan nama lengkap Anda"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="pl-10 w-full bg-stone-50 dark:bg-zinc-850 border border-stone-200 dark:border-zinc-700 rounded-xl py-3 px-4 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#e8b81a]"
  />
                </div>
              </div>}

            <div>
              <label className="block text-xs font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                Email / Username
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-400">
                  <Mail className="w-4 h-4" />
                </span>
                <input
    type="text"
    required
    placeholder={isLoginView ? "mayang.asura123@gmail.com atau username" : "Masukkan alamat email"}
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="pl-10 w-full bg-stone-50 dark:bg-zinc-850 border border-stone-200 dark:border-zinc-700 rounded-xl py-3 px-4 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#e8b81a]"
  />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                Kata Sandi (Password)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input
    type={showPassword ? "text" : "password"}
    required
    placeholder="••••••••"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="pl-10 pr-10 w-full bg-stone-50 dark:bg-zinc-850 border border-stone-200 dark:border-zinc-700 rounded-xl py-3 px-4 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#e8b81a]"
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

            <button
    type="submit"
    disabled={loading}
    className="w-full mt-4 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-bold text-xs py-3.5 px-4 rounded-xl shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
  >
              {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : null}
              {isLoginView ? "MASUK KE DASHBOARD" : "BUAT AKUN BARU"}
            </button>
          </form>

          {
    /* Quick Admin Shortcut Helper */
  }
          {isLoginView && <div className="pt-4 border-t border-stone-100 dark:border-zinc-800 text-center">
              <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider mb-2">Bantuan Pengujian</p>
              <button
    type="button"
    onClick={fillAdminCredentials}
    className="text-xs bg-amber-50 dark:bg-amber-950/20 text-[#e8b81a] border border-[#e8b81a]/20 py-2 px-3 rounded-xl font-bold hover:bg-[#e8b81a]/10 transition-colors"
  >
                Gunakan Akun Admin Demo
              </button>
            </div>}
        </div>
      </div>
    </div>;
};
