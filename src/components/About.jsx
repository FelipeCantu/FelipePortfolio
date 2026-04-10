/*
 * About.jsx — Felipe Cantu Jr — Fullscreen Scroll-Snap Storytelling
 *
 * Aesthetic: Editorial cinematic — five discrete chapters, each a full viewport,
 * snapping into place with Framer Motion entrance animations. The experience is
 * deliberate: you don't scroll through content, you move through it.
 *
 * Structure (5 scroll-snap sections, each 100vh):
 *   1. Intro    — Name + bio pills LEFT | Photo collage RIGHT
 *   2. Story    — Full photo LEFT | Bio prose RIGHT
 *   3. Skills   — Toolkit text + chips LEFT | Tech dashboard grid RIGHT
 *   4. Values   — Three value cards LEFT | Full photo RIGHT
 *   5. CTA      — Full-width centered panel, scattered collage bg at low opacity
 *
 * Scroll container: PageContainer — height: calc(100vh - var(--navbar-h))
 *   scroll-snap-type: y mandatory — lives *below* the navbar in the app shell,
 *   so the navbar never overlaps content and no padding-top hacks are needed.
 *
 * Dot navigation: fixed right-side 5-dot indicator, driven by IntersectionObserver.
 *
 * Dependencies (all already in project):
 *   - framer-motion ^6
 *   - styled-components
 *   - react-router-dom
 *   - react-helmet-async
 *   - react-icons/fi
 *
 * Accessibility:
 *   - ARIA landmarks on every section
 *   - prefers-reduced-motion: framer-motion respects this via its global config;
 *     CSS float animations are suppressed via the global rule in index.css
 *   - Focus-visible on all interactive elements
 *   - Dot nav buttons have aria-label + aria-current
 */

import React, { useRef, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FiArrowRight, FiCode, FiLayout, FiZap, FiMessageSquare } from 'react-icons/fi';
import { SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiDjango, SiFirebase, SiMongodb, SiFigma, SiTailwindcss, SiThreedotjs, SiSanity, SiPython, SiLinux, SiGit, SiVercel } from 'react-icons/si';

// ─── Animation variants ──────────────────────────────────────────────────────
//
// Each section has a "text" side and an "image" side. They animate from
// opposite directions so there's a sense of tension resolving as they meet.

