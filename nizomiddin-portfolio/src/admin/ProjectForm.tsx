import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { storage } from "../services/storage";
import type { Project } from "../types";

export default function ProjectForm() {
  const nav=useNavigate(), {id}=useParams();
  const existing=id ? storage.getProjects().find(p=>p.id===id) : undefined;
  const [form,setForm]=useState<Project>(existing ?? {id:crypto.randomUUID(),title:"",description:"",image:"https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80",technologies:["React","TypeScript"],github:"https://github.com/",live:"https://vercel.com/",featured:true});
  const update=(k:keyof Project,v:any)=>setForm({...form,[k]:v});
  const save=(e:React.FormEvent)=>{e.preventDefault();const all=storage.getProjects();const next=existing?all.map(p=>p.id===id?form:p):[form,...all];storage.saveProjects(next);nav("/admin/projects")};
  return <form onSubmit={save} className="mx-auto max-w-3xl"><div className="mb-7"><h1 className="text-2xl font-black">{existing?"Edit Project":"Create Project"}</h1><p className="text-xs text-slate-500">Project information shown on your portfolio</p></div>
    <div className="grid gap-4 rounded-xl border border-white/7 bg-[#16142a] p-5 sm:grid-cols-2">
      {([["title","Title"],["image","Image URL"],["github","GitHub URL"],["live","Live URL"]] as const).map(([key,label])=><label key={key} className="text-xs text-slate-400">{label}<input required value={String(form[key])} onChange={e=>update(key,e.target.value)} className="mt-2 w-full rounded-lg border border-white/7 bg-[#111025] p-3 text-xs text-white outline-none focus:border-violet-500"/></label>)}
      <label className="text-xs text-slate-400 sm:col-span-2">Description<textarea required value={form.description} onChange={e=>update("description",e.target.value)} rows={5} className="mt-2 w-full rounded-lg border border-white/7 bg-[#111025] p-3 text-xs text-white outline-none"/></label>
      <label className="text-xs text-slate-400 sm:col-span-2">Technologies<input value={form.technologies.join(", ")} onChange={e=>update("technologies",e.target.value.split(",").map(x=>x.trim()).filter(Boolean))} className="mt-2 w-full rounded-lg border border-white/7 bg-[#111025] p-3 text-xs text-white outline-none"/></label>
      <label className="flex items-center gap-2 text-xs text-slate-300"><input type="checkbox" checked={form.featured} onChange={e=>update("featured",e.target.checked)}/> Featured project</label>
    </div>
    <div className="mt-4 flex justify-end gap-2"><button type="button" onClick={()=>nav("/admin/projects")} className="rounded-lg border border-white/8 px-4 py-2.5 text-xs">Cancel</button><button className="rounded-lg bg-violet-600 px-5 py-2.5 text-xs font-bold">Save Project</button></div>
  </form>;
}
