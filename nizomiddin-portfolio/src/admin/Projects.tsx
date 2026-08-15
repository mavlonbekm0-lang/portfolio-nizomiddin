import { Link, useNavigate } from "react-router-dom";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { storage } from "../services/storage";
export default function Projects() {
  const [items,setItems]=useState(storage.getProjects()); const nav=useNavigate();
  const del=(id:string)=>{if(confirm("Delete this project?")){const next=items.filter(x=>x.id!==id);storage.saveProjects(next);setItems(next)}};
  return <div><div className="mb-7 flex items-center justify-between"><div><h1 className="text-2xl font-black">Projects</h1><p className="text-xs text-slate-500">Create and manage portfolio projects</p></div><Link to="/admin/projects/new" className="rounded-lg bg-violet-600 px-4 py-2.5 text-xs font-bold"><Plus size={14} className="mr-1 inline"/> New Project</Link></div>
    <div className="overflow-x-auto rounded-xl border border-white/7 bg-[#16142a]"><table className="w-full min-w-[700px] text-left text-xs"><thead className="border-b border-white/7 text-slate-500"><tr><th className="p-4">Project</th><th>Technologies</th><th>Featured</th><th className="text-right">Actions</th></tr></thead><tbody>{items.map(p=><tr key={p.id} className="border-b border-white/5 last:border-0"><td className="p-4"><div className="flex items-center gap-3"><img src={p.image} className="h-10 w-14 rounded object-cover"/><div><p className="font-semibold">{p.title}</p><p className="text-[10px] text-slate-500">{p.description.slice(0,45)}...</p></div></div></td><td className="text-slate-400">{p.technologies.join(", ")}</td><td>{p.featured?"Yes":"No"}</td><td><div className="flex justify-end gap-2"><button onClick={()=>nav(`/admin/projects/${p.id}/edit`)} className="rounded bg-white/5 p-2 text-slate-300 hover:text-white"><Pencil size={14}/></button><button onClick={()=>del(p.id)} className="rounded bg-red-500/10 p-2 text-red-400"><Trash2 size={14}/></button></div></td></tr>)}</tbody></table></div>
  </div>;
}
