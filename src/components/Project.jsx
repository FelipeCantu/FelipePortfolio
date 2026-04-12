import React, { useEffect, useState, useRef, useCallback } from "react";
import { useHistory } from "react-router-dom";
import sanityClient from "../sanityClient";
import imageUrlBuilder from "@sanity/image-url";
import styled, { keyframes, css } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

// ─── ANIMATION VARIANTS ────────────────────────────────────────────────────────

// sideX is passed dynamically via custom so it scales with the viewport
const cardVariants = {
  enter: ({ position, direction, sideX }) => {
    if (position === "center") {
      return {
        x: direction > 0 ? sideX * 1.2 : -sideX * 1.2,
        scale: 0.8,
        opacity: 0,
        rotateY: direction > 0 ? 20 : -20,
        filter: "blur(6px) saturate(0.5)",
        zIndex: 2,
      };
    }
    return {
      x: position === "prev" ? -sideX * 1.8 : sideX * 1.8,
      opacity: 0,
      scale: 0.78,
      rotateY: position === "prev" ? 10 : -10,
      filter: "blur(0px) saturate(0.9)",
      zIndex: 1,
    };
  },
  center: ({ position, sideX }) => {
    if (position === "center") {
      return {
        x: 0,
        scale: 1,
        opacity: 1,
        rotateY: 0,
        filter: "blur(0px) saturate(1)",
        zIndex: 3,
        transition: { type: "spring", stiffness: 300, damping: 30 },
      };
    }
    if (position === "prev") {
      return {
        x: -sideX,
        scale: 0.78,
        opacity: 0.85,
        rotateY: 10,
        filter: "blur(0px) saturate(0.9)",
        zIndex: 1,
        transition: { type: "spring", stiffness: 300, damping: 30 },
      };
    }
    return {
      x: sideX,
      scale: 0.78,
      opacity: 0.85,
      rotateY: -10,
      filter: "blur(0px) saturate(0.9)",
      zIndex: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    };
  },
  exit: ({ position, direction, sideX }) => {
    if (position === "center") {
      return {
        x: direction > 0 ? -sideX * 1.2 : sideX * 1.2,
        scale: 0.8,
        opacity: 0,
        rotateY: direction > 0 ? -20 : 20,
        filter: "blur(6px) saturate(0.5)",
        zIndex: 2,
        transition: { type: "spring", stiffness: 300, damping: 30 },
      };
    }
    return {
      x: position === "prev" ? -sideX * 1.8 : sideX * 1.8,
      opacity: 0,
      scale: 0.65,
      filter: "blur(4px) saturate(0.5)",
      zIndex: 0,
      transition: { duration: 0.2 },
    };
  },
};

// ─── BADGE COLOR HELPER ────────────────────────────────────────────────────────

function getBadgeColor(type) {
  const colors = {
    web: "#3498db",
    mobile: "#9b59b6",
    design: "#e67e22",
    desktop: "#1abc9c",
  };
  return colors[type] || "#3498db";
}

const TYPE_LABELS = {
  web: "Web",
  mobile: "Mobile",
  design: "Design",
  desktop: "Desktop App",
};

// ─── SINGLE PROJECT CARD ──────────────────────────────────────────────────────

function CarouselCard({ project, position, direction, layoutKey, sideX }) {
  const isCenter = position === "center";
  const history = useHistory();

  const handleClick = () => {
    if (isCenter && project.slug?.current) {
      history.push(`/project/${project.slug.current}`);
    }
  };

  return (
    <AnimatedCard
      key={layoutKey}
      custom={{ position, direction, sideX }}
      variants={cardVariants}
      initial="enter"
      animate="center"
      exit="exit"
      $position={position}
      onClick={handleClick}
    >
      <CardInner>
        {project.image ? (
          <CardImage
            src={urlFor(project.image).width(800).auto("format").fit("crop").url()}
            alt={project.title}
            loading="lazy"
          />
        ) : (
          <ImagePlaceholder />
        )}

        <SlidePanel data-slide-panel>
          <TypeBadgeRow>
            {Array.isArray(project.projectType)
              ? project.projectType.filter(type => TYPE_LABELS[type]).map((type, i) => (
                  <TypeBadge key={i} $color={getBadgeColor(type)}>{TYPE_LABELS[type]}</TypeBadge>
                ))
              : TYPE_LABELS[project.projectType]
              ? <TypeBadge $color={getBadgeColor(project.projectType)}>{TYPE_LABELS[project.projectType]}</TypeBadge>
              : null
            }
          </TypeBadgeRow>
          <PersistentTitle>{project.title}</PersistentTitle>
          {(project.excerpt || project.description) && (
            <DescriptionText>{project.excerpt || project.description}</DescriptionText>
          )}
          <MetaRow>
            {project.place && <TechText>{project.place}</TechText>}
            {project.place && project.date && <MetaDot>·</MetaDot>}
            {project.date && (
              <TechText>{new Date(project.date).getFullYear()}</TechText>
            )}
          </MetaRow>
          {project.tags && project.tags.length > 0 && (
            <TagRow>
              {project.tags.map((tag, i) => (
                <TagChip key={i}>{tag}</TagChip>
              ))}
            </TagRow>
          )}
        </SlidePanel>
      </CardInner>
    </AnimatedCard>
  );
}

