import { useState, useEffect } from "react";
import {
  MOCK_CATEGORIES,
  MOCK_ROLES,
  MOCK_USERS,
  MOCK_SPEAKERS,
  MOCK_STUDENTS,
  MOCK_REGISTRANTS,
  INITIAL_LEARNINGS
} from "./mockData";
import { LearningManager } from "./components/LearningManager";
import { CategoryManager } from "./components/CategoryManager";
import { StudentManager } from "./components/StudentManager";
import { SpeakerManager } from "./components/SpeakerManager";
import { RegistrantManager } from "./components/RegistrantManager";
import { UserManager } from "./components/UserManager";
import { RoleManager } from "./components/RoleManager";
import { AccountManager } from "./components/AccountManager";
import { SettingsManager } from "./components/SettingsManager";
import { ClassManager } from "./components/ClassManager";
import { LoginRegister } from "./components/LoginRegister";
import { ToastContainer } from "./components/Toast";
import { useAuth } from "./lib/auth";
import { api } from "./lib/api";
import {
  GraduationCap,
  BookOpen,
  FolderPlus,
  Users,
  UserSquare2,
  BadgePlus,
  ShieldAlert,
  UserCircle2,
  LayoutDashboard,
  Plus,
  Search,
  Edit3,
  Trash2,
  KeyRound,
  Compass,
  LogOut,
  ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { getLearningContents } from "./utils/learning_contents";
import { getSpeakers } from "./utils/speakers";
import { getUsers} from "./utils/users";
import { getStudents} from "./utils/students";
import { getRoles} from "./utils/roles";
import { getProfile } from "./utils/auth";

export default function App() {
  const [learnings, setLearnings] = useState([]);
  // () => {
  //   const saved = localStorage.getItem("edu_forge_learnings_db");
  //   return saved ? JSON.parse(saved) : INITIAL_LEARNINGS;
  // }
  const [categories, setCategories] = useState([]);
  // () => {
  //   const saved = localStorage.getItem("edu_forge_categories_db");
  //   return saved ? JSON.parse(saved) : MOCK_CATEGORIES;
  // }
  const [students, setStudents] = useState([]);
  // () => {
  //   const saved = localStorage.getItem("edu_forge_students_db");
  //   return saved ? JSON.parse(saved) : MOCK_STUDENTS;
  // }
  const [speakers, setSpeakers] = useState([]);
  // () => {
  //   const saved = localStorage.getItem("edu_forge_speakers_db");
  //   return saved ? JSON.parse(saved) : MOCK_SPEAKERS;
  // }
  const [registrants, setRegistrants] = useState([]);
  // () => {
  //   const saved = localStorage.getItem("edu_forge_registrants_db");
  //   return saved ? JSON.parse(saved) : MOCK_REGISTRANTS;
  // }
  const [users, setUsers] = useState([]);
  // () => {
  //   const saved = localStorage.getItem("edu_forge_users_db");
  //   return saved ? JSON.parse(saved) : MOCK_USERS;
  // }
  const [roles, setRoles] = useState([]);
  // () => {
  //   const saved = localStorage.getItem("edu_forge_roles_db");
  //   return saved ? JSON.parse(saved) : MOCK_ROLES;
  // }
  const [account, setAccount] = useState({});
  // () => {
  //   const saved = localStorage.getItem("edu_forge_account_db");
  //   return saved ? JSON.parse(saved) : {
  //     fullName: "Mhd. Mayang Asura",
  //     phoneNumber: "081234567890",
  //     email: "mayang.asura123@gmail.com",
  //     avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80"
  //   };
  // }
  const [activeModule, setActiveModule] = useState("dashboard");
  const [viewState, setViewState] = useState("list");
  const { userInfo, logout } = useAuth();
  const [avatarDropdownOpen, setAvatarDropdownOpen] = useState(false);
  const [classesList, setClassesList] = useState([]);
  const [loadingClasses, setLoadingClasses] = useState(false);
  const [activeClassId, setActiveClassId] = useState(null);
  const [learningSortField, setLearningSortField] = useState("name");
  const [learningSortDir, setLearningSortDir] = useState("asc");
  const [learningPage, setLearningPage] = useState(1);
  const [categorySortField, setCategorySortField] = useState("name");
  const [categorySortDir, setCategorySortDir] = useState("asc");
  const [categoryPage, setCategoryPage] = useState(1);
  const [userSortField, setUserSortField] = useState("fullName");
  const [userSortDir, setUserSortDir] = useState("asc");
  const [userPage, setUserPage] = useState(1);
  const [classSortField, setClassSortField] = useState("name");
  const [classSortDir, setClassSortDir] = useState("asc");
  const [classPage, setClassPage] = useState(1);
  const [classSearch, setClassSearch] = useState("");
  const [classLevelFilter, setClassLevelFilter] = useState("");

  useEffect(() => {

    getLearningDatas()
    getStudentDatas()
    getSpeakerDatas()
    getRoleDatas()
    getUserDatas()
    getAccount()

  }, [])

  const getLearningDatas = async () => {

    try {

      const learning_contents = await getLearningContents()

      setLearnings(Array.isArray(learning_contents)? learning_contents : [])

    } catch (error) {

    }
  }

  const getStudentDatas = async () => {

    try {

      const students = await getStudents()

      setStudents(Array.isArray(students)? students : [])

    } catch (error) {

      toasts.error("Error when get students", error)

    }
  }

  const getSpeakerDatas = async () => {

    try {

      const speakers = await getSpeakers()

      setSpeakers(Array.isArray(speakers)? speakers : [])

    } catch (error) {

      toasts.error("Error when get speakers", error)

    }
  }

  const getUserDatas = async () => {

    try {

      const users = await getUsers()

      setUsers(Array.isArray(users)? users : [])

    } catch (error) {

      toasts.error("Error when get users", error)

    }
  }

  const getRoleDatas = async () => {

    try {

      const roles = await getRoles()

      setRoles(Array.isArray(roles)? roles : [])

    } catch (error) {

      toasts.error("Error when get roles", error)

    }
  }

  const getAccount = async () => {

    try {

      const profile = await getProfile()

      setAccount(Array.isArray(profile)? profile : [])

    } catch (error) {

      toasts.error("Error when get account", error)

    }
  }

  const fetchClassesList = async () => {
    setLoadingClasses(true);
    try {
      const res = await api.get("/classes");
      setClassesList(res.data?? res.data.dat ?? []);
    } catch (err) {
      addToast("Gagal memuat data kelas dari API.", "error");
    } finally {
      setLoadingClasses(false);
    }
  };
  useEffect(() => {
    if (userInfo) {
      fetchClassesList();
    }
  }, [userInfo, activeModule]);

  const [activeLearningId, setActiveLearningId] = useState(null);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [activeSpeakerId, setActiveSpeakerId] = useState(null);
  const [activeUserId, setActiveUserId] = useState(null);
  const [activeRoleId, setActiveRoleId] = useState(null);
  const [learningSearch, setLearningSearch] = useState("");
  const [learningLevelFilter, setLearningLevelFilter] = useState("");
  const [learningStatusFilter, setLearningStatusFilter] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [toasts, setToasts] = useState([]);
  useEffect(() => {
    localStorage.setItem("edu_forge_learnings_db", JSON.stringify(learnings));
  }, [learnings]);
  useEffect(() => {
    localStorage.setItem("edu_forge_categories_db", JSON.stringify(categories));
  }, [categories]);
  useEffect(() => {
    localStorage.setItem("edu_forge_students_db", JSON.stringify(students));
  }, [students]);
  useEffect(() => {
    localStorage.setItem("edu_forge_speakers_db", JSON.stringify(speakers));
  }, [speakers]);
  useEffect(() => {
    localStorage.setItem("edu_forge_registrants_db", JSON.stringify(registrants));
  }, [registrants]);
  useEffect(() => {
    localStorage.setItem("edu_forge_users_db", JSON.stringify(users));
  }, [users]);
  useEffect(() => {
    localStorage.setItem("edu_forge_roles_db", JSON.stringify(roles));
  }, [roles]);
  useEffect(() => {
    localStorage.setItem("edu_forge_account_db", JSON.stringify(account));
  }, [account]);
  const addToast = (text, type = "success") => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, text, type }]);
  };
  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };
  const handleSaveLearning = (data) => {
    if (viewState === "create") {
      // const newL = {
      //   ...data,
      //   id: "learn-" + Date.now(),
      //   createdAt: (/* @__PURE__ */ new Date()).toISOString()
      // };

      api.post('/learning-contents', data, {withCredentials: true})
          .then(result => {
            if(result.status == 200){
              setLearnings((prev) => [result.data.data, ...prev]);
              addToast(`Materi "${data.name}" berhasil dibuat!`, "success");

            }else{
              addToast(`Gagal menambahkan materi "${data.name}"!: ` + result.data.message_error, "error");
            }
          })
          .catch(error => {
            addToast(`Gagal menambahkan materi "${data.name}"!: ` + error, "error");
          })
    } else if (viewState === "edit" && activeLearningId) {
      api.patch('/learning-contents', data, {withCredentials: true})
          .then(result => {
            if(result.status == 200){
              setLearnings(
                (prev) => prev.map((item) => item.id === activeLearningId ? { ...item, ...data } : item)
              );
              // setLearnings((prev) => [result.data.data, ...prev]);
              addToast(`Materi "${data.name}" berhasil diubah!`, "success");

            }else{
              addToast(`Gagal mengubah materi "${data.name}"!: ` + result.data.message_error, "error");
            }
          })
          .catch(error => {
            addToast(`Gagal mengubah materi "${data.name}"!: ` + error, "error");
          })
    }
    setViewState("list");
    setActiveLearningId(null);
  };

  const handleDeleteLearning = (id) => {

    const item = learnings.find((l) => l.id === id);

    if (item && window.confirm(`Hapus materi pembelajaran "${item.name}"?`)) {
      api.delete('/learning-contents', data, {withCredentials: true})
        .then(result => {
          if(result.status == 200){
            setLearnings((prev) => prev.filter((l) => l.id !== id));
            addToast(`Materi "${item.name}" berhasil dihapus`, "warning");

          }else{
            addToast(`Gagal menghapus materi "${data.name}"!: ` + result.data.message_error, "error");
          }
        })
        .catch(error => {
          addToast(`Gagal menghapus materi "${data.name}"!: ` + error, "error");
        })

    }
  };

  const handleSaveCategory = (data) => {
    if (viewState === "create") {
      api.post('/categories', data, {withCredentials: true})
        .then(result => {
          if(result.status == 200){
            setCategories((prev) => [...prev, result.data.data]);
            addToast(`Kategori "${data.name}" ditambahkan!`, "success");

          }else{
            addToast(`Gagal menambahkan kategori "${data.name}"!: ` + result.data.message_error, "error");
          }
        })
        .catch(error => {
          addToast(`Gagal menambahkan kategori "${data.name}"!: ` + error, "error");
        })
    } else if (viewState === "edit" && activeCategoryId) {
      api.patch('/categories', data, {withCredentials: true})
          .then(result => {
            if(result.status == 200){
              setCategories(
                (prev) => prev.map((c) => c.id === activeCategoryId ? { ...c, ...data } : c)
              );
              addToast(`Kategori "${data.name}" diperbarui!`, "success");

            }else{
              addToast(`Gagal mengubah kategori "${data.name}"!: ` + result.data.message_error, "error");
            }
          })
          .catch(error => {
            addToast(`Gagal mengubah kategori "${data.name}"!: ` + error, "error");
          })
    }
    setViewState("list");
    setActiveCategoryId(null);
  };
  const handleDeleteCategory = (id) => {
    const item = categories.find((c) => c.id === id);
    if (item && window.confirm(`Hapus kategori "${item.name}"?`)) {
      api.delete('/learning-contents', data, {withCredentials: true})
        .then(result => {
          if(result.status == 200){
            setCategories((prev) => prev.filter((c) => c.id !== id));
            addToast(`Kategori "${item.name}" dihapus`, "warning");

          }else{
            addToast(`Gagal menghapus kategori "${data.name}"!: ` + result.data.message_error, "error");
          }
        })
        .catch(error => {
          addToast(`Gagal menghapus kategori "${data.name}"!: ` + error, "error");
        })

    }
  };
  const handleSaveStudent = (updatedStudent) => {
    setStudents((prev) => prev.map((s) => s.id === updatedStudent.id ? updatedStudent : s));
  };
  const handleSaveSpeaker = (data) => {
    if (data.id) {
      api.patch('/speakers', data, {withCredentials: true})
          .then(result => {
            if(result.status == 200){
              setSpeakers((prev) => prev.map((s) => s.id === data.id ? data : s));
              addToast(`Speaker "${data.fullName}" diperbarui!`, "success");

            }else{
              addToast(`Gagal mengubah speaker "${data.name}"!: ` + result.data.message_error, "error");
            }
          })
          .catch(error => {
            addToast(`Gagal mengubah speaker "${data.name}"!: ` + error, "error");
          })
    } else {
      api.post('/speakers', data, {withCredentials: true})
        .then(result => {
          if(result.status == 200){
            setSpeakers((prev) => [...prev, result.data.data]);
            addToast(`Speaker "${data.fullName}" ditambahkan!`, "success");

          }else{
            addToast(`Gagal menambahkan speaker "${data.name}"!: ` + result.data.message_error, "error");
          }
        })
        .catch(error => {
          addToast(`Gagal menambahkan speaker "${data.name}"!: ` + error, "error");
        })
    }
    setViewState("list");
    setActiveSpeakerId(null);
  };
  const handleDeleteSpeaker = (id) => {
    const item = speakers.find((s) => s.id === id);
    if (item && window.confirm(`Hapus speaker "${item.fullName}"?`)) {
      api.delete('/speakers', data, {withCredentials: true})
        .then(result => {
          if(result.status == 200){
            setSpeakers((prev) => prev.filter((s) => s.id !== id));
            addToast(`Speaker "${item.fullName}" dihapus`, "warning");

          }else{
            addToast(`Gagal menghapus speaker "${data.name}"!: ` + result.data.message_error, "error");
          }
        })
        .catch(error => {
          addToast(`Gagal menghapus speaker "${data.name}"!: ` + error, "error");
        })
    }
  };
  const handleSaveRegistrant = (data) => {
    // const newReg = {
    //   ...data,
    //   id: "reg-" + Date.now(),
    //   createdAt: (/* @__PURE__ */ new Date()).toISOString()
    // };

    api.post('/registrants', data, {withCredentials: true})
      .then(result => {
        if(result.status == 200){
          setRegistrants((prev) => [result.data.data, ...prev]);
          addToast(`Calon Peserta "${data.fullName}" berhasil didaftarkan!`, "success");

        }else{
          addToast(`Gagal menambahkan calon peserta "${data.name}"!: ` + result.data.message_error, "error");
        }
      })
      .catch(error => {
        addToast(`Gagal menambahkan calon peserta "${data.name}"!: ` + error, "error");
      })
  };
  const handleSaveUser = (data) => {
    if (data.id) {
      api.patch('/users', data, {withCredentials: true})
          .then(result => {
            if(result.status == 200){
              setUsers((prev) => prev.map((u) => u.id === data.id ? { ...u, ...data } : u));
              addToast(`Pengguna "${data.fullName}" diperbarui!`, "success");

            }else{
              addToast(`Gagal mengubah user "${data.name}"!: ` + result.data.message_error, "error");
            }
          })
          .catch(error => {
            addToast(`Gagal mengubah user "${data.name}"!: ` + error, "error");
          })
    } else {
      api.post('/users', data, {withCredentials: true})
        .then(result => {
          if(result.status == 200){
            setUsers((prev) => [...prev, result.data.data]);
            addToast(`Pengguna "${data.fullName}" diundang!`, "success");

          }else{
            addToast(`Gagal menambahkan user "${data.name}"!: ` + result.data.message_error, "error");
          }
        })
        .catch(error => {
          addToast(`Gagal menambahkan user "${data.name}"!: ` + error, "error");
        })
      // const newU = {
      //   ...data,
      //   id: "user-" + Date.now()
      // };
    }
    setViewState("list");
    setActiveUserId(null);
  };
  const handleDeleteUser = (id) => {
    const item = users.find((u) => u.id === id);
    if (item && window.confirm(`Cabut akses pengguna "${item.fullName}"?`)) {
      api.delete('/users', data, {withCredentials: true})
        .then(result => {
          if(result.status == 200){
            setUsers((prev) => prev.filter((u) => u.id !== id));
            addToast(`Pengguna "${item.fullName}" dihapus`, "warning");

          }else{
            addToast(`Gagal menghapus user "${data.name}"!: ` + result.data.message_error, "error");
          }
        })
        .catch(error => {
          addToast(`Gagal menghapus user "${data.name}"!: ` + error, "error");
        })
    }
  };
  const handleSaveRole = (data) => {
    if (data.id) {
      api.patch('/roles', data, {withCredentials: true})
          .then(result => {
            if(result.status == 200){
              setRoles((prev) => prev.map((r) => r.id === data.id ? data : r));
              addToast(`Matriks hak akses Role "${data.name}" diperbarui!`, "success");

            }else{
              addToast(`Gagal mengubah role "${data.name}"!: ` + result.data.message_error, "error");
            }
          })
          .catch(error => {
            addToast(`Gagal mengubah role "${data.name}"!: ` + error, "error");
          })
    } else {
      api.post('/roles', data, {withCredentials: true})
          .then(result => {
            if(result.status == 200){
              setRoles((prev) => [...prev, newR]);
              addToast(`Role baru "${data.name}" berhasil dibuat!`, "success");

            }else{
              addToast(`Gagal menambahkan role "${data.name}"!: ` + result.data.message_error, "error");
            }
          })
          .catch(error => {
            addToast(`Gagal menambahkan role "${data.name}"!: ` + error, "error");
          })
      // const newR = {
      //   ...data,
      //   id: "role-" + Date.now()
      // };

    }
    setViewState("list");
    setActiveRoleId(null);
  };
  const handleDeleteRole = async (id) => {
    const item = roles.find((r) => r.id === id);
    if (item && window.confirm(`Hapus peran "${item.name}"?`)) {
      await api.delete('/roles', data, {withCredentials: true})
        .then(result => {
          if(result.status == 200){
            setRoles((prev) => prev.filter((r) => r.id !== id));
            addToast(`Role "${item.name}" dihapus`, "warning");

          }else{
            addToast(`Gagal menghapus role "${data.name}"!: ` + result.data.message_error, "error");
          }
        })
        .catch(error => {
          addToast(`Gagal menghapus role "${data.name}"!: ` + error, "error");
        })
    }
  };
  const handleDeleteClass = async (id) => {
    const item = classesList.find((c) => c.id === id);
    if (item && window.confirm(`Hapus kelas "${item.name}"?`)) {
      try {
        await api.delete('/classes', data, {withCredentials: true})
        .then(result => {
          if(result.status == 200){
            addToast(`Kelas "${item.name}" berhasil dihapus`, "warning");
            fetchClassesList();

          }else{
            addToast(`Gagal menghapus kelas "${data.name}"!: ` + result.data.message_error, "error");
          }
        })
        .catch(error => {
          addToast(`Gagal menghapus kelas "${data.name}"!: ` + error, "error");
        })
        // await api.delete(`/classes/${id}`);
      } catch (err) {
        addToast("Gagal menghapus kelas.", "error");
      }
    }
  };
  const getCategoryName = (catId) => {
    const found = categories.find((c) => c.id === catId);
    return found ? found.name : "Kategori Utama";
  };
  const filteredClasses = classesList.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(classSearch.toLowerCase());
    const matchesLevel = classLevelFilter ? c.level === classLevelFilter : true;
    return matchesSearch && matchesLevel;
  });
  const sortedClasses = [...filteredClasses].sort((a, b) => {
    let valA = "";
    let valB = "";
    if (classSortField === "name") {
      valA = a.name.toLowerCase();
      valB = b.name.toLowerCase();
    } else if (classSortField === "level") {
      valA = a.level.toLowerCase();
      valB = b.level.toLowerCase();
    } else if (classSortField === "category") {
      valA = getCategoryName(a.category).toLowerCase();
      valB = getCategoryName(b.category).toLowerCase();
    } else if (classSortField === "learningHour") {
      valA = a.learningHour;
      valB = b.learningHour;
    } else if (classSortField === "status") {
      valA = a.status.toLowerCase();
      valB = b.status.toLowerCase();
    }
    if (valA < valB) return classSortDir === "asc" ? -1 : 1;
    if (valA > valB) return classSortDir === "asc" ? 1 : -1;
    return 0;
  });
  const classItemsPerPage = 5;
  const classTotalPages = Math.ceil(sortedClasses.length / classItemsPerPage);
  const paginatedClasses = sortedClasses.slice((classPage - 1) * classItemsPerPage, classPage * classItemsPerPage);
  const handleResetPassword = (newPass) => {
    addToast("Password akun Anda telah berhasil disetel ulang!", "success");
  };
  const activeLearning = learnings.find((l) => l.id === activeLearningId);
  const activeCategory = categories.find((c) => c.id === activeCategoryId);
  const activeSpeaker = speakers.find((s) => s.id === activeSpeakerId);
  const activeUser = users.find((u) => u.id === activeUserId);
  const activeRole = roles.find((r) => r.id === activeRoleId);
  const filteredLearnings = learnings.filter((l) => {
    const matchesSearch = l.name.toLowerCase().includes(learningSearch.toLowerCase());
    const matchesLevel = learningLevelFilter ? l.level === learningLevelFilter : true;
    const matchesStatus = learningStatusFilter ? l.status === learningStatusFilter : true;
    return matchesSearch && matchesLevel && matchesStatus;
  });
  const filteredCategories = categories.filter(
    (c) => c.name.toLowerCase().includes(categorySearch.toLowerCase())
  );
  const sortedLearnings = [...filteredLearnings].sort((a, b) => {
    let valA = "";
    let valB = "";
    if (learningSortField === "name") {
      valA = a.name.toLowerCase();
      valB = b.name.toLowerCase();
    } else if (learningSortField === "contentType") {
      valA = a.contentType.toLowerCase();
      valB = b.contentType.toLowerCase();
    } else if (learningSortField === "level") {
      valA = a.level.toLowerCase();
      valB = b.level.toLowerCase();
    } else if (learningSortField === "learningHour") {
      valA = a.learningHour;
      valB = b.learningHour;
    } else if (learningSortField === "duration") {
      valA = a.duration || 0;
      valB = b.duration || 0;
    } else if (learningSortField === "maxPoints") {
      valA = a.maxPoints;
      valB = b.maxPoints;
    } else if (learningSortField === "status") {
      valA = a.status.toLowerCase();
      valB = b.status.toLowerCase();
    }
    if (valA < valB) return learningSortDir === "asc" ? -1 : 1;
    if (valA > valB) return learningSortDir === "asc" ? 1 : -1;
    return 0;
  });
  const learningItemsPerPage = 5;
  const learningTotalPages = Math.ceil(sortedLearnings.length / learningItemsPerPage);
  const paginatedLearnings = sortedLearnings.slice((learningPage - 1) * learningItemsPerPage, learningPage * learningItemsPerPage);
  const sortedCategories = [...filteredCategories].sort((a, b) => {
    let valA = "";
    let valB = "";
    if (categorySortField === "name") {
      valA = a.name.toLowerCase();
      valB = b.name.toLowerCase();
    } else if (categorySortField === "parent") {
      valA = a.parent?.toLowerCase() || "";
      valB = b.parent?.toLowerCase() || "";
    } else if (categorySortField === "description") {
      valA = a.description?.toLowerCase() || "";
      valB = b.description?.toLowerCase() || "";
    }
    if (valA < valB) return categorySortDir === "asc" ? -1 : 1;
    if (valA > valB) return categorySortDir === "asc" ? 1 : -1;
    return 0;
  });
  const categoryItemsPerPage = 5;
  const categoryTotalPages = Math.ceil(sortedCategories.length / categoryItemsPerPage);
  const paginatedCategories = sortedCategories.slice((categoryPage - 1) * categoryItemsPerPage, categoryPage * categoryItemsPerPage);
  const sortedUsers = [...users].sort((a, b) => {
    let valA = "";
    let valB = "";
    if (userSortField === "fullName") {
      valA = a.fullName.toLowerCase();
      valB = b.fullName.toLowerCase();
    } else if (userSortField === "email") {
      valA = a.email.toLowerCase();
      valB = b.email.toLowerCase();
    } else if (userSortField === "phoneNumber") {
      valA = a.phoneNumber.toLowerCase();
      valB = b.phoneNumber.toLowerCase();
    } else if (userSortField === "role") {
      valA = a.role.toLowerCase();
      valB = b.role.toLowerCase();
    }
    if (valA < valB) return userSortDir === "asc" ? -1 : 1;
    if (valA > valB) return userSortDir === "asc" ? 1 : -1;
    return 0;
  });
  const userItemsPerPage = 5;
  const userTotalPages = Math.ceil(sortedUsers.length / userItemsPerPage);
  const paginatedUsers = sortedUsers.slice((userPage - 1) * userItemsPerPage, userPage * userItemsPerPage);
  if (userInfo) {
    return <div className="min-h-screen bg-[#fbfaf6] dark:bg-zinc-950 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <LoginRegister />
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </div>;
  }
  return <div className="min-h-screen bg-[#fbfaf6] dark:bg-zinc-950 text-stone-850 dark:text-zinc-100 flex flex-col font-sans">
      {
    /* 1. Header Banner */
  }
      <header className="sticky top-0 z-40 bg-stone-900 text-white border-b border-stone-800 shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#e8b81a] rounded-xl flex items-center justify-center shadow-lg shadow-[#e8b81a]/20">
              <GraduationCap className="w-5.5 h-5.5 text-stone-900" />
            </div>
            <div>
              <h1 className="text-lg font-display font-bold tracking-tight">
                Thullab Evaluation
              </h1>
              <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">
                Sistem Manajemen Pembelajaran &amp; Registrasi
              </p>
            </div>
          </div>

          {
    /* Account profile dropdown */
  }
          <div className="relative">
            <div
    onClick={() => setAvatarDropdownOpen(!avatarDropdownOpen)}
    className="flex items-center gap-2.5 cursor-pointer hover:bg-stone-800 p-1.5 rounded-xl transition-all border border-stone-800 select-none"
  >
              <img
    src={account.avatar}
    alt={account.fullName}
    className="w-8 h-8 rounded-full object-cover border border-[#e8b81a]"
    referrerPolicy="no-referrer"
  />
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-stone-250 leading-none">{userInfo?.fullName || account.fullName}</p>
                <p className="text-[9px] text-[#e8b81a] mt-1 uppercase font-bold tracking-wider flex items-center gap-1">
                  <span>{userInfo?.role || "Administrator"}</span>
                  <ChevronDown className="w-2.5 h-2.5" />
                </p>
              </div>
            </div>

            {avatarDropdownOpen && <>
                <div
    className="fixed inset-0 z-50 cursor-default"
    onClick={() => setAvatarDropdownOpen(false)}
  />
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-2xl shadow-xl py-2 z-55 overflow-hidden">
                  <div className="px-4 py-2 border-b border-stone-100 dark:border-zinc-850">
                    <p className="text-xs font-bold text-stone-800 dark:text-zinc-200 truncate">
                      {userInfo?.fullName || account.fullName}
                    </p>
                    <p className="text-[10px] text-stone-400 truncate mt-0.5">
                      @{userInfo?.username || "admin"}
                    </p>
                  </div>
                  <button
    onClick={() => {
      setActiveModule("account");
      setViewState("list");
      setAvatarDropdownOpen(false);
    }}
    className="w-full text-left px-4 py-2.5 text-xs font-bold text-stone-700 dark:text-zinc-300 hover:bg-stone-50 dark:hover:bg-zinc-850 transition-colors flex items-center gap-2"
  >
                    <UserCircle2 className="w-4 h-4 text-[#e8b81a]" /> Profil Saya
                  </button>
                  <button
    onClick={() => {
      logout();
      setAvatarDropdownOpen(false);
    }}
    className="w-full text-left px-4 py-2.5 text-xs font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors flex items-center gap-2 border-t border-stone-100 dark:border-zinc-850"
  >
                    <LogOut className="w-4 h-4" /> Keluar (Logout)
                  </button>
                </div>
              </>}
          </div>
        </div>
      </header>

      {
    /* 2. Main Workspace Layout */
  }
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {
    /* Left Side Navigation Sidebar */
  }
        <aside className="lg:col-span-3 bg-white dark:bg-zinc-900 border border-stone-200/80 dark:border-zinc-800 rounded-3xl p-5 space-y-6 shadow-sm">
          <div>
            <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-3">
              Menu Kurikulum
            </h4>
            <nav className="space-y-1.5">
              {[
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: "classes", label: "Data Kelas", icon: <Compass className="w-4 h-4" /> },
    { id: "learning", label: "Materi Pembelajaran", icon: <BookOpen className="w-4 h-4" /> },
    { id: "category", label: "Kategori Bidang", icon: <FolderPlus className="w-4 h-4" /> }
  ].map((m) => <button
    key={m.id}
    onClick={() => {
      setActiveModule(m.id);
      setViewState("list");
    }}
    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeModule === m.id ? "bg-gradient-to-r from-stone-900 to-amber-950 text-white shadow-sm" : "text-stone-600 dark:text-zinc-400 hover:bg-stone-50 hover:text-stone-900"}`}
  >
                  <span className={activeModule === m.id ? "text-[#e8b81a]" : "text-stone-400"}>
                    {m.icon}
                  </span>
                  <span>{m.label}</span>
                </button>)}
            </nav>
          </div>

          <div>
            <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-3">
              Portal Siswa &amp; Pendaftar
            </h4>
            <nav className="space-y-1.5">
              {[
    { id: "student", label: "Data & Kelas Siswa", icon: <Users className="w-4 h-4" /> },
    { id: "speaker", label: "Speaker / Pembicara", icon: <UserSquare2 className="w-4 h-4" /> },
    { id: "registrant", label: "Registran Waiting List", icon: <BadgePlus className="w-4 h-4" /> }
  ].map((m) => <button
    key={m.id}
    onClick={() => {
      setActiveModule(m.id);
      setViewState("list");
    }}
    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeModule === m.id ? "bg-gradient-to-r from-stone-900 to-amber-950 text-white shadow-sm" : "text-stone-600 dark:text-zinc-400 hover:bg-stone-50 hover:text-stone-900"}`}
  >
                  <span className={activeModule === m.id ? "text-[#e8b81a]" : "text-stone-400"}>
                    {m.icon}
                  </span>
                  <span>{m.label}</span>
                </button>)}
            </nav>
          </div>

          <div>
            <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-3">
              Keamanan &amp; Akun
            </h4>
            <nav className="space-y-1.5">
              {[
    { id: "user", label: "Manajemen User", icon: <UserSquare2 className="w-4 h-4" /> },
    { id: "role", label: "Hak Akses (Role)", icon: <ShieldAlert className="w-4 h-4" /> },
    { id: "account", label: "Profil Akun", icon: <UserCircle2 className="w-4 h-4" /> },
    { id: "settings", label: "Keamanan Sandi", icon: <KeyRound className="w-4 h-4" /> }
  ].map((m) => <button
    key={m.id}
    onClick={() => {
      setActiveModule(m.id);
      setViewState("list");
    }}
    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeModule === m.id ? "bg-gradient-to-r from-stone-900 to-amber-950 text-white shadow-sm" : "text-stone-600 dark:text-zinc-400 hover:bg-stone-50 hover:text-stone-900"}`}
  >
                  <span className={activeModule === m.id ? "text-[#e8b81a]" : "text-stone-400"}>
                    {m.icon}
                  </span>
                  <span>{m.label}</span>
                </button>)}
            </nav>
          </div>
        </aside>

        {
    /* Right Side Working canvas panel */
  }
        <main className="lg:col-span-9 space-y-6">
          <AnimatePresence mode="wait">
            {
    /* MODULE 1: DASHBOARD */
  }
            {activeModule === "dashboard" && <motion.div
    key="dashboard-module"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="space-y-6"
  >
                {
    /* Premium Banner */
  }
                <div className="bg-gradient-to-br from-stone-900 via-amber-950 to-stone-900 text-white rounded-3xl p-6 relative overflow-hidden shadow-lg">
                  <div className="absolute top-0 right-0 w-36 h-36 bg-[#e8b81a]/10 rounded-full blur-2xl" />
                  <span className="bg-[#e8b81a]/20 text-[#e8b81a] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Ringkasan Sistem
                  </span>
                  <h3 className="text-xl sm:text-2xl font-display font-bold mt-2">
                    Selamat Datang Kembali, {account.fullName}!
                  </h3>
                  <p className="text-stone-300 text-xs mt-1 max-w-xl">
                    Kelola materi pembelajaran, buat draf ujian sertifikasi, saring registrasi waiting list baru, serta pantau matriks izin pengguna internal.
                  </p>
                </div>

                {
    /* Dashboard stats metrics */
  }
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white dark:bg-zinc-900 p-4 border border-stone-200/60 dark:border-zinc-800 rounded-2xl flex items-center gap-3">
                    <div className="p-2.5 bg-amber-50 dark:bg-zinc-850 text-[#e8b81a] rounded-xl">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Materi</p>
                      <p className="text-lg font-bold text-stone-850 dark:text-white mt-0.5">{learnings.length}</p>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-zinc-900 p-4 border border-stone-200/60 dark:border-zinc-800 rounded-2xl flex items-center gap-3">
                    <div className="p-2.5 bg-amber-50 dark:bg-zinc-850 text-[#e8b81a] rounded-xl">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Siswa</p>
                      <p className="text-lg font-bold text-stone-850 dark:text-white mt-0.5">{students.length}</p>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-zinc-900 p-4 border border-stone-200/60 dark:border-zinc-800 rounded-2xl flex items-center gap-3">
                    <div className="p-2.5 bg-amber-50 dark:bg-zinc-850 text-[#e8b81a] rounded-xl">
                      <BadgePlus className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Registran</p>
                      <p className="text-lg font-bold text-stone-850 dark:text-white mt-0.5">{registrants.length}</p>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-zinc-900 p-4 border border-stone-200/60 dark:border-zinc-800 rounded-2xl flex items-center gap-3">
                    <div className="p-2.5 bg-amber-50 dark:bg-zinc-850 text-[#e8b81a] rounded-xl">
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Roles</p>
                      <p className="text-lg font-bold text-stone-850 dark:text-white mt-0.5">{roles.length}</p>
                    </div>
                  </div>
                </div>

                {
    /* Grid Lists short information panels */
  }
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {
    /* Left panel: learnings brief list */
  }
                  <div className="bg-white dark:bg-zinc-900 border border-stone-200/60 dark:border-zinc-800 rounded-3xl p-5 space-y-4 shadow-xs">
                    <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                      <h4 className="text-xs font-bold text-stone-800 dark:text-zinc-200 uppercase tracking-wider">
                        Materi Pembelajaran Terbaru
                      </h4>
                      <button
    onClick={() => setActiveModule("learning")}
    className="text-[10px] font-bold text-[#e8b81a] hover:underline"
  >
                        Lihat Semua
                      </button>
                    </div>
                    <div className="space-y-3">
                      {learnings.slice(0, 3).map((l) => <div key={l.id} className="flex justify-between items-center bg-stone-50/50 p-2.5 rounded-xl border border-stone-150">
                          <div>
                            <p className="text-xs font-bold text-stone-800 dark:text-zinc-200">{l.name}</p>
                            <span className="text-[9px] uppercase text-stone-400 font-bold tracking-wider">{l.contentType} &bull; {l.level}</span>
                          </div>
                          <span className={`px-2 py-0.5 text-[9px] font-bold rounded-full ${l.status === "active" ? "bg-emerald-100 text-emerald-800" : "bg-stone-150 text-stone-600"}`}>
                            {l.status}
                          </span>
                        </div>)}
                    </div>
                  </div>

                  {
    /* Right panel: Waiting List Registrants brief */
  }
                  <div className="bg-white dark:bg-zinc-900 border border-stone-200/60 dark:border-zinc-800 rounded-3xl p-5 space-y-4 shadow-xs">
                    <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                      <h4 className="text-xs font-bold text-stone-800 dark:text-zinc-200 uppercase tracking-wider">
                        Calon Siswa / Registran Terbaru
                      </h4>
                      <button
    onClick={() => setActiveModule("registrant")}
    className="text-[10px] font-bold text-[#e8b81a] hover:underline"
  >
                        Tambah Baru
                      </button>
                    </div>
                    <div className="space-y-3">
                      {registrants.slice(0, 3).map((r) => <div key={r.id} className="flex justify-between items-center bg-stone-50/50 p-2.5 rounded-xl border border-stone-150">
                          <div>
                            <p className="text-xs font-bold text-stone-800 dark:text-zinc-200">{r.fullName}</p>
                            <span className="text-[9px] uppercase text-stone-400 font-bold tracking-wider">{r.email}</span>
                          </div>
                          <span className="text-[9px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md font-bold">{r.domicile}</span>
                        </div>)}
                    </div>
                  </div>
                </div>
              </motion.div>}

            {
    /* MODULE CLASSES: MANAJEMEN KELAS */
  }
            {activeModule === "classes" && <motion.div
    key="classes-module"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="space-y-6"
  >
                {viewState === "list" ? <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-zinc-900 border border-stone-200/60 dark:border-zinc-800 rounded-3xl p-5 shadow-xs">
                      <div>
                        <h3 className="text-lg font-display font-bold text-stone-800 dark:text-zinc-100">
                          Manajemen Kelas Pelatihan
                        </h3>
                        <p className="text-xs text-stone-400 mt-0.5">Buat, ubah, dan kelola daftar kelas kurikulum, jam belajar, dan pengarang.</p>
                      </div>

                      <button
    onClick={() => {
      setViewState("create");
      setActiveClassId(null);
    }}
    className="bg-[#e8b81a] hover:bg-[#d4a515] text-stone-900 font-bold text-xs px-5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm"
  >
                        <Plus className="w-4 h-4" /> Tambah Kelas Baru
                      </button>
                    </div>

                    {
    /* Filter bar */
  }
                    <div className="bg-white dark:bg-zinc-900 border border-stone-200/60 dark:border-zinc-800 p-4 rounded-2xl flex flex-col sm:flex-row items-center gap-3">
                      <div className="relative w-full sm:max-w-xs">
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
                        <input
    type="text"
    placeholder="Cari nama kelas..."
    value={classSearch}
    onChange={(e) => {
      setClassSearch(e.target.value);
      setClassPage(1);
    }}
    className="w-full bg-stone-50 dark:bg-zinc-850 border border-stone-200 dark:border-zinc-750 rounded-xl pl-9 pr-3 py-2 text-xs font-semibold focus:outline-none"
  />
                      </div>

                      <select
    value={classLevelFilter}
    onChange={(e) => {
      setClassLevelFilter(e.target.value);
      setClassPage(1);
    }}
    className="bg-stone-50 dark:bg-zinc-850 border border-stone-200 dark:border-zinc-750 text-xs font-semibold px-3 py-2 rounded-xl focus:outline-none"
  >
                        <option value="">Semua Tingkatan</option>
                        <option value="pemula">Pemula</option>
                        <option value="menengah">Menengah</option>
                        <option value="ahli">Ahli</option>
                      </select>
                    </div>

                    {
    /* Classes list table */
  }
                    <div className="bg-white dark:bg-zinc-900 border border-stone-200/60 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-xs">
                      {loadingClasses ? <div className="text-center py-20 text-stone-400 text-xs font-bold animate-pulse">
                          Memuat data kelas dari database...
                        </div> : sortedClasses.length === 0 ? <div className="text-center py-20 text-stone-400 text-xs italic">
                          Belum ada kelas yang sesuai filter.
                        </div> : <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="bg-stone-50 dark:bg-zinc-850/50 border-b border-stone-100 dark:border-zinc-800 text-[10px] font-bold text-stone-400 uppercase tracking-wider select-none">
                                <th className="p-4">Cover</th>
                                <th onClick={() => {
    if (classSortField === "name") setClassSortDir((prev) => prev === "asc" ? "desc" : "asc");
    else {
      setClassSortField("name");
      setClassSortDir("asc");
    }
    setClassPage(1);
  }} className="p-4 cursor-pointer hover:bg-stone-100 dark:hover:bg-zinc-800">
                                  Nama Kelas {classSortField === "name" ? classSortDir === "asc" ? "\u25B2" : "\u25BC" : ""}
                                </th>
                                <th onClick={() => {
    if (classSortField === "level") setClassSortDir((prev) => prev === "asc" ? "desc" : "asc");
    else {
      setClassSortField("level");
      setClassSortDir("asc");
    }
    setClassPage(1);
  }} className="p-4 cursor-pointer hover:bg-stone-100 dark:hover:bg-zinc-800">
                                  Level / Tingkat {classSortField === "level" ? classSortDir === "asc" ? "\u25B2" : "\u25BC" : ""}
                                </th>
                                <th onClick={() => {
    if (classSortField === "category") setClassSortDir((prev) => prev === "asc" ? "desc" : "asc");
    else {
      setClassSortField("category");
      setClassSortDir("asc");
    }
    setClassPage(1);
  }} className="p-4 cursor-pointer hover:bg-stone-100 dark:hover:bg-zinc-800">
                                  Kategori {classSortField === "category" ? classSortDir === "asc" ? "\u25B2" : "\u25BC" : ""}
                                </th>
                                <th onClick={() => {
    if (classSortField === "learningHour") setClassSortDir((prev) => prev === "asc" ? "desc" : "asc");
    else {
      setClassSortField("learningHour");
      setClassSortDir("asc");
    }
    setClassPage(1);
  }} className="p-4 cursor-pointer hover:bg-stone-100 dark:hover:bg-zinc-800">
                                  Waktu Belajar {classSortField === "learningHour" ? classSortDir === "asc" ? "\u25B2" : "\u25BC" : ""}
                                </th>
                                <th className="p-4">Penulis (Authors)</th>
                                <th onClick={() => {
    if (classSortField === "status") setClassSortDir((prev) => prev === "asc" ? "desc" : "asc");
    else {
      setClassSortField("status");
      setClassSortDir("asc");
    }
    setClassPage(1);
  }} className="p-4 cursor-pointer hover:bg-stone-100 dark:hover:bg-zinc-800">
                                  Status {classSortField === "status" ? classSortDir === "asc" ? "\u25B2" : "\u25BC" : ""}
                                </th>
                                <th className="p-4 text-right">Aksi</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-100 dark:divide-zinc-800 text-xs font-medium">
                              {paginatedClasses.map((item) => <tr key={item.id} className="hover:bg-stone-50/20">
                                  <td className="p-4">
                                    <img
    src={item.image}
    alt={item.name}
    className="w-12 h-8 rounded-lg object-cover border border-stone-200"
    referrerPolicy="no-referrer"
  />
                                  </td>
                                  <td className="p-4 font-bold text-stone-850 dark:text-zinc-200">
                                    {item.name}
                                  </td>
                                  <td className="p-4 capitalize">
                                    <span className="bg-amber-50 dark:bg-zinc-800 text-[#b45309] font-bold text-[10px] px-2 py-0.5 rounded">
                                      {item.level}
                                    </span>
                                  </td>
                                  <td className="p-4 text-stone-600 dark:text-zinc-400">
                                    {getCategoryName(item.category)}
                                  </td>
                                  <td className="p-4 font-semibold">
                                    {item.learningHour} Menit
                                  </td>
                                  <td className="p-4 text-stone-500 dark:text-zinc-400">
                                    {item.authors && item.authors.length > 0 ? <div className="flex flex-wrap gap-1">
                                        {item.authors.map((authorId) => {
    const matchingSp = speakers.find((sp) => sp.id === authorId);
    return <span key={authorId} className="bg-stone-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-[10px] font-semibold">
                                              {matchingSp ? matchingSp.fullName : authorId}
                                            </span>;
  })}
                                      </div> : "-"}
                                  </td>
                                  <td className="p-4">
                                    <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full ${item.status === "save" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                                      {item.status === "save" ? "Aktif" : "Draft"}
                                    </span>
                                  </td>
                                  <td className="p-4 text-right space-x-1.5 shrink-0 whitespace-nowrap">
                                    <button
    onClick={() => {
      setActiveClassId(item.id);
      setViewState("detail");
    }}
    className="text-xs font-bold text-stone-500 hover:underline"
  >
                                      Detail
                                    </button>
                                    <span className="text-stone-300">&bull;</span>
                                    <button
    onClick={() => {
      setActiveClassId(item.id);
      setViewState("edit");
    }}
    className="text-xs font-bold text-[#e8b81a] hover:underline"
  >
                                      Ubah
                                    </button>
                                    <span className="text-stone-300">&bull;</span>
                                    <button
    onClick={() => handleDeleteClass(item.id)}
    className="text-xs font-bold text-rose-500 hover:underline"
  >
                                      Hapus
                                    </button>
                                  </td>
                                </tr>)}
                            </tbody>
                          </table>
                        </div>}

                      {
    /* Pagination bar */
  }
                      {classTotalPages > 1 && <div className="flex items-center justify-between px-4 py-3 bg-stone-50 dark:bg-zinc-900 border-t border-stone-100 dark:border-zinc-850">
                          <span className="text-xs font-bold text-stone-500">
                            Halaman {classPage} dari {classTotalPages}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
    type="button"
    disabled={classPage === 1}
    onClick={() => setClassPage((prev) => Math.max(1, prev - 1))}
    className="px-3 py-1.5 bg-white dark:bg-zinc-800 hover:bg-stone-100 dark:hover:bg-zinc-750 text-xs font-bold text-stone-750 dark:text-zinc-300 border border-stone-200 dark:border-zinc-700 rounded-lg disabled:opacity-40 transition-colors"
  >
                              Sebelumnya
                            </button>
                            {Array.from({ length: classTotalPages }, (_, i) => i + 1).map((page) => <button
    key={page}
    type="button"
    onClick={() => setClassPage(page)}
    className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors ${classPage === page ? "bg-stone-900 text-white border-stone-900 dark:bg-zinc-700 dark:border-zinc-650" : "bg-white dark:bg-zinc-800 hover:bg-stone-100 dark:hover:bg-zinc-750 text-stone-750 dark:text-zinc-300 border-stone-200 dark:border-zinc-700"}`}
  >
                                {page}
                              </button>)}
                            <button
    type="button"
    disabled={classPage === classTotalPages}
    onClick={() => setClassPage((prev) => Math.min(classTotalPages, prev + 1))}
    className="px-3 py-1.5 bg-white dark:bg-zinc-800 hover:bg-stone-100 dark:hover:bg-zinc-750 text-xs font-bold text-stone-750 dark:text-zinc-300 border border-stone-200 dark:border-zinc-700 rounded-lg disabled:opacity-40 transition-colors"
  >
                              Berikutnya
                            </button>
                          </div>
                        </div>}
                    </div>
                  </div> : <ClassManager
    initialClass={classesList.find((c) => c.id === activeClassId)}
    viewState={viewState}
    onCancel={() => setViewState("list")}
    onSaveSuccess={(message) => {
      setViewState("list");
      addToast(message, "success");
      fetchClassesList();
    }}
    addToast={addToast}
  />}
              </motion.div>}

            {
    /* MODULE 2: LEARNING (MATERI PEMBELAJARAN) */
  }
            {activeModule === "learning" && <motion.div
    key="learning-module"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="space-y-6"
  >
                {viewState === "list" && <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-zinc-900 border border-stone-200/60 dark:border-zinc-800 rounded-3xl p-5 shadow-xs">
                      <div>
                        <h3 className="text-lg font-display font-bold text-stone-800 dark:text-zinc-100">
                          Materi &amp; Ujian Kurikulum
                        </h3>
                        <p className="text-xs text-stone-400 mt-0.5">Kelola draf soal, durasi waktu ujian, dan poin sertifikasi materi.</p>
                      </div>

                      <button
    onClick={() => {
      setViewState("create");
      setActiveLearningId(null);
    }}
    className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm"
  >
                        <Plus className="w-4 h-4" /> Tambah Pembelajaran
                      </button>
                    </div>

                    {
    /* Filter bar */
  }
                    <div className="bg-white dark:bg-zinc-900 border border-stone-200/60 dark:border-zinc-800 p-4 rounded-2xl flex flex-col sm:flex-row items-center gap-3">
                      <input
    type="text"
    placeholder="Cari materi pembelajaran..."
    value={learningSearch}
    onChange={(e) => setLearningSearch(e.target.value)}
    className="w-full sm:max-w-xs bg-stone-50 dark:bg-zinc-850 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none"
  />

                      <select
    value={learningLevelFilter}
    onChange={(e) => setLearningLevelFilter(e.target.value)}
    className="bg-stone-50 dark:bg-zinc-850 border border-stone-200 text-xs font-semibold px-3 py-2 rounded-xl"
  >
                        <option value="">Semua Level</option>
                        <option value="pemula">Pemula</option>
                        <option value="menengah">Menengah</option>
                        <option value="ahli">Ahli</option>
                      </select>

                      <select
    value={learningStatusFilter}
    onChange={(e) => setLearningStatusFilter(e.target.value)}
    className="bg-stone-50 dark:bg-zinc-850 border border-stone-200 text-xs font-semibold px-3 py-2 rounded-xl"
  >
                        <option value="">Semua Status</option>
                        <option value="active">Aktif</option>
                        <option value="inactive">Nonaktif</option>
                      </select>
                    </div>

                    {
    /* Table of Learnings */
  }
                    <div className="bg-white dark:bg-zinc-900 border border-stone-200/60 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-xs">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-stone-50/50 border-b border-stone-100 text-[10px] font-bold text-stone-400 uppercase tracking-wider select-none">
                              <th onClick={() => {
    if (learningSortField === "name") setLearningSortDir((p) => p === "asc" ? "desc" : "asc");
    else {
      setLearningSortField("name");
      setLearningSortDir("asc");
    }
    setLearningPage(1);
  }} className="p-4 cursor-pointer hover:bg-stone-100 dark:hover:bg-zinc-800 transition-colors">
                                Materi / Ujian {learningSortField === "name" ? learningSortDir === "asc" ? "\u25B2" : "\u25BC" : ""}
                              </th>
                              <th onClick={() => {
    if (learningSortField === "contentType") setLearningSortDir((p) => p === "asc" ? "desc" : "asc");
    else {
      setLearningSortField("contentType");
      setLearningSortDir("asc");
    }
    setLearningPage(1);
  }} className="p-4 cursor-pointer hover:bg-stone-100 dark:hover:bg-zinc-800 transition-colors">
                                Tipe Konten {learningSortField === "contentType" ? learningSortDir === "asc" ? "\u25B2" : "\u25BC" : ""}
                              </th>
                              <th onClick={() => {
    if (learningSortField === "level") setLearningSortDir((p) => p === "asc" ? "desc" : "asc");
    else {
      setLearningSortField("level");
      setLearningSortDir("asc");
    }
    setLearningPage(1);
  }} className="p-4 cursor-pointer hover:bg-stone-100 dark:hover:bg-zinc-800 transition-colors">
                                Tingkat {learningSortField === "level" ? learningSortDir === "asc" ? "\u25B2" : "\u25BC" : ""}
                              </th>
                              <th onClick={() => {
    if (learningSortField === "learningHour") setLearningSortDir((p) => p === "asc" ? "desc" : "asc");
    else {
      setLearningSortField("learningHour");
      setLearningSortDir("asc");
    }
    setLearningPage(1);
  }} className="p-4 cursor-pointer hover:bg-stone-100 dark:hover:bg-zinc-800 transition-colors">
                                Jam Belajar {learningSortField === "learningHour" ? learningSortDir === "asc" ? "\u25B2" : "\u25BC" : ""}
                              </th>
                              <th onClick={() => {
    if (learningSortField === "duration") setLearningSortDir((p) => p === "asc" ? "desc" : "asc");
    else {
      setLearningSortField("duration");
      setLearningSortDir("asc");
    }
    setLearningPage(1);
  }} className="p-4 cursor-pointer hover:bg-stone-100 dark:hover:bg-zinc-800 transition-colors">
                                Durasi Ujian {learningSortField === "duration" ? learningSortDir === "asc" ? "\u25B2" : "\u25BC" : ""}
                              </th>
                              <th onClick={() => {
    if (learningSortField === "maxPoints") setLearningSortDir((p) => p === "asc" ? "desc" : "asc");
    else {
      setLearningSortField("maxPoints");
      setLearningSortDir("asc");
    }
    setLearningPage(1);
  }} className="p-4 cursor-pointer hover:bg-stone-100 dark:hover:bg-zinc-800 transition-colors">
                                Poin Maks {learningSortField === "maxPoints" ? learningSortDir === "asc" ? "\u25B2" : "\u25BC" : ""}
                              </th>
                              <th onClick={() => {
    if (learningSortField === "status") setLearningSortDir((p) => p === "asc" ? "desc" : "asc");
    else {
      setLearningSortField("status");
      setLearningSortDir("asc");
    }
    setLearningPage(1);
  }} className="p-4 cursor-pointer hover:bg-stone-100 dark:hover:bg-zinc-800 transition-colors">
                                Status {learningSortField === "status" ? learningSortDir === "asc" ? "\u25B2" : "\u25BC" : ""}
                              </th>
                              <th className="p-4 text-right">Aksi</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-stone-100 dark:divide-zinc-800 text-xs font-medium">
                            {paginatedLearnings.map((l) => <tr key={l.id} className="hover:bg-stone-50/20">
                                <td className="p-4 font-bold text-stone-800 dark:text-zinc-200">
                                  {l.name}
                                  <p className="text-[10px] text-stone-400 font-normal mt-0.5">Pertanyaan: {l.numQuestions} ({l.questionType})</p>
                                </td>
                                <td className="p-4 capitalize text-stone-600 dark:text-zinc-400">{l.contentType}</td>
                                <td className="p-4 capitalize text-stone-600 dark:text-zinc-400">{l.level}</td>
                                <td className="p-4 text-stone-600 dark:text-zinc-400">{l.learningHour} menit</td>
                                <td className="p-4 text-stone-600 dark:text-zinc-400">{l.contentType === "exam" ? `${l.duration} menit` : "-"}</td>
                                <td className="p-4 text-stone-600 dark:text-zinc-400 font-bold">{l.maxPoints} Poin</td>
                                <td className="p-4">
                                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${l.status === "active" ? "bg-emerald-100 text-emerald-800" : "bg-stone-150 text-stone-600"}`}>
                                    {l.status}
                                  </span>
                                </td>
                                <td className="p-4 text-right space-x-2">
                                  <button
    onClick={() => {
      setActiveLearningId(l.id);
      setViewState("edit");
    }}
    className="p-1 text-stone-400 hover:text-amber-600 transition-colors"
  >
                                    <Edit3 className="w-4 h-4" />
                                  </button>
                                  <button
    onClick={() => handleDeleteLearning(l.id)}
    className="p-1 text-stone-400 hover:text-rose-500 transition-colors"
  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </td>
                              </tr>)}
                          </tbody>
                        </table>
                      </div>

                      {
    /* Pagination Controls */
  }
                      {learningTotalPages > 1 && <div className="flex items-center justify-between px-4 py-3 bg-stone-50 dark:bg-zinc-900 border-t border-stone-100 dark:border-zinc-850">
                          <span className="text-xs font-bold text-stone-500">
                            Halaman {learningPage} dari {learningTotalPages}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
    type="button"
    disabled={learningPage === 1}
    onClick={() => setLearningPage((prev) => Math.max(1, prev - 1))}
    className="px-3 py-1.5 bg-white dark:bg-zinc-800 hover:bg-stone-100 dark:hover:bg-zinc-750 text-xs font-bold text-stone-750 dark:text-zinc-300 border border-stone-200 dark:border-zinc-700 rounded-lg disabled:opacity-40 transition-colors"
  >
                              Sebelumnya
                            </button>
                            {Array.from({ length: learningTotalPages }, (_, i) => i + 1).map((page) => <button
    key={page}
    type="button"
    onClick={() => setLearningPage(page)}
    className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors ${learningPage === page ? "bg-stone-900 text-white border-stone-900 dark:bg-zinc-700 dark:border-zinc-650" : "bg-white dark:bg-zinc-800 hover:bg-stone-100 dark:hover:bg-zinc-750 text-stone-750 dark:text-zinc-300 border-stone-200 dark:border-zinc-700"}`}
  >
                                {page}
                              </button>)}
                            <button
    type="button"
    disabled={learningPage === learningTotalPages}
    onClick={() => setLearningPage((prev) => Math.min(learningTotalPages, prev + 1))}
    className="px-3 py-1.5 bg-white dark:bg-zinc-800 hover:bg-stone-100 dark:hover:bg-zinc-750 text-xs font-bold text-stone-750 dark:text-zinc-300 border border-stone-200 dark:border-zinc-700 rounded-lg disabled:opacity-40 transition-colors"
  >
                              Berikutnya
                            </button>
                          </div>
                        </div>}
                    </div>
                  </div>}

                {(viewState === "create" || viewState === "edit") && <LearningManager
    initialLearning={activeLearning}
    onSave={handleSaveLearning}
    onCancel={() => setViewState("list")}
    addToast={addToast}
  />}
              </motion.div>}

            {
    /* MODULE 3: CATEGORY (KATEGORI BIDANG) */
  }
            {activeModule === "category" && <motion.div
    key="category-module"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="space-y-6"
  >
                {viewState === "list" && <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-zinc-900 border border-stone-200/60 dark:border-zinc-800 rounded-3xl p-5 shadow-xs">
                      <div>
                        <h3 className="text-lg font-display font-bold text-stone-800 dark:text-zinc-100">
                          Kategori Kurikulum
                        </h3>
                        <p className="text-xs text-stone-400 mt-0.5">Kelola kluster bidang keahlian dan hirarki sub-kategori.</p>
                      </div>

                      <button
    onClick={() => {
      setViewState("create");
      setActiveCategoryId(null);
    }}
    className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm"
  >
                        <Plus className="w-4 h-4" /> Tambah Kategori
                      </button>
                    </div>

                    {
    /* Table of categories */
  }
                    <div className="bg-white dark:bg-zinc-900 border border-stone-200/60 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-xs">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-stone-50/50 border-b border-stone-100 text-[10px] font-bold text-stone-400 uppercase tracking-wider select-none">
                              <th onClick={() => {
    if (categorySortField === "name") setCategorySortDir((p) => p === "asc" ? "desc" : "asc");
    else {
      setCategorySortField("name");
      setCategorySortDir("asc");
    }
    setCategoryPage(1);
  }} className="p-4 cursor-pointer hover:bg-stone-100 dark:hover:bg-zinc-800 transition-colors">
                                Nama Kategori {categorySortField === "name" ? categorySortDir === "asc" ? "\u25B2" : "\u25BC" : ""}
                              </th>
                              <th onClick={() => {
    if (categorySortField === "parent") setCategorySortDir((p) => p === "asc" ? "desc" : "asc");
    else {
      setCategorySortField("parent");
      setCategorySortDir("asc");
    }
    setCategoryPage(1);
  }} className="p-4 cursor-pointer hover:bg-stone-100 dark:hover:bg-zinc-800 transition-colors">
                                Kategori Induk (Parent) {categorySortField === "parent" ? categorySortDir === "asc" ? "\u25B2" : "\u25BC" : ""}
                              </th>
                              <th onClick={() => {
    if (categorySortField === "description") setCategorySortDir((p) => p === "asc" ? "desc" : "asc");
    else {
      setCategorySortField("description");
      setCategorySortDir("asc");
    }
    setCategoryPage(1);
  }} className="p-4 cursor-pointer hover:bg-stone-100 dark:hover:bg-zinc-800 transition-colors">
                                Deskripsi {categorySortField === "description" ? categorySortDir === "asc" ? "\u25B2" : "\u25BC" : ""}
                              </th>
                              <th className="p-4 text-right">Aksi</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-stone-100 dark:divide-zinc-800 text-xs font-medium">
                            {paginatedCategories.map((c) => {
    const parentCat = categories.find((p) => p.id === c.parent);
    return <tr key={c.id} className="hover:bg-stone-50/20">
                                  <td className="p-4 font-bold text-stone-800 dark:text-zinc-200">{c.name}</td>
                                  <td className="p-4 font-semibold text-[#e8b81a]">
                                    {parentCat ? parentCat.name : "- Utama -"}
                                  </td>
                                  <td className="p-4 text-stone-500 dark:text-zinc-400 max-w-xs truncate">{c.description || "-"}</td>
                                  <td className="p-4 text-right space-x-2">
                                    <button
      onClick={() => {
        setActiveCategoryId(c.id);
        setViewState("edit");
      }}
      className="p-1 text-stone-400 hover:text-amber-600 transition-colors"
    >
                                      <Edit3 className="w-4 h-4" />
                                    </button>
                                    <button
      onClick={() => handleDeleteCategory(c.id)}
      className="p-1 text-stone-400 hover:text-rose-500 transition-colors"
    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </td>
                                </tr>;
  })}
                          </tbody>
                        </table>
                      </div>

                      {
    /* Category Pagination Controls */
  }
                      {categoryTotalPages > 1 && <div className="flex items-center justify-between px-4 py-3 bg-stone-50 dark:bg-zinc-900 border-t border-stone-100 dark:border-zinc-850">
                          <span className="text-xs font-bold text-stone-500">
                            Halaman {categoryPage} dari {categoryTotalPages}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
    type="button"
    disabled={categoryPage === 1}
    onClick={() => setCategoryPage((prev) => Math.max(1, prev - 1))}
    className="px-3 py-1.5 bg-white dark:bg-zinc-800 hover:bg-stone-100 dark:hover:bg-zinc-750 text-xs font-bold text-stone-750 dark:text-zinc-300 border border-stone-200 dark:border-zinc-700 rounded-lg disabled:opacity-40 transition-colors"
  >
                              Sebelumnya
                            </button>
                            {Array.from({ length: categoryTotalPages }, (_, i) => i + 1).map((page) => <button
    key={page}
    type="button"
    onClick={() => setCategoryPage(page)}
    className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors ${categoryPage === page ? "bg-stone-900 text-white border-stone-900 dark:bg-zinc-700 dark:border-zinc-650" : "bg-white dark:bg-zinc-800 hover:bg-stone-100 dark:hover:bg-zinc-750 text-stone-750 dark:text-zinc-300 border-stone-200 dark:border-zinc-700"}`}
  >
                                {page}
                              </button>)}
                            <button
    type="button"
    disabled={categoryPage === categoryTotalPages}
    onClick={() => setCategoryPage((prev) => Math.min(categoryTotalPages, prev + 1))}
    className="px-3 py-1.5 bg-white dark:bg-zinc-800 hover:bg-stone-100 dark:hover:bg-zinc-750 text-xs font-bold text-stone-750 dark:text-zinc-300 border border-stone-200 dark:border-zinc-700 rounded-lg disabled:opacity-40 transition-colors"
  >
                              Berikutnya
                            </button>
                          </div>
                        </div>}
                    </div>
                  </div>}

                {(viewState === "create" || viewState === "edit") && <CategoryManager
    categories={categories}
    initialCategory={activeCategory}
    onSave={handleSaveCategory}
    onCancel={() => setViewState("list")}
    addToast={addToast}
  />}
              </motion.div>}

            {
    /* MODULE 4: PORTAL SISWA */
  }
            {activeModule === "student" && <motion.div
    key="student-module"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
                <StudentManager
    students={students}
    onSave={handleSaveStudent}
    onCancel={() => setViewState("list")}
    addToast={addToast}
  />
              </motion.div>}

            {
    /* MODULE 5: SPEAKER */
  }
            {activeModule === "speaker" && <motion.div
    key="speaker-module"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="space-y-6"
  >
                {viewState === "list" && <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-zinc-900 border border-stone-200/60 dark:border-zinc-800 rounded-3xl p-5 shadow-xs">
                      <div>
                        <h3 className="text-lg font-display font-bold text-stone-800 dark:text-zinc-100">
                          Instruktur &amp; Pembicara
                        </h3>
                        <p className="text-xs text-stone-400 mt-0.5">Daftar narasumber dan pemateri kelas bersertifikasi.</p>
                      </div>

                      <button
    onClick={() => {
      setViewState("create");
      setActiveSpeakerId(null);
    }}
    className="bg-gradient-to-r from-stone-900 to-zinc-800 hover:from-stone-950 hover:to-zinc-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm"
  >
                        <Plus className="w-4 h-4 text-[#e8b81a]" /> Tambah Speaker
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {speakers.map((s) => <div key={s.id} className="bg-white dark:bg-zinc-900 border border-stone-200/60 dark:border-zinc-800 p-5 rounded-3xl shadow-xs space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-amber-50 text-[#e8b81a] font-bold text-base rounded-xl flex items-center justify-center">
                              {s.fullName.charAt(0)}
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-stone-800 dark:text-zinc-200">{s.fullName}</h4>
                              <p className="text-[10px] text-stone-400 font-bold tracking-wider">{s.phoneNumber}</p>
                            </div>
                          </div>

                          <p className="text-xs text-stone-500 dark:text-zinc-400 font-medium leading-relaxed min-h-[36px] line-clamp-2">
                            {s.address}
                          </p>

                          <div className="pt-3 border-t border-stone-100 dark:border-zinc-800/80 flex justify-end gap-2">
                            <button
    onClick={() => {
      setActiveSpeakerId(s.id);
      setViewState("edit");
    }}
    className="text-xs font-bold text-[#e8b81a] hover:underline"
  >
                              Ubah Detail
                            </button>
                            <span className="text-stone-300">&bull;</span>
                            <button
    onClick={() => handleDeleteSpeaker(s.id)}
    className="text-xs font-bold text-rose-500 hover:underline"
  >
                              Hapus
                            </button>
                          </div>
                        </div>)}
                    </div>
                  </div>}

                {(viewState === "create" || viewState === "edit") && <SpeakerManager
    speakers={speakers}
    initialSpeaker={activeSpeaker}
    onSave={handleSaveSpeaker}
    onCancel={() => setViewState("list")}
    addToast={addToast}
  />}
              </motion.div>}

            {
    /* MODULE 6: REGISTRAN WAITING LIST */
  }
            {activeModule === "registrant" && <motion.div
    key="registrant-module"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
                <RegistrantManager
    registrants={registrants}
    onSave={handleSaveRegistrant}
    addToast={addToast}
  />
              </motion.div>}

            {
    /* MODULE 7: MANAJEMEN USER */
  }
            {activeModule === "user" && <motion.div
    key="user-module"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="space-y-6"
  >
                {viewState === "list" && <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-zinc-900 border border-stone-200/60 dark:border-zinc-800 rounded-3xl p-5 shadow-xs">
                      <div>
                        <h3 className="text-lg font-display font-bold text-stone-800 dark:text-zinc-100">
                          Manajemen Pengguna Internal
                        </h3>
                        <p className="text-xs text-stone-400 mt-0.5">Kelola akun admin, kurator, editor, serta instruktur.</p>
                      </div>

                      <button
    onClick={() => {
      setViewState("create");
      setActiveUserId(null);
    }}
    className="bg-gradient-to-r from-stone-900 to-zinc-800 hover:from-stone-950 hover:to-zinc-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm"
  >
                        <Plus className="w-4 h-4 text-[#e8b81a]" /> Undang Pengguna
                      </button>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 border border-stone-200/60 dark:border-zinc-800 rounded-3xl overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-stone-50/50 border-b border-stone-100 text-[10px] font-bold text-stone-400 uppercase tracking-wider select-none">
                              <th onClick={() => {
    if (userSortField === "fullName") setUserSortDir((p) => p === "asc" ? "desc" : "asc");
    else {
      setUserSortField("fullName");
      setUserSortDir("asc");
    }
    setUserPage(1);
  }} className="p-4 cursor-pointer hover:bg-stone-100 dark:hover:bg-zinc-800 transition-colors">
                                Nama Pengguna {userSortField === "fullName" ? userSortDir === "asc" ? "\u25B2" : "\u25BC" : ""}
                              </th>
                              <th onClick={() => {
    if (userSortField === "email") setUserSortDir((p) => p === "asc" ? "desc" : "asc");
    else {
      setUserSortField("email");
      setUserSortDir("asc");
    }
    setUserPage(1);
  }} className="p-4 cursor-pointer hover:bg-stone-100 dark:hover:bg-zinc-800 transition-colors">
                                Email {userSortField === "email" ? userSortDir === "asc" ? "\u25B2" : "\u25BC" : ""}
                              </th>
                              <th onClick={() => {
    if (userSortField === "phoneNumber") setUserSortDir((p) => p === "asc" ? "desc" : "asc");
    else {
      setUserSortField("phoneNumber");
      setUserSortDir("asc");
    }
    setUserPage(1);
  }} className="p-4 cursor-pointer hover:bg-stone-100 dark:hover:bg-zinc-800 transition-colors">
                                Nomor Handphone {userSortField === "phoneNumber" ? userSortDir === "asc" ? "\u25B2" : "\u25BC" : ""}
                              </th>
                              <th onClick={() => {
    if (userSortField === "role") setUserSortDir((p) => p === "asc" ? "desc" : "asc");
    else {
      setUserSortField("role");
      setUserSortDir("asc");
    }
    setUserPage(1);
  }} className="p-4 cursor-pointer hover:bg-stone-100 dark:hover:bg-zinc-800 transition-colors">
                                Hak Akses Peran (Role) {userSortField === "role" ? userSortDir === "asc" ? "\u25B2" : "\u25BC" : ""}
                              </th>
                              <th className="p-4 text-right">Aksi</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-stone-100 dark:divide-zinc-800 text-xs font-medium">
                            {paginatedUsers.map((u) => {
    const roleObj = roles.find((r) => r.id === u.role);
    return <tr key={u.id} className="hover:bg-stone-50/20">
                                  <td className="p-4 font-bold text-stone-800 dark:text-zinc-200">{u.fullName}</td>
                                  <td className="p-4 text-stone-600 dark:text-zinc-400">{u.email}</td>
                                  <td className="p-4 text-stone-600 dark:text-zinc-400">{u.phoneNumber}</td>
                                  <td className="p-4">
                                    <span className="bg-amber-50 text-[#b45309] font-bold text-[10px] px-2 py-1 rounded-md">
                                      {roleObj ? roleObj.name : "Custom Access"}
                                    </span>
                                  </td>
                                  <td className="p-4 text-right space-x-2">
                                    <button
      onClick={() => {
        setActiveUserId(u.id);
        setViewState("edit");
      }}
      className="p-1 text-stone-400 hover:text-[#e8b81a] transition-colors"
    >
                                      <Edit3 className="w-4 h-4" />
                                    </button>
                                    <button
      onClick={() => handleDeleteUser(u.id)}
      className="p-1 text-stone-400 hover:text-rose-500 transition-colors"
    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </td>
                                </tr>;
  })}
                          </tbody>
                        </table>
                      </div>

                      {
    /* User Pagination Controls */
  }
                      {userTotalPages > 1 && <div className="flex items-center justify-between px-4 py-3 bg-stone-50 dark:bg-zinc-900 border-t border-stone-100 dark:border-zinc-850">
                          <span className="text-xs font-bold text-stone-500">
                            Halaman {userPage} dari {userTotalPages}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
    type="button"
    disabled={userPage === 1}
    onClick={() => setUserPage((prev) => Math.max(1, prev - 1))}
    className="px-3 py-1.5 bg-white dark:bg-zinc-800 hover:bg-stone-100 dark:hover:bg-zinc-750 text-xs font-bold text-stone-750 dark:text-zinc-300 border border-stone-200 dark:border-zinc-700 rounded-lg disabled:opacity-40 transition-colors"
  >
                              Sebelumnya
                            </button>
                            {Array.from({ length: userTotalPages }, (_, i) => i + 1).map((page) => <button
    key={page}
    type="button"
    onClick={() => setUserPage(page)}
    className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors ${userPage === page ? "bg-stone-900 text-white border-stone-900 dark:bg-zinc-700 dark:border-zinc-650" : "bg-white dark:bg-zinc-800 hover:bg-stone-100 dark:hover:bg-zinc-750 text-stone-750 dark:text-zinc-300 border-stone-200 dark:border-zinc-700"}`}
  >
                                {page}
                              </button>)}
                            <button
    type="button"
    disabled={userPage === userTotalPages}
    onClick={() => setUserPage((prev) => Math.min(userTotalPages, prev + 1))}
    className="px-3 py-1.5 bg-white dark:bg-zinc-800 hover:bg-stone-100 dark:hover:bg-zinc-750 text-xs font-bold text-stone-750 dark:text-zinc-300 border border-stone-200 dark:border-zinc-700 rounded-lg disabled:opacity-40 transition-colors"
  >
                              Berikutnya
                            </button>
                          </div>
                        </div>}
                    </div>
                  </div>}

                {(viewState === "create" || viewState === "edit") && <UserManager
    users={users}
    roles={roles}
    initialUser={activeUser}
    onSave={handleSaveUser}
    onCancel={() => setViewState("list")}
    addToast={addToast}
  />}
              </motion.div>}

            {
    /* MODULE 8: HAK AKSES (ROLES) */
  }
            {activeModule === "role" && <motion.div
    key="role-module"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="space-y-6"
  >
                {viewState === "list" && <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-zinc-900 border border-stone-200/60 dark:border-zinc-800 rounded-3xl p-5 shadow-xs">
                      <div>
                        <h3 className="text-lg font-display font-bold text-stone-800 dark:text-zinc-100">
                          Matriks Peran (Role Izin)
                        </h3>
                        <p className="text-xs text-stone-400 mt-0.5">Atur hak akses kustom untuk membatasi fitur kurikulum.</p>
                      </div>

                      <button
    onClick={() => {
      setViewState("create");
      setActiveRoleId(null);
    }}
    className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm"
  >
                        <Plus className="w-4 h-4" /> Tambah Role baru
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {roles.map((r) => <div key={r.id} className="bg-white dark:bg-zinc-900 border border-stone-200/60 dark:border-zinc-800 p-5 rounded-3xl shadow-xs space-y-4">
                          <div>
                            <h4 className="text-sm font-bold text-stone-850 dark:text-zinc-100">{r.name}</h4>
                            <p className="text-[10px] text-[#e8b81a] font-bold mt-1 uppercase tracking-wider">{r.access.length} Izin Izin Aktif</p>
                          </div>

                          <div className="flex flex-wrap gap-1.5 max-h-[100px] overflow-y-auto">
                            {r.access.map((acc, index) => <span key={index} className="bg-stone-50 dark:bg-zinc-800 text-[10px] px-2 py-0.5 rounded text-stone-500 border border-stone-150 font-mono">
                                {acc}
                              </span>)}
                          </div>

                          <div className="pt-3 border-t border-stone-100 flex justify-end gap-2.5">
                            <button
    onClick={() => {
      setActiveRoleId(r.id);
      setViewState("edit");
    }}
    className="text-xs font-bold text-[#e8b81a] hover:underline"
  >
                              Ubah Izin
                            </button>
                            <span className="text-stone-300">&bull;</span>
                            <button
    onClick={() => handleDeleteRole(r.id)}
    className="text-xs font-bold text-rose-500 hover:underline"
  >
                              Hapus
                            </button>
                          </div>
                        </div>)}
                    </div>
                  </div>}

                {(viewState === "create" || viewState === "edit") && <RoleManager
    initialRole={activeRole}
    onSave={handleSaveRole}
    onCancel={() => setViewState("list")}
    addToast={addToast}
  />}
              </motion.div>}

            {
    /* MODULE 9: PORTFOLIO ACCOUNT */
  }
            {activeModule === "account" && <motion.div
    key="account-module"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
                <AccountManager
    initialAccount={account}
    onSave={(updated) => {
      setAccount(updated);
      addToast("Profil akun berhasil diperbarui!", "success");
    }}
    addToast={addToast}
  />
              </motion.div>}

            {
    /* MODULE 10: SETTINGS PASSWORD */
  }
            {activeModule === "settings" && <motion.div
    key="settings-module"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
                <SettingsManager
    onResetPassword={handleResetPassword}
    addToast={addToast}
  />
              </motion.div>}
          </AnimatePresence>
        </main>
      </div>

      {
    /* Global customized active toast container alerts */
  }
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>;
}