const fromLeft = {
  hidden: { opacity: 0, x: -52, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

const fromRight = {
  hidden: { opacity: 0, x: 52, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

const fromBottom = {
  hidden: { opacity: 0, y: 32, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// Stagger container — children receive staggered entrance delays
const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

const chipVariant = {
  hidden: { opacity: 0, scale: 0.65, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 320, damping: 22 },
  },
};

const valueCardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Data ────────────────────────────────────────────────────────────────────

const skills = [
  { label: 'React',          accent: 'blue' },
  { label: 'Next.js',        accent: 'blue' },
  { label: 'React Native',   accent: 'blue' },
  { label: 'JavaScript',     accent: 'gold' },
  { label: 'TypeScript',     accent: 'gold' },
  { label: 'Python',         accent: 'gold' },
  { label: 'Node.js',        accent: 'blue' },
  { label: 'Express.js',     accent: 'blue' },
  { label: 'Django',         accent: 'blue' },
  { label: 'MongoDB',        accent: 'gold' },
  { label: 'Firebase',       accent: 'gold' },
  { label: 'Prisma',         accent: 'gold' },
  { label: 'Tailwind CSS',   accent: 'blue' },
  { label: 'CSS / Sass',     accent: 'blue' },
  { label: 'Framer Motion',  accent: 'blue' },
  { label: 'Sanity CMS',     accent: 'gold' },
  { label: 'Stripe',         accent: 'gold' },
  { label: 'Redux',          accent: 'blue' },
  { label: 'REST APIs',      accent: 'blue' },
  { label: 'Figma',          accent: 'gold' },
  { label: 'Git',            accent: 'gold' },
  { label: 'Vercel',         accent: 'blue' },
];

// The 3×3 dashboard cells for the Skills section's decorative right panel.
// Each has a label, color accent, and a glow intensity (0–1).
const dashCells = [
  { label: 'React',      color: 'var(--color-accent)',       glow: 0.85, Icon: SiReact },
  { label: 'Next.js',    color: 'var(--color-accent-light)', glow: 0.80, Icon: SiNextdotjs },
  { label: 'TypeScript', color: 'var(--color-gold)',         glow: 0.90, Icon: SiTypescript },
  { label: 'Node',       color: 'var(--color-accent-light)', glow: 0.60, Icon: SiNodedotjs },
  { label: 'Django',     color: 'var(--color-accent)',       glow: 0.65, Icon: SiDjango },
  { label: 'Firebase',   color: 'var(--color-gold)',         glow: 0.70, Icon: SiFirebase },
  { label: 'Mongo',      color: 'var(--color-accent)',       glow: 0.55, Icon: SiMongodb },
  { label: 'Figma',      color: 'var(--color-gold)',         glow: 0.75, Icon: SiFigma },
  { label: 'Tailwind',   color: 'var(--color-accent-light)', glow: 0.50, Icon: SiTailwindcss },
  { label: 'Three.js',   color: 'var(--color-accent)',       glow: 0.70, Icon: SiThreedotjs },
  { label: 'Sanity',     color: 'var(--color-gold)',         glow: 0.65, Icon: SiSanity },
  { label: 'Python',     color: 'var(--color-accent-light)', glow: 0.75, Icon: SiPython },
  { label: 'Linux',      color: 'var(--color-gold)',         glow: 0.60, Icon: SiLinux },
  { label: 'Git',        color: 'var(--color-accent)',       glow: 0.80, Icon: SiGit },
  { label: 'Vercel',     color: 'var(--color-accent-light)', glow: 0.70, Icon: SiVercel },
];

const values = [
  {
    icon: FiMessageSquare,
    title: 'Plain English only.',
    body: "No jargon, no disappearing. I'll explain what I'm building, why it matters, and what you need to know, in language that actually makes sense.",
  },
  {
    icon: FiLayout,
    title: 'Start small, trust first.',
    body: "Not sure if we're a good fit? We begin with one small piece of your project. When you see the work, you'll know if you want to move forward.",
  },
  {
    icon: FiCode,
    title: 'One person. Full stack.',
    body: 'Design, development, databases, security. I handle all of it. One contact, no gaps, no finger-pointing between people.',
  },
];

const processSteps = [
  { number: '01', title: 'Discovery',       body: "We talk through your idea, goals, and audience. No jargon, just figuring out what you actually need." },
  { number: '02', title: 'Planning',        body: "I map out scope, timeline, and the right stack before a single line of code is written." },
  { number: '03', title: 'Design',          body: "Mobile-first UI built around your brand. Clean and easy to use on phones, tablets, and desktops." },
  { number: '04', title: 'Development',     body: "Front end, back end, databases, and third-party integrations, all handled by one person." },
  { number: '05', title: 'Security',        body: "Auth, input validation, HTTPS, protected routes, and safe data handling baked in from the start, not bolted on at the end." },
  { number: '06', title: 'SEO',             body: "Meta tags, structured data, page speed, and a sitemap so Google can actually find you from day one." },
  { number: '07', title: 'Analytics',       body: "GA4 setup and conversion tracking so you know who's visiting, what they're doing, and what's working." },
  { number: '08', title: 'Launch & Support',body: "Deployment, final QA, and I stay available after go-live to make sure everything keeps working." },
];

// Section metadata for dot navigation labels
const SECTION_IDS = [
  'intro',
  'story',
  'skills',
  'values',
  'cta',
];

const SECTION_LABELS = ['Intro', 'Story', 'Skills', 'Values', "Let's talk"];

// ─── Component ───────────────────────────────────────────────────────────────

function About() {
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef([]);
  const [skillTab, setSkillTab] = useState(0);
  const [skillDir, setSkillDir] = useState(1);

  const goToSkillTab = (tab) => {
    setSkillDir(tab > skillTab ? 1 : -1);
    setSkillTab(tab);
  };

  // ── Dot nav: IntersectionObserver watches each snap section ──────────────
  useEffect(() => {
    const observers = [];

    sectionRefs.current.forEach((el, i) => {
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          // Fire when more than half the section is visible
          if (entry.isIntersecting) {
            setActiveSection(i);
          }
        },
        {
          /*
           * The rootMargin must account for the scroll container, not the
           * viewport. Using the container ref as root would be cleaner but
           * IntersectionObserver with a non-document root triggers only inside
           * that scrolling element — which is exactly what we want here.
           * We fire at 51% visibility so only the dominant section wins.
           */
          threshold: 0.51,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  // Scroll a specific snap-section into view when a dot is clicked
  const scrollToSection = (index) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
  };

  // Helper to register both the array ref and a data-section attribute
  const sectionRef = (index) => (el) => {
    sectionRefs.current[index] = el;
  };

  return (
    <>
      <Helmet>
        <title>About | Felipe Cantu Jr</title>
        <meta
          name="description"
          content="Full-Stack Developer & Designer based in Dallas, TX. Passionate about building things that look as good as they work."
        />
        <link rel="canonical" href="https://felipecantujr.com/about" />
        <meta property="og:title" content="About | Felipe Cantu Jr" />
        <meta property="og:description" content="Full-Stack Developer & Designer based in Dallas, TX. Passionate about building things that look as good as they work." />
        <meta property="og:url" content="https://felipecantujr.com/about" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Fixed background lives outside the scroll container so it never moves */}
      <BackgroundOverlay aria-hidden="true">
        <BackgroundImage />
        <BackgroundOverlayColor />
      </BackgroundOverlay>

      {/* ── Dot navigation ─────────────────────────────────────────────── */}
      <DotNav aria-label="Page sections">
        {SECTION_IDS.map((id, i) => (
          <DotButton
            key={id}
            $active={activeSection === i}
            onClick={() => scrollToSection(i)}
            aria-label={`Go to ${SECTION_LABELS[i]} section`}
            aria-current={activeSection === i ? 'true' : undefined}
          />
        ))}
      </DotNav>

      {/*
       * PageContainer is the scroll-snap host.
       * height: calc(100vh - var(--navbar-h)) places it flush below the navbar,
       * filling exactly the remaining viewport with no overflow into navbar space.
       * overflow-y: scroll + scroll-snap-type: y mandatory gives us snap behavior.
       */}
      <PageContainer>

        {/* ── Section 1: INTRO ──────────────────────────────────────────── */}
        <SnapSection
          id="intro"
          ref={sectionRef(0)}
          aria-label="Introduction"
        >
          <SectionGlass $tall>
            <SplitLayout $mobileColumn>
              {/* Text TOP on mobile, LEFT on desktop */}
              <SplitLeft
                as={motion.div}
                variants={fromLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.4 }}
                style={{ alignItems: 'center', textAlign: 'center' }}
              >
                <EyebrowLabel>Full-Stack Developer & Designer</EyebrowLabel>

                <HeroName>
                  Felipe
                  <br />
                  <NameAccent>Cantu Jr</NameAccent>
                </HeroName>

                <HeroBio>
                  If you've got an idea for a website or an application, I'll
                  take it from concept to completion: design, development, and
                  everything in between. Working with one person from start to
                  finish means nothing falls through the cracks.
                </HeroBio>

                <PillRow>
                  <AccentPill>Dallas, TX</AccentPill>
                  <AccentPill $gold>Available for work</AccentPill>
                </PillRow>
              </SplitLeft>

              {/* Collage RIGHT */}
              <SplitRight
                $collage
                as={motion.div}
                variants={fromRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.4 }}
                aria-hidden="true"
              >
                <CollageFrame>
                  {/* Connector lines */}
                  <CollageLine $top="38%" $left="32%" $w="80px" $angle="-25deg" />
                  <CollageLine $top="55%" $left="52%" $w="60px" $angle="40deg"  />
                  <CollageLine $top="22%" $left="55%" $w="50px" $angle="15deg"  />

                  {/* Piece 1 — large portrait */}
                  <CollagePiece $w="45.83%" $h="60.87%" $top="10%" $left="5%"  $rotate="-6deg" $z="3" $delay="0s"    $radius="18px 4px 18px 4px">
                    <CollageImg src="images/small2.jpg" alt="" $pos="center top" />
                    <PieceAccent $color="var(--color-accent)" />
                  </CollagePiece>

                  {/* Piece 2 — medium landscape */}
                  <CollagePiece $w="40.63%" $h="33.70%" $top="4%"  $left="48%" $rotate="7deg"  $z="2" $delay="0.15s" $radius="4px 16px 4px 16px">
                    <CollageImg src="images/small1.jpg" alt="" $pos="center 30%" />
                    <PieceAccent $color="var(--color-gold)" />
                  </CollagePiece>

                  {/* Piece 3 — small square */}
                  <CollagePiece $w="29.17%" $h="30.43%" $top="58%" $left="2%"  $rotate="12deg" $z="4" $delay="0.3s"  $radius="4px 20px 4px 20px">
                    <CollageImg src="images/small3.jpg" alt="" $pos="center" />
                    <PieceAccent $color="var(--color-accent-light, #38bdf8)" />
                  </CollagePiece>

                  {/* Piece 4 — wide short */}
                  <CollagePiece $w="50%" $h="32.17%" $top="65%" $left="30%" $rotate="-4deg" $z="3" $delay="0.45s" $radius="16px 4px 16px 4px">
                    <CollageImg src="images/felipe.jpg" alt="" $pos="center 60%" />
                    <PieceAccent $color="var(--color-gold)" />
                  </CollagePiece>

                  {/* Piece 5 — small portrait */}
                  <CollagePiece $w="32.29%" $h="44.57%" $top="38%" $left="62%" $rotate="9deg"  $z="2" $delay="0.6s"  $radius="20px 4px 20px 4px">
                    <CollageImg src="images/small4.jpg" alt="" $pos="center 20%" />
                    <PieceAccent $color="var(--color-accent)" />
                  </CollagePiece>
                </CollageFrame>
              </SplitRight>
            </SplitLayout>
          </SectionGlass>
        </SnapSection>

        {/* ── Section 2: STORY ──────────────────────────────────────────── */}
        <SnapSection
          id="story"
          ref={sectionRef(1)}
          aria-label="Personal story"
        >
          <SectionGlass>
            {/*
             * Even section → image LEFT, text RIGHT (layout reverses on mobile
             * to always put the image on top).
             */}
            <SplitLayout $reverse $mobileOverlay>
              {/* Photo LEFT */}
              <SplitLeft
                $photoBg
                as={motion.div}
                variants={fromLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.4 }}
                aria-hidden="true"
                style={{ padding: 0, overflow: 'hidden' }}
              >
                <StoryPhoto>
                  <img src="images/big.jpg" alt="Felipe Cantu Jr" />
                </StoryPhoto>
              </SplitLeft>

              {/* Prose RIGHT */}
              <SplitRight
                $textOverlay
                as={motion.div}
                variants={fromRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.4 }}
                style={{ alignItems: 'center', textAlign: 'center', fontSize: '0.8em' }}
              >
                <EyebrowLabel>The story</EyebrowLabel>
                <SectionHeading>Rooted in Port Isabel, TX.</SectionHeading>

                <StoryParagraph>
                  I grew up in Port Isabel, Texas, a small coastal town where I
                  learned early that hard work and treating people right matter
                  more than anything. I've carried that mindset with me into
                  every project since.
                </StoryParagraph>

                <StoryParagraph>
                  I know hiring a developer can feel overwhelming. There's often
                  the worry of getting buried in jargon, losing touch with
                  someone along the way, or starting a project that never quite
                  reaches the finish line. I've structured my work to avoid those
                  problems. We start with a small, focused piece of work, something
                  real, so you can see how I work before deciding whether to move
                  forward.
                </StoryParagraph>

                <StoryParagraph>
                  When I'm not coding, I spend time with my wife and three kids.
                  They're my foundation and the reason I show up ready every day.
                  I also play guitar, skateboard, and am a longtime fan of Doctor
                  Who. I believe things can always be better. It just takes someone
                  willing to figure out how.
                </StoryParagraph>
              </SplitRight>
            </SplitLayout>
          </SectionGlass>
        </SnapSection>

        {/* ── Section 3: SKILLS ─────────────────────────────────────────── */}
        <SnapSection
          id="skills"
          ref={sectionRef(2)}
          aria-label="Technical skills"
        >
          <SectionGlass>
            {/* ── Desktop: two-column layout ── */}
            <DesktopOnly>
              <SplitLayout>
                {/* Process steps LEFT */}
                <SplitLeft
                  $scrollable
                  as={motion.div}
                  variants={fromLeft}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.4 }}
                >
                  <EyebrowLabel>How it works</EyebrowLabel>
                  <SectionHeading>From idea to launch.</SectionHeading>

                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                  >
                    <ProcessList>
                      {processSteps.map((step) => (
                        <motion.div key={step.number} variants={chipVariant}>
                          <ProcessItem>
                            <ProcessNum>{step.number}</ProcessNum>
                            <ProcessContent>
                              <ProcessTitle>{step.title}</ProcessTitle>
                              <ProcessBody>{step.body}</ProcessBody>
                            </ProcessContent>
                          </ProcessItem>
                        </motion.div>
                      ))}
                    </ProcessList>
                  </motion.div>
                </SplitLeft>

                {/* Tech dashboard RIGHT */}
                <SplitRight
                  as={motion.div}
                  variants={fromRight}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.4 }}
                  aria-hidden="true"
                >
                  <DashboardWrap>
                    <DashboardLabel>// skill_matrix.exe</DashboardLabel>
                    <DashGrid>
                      {dashCells.map((cell, i) => {
                        const Icon = cell.Icon;
                        return (
                          <DashCell
                            key={cell.label}
                            $color={cell.color}
                            $glow={cell.glow}
                            $delay={`${i * 0.08}s`}
                          >
                            <DashCellFront>
                              <DashCellLabel>{cell.label}</DashCellLabel>
                              <DashCellBar $color={cell.color} $fill={cell.glow} />
                            </DashCellFront>
                            <DashCellBack $color={cell.color}>
                              <Icon size={46} />
                            </DashCellBack>
                          </DashCell>
                        );
                      })}
                    </DashGrid>
                  </DashboardWrap>
                </SplitRight>
              </SplitLayout>
            </DesktopOnly>

            {/* ── Mobile: tab + swipe ── */}
            <MobileSkillWrap>
              <MobileTabBar>
                <MobileTabBtn $active={skillTab === 0} onClick={() => goToSkillTab(0)}>
                  Process
                </MobileTabBtn>
                <MobileTabBtn $active={skillTab === 1} onClick={() => goToSkillTab(1)}>
                  Skills
                </MobileTabBtn>
                <MobileTabIndicator $index={skillTab} />
              </MobileTabBar>

              <AnimatePresence mode="wait" initial={false}>
                <MobileSwipePanel
                  key={skillTab}
                  initial={{
                    x: skillDir * 44,
                    opacity: 0,
                    scale: 0.94,
                    rotateY: skillDir * 10,
                    filter: 'blur(14px)',
                    transformPerspective: 900,
                  }}
                  animate={{
                    x: 0, opacity: 1, scale: 1, rotateY: 0, filter: 'blur(0px)',
                    transformPerspective: 900,
                    transition: {
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                      opacity:  { duration: 0.22, ease: 'easeOut' },
                      filter:   { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                      rotateY:  { duration: 0.6,  ease: [0.16, 1, 0.3, 1] },
                      scale:    { duration: 0.6,  ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  exit={{
                    x: skillDir * -44, opacity: 0, scale: 0.94,
                    rotateY: skillDir * -10, filter: 'blur(14px)',
                    transformPerspective: 900,
                    transition: { duration: 0.2, ease: [0.55, 0, 1, 0.45] },
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.08}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -50 && skillTab === 0) goToSkillTab(1);
                    if (info.offset.x > 50 && skillTab === 1) goToSkillTab(0);
                  }}
                >
                  {skillTab === 0 ? (
                    <>
                      <EyebrowLabel>How it works</EyebrowLabel>
                      <SectionHeading>From idea to launch.</SectionHeading>
                      <ProcessList style={{ gridTemplateColumns: '1fr' }}>
                        {processSteps.map((step) => (
                          <motion.div key={step.number} variants={chipVariant} initial="hidden" animate="visible">
                            <ProcessItem>
                              <ProcessNum>{step.number}</ProcessNum>
                              <ProcessContent>
                                <ProcessTitle>{step.title}</ProcessTitle>
                                <ProcessBody>{step.body}</ProcessBody>
                              </ProcessContent>
                            </ProcessItem>
                          </motion.div>
                        ))}
                      </ProcessList>
                    </>
                  ) : (
                    <>
                      <EyebrowLabel>Tech stack</EyebrowLabel>
                      <SectionHeading>Tools I use.</SectionHeading>
                      <DashboardWrap>
                        <DashboardLabel>// skill_matrix.exe</DashboardLabel>
                        <DashGrid
                          as={motion.div}
                          variants={staggerContainer}
                          initial="hidden"
                          animate="visible"
                        >
                          {dashCells.map((cell, i) => {
                            const Icon = cell.Icon;
                            return (
                              <motion.div key={cell.label} variants={chipVariant}>
                                <DashCell
                                  $color={cell.color}
                                  $glow={cell.glow}
                                  $delay={`${i * 0.08}s`}
                                  tabIndex={0}
                                >
                                  <DashCellFront>
                                    <DashCellLabel>{cell.label}</DashCellLabel>
                                    <DashCellBar $color={cell.color} $fill={cell.glow} />
                                  </DashCellFront>
                                  <DashCellBack $color={cell.color}>
                                    <Icon size={46} />
                                  </DashCellBack>
                                </DashCell>
                              </motion.div>
                            );
                          })}
                        </DashGrid>
                      </DashboardWrap>
                    </>
                  )}
                </MobileSwipePanel>
              </AnimatePresence>

              <MobileDots>
                <MobileDot $active={skillTab === 0} onClick={() => goToSkillTab(0)} aria-label="Process tab" />
                <MobileDot $active={skillTab === 1} onClick={() => goToSkillTab(1)} aria-label="Skills tab" />
              </MobileDots>
            </MobileSkillWrap>
          </SectionGlass>
        </SnapSection>

        {/* ── Section 4: VALUES ─────────────────────────────────────────── */}
        <SnapSection
          id="values"
          ref={sectionRef(3)}
          aria-label="Work philosophy"
        >
          <SectionGlass>
            {/* Even section → cards LEFT, photo RIGHT */}
            <SplitLayout $reverse $mobileOverlay $mobileMinH="min(115vw, 680px)">
              {/* Value cards LEFT */}
              <SplitLeft
                $textOverlay
                as={motion.div}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.35 }}
              >
                <motion.div variants={fromLeft}>
                  <EyebrowLabel>How I work</EyebrowLabel>
                  <SectionHeading style={{ marginBottom: '1.75rem' }}>
                    Why I do this differently.
                  </SectionHeading>
                </motion.div>

                <ValuesStack>
                  {values.map((v) => {
                    const Icon = v.icon;
                    return (
                      <motion.div key={v.title} variants={valueCardVariant}>
                        <ValueCard>
                          <ValueBorderAccent />
                          <ValueIconWrap aria-hidden="true">
                            <Icon size={18} />
                          </ValueIconWrap>
                          <ValueTitle>{v.title}</ValueTitle>
                          <ValueBody>{v.body}</ValueBody>
                        </ValueCard>
                      </motion.div>
                    );
                  })}
                </ValuesStack>
              </SplitLeft>

              {/* Photo RIGHT */}
              <SplitRight
                $photo
                as={motion.div}
                variants={fromRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.4 }}
                aria-hidden="true"
              >
                <StoryPhoto $mirror>
                  <img src="images/big2.jpg" alt="" />
                </StoryPhoto>
              </SplitRight>
            </SplitLayout>
          </SectionGlass>
        </SnapSection>

        {/* ── Section 5: CTA ────────────────────────────────────────────── */}
        <SnapSection
          id="cta"
          ref={sectionRef(4)}
          aria-label="Call to action"
        >
          {/*
           * Scattered collage pieces as background decoration — reuse CollagePiece
           * with low opacity + pointer-events: none. They sit outside the glass
           * panel but within the snap section.
           */}
          <CTACollageDecor aria-hidden="true" />

          <CTACenterWrap>
            <CTAGlass>
              <motion.div
                variants={fromBottom}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.5 }}
                transition={{ delay: 0 }}
              >
                <EyebrowLabel style={{ marginBottom: '0.5rem' }}>Let's work together</EyebrowLabel>
                <CTAAccentBar />
              </motion.div>

              <motion.div
                variants={fromBottom}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.5 }}
                transition={{ delay: 0.1 }}
              >
                <CTAHeading>Ready to build something?</CTAHeading>
              </motion.div>

              <motion.div
                variants={fromBottom}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.5 }}
                transition={{ delay: 0.2 }}
              >
                <CTASub>
                  Whether you have a full brief or just a rough idea, let's talk.
                  I'll tell you what's possible and how we can get started.
                </CTASub>
              </motion.div>

              <motion.div
                variants={fromBottom}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.5 }}
                transition={{ delay: 0.3 }}
              >
                <CTAButtons>
                  <CTAButtonPrimary to="/contact">
                    Get in touch
                    <FiArrowRight aria-hidden="true" />
                  </CTAButtonPrimary>
                  <CTAButtonGhost to="/portfolio">
                    See my work
                    <FiArrowRight aria-hidden="true" />
                  </CTAButtonGhost>
                </CTAButtons>
              </motion.div>
            </CTAGlass>
          </CTACenterWrap>
        </SnapSection>

      </PageContainer>
    </>
  );
}

