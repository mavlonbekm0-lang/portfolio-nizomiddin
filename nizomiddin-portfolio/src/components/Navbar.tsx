import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Shield } from "lucide-react";

const links = [
  ["About", "/#about"], ["Skills", "/#skills"], ["Projects", "/#projects"],
  ["Experience", "/#experience"], ["Contact", "/#contact"]
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#0d0b1c]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="text-sm font-black tracking-[0.25em] text-white">
          NIZOMIDDIN NURIDDINOV PORTFOLIO <span className="text-violet-400">.</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="text-xs text-slate-400 transition hover:text-white">{label}</a>
          ))}
          <Link to="/admin/login" className="rounded-lg bg-violet-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-violet-500">
            <Shield size={13} className="mr-1 inline" /> Admin
          </Link>
        </nav>

        <button onClick={() => setOpen(!open)} className="text-slate-300 md:hidden" aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/5 bg-[#0d0b1c] px-5 py-4 md:hidden">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="block border-b border-white/5 py-3 text-sm text-slate-300">
              {label}
            </a>
          ))}
          <Link to="/admin/login" className="mt-3 block rounded-lg bg-violet-600 px-4 py-3 text-center text-sm font-semibold">Admin Panel</Link>
        </nav>
      )}
    </header>
  );
}
