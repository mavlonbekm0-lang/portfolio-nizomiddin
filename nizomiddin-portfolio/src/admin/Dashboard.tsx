import { Link } from "react-router-dom";
import { BriefcaseBusiness, Mail, Plus, Wrench } from "lucide-react";
import { storage } from "../services/storage";
export default function Dashboard() {
  const projects=storage.getProjects(), skills=storage.getSkills(), messages=storage.getMessages<any>();
  const cards:[string,number,typeof BriefcaseBusiness,string][]=[["Projects",projects.length,BriefcaseBusiness,"/admin/projects"],["Skills",skills.length,Wrench,"/admin/skills"],["Messages",messages.length,Mail,"/admin/messages"]];
  return <div><div className="mb-7"><h1 className="text-2xl font-black">Dashboard</h1><p className="mt-1 text-xs text-slate-500">Overview of your portfolio</p></div>
    <div className="grid gap-4 sm:grid-cols-3">{cards.map(([name,count,Icon,to])=><Link to={String(to)} key={String(name)} className="rounded-xl border border-white/7 bg-[#16142a] p-5 hover:border-violet-500/30"><Icon size={18} className="text-violet-400"/><p className="mt-5 text-xs text-slate-500">{String(name)}</p><p className="mt-1 text-2xl font-bold">{String(count)}</p></Link>)}</div>
    <div className="mt-7 rounded-xl border border-white/7 bg-[#16142a] p-5"><div className="flex items-center justify-between"><h2 className="text-sm font-semibold">Recent Projects</h2><Link to="/admin/projects/new" className="rounded-lg bg-violet-600 px-3 py-2 text-[10px] font-bold"><Plus size={13} className="mr-1 inline"/> Add Project</Link></div>
      <div className="mt-5 space-y-2">{projects.slice(0,5).map(p=><div key={p.id} className="flex items-center justify-between rounded-lg bg-[#111025] p-3"><div className="flex items-center gap-3"><img src={p.image} className="h-9 w-12 rounded object-cover"/><div><p className="text-xs font-semibold">{p.title}</p><p className="text-[10px] text-slate-500">{p.technologies.join(" · ")}</p></div></div><span className="text-[10px] text-emerald-400">Active</span></div>)}</div>
    </div>
  </div>;
}
