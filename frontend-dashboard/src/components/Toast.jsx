import { useEffect } from "react";
import { CheckCircle, AlertTriangle, XCircle, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
export const ToastContainer = ({ toasts, removeToast }) => {
  return <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />)}
      </AnimatePresence>
    </div>;
};
const ToastItem = ({ toast, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4e3);
    return () => clearTimeout(timer);
  }, [onClose]);
  const config = {
    success: {
      bg: "bg-emerald-50 dark:bg-emerald-950/40",
      border: "border-emerald-200 dark:border-emerald-800",
      text: "text-emerald-800 dark:text-emerald-200",
      icon: <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
    },
    warning: {
      bg: "bg-amber-50 dark:bg-amber-950/40",
      border: "border-amber-200 dark:border-amber-800",
      text: "text-amber-800 dark:text-amber-200",
      icon: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
    },
    error: {
      bg: "bg-rose-50 dark:bg-rose-950/40",
      border: "border-rose-200 dark:border-rose-800",
      text: "text-rose-800 dark:text-rose-200",
      icon: <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
    },
    info: {
      bg: "bg-blue-50 dark:bg-blue-950/40",
      border: "border-blue-200 dark:border-blue-800",
      text: "text-blue-800 dark:text-blue-200",
      icon: <Info className="w-5 h-5 text-blue-500 shrink-0" />
    }
  }[toast.type];
  return <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9, y: -10 }}
    transition={{ duration: 0.2 }}
    className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border ${config.bg} ${config.border} ${config.text} shadow-lg`}
  >
      {config.icon}
      <div className="flex-1 text-sm font-medium leading-tight">{toast.text}</div>
      <button
    onClick={onClose}
    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
  >
        <X className="w-4 h-4" />
      </button>
    </motion.div>;
};
