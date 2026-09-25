
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function checkAuth() {
            try {
                const res = await fetch("/api/auth/me", {
                    method: "GET",
                    credentials: "include",
                });

                if (res.ok) {
                    router.replace("/admin/dashboard");
                    return;
                }

            } catch (error) {
                router.replace("/admin/login");
            }
        }

        checkAuth();
    }, [router]);

    async function login(e) {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message);
                setLoading(false);
                return;
            }

            // JWT is already stored in the HTTP-only cookie
            router.push("/admin/dashboard");
        } catch (error) {
            alert("Unable to connect to the server.");
            setLoading(false);
        }
    }


    return (
        <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-12 flex items-center justify-center">

            <div className="w-full max-w-md">

                {/* School Header */}
                <div className="mb-7 text-center sm:mb-8">

                    {/* School Logo */}
                    <div className="mx-auto mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-blue-700 text-white shadow-sm">
                        <svg
                            className="h-7 w-7 sm:h-8 sm:w-8"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                        >
                            <path d="M3 10.5L12 5l9 5.5-9 5-9-5Z" />
                            <path d="M6 12.5V17c3 2 9 2 12 0v-4.5" />
                            <path d="M21 10.5V16" />
                        </svg>
                    </div>

                    <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                        Admin Panel's Gateway
                    </h1>

                    <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-slate-500 sm:text-sm">
                        Sign in to access the administration dashboard
                    </p>
                </div>

                {/* Login Card */}
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-slate-900">
                            Login
                        </h2>

                        <p className="mt-1 text-sm leading-5 text-slate-500">
                            Enter your credentials below.
                        </p>
                    </div>

                    <form onSubmit={login} className="space-y-5">

                        {/* Username */}
                        <div>
                            <label
                                htmlFor="username"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Username
                            </label>

                            <input
                                id="username"
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) =>
                                    setUsername(e.target.value)
                                }
                                autoComplete="username"
                                required
                                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                autoComplete="current-password"
                                required
                                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {loading ? (
                                <>
                                    <svg
                                        className="mr-2 h-4 w-4 animate-spin"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />

                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                        />
                                    </svg>

                                    Signing in...
                                </>
                            ) : (
                                "Sign in"
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-6 border-t border-slate-100 pt-5 text-center">
                        <p className="text-xs text-slate-400">
                            Authorized staff members only
                        </p>
                    </div>
                </div>

                {/* Bottom */}
                <p className="mt-5 text-center text-xs text-slate-400 sm:mt-6">
                    © {new Date().getFullYear()} School Administration
                </p>

            </div>
        </main>
    );
}