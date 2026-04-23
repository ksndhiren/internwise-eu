import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, Check, Code2, LineChart, Megaphone, Palette, Star } from "lucide-react";
import sofia from "@/assets/avatar-sofia.jpg";
import lukas from "@/assets/avatar-lukas.jpg";
import marta from "@/assets/avatar-marta.jpg";
import male1 from "@/assets/avatar-male1.jpg";
import female1 from "@/assets/avatar-female1.jpg";

type CandidateCardData = {
  name: string;
  role: string;
  city: string;
  skills: string[];
  avatar: string;
};

type JobCardData = {
  title: string;
  company: string;
  city: string;
  tags: string[];
  icon: typeof Briefcase;
};

type MatchData = {
  candidateIndex: number;
  jobIndex: number;
  score: number;
};

const candidates: CandidateCardData[] = [
  {
    name: "Sofia Lindstrom",
    role: "Data Analyst",
    city: "Stockholm, Sweden",
    skills: ["SQL", "Python", "Excel"],
    avatar: sofia,
  },
  {
    name: "Lukas Schneider",
    role: "Product Designer",
    city: "Berlin, Germany",
    skills: ["Figma", "UX", "Prototyping"],
    avatar: lukas,
  },
  {
    name: "Marta Rossi",
    role: "Marketing Intern",
    city: "Milan, Italy",
    skills: ["SEO", "Analytics", "Content"],
    avatar: marta,
  },
  {
    name: "Clara Dubois",
    role: "Frontend Intern",
    city: "Paris, France",
    skills: ["React", "CSS", "TypeScript"],
    avatar: female1,
  },
];

const jobs: JobCardData[] = [
  {
    title: "Product Intern",
    company: "FinTech Startup",
    city: "Berlin, Germany",
    tags: ["Product", "Analytics"],
    icon: Briefcase,
  },
  {
    title: "Junior UX Designer",
    company: "SaaS Company",
    city: "Amsterdam, Netherlands",
    tags: ["UX", "Figma"],
    icon: Palette,
  },
  {
    title: "Marketing Intern",
    company: "E-commerce",
    city: "Paris, France",
    tags: ["Marketing", "SEO"],
    icon: Megaphone,
  },
  {
    title: "Growth Analyst",
    company: "Retail Tech",
    city: "Dublin, Ireland",
    tags: ["Growth", "Data"],
    icon: LineChart,
  },
];

const matches: MatchData[] = [
  { candidateIndex: 0, jobIndex: 0, score: 86 },
  { candidateIndex: 1, jobIndex: 1, score: 89 },
  { candidateIndex: 2, jobIndex: 2, score: 84 },
  { candidateIndex: 3, jobIndex: 3, score: 87 },
];

const candidateCardPositions = [86, 172, 258, 344];
const jobCardPositions = [86, 172, 258, 344];

const candidateLineStartX = 274;
const jobLineStartX = 626;
const centerX = 450;
const centerY = 236;

const buildLeftPath = (y: number) =>
  `M ${candidateLineStartX} ${y} C 334 ${y}, 360 ${centerY - 18}, ${centerX - 64} ${centerY}`;

const buildRightPath = (y: number) =>
  `M ${jobLineStartX} ${y} C 566 ${y}, 540 ${centerY - 18}, ${centerX + 64} ${centerY}`;

