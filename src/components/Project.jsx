import React, { useEffect, useState, useRef, useCallback } from "react";
import sanityClient from "../sanityClient";
import styled, { keyframes, css } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FiExternalLink, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";

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
  if (type === "web") return "#3498db";
  if (type === "mobile") return "#9b59b6";
  return "#2ecc71";
}

// ─── SINGLE PROJECT CARD ──────────────────────────────────────────────────────

function CarouselCard({ project, position, direction, layoutKey, sideX }) {
  const isCenter = position === "center";

  return (
    <AnimatedCard
      key={layoutKey}
      custom={{ position, direction, sideX }}
      variants={cardVariants}
      initial="enter"
      animate="center"
      exit="exit"
      $position={position}
    >
      <CardInner>
        {project.image ? (
          <CardImage
            src={project.image.asset.url}
            alt={project.title}
            loading="lazy"
          />
        ) : (
          <ImagePlaceholder />
        )}

        <SlidePanel data-slide-panel>
          <TypeBadge $color={getBadgeColor(project.projectType)}>
            {project.projectType || "project"}
          </TypeBadge>
          <PersistentTitle>{project.title}</PersistentTitle>
          {project.description && typeof project.description === "string" && (
            <DescriptionText>{project.description}</DescriptionText>
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
          <ActionRow>
            {project.github && (
              <ActionLink
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} on GitHub`}
              >
                <FaGithub size={16} />
                <span>GitHub</span>
              </ActionLink>
            )}
            {project.link && (
              <VisitSiteLink
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${project.title} live`}
              >
                <FiExternalLink size={13} />
                <span>Visit Site</span>
              </VisitSiteLink>
            )}
          </ActionRow>
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
        ($projectTypeFilter == "all" || projectType == $projectTypeFilter)] | order(date desc){
          title,
          date,
          place,
          description,
          projectType,
          link,
          github,
          tags,
          image {
            asset -> {
              _id,
              url
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
          { value: "all", label: "All Projects" },
          { value: "web", label: "Web Development" },
          { value: "mobile", label: "Mobile Apps" },
          { value: "design", label: "UI/UX Design" },
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
  padding: 0 0 100px;
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
  margin-bottom: 3rem;
  gap: 1.2rem;
  padding: 0 2rem;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 1.5rem;
    gap: 0.8rem;
  }
`;

const FilterLabel = styled.h3`
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 700;
  margin: 0;
  padding-bottom: 0.5rem;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 3px;
    background: linear-gradient(90deg, #3498db, #9b59b6);
    border-radius: 2px;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
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
  padding: 0.65rem 1.4rem;
  border-radius: 30px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  background-color: ${({ selected }) =>
    selected ? "rgba(52, 152, 219, 0.9)" : "rgba(255, 255, 255, 0.08)"};
  color: ${({ selected }) => (selected ? "white" : "rgba(255,255,255,0.65)")};
  border: 1.5px solid
    ${({ selected }) =>
      selected ? "transparent" : "rgba(255, 255, 255, 0.12)"};
  box-shadow: ${({ selected }) =>
    selected ? "0 4px 16px rgba(52, 152, 219, 0.35)" : "none"};
  backdrop-filter: blur(8px);

  &:hover {
    background-color: ${({ selected }) =>
      selected ? "rgba(52, 152, 219, 0.95)" : "rgba(255, 255, 255, 0.14)"};
    border-color: ${({ selected }) =>
      selected ? "transparent" : "rgba(52, 152, 219, 0.5)"};
    color: white;
  }

  &:focus-visible {
    outline: 2px solid rgba(52, 152, 219, 0.7);
    outline-offset: 3px;
  }

  @media (max-width: 480px) {
    padding: 0.45rem 0.8rem;
    font-size: 0.75rem;
  }
`;

// ── Carousel wrapper ──

const CarouselWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
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

  height: calc(60vw * 9 / 16);

  @media (max-width: 600px) {
    height: calc(90vw * 9 / 16);
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
  width: 60vw;
  height: calc(60vw * 9 / 16);
  margin-left: -30vw;
  margin-top: calc(-60vw * 9 / 32);

  @media (max-width: 600px) {
    width: 90vw;
    height: calc(90vw * 9 / 16);
    margin-left: -45vw;
    margin-top: calc(-90vw * 9 / 32);
  }

  will-change: transform, opacity, filter;
  border-radius: 20px;
  overflow: hidden;
  background: #07070f;
  cursor: ${({ $position }) => ($position === "center" ? "default" : "pointer")};

  box-shadow: ${({ $position }) =>
    $position === "center"
      ? `0 20px 60px rgba(0,0,0,0.8),
         0 60px 120px rgba(0,0,0,0.5),
         0 0 40px rgba(52,152,219,0.15)`
      : "0 10px 40px rgba(0,0,0,0.5)"};

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
  font-size: 1.05rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 16px rgba(0, 0, 0, 0.9);
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 0.95rem;
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

const ActionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ActionLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.3rem;
  border-radius: 8px;
  font-size: 0.82rem;
  font-weight: 600;
  text-decoration: none;
  letter-spacing: 0.01em;
  white-space: nowrap;
  transition: background 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, color 0.2s ease;

  background: ${({ $primary }) =>
    $primary ? "#3498db" : "rgba(255, 255, 255, 0.08)"};
  color: white;
  border: 1.5px solid
    ${({ $primary }) =>
      $primary ? "transparent" : "rgba(255, 255, 255, 0.22)"};

  svg {
    flex-shrink: 0;
    opacity: ${({ $primary }) => ($primary ? 1 : 0.75)};
  }

  &:hover {
    background: ${({ $primary }) =>
      $primary ? "#2a88cc" : "rgba(255, 255, 255, 0.14)"};
    border-color: ${({ $primary }) =>
      $primary ? "#2a88cc" : "rgba(255, 255, 255, 0.38)"};
    svg {
      opacity: 1;
    }
  }

  &:active {
    filter: brightness(0.88);
  }

  &:focus-visible {
    outline: 2px solid rgba(52, 152, 219, 0.7);
    outline-offset: 3px;
  }
`;

const VisitSiteLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.82rem;
  font-weight: 500;
  color: #3498db;
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-color: rgba(52, 152, 219, 0.45);
  letter-spacing: 0.01em;
  white-space: nowrap;
  transition: color 0.2s ease, text-decoration-color 0.2s ease;

  svg {
    flex-shrink: 0;
    opacity: 0.6;
    transition: opacity 0.2s ease;
  }

  &:hover {
    color: #5dade2;
    text-decoration-color: rgba(52, 152, 219, 0.8);
    svg {
      opacity: 1;
    }
  }
`;

// ── Navigation arrows ──

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $side }) => ($side === "left" ? "left: 12px;" : "right: 12px;")}

  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 1.5px solid rgba(255, 255, 255, 0.2);
  background: rgba(20, 20, 30, 0.8);
  backdrop-filter: blur(12px);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.22s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);

  &:hover {
    background: rgba(52, 152, 219, 0.4);
    border-color: rgba(52, 152, 219, 0.7);
    box-shadow: 0 0 24px rgba(52, 152, 219, 0.4);
    transform: translateY(-50%);
  }

  &:focus-visible {
    outline: 2px solid rgba(52, 152, 219, 0.7);
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
      ? "linear-gradient(90deg, #3498db, #0097e8)"
      : "rgba(255,255,255,0.25)"};
  transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1),
    background 0.25s ease;
  box-shadow: ${({ $active }) =>
    $active ? "0 0 8px rgba(52,152,219,0.6)" : "none"};

  &:hover {
    background: ${({ $active }) =>
      $active
        ? "linear-gradient(90deg, #3498db, #0097e8)"
        : "rgba(255,255,255,0.5)"};
  }

  &:focus-visible {
    outline: 2px solid rgba(52, 152, 219, 0.7);
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
