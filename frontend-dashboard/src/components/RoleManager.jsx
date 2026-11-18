import { useState, useEffect } from "react";
import { ArrowLeft, Save, CheckSquare, Square, ChevronDown, ChevronRight, HelpCircle } from "lucide-react";
const ALL_PERMISSION_GROUPS = [
  {
    id: "group-learning",
    groupLabel: "Manajemen Kurikulum & Pembelajaran",
    permissions: [
      { id: "learning.create", label: "Buat Materi Pembelajaran Baru" },
      { id: "learning.edit", label: "Ubah / Edit Materi Pembelajaran" },
      { id: "learning.delete", label: "Hapus Materi Pembelajaran" },
      { id: "learning.detail", label: "Akses Detail & Pertanyaan" }
    ]
  },
  {
    id: "group-category",
    groupLabel: "Pengaturan Kategori & Bidang",
    permissions: [
      { id: "category.create", label: "Tambah Kategori Kurikulum" },
      { id: "category.edit", label: "Ubah Kategori Kurikulum" },
      { id: "category.delete", label: "Hapus Kategori Kurikulum" }
    ]
  },
  {
    id: "group-student",
    groupLabel: "Portal Siswa & Progres Belajar",
    permissions: [
      { id: "student.detail", label: "Lihat Rekam Jejak / Detail Siswa" }
    ]
  },
  {
    id: "group-speaker",
    groupLabel: "Manajemen Instruktur / Speaker",
    permissions: [
      { id: "speaker.create", label: "Daftarkan Speaker Baru" },
      { id: "speaker.edit", label: "Ubah Data Speaker" },
      { id: "speaker.delete", label: "Hapus Registrasi Speaker" }
    ]
  },
  {
    id: "group-registrant",
    groupLabel: "Manajemen Registran & Pendaftaran",
    permissions: [
      { id: "registrant.create", label: "Tambah Calon Registran Baru" },
      { id: "registrant.edit", label: "Ubah Status Kelulusan Registran" },
      { id: "registrant.delete", label: "Hapus Registran Waiting List" }
    ]
  },
  {
    id: "group-user",
    groupLabel: "Manajemen Pengguna Internal",
    permissions: [
      { id: "user.create", label: "Undang Pengguna Baru" },
      { id: "user.edit", label: "Ubah Peran Pengguna" },
      { id: "user.delete", label: "Cabut Akses Pengguna" }
    ]
  },
  {
    id: "group-role",
    groupLabel: "Konfigurasi Hak Akses (Role)",
    permissions: [
      { id: "role.create", label: "Buat Peran Baru (Role)" },
      { id: "role.edit", label: "Modifikasi Matriks Izin Akses" },
      { id: "role.delete", label: "Hapus Peran (Role)" }
    ]
  }
];
export const RoleManager = ({
  initialRole,
  onSave,
  onCancel,
  addToast
}) => {
  const [name, setName] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [expandedGroups, setExpandedGroups] = useState(["group-learning"]);
  useEffect(() => {
    if (initialRole) {
      setName(initialRole.name);
      setSelectedPermissions(initialRole.access);
    } else {
      setName("");
      setSelectedPermissions([]);
    }
  }, [initialRole]);
  const toggleGroupExpand = (groupId) => {
    setExpandedGroups(
      (prev) => prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]
    );
  };
  const isGroupFullyChecked = (group) => {
    return group.permissions.every((p) => selectedPermissions.includes(p.id));
  };
  const isGroupPartiallyChecked = (group) => {
    const checkedCount = group.permissions.filter((p) => selectedPermissions.includes(p.id)).length;
    return checkedCount > 0 && checkedCount < group.permissions.length;
  };
  const handleToggleGroup = (group) => {
    const groupPermIds = group.permissions.map((p) => p.id);
    const fullyChecked = isGroupFullyChecked(group);
    if (fullyChecked) {
      setSelectedPermissions((prev) => prev.filter((pId) => !groupPermIds.includes(pId)));
    } else {
      setSelectedPermissions((prev) => {
        const added = groupPermIds.filter((id) => !prev.includes(id));
        return [...prev, ...added];
      });
    }
  };
  const handleTogglePermission = (permId) => {
    setSelectedPermissions(
      (prev) => prev.includes(permId) ? prev.filter((id) => id !== permId) : [...prev, permId]
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      addToast("Nama Role wajib diisi", "warning");
      return;
    }
    if (selectedPermissions.length === 0) {
      addToast("Pilih minimal satu hak akses izin", "warning");
      return;
    }
    onSave({
      ...initialRole ? { id: initialRole.id } : {},
      name: name.trim(),
      access: selectedPermissions
    });
  };
  return <div className="bg-white dark:bg-zinc-900 border border-stone-100 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-xl">
      <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-[#e8b81a] p-6 text-white flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest bg-white/20 px-2.5 py-1 rounded-full text-[#e8b81a]">
            Role & Hak Akses
          </span>
          <h2 className="text-xl sm:text-2xl font-display font-bold mt-1.5">
            {initialRole ? `Ubah Peran: ${initialRole.name}` : "Buat Peran / Role Baru"}
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

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-6 space-y-6">
          <div>
            <label className="block text-xs font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
              Nama Peran / Jabatan <span className="text-rose-500">*</span>
            </label>
            <input
    type="text"
    required
    placeholder="Contoh: Manager Ops, Penilai Tugas"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="w-full bg-stone-50 dark:bg-zinc-850 border border-stone-200 dark:border-zinc-750 rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#e8b81a]"
  />
          </div>

          <div className="bg-amber-50/20 dark:bg-zinc-800/20 p-5 rounded-2xl border border-amber-100/60 dark:border-zinc-800 text-xs text-[#b45309] space-y-2">
            <h4 className="font-bold flex items-center gap-1.5"><HelpCircle className="w-4 h-4 shrink-0" /> Panduan Pengisian</h4>
            <p className="leading-relaxed font-medium text-stone-600 dark:text-zinc-300">
              Hak akses bersifat nested. Anda dapat mencentang kotak grup utama untuk memberikan seluruh izin sub-menu secara instan, atau memilih izin tertentu satu per satu.
            </p>
          </div>
        </div>

        {
    /* Dynamic Nested Matriks / Checkboxes */
  }
        <div className="md:col-span-6 space-y-4">
          <label className="block text-xs font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
            Matriks Hak Akses (Nested & Multi-level Checkboxes)
          </label>

          <div className="border border-stone-200/80 dark:border-zinc-800 rounded-2xl overflow-hidden divide-y divide-stone-150/80">
            {ALL_PERMISSION_GROUPS.map((group) => {
    const expanded = expandedGroups.includes(group.id);
    const groupChecked = isGroupFullyChecked(group);
    const groupPartial = isGroupPartiallyChecked(group);
    return <div key={group.id} className="bg-stone-50/40 dark:bg-zinc-850/25">
                  {
      /* Group Header Checkbox */
    }
                  <div className="flex items-center justify-between p-3.5 hover:bg-stone-50 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <button
      type="button"
      onClick={() => handleToggleGroup(group)}
      className="text-[#e8b81a]"
    >
                        {groupChecked ? <CheckSquare className="w-5 h-5 fill-[#e8b81a] text-white" /> : groupPartial ? <div className="w-5 h-5 border-2 border-[#e8b81a] rounded flex items-center justify-center">
                            <div className="w-2.5 h-1 bg-[#e8b81a]" />
                          </div> : <Square className="w-5 h-5 text-stone-300" />}
                      </button>
                      <span className="text-xs font-bold text-stone-800 dark:text-zinc-200">
                        {group.groupLabel}
                      </span>
                    </div>

                    <button
      type="button"
      onClick={() => toggleGroupExpand(group.id)}
      className="text-stone-400 hover:text-stone-600"
    >
                      {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>
                  </div>

                  {
      /* Children Items */
    }
                  {expanded && <div className="pl-9 pr-4 pb-4 space-y-3 pt-1 border-t border-stone-100/50">
                      {group.permissions.map((perm) => {
      const permChecked = selectedPermissions.includes(perm.id);
      return <label
        key={perm.id}
        className="flex items-center gap-2.5 text-xs text-stone-600 dark:text-zinc-400 font-semibold cursor-pointer select-none"
      >
                            <input
        type="checkbox"
        checked={permChecked}
        onChange={() => handleTogglePermission(perm.id)}
        className="rounded-sm accent-[#e8b81a] w-4 h-4"
      />
                            <span>{perm.label}</span>
                          </label>;
    })}
                    </div>}
                </div>;
  })}
          </div>
        </div>

        <div className="md:col-span-12 flex justify-end gap-3 pt-6 border-t border-stone-100 dark:border-zinc-800">
          <button
    type="button"
    onClick={onCancel}
    className="px-6 py-2.5 bg-stone-100 hover:bg-stone-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-stone-600 dark:text-zinc-300 font-semibold rounded-xl text-xs"
  >
            Batalkan
          </button>
          <button
    type="submit"
    className="px-8 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md"
  >
            <Save className="w-4 h-4" /> Simpan Role Peran
          </button>
        </div>
      </form>
    </div>;
};
