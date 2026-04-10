import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import sanityClient from "../sanityClient";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";
import styled, { keyframes } from "styled-components";
import { FiArrowLeft, FiExternalLink, FiCalendar, FiMapPin, FiZoomIn } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

// ─── Sanity Image Builder ───────────────────────────────────────────────────────

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

// ─── Constants ─────────────────────────────────────────────────────────────────

const TYPE_COLORS = {
  web: "#3498db",
  mobile: "#9b59b6",
  design: "#e67e22",
  backend: "#e74c3c",
  fullstack: "#2ecc71",
  other: "#95a5a6",
};

const STATUS_CONFIG = {
  inProgress: {
    bg: "rgba(243, 156, 18, 0.15)",
    text: "#f39c12",
    border: "rgba(243, 156, 18, 0.35)",
    label: "In Progress",
  },
  completed: {
    bg: "rgba(46, 204, 113, 0.15)",
    text: "#2ecc71",
    border: "rgba(46, 204, 113, 0.35)",
    label: "Completed",
  },
  archived: {
    bg: "rgba(149, 165, 166, 0.15)",
    text: "#95a5a6",
    border: "rgba(149, 165, 166, 0.35)",
    label: "Archived",
  },
};

// ─── BlockContent Serializers ───────────────────────────────────────────────────

const serializers = {
  types: {
    block: (props) => {
      const { style = "normal" } = props.node;
      if (style === "h1") return <RichH1>{props.children}</RichH1>;
      if (style === "h2") return <RichH2>{props.children}</RichH2>;
      if (style === "h3") return <RichH3>{props.children}</RichH3>;
      if (style === "h4") return <RichH4>{props.children}</RichH4>;
      if (style === "blockquote") return <RichBlockquote>{props.children}</RichBlockquote>;
      return <RichParagraph>{props.children}</RichParagraph>;
    },
    image: ({ node }) => (
      <InlineImageContainer>
        <img src={urlFor(node.asset).url()} alt={node.alt || "Project image"} />
        {node.caption && <span className="caption">{node.caption}</span>}
      </InlineImageContainer>
    ),
  },
  marks: {
    strong: (props) => <strong>{props.children}</strong>,
    em: (props) => <em>{props.children}</em>,
    link: (props) => (
      <RichLink href={props.mark.href} target="_blank" rel="noopener noreferrer">
        {props.children}
      </RichLink>
    ),
  },
  list: (props) =>
    props.type === "bullet" ? (
      <RichUL>{props.children}</RichUL>
    ) : (
      <RichOL>{props.children}</RichOL>
    ),
  listItem: (props) => <RichLI>{props.children}</RichLI>,
};

// ─── Component ─────────────────────────────────────────────────────────────────

