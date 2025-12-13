"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-slate-200 bg-transparent">
      <div className="mx-auto max-w-6xl px-6 py-8 text-center">
        <p className="text-sm text-slate-500">
          © {year} Wina Sorta Maria Gea — Portfolio
        </p>
        <p className="mt-1 text-xs text-slate-400">
          Built with Next.js • Clean UI • Responsive
        </p>
      </div>
    </footer>
  );
}
