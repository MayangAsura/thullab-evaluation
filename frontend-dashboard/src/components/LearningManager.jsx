import { useState, useEffect } from "react";
import {
  Trash2,
  Settings,
  HelpCircle,
  ArrowLeft,
  Clock,
  HelpCircle as QuestionIcon
} from "lucide-react";
export const LearningManager = ({
  initialLearning,
  onSave,
  onCancel,
  addToast
}) => {
  const [name, setName] = useState("");
  const [contentType, setContentType] = useState("module");
  const [level, setLevel] = useState("pemula");
  const [learningHour, setLearningHour] = useState(60);
  const [duration, setDuration] = useState(0);
  const [numQuestions, setNumQuestions] = useState(2);
  const [isRandomQuestions, setIsRandomQuestions] = useState(false);
  const [isRandomAnswers, setIsRandomAnswers] = useState(false);
  const [maxPoints, setMaxPoints] = useState(100);
  const [status, setStatus] = useState("active");
  const [questionType, setQuestionType] = useState("multiple choice");
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    if (initialLearning) {
      setName(initialLearning.name);
      setContentType(initialLearning.contentType);
      setLevel(initialLearning.level);
      setLearningHour(initialLearning.learningHour);
      setDuration(initialLearning.duration);
      setNumQuestions(initialLearning.numQuestions);
      setIsRandomQuestions(initialLearning.isRandomQuestions);
      setIsRandomAnswers(initialLearning.isRandomAnswers);
      setMaxPoints(initialLearning.maxPoints);
      setStatus(initialLearning.status);
      setQuestionType(initialLearning.questionType);
      setQuestions(initialLearning.questions);
    } else {
      resetFields();
    }
  }, [initialLearning]);
  useEffect(() => {
    if (questionType !== "random") {
      if (initialLearning) {
        setQuestions((prev) => {
          if (prev.length === 0) return prev;
          if (prev.length < numQuestions) {
            const diff = numQuestions - prev.length;
            const newQs = [...prev];
            const t = questionType === "random" ? "multiple choice" : questionType;
            for (let i = 0; i < diff; i++) {
              newQs.push(createEmptyQuestion(newQs.length + 1, t));
            }
            return newQs;
          } else if (prev.length > numQuestions) {
            return prev.slice(0, numQuestions);
          }
          return prev;
        });
      } else {
        generateBlankQuestions(numQuestions, questionType);
      }
    }
  }, [numQuestions, questionType, initialLearning]);
  const resetFields = () => {
    setName("");
    setContentType("module");
    setLevel("pemula");
    setLearningHour(60);
    setDuration(0);
    setNumQuestions(2);
    setIsRandomQuestions(false);
    setIsRandomAnswers(false);
    setMaxPoints(100);
    setStatus("active");
    setQuestionType("multiple choice");
    setQuestions([]);
  };
  const generateBlankQuestions = (count, type) => {
    const newQuestions = [];
    const t = type === "random" ? "multiple choice" : type;
    for (let i = 1; i <= count; i++) {
      newQuestions.push(createEmptyQuestion(i, t));
    }
    setQuestions(newQuestions);
  };
  const createEmptyQuestion = (order, type) => {
    const id = "q-" + order + "-" + Date.now();
    const base = {
      id,
      order,
      question: "",
      type,
      point: 10,
      answer: ""
    };
    if (type === "multiple choice") {
      base.options = [
        { order: 1, option: "Pilihan A" },
        { order: 2, option: "Pilihan B" }
      ];
      base.answer = "1";
    } else if (type === "essay") {
      base.shortAnswer = "";
      base.answer = "";
    } else if (type === "multiple answers") {
      base.options = [
        { order: 1, option: "Opsi 1" },
        { order: 2, option: "Opsi 2" }
      ];
      base.answer = ["1"];
    } else if (type === "pair to pair") {
      base.leftDomain = ["Kiri A", "Kiri B"];
      base.rightDomain = ["Kanan 1", "Kanan 2"];
      base.answer = "1-1,2-2";
    }
    return base;
  };
  const updateQuestionText = (index, text) => {
    setQuestions(
      (prev) => prev.map((q, idx) => idx === index ? { ...q, question: text } : q)
    );
  };
  const updateQuestionPoint = (index, pt) => {
    setQuestions(
      (prev) => prev.map((q, idx) => idx === index ? { ...q, point: pt } : q)
    );
  };
  const updateQuestionAnswer = (index, ans) => {
    setQuestions(
      (prev) => prev.map((q, idx) => idx === index ? { ...q, answer: ans } : q)
    );
  };
  const addOptionToQuestion = (qIdx) => {
    setQuestions(
      (prev) => prev.map((q, idx) => {
        if (idx !== qIdx) return q;
        const currentOptions = q.options || [];
        const nextOrder = currentOptions.length + 1;
        return {
          ...q,
          options: [...currentOptions, { order: nextOrder, option: `Opsi Baru ${nextOrder}` }]
        };
      })
    );
    addToast("Opsi berhasil ditambahkan", "success");
  };
  const removeOptionFromQuestion = (qIdx, optOrder) => {
    setQuestions(
      (prev) => prev.map((q, idx) => {
        if (idx !== qIdx) return q;
        const currentOptions = q.options || [];
        if (currentOptions.length <= 2) {
          addToast("Minimal harus memiliki 2 opsi pilihan", "warning");
          return q;
        }
        const filtered = currentOptions.filter((o) => o.order !== optOrder);
        const reordered = filtered.map((o, index) => ({
          ...o,
          order: index + 1
        }));
        return {
          ...q,
          options: reordered
        };
      })
    );
  };
  const updateOptionText = (qIdx, optOrder, text) => {
    setQuestions(
      (prev) => prev.map((q, idx) => {
        if (idx !== qIdx) return q;
        const updatedOptions = (q.options || []).map(
          (o) => o.order === optOrder ? { ...o, option: text } : o
        );
        return { ...q, options: updatedOptions };
      })
    );
  };
  const toggleCheckboxAnswer = (qIdx, optOrder) => {
    const q = questions[qIdx];
    let currentAns = Array.isArray(q.answer) ? [...q.answer] : [String(q.answer)];
    if (currentAns.includes(optOrder)) {
      currentAns = currentAns.filter((a) => a !== optOrder);
    } else {
      currentAns.push(optOrder);
    }
    updateQuestionAnswer(qIdx, currentAns);
  };
  const addDomainItem = (qIdx, side) => {
    setQuestions(
      (prev) => prev.map((q, idx) => {
        if (idx !== qIdx) return q;
        if (side === "left") {
          const list = q.leftDomain || [];
          return { ...q, leftDomain: [...list, `Item Kiri ${list.length + 1}`] };
        } else {
          const list = q.rightDomain || [];
          return { ...q, rightDomain: [...list, `Item Kanan ${list.length + 1}`] };
        }
      })
    );
  };
  const updateDomainItemText = (qIdx, side, itemIdx, text) => {
    setQuestions(
      (prev) => prev.map((q, idx) => {
        if (idx !== qIdx) return q;
        if (side === "left") {
          const list = [...q.leftDomain || []];
          list[itemIdx] = text;
          return { ...q, leftDomain: list };
        } else {
          const list = [...q.rightDomain || []];
          list[itemIdx] = text;
          return { ...q, rightDomain: list };
        }
      })
    );
  };
  const removeDomainItem = (qIdx, side, itemIdx) => {
    setQuestions(
      (prev) => prev.map((q, idx) => {
        if (idx !== qIdx) return q;
        if (side === "left") {
          const list = (q.leftDomain || []).filter((_, i) => i !== itemIdx);
          return { ...q, leftDomain: list };
        } else {
          const list = (q.rightDomain || []).filter((_, i) => i !== itemIdx);
          return { ...q, rightDomain: list };
        }
      })
    );
  };
  const addNewQuestionOfSpecificType = (type) => {
    const nextOrder = questions.length + 1;
    const newQ = createEmptyQuestion(nextOrder, type);
    setQuestions((prev) => [...prev, newQ]);
    setNumQuestions((prev) => prev + 1);
    addToast(`Pertanyaan tipe ${type} ditambahkan!`, "success");
  };
  const removeQuestionFully = (index) => {
    if (questions.length <= 1) {
      addToast("Harus menyisakan minimal 1 pertanyaan", "warning");
      return;
    }
    const filtered = questions.filter((_, idx) => idx !== index);
    const reordered = filtered.map((q, idx) => ({
      ...q,
      order: idx + 1
    }));
    setQuestions(reordered);
    setNumQuestions(reordered.length);
    addToast("Pertanyaan dihapus", "warning");
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      addToast("Nama materi pembelajaran harus diisi", "warning");
      return;
    }
    if (questions.some((q) => !q.question.trim())) {
      addToast("Semua teks pertanyaan formulir harus diisi", "warning");
      return;
    }
    const totalPoints = questions.reduce((sum, q) => sum + (Number(q.point) || 0), 0);
    onSave({
      name: name.trim(),
      contentType,
      level,
      learningHour: Number(learningHour) || 60,
      duration: contentType === "exam" ? Number(duration) || 0 : 0,
      numQuestions: questions.length,
      isRandomQuestions,
      isRandomAnswers,
      maxPoints: totalPoints || maxPoints,
      status,
      questionType,
      questions
    });

    console.log('questions', questions)
  };
  return <form onSubmit={handleFormSubmit} className="space-y-8">
      {
    /* Premium Gradient Title Header */
  }
      <div className="bg-gradient-to-r from-amber-500 via-[#e8b81a] to-yellow-600 rounded-3xl p-8 text-white shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Pembelajaran
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold mt-2">
              {initialLearning ? "Ubah Materi Pembelajaran" : "Buat Materi Pembelajaran"}
            </h2>
            <p className="text-white/80 text-sm mt-1">
              Definisikan silabus, tipe konten, konfigurasi ujian, serta rancang soal pertanyaan interaktif.
            </p>
          </div>
          <button
    type="button"
    onClick={onCancel}
    className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 border border-white/10 transition-all shrink-0"
  >
            <ArrowLeft className="w-4 h-4" /> Batal
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {
    /* LEFT COLUMN: Core Configuration */
  }
        <div className="lg:col-span-5 bg-white dark:bg-zinc-900 border border-stone-100 dark:border-zinc-800 rounded-2xl p-6 space-y-6 shadow-xs">
          <h3 className="text-base font-bold text-stone-800 dark:text-zinc-100 border-b border-stone-100 dark:border-zinc-800 pb-3 flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#e8b81a]" /> Pengaturan Konten
          </h3>

          {
    /* Name */
  }
          <div>
            <label className="block text-xs font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
              Nama Materi / Ujian <span className="text-rose-500">*</span>
            </label>
            <input
    type="text"
    required
    value={name}
    onChange={(e) => setName(e.target.value)}
    placeholder="Contoh: Kuis Akhir Pemrograman JavaScript Modern"
    className="w-full bg-stone-50 dark:bg-zinc-850 border border-stone-200 dark:border-zinc-750 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#e8b81a]"
  />
          </div>

          {
    /* Content Type & Level */
  }
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                Tipe Konten
              </label>
              <select
    value={contentType}
    onChange={(e) => setContentType(e.target.value)}
    className="w-full bg-stone-50 dark:bg-zinc-850 border border-stone-200 dark:border-zinc-750 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#e8b81a]"
  >
                <option value="module">Module (Materi)</option>
                <option value="exam">Exam (Ujian)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                Tingkat Kesulitan
              </label>
              <select
    value={level}
    onChange={(e) => setLevel(e.target.value)}
    className="w-full bg-stone-50 dark:bg-zinc-850 border border-stone-200 dark:border-zinc-750 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#e8b81a]"
  >
                <option value="pemula">Pemula</option>
                <option value="menengah">Menengah</option>
                <option value="ahli">Ahli</option>
              </select>
            </div>
          </div>

          {
    /* Learning Hours & Exam Duration */
  }
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Jam Belajar (Menit)
              </label>
              <input
    type="number"
    min="1"
    value={learningHour}
    onChange={(e) => setLearningHour(Math.max(1, parseInt(e.target.value) || 0))}
    className="w-full bg-stone-50 dark:bg-zinc-850 border border-stone-200 dark:border-zinc-750 rounded-xl px-3 py-2.5 text-xs font-semibold"
  />
            </div>

            {contentType === "exam" && <div>
                <label className="block text-xs font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                  Durasi Ujian (Menit)
                </label>
                <input
    type="number"
    min="0"
    value={duration}
    onChange={(e) => setDuration(Math.max(0, parseInt(e.target.value) || 0))}
    className="w-full bg-stone-50 dark:bg-zinc-850 border border-stone-200 dark:border-zinc-750 rounded-xl px-3 py-2.5 text-xs font-semibold"
  />
              </div>}
          </div>

          {
    /* Questions settings */
  }
          <div className="space-y-4 pt-4 border-t border-stone-100 dark:border-zinc-800">
            <div>
              <label className="block text-xs font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                Tipe Soal Utama
              </label>
              <select
    value={questionType}
    onChange={(e) => setQuestionType(e.target.value)}
    className="w-full bg-stone-50 dark:bg-zinc-850 border border-stone-200 dark:border-zinc-750 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#e8b81a]"
  >
                <option value="multiple choice">Pilihan Ganda (Multiple Choice)</option>
                <option value="essay">Esai (Essay)</option>
                <option value="multiple answers">Banyak Jawaban (Multiple Answers)</option>
                <option value="pair to pair">Mencocokkan (Pair to Pair)</option>
                <option value="random">Acak / Campuran (Random)</option>
              </select>
            </div>

            {questionType !== "random" && <div>
                <label className="block text-xs font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                  Jumlah Pertanyaan
                </label>
                <input
    type="number"
    min="1"
    max="100"
    value={numQuestions}
    onChange={(e) => setNumQuestions(Math.max(1, parseInt(e.target.value) || 1))}
    className="w-full bg-stone-50 dark:bg-zinc-850 border border-stone-200 dark:border-zinc-750 rounded-xl px-3 py-2.5 text-xs font-semibold"
  />
                {initialLearning && <div className="mt-2 text-[11px] font-bold text-amber-700 bg-amber-50 dark:bg-zinc-850 border border-amber-200/50 p-2.5 rounded-xl flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-[#e8b81a] shrink-0" />
                    <span>Sisa pertanyaan belum diisi: {questions.filter((q) => !q.question.trim()).length} dari {numQuestions} soal</span>
                  </div>}
              </div>}

            {
    /* Status (active and inactive) */
  }
            <div>
              <label className="block text-xs font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                Status
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-stone-600 dark:text-zinc-300">
                  <input
    type="radio"
    name="status"
    checked={status === "active"}
    onChange={() => setStatus("active")}
    className="accent-[#e8b81a]"
  />
                  Aktif
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-stone-600 dark:text-zinc-300">
                  <input
    type="radio"
    name="status"
    checked={status === "inactive"}
    onChange={() => setStatus("inactive")}
    className="accent-[#e8b81a]"
  />
                  Nonaktif
                </label>
              </div>
            </div>

            {
    /* Random Checkboxes */
  }
            <div className="space-y-3 pt-2">
              <label className="flex items-center gap-2.5 text-xs font-semibold text-stone-600 dark:text-zinc-300 cursor-pointer">
                <input
    type="checkbox"
    checked={isRandomQuestions}
    onChange={(e) => setIsRandomQuestions(e.target.checked)}
    className="rounded-sm accent-[#e8b81a] w-4 h-4"
  />
                Acak Urutan Pertanyaan
              </label>

              <label className="flex items-center gap-2.5 text-xs font-semibold text-stone-600 dark:text-zinc-300 cursor-pointer">
                <input
    type="checkbox"
    checked={isRandomAnswers}
    onChange={(e) => setIsRandomAnswers(e.target.checked)}
    className="rounded-sm accent-[#e8b81a] w-4 h-4"
  />
                Acak Urutan Pilihan Jawaban
              </label>
            </div>
          </div>
        </div>

        {
    /* RIGHT COLUMN: Interactive Dynamic Questions Form */
  }
        <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-stone-100 dark:border-zinc-800 rounded-2xl p-6 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 dark:border-zinc-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-stone-800 dark:text-zinc-100 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#e8b81a]" /> Formulir Soal Pertanyaan
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">
                Jumlah Pertanyaan: {questions.length} | Tipe: {questionType}
              </p>
            </div>

            {
    /* Random Mode Add Button selector */
  }
            {questionType === "random" && <div className="flex flex-wrap gap-1">
                {["multiple choice", "multiple answers", "essay", "pair to pair"].map((t) => <button
    key={t}
    type="button"
    onClick={() => addNewQuestionOfSpecificType(t)}
    className="text-[10px] font-bold bg-[#e8b81a]/10 hover:bg-[#e8b81a]/20 text-[#e8b81a] border border-[#e8b81a]/30 px-2 py-1 rounded-md transition-colors"
  >
                    + {t === "multiple choice" ? "PG" : t === "multiple answers" ? "Multi Opsi" : t === "essay" ? "Esai" : "Pasangan"}
                  </button>)}
              </div>}
          </div>

          {questions.length === 0 ? <div className="text-center py-12 border-2 border-dashed border-stone-200 dark:border-zinc-800 rounded-xl space-y-2">
              <QuestionIcon className="w-8 h-8 text-stone-300 mx-auto" />
              <p className="text-xs font-semibold text-stone-400">Belum ada pertanyaan dibuat.</p>
              {questionType === "random" && <p className="text-[11px] text-stone-400">Klik salah satu tombol tipe pertanyaan di atas untuk menambahkan!</p>}
            </div> : <div className="space-y-6 max-h-[600px] overflow-y-auto pr-1">
              {questions.map((q, qIdx) => <div
    key={q.id}
    className="bg-stone-50/70 dark:bg-zinc-850 p-5 rounded-2xl border border-stone-200/60 dark:border-zinc-800 space-y-4 relative group"
  >
                  <div className="flex items-center justify-between">
                    <span className="bg-amber-100 dark:bg-amber-950/40 text-[#e8b81a] text-xs font-bold px-2.5 py-1 rounded-lg">
                      Soal #{q.order}
                    </span>
                    <div className="flex items-center gap-3">
                      {
    /* Points setting per question */
  }
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-stone-400 font-bold uppercase">Poin:</span>
                        <input
    type="number"
    min="0"
    max="100"
    value={q.point}
    onChange={(e) => updateQuestionPoint(qIdx, parseInt(e.target.value) || 0)}
    className="w-14 bg-white dark:bg-zinc-800 border border-stone-200 rounded-lg text-center text-xs font-bold py-1 focus:ring-1 focus:ring-[#e8b81a]"
  />
                      </div>

                      <button
    type="button"
    onClick={() => removeQuestionFully(qIdx)}
    className="text-stone-400 hover:text-rose-600 transition-colors"
    title="Hapus Soal"
  >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {
    /* Question Prompt */
  }
                  <div>
                    <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">Pertanyaan</label>
                    <textarea
    required
    rows={2}
    value={q.question}
    onChange={(e) => updateQuestionText(qIdx, e.target.value)}
    placeholder="Masukkan deskripsi pertanyaan..."
    className="w-full bg-white dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 rounded-xl p-3 text-xs font-medium focus:ring-1 focus:ring-[#e8b81a]"
  />
                  </div>

                  {
    /* SUB-FORM BASED ON QUESTION TYPE */
  }

                  {
    /* TIPE A: MULTIPLE CHOICE */
  }
                  {q.type === "multiple choice" && <div className="space-y-3 pt-2 border-t border-stone-150/50 dark:border-zinc-800">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-stone-500 uppercase">Pilihan Jawaban</span>
                        <button
    type="button"
    onClick={() => addOptionToQuestion(qIdx)}
    className="text-[10px] font-bold text-[#e8b81a] hover:underline"
  >
                          + Tambah Opsi
                        </button>
                      </div>

                      <div className="space-y-2">
                        {(q.options || []).map((opt) => {
    const isAnswer = String(q.answer) === String(opt.order);
    return <div key={opt.order} className="flex items-center gap-2">
                              <span className="text-xs font-bold text-stone-400 w-5">
                                {String.fromCharCode(64 + opt.order)}.
                              </span>
                              <input
      type="text"
      value={opt.option}
      onChange={(e) => updateOptionText(qIdx, opt.order, e.target.value)}
      placeholder={`Opsi ${opt.order}`}
      className="flex-1 bg-white dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs font-medium focus:ring-1 focus:ring-[#e8b81a]"
    />
                              <button
      type="button"
      onClick={() => {
        updateQuestionAnswer(qIdx, String(opt.order));
      }}
      className={`p-1.5 rounded-lg border transition-all text-[10px] font-bold ${isAnswer ? "bg-emerald-500 text-white border-emerald-500" : "bg-white text-stone-400 hover:text-stone-600 border-stone-200"}`}
      title="Set sebagai Jawaban Benar"
    >
                                {isAnswer ? "Kunci" : "Set Kunci"}
                              </button>
                              <button
      type="button"
      onClick={() => removeOptionFromQuestion(qIdx, opt.order)}
      className="text-stone-300 hover:text-rose-500 transition-colors"
    >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>;
  })}
                      </div>
                    </div>}

                  {
    /* TIPE B: ESSAY */
  }
                  {q.type === "essay" && <div className="space-y-2 pt-2 border-t border-stone-150/50 dark:border-zinc-800">
                      <div>
                        <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                          Jawaban Singkat (Short Answer Text Input)
                        </label>
                        <input
    type="text"
    value={q.shortAnswer || ""}
    onChange={(e) => {
      const val = e.target.value;
      setQuestions(
        (prev) => prev.map(
          (item, idx) => idx === qIdx ? { ...item, shortAnswer: val } : item
        )
      );
    }}
    placeholder="Masukkan kata kunci/jawaban singkat penjelas..."
    className="w-full bg-white dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 rounded-lg px-3 py-1.5 text-xs font-medium"
  />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                          Jawaban Ideal / Kunci Jawaban Lengkap
                        </label>
                        <textarea
    rows={2}
    value={String(q.answer)}
    onChange={(e) => updateQuestionAnswer(qIdx, e.target.value)}
    placeholder="Sebutkan kunci jawaban esai detail..."
    className="w-full bg-white dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 rounded-lg p-2.5 text-xs font-medium"
  />
                      </div>
                    </div>}

                  {
    /* TIPE C: MULTIPLE ANSWERS */
  }
                  {q.type === "multiple answers" && <div className="space-y-3 pt-2 border-t border-stone-150/50 dark:border-zinc-800">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-stone-500 uppercase">Pilihan Ganda Kompleks (Centang Semua yang Benar)</span>
                        <button
    type="button"
    onClick={() => addOptionToQuestion(qIdx)}
    className="text-[10px] font-bold text-[#e8b81a] hover:underline"
  >
                          + Tambah Opsi
                        </button>
                      </div>

                      <div className="space-y-2">
                        {(q.options || []).map((opt) => {
    const answersList = Array.isArray(q.answer) ? q.answer : [String(q.answer)];
    const isChecked = answersList.includes(String(opt.order));
    return <div key={opt.order} className="flex items-center gap-2">
                              <input
      type="checkbox"
      checked={isChecked}
      onChange={() => toggleCheckboxAnswer(qIdx, String(opt.order))}
      className="accent-[#e8b81a] w-4 h-4 rounded-sm"
    />
                              <input
      type="text"
      value={opt.option}
      onChange={(e) => updateOptionText(qIdx, opt.order, e.target.value)}
      placeholder="Pilihan..."
      className="flex-1 bg-white dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 rounded-lg px-2 py-1 text-xs font-medium"
    />
                              <button
      type="button"
      onClick={() => removeOptionFromQuestion(qIdx, opt.order)}
      className="text-stone-300 hover:text-rose-500 transition-colors"
    >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>;
  })}
                      </div>
                    </div>}

                  {
    /* TIPE D: PAIR TO PAIR */
  }
                  {q.type === "pair to pair" && <div className="space-y-4 pt-2 border-t border-stone-150/50 dark:border-zinc-800">
                      <div className="grid grid-cols-2 gap-4">
                        {
    /* Left Domain */
  }
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-stone-400 uppercase">Left Domain (Kiri)</span>
                            <button
    type="button"
    onClick={() => addDomainItem(qIdx, "left")}
    className="text-[10px] font-bold text-[#e8b81a]"
  >
                              + Item
                            </button>
                          </div>
                          <div className="space-y-1.5">
                            {(q.leftDomain || []).map((item, idx) => <div key={idx} className="flex items-center gap-1">
                                <span className="text-[10px] font-bold text-stone-400 w-4">{idx + 1}.</span>
                                <input
    type="text"
    value={item}
    onChange={(e) => updateDomainItemText(qIdx, "left", idx, e.target.value)}
    className="flex-1 bg-white dark:bg-zinc-800 border border-stone-200 rounded px-2 py-1 text-xs"
  />
                                <button
    type="button"
    onClick={() => removeDomainItem(qIdx, "left", idx)}
    className="text-stone-300 hover:text-rose-500"
  >
                                  &times;
                                </button>
                              </div>)}
                          </div>
                        </div>

                        {
    /* Right Domain */
  }
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-stone-400 uppercase">Right Domain (Kanan)</span>
                            <button
    type="button"
    onClick={() => addDomainItem(qIdx, "right")}
    className="text-[10px] font-bold text-[#e8b81a]"
  >
                              + Item
                            </button>
                          </div>
                          <div className="space-y-1.5">
                            {(q.rightDomain || []).map((item, idx) => <div key={idx} className="flex items-center gap-1">
                                <span className="text-[10px] font-bold text-stone-400 w-4">{idx + 1}.</span>
                                <input
    type="text"
    value={item}
    onChange={(e) => updateDomainItemText(qIdx, "right", idx, e.target.value)}
    className="flex-1 bg-white dark:bg-zinc-800 border border-stone-200 rounded px-2 py-1 text-xs"
  />
                                <button
    type="button"
    onClick={() => removeDomainItem(qIdx, "right", idx)}
    className="text-stone-300 hover:text-rose-500"
  >
                                  &times;
                                </button>
                              </div>)}
                          </div>
                        </div>
                      </div>

                      {
    /* Pairing Answer format */
  }
                      <div>
                        <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                          Pasangan Kunci Jawaban (Format Kiri-Kanan dipisah Koma, Contoh: 1-1,2-2,3-3)
                        </label>
                        <input
    type="text"
    required
    value={String(q.answer)}
    onChange={(e) => updateQuestionAnswer(qIdx, e.target.value)}
    placeholder="Contoh: 1-2,2-1,3-3"
    className="w-full bg-white dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 rounded-lg px-3 py-1.5 text-xs font-semibold font-mono"
  />
                      </div>
                    </div>}

                </div>)}
            </div>}
        </div>
      </div>

      {
    /* FOOTER ACTIONS */
  }
      <div className="flex justify-end gap-3 pt-6 border-t border-stone-100 dark:border-zinc-800">
        <button
    type="button"
    onClick={onCancel}
    className="px-6 py-3 bg-stone-100 hover:bg-stone-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-stone-600 dark:text-zinc-300 text-sm font-semibold rounded-xl"
  >
          Batal
        </button>
        <button
    type="submit"
    className="px-8 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white text-sm font-bold rounded-xl shadow-md"
  >
          Simpan Pembelajaran
        </button>
      </div>
    </form>;
};
