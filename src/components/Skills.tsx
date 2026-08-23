import { SKILLS } from "../data/portfolio";
import Reveal from "./Reveal";

export default function Skills() {
  return (
    <section id="skills" className="border-t border-white/5 py-24 sm:py-28">
      <div className="container-content">
        <Reveal>
          <p className="section-label">Toolkit</p>
          <h2 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">Skills</h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((group, i) => (
            <Reveal key={group.group} delay={i * 0.05}>
              <div className="card h-full p-6">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-violet">
                  {group.group}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
