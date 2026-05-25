"use client";

import Image from "next/image";
import { X, ChevronDown, Sparkles,} from "lucide-react";
import { useRef, useState } from "react";
import { useAppSelector } from "@/redux/hooks/hooks";
import { Course } from "@/types/course";
import { CreateCourse } from "@/types/createCourse";
import { uploadMediaToSupabase } from "@/services/uploader/uploader";

type ModalProps = {
  onClose: () => void;
  onSave: (data: CreateCourse) => void;
  initial?: Course | null;
};

// ─── Constants ────────────────────────────────────────────────────────────────
const LEVELS = ["Beginner", "Intermediate", "Advanced"];

// ─── Component ────────────────────────────────────────────────────────────────

function AddCourse({ onClose, onSave, initial }: ModalProps) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const { categories } = useAppSelector((state) => state.category);
  const [form, setForm] = useState({
    title: initial?.title || "",
    description: initial?.description || "",
    category: initial?.category?.id || categories[0]?.id || "",
    level: initial?.level || "Beginner",
    price: initial?.price || 0,
    thumbnail: initial?.thumbnail || "",
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // instant preview
    const preview = URL.createObjectURL(file);

    setForm((prev) => ({
      ...prev,
      thumbnail: preview,
    }));

    // upload to supabase
    const result = await uploadMediaToSupabase(file);

    if (!result) return;

    setForm((prev) => ({
      ...prev,
      thumbnail: result.url, // ✅ ONLY URL
    }));
  };

  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof form, string>>
  >({});
  const [imgError, setImgError] = useState(false);

  const set = (k: keyof typeof form, v: string) => {
    setForm((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const validate = () => {
    const e: typeof errors = {};
    if (!form.title.trim()) e.title = "Course title is required";
    if (!form.description?.trim()) e.description = "description is required";
    if (!form.price) e.price = "Price is required";
    if (!form.thumbnail) e.thumbnail = "thumbnail is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave(form);
  };

  // ── Shared styles ──────────────────────────────────────────────────────────

  const inputBase =
    "w-full rounded-xl bg-white/[0.04] border text-sm text-white placeholder-white/25 outline-none transition-all duration-200 px-4 py-3 focus:bg-violet-500/5 focus:ring-1 focus:ring-violet-500/30";

  const inputCls = (field: keyof typeof form) =>
    `${inputBase} ${
      errors[field]
        ? "border-rose-500/50 focus:border-rose-500/70"
        : "border-white/8 focus:border-violet-500/50"
    }`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="absolute inset-0 bg-black/65 backdrop-blur-lg" />

      <div className="relative flex w-full max-w-lg flex-col max-h-[92vh] rounded-2xl border border-white/10 bg-[#0d0d14] shadow-2xl shadow-black/60">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-violet-500/60 to-transparent" />

        {/* Ambient blobs */}
        <div className="pointer-events-none absolute -top-20 -left-20 h-48 w-48 rounded-full bg-violet-600/12 blur-[80px]" />
        <div className="pointer-events-none absolute -bottom-20 -right-16 h-48 w-48 rounded-full bg-purple-700/10 blur-[80px]" />

        <div className="relative flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-xl bg-linear-to-br from-violet-500 to-purple-600 opacity-50 blur-md" />
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-violet-500 via-purple-500 to-indigo-500 shadow-lg">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
            </div>

            <div>
              <h2 className="text-[15px] font-bold leading-tight text-white">
                {initial ? "Edit Course" : "New Course"}
              </h2>
              <p className="text-[11px] text-white/35">
                {initial
                  ? "Update course details"
                  : "Fill in the details to publish"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/8 bg-white/4 text-white/40 transition-all duration-200 hover:border-white/15 hover:bg-white/8 hover:text-white"
            aria-label="Close"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="mx-6 h-px bg-white/6" />
        <div className="relative flex-1 overflow-y-auto space-y-5 px-6 py-5">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-widest text-white/35 mb-2">
              Thumbnail URL
            </label>

            <div className="flex gap-2">
              <div
                onClick={() => fileRef.current?.click()}
                className="relative h-28 w-full cursor-pointer overflow-hidden rounded-xl border border-white/8"
              >
                <Image
                  src={form.thumbnail || "/placeholder.png"}
                  alt="thumbnail preview"
                  fill
                  sizes="100%"
                  className="object-cover"
                  onError={() => setImgError(true)}
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                <span className="absolute bottom-2 left-3 text-[10px] font-semibold uppercase tracking-widest text-white/60">
                  Click to upload
                </span>
              </div>

              {/* hidden input */}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageUpload}
              />
            </div>
               {!imgError&& errors.thumbnail && (
              <p className="mt-1.5 flex items-center gap-1 text-[11px] text-rose-400">
                <span className="inline-block h-1 w-1 rounded-full bg-rose-400" />
                {errors.thumbnail}
              </p>
            )}
          </div>
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-widest text-white/35 mb-2">
              Course Title <span className="text-violet-400/80">*</span>
            </label>
            <input
              className={inputCls("title")}
              placeholder="e.g. Advanced React Patterns"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
            />
            {errors.title && (
              <p className="mt-1.5 flex items-center gap-1 text-[11px] text-rose-400">
                <span className="inline-block h-1 w-1 rounded-full bg-rose-400" />
                {errors.title}
              </p>
            )}
          </div>
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-widest text-white/35 mb-2">
              Description <span className="text-violet-400/80">*</span>
            </label>
            <textarea
              className={inputCls("title")}
              placeholder="e.g. Advanced React Patterns"
              value={form.description || ""}
              onChange={(e) => set("description", e.target.value)}
            />
            {errors.description && (
              <p className="mt-1.5 flex items-center gap-1 text-[11px] text-rose-400">
                <span className="inline-block h-1 w-1 rounded-full bg-rose-400" />
                {errors.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-widest text-white/35 mb-2">
                Category
              </label>
              <div className="relative">
                <select
                  className={`${inputBase} border-white/8 focus:border-violet-500/50 appearance-none pr-9 cursor-pointer`}
                  value={ form.category }
                  onChange={(e) => set("category", e.target.value)}
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id} className="bg-[#0d0d14]">
                      {c.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-widest text-white/35 mb-2">
                Level
              </label>
              <div className="relative">
                <select
                  className={`${inputBase} border-white/8 focus:border-violet-500/50 appearance-none pr-9 cursor-pointer`}
                  value={form.level || ""}
                  onChange={(e) => set("level", e.target.value)}
                >
                  {LEVELS.map((l) => (
                    <option key={l} value={l} className="bg-[#0d0d14]">
                      {l}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30" />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-widest text-white/35 mb-2">
              Price <span className="text-violet-400/80">*</span>
            </label>
            <input
              className={inputCls("price")}
              placeholder="e.g. $89.00"
              value={form.price}
              onChange={(e) => set("price", e.target.value)}
            />
            {errors.price && (
              <p className="mt-1.5 flex items-center gap-1 text-[11px] text-rose-400">
                <span className="inline-block h-1 w-1 rounded-full bg-rose-400" />
                {errors.price}
              </p>
            )}
          </div>
          <div>
            {/* <label className="block text-[11px] font-semibold uppercase tracking-widest text-white/35 mb-2">Thumbnail URL</label>
            <div className="flex gap-2">
              <input
                className={`${inputCls("thumbnail")} flex-1`}
                placeholder="https://..."
                value={form.thumbnail||''}
                readOnly
                onChange={(e) => {
                  set("thumbnail", e.target.value);
                  setImgError(false);
                }}
              />
              <button
                className="shrink-0 flex items-center gap-1.5 rounded-xl border border-white/8 bg-white/4 px-3 text-xs text-white/40 transition-all hover:border-white/15 hover:bg-white/8 hover:text-white/80"
              >
                <input type="file" />
                <Upload className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Upload</span>
              </button>
            </div> */}
          </div>
        </div>
        <div className="relative shrink-0 flex items-center justify-end gap-2.5 border-t border-white/6 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-xl border border-white/8 bg-transparent px-5 py-2.5 text-sm font-medium text-white/50 transition-all duration-200 hover:border-white/15 hover:bg-white/5 hover:text-white/80"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="group relative overflow-hidden rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="absolute inset-0 bg-linear-to-r from-violet-600 to-purple-600 transition-opacity duration-200 group-hover:opacity-90" />
            <div className="absolute inset-0 translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            <div className="absolute inset-0 rounded-xl shadow-lg shadow-violet-500/25" />
            <span className="relative">
              {initial ? "Save Changes" : "Add Course"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCourse;