export default function SingleProject() {
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lightbox, setLightbox] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    sanityClient
      .fetch(
        `*[_type == "project" && slug.current == $slug][0]{
          title,
          slug,
          excerpt,
          body,
          projectType,
          status,
          featured,
          date,
          place,
          tags,
          link,
          githubLink,
          image {
            asset->{ _id, url },
            alt
          },
          gallery[] {
            asset->{ _id, url },
            alt,
            caption
          }
        }`,
        { slug }
      )
      .then((data) => {
        setProject(data || null);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching project:", err);
        setIsLoading(false);
      });
  }, [slug]);

  function openLightbox(src, alt) {
    setLightbox({ src, alt });
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    setLightbox(null);
    document.body.style.overflow = "";
  }

  useEffect(() => {
    if (!lightbox) return;
    function handleKeyDown(e) {
      if (e.key === "Escape") closeLightbox();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightbox]);

  // ── Loading state ──
  if (isLoading) {
    return (
      <PageContainer>
        <Background />
        <LoadingWrapper>
          <Spinner />
          <LoadingText>Loading project...</LoadingText>
        </LoadingWrapper>
      </PageContainer>
    );
  }

  // ── Not found state ──
  if (!project) {
    return (
      <PageContainer>
        <Background />
        <NotFoundWrapper>
          <NotFoundCard>
            <NotFoundIcon aria-hidden="true">404</NotFoundIcon>
            <NotFoundTitle>Project Not Found</NotFoundTitle>
            <NotFoundMessage>
              This project doesn't exist or may have been removed.
            </NotFoundMessage>
            <BackButton to="/portfolio">
              <FiArrowLeft aria-hidden="true" />
              <span>Back to Portfolio</span>
            </BackButton>
          </NotFoundCard>
        </NotFoundWrapper>
      </PageContainer>
    );
  }

  // ── Derived values ──
  const typeColor = TYPE_COLORS[project.projectType] || TYPE_COLORS.other;
  const statusCfg = STATUS_CONFIG[project.status] || STATUS_CONFIG.completed;
  const githubUrl = project.githubLink;
  const formattedDate = project.date
    ? new Date(project.date + "-01").toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <>
      <Helmet>
        <title>{project.title} | Felipe Cantu Jr</title>
        <meta
          name="description"
          content={
            project.excerpt ||
            `${project.title} — a ${project.projectType || 'web'} project by Felipe Cantu Jr, Full Stack Developer in Dallas, TX.${project.tags?.length ? ` Built with ${project.tags.slice(0, 3).join(', ')}.` : ''}`
          }
        />
        <link rel="canonical" href={`https://felipecantujr.com/project/${slug}`} />
        <meta property="og:title" content={`${project.title} | Felipe Cantu Jr`} />
        <meta property="og:description" content={project.excerpt || `${project.title} — a project by Felipe Cantu Jr.`} />
        <meta property="og:url" content={`https://felipecantujr.com/project/${slug}`} />
        <meta property="og:type" content="website" />
        {project.image?.asset?.url && <meta property="og:image" content={project.image.asset.url} />}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "name": project.title,
          "description": project.excerpt || `${project.title} — a project by Felipe Cantu Jr.`,
          "url": `https://felipecantujr.com/project/${slug}`,
          "author": { "@type": "Person", "name": "Felipe Cantu Jr", "url": "https://felipecantujr.com" },
          ...(project.image?.asset?.url && { "image": project.image.asset.url }),
          ...(project.tags?.length && { "keywords": project.tags.join(", ") }),
          ...(project.date && { "dateCreated": project.date }),
          ...(project.link && { "sameAs": project.link }),
        })}</script>
      </Helmet>

      <PageContainer>
        <Background />

        <ContentWrapper>
          {/* ── Back navigation ── */}
          <BackButton to="/portfolio">
            <FiArrowLeft aria-hidden="true" />
            <span>Back to Portfolio</span>
          </BackButton>

          <ProjectCard>
            {/* ── Cover image / hero ── */}
            {project.image?.asset?.url && (
              <HeroImage
                onClick={() =>
                  openLightbox(
                    project.image.asset.url,
                    project.image.alt || project.title
                  )
                }
                style={{ cursor: "pointer" }}
              >
                <img
                  src={project.image.asset.url}
                  alt={project.image.alt || project.title}
                />
                <HeroScrim />
                <HeroZoomHint aria-hidden="true">
                  <FiZoomIn size={22} />
                </HeroZoomHint>
              </HeroImage>
            )}

            {/* ── Header block ── */}
            <HeaderContent $hasImage={!!project.image?.asset?.url}>
              {/* Accent rule */}
              <AccentRule />

              {/* Badges */}
              <BadgeRow>
                {project.projectType && (
                  <TypeBadge $color={typeColor}>
                    {project.projectType}
                  </TypeBadge>
                )}
                {project.status && (
                  <StatusBadge $cfg={statusCfg}>
                    {statusCfg.label}
                  </StatusBadge>
                )}
                {project.featured && (
                  <FeaturedBadge>Featured</FeaturedBadge>
                )}
              </BadgeRow>

              {/* Title */}
              <ProjectTitle>{project.title}</ProjectTitle>

              {/* Excerpt */}
              {project.excerpt && <Excerpt>{project.excerpt}</Excerpt>}

              {/* Meta row */}
              {(formattedDate || project.place) && (
                <MetaRow>
                  {formattedDate && (
                    <MetaItem>
                      <FiCalendar size={14} aria-hidden="true" />
                      <span>{formattedDate}</span>
                    </MetaItem>
                  )}
                  {project.place && (
                    <MetaItem>
                      <FiMapPin size={14} aria-hidden="true" />
                      <span>{project.place}</span>
                    </MetaItem>
                  )}
                </MetaRow>
              )}

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <TagRow>
                  {project.tags.map((tag, i) => (
                    <TagChip key={i}>{tag}</TagChip>
                  ))}
                </TagRow>
              )}

              {/* Action buttons */}
              {(githubUrl || project.link) && (
                <LinkRow>
                  {githubUrl && (
                    <ActionButton
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      $variant="ghost"
                      aria-label="View source on GitHub"
                    >
                      <FaGithub size={16} aria-hidden="true" />
                      <span>View on GitHub</span>
                    </ActionButton>
                  )}
                  {project.link && (
                    <ActionButton
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      $variant="primary"
                      aria-label="Open live demo"
                    >
                      <FiExternalLink size={15} aria-hidden="true" />
                      <span>Visit Live Site</span>
                    </ActionButton>
                  )}
                </LinkRow>
              )}
            </HeaderContent>

            {/* ── Rich text body ── */}
            {project.body && project.body.length > 0 && (
              <BodySection>
                <SectionDivider />
                <BodyContent>
                  <BlockContent
                    blocks={project.body}
                    projectId="pnm3puk3"
                    dataset="production"
                    serializers={serializers}
                  />
                </BodyContent>
              </BodySection>
            )}

            {/* ── Gallery ── */}
            {project.gallery && project.gallery.length > 0 && (
              <GallerySection>
                <SectionDivider />
                <GalleryHeader>
                  <GalleryTitle>Gallery</GalleryTitle>
                  <GalleryCount>{project.gallery.length} images</GalleryCount>
                </GalleryHeader>
                <GalleryGrid>
                  {project.gallery.map((img, i) => (
                    <GalleryItem
                      key={img.asset?._id || i}
                      onClick={() =>
                        openLightbox(
                          img.asset?.url,
                          img.alt || `${project.title} screenshot ${i + 1}`
                        )
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={img.asset?.url}
                        alt={
                          img.alt || `${project.title} screenshot ${i + 1}`
                        }
                        loading="lazy"
                      />
                      <GalleryZoomOverlay aria-hidden="true">
                        <FiZoomIn size={28} />
                      </GalleryZoomOverlay>
                      {img.caption && (
                        <GalleryCaption>{img.caption}</GalleryCaption>
                      )}
                    </GalleryItem>
                  ))}
                </GalleryGrid>
              </GallerySection>
            )}
          </ProjectCard>
        </ContentWrapper>
      </PageContainer>

      {lightbox && (
        <LightboxOverlay onClick={closeLightbox}>
          <LightboxInner onClick={(e) => e.stopPropagation()}>
            <LightboxCloseBtn onClick={closeLightbox} aria-label="Close">
              ✕
            </LightboxCloseBtn>
            <LightboxImg src={lightbox.src} alt={lightbox.alt} />
          </LightboxInner>
        </LightboxOverlay>
      )}
    </>
  );
}

