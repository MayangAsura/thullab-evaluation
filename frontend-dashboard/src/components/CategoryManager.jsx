import { useState, useEffect } from "react";
import { ArrowLeft, Save, GitMerge, Info } from "lucide-react";
export const CategoryManager = ({
  categories,
  initialCategory,
  onSave,
  onCancel,
  addToast
}) => {
  const [name, setName] = useState("");
  const [parent, setParent] = useState(null);
  const [description, setDescription] = useState("");
  useEffect(() => {
    if (initialCategory) {
      setName(initialCategory.name);
      setParent(initialCategory.parent);
      setDescription(initialCategory.description || "");
    } else {
      setName("");
      setParent(null);
      setDescription("");
    }
  }, [initialCategory]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      addToast("Nama kategori harus diisi", "warning");
      return;
    }
    if (initialCategory && parent === initialCategory.id) {
      addToast("Kategori tidak boleh memilih dirinya sendiri sebagai Parent", "error");
      return;
    }
    onSave({
      name: name.trim(),
      parent: parent || null,
      description: description.trim()
    });
  };
  const parentCategory = categories.find((c) => c.id === parent);
  return <div className="bg-white dark:bg-zinc-900 border border-stone-100 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-xl">
      <div className="bg-gradient-to-r from-amber-500 to-yellow-600 p-6 text-white flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest bg-white/20 px-2.5 py-1 rounded-full">
            Kategori Kurikulum
          </span>
          <h2 className="text-xl sm:text-2xl font-display font-bold mt-1.5">
            {initialCategory ? `Ubah Kategori: ${initialCategory.name}` : "Tambah Kategori Baru"}
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
    /* Name */
  }
          <div>
            <label className="block text-xs font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
              Nama Kategori <span className="text-rose-500">*</span>
            </label>
            <input
    type="text"
    required
    placeholder="Contoh: Frontend Development, Mobile Design"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="w-full bg-stone-50 dark:bg-zinc-850 border border-stone-200 dark:border-zinc-750 rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#e8b81a]"
  />
          </div>

          {
    /* Parent Select referred to category list */
  }
          <div>
            <label className="block text-xs font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <GitMerge className="w-4 h-4 text-stone-400" /> Kategori Induk (Parent)
            </label>
            <select
    value={parent || ""}
    onChange={(e) => setParent(e.target.value || null)}
    className="w-full bg-stone-50 dark:bg-zinc-850 border border-stone-200 dark:border-zinc-750 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#e8b81a]"
  >
              <option value="">-- Tanpa Induk (Kategori Utama) --</option>
              {categories.filter((cat) => !initialCategory || cat.id !== initialCategory.id).map((cat) => <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>)}
            </select>
            <p className="text-[10px] text-stone-400 mt-1">
              Pilih kategori induk jika kategori ini merupakan sub-bidang dari materi yang sudah ada.
            </p>
          </div>

          {
    /* Description */
  }
          <div>
            <label className="block text-xs font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
              Deskripsi Singkat
            </label>
            <textarea
    rows={3}
    placeholder="Jelaskan ruang lingkup atau batasan materi pembelajaran kategori ini..."
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    className="w-full bg-stone-50 dark:bg-zinc-850 border border-stone-200 dark:border-zinc-750 rounded-xl p-4 text-xs font-medium"
  />
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
    className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm"
  >
              <Save className="w-4 h-4" /> Simpan Kategori
            </button>
          </div>
        </form>

        {
    /* Info panel on the right */
  }
        <div className="md:col-span-5 bg-amber-50/20 dark:bg-zinc-800/10 rounded-2xl border border-amber-100/50 dark:border-zinc-800 p-5 space-y-4">
          <h4 className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <Info className="w-4 h-4" /> Struktur Hirarki Kategori
          </h4>
          <p className="text-xs text-stone-500 dark:text-zinc-400 leading-relaxed">
            Kurikulum kami disusun secara multi-level sehingga sub-kategori bisa digabung menjadi program studi terpadu.
          </p>

          <div className="space-y-3 pt-2">
            <div className="text-xs font-semibold text-stone-600 dark:text-zinc-300">
              Pratinjau Hirarki Baru:
            </div>
            <div className="bg-white dark:bg-zinc-850 p-4 rounded-xl border border-stone-150 dark:border-zinc-800 text-xs font-mono space-y-1">
              <div className="text-stone-400">
                {parentCategory ? `[Induk: ${parentCategory.name}]` : "[Kategori Utama]"}
              </div>
              <div className="text-[#e8b81a] font-bold pl-4 border-l border-stone-200">
                ↳ {name || "Kategori Baru..."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