// ─── DYNAMIC SIDE OFFSET ──────────────────────────────────────────────────────

function useSideX() {
  const get = () => window.innerWidth * 0.5;
  const [sideX, setSideX] = useState(get);
  useEffect(() => {
    const handle = () => setSideX(get());
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);
  return sideX;
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function Project() {
  const [projectData, setProjectData] = useState(null);
  const [projectTypeFilter, setProjectTypeFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const sideX = useSideX();

  const intervalRef = useRef(null);

  // ── Fetch ──
  useEffect(() => {
    setIsLoading(true);
    setCurrentIndex(0);
    sanityClient
      .fetch(
        `*[_type == "project" &&
        ($projectTypeFilter == "all" || $projectTypeFilter in projectType)] | order(featured desc, order asc, date desc){
          title,
          slug,
          date,
          place,
          excerpt,
          description,
          projectType,
          link,
          githubLink,
          "github": github,
          tags,
          image {
            asset -> {
              _id,
              url,
              metadata { dimensions }
            }
          }
        }`,
        { projectTypeFilter }
      )
      .then((data) => {
        setProjectData(data);
        setIsLoading(false);
      })
      .catch(console.error);
  }, [projectTypeFilter]);

  // ── Navigation helpers ──
  const length = projectData ? projectData.length : 0;

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % length);
  }, [length]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + length) % length);
  }, [length]);

  const goTo = useCallback(
    (index) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex]
  );

  // ── Auto-advance ──
  useEffect(() => {
    if (!isHovered && length > 1) {
      intervalRef.current = setInterval(goNext, 4000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isHovered, goNext, length]);

  // ── Compute surrounding indices ──
  const prevIndex = length > 0 ? (currentIndex - 1 + length) % length : 0;
  const nextIndex = length > 0 ? (currentIndex + 1) % length : 0;

  // ── Loading state ──
  if (isLoading) return <LoadingSpinner />;

  // ── Empty state ──
  if (!projectData || projectData.length === 0) {
    return (
      <ProjectContainer>
        <FilterUI
          projectTypeFilter={projectTypeFilter}
          setProjectTypeFilter={setProjectTypeFilter}
        />
        <EmptyState>No projects found for this filter.</EmptyState>
      </ProjectContainer>
    );
  }

  return (
    <ProjectContainer>
      <PortfolioHeader>
        <PortfolioTitle>My Portfolio</PortfolioTitle>
        <PortfolioSubtitle>
          Full-stack development meets creative design. (React, JavaScript, Figma)
        </PortfolioSubtitle>
      </PortfolioHeader>

      {/* ── Filters ── */}
      <FilterUI
        projectTypeFilter={projectTypeFilter}
        setProjectTypeFilter={setProjectTypeFilter}
      />

      {/* ── Carousel ── */}
      <CarouselWrapper
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <PerspectiveStage>
          <CardTrack>
            <AnimatePresence custom={{ direction, sideX }}>
              {length > 1 && (
                <CarouselCard
                  key={`prev-${prevIndex}-${projectTypeFilter}`}
                  layoutKey={`prev-${prevIndex}-${projectTypeFilter}`}
                  project={projectData[prevIndex]}
                  position="prev"
                  direction={direction}
                  sideX={sideX}
                />
              )}
              <CarouselCard
                key={`center-${currentIndex}-${projectTypeFilter}`}
                layoutKey={`center-${currentIndex}-${projectTypeFilter}`}
                project={projectData[currentIndex]}
                position="center"
                direction={direction}
                sideX={sideX}
              />
              {length > 1 && (
                <CarouselCard
                  key={`next-${nextIndex}-${projectTypeFilter}`}
                  layoutKey={`next-${nextIndex}-${projectTypeFilter}`}
                  project={projectData[nextIndex]}
                  position="next"
                  direction={direction}
                  sideX={sideX}
                />
              )}
            </AnimatePresence>
          </CardTrack>

          {length > 1 && (
            <>
              <NavButton $side="left" onClick={goPrev} aria-label="Previous project">
                <FiChevronLeft size={28} />
              </NavButton>
              <NavButton $side="right" onClick={goNext} aria-label="Next project">
                <FiChevronRight size={28} />
              </NavButton>
            </>
          )}
        </PerspectiveStage>

        {/* ── Dot Indicators ── */}
        {length > 1 && (
          <DotsRow>
            {projectData.map((_, i) => (
              <Dot
                key={i}
                $active={i === currentIndex}
                onClick={() => goTo(i)}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </DotsRow>
        )}

        {/* ── Counter ── */}
        <CounterLabel>
          {currentIndex + 1} / {length}
        </CounterLabel>
      </CarouselWrapper>
    </ProjectContainer>
  );
}

// ─── FILTER UI (extracted for clarity) ───────────────────────────────────────

function FilterUI({ projectTypeFilter, setProjectTypeFilter }) {
  return (
    <FilterContainer>
      <FilterLabel>Filter Projects:</FilterLabel>
      <FilterOptionsContainer>
        {[
          { value: "all", label: "All" },
          { value: "web", label: "Web" },
          { value: "mobile", label: "Mobile" },
          { value: "design", label: "Design" },
          { value: "desktop", label: "Desktop" },
        ].map(({ value, label }) => (
          <FilterOption
            key={value}
            selected={projectTypeFilter === value}
            onClick={() => setProjectTypeFilter(value)}
          >
            {label}
          </FilterOption>
        ))}
      </FilterOptionsContainer>
    </FilterContainer>
  );
}

// ─── KEYFRAMES ────────────────────────────────────────────────────────────────

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const glowPulse = keyframes`
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
`;

// ─── STYLED COMPONENTS ───────────────────────────────────────────────────────

const ProjectContainer = styled.div`
  width: 100%;
  /*
   * Top padding accounts for the fixed 60px navbar.
   * Reduced breathing room from 2.5rem → 1.5rem now that the
   * portfolio header is compact — gets the carousel closer to the fold.
   */
  padding: calc(var(--navbar-h, 60px) + 1.5rem) 0 4rem;
`;

/* ── Portfolio page header ── */
const PortfolioHeader = styled.header`
  text-align: center;
  padding: 0 2rem 1.25rem;
  max-width: 680px;
  margin: 0 auto;
`;

const PortfolioTitle = styled.h1`
  font-family: var(--font-display, 'Syne', system-ui, sans-serif);
  font-size: clamp(1.5rem, 3.5vw, 2.25rem);
  font-weight: 800;
  color: white;
  letter-spacing: -0.03em;
  line-height: 1.05;
  margin: 0 0 0.5rem;
`;

const PortfolioSubtitle = styled.p`
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  font-size: clamp(0.8rem, 1.2vw, 0.92rem);
  font-weight: 300;
  color: rgba(255, 255, 255, 0.50);
  line-height: 1.6;
  margin: 0;
`;

// ── Loading ──

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 420px;
  width: 100%;

  &::after {
    content: "";
    width: 52px;
    height: 52px;
    border: 4px solid rgba(52, 152, 219, 0.15);
    border-radius: 50%;
    border-top-color: #3498db;
    animation: ${spin} 0.9s ease-in-out infinite;
    box-shadow: 0 0 20px rgba(52, 152, 219, 0.3);
  }
`;

// ── Empty ──

const EmptyState = styled.p`
  text-align: center;
  color: rgba(255, 255, 255, 0.4);
  font-size: 1.1rem;
  padding: 4rem 0;
`;

// ── Filter ──

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /*
   * Reduced from 2.5rem — filters sit between the compact header
   * and the carousel; they don't need heavyweight spacing.
   */
  margin-bottom: 1.5rem;
  gap: 0.65rem;
  padding: 0 2rem;

  @media (max-width: 480px) {
    margin-bottom: 1rem;
    gap: 0.5rem;
  }
`;

const FilterLabel = styled.h3`
  /*
   * Demoted to a small eyebrow label — the portfolio title above already
   * provides the heading hierarchy. "Filter Projects:" read too heavy.
   */
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.40);
  margin: 0;
`;

const FilterOptionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;

  @media (max-width: 480px) {
    gap: 0.4rem;
  }
`;

const FilterOption = styled.button`
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  padding: 0.55rem 1.25rem;
  border-radius: 9999px;
  font-size: 0.88rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: background 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease, color 0.22s ease;
  /* Unified to the single accent blue from CSS vars */
  background-color: ${({ selected }) =>
    selected ? "rgba(14, 165, 233, 0.85)" : "rgba(255, 255, 255, 0.07)"};
  color: ${({ selected }) => (selected ? "white" : "rgba(255,255,255,0.60)")};
  border: 1.5px solid ${({ selected }) =>
    selected ? "transparent" : "rgba(255, 255, 255, 0.10)"};
  box-shadow: ${({ selected }) =>
    selected ? "0 4px 16px rgba(14, 165, 233, 0.30)" : "none"};
  backdrop-filter: blur(8px);

  &:hover {
    background-color: ${({ selected }) =>
      selected ? "rgba(14, 165, 233, 0.95)" : "rgba(255, 255, 255, 0.12)"};
    border-color: ${({ selected }) =>
      selected ? "transparent" : "rgba(14, 165, 233, 0.45)"};
    color: white;
  }

  &:focus-visible {
    outline: 2px solid rgba(14, 165, 233, 0.7);
    outline-offset: 3px;
  }

  @media (max-width: 480px) {
    padding: 0.4rem 0.85rem;
    font-size: 0.78rem;
  }
`;

// ── Carousel wrapper ──

const CarouselWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* Reduced from 2rem — tighter gap between stage, dots, and counter */
  gap: 1rem;
  width: 100%;
  overflow-x: clip;
`;

const PerspectiveStage = styled.div`
  position: relative;
  width: 100vw;
  left: 50%;
  transform: translateX(-50%);
  perspective: 1200px;
  perspective-origin: 50% 50%;

  /*
   * Reduced card width from 60vw → 44vw so the carousel reads
   * as a gallery panel, not a billboard. Max-height prevents the
   * stage from growing excessively on ultra-wide screens.
   */
  height: min(calc(44vw * 9 / 16), 420px);

  @media (max-width: 768px) {
    height: calc(70vw * 9 / 16);
  }

  @media (max-width: 600px) {
    height: calc(88vw * 9 / 16);
  }
`;

// Track containing absolutely-positioned cards
const CardTrack = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const AnimatedCard = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 50%;
  /*
   * Card width stepped down from 60vw → 44vw (capped at 680px)
   * to match the reduced PerspectiveStage height and keep the
   * carousel proportional rather than billboard-sized.
   */
  width: min(44vw, 680px);
  height: min(calc(44vw * 9 / 16), 382px);
  margin-left: calc(min(44vw, 680px) / -2);
  margin-top: calc(min(calc(44vw * 9 / 16), 382px) / -2);

  @media (max-width: 768px) {
    width: 70vw;
    height: calc(70vw * 9 / 16);
    margin-left: -35vw;
    margin-top: calc(-70vw * 9 / 32);
  }

  @media (max-width: 600px) {
    width: 88vw;
    height: calc(88vw * 9 / 16);
    margin-left: -44vw;
    margin-top: calc(-88vw * 9 / 32);
  }

  will-change: transform, opacity, filter;
  border-radius: 20px;
  overflow: hidden;
  background: #07070f;
  cursor: pointer;

  /*
   * Shadows removed per design revision — card depth is now conveyed
   * through scale, opacity, and rotateY on the side cards alone.
   * A hairline border keeps the card edge readable against dark backgrounds.
   */
  border: 1px solid rgba(255, 255, 255, 0.07);

  @media (max-width: 600px) {
    ${({ $position }) =>
      ($position === "prev" || $position === "next") &&
      css`
        display: none;
      `}
  }
`;

// ── Card interior ──

const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background: #07070f;

  &:hover img {
    transform: scale(1.04);
  }

  &:hover [data-slide-panel] {
    transform: translateY(0);
  }
`;

const CardImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  transform: scale(1);
  transition: transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: transform;
`;

const ImagePlaceholder = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(52, 152, 219, 0.18),
    rgba(155, 89, 182, 0.18)
  );
`;

// ── Slide-up panel ──

const SlidePanel = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3;
  padding: 2.5rem 1.4rem 1.25rem;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(4, 4, 14, 0.92) 20%,
    rgba(4, 4, 14, 0.98) 100%
  );
  transform: translateY(calc(100% - 3.6rem));
  transition: transform 0.42s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  display: flex;
  flex-direction: column;
  gap: 0.55rem;

  @media (max-width: 768px) {
    transform: translateY(calc(100% - 3.2rem));
    padding: 2rem 1.1rem 1rem;
    gap: 0.45rem;
  }

  @media (max-width: 600px) {
    transform: translateY(0);
    padding: 1.5rem 1rem 1rem;
  }
`;

const TypeBadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 0.25rem;
`;

const TypeBadge = styled.span`
  font-size: 0.62rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${({ $color }) => $color};
`;

const PersistentTitle = styled.p`
  margin: 0;
  font-family: var(--font-display, 'Syne', system-ui, sans-serif);
  font-size: 1.1rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 16px rgba(0, 0, 0, 0.9);
  line-height: 1.2;
  letter-spacing: -0.01em;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const DescriptionText = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.82);
  font-weight: 400;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 768px) {
    display: none;
  }

  @media (max-width: 600px) {
    display: -webkit-box;
  }
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.45rem;
  flex-wrap: wrap;
`;

const MetaDot = styled.span`
  color: rgba(255, 255, 255, 0.25);
  font-size: 0.7rem;
`;

const TechText = styled.span`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 400;
  letter-spacing: 0.01em;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-top: 0.1rem;
  overflow: hidden;
  max-height: 3.5rem;

  @media (max-width: 768px) {
    max-height: 2rem;
  }
`;

const TagChip = styled.span`
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  padding: 0.22rem 0.55rem;
  border-radius: 4px;
  font-size: 0.68rem;
  font-weight: 500;
  font-family: inherit;
  letter-spacing: 0.01em;
`;

// ── Action buttons ──

// ── Navigation arrows ──

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $side }) => ($side === "left" ? "left: 12px;" : "right: 12px;")}

  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 1.5px solid rgba(255, 255, 255, 0.18);
  background: rgba(10, 12, 22, 0.75);
  backdrop-filter: blur(14px);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: background 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);

  &:hover {
    background: rgba(14, 165, 233, 0.35);
    border-color: rgba(14, 165, 233, 0.65);
    box-shadow: 0 0 24px rgba(14, 165, 233, 0.35);
    transform: translateY(-50%);
  }

  &:focus-visible {
    outline: 2px solid rgba(14, 165, 233, 0.7);
    outline-offset: 3px;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    ${({ $side }) => ($side === "left" ? "left: 8px;" : "right: 8px;")}
  }

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    ${({ $side }) => ($side === "left" ? "left: 6px;" : "right: 6px;")}
  }
`;

// ── Dot indicators ──

const DotsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Dot = styled.button`
  height: 8px;
  width: ${({ $active }) => ($active ? "28px" : "8px")};
  border-radius: 4px;
  border: none;
  cursor: pointer;
  padding: 0;
  background: ${({ $active }) =>
    $active
      ? "linear-gradient(90deg, var(--color-accent, #0ea5e9), var(--color-accent-light, #38bdf8))"
      : "rgba(255,255,255,0.22)"};
  transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1), background 0.25s ease;
  box-shadow: ${({ $active }) =>
    $active ? "0 0 8px rgba(14, 165, 233, 0.55)" : "none"};

  &:hover {
    background: ${({ $active }) =>
      $active
        ? "linear-gradient(90deg, var(--color-accent, #0ea5e9), var(--color-accent-light, #38bdf8))"
        : "rgba(255,255,255,0.45)"};
  }

  &:focus-visible {
    outline: 2px solid rgba(14, 165, 233, 0.7);
    outline-offset: 3px;
  }
`;

const CounterLabel = styled.p`
  margin: 0;
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.35);
  letter-spacing: 0.05em;
  font-weight: 500;
`;
