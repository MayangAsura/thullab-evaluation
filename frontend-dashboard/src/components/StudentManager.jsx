import { useState } from "react";
import { INDONESIAN_CITIES } from "../mockData";
import {
  Phone,
  Mail,
  MapPin,
  ArrowLeft,
  BookOpen,
  ChevronRight
} from "lucide-react";
export const StudentManager = ({
  students,
  onSave,
  onCancel,
  addToast
}) => {
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDomicile, setFilterDomicile] = useState("");
  const [sortField, setSortField] = useState("fullName");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
    setCurrentPage(1);
  };
  const filteredStudents = students.filter((s) => {
    const matchesSearch = s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || s.email.toLowerCase().includes(searchQuery.toLowerCase()) || s.phoneNumber.includes(searchQuery);
    const matchesDomicile = filterDomicile ? s.domicile === filterDomicile : true;
    return matchesSearch && matchesDomicile;
  });
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    let valA = "";
    let valB = "";
    if (sortField === "fullName") {
      valA = a.fullName.toLowerCase();
      valB = b.fullName.toLowerCase();
    } else if (sortField === "email") {
      valA = a.email.toLowerCase();
      valB = b.email.toLowerCase();
    } else if (sortField === "domicile") {
      valA = a.domicile.toLowerCase();
      valB = b.domicile.toLowerCase();
    } else if (sortField === "status") {
      valA = a.status.toLowerCase();
      valB = b.status.toLowerCase();
    } else if (sortField === "classes") {
      valA = a.classList.length;
      valB = b.classList.length;
    }
    if (valA < valB) return sortDirection === "asc" ? -1 : 1;
    if (valA > valB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });
  const totalPages = Math.ceil(sortedStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = sortedStudents.slice(startIndex, startIndex + itemsPerPage);
  const selectedStudent = students.find((s) => s.id === selectedStudentId);
  const handleToggleStatus = (student) => {
    const updated = {
      ...student,
      status: student.status === "active" ? "inactive" : "active"
    };
    onSave(updated);
    addToast(`Status ${student.fullName} diubah menjadi ${updated.status}!`, "success");
  };
  const getStatusBadge = (status) => {
    return status === "active" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400" : "bg-stone-100 text-stone-600 dark:bg-zinc-800 dark:text-zinc-400";
  };
  const getProgressStatusBadge = (status) => {
    switch (status) {
      case "initiate":
        return "bg-stone-100 text-stone-600 dark:bg-zinc-800 text-[10px] uppercase font-bold";
      case "in-proggress":
        return "bg-amber-100 text-amber-800 dark:bg-amber-950/20 dark:text-amber-400 text-[10px] uppercase font-bold";
      case "complete":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400 text-[10px] uppercase font-bold";
    }
  };
  return <div className="space-y-6">
      {
    /* Title */
  }
      <div className="bg-gradient-to-r from-stone-900 to-amber-950 rounded-3xl p-6 text-white flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest bg-amber-500/20 px-3 py-1 rounded-full text-[#e8b81a]">
            Portal Siswa
          </span>
          <h2 className="text-xl sm:text-2xl font-display font-bold mt-1.5">
            Manajemen Kelas & Detail Siswa
          </h2>
        </div>
        {selectedStudentId && <button
    onClick={() => setSelectedStudentId(null)}
    className="bg-white/10 hover:bg-white/20 text-white rounded-xl px-4 py-2 text-xs font-semibold flex items-center gap-1.5 border border-white/10"
  >
            <ArrowLeft className="w-4 h-4" /> Kembali ke List
          </button>}
      </div>

      {!selectedStudentId ? <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {
    /* List panel */
  }
          <div className="lg:col-span-12 space-y-4">
            <div className="bg-white dark:bg-zinc-900 border border-stone-100 dark:border-zinc-800 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row items-center gap-4 justify-between">
              <input
    type="text"
    placeholder="Cari nama siswa, email atau no. handphone..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-full sm:max-w-md bg-stone-50 dark:bg-zinc-850 border border-stone-250/60 dark:border-zinc-750 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none"
  />

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <span className="text-xs text-stone-400 font-bold shrink-0">Kota Domisili:</span>
                <select
    value={filterDomicile}
    onChange={(e) => setFilterDomicile(e.target.value)}
    className="bg-stone-50 dark:bg-zinc-850 border border-stone-250/60 text-xs font-semibold px-3 py-2 rounded-xl focus:outline-none"
  >
                  <option value="">Semua Kota</option>
                  {INDONESIAN_CITIES.slice(0, 15).map((city) => <option key={city} value={city}>{city}</option>)}
                </select>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-stone-100 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-stone-50 dark:bg-zinc-850/50 border-b border-stone-100 dark:border-zinc-800 text-[10px] font-bold text-stone-400 uppercase tracking-wider select-none">
                      <th onClick={() => handleSort("fullName")} className="p-4 cursor-pointer hover:bg-stone-100 dark:hover:bg-zinc-800 transition-colors">
                        Nama Lengkap {sortField === "fullName" ? sortDirection === "asc" ? "\u25B2" : "\u25BC" : ""}
                      </th>
                      <th onClick={() => handleSort("email")} className="p-4 cursor-pointer hover:bg-stone-100 dark:hover:bg-zinc-800 transition-colors">
                        Kontak / Email {sortField === "email" ? sortDirection === "asc" ? "\u25B2" : "\u25BC" : ""}
                      </th>
                      <th onClick={() => handleSort("domicile")} className="p-4 cursor-pointer hover:bg-stone-100 dark:hover:bg-zinc-800 transition-colors">
                        Kota Domisili {sortField === "domicile" ? sortDirection === "asc" ? "\u25B2" : "\u25BC" : ""}
                      </th>
                      <th onClick={() => handleSort("status")} className="p-4 text-center cursor-pointer hover:bg-stone-100 dark:hover:bg-zinc-800 transition-colors">
                        Status {sortField === "status" ? sortDirection === "asc" ? "\u25B2" : "\u25BC" : ""}
                      </th>
                      <th onClick={() => handleSort("classes")} className="p-4 text-center cursor-pointer hover:bg-stone-100 dark:hover:bg-zinc-800 transition-colors">
                        Jumlah Kelas {sortField === "classes" ? sortDirection === "asc" ? "\u25B2" : "\u25BC" : ""}
                      </th>
                      <th className="p-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-zinc-800/80 text-xs font-medium">
                    {paginatedStudents.map((s) => <tr key={s.id} className="hover:bg-stone-50/50 dark:hover:bg-zinc-850/20 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-amber-100 dark:bg-zinc-800 text-[#e8b81a] rounded-lg flex items-center justify-center font-bold">
                              {s.fullName.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-stone-800 dark:text-zinc-200">{s.fullName}</p>
                              <p className="text-[10px] text-stone-400">{s.address}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="text-stone-700 dark:text-zinc-300">{s.phoneNumber}</p>
                          <p className="text-[10px] text-stone-400">{s.email}</p>
                        </td>
                        <td className="p-4 font-semibold text-stone-600 dark:text-zinc-400">
                          {s.domicile}
                        </td>
                        <td className="p-4 text-center">
                          <button
    type="button"
    onClick={() => handleToggleStatus(s)}
    className={`px-2.5 py-1 text-[10px] font-bold rounded-full ${getStatusBadge(s.status)}`}
  >
                            {s.status === "active" ? "Aktif" : "Nonaktif"}
                          </button>
                        </td>
                        <td className="p-4 text-center font-bold text-stone-700 dark:text-zinc-300">
                          {s.classList.length} Kelas
                        </td>
                        <td className="p-4 text-right">
                          <button
    onClick={() => setSelectedStudentId(s.id)}
    className="text-xs font-bold text-[#e8b81a] hover:underline flex items-center gap-0.5 ml-auto"
  >
                            Lihat Detail <ChevronRight className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div>

              {
    /* Pagination controls */
  }
              {totalPages > 1 && <div className="flex items-center justify-between px-4 py-3 bg-stone-50 dark:bg-zinc-900 border-t border-stone-100 dark:border-zinc-850">
                  <span className="text-xs font-bold text-stone-500">
                    Halaman {currentPage} dari {totalPages}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
    type="button"
    disabled={currentPage === 1}
    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
    className="px-3 py-1.5 bg-white dark:bg-zinc-800 hover:bg-stone-100 dark:hover:bg-zinc-750 text-xs font-bold text-stone-750 dark:text-zinc-300 border border-stone-200 dark:border-zinc-700 rounded-lg disabled:opacity-40 transition-colors"
  >
                      Sebelumnya
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => <button
    key={page}
    type="button"
    onClick={() => setCurrentPage(page)}
    className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors ${currentPage === page ? "bg-stone-900 text-white border-stone-900 dark:bg-zinc-700 dark:border-zinc-650" : "bg-white dark:bg-zinc-800 hover:bg-stone-100 dark:hover:bg-zinc-750 text-stone-750 dark:text-zinc-300 border-stone-200 dark:border-zinc-700"}`}
  >
                        {page}
                      </button>)}
                    <button
    type="button"
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
    className="px-3 py-1.5 bg-white dark:bg-zinc-800 hover:bg-stone-100 dark:hover:bg-zinc-750 text-xs font-bold text-stone-750 dark:text-zinc-300 border border-stone-200 dark:border-zinc-700 rounded-lg disabled:opacity-40 transition-colors"
  >
                      Berikutnya
                    </button>
                  </div>
                </div>}
            </div>
          </div>
        </div> : selectedStudent && <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {
    /* Left Info Panel */
  }
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white dark:bg-zinc-900 border border-stone-100 dark:border-zinc-800 rounded-3xl p-6 space-y-6 shadow-xs text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-500 to-yellow-600" />
                
                <div className="w-20 h-20 bg-amber-50 dark:bg-zinc-800 text-[#e8b81a] rounded-full flex items-center justify-center font-display text-3xl font-bold mx-auto border-4 border-amber-100">
                  {selectedStudent.fullName.charAt(0)}
                </div>

                <div>
                  <h3 className="text-lg font-display font-bold text-stone-800 dark:text-zinc-150">
                    {selectedStudent.fullName}
                  </h3>
                  <span className={`inline-block mt-1 px-3 py-1 text-[10px] font-bold rounded-full ${getStatusBadge(selectedStudent.status)}`}>
                    Siswa {selectedStudent.status === "active" ? "Aktif" : "Nonaktif"}
                  </span>
                </div>

                <div className="space-y-3.5 text-left border-t border-stone-100 dark:border-zinc-800 pt-5 text-xs text-stone-600 dark:text-zinc-300 font-medium">
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-stone-400 shrink-0" />
                    <span>{selectedStudent.phoneNumber}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-stone-400 shrink-0" />
                    <span>{selectedStudent.email}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-stone-400 shrink-0" />
                    <div>
                      <p>{selectedStudent.address}</p>
                      <p className="text-[10px] text-amber-600 font-bold">{selectedStudent.domicile}</p>
                    </div>
                  </div>
                </div>
              </div>

              {
    /* Status quick toggle */
  }
              <div className="bg-stone-50 dark:bg-zinc-900 border border-stone-150 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-stone-700 dark:text-zinc-300">Ubah Status Akun</p>
                  <p className="text-[10px] text-stone-400">Aktifkan atau nonaktifkan akses siswa</p>
                </div>
                <button
    onClick={() => handleToggleStatus(selectedStudent)}
    className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${selectedStudent.status === "active" ? "bg-stone-800 hover:bg-stone-900 text-white" : "bg-[#e8b81a] hover:bg-amber-600 text-white"}`}
  >
                  {selectedStudent.status === "active" ? "Nonaktifkan" : "Aktifkan"}
                </button>
              </div>
            </div>

            {
    /* Right Class List Panel */
  }
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white dark:bg-zinc-900 border border-stone-100 dark:border-zinc-800 rounded-3xl p-6 shadow-xs space-y-5">
                <div className="border-b border-stone-100 dark:border-zinc-800 pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-stone-800 dark:text-zinc-100 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-[#e8b81a]" /> Daftar Kelas Terdaftar (Class List)
                    </h3>
                    <p className="text-xs text-stone-400">Siswa mengambil {selectedStudent.classList.length} kelas aktif.</p>
                  </div>
                </div>

                {selectedStudent.classList.length === 0 ? <div className="text-center py-10 text-stone-400 text-xs italic">
                    Belum terdaftar di kelas manapun.
                  </div> : <div className="space-y-4">
                    {selectedStudent.classList.map((c, idx) => <div
    key={idx}
    className="bg-stone-50/70 dark:bg-zinc-850 p-4 rounded-2xl border border-stone-200/60 dark:border-zinc-800 space-y-3"
  >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <h4 className="text-sm font-bold text-stone-800 dark:text-zinc-100">{c.name}</h4>
                            <div className="flex flex-wrap gap-2 mt-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-400">
                              <span>Kategori: {c.category}</span>
                              <span>&bull;</span>
                              <span>Level: {c.level}</span>
                              <span>&bull;</span>
                              <span>Author: {c.author}</span>
                            </div>
                          </div>

                          <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold self-start sm:self-center ${getProgressStatusBadge(c.status)}`}>
                            {c.status}
                          </span>
                        </div>

                        {
    /* Progress Bar */
  }
                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-[10px] font-bold text-stone-500 dark:text-zinc-400">
                            <span>Progres Pembelajaran</span>
                            <span>{c.learningProgress}%</span>
                          </div>
                          <div className="w-full bg-stone-200 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                            <div
    className="bg-gradient-to-r from-amber-500 to-yellow-600 h-full rounded-full transition-all duration-500"
    style={{ width: `${c.learningProgress}%` }}
  />
                          </div>
                        </div>
                      </div>)}
                  </div>}
              </div>
            </div>
          </div>}
    </div>;
};