// ─── Keyframes ───────────────────────────────────────────────────────────────

/*
 * Corner-mark sweep: the two accent corner brackets on SectionGlass animate
 * in from zero opacity on mount. Pure CSS — no JS needed.
 */
const cornerReveal = keyframes`
  from { opacity: 0; transform: scale(0.88); }
  to   { opacity: 1; transform: scale(1); }
`;

/*
 * Diagonal grain sweep across the glass surface — creates the illusion of
 * light catching a textured panel rather than a flat frosted pane.
 */
const grainDrift = keyframes`
  0%   { background-position: 0% 0%; }
  100% { background-position: 100% 100%; }
`;

/*
 * Top-seam pulse on CTAGlass — the luminous horizontal edge breathes
 * slightly to signal it as the "entry point" of the section.
 */
const seamPulse = keyframes`
  0%, 100% { opacity: 0.60; }
  50%       { opacity: 1; }
`;

/* Float animations for the collage pieces */
const floatA = keyframes`
  0%, 100% { transform: translateY(0px)   rotate(var(--rot)); }
  50%       { transform: translateY(-8px)  rotate(calc(var(--rot) + 1.5deg)); }
`;

const floatB = keyframes`
  0%, 100% { transform: translateY(0px)   rotate(var(--rot)); }
  50%       { transform: translateY(-12px) rotate(calc(var(--rot) - 1deg)); }
`;