// ─── Keyframes ─────────────────────────────────────────────────────────────────

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const gradientShift = keyframes`
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const shimmer = keyframes`
  0%   { left: -100%; }
  100% { left: 100%; }
`;

// ─── Layout ────────────────────────────────────────────────────────────────────

const PageContainer = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  padding-top: 80px;

  @media (max-width: 480px) {
    padding-top: 70px;
  }
`;

const Background = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;
  background-image: url("images/mainbg.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(20, 20, 30, 0.78);
    backdrop-filter: blur(1px);
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 10;
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 2rem 4rem;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem 3rem;
  }

  @media (max-width: 480px) {
    padding: 1rem 0.75rem 2.5rem;
  }
`;

// ─── Loading state ──────────────────────────────────────────────────────────────

const LoadingWrapper = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 65vh;
  gap: 1.25rem;
`;

const Spinner = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 3px solid rgba(52, 152, 219, 0.18);
  border-top-color: #3498db;
  animation: ${spin} 0.85s ease-in-out infinite;
`;

const LoadingText = styled.p`
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.95rem;
  letter-spacing: 0.04em;
  margin: 0;
`;

// ─── Not-found state ────────────────────────────────────────────────────────────

const NotFoundWrapper = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 65vh;
  padding: 2rem;
`;

