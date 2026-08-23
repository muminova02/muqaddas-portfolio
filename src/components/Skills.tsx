import { SKILLS } from "../data/portfolio";
import Reveal from "./Reveal";

export default function Skills() {
  return (
    <section id="skills" className="py-20 sm:py-24">
      <div className="container-content">
        <Reveal>
          <p className="section-label">Toolkit</p>
          <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">Skills</h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((group, i) => (
            <Reveal key={group.group} delay={i * 0.04}>
              <div className="card h-full p-5">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
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