const floatC = keyframes`
  0%, 100% { transform: translateY(0px)  rotate(var(--rot)); }
  60%       { transform: translateY(-6px) rotate(calc(var(--rot) + 2deg)); }
`;

/* Dashboard cell pulse — simulates a "live" terminal signal */
const cellPulse = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.7; }
`;

/* Blue shimmer sweep for value card hover */
const shimmerSweep = keyframes`
  0%   { left: -100%; }
  100% { left: 200%; }
`;

// ─── Layout / Background ─────────────────────────────────────────────────────

const BackgroundOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
`;

const BackgroundImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url('images/mainbg.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const BackgroundOverlayColor = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(10, 12, 22, 0.85);
`;

/*
 * The scroll-snap host. height: calc(100vh - var(--navbar-h)) ensures the
 * container fills exactly the viewport below the fixed navbar. overflow-y:
 * scroll (not auto) guarantees the scrollbar is always reserved so the layout
 * doesn't shift between sections.
 */
const PageContainer = styled.div`
  position: relative;
  z-index: 10;
  height: calc(100vh - var(--navbar-h, 60px));
  margin-top: var(--navbar-h, 60px);
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  /* Use smooth scrolling for programmatic scrollIntoView calls */
  scroll-behavior: smooth;

  /*
   * 100vh on mobile browsers includes the browser chrome (address bar, toolbar),
   * which can cause the bottom of the last snap section to be obscured.
   * 100dvh (dynamic viewport height) tracks the *actual* visible area as the
   * browser UI shows/hides during scroll. Progressive enhancement via @supports
   * so older browsers fall back to 100vh without breaking.
   */
  @supports (height: 100dvh) {
    height: calc(100dvh - var(--navbar-h, 60px));
  }
`;

/*
 * Each snap section is exactly 100% of the container height (which equals the
 * viewport minus the navbar). scroll-snap-align: start means the top edge
 * of each section snaps to the top of the container.
 *
 * The ::before pseudo-element adds a radial vignette — darkening the outer
 * corners so the glass panel reads as a lit subject on a receding stage.
 * pointer-events: none ensures it never blocks child interaction.
 */
const SnapSection = styled.section`
  position: relative;
  min-height: 100%;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.3rem;
  overflow: visible;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse 80% 70% at 50% 50%,
      transparent 40%,
      rgba(0, 0, 0, 0.38) 100%
    );
    pointer-events: none;
    z-index: 0;
  }

  /* All direct children sit above the vignette */
  > * {
    position: relative;
    z-index: 1;
  }

  @media (min-width: 480px) {
    padding: 0.75rem;
  }

  @media (min-width: 640px) {
    padding: 1.25rem;
  }

  @media (min-width: 1024px) {
    padding: 2.5rem 3rem;
  }
