import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="border-t border-white/5 py-24 sm:py-28">
      <div className="container-content grid gap-10 lg:grid-cols-5 lg:gap-16">
        <Reveal className="lg:col-span-2">
          <p className="section-label">About Me</p>
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-primary sm:text-4xl">
            Turning ideas and business requirements into{" "}
            <span className="gradient-text">working software</span>.
          </h2>
        </Reveal>

        <Reveal className="lg:col-span-3" delay={0.1}>
          <div className="space-y-4 text-base leading-relaxed text-muted sm:text-lg">
            <p>
              I'm an AI-Assisted Full-Stack Developer with a strong Python backend focus. I
              enjoy turning product ideas and business requirements into working
              applications, APIs, and internal tools.
            </p>
            <p>
              My strongest areas are Python, FastAPI, Django/DRF, REST APIs, databases,
              authentication, backend business logic, and React.
            </p>
            <p>
              I also work with AI development tools such as Claude Code, Cursor, and ChatGPT
              for codebase exploration, prototyping, debugging, implementation, and
              refactoring — while manually reviewing and testing the final result.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
