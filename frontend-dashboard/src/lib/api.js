import axios from "axios";
export const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json"
  }
});
const getStoredAuthors = () => {
  const saved = localStorage.getItem("edu_forge_speakers_db");
  if (saved) return JSON.parse(saved);
  const speakers = [
    { id: "speaker-1", fullName: "Budi Pratama, M.T.", phoneNumber: "081288889999", address: "Jl. Margonda Raya No. 45, Depok" },
    { id: "speaker-2", fullName: "Rina Wati, S.Ds.", phoneNumber: "081377776666", address: "Kebayoran Baru No. 12, Jakarta Selatan" },
    { id: "speaker-3", fullName: "Dr. Ahmad Fauzi", phoneNumber: "082133334444", address: "Dago Asri No. 18, Bandung" }
  ];
  localStorage.setItem("edu_forge_speakers_db", JSON.stringify(speakers));
  return speakers;
};
const getStoredCategories = () => {
  const saved = localStorage.getItem("edu_forge_categories_db");
  if (saved) return JSON.parse(saved);
  const categories = [
    { id: "tech", name: "Teknologi & Informasi", parent: null, description: "Kategori utama teknologi." },
    { id: "web-dev", name: "Web Development", parent: "tech", description: "Pengembangan website modern." },
    { id: "design", name: "Seni & Desain", parent: null, description: "Desain grafis dan UI/UX." },
    { id: "ui-ux", name: "UI/UX Design", parent: "design", description: "Pembuatan wireframe." }
  ];
  localStorage.setItem("edu_forge_categories_db", JSON.stringify(categories));
  return categories;
};
const getStoredClasses = () => {
  const saved = localStorage.getItem("edu_forge_classes_db");
  if (saved) return JSON.parse(saved);
  const initialClasses = [
    {
      id: "class-1",
      name: "React 19 & Tailwind CSS Masterclass",
      level: "menengah",
      category: "web-dev",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
      learningHour: 180,
      description: "Belajar membuat web modern dengan performa tinggi menggunakan React 19 dan Tailwind CSS v4.",
      authors: ["speaker-1", "speaker-2"],
      status: "save",
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    },
    {
      id: "class-2",
      name: "Fundamental UI/UX Design untuk Pemula",
      level: "pemula",
      category: "ui-ux",
      image: "https://images.unsplash.com/photo-1541462608141-27b2974e5351?auto=format&fit=crop&w=600&q=80",
      learningHour: 120,
      description: "Langkah awal memahami riset pengguna, wireframing, dan visual design.",
      authors: ["speaker-2"],
      status: "draft",
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    }
  ];
  localStorage.setItem("edu_forge_classes_db", JSON.stringify(initialClasses));
  return initialClasses;
};
const getStoredUsers = () => {
  const saved = localStorage.getItem("edu_forge_users_db");
  if (saved) return JSON.parse(saved);
  const users = [
    {
      id: "user-1",
      fullName: "Mhd. Mayang Asura",
      phoneNumber: "081234567890",
      email: "mayang.asura123@gmail.com",
      role: "role-admin",
      password: "password123"
      // default login password
    }
  ];
  localStorage.setItem("edu_forge_users_db", JSON.stringify(users));
  return users;
};
api.interceptors.request.use((config) => {
  const url = config.url || "";
  const method = (config.method || "get").toLowerCase();
  if (url.includes("cloudinary.com") || url.includes("upload")) {
    const mockCloudinaryResponse = {
      data: {
        secure_url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80"
      },
      status: 200,
      statusText: "OK",
      headers: {},
      config
    };
    return Promise.reject({ mockResponse: mockCloudinaryResponse });
  }
  if (url.endsWith("/categories")) {
    const categories = getStoredCategories();
    return Promise.reject({
      mockResponse: {
        data: categories,
        status: 200,
        statusText: "OK",
        headers: {},
        config
      }
    });
  }
  if (url.endsWith("/authors")) {
    const authors = getStoredAuthors();
    return Promise.reject({
      mockResponse: {
        data: authors,
        status: 200,
        statusText: "OK",
        headers: {},
        config
      }
    });
  }
  if (url.includes("/classes")) {
    const classes = getStoredClasses();
    if (method === "get") {
      return Promise.reject({
        mockResponse: {
          data: classes,
          status: 200,
          statusText: "OK",
          headers: {},
          config
        }
      });
    }
    if (method === "post") {
      const body = JSON.parse(config.data);
      const newClass = {
        ...body,
        id: "class-" + Date.now(),
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      const updated = [...classes, newClass];
      localStorage.setItem("edu_forge_classes_db", JSON.stringify(updated));
      return Promise.reject({
        mockResponse: {
          data: newClass,
          status: 201,
          statusText: "Created",
          headers: {},
          config
        }
      });
    }
    if (method === "put") {
      const body = JSON.parse(config.data);
      const id = url.split("/").pop();
      const updated = classes.map((c) => c.id === id ? { ...c, ...body } : c);
      localStorage.setItem("edu_forge_classes_db", JSON.stringify(updated));
      return Promise.reject({
        mockResponse: {
          data: body,
          status: 200,
          statusText: "OK",
          headers: {},
          config
        }
      });
    }
    if (method === "delete") {
      const id = url.split("/").pop();
      const filtered = classes.filter((c) => c.id !== id);
      localStorage.setItem("edu_forge_classes_db", JSON.stringify(filtered));
      return Promise.reject({
        mockResponse: {
          data: { success: true },
          status: 200,
          statusText: "OK",
          headers: {},
          config
        }
      });
    }
  }
  if (url.endsWith("/login")) {
    const body = JSON.parse(config.data);
    const users = getStoredUsers();
    console.log('users', users)
    const foundUser = users.find(
      (u) => (u.email.toLowerCase() === body.email?.toLowerCase() || u.fullName.toLowerCase().replace(/\s+/g, "") === body.username?.toLowerCase()) && (body.password === "password123" || u.password === body.password || !u.password)
    );
    if (foundUser) {
      return Promise.reject({
        mockResponse: {
          data: {
            token: "mock-jwt-token-xyz-" + foundUser.id,
            userInfo: {
              name: foundUser.fullName,
              username: foundUser.fullName.toLowerCase().replace(/\s+/g, ""),
              email: foundUser.email,
              role: foundUser.role === "role-admin" ? "Admin" : "Editor"
            }
          },
          status: 200,
          statusText: "OK",
          headers: {},
          config
        }
      });
    } else {
      return Promise.reject({
        mockError: {
          response: {
            data: { message: "Email/Username atau Password salah!" },
            status: 401
          }
        }
      });
    }
  }
  if (url.endsWith("/register")) {
    const body = JSON.parse(config.data);
    const users = getStoredUsers();
    const exists = users.some((u) => u.email.toLowerCase() === body.email.toLowerCase());
    if (exists) {
      return Promise.reject({
        mockError: {
          response: {
            data: { message: "Email sudah terdaftar!" },
            status: 400
          }
        }
      });
    }
    const newUser = {
      id: "user-" + Date.now(),
      fullName: body.name,
      email: body.email,
      phoneNumber: "08123456789",
      role: "role-editor",
      password: body.password
    };
    const updatedUsers = [...users, newUser];
    localStorage.setItem("edu_forge_users_db", JSON.stringify(updatedUsers));
    return Promise.reject({
      mockResponse: {
        data: {
          token: "mock-jwt-token-xyz-" + newUser.id,
          userInfo: {
            name: newUser.fullName,
            username: newUser.fullName.toLowerCase().replace(/\s+/g, ""),
            email: newUser.email,
            role: "Editor"
          }
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config
      }
    });
  }
  return config;
});
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error && error.mockResponse) {
      return Promise.resolve(error.mockResponse);
    }
    if (error && error.mockError) {
      return Promise.reject(error.mockError);
    }
    return Promise.reject(error);
  }
);