`;

/*
 * ── SectionGlass: Film-Frame Container ───────────────────────────────────────
 *
 * The definitive aesthetic move on this page. Rather than a plain frosted pane,
 * each panel is treated as a "film frame" — a cinematic viewfinder with:
 *
 *   1. A gradient border built via ::before (padding-based trick):
 *      A conic-gradient rotates from gold at the top-left through blue to a
 *      near-invisible mid-section and back, creating an asymmetric luminous edge
 *      that reads as directional light catching a beveled frame.
 *
 *   2. A diagonal grain texture on ::after that drifts slowly, simulating the
 *      light interference you see on high-quality coated glass or film stock.
 *      It sits at 4% opacity — felt, not seen.
 *
 *   3. Hard corner accent marks via box-shadow inset layers that add a second
 *      inner frame echo (the "double-rebate" from film projection aperture plates).
 *
 * overflow: hidden is intentionally removed from the wrapper and moved to the
 * inner pseudo-element so the gradient border is not clipped.
 */
const SectionGlass = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  min-height: 0;
  border-radius: 26px;

  @media (max-width: 899px) {
    min-height: ${({ $tall }) => $tall ? 'min(75vh, 620px)' : '0'};
  }

  @media (min-width: 900px) {
    height: calc(100vh - var(--navbar-h, 60px) - 4rem);
  }
  /* Gradient border: ::before creates the 1px-padded gradient shell */
  isolation: isolate;
  display: flex;
  align-items: stretch;

  /* ── Layer 1: Gradient border shell ─────────────────────────────────────── */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px; /* border thickness */
    background: conic-gradient(
      from 225deg at 20% 20%,
      rgba(14, 165, 233, 0.55)   0deg,
      rgba(56, 189, 248, 0.40)  70deg,
      rgba(255, 255, 255, 0.06) 160deg,
      rgba(255, 255, 255, 0.03) 220deg,
      rgba(56, 189, 248, 0.28)  290deg,
      rgba(14, 165, 233, 0.18)  340deg,
      rgba(14, 165, 233, 0.55)  360deg
    );
    /*
     * Mask technique: the gradient shows only where the padding is.
     * This gives a true gradient border without overflow tricks.
     */
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    z-index: 4;
    transition: opacity 0.4s ease;
  }

  /* ── Layer 2: Animated diagonal grain ───────────────────────────────────── */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    /*
     * A fine diagonal repeating-linear-gradient mimics the halftone grain of
     * film stock. At 4% opacity it is completely subliminal — visible only
     * when looking closely, but it kills the "flat digital rectangle" feeling.
     */
    background-image: repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 3px,
      rgba(255, 255, 255, 0.014) 3px,
      rgba(255, 255, 255, 0.014) 4px
    );
    background-size: 200% 200%;
    animation: ${grainDrift} 28s linear infinite alternate;
    pointer-events: none;
    z-index: 1;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }

  /* ── The actual glass fill — inner wrapper semantics ────────────────────── */
  /*
   * overflow: visible so child hover transforms (translateX on ValueCard,
   * translateY on DashCell, SkillChip) are never clipped by the panel edge.
   * The glass background and border-radius still render correctly without
   * overflow:hidden — backgrounds are clipped to border-radius natively.
   */
  overflow: visible;
  background: rgba(8, 10, 20, 0.72);
  backdrop-filter: blur(28px) saturate(1.3);
  -webkit-backdrop-filter: blur(28px) saturate(1.3);

  /*
   * Three shadow layers:
   *  1. Deep cast shadow — depth on the stage
   *  2. Inset top highlight — simulates a glass edge catching ceiling light
   *  3. Inset bottom shadow — grounds the panel
   */
  box-shadow:
    0 40px 80px rgba(0, 0, 0, 0.65),
    0 0 0 1px rgba(255, 255, 255, 0.03) inset,
    inset 0 1px 0 rgba(255, 255, 255, 0.10),
    inset 0 -1px 0 rgba(0, 0, 0, 0.40);
`;

/*
 * The left/right split inside each glass panel.
 * $reverse flips the order so even sections have image-left, text-right
 * on desktop while still stacking image-on-top on mobile.
 *
 * position: relative + z-index: 3 ensures content sits above the ::before
 * gradient-border layer (z-index: 2) and ::after grain layer (z-index: 1)
 * within the SectionGlass isolation context.
 */
const SplitLayout = styled.div`
  position: relative;
  z-index: 3;
  width: 100%;
  display: flex;
  flex-direction: ${({ $reverse }) => ($reverse ? 'row-reverse' : 'row')};

  @media (max-width: 899px) {
    flex-direction: ${({ $mobileColumn }) => $mobileColumn ? 'column' : 'inherit'};
    ${({ $mobileOverlay, $mobileMinH }) => $mobileOverlay && `
      overflow: hidden;
      border-radius: 20px;
      min-height: ${$mobileMinH || 'min(95vw, 560px)'};
    `}
  }
`;

const SplitLeft = styled.div`
  flex: 1;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: ${({ $scrollable }) => $scrollable ? 'flex-start' : 'center'};

  @media (min-width: 480px) {
    padding: 0.75rem;
  }
  /*
   * overflow-y: auto (not "hidden auto") — using the shorthand "hidden auto"
   * sets overflow-x: hidden which creates a scroll port that hard-clips painted
   * content at the container boundary on ALL sides, including the bottom edge.
   * This was causing the last row of process cards to be cut off even though
   * overflow-y was set to allow scrolling. Using overflow-y: auto alone lets
   * the cross axis (x) remain at its initial value ("visible" resolved to "auto"
   * by the spec only when y is also overflow), which avoids the clipping.
   */
  overflow-y: ${({ $scrollable }) => $scrollable ? 'auto' : 'visible'};

  ${({ $scrollable }) => $scrollable && `
    &::-webkit-scrollbar { width: 3px; }
    &::-webkit-scrollbar-track { background: transparent; }
    &::-webkit-scrollbar-thumb { background: rgba(14, 165, 233, 0.20); border-radius: 2px; }
  `}

  @media (min-width: 900px) {
    padding: ${({ $scrollable }) => $scrollable ? '2.5rem 2.5rem 2.5rem 3rem' : '3rem 3rem 3rem 3.5rem'};
    flex: 0 0 50%;
  }

  @media (max-width: 899px) {
    ${({ $photoBg }) => $photoBg && `
      position: absolute;
      inset: 0;
      flex: none;
      width: 100%;
      height: 100%;
      z-index: 0;
      padding: 0;
      overflow: hidden;
    `}
    ${({ $textOverlay }) => $textOverlay && `
      position: relative;
      z-index: 2;
      flex: 1;
      width: 100%;
      background: linear-gradient(to bottom, rgba(4, 4, 14, 0.55) 0%, rgba(4, 4, 14, 0.85) 100%);
      padding: 1.5rem 1.25rem;
      align-items: center;
      justify-content: center;
      text-align: center;
    `}
  }
`;

const SplitRight = styled.div`
  flex: 1;
  padding: ${({ $photo }) => $photo ? '0' : '0.5rem'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${({ $photo, $collage }) => ($photo || $collage) ? 'stretch' : 'center'};

  @media (min-width: 480px) {
    padding: ${({ $photo }) => $photo ? '0' : '0.75rem'};
  }
  overflow: ${({ $photo }) => $photo ? 'hidden' : 'visible'};

  @media (min-width: 900px) {
    padding: ${({ $photo }) => $photo ? '0' : '3rem 3.5rem 3rem 2.5rem'};
    flex: 1;

    /*
     * Gradient separator — suppressed when used as a full-bleed photo container
     * so the image sits flush against the panel edge with no hairline.
     */
    border-left: none;
    box-shadow: -1px 0 0 0 transparent;
    background-image: ${({ $photo }) => $photo ? 'none' : `linear-gradient(
      180deg,
      transparent 0%,
      rgba(14, 165, 233, 0.12) 25%,
      rgba(255, 255, 255, 0.07) 50%,
      rgba(14, 165, 233, 0.08) 75%,
      transparent 100%
    )`};
    background-repeat: no-repeat;
    background-size: 1px 100%;
    background-position: left center;
    padding-left: ${({ $photo }) => $photo ? '0' : 'calc(2.5rem + 1px)'};
  }

  @media (max-width: 899px) {
    ${({ $photo }) => $photo && `
      position: absolute;
      inset: 0;
      flex: none;
      width: 100%;
      height: 100%;
      z-index: 0;
      padding: 0;
      overflow: hidden;
    `}
    ${({ $textOverlay }) => $textOverlay && `
      position: relative;
      z-index: 2;
      flex: 1;
      width: 100%;
      background: linear-gradient(to bottom, rgba(4, 4, 14, 0.55) 0%, rgba(4, 4, 14, 0.85) 100%);
      padding: 1.5rem 1.25rem;
      align-items: center;
      justify-content: center;
      text-align: center;
    `}
  }
`;

// ─── Dot navigation ───────────────────────────────────────────────────────────

const DotNav = styled.nav`
  position: fixed;
  right: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  margin-top: calc(var(--navbar-h, 60px) / 2);
`;