const NotFoundCard = styled.div`
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
  padding: 3rem 2.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  max-width: 420px;
  width: 100%;
  animation: ${fadeInUp} 0.6s ease-out;
`;

const NotFoundIcon = styled.span`
  font-family: var(--font-display, 'Syne', system-ui, sans-serif);
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--color-accent, #0ea5e9), #9b59b6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
`;

const NotFoundTitle = styled.h2`
  color: white;
  font-size: 1.6rem;
  font-weight: 700;
  margin: 0;
`;

const NotFoundMessage = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
`;

// ─── Back button ───────────────────────────────────────────────────────────────

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.78);
  text-decoration: none;
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  font-size: 0.88rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  margin-bottom: 1.75rem;
  padding: 0.55rem 1.2rem;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: 9999px;
  transition: background 0.22s ease, border-color 0.22s ease,
              transform 0.22s ease, color 0.22s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.11);
    border-color: rgba(255, 255, 255, 0.20);
    transform: translateX(-4px);
    color: white;
  }

  &:focus-visible {
    outline: 2px solid rgba(14, 165, 233, 0.7);
    outline-offset: 3px;
  }

  svg {
    flex-shrink: 0;
  }
`;

// ─── Project card (glass shell) ─────────────────────────────────────────────────

const ProjectCard = styled.article`
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(22px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.05);
  animation: ${fadeInUp} 0.65s ease-out;
`;

// ─── Hero image ────────────────────────────────────────────────────────────────

const HeroImage = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.5);

  img {
    width: 100%;
    max-height: 520px;
    object-fit: contain;
    display: block;
    transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  &:hover img {
    transform: scale(1.04);
  }
`;

const HeroZoomHint = styled.div`
  position: absolute;
  bottom: 0.85rem;
  right: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.55);
  color: white;
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;

  ${HeroImage}:hover & {
    opacity: 1;
  }
`;

const HeroScrim = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 55%;
  background: linear-gradient(
    to top,
    rgba(14, 14, 22, 0.85) 0%,
    rgba(14, 14, 22, 0.4) 50%,
    transparent 100%
  );
  pointer-events: none;
`;

// ─── Header content ────────────────────────────────────────────────────────────

const AccentRule = styled.div`
  width: 52px;
  height: 3px;
  border-radius: 2px;
  background: linear-gradient(90deg, var(--color-accent, #0ea5e9), var(--color-accent-light, #38bdf8));
  margin-bottom: 1.25rem;
`;

const HeaderContent = styled.div`
  padding: ${({ $hasImage }) => ($hasImage ? "1.75rem 2.5rem 2rem" : "2.5rem 2.5rem 2rem")};

  @media (max-width: 768px) {
    padding: 1.5rem 1.5rem 1.75rem;
  }

  @media (max-width: 480px) {
    padding: 1.25rem 1.25rem 1.5rem;
  }
`;

const BadgeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const TypeBadge = styled.span`
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ $color }) => $color};
  background: ${({ $color }) => $color}1a;
  border: 1px solid ${({ $color }) => $color}45;
  padding: 0.28rem 0.75rem;
  border-radius: 20px;
`;

const StatusBadge = styled.span`
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: ${({ $cfg }) => $cfg.text};
  background: ${({ $cfg }) => $cfg.bg};
  border: 1px solid ${({ $cfg }) => $cfg.border};
  padding: 0.28rem 0.75rem;
  border-radius: 20px;
`;

const FeaturedBadge = styled.span`
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #ffd93d;
  background: rgba(255, 217, 61, 0.12);
  border: 1px solid rgba(255, 217, 61, 0.3);
  padding: 0.28rem 0.75rem;
  border-radius: 20px;
`;

const ProjectTitle = styled.h1`
  font-family: var(--font-display, 'Syne', system-ui, sans-serif);
  color: white;
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  font-weight: 800;
  line-height: 1.1;
  margin: 0 0 0.85rem;
  letter-spacing: -0.025em;
`;

const Excerpt = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.7;
  margin: 0 0 1.25rem;
  font-style: italic;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const MetaRow = styled.div`
  display: flex;
  gap: 1.25rem;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.88rem;

  svg {
    color: var(--color-accent-light, #38bdf8);
    flex-shrink: 0;
  }
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1.6rem;
`;