const Hero = () => {
  const reduceMotion = useReducedMotion();
  const [activeMatchIndex, setActiveMatchIndex] = useState(0);
  const [showShortlisted, setShowShortlisted] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setShowShortlisted(true);
      return;
    }

    const cycleDuration = 3600;
    const pendingTimeouts: number[] = [];
    const shortlistedTimer = window.setInterval(() => {
      setShowShortlisted(true);
      const hideId = window.setTimeout(() => setShowShortlisted(false), 1200);
      const advanceId = window.setTimeout(() => {
        setActiveMatchIndex((current) => (current + 1) % matches.length);
      }, 1800);
      pendingTimeouts.push(hideId, advanceId);
    }, cycleDuration);

    setShowShortlisted(true);
    const initialHide = window.setTimeout(() => setShowShortlisted(false), 1200);
    pendingTimeouts.push(initialHide);

    return () => {
      window.clearInterval(shortlistedTimer);
      pendingTimeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, [reduceMotion]);

  const activeMatch = matches[activeMatchIndex];

  return (
    <section className="relative bg-hero-gradient overflow-hidden pt-28 pb-40">
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ background: "radial-gradient(circle at 70% 40%, hsl(209 73% 64% / 0.35), transparent 50%)" }}
      />
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "50px 50px" }}
      />

      <div className="container mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-white">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-6">
            Get <span className="text-gradient-blue">matched</span>.
            <br />
            Get <span className="text-gradient-orange">hired</span> faster.
          </h1>
          <p className="text-white/75 text-lg max-w-md mb-8 leading-relaxed">
            Internwise connects top talent with the right opportunities across Europe. Smarter
            matching. Better outcomes.
          </p>
          <div className="flex flex-wrap gap-4 mb-10">
            <Button size="lg" className="bg-primary-gradient text-white hover:opacity-95 rounded-xl px-6 h-12 shadow-card-soft border-0 group">
              Start Matching <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition" />
            </Button>
            <Button size="lg" className="bg-cta-gradient text-white hover:opacity-95 rounded-xl px-6 h-12 shadow-cta border-0 group">
              I'm Hiring <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition" />
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {[sofia, lukas, marta, female1].map((avatar, index) => (
                <img
                  key={index}
                  src={avatar}
                  alt=""
                  width={36}
                  height={36}
                  loading="lazy"
                  className="w-9 h-9 rounded-full border-2 border-primary-navy object-cover"
                />
              ))}
            </div>
            <div>
              <div className="flex gap-0.5 mb-0.5">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} className="w-3.5 h-3.5 fill-accent-orange text-accent-orange" />
                ))}
              </div>
              <div className="text-white/70 text-xs leading-tight">
                Trusted by 100+ employers
                <br />
                and 20K+ candidates across Europe
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="hero-flow-shell">
            <div className="hero-flow-grid" />
            <div className="relative mb-5 flex items-center justify-between px-2 text-xs font-medium text-white/65">
              <span>Candidates roll in</span>
              <span>Internwise AI matching engine</span>
              <span>Jobs roll in</span>
            </div>

            <div className="relative h-[470px]">
              <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 900 470" fill="none" aria-hidden="true">
                {candidates.map((_, index) => {
                  const isActive = activeMatch.candidateIndex === index;
                  const y = candidateCardPositions[index];

                  return (
                    <motion.path
                      key={`candidate-line-${index}`}
                      d={buildLeftPath(y)}
                      stroke="url(#candidateFlow)"
                      strokeWidth={isActive ? 2.6 : 1.2}
                      strokeLinecap="round"
                      initial={false}
                      animate={
                        reduceMotion
                          ? { opacity: isActive ? 0.9 : 0.14, pathLength: 1 }
                          : { opacity: isActive ? 0.95 : 0.14, pathLength: isActive ? 1 : 0.45 }
                      }
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    />
                  );
                })}
                {jobs.map((_, index) => {
                  const isActive = activeMatch.jobIndex === index;
                  const y = jobCardPositions[index];

                  return (
                    <motion.path
                      key={`job-line-${index}`}
                      d={buildRightPath(y)}
                      stroke="url(#jobFlow)"
                      strokeWidth={isActive ? 2.6 : 1.2}
                      strokeLinecap="round"
                      initial={false}
                      animate={
                        reduceMotion
                          ? { opacity: isActive ? 0.9 : 0.14, pathLength: 1 }
                          : { opacity: isActive ? 0.95 : 0.14, pathLength: isActive ? 1 : 0.45 }
                      }
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    />
                  );
                })}

                <defs>
                  <linearGradient id="candidateFlow" x1="274" y1="0" x2="450" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="rgba(95,167,229,0.08)" />
                    <stop offset="0.55" stopColor="rgba(95,167,229,0.95)" />
                    <stop offset="1" stopColor="rgba(95,167,229,0.16)" />
                  </linearGradient>
                  <linearGradient id="jobFlow" x1="626" y1="0" x2="450" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="rgba(95,167,229,0.08)" />
                    <stop offset="0.55" stopColor="rgba(95,167,229,0.95)" />
                    <stop offset="1" stopColor="rgba(95,167,229,0.16)" />
                  </linearGradient>
                </defs>
              </svg>

              {candidates.map((candidate, index) => {
                const isActive = activeMatch.candidateIndex === index;
                const isBehindActive = activeMatch.candidateIndex + 1 === index;

                return (
                  <motion.div
                    key={candidate.name}
                    className="hero-card hero-card-left"
                    initial={reduceMotion ? false : { opacity: 0, x: -64 }}
                    animate={{
                      opacity: isActive ? 1 : isBehindActive ? 0.42 : 0.76,
                      x: 0,
                      zIndex: isActive ? 4 : isBehindActive ? 1 : 2,
                    }}
                    transition={{
                      opacity: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                      x: { duration: 0.75, delay: index * 0.18, ease: [0.22, 1, 0.36, 1] },
                      zIndex: { duration: 0.01 },
                    }}
                    style={{ top: candidateCardPositions[index] - 34 }}
                  >
                    <motion.div
                      className={`hero-candidate-card ${isActive ? "hero-card-active" : ""}`}
                      animate={
                        reduceMotion
                          ? undefined
                          : {
                              boxShadow: isActive ? "0 0 28px rgba(95, 167, 229, 0.35)" : "0 12px 28px rgba(11, 23, 51, 0.18)",
                              scale: isActive ? 1.02 : isBehindActive ? 0.978 : 0.99,
                              filter: isActive ? "blur(0px)" : isBehindActive ? "blur(3px)" : "blur(0px)",
                            }
                      }
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <img src={candidate.avatar} alt={candidate.name} className="h-14 w-14 rounded-xl object-cover border border-white/20" />
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-white">{candidate.name}</div>
                        <div className="text-xs text-white/70">{candidate.role}</div>
                        <div className="text-[11px] text-white/55 mb-2">{candidate.city}</div>
                        <div className="flex flex-wrap gap-1.5">
                          {candidate.skills.map((skill) => (
                            <span key={skill} className="hero-card-tag hero-card-tag-dark">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}

              {jobs.map((job, index) => {
                const Icon = job.icon;
                const isActive = activeMatch.jobIndex === index;
                const isBehindActive = activeMatch.jobIndex + 1 === index;

                return (
                  <motion.div
                    key={job.title}
                    className="hero-card hero-card-right"
                    initial={reduceMotion ? false : { opacity: 0, x: 64 }}
                    animate={{
                      opacity: isActive ? 1 : isBehindActive ? 0.42 : 0.76,
                      x: 0,
                      zIndex: isActive ? 4 : isBehindActive ? 1 : 2,
                    }}
                    transition={{
                      opacity: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                      x: { duration: 0.75, delay: index * 0.18, ease: [0.22, 1, 0.36, 1] },
                      zIndex: { duration: 0.01 },
                    }}
                    style={{ top: jobCardPositions[index] - 34 }}
                  >
                    <motion.div
                      className={`hero-job-card ${isActive ? "hero-card-active hero-job-active" : ""}`}
                      animate={
                        reduceMotion
                          ? undefined
                          : {
                              boxShadow: isActive ? "0 0 28px rgba(95, 167, 229, 0.35)" : "0 12px 28px rgba(11, 23, 51, 0.12)",
                              scale: isActive ? 1.02 : isBehindActive ? 0.978 : 0.99,
                              filter: isActive ? "blur(0px)" : isBehindActive ? "blur(3px)" : "blur(0px)",
                            }
                      }
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="hero-job-icon">
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-slate-950">{job.title}</div>
                        <div className="text-xs text-slate-600">{job.company}</div>
                        <div className="text-[11px] text-slate-500 mb-2">{job.city}</div>
                        <div className="flex flex-wrap gap-1.5">
                          {job.tags.map((tag) => (
                            <span key={tag} className="hero-card-tag hero-card-tag-light">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}

              <div className="hero-node-wrap">
                <motion.div
                  className="hero-match-badge"
                  key={`badge-${activeMatchIndex}`}
                  initial={reduceMotion ? false : { opacity: 0, y: 6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="text-3xl font-extrabold text-white">{activeMatch.score}%</div>
                  <div className="text-[11px] font-medium text-white/75 uppercase tracking-[0.24em]">
                    Match
                  </div>
                </motion.div>
                <motion.div
                  className="hero-node-glow"
                  animate={reduceMotion ? undefined : { scale: [0.96, 1.04, 0.96], opacity: [0.72, 1, 0.72] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </div>

            <div className="hero-shortlisted-slot">
              <AnimatePresence mode="wait">
                {showShortlisted && (
                  <motion.div
                    key={`shortlisted-${activeMatchIndex}`}
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="flex justify-center"
                  >
                    <div className="hero-shortlisted-pill">
                      <Check className="h-4 w-4 text-emerald-300" strokeWidth={3} />
                      <span>Shortlisted</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 block">
          <path d="M0,80 C480,0 960,0 1440,80 L1440,80 L0,80 Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