const DotButton = styled.button`
  width: ${({ $active }) => ($active ? '10px' : '7px')};
  height: ${({ $active }) => ($active ? '10px' : '7px')};
  border-radius: 50%;
  border: none;
  cursor: pointer;
  padding: 0;
  background: ${({ $active }) =>
    $active
      ? 'var(--color-accent-light, #38bdf8)'
      : 'rgba(255, 255, 255, 0.28)'};
  box-shadow: ${({ $active }) =>
    $active
      ? '0 0 10px var(--color-accent-light, #38bdf8)'
      : 'none'};
  transition: background 0.25s ease, width 0.25s ease, height 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.65);
  }

  &:focus-visible {
    outline: 2px solid var(--color-accent, #0ea5e9);
    outline-offset: 3px;
  }
`;

// ─── Shared typographic atoms ─────────────────────────────────────────────────

const EyebrowLabel = styled.p`
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.17em;
  text-transform: uppercase;
  color: var(--color-accent-light, #38bdf8);
  margin: 0 0 0.25rem;

  @media (min-width: 900px) {
    font-size: 0.7rem;
    margin: 0 0 0.9rem;
  }
`;

const SectionHeading = styled.h2`
  font-family: var(--font-display, 'Syne', system-ui, sans-serif);
  font-size: clamp(0.95rem, 3vw, 2.2rem);
  font-weight: 800;
  color: white;
  letter-spacing: -0.025em;
  line-height: 1.1;
  margin: 0 0 0.5rem;
  padding-bottom: 0.08em;
  overflow: visible;

  @media (min-width: 900px) {
    font-size: clamp(1.5rem, 3.2vw, 2.2rem);
    margin: 0 0 2rem;
  }
`;

// ─── Section 1: Intro ─────────────────────────────────────────────────────────

const HeroName = styled.h1`
  font-family: var(--font-display, 'Syne', system-ui, sans-serif);
  font-size: clamp(1.2rem, 4.5vw, 5rem);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.04em;
  color: white;
  margin: 0 0 0.5rem;
  padding-bottom: 0.1em;
  overflow: visible;

  @media (min-width: 900px) {
    margin: 0 0 1.25rem;
  }
`;

const NameAccent = styled.span`
  display: block;
  background: linear-gradient(
    100deg,
    var(--color-accent-light, #38bdf8) 0%,
    rgba(255, 255, 255, 0.55) 70%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const HeroBio = styled.p`
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  font-size: clamp(0.68rem, 1.8vw, 1.15rem);
  font-weight: 300;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.75);
  width: 100%;
  max-width: 480px;
  margin: 0 0 0.35rem;

  @media (min-width: 900px) {
    line-height: 1.75;
    margin: 0 0 1.75rem;
  }
`;

const PillRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.3rem;
  padding-top: 2px;

  @media (min-width: 900px) {
    justify-content: flex-start;
    gap: 0.55rem;
    padding-top: 4px;
  }
`;

const AccentPill = styled.span`
  display: inline-flex;
  align-items: center;
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  padding: 0.18rem 0.5rem;

  @media (min-width: 900px) {
    font-size: 0.76rem;
    padding: 0.32rem 0.85rem;
  }
  border-radius: var(--radius-full, 9999px);
  background: ${({ $gold }) =>
    $gold ? 'rgba(247,171,10,0.10)' : 'rgba(14,165,233,0.10)'};
  border: 1px solid ${({ $gold }) =>
    $gold ? 'rgba(247,171,10,0.35)' : 'rgba(14,165,233,0.30)'};
  color: ${({ $gold }) =>
    $gold
      ? 'var(--color-gold, #f7ab0a)'
      : 'var(--color-accent-light, #38bdf8)'};
`;

// ─── Photo collage ────────────────────────────────────────────────────────────

const CollageFrame = styled.div`
  position: relative;
  width: 480px;
  height: 460px;
  flex-shrink: 0;

  @media (max-width: 899px) {
    width: 100%;
    height: 100%;
  }
`;

const CollagePiece = styled.div`
  position: absolute;
  width: ${({ $w }) => $w};
  height: ${({ $h }) => $h};
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  border-radius: ${({ $radius }) => $radius || '12px'};
  overflow: hidden;
  z-index: ${({ $z }) => $z || 1};
  --rot: ${({ $rotate }) => $rotate || '0deg'};
  transform: rotate(var(--rot));
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.55), 0 2px 8px rgba(0, 0, 0, 0.4);
  /* Opacity prop used only by the CTA background decor pieces */
  opacity: ${({ $opacity }) => $opacity || 1};
  pointer-events: ${({ $opacity }) => ($opacity ? 'none' : 'auto')};
  animation: ${({ $delay }) => {
    const d = parseFloat($delay || '0');
    return d < 0.2 ? floatA : d < 0.5 ? floatB : floatC;
  }} ${({ $delay }) => {
    const d = parseFloat($delay || '0');
    return d < 0.2 ? '6s' : d < 0.5 ? '8s' : '7s';
  }} ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay || '0s'};
  transition: transform 0.4s ease, box-shadow 0.4s ease;

  &:hover {
    z-index: 10;
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.7),
      0 0 0 2px var(--color-accent, #0ea5e9);
    transform: rotate(0deg) scale(1.06);
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: rotate(var(--rot));
  }
`;

const CollageImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: ${({ $pos }) => $pos || 'center'};
  display: block;
  transition: transform 0.5s ease;

  ${CollagePiece}:hover & {
    transform: scale(1.08);
  }
`;

const PieceAccent = styled.div`
  position: absolute;
  inset: 0;
  border-radius: inherit;
  border: 2px solid ${({ $color }) => $color || 'var(--color-accent)'};
  opacity: 0.45;
  pointer-events: none;
  transition: opacity 0.3s ease;

  ${CollagePiece}:hover & {
    opacity: 0.85;
  }
`;

const CollageLine = styled.div`
  position: absolute;
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  width: ${({ $w }) => $w};
  height: 1.5px;
  background: linear-gradient(
    90deg,
    rgba(14, 165, 233, 0.5),
    rgba(56, 189, 248, 0.4)
  );
  transform-origin: left center;
  transform: rotate(${({ $angle }) => $angle || '0deg'});
  border-radius: 1px;
  pointer-events: none;
`;

// ─── Section 2: Story ─────────────────────────────────────────────────────────

const StoryPhoto = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  min-height: 80px;

  @media (min-width: 900px) {
    min-height: 200px;
  }
  /*
   * Ensure the photo container stretches to fill the SplitLeft column
   * on desktop. overflow:hidden clips the image to the border-radius.
   */
  overflow: hidden;
  /* Side-by-side on all screen sizes: round the outer edge of the photo panel */
  @media (min-width: 900px) {
    border-radius: ${({ $mirror }) => $mirror ? '25px 0 0 25px' : '0 25px 25px 0'};
  }

  @media (max-width: 899px) {
    border-radius: 0;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
    /* Slight desaturate gives the photo an editorial feel */
    filter: saturate(0.88) contrast(1.05);
    transition: filter 0.4s ease;
  }

  &:hover img {
    filter: saturate(1) contrast(1);
  }
`;

const StoryParagraph = styled.p`
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  font-size: clamp(0.68rem, 1.6vw, 1.02rem);
  font-weight: 300;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.73);
  max-width: 54ch;
  margin: 0 0 0.4rem;

  @media (min-width: 900px) {
    line-height: 1.85;
    margin: 0 0 1.35rem;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

// ─── Section 3: Skills ────────────────────────────────────────────────────────

const SkillsGrid = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  list-style: none;
  /* top padding gives the translateY(-3px) hover room to breathe */
  padding: 4px 0 0;
  margin: 0;
`;

const SkillChip = styled.span`
  display: inline-block;
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  padding: 0.4rem 1rem;
  border-radius: var(--radius-full, 9999px);
  background: ${({ $gold }) =>
    $gold ? 'rgba(247,171,10,0.07)' : 'rgba(14,165,233,0.07)'};
  border: 1px solid ${({ $gold }) =>
    $gold ? 'rgba(247,171,10,0.28)' : 'rgba(14,165,233,0.25)'};
  color: ${({ $gold }) =>
    $gold
      ? 'rgba(247,171,10,0.90)'
      : 'rgba(56,189,248,0.90)'};
  transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    background: ${({ $gold }) =>
      $gold ? 'rgba(247,171,10,0.14)' : 'rgba(14,165,233,0.14)'};
    border-color: ${({ $gold }) =>
      $gold ? 'rgba(247,171,10,0.55)' : 'rgba(14,165,233,0.50)'};
  }
`;

