import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
import SectionTitle from "../components/SectionTitle";
import { storage } from "../services/storage";

export default function Projects() {
  const [query, setQuery] = useState("");
  const projects = useMemo(() => storage.getProjects().filter(p =>
    `${p.title} ${p.description} ${p.technologies.join(" ")}`.toLowerCase().includes(query.toLowerCase())
  ), [query]);
  return <><Navbar/><main className="min-h-screen bg-[#0d0b1c] px-5 pb-20 pt-28">
    <div className="mx-auto max-w-6xl">
      <SectionTitle eyebrow="Portfolio" title="All Projects" description="Explore my work and experiments."/>
      <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search projects..." className="mb-7 w-full rounded-xl border border-white/8 bg-[#16142a] px-4 py-3 text-xs text-white outline-none focus:border-violet-500"/>
      <div className="grid gap-5 sm:grid-cols-2">{projects.map(p=><ProjectCard key={p.id} project={p}/>)}</div>
    </div>
  </main><Footer/></>;
}