const TagChip = styled.span`
  background: rgba(255, 255, 255, 0.07);
  color: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.28rem 0.7rem;
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 500;
  transition: background 0.18s ease, border-color 0.18s ease;

  &:hover {
    background: rgba(52, 152, 219, 0.12);
    border-color: rgba(52, 152, 219, 0.3);
    color: rgba(255, 255, 255, 0.9);
  }
`;

const LinkRow = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  padding: 0.35rem 0.25rem 0.5rem;
`;

const ActionButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: ${({ $variant }) => $variant === "primary" ? "0.6rem 1.5rem" : "0.6rem 1.35rem"};
  border-radius: 9999px;
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  font-size: 0.88rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-decoration: none;
  transition: background 0.22s ease, color 0.22s ease, border-color 0.22s ease,
              transform 0.22s ease, box-shadow 0.22s ease;
  white-space: nowrap;
  position: relative;
  overflow: ${({ $variant }) => $variant === "primary" ? "visible" : "hidden"};

  background: ${({ $variant }) =>
    $variant === "primary" ? "var(--color-accent, #0ea5e9)" : "rgba(255, 255, 255, 0.07)"};
  color: white;
  border: ${({ $variant }) =>
    $variant === "primary"
      ? "2px solid var(--color-accent, #0ea5e9)"
      : "1px solid rgba(255, 255, 255, 0.14)"};

  /* Shimmer layer — ghost variant only */
  &::before {
    content: "";
    display: ${({ $variant }) => $variant === "primary" ? "none" : "block"};
    position: absolute;
    top: 0;
    left: -100%;
    width: 60%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.12), transparent);
    transition: left 0.5s ease;
    pointer-events: none;
  }

  svg {
    flex-shrink: 0;
  }

  &:hover {
    background: ${({ $variant }) =>
      $variant === "primary" ? "transparent" : "rgba(255, 255, 255, 0.12)"};
    color: ${({ $variant }) =>
      $variant === "primary" ? "var(--color-accent-light, #38bdf8)" : "white"};
    border-color: ${({ $variant }) =>
      $variant === "primary"
        ? "var(--color-accent, #0ea5e9)"
        : "rgba(255, 255, 255, 0.25)"};
    transform: translateY(-2px);
    box-shadow: ${({ $variant }) =>
      $variant === "primary"
        ? "0 6px 20px rgba(14, 165, 233, 0.22)"
        : "0 6px 20px rgba(0, 0, 0, 0.25)"};

    &::before {
      left: 150%;
    }
  }

  &:focus-visible {
    outline: 2px solid rgba(14, 165, 233, 0.7);
    outline-offset: 3px;
  }

  &:active {
    transform: translateY(0);
  }
`;

// ─── Section divider ───────────────────────────────────────────────────────────

const SectionDivider = styled.hr`
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  margin: 0;
`;

// ─── Rich text body ────────────────────────────────────────────────────────────

const BodySection = styled.div``;

const BodyContent = styled.div`
  padding: 2rem 2.5rem 2.5rem;
  color: rgba(255, 255, 255, 0.82);
  font-size: 1.05rem;
  line-height: 1.8;

  @media (max-width: 768px) {
    padding: 1.75rem 1.5rem 2rem;
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 1.25rem 1.75rem;
  }
`;

const RichH1 = styled.h1`
  font-family: var(--font-display, 'Syne', system-ui, sans-serif);
  color: white;
  font-size: clamp(1.4rem, 3vw, 1.85rem);
  font-weight: 800;
  margin: 2.5rem 0 1rem;
  padding-bottom: 0.6rem;
  border-bottom: 2px solid rgba(14, 165, 233, 0.35);
  letter-spacing: -0.02em;
`;

const RichH2 = styled.h2`
  font-family: var(--font-display, 'Syne', system-ui, sans-serif);
  color: white;
  font-size: clamp(1.2rem, 2.5vw, 1.45rem);
  font-weight: 700;
  margin: 2rem 0 0.75rem;
  letter-spacing: -0.015em;
`;