/* Process list — left panel for Section 3 */
const ProcessList = styled.ol`
  list-style: none;
  margin: 0;
  /* Reduced from 3rem — the 3rem dead-space at the bottom was eating into the
   * visible scroll area and making the last card row appear cut off. 1rem is
   * enough breathing room at the scroll terminus. */
  padding: 0 0 1rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;

  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
  align-items: stretch;

  > div {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const ProcessItem = styled.li`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  height: 100%;
  gap: 0.3rem;
  padding: 0.3rem 0.45rem;

  @media (min-width: 900px) {
    gap: 0.5rem;
    padding: 0.55rem 0.8rem;
  }
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.10);
  transition: background 0.25s ease, border-color 0.25s ease, transform 0.25s ease;

  &:hover {
    background: rgba(14, 165, 233, 0.08);
    border-color: rgba(14, 165, 233, 0.35);
    transform: translateY(1px);
  }
`;

const ProcessNum = styled.span`
  flex-shrink: 0;
  width: 1.75rem;
  height: 1.75rem;
  /* Circle reads as a counter, not a nested mini-card — avoids rectangle-in-rectangle */
  border-radius: 50%;
  /* Nudge down slightly so the vertical center aligns with the title baseline */
  margin-top: 0.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(14, 165, 233, 0.14);
  border: 1px solid rgba(14, 165, 233, 0.30);
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  font-size: 0.6rem;
  font-weight: 700;
  color: var(--color-accent-light, #38bdf8);
`;

const ProcessContent = styled.div`
  display: flex;
  flex-direction: column;
  /* Pin title and body to the top of the column regardless of card height */
  justify-content: flex-start;
  flex: 1;
  min-width: 0; /* prevents text overflow from stretching the flex child */
`;

const ProcessTitle = styled.p`
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  font-size: 0.72rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  margin: 0 0 0.1rem;
  letter-spacing: 0.01em;
  line-height: 1.2;

  @media (min-width: 900px) {
    font-size: 0.875rem;
    margin: 0 0 0.2rem;
  }
`;

const ProcessBody = styled.p`
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.58);
  margin: 0;
  line-height: 1.35;

  @media (min-width: 900px) {
    font-size: 0.70rem;
    line-height: 1.4;
  }
`;

/* Tech dashboard — the decorative right panel for Section 3 */
const DashboardWrap = styled.div`
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  /* top padding gives DashCell translateY(-2px) hover room */
  padding-top: 4px;

  /*
   * On mobile the 320px cap would leave dead space on wider narrow screens
   * (e.g. 360–480px). Let it fill the available column width instead.
   */
  @media (max-width: 899px) {
    max-width: 100%;
  }
`;

const DashboardLabel = styled.p`
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  font-size: 0.68rem;
  color: rgba(56, 189, 248, 0.45);
  letter-spacing: 0.05em;
  margin: 0 0 0.25rem;
`;

const DashGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.3rem;

  @media (min-width: 900px) {
    gap: 0.6rem;
  }
`;

const DashCell = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid ${({ $color }) => $color}22;
  border-radius: 8px;
  padding: 0.35rem 0.3rem 0.3rem;

  @media (min-width: 900px) {
    border-radius: 10px;
    padding: 0.7rem 0.6rem 0.6rem;
  }
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  overflow: hidden;
  animation: ${cellPulse} ${({ $delay }) => `${3 + parseFloat($delay) * 4}s`}
    ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay};
  transition: background 0.3s ease, border-color 0.3s ease, transform 0.3s ease;

  /* Glow bleed from the top — simulates an active signal */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${({ $color }) => $color};
    opacity: ${({ $glow }) => $glow};
    border-radius: 10px 10px 0 0;
  }

  &:hover,
  &:focus {
    background: rgba(14, 165, 233, 0.10);
    border-color: rgba(56, 189, 248, 0.50);
    transform: translateY(-2px);
    outline: none;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const DashCellLabel = styled.span`
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  font-size: 0.62rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 0.04em;
  text-align: center;
`;

const DashCellBar = styled.div`
  height: 4px;
  border-radius: 2px;
  background: ${({ $color }) => $color}33;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    width: ${({ $fill }) => `${Math.round($fill * 100)}%`};
    background: ${({ $color }) => $color};
    border-radius: 2px;
    opacity: 0.85;
  }
`;

const DashCellFront = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  width: 100%;
  transition: opacity 0.25s ease, transform 0.25s ease;

  ${DashCell}:hover &,
  ${DashCell}:focus & {
    opacity: 0;
    transform: scale(0.8);
  }
`;

const DashCellBack = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-accent-light, #38bdf8);
  opacity: 0;
  transform: scale(1.2) rotate(-10deg);
  transition: opacity 0.32s ease, transform 0.32s cubic-bezier(0.22, 1, 0.36, 1);
  filter: drop-shadow(0 0 10px rgba(56, 189, 248, 0.9));

  /* radial spotlight behind the logo */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at center,
      rgba(14, 165, 233, 0.22) 0%,
      transparent 68%
    );
    pointer-events: none;
  }

  ${DashCell}:hover &,
  ${DashCell}:focus & {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
`;

// ─── Section 4: Values ────────────────────────────────────────────────────────

const ValuesStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;

  @media (min-width: 900px) {
    gap: 1rem;
  }
  width: 100%;
  /*
   * 6px right padding ensures the translateX(4px) on ValueCard:hover
   * is never visually tight against the right boundary.
   */
  padding-right: 6px;
`;

const ValueCard = styled.article`
  position: relative;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 0.5rem 0.65rem 0.5rem 0.85rem;

  @media (min-width: 900px) {
    border-radius: var(--radius-lg, 20px);
    padding: 1.1rem 1.25rem 1.1rem 1.6rem;
  }
  transition: border-color 0.3s ease, background 0.3s ease, transform 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 60%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(14, 165, 233, 0.08),
      transparent
    );
    pointer-events: none;
  }

  &:hover {
    border-color: rgba(14, 165, 233, 0.30);
    background: linear-gradient(
      135deg,
      rgba(14, 165, 233, 0.07) 0%,
      rgba(56, 189, 248, 0.04) 100%
    );
    transform: translateX(4px);

    &::after {
      animation: ${shimmerSweep} 0.6s ease forwards;
    }
  }
