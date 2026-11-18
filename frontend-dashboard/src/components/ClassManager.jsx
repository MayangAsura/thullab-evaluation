import { useState, useEffect } from "react";
import { api } from "../lib/api";
import {
  ArrowLeft,
  Upload,
  RotateCcw,
  FileText,
  Save,
  UserSquare2,
  Clock,
  Folder,
  CheckCircle
} from "lucide-react";

export const ClassManager = ({
  initialClass,
  viewState,
  onCancel,
  onSaveSuccess,
  addToast
}) => {
  const [apiCategories, setApiCategories] = useState([]);
  const [apiAuthors, setApiAuthors] = useState([]);
  const [loadingLists, setLoadingLists] = useState(true);
  const [name, setName] = useState("");
  const [level, setLevel] = useState("pemula");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [learningHour, setLearningHour] = useState(60);
  const [description, setDescription] = useState("");
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    const fetchApiData = async () => {
      setLoadingLists(true);
      try {
        const [catRes, authRes] = await Promise.all([
          api.get("/categories"),
          api.get("/authors")
        ]);
        setApiCategories(catRes.data);
        setApiAuthors(authRes.data);
        if (catRes.data.length > 0 && !category) {
          setCategory(catRes.data[0].id);
        }
      } catch (err) {
        addToast("Gagal memuat kategori dan penulis dari API.", "error");
      } finally {
        setLoadingLists(false);
      }
    };
    fetchApiData();
  }, []);

  useEffect(() => {
    if (initialClass && viewState !== "create") {
      setName(initialClass.name);
      setLevel(initialClass.level);
      setCategory(initialClass.category);
      setImageUrl(initialClass.image);
      setLearningHour(initialClass.learningHour);
      setDescription(initialClass.description);
      setSelectedAuthors(initialClass.authors || []);
    } else {
      handleReset();
    }
  }, [initialClass, viewState]);

  const handleReset = () => {
    setName("");
    setLevel("pemula");
    setCategory(apiCategories[0]?.id || "");
    setImageUrl("");
    setLearningHour(60);
    setDescription("");
    setSelectedAuthors([]);
  };
  const handleImageFileChange = async (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      addToast("File yang diunggah harus berupa gambar.", "warning");
      return;
    }
    setUploadingImage(true);
    addToast("Mengupload gambar ke Cloudinary API...", "info");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await api.post("/cloudinary/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setImageUrl(res.data.secure_url);
      addToast("Gambar berhasil diunggah ke Cloudinary!", "success");
    } catch (err) {
      addToast("Gagal mengupload gambar ke Cloudinary.", "error");
    } finally {
      setUploadingImage(false);
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };
  const handleDragLeave = () => {
    setDragOver(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageFileChange(e.dataTransfer.files[0]);
    }
  };
  const handleAuthorToggle = (authorId) => {
    setSelectedAuthors(
      (prev) => prev.includes(authorId) ? prev.filter((id) => id !== authorId) : [...prev, authorId]
    );
  };
  const handleSubmitForm = async (statusType) => {
    if (!name.trim()) {
      addToast("Nama kelas wajib diisi.", "warning");
      return;
    }
    // if (!category) {
    //   addToast("Silakan pilih kategori terlebih dahulu.", "warning");
    //   return;
    // }
    if (!imageUrl) {
      addToast("Silakan unggah gambar kelas terlebih dahulu.", "warning");
      return;
    }
    if (selectedAuthors.length === 0) {
      addToast("Silakan pilih minimal satu pengarang/author.", "warning");
      return;
    }
    const payload = {
      name: name.trim(),
      level,
      category,
      image: imageUrl,
      learningHour: Number(learningHour) || 60,
      description: description.trim(),
      authors: selectedAuthors,
      status: statusType
    };

    console.log('payload', payload)
    try {
      if (initialClass && viewState === "edit") {
        await api.put(`/classes/${initialClass.id}`, payload);
        onSaveSuccess(`Kelas "${name}" berhasil diperbarui dengan status ${statusType === "save" ? "Aktif (Save)" : "Draf"}!`);
      } else {
        await api.post("/classes", payload);
        onSaveSuccess(`Kelas baru "${name}" berhasil dibuat dengan status ${statusType === "save" ? "Aktif (Save)" : "Draf"}!`);
      }
    } catch (err) {
      addToast("Terjadi kesalahan saat menyimpan data kelas.", "error");
    }
  };
  const getCategoryName = (catId) => {
    const c = apiCategories.find((item) => item.id === catId);
    return c ? c.name : "Kategori Utama";
  };
  if (viewState === "detail" && initialClass) {
    const classCategory = apiCategories.find((cat) => cat.id === initialClass.category);
    const authorsList = apiAuthors.filter((auth) => initialClass.authors?.includes(auth.id));
    return <div className="space-y-6">
        <div className="flex items-center justify-between bg-white dark:bg-zinc-900 border border-stone-200/60 dark:border-zinc-800 rounded-3xl p-5 shadow-xs">
          <div className="flex items-center gap-3">
            <button
      onClick={onCancel}
      className="p-2 hover:bg-stone-100 dark:hover:bg-zinc-800 rounded-xl transition-all"
    >
              <ArrowLeft className="w-5 h-5 text-stone-600 dark:text-zinc-400" />
            </button>
            <div>
              <h3 className="text-lg font-display font-bold text-stone-800 dark:text-zinc-100">
                Detail Kelas Edukasi
              </h3>
              <p className="text-xs text-stone-400">Pratinjau silabus lengkap kelas kurikulum.</p>
            </div>
          </div>
          <span className={`px-3 py-1 text-xs font-bold rounded-full ${initialClass.status === "save" ? "bg-emerald-100 text-emerald-800 border border-emerald-200" : "bg-amber-100 text-amber-800 border border-amber-200"}`}>
            {initialClass.status === "save" ? "Save / Aktif" : "Draft"}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {
      /* Main Hero Image & Basic Stats */
    }
          <div className="lg:col-span-4 bg-white dark:bg-zinc-900 border border-stone-100 dark:border-zinc-800 rounded-3xl p-5 space-y-5 shadow-xs">
            <img
      src={initialClass.image}
      alt={initialClass.name}
      className="w-full aspect-[4/3] object-cover rounded-2xl border border-stone-200"
      referrerPolicy="no-referrer"
    />
            <div className="space-y-3">
              <div>
                <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">Tingkatan Level</span>
                <span className="capitalize text-xs font-bold bg-amber-50 dark:bg-zinc-800 text-[#e8b81a] px-2.5 py-1 rounded-md inline-block mt-1">
                  {initialClass.level}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">Kategori Program</span>
                <span className="text-xs font-bold text-stone-700 dark:text-zinc-300 inline-block mt-1 flex items-center gap-1.5">
                  <Folder className="w-4 h-4 text-[#e8b81a]" /> {classCategory ? classCategory.name : initialClass.category}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">Durasi Belajar</span>
                <span className="text-xs font-bold text-stone-700 dark:text-zinc-300 inline-block mt-1 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-stone-400" /> {initialClass.learningHour} Menit
                </span>
              </div>
            </div>
          </div>

          {
      /* Description & Multi-Authors list */
    }
          <div className="lg:col-span-8 bg-white dark:bg-zinc-900 border border-stone-100 dark:border-zinc-800 rounded-3xl p-6 space-y-6 shadow-xs">
            <div>
              <h2 className="text-xl font-display font-bold text-stone-900 dark:text-zinc-100">{initialClass.name}</h2>
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-1">
                Dibuat pada: {new Date(initialClass.createdAt).toLocaleDateString("id-ID", { dateStyle: "long" })}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-stone-400" /> Deskripsi Kelas
              </h4>
              <p className="text-xs text-stone-600 dark:text-zinc-300 leading-relaxed font-medium">
                {initialClass.description || "Tidak ada deskripsi untuk kelas ini."}
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-stone-100 dark:border-zinc-800">
              <h4 className="text-xs font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                <UserSquare2 className="w-4 h-4 text-stone-400" /> Instruktur / Authors ({authorsList.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {authorsList.map((auth) => <div key={auth.id} className="flex items-center gap-3 p-3 bg-stone-50/50 dark:bg-zinc-850 rounded-2xl border border-stone-150">
                    <div className="w-8 h-8 bg-amber-50 text-[#e8b81a] font-bold text-sm rounded-lg flex items-center justify-center">
                      {auth.fullName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-stone-800 dark:text-zinc-200">{auth.fullName}</p>
                      <p className="text-[9px] text-stone-400 font-bold">{auth.phoneNumber}</p>
                    </div>
                  </div>)}
              </div>
            </div>
          </div>
        </div>
      </div>;
  }
  return <div className="space-y-6">
      {
    /* Title Header */
  }
      <div className="bg-gradient-to-r from-amber-500 via-[#e8b81a] to-yellow-600 rounded-3xl p-6 text-white shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="bg-white/20 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            Manajemen Kelas
          </span>
          <h2 className="text-xl sm:text-2xl font-display font-bold mt-1.5">
            {viewState === "create" ? "Buat Kelas Baru" : "Edit Detail Kelas"}
          </h2>
          <p className="text-white/80 text-xs mt-1">
            Gunakan formulir di bawah ini untuk membuat draf kelas atau langsung mendaftarkan kurikulum aktif.
          </p>
        </div>
        <button
    type="button"
    onClick={onCancel}
    className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border border-white/10 transition-all shrink-0"
  >
          <ArrowLeft className="w-3.5 h-3.5" /> Batal
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {
    /* Core Inputs Section */
  }
        <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-stone-200/60 dark:border-zinc-800 rounded-3xl p-6 space-y-5 shadow-xs">

          {
    /* Class Name */
  }
          <div>
            <label className="block text-xs font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
              Nama Kelas <span className="text-rose-500">*</span>
            </label>
            <input
    type="text"
    required
    value={name}
    onChange={(e) => setName(e.target.value)}
    placeholder="Contoh: Mastering Next.js dan TypeScript Fullstack"
    className="w-full bg-stone-50 dark:bg-zinc-850 border border-stone-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#e8b81a]"
  />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {
    /* Category Select */
  }
            {/* <div>
              <label className="block text-xs font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                Kategori Program <span className="text-rose-500">*</span>
              </label>
              <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className="w-full bg-stone-50 dark:bg-zinc-850 border border-stone-200 dark:border-zinc-700 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#e8b81a]"
  >
                {apiCategories.map((cat) => <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>)}
              </select>
            </div> */}

            {
    /* Level Select */
  }
            <div>
              <label className="block text-xs font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                Tingkatan Level <span className="text-rose-500">*</span>
              </label>
              <select
    value={level}
    onChange={(e) => setLevel(e.target.value)}
    className="w-full bg-stone-50 dark:bg-zinc-850 border border-stone-200 dark:border-zinc-700 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#e8b81a]"
  >
                <option value="pemula">Pemula</option>
                <option value="menengah">Menengah</option>
                <option value="ahli">Ahli (Expert)</option>
              </select>
            </div>
          </div>

          {
    /* Learning Hours in minutes */
  }
          <div>
            <label className="block text-xs font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Jam Belajar (Menit) <span className="text-rose-500">*</span>
            </label>
            <input
    type="number"
    min="1"
    required
    value={learningHour}
    onChange={(e) => setLearningHour(Math.max(1, parseInt(e.target.value) || 0))}
    className="w-full bg-stone-50 dark:bg-zinc-850 border border-stone-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#e8b81a]"
  />
          </div>

          {
    /* Description */
  }
          <div>
            <label className="block text-xs font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
              Deskripsi Lengkap Kelas
            </label>
            <textarea
    rows={4}
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    placeholder="Jelaskan secara detail mengenai materi kelas, sasaran, prasyarat, dan modul pembelajaran..."
    className="w-full bg-stone-50 dark:bg-zinc-850 border border-stone-200 dark:border-zinc-700 rounded-xl p-4 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#e8b81a]"
  />
          </div>
        </div>

        {
    /* Media Upload & Multi-Author checklist Column */
  }
        <div className="lg:col-span-5 space-y-6">

          {
    /* Cloudinary Image Upload Section */
  }
          <div className="bg-white dark:bg-zinc-900 border border-stone-200/60 dark:border-zinc-800 rounded-3xl p-5 shadow-xs space-y-4">
            <h4 className="text-xs font-bold text-stone-700 dark:text-zinc-300 uppercase tracking-wider">
              Foto Cover Kelas (Cloudinary API)
            </h4>

            {imageUrl ? <div className="space-y-3">
                <div className="relative rounded-2xl overflow-hidden border border-stone-200 aspect-video group">
                  <img
    src={imageUrl}
    alt="Class Cover"
    className="w-full h-full object-cover"
    referrerPolicy="no-referrer"
  />
                  <div className="absolute inset-0 bg-stone-900/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <button
    type="button"
    onClick={() => setImageUrl("")}
    className="text-xs bg-rose-600 hover:bg-rose-700 text-white font-bold py-1.5 px-3 rounded-lg"
  >
                      Hapus &amp; Ganti
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-semibold bg-emerald-50 dark:bg-zinc-850 p-2 rounded-lg">
                  <CheckCircle className="w-3.5 h-3.5 shrink-0" /> Cloudinary URL Terdaftar!
                </div>
              </div> : <div
    onDragOver={handleDragOver}
    onDragLeave={handleDragLeave}
    onDrop={handleDrop}
    className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${dragOver ? "border-[#e8b81a] bg-amber-50/20" : "border-stone-200 dark:border-zinc-850 hover:border-[#e8b81a]"}`}
    onClick={() => document.getElementById("class-image-picker")?.click()}
  >
                <input
    type="file"
    id="class-image-picker"
    className="hidden"
    accept="image/*"
    onChange={(e) => {
      if (e.target.files && e.target.files[0]) {
        handleImageFileChange(e.target.files[0]);
      }
    }}
  />

                {uploadingImage ? <div className="space-y-2 py-4">
                    <div className="w-6 h-6 border-2 border-[#e8b81a] border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Mengunggah...</p>
                  </div> : <div className="space-y-2">
                    <Upload className="w-6 h-6 text-stone-300 mx-auto" />
                    <p className="text-xs font-bold text-stone-700 dark:text-zinc-300">Tarik gambar ke sini, atau Klik</p>
                    <p className="text-[10px] text-stone-400 font-semibold uppercase">Mendukung file JPG, PNG maks 2MB</p>
                  </div>}
              </div>}
          </div>

          {
    /* Multi-Select Authors Checklist Section */
  }
          <div className="bg-white dark:bg-zinc-900 border border-stone-200/60 dark:border-zinc-800 rounded-3xl p-5 shadow-xs space-y-4">
            <h4 className="text-xs font-bold text-stone-700 dark:text-zinc-300 uppercase tracking-wider">
              Pilih Pengarang / Authors <span className="text-rose-500">*</span>
            </h4>
            <p className="text-[10px] text-stone-400 font-medium">Anda dapat mencentang lebih dari satu pengarang dari database API.</p>

            {loadingLists ? <div className="py-4 text-center text-xs text-stone-400">Memuat authors...</div> : <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                {apiAuthors.map((auth) => {
    const isChecked = selectedAuthors.includes(auth.id);
    return <label
      key={auth.id}
      className={`flex items-center gap-3 p-2.5 rounded-xl border cursor-pointer transition-colors ${isChecked ? "border-[#e8b81a] bg-amber-50/20" : "border-stone-100 dark:border-zinc-850 hover:bg-stone-50"}`}
    >
                      <input
      type="checkbox"
      checked={isChecked}
      onChange={() => handleAuthorToggle(auth.id)}
      className="accent-[#e8b81a] w-4 h-4 rounded"
    />
                      <div className="text-xs font-bold text-stone-800 dark:text-zinc-200">
                        {auth.fullName}
                        <p className="text-[9px] text-stone-400 font-normal mt-0.5">{auth.phoneNumber}</p>
                      </div>
                    </label>;
  })}
              </div>}
          </div>
        </div>
      </div>

      {
    /* Form Buttons Footer */
  }
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-stone-200/60 dark:border-zinc-800">
        {
    /* Reset button on the left */
  }
        <button
    type="button"
    onClick={handleReset}
    className="w-full sm:w-auto px-5 py-2.5 bg-stone-150 hover:bg-stone-200 text-stone-600 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
  >
          <RotateCcw className="w-4 h-4" /> Reset Formulir
        </button>

        {
    /* Draft & Save on the right */
  }
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
          <button
    type="button"
    onClick={() => handleSubmitForm("draft")}
    className="w-full sm:w-auto px-6 py-2.5 bg-[#e8b81a]/10 hover:bg-[#e8b81a]/20 text-[#e8b81a] border border-[#e8b81a]/30 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
  >
            Draft (Draf)
          </button>
          <button
    type="button"
    onClick={() => handleSubmitForm("save")}
    className="w-full sm:w-auto px-7 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white text-xs font-extrabold rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all"
  >
            <Save className="w-4 h-4" /> Save (Aktif)
          </button>
        </div>
      </div>
    </div>;
};
