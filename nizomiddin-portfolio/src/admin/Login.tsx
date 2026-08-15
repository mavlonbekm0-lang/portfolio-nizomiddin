import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockKeyhole } from "lucide-react";
import { storage } from "../services/storage";
export default function Login() {
  const [error,setError]=useState("");
  const nav=useNavigate();
  const submit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault(); const f=new FormData(e.currentTarget);
    if(f.get("email")==="admin@portfolio.com" && f.get("password")==="admin123"){storage.login();nav("/admin");}
    else setError("Invalid credentials");
  };
  return <div className="flex min-h-screen items-center justify-center bg-[#0d0b1c] px-5 text-white">
    <form onSubmit={submit} className="w-full max-w-sm rounded-2xl border border-white/8 bg-[#16142a] p-7 shadow-2xl">
      <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600/15 text-violet-300"><LockKeyhole/></div>
      <h1 className="text-center text-xl font-bold">Admin Login</h1><p className="mt-2 text-center text-xs text-slate-500">Sign in to manage your portfolio</p>
      <input name="email" type="email" defaultValue="admin@portfolio.com" className="mt-7 w-full rounded-lg border border-white/7 bg-[#111025] p-3 text-xs outline-none focus:border-violet-500"/>
      <input name="password" type="password" defaultValue="admin123" className="mt-3 w-full rounded-lg border border-white/7 bg-[#111025] p-3 text-xs outline-none focus:border-violet-500"/>
      {error&&<p className="mt-2 text-xs text-red-400">{error}</p>}
      <button className="mt-4 w-full rounded-lg bg-violet-600 py-3 text-xs font-bold hover:bg-violet-500">Sign In</button>
      <p className="mt-4 text-center text-[10px] text-slate-500">Demo: admin@portfolio.com / admin123</p>
    </form>
  </div>;
}