`;

const ValueBorderAccent = styled.div`
  position: absolute;
  left: 0;
  top: 20%;
  bottom: 20%;
  width: 3px;
  border-radius: 0 2px 2px 0;
  background: linear-gradient(
    180deg,
    var(--color-accent, #0ea5e9) 0%,
    var(--color-accent-light, #38bdf8) 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease, top 0.35s ease, bottom 0.35s ease;

  ${ValueCard}:hover & {
    opacity: 1;
    top: 0;
    bottom: 0;
  }
`;

const ValueIconWrap = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 8px;
  background: rgba(14, 165, 233, 0.10);
  border: 1px solid rgba(14, 165, 233, 0.20);
  color: var(--color-accent-light, #38bdf8);
  margin-bottom: 0.3rem;

  @media (min-width: 900px) {
    width: 2rem;
    height: 2rem;
    border-radius: var(--radius-md, 12px);
    margin-bottom: 0.65rem;
  }
  transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease;

  ${ValueCard}:hover & {
    background: rgba(14, 165, 233, 0.18);
    border-color: rgba(56, 189, 248, 0.40);
    color: var(--color-accent-light, #38bdf8);
  }
`;

const ValueTitle = styled.h3`
  font-family: var(--font-display, 'Syne', system-ui, sans-serif);
  font-size: 0.75rem;
  font-weight: 700;
  color: white;
  letter-spacing: -0.01em;
  margin: 0 0 0.15rem;

  @media (min-width: 900px) {
    font-size: 1rem;
    margin: 0 0 0.4rem;
  }
`;

const ValueBody = styled.p`
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  font-size: 0.65rem;
  font-weight: 300;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.62);
  margin: 0;

  @media (min-width: 900px) {
    font-size: 0.85rem;
    line-height: 1.65;
  }
`;

// ─── Section 5: CTA ───────────────────────────────────────────────────────────

/*
 * The scattered collage pieces live inside the snap section but behind the
 * glass panel (lower z-index, pointer-events: none via $opacity prop).
 */
const CTACollageDecor = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
`;

const CTACenterWrap = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 900px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

/*
 * ── CTAGlass: The Stage-End Panel ────────────────────────────────────────────
 *
 * Matches the SectionGlass treatment used on every other panel in this page:
 * same glassmorphism fill, same conic-gradient border via ::before mask trick,
 * same 26px radius. The CTA earns its distinction through content and spacing,
 * not by breaking the visual system.
 */
const CTAGlass = styled.div`
  position: relative;
  width: 100%;
  background: rgba(8, 10, 20, 0.72);
  backdrop-filter: blur(28px) saturate(1.3);
  -webkit-backdrop-filter: blur(28px) saturate(1.3);
  border-radius: 26px;
  padding: 3rem 2.5rem;
  text-align: center;
  isolation: isolate;

  /*
   * Gradient border — identical mask technique used on SectionGlass.
   * The conic-gradient is clipped to a 1px inset via the xor mask composite,
   * producing a border that glows brighter at the top-left origin point and
   * fades around the panel perimeter.
   */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: conic-gradient(
      from 225deg at 20% 20%,
      rgba(14, 165, 233, 0.55)   0deg,
      rgba(56, 189, 248, 0.40)  70deg,
      rgba(255, 255, 255, 0.06) 160deg,
      rgba(255, 255, 255, 0.03) 220deg,
      rgba(56, 189, 248, 0.28)  290deg,
      rgba(14, 165, 233, 0.18)  340deg,
      rgba(14, 165, 233, 0.55)  360deg
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    z-index: 4;
  }

  box-shadow:
    0 32px 64px rgba(0, 0, 0, 0.55),
    0 0 0 1px rgba(255, 255, 255, 0.03),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);

  /* All direct children sit above the ::before border layer */
  > * {
    position: relative;
    z-index: 3;
  }

  /*
   * 3rem all-around is too generous on a 390px screen — compress to give
   * the CTA content more breathing room without the padded walls closing in.
   */
  @media (max-width: 639px) {
    padding: 1.75rem 1.25rem;
  }

  @media (max-width: 390px) {
    padding: 1.25rem 1rem;
  }

  @media (min-width: 640px) {
    padding: 4rem 3.5rem;
  }
`;

/*
 * Editorial seam rule — replaces the short 3rem pip.
 * A tapered full-width rule: opaque at the center, fading to transparent at
 * both ends. The gold node at dead-center (via ::before) gives it an anchor
 * point — like a chapter marker on a film timeline.
 */
const CTAAccentBar = styled.div`
  position: relative;
  width: 100%;
  max-width: 28rem;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(14, 165, 233, 0.20) 15%,
    rgba(56, 189, 248, 0.70) 42%,
    rgba(255, 255, 255, 0.90) 50%,
    rgba(56, 189, 248, 0.70) 58%,
    rgba(14, 165, 233, 0.20) 85%,
    transparent 100%
  );
  margin: 0 auto 1.75rem;

  /* Blue center node */
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--color-accent-light, #38bdf8);
    box-shadow: 0 0 8px rgba(56, 189, 248, 0.70);
  }
`;

const CTAHeading = styled.h2`
  font-family: var(--font-display, 'Syne', system-ui, sans-serif);
  font-size: clamp(1.4rem, 6vw, 2.8rem);
  font-weight: 800;
  color: white;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin: 0.5rem 0 0.75rem;
  padding-bottom: 0.1em;
  overflow: visible;
`;

const CTASub = styled.p`
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  font-size: clamp(0.88rem, 2.5vw, 1.1rem);
  font-weight: 300;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.65;
  max-width: 46ch;
  margin: 0 auto 1.25rem;

  @media (min-width: 640px) {
    margin-bottom: 2.25rem;
  }
`;

const CTAButtons = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.65rem;
  padding: 0.25rem 0;

  @media (min-width: 480px) {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0.75rem;
    gap: 0.75rem;
  }
`;

/* Shared button base */
const ctaBase = `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  padding: 0.75rem 1.75rem;
  border-radius: 12px;
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-decoration: none;
  white-space: nowrap;
  transition: background 0.22s ease, border-color 0.22s ease, color 0.22s ease,
              transform 0.22s ease, box-shadow 0.22s ease;

  &:focus-visible {
    outline: 2px solid var(--color-accent, #0ea5e9);
    outline-offset: 3px;
  }

  svg {
    flex-shrink: 0;
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: translateX(3px);
  }
`;

const CTAButtonPrimary = styled(Link)`
  ${ctaBase}
  background: var(--color-accent, #0ea5e9);
  border: 2px solid var(--color-accent, #0ea5e9);
  color: white;

  &:hover {
    background: transparent;
    color: var(--color-accent-light, #38bdf8);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(14, 165, 233, 0.30);
  }
`;

const CTAButtonGhost = styled(Link)`
  ${ctaBase}
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.82);

  &:hover {
    background: rgba(255, 255, 255, 0.11);
    border-color: rgba(255, 255, 255, 0.30);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.28);
  }
`;


// ─── Mobile skill swipe (Section 3) ─────────────────────────────────────────

const DesktopOnly = styled.div`
  display: none;
  @media (min-width: 900px) {
    display: contents;
  }
`;

const MobileSkillWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1.25rem 1rem 0.75rem;
  gap: 0.75rem;
  min-height: min(95vw, 520px);
  @media (min-width: 900px) {
    display: none;
  }
`;

const MobileTabBar = styled.div`
  position: relative;
  display: flex;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const MobileTabBtn = styled.button`
  flex: 1;
  padding: 0.55rem 0;
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  font-size: 0.8rem;
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  letter-spacing: 0.03em;
  color: ${({ $active }) =>
    $active ? 'var(--color-accent-light, #38bdf8)' : 'rgba(255,255,255,0.40)'};
  transition: color 0.22s ease;
`;

const MobileTabIndicator = styled.div`
  position: absolute;
  bottom: -1px;
  left: ${({ $index }) => ($index === 0 ? '0%' : '50%')};
  width: 50%;
  height: 2px;
  background: var(--color-accent-light, #38bdf8);
  border-radius: 1px;
  box-shadow: 0 0 8px var(--color-accent, #0ea5e9);
  transition: left 0.28s cubic-bezier(0.22, 1, 0.36, 1);
`;

const MobileSwipePanel = styled(motion.div)`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  touch-action: pan-y;
  cursor: grab;
  user-select: none;
  &:active { cursor: grabbing; }
  &::-webkit-scrollbar { width: 2px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: rgba(14, 165, 233, 0.2); border-radius: 2px; }
`;

const MobileDots = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.45rem;
  padding-bottom: 0.25rem;
`;

const MobileDot = styled.button`
  width: ${({ $active }) => ($active ? '22px' : '6px')};
  height: 6px;
  border-radius: 3px;
  border: none;
  cursor: pointer;
  padding: 0;
  background: ${({ $active }) =>
    $active
      ? 'linear-gradient(90deg, var(--color-accent, #0ea5e9), var(--color-accent-light, #38bdf8))'
      : 'rgba(255,255,255,0.20)'};
  box-shadow: ${({ $active }) => ($active ? '0 0 6px rgba(14,165,233,0.5)' : 'none')};
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1), background 0.22s ease;
`;

export default About;
