
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Dashboard() {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [isPriority, setIsPriority] = useState(false);
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [publishing, setPublishing] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // Check authentication
    useEffect(() => {
        async function checkAuth() {
            try {
                const res = await fetch("/api/auth/me", {
                    method: "GET",
                    credentials: "include",
                });

                if (!res.ok) {
                    router.replace("/admin/login");
                    return;
                }

                setCheckingAuth(false);
            } catch (error) {
                router.replace("/admin/login");
            }
        }

        checkAuth();
    }, [router]);

    // Image preview
    useEffect(() => {
        if (!image) {
            setImagePreview("");
            setIsPriority(false); // Reset priority if image is cleared
            return;
        }

        const url = URL.createObjectURL(image);
        setImagePreview(url);

        return () => URL.revokeObjectURL(url);
    }, [image]);

    async function addNotice(e) {
        e.preventDefault();

        setPublishing(true);
        setMessage("");
        setError("");

        const formData = new FormData();

        formData.append("title", title);
        formData.append("text", text);
        formData.append("isPriority", isPriority);

        if (image) {
            formData.append("image", image);
        }

        try {
            const res = await fetch("/api/notices", {
                method: "POST",
                credentials: "include",
                body: formData,
            });

            if (res.ok) {
                setMessage("Notice published successfully.");

                setTitle("");
                setText("");
                setImage(null);
                setIsPriority(false);

                setTimeout(() => {
                    router.push("/notices");
                }, 800);
            } else if (res.status === 401) {
                router.replace("/admin/login");
            } else {
                setError("Failed to publish notice. Please try again.");
            }
        } catch (error) {
            setError("Unable to connect to the server.");
        } finally {
            setPublishing(false);
        }
    }

    if (checkingAuth) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />
                    <p className="text-sm font-medium text-slate-500">
                        Checking authentication...
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="relative min-h-screen flex justify-center overflow-hidden bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
            <Link
                href="/notices"
                className="inline-flex absolute right-2 top-2 items-center gap-2 px-4 py-2 text-sm font-medium text-slate-900 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-indigo-600 hover:text-indigo-600 hover:shadow-md transition-all duration-200"
            >
                <span className="text-black">Notices</span>
                <span>📢</span>
            </Link>

            <div className="relative mx-auto w-4xl max-w-5xl">

                {/* Header */}
                <header className="mb-8 animate-[fadeDown_0.6s_ease-out]">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-3 py-1.5 shadow-sm">
                        <span className="h-2 w-2 rounded-full bg-green-500" />
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Staff Panel
                        </span>
                    </div>

                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                        Publish a Notice
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
                        Create and publish an announcement for students and visitors.
                    </p>
                </header>

                {/* Main Card */}
                <form
                    onSubmit={addNotice}
                    className="animate-[fadeUp_0.7s_ease-out] overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_15px_50px_rgba(15,23,42,0.08)]"
                >

                    {/* Card Header */}
                    <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-6 py-5 sm:px-8">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-lg">
                                📢
                            </div>
                            <div>
                                <h2 className="font-bold text-slate-900">
                                    New Announcement
                                </h2>
                                <p className="text-xs text-slate-500">
                                    Fill in the details below
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="space-y-6 p-6 sm:p-8">

                        {/* Title */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Notice Title
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Final Examination Schedule"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <div className="mb-2 flex items-center justify-between">
                                <label className="block text-sm font-semibold text-slate-700">
                                    Notice Description
                                </label>
                                <span className="text-xs text-slate-400">
                                    {text.length} characters
                                </span>
                            </div>
                            <textarea
                                placeholder="Write the announcement details..."
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                required
                                rows={7}
                                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm leading-6 text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                            />
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Notice Image
                                <span className="ml-2 font-normal text-slate-400">
                                    Optional
                                </span>
                            </label>

                            {!imagePreview ? (
                                <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 px-6 py-10 text-center transition-all duration-300 hover:border-indigo-300 hover:bg-indigo-50/30">
                                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-xl shadow-sm transition-transform duration-300 group-hover:scale-110">
                                        🖼️
                                    </div>
                                    <p className="text-sm font-semibold text-slate-700">
                                        Click to upload an image
                                    </p>
                                    <p className="mt-1 text-xs text-slate-400">
                                        PNG, JPG or WEBP
                                    </p>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) =>
                                            setImage(
                                                e.target.files?.[0] || null
                                            )
                                        }
                                    />
                                </label>
                            ) : (
                                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                                    <img
                                        src={imagePreview}
                                        alt="Notice preview"
                                        className="h-64 w-full object-cover"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent px-4 pb-4 pt-10">
                                        <div>
                                            <p className="text-sm font-semibold text-white">
                                                {image?.name}
                                            </p>
                                            <p className="text-xs text-white/70">
                                                Image selected
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setImage(null);
                                                setIsPriority(false);
                                            }}
                                            className="rounded-lg bg-white/90 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-white"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Priority Toggle - Enabled ONLY when image is present */}
                        <div className={`flex items-center justify-between rounded-2xl border px-5 py-4 transition-all duration-300 ${!image ? "border-slate-200 bg-slate-100 opacity-60 cursor-not-allowed" : "border-indigo-100 bg-indigo-50/30 shadow-sm"}`}>
                            <div className="flex items-center gap-3">
                                <span className="text-xl">⭐</span>
                                <div>
                                    <label className={`text-sm font-semibold block ${!image ? "text-slate-400" : "text-slate-900"}`}>
                                        Set as Priority Notice Popup
                                    </label>
                                    <p className="text-xs text-slate-500">
                                        {!image ? "Upload an image above to enable priority display" : "Displays this image as a popup modal when visitors first open the site"}
                                    </p>
                                </div>
                            </div>
                            <input
                                type="checkbox"
                                checked={isPriority}
                                onChange={(e) => setIsPriority(e.target.checked)}
                                disabled={!image}
                                className="h-5 w-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 disabled:cursor-not-allowed cursor-pointer"
                            />
                        </div>

                        {/* Status Messages */}
                        {message && (
                            <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700 animate-[fadeUp_0.3s_ease-out]">
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                                    ✓
                                </span>
                                {message}
                            </div>
                        )}

                        {error && (
                            <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 animate-[fadeUp_0.3s_ease-out]">
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100">
                                    !
                                </span>
                                {error}
                            </div>
                        )}

                        {/* Publish */}
                        <button
                            type="submit"
                            disabled={publishing}
                            className="group flex w-full items-center justify-center gap-3 rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-900/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-600 hover:shadow-xl hover:shadow-indigo-600/20 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                        >
                            {publishing ? (
                                <>
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                    Publishing...
                                </>
                            ) : (
                                <>
                                    Publish Notice
                                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                                        →
                                    </span>
                                </>
                            )}
                        </button>
                    </div>
                </form>

                {/* Footer hint */}
                <p className="mt-5 text-center text-xs text-slate-400">
                    Published notices will appear on the academy website.
                </p>
            </div>

            <style jsx>{`
                @keyframes fadeUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fadeDown {
                    from {
                        opacity: 0;
                        transform: translateY(-15px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </main>
    );
}