const RichH3 = styled.h3`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  font-weight: 600;
  margin: 1.75rem 0 0.65rem;
`;

const RichH4 = styled.h4`
  color: rgba(255, 255, 255, 0.85);
  font-size: 1.05rem;
  font-weight: 600;
  margin: 1.5rem 0 0.5rem;
`;

const RichParagraph = styled.p`
  margin-bottom: 1.4rem;
  &:last-child {
    margin-bottom: 0;
  }
`;

const RichBlockquote = styled.blockquote`
  border-left: 3px solid var(--color-accent, #0ea5e9);
  padding: 1rem 1.5rem;
  margin: 1.75rem 0;
  font-style: italic;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.65);
  background: rgba(14, 165, 233, 0.06);
  border-radius: 0 10px 10px 0;
`;

const RichLink = styled.a`
  color: var(--color-accent-light, #38bdf8);
  font-weight: 500;
  text-underline-offset: 3px;
  transition: color 0.18s ease;

  &:hover {
    color: white;
  }
`;

const RichUL = styled.ul`
  margin: 1.25rem 0;
  padding-left: 1.5rem;
  list-style: none;

  li {
    position: relative;
    margin-bottom: 0.6rem;
  }

  li::before {
    content: "";
    position: absolute;
    left: -1.1rem;
    top: 0.6em;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--color-accent, #0ea5e9);
  }
`;

const RichOL = styled.ol`
  margin: 1.25rem 0;
  padding-left: 1.5rem;

  li {
    margin-bottom: 0.6rem;
  }

  li::marker {
    color: var(--color-accent, #0ea5e9);
    font-weight: 600;
  }
`;

const RichLI = styled.li`
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.82);
`;

const InlineImageContainer = styled.figure`
  text-align: center;
  margin: 2rem 0;

  img {
    max-width: 100%;
    border-radius: 12px;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .caption {
    display: block;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.45);
    font-style: italic;
    margin-top: 0.75rem;
  }
`;

// ─── Gallery ───────────────────────────────────────────────────────────────────

const GallerySection = styled.div``;

const GalleryHeader = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  padding: 1.75rem 2.5rem 1.25rem;

  @media (max-width: 768px) {
    padding: 1.5rem 1.5rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 1.25rem 1.25rem 0.75rem;
  }
`;

const GalleryTitle = styled.h2`
  font-family: var(--font-display, 'Syne', system-ui, sans-serif);
  color: white;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin: 0;
`;

const GalleryCount = styled.span`
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.82rem;
  font-weight: 400;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 0.85rem;
  padding: 0 2.5rem 2.5rem;

  @media (max-width: 768px) {
    padding: 0 1.5rem 1.75rem;
    gap: 0.65rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    padding: 0 1.25rem 1.5rem;
  }
`;

const GalleryItem = styled.div`
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  img {
    width: 100%;
    display: block;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    transition: transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  /* Shimmer on hover */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.06),
      transparent
    );
    transition: left 0.5s ease;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
    border-color: rgba(255, 255, 255, 0.14);

    img {
      transform: scale(1.05);
    }

    &::after {
      left: 150%;
    }
  }
`;

const GalleryZoomOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.45);
  color: white;
  opacity: 0;
  transition: opacity 0.25s ease;
  pointer-events: none;

  ${GalleryItem}:hover & {
    opacity: 1;
  }
`;

const GalleryCaption = styled.p`
  margin: 0;
  padding: 0.55rem 0.8rem;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.45);
  font-style: italic;
  background: rgba(0, 0, 0, 0.25);
`;

// ─── Lightbox ──────────────────────────────────────────────────────────────────

const LightboxOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  cursor: zoom-out;
`;

const LightboxInner = styled.div`
  position: relative;
  max-width: 95vw;
  max-height: 95vh;
  cursor: default;
`;

const LightboxCloseBtn = styled.button`
  position: absolute;
  top: -2.25rem;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  opacity: 0.75;
  transition: opacity 0.18s ease;

  &:hover {
    opacity: 1;
  }

  &:focus-visible {
    outline: 2px solid rgba(52, 152, 219, 0.7);
    outline-offset: 3px;
    border-radius: 4px;
  }
`;

const LightboxImg = styled.img`
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 8px;
  display: block;
`;
