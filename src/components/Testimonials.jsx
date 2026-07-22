import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import sanityClient from '../sanityClient';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

const QUERY = `*[_type == "testimonial" && featured == true] | order(order asc)[0...6] {
  _id,
  name,
  role,
  company,
  quote,
  rating,
  avatar
}`;

const MOCK_TESTIMONIALS = [
  {
    _id: 'mock-1',
    name: 'Sarah Mitchell',
    role: 'Founder',
    company: 'Bloom Studio',
    quote: 'Felipe built our entire site from scratch in under three weeks. Clean code, fast delivery, and he actually listened to what we wanted. Our bounce rate dropped 40% after launch.',
    rating: 5,
    avatar: null,
  },
  {
    _id: 'mock-2',
    name: 'Marcus T.',
    role: 'CEO',
    company: 'TradeRight',
    quote: "We needed a developer who could handle both design and code. Felipe delivered on both. The site looks professional and runs fast — exactly what we asked for.",
    rating: 5,
    avatar: null,
  },
  {
    _id: 'mock-3',
    name: 'Jasmine Reyes',
    role: 'Marketing Director',
    company: 'Apex Health',
    quote: 'Responsive, detail-oriented, and great at communicating throughout the project. I would hire Felipe again without hesitation.',
    rating: 5,
    avatar: null,
  },
];

function Stars({ rating }) {
  if (!rating) return null;
  return (
    <StarRow aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} $filled={i < rating}>★</Star>
      ))}
    </StarRow>
  );
}

function Avatar({ src, name }) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  if (src) {
    return (
      <AvatarImg
        src={urlFor(src).width(96).height(96).fit('crop').auto('format').url()}
        alt={name}
      />
    );
  }
  return <AvatarInitials>{initials}</AvatarInitials>;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    sanityClient
      .fetch(QUERY)
      .then((data) => {
        setTestimonials(data.length > 0 ? data : MOCK_TESTIMONIALS);
        setIsLoading(false);
      })
      .catch(() => {
        setTestimonials(MOCK_TESTIMONIALS);
        setIsLoading(false);
      });
  }, []);

  if (isLoading || testimonials.length === 0) return null;

  return (
    <Section>
      <BackgroundLayer />
      <Inner>
        <Header>
          <Eyebrow>Testimonials</Eyebrow>
          <Heading>What Clients Say</Heading>
          <Subheading>
            Real feedback from people I've had the pleasure of working with.
          </Subheading>
        </Header>

        <Grid $count={testimonials.length}>
          {testimonials.map((t) => (
            <Card key={t._id}>
              <Stars rating={t.rating} />
              <Quote>{t.quote}</Quote>
              <AuthorRow>
                <Avatar src={t.avatar} name={t.name} />
                <AuthorInfo>
                  <AuthorName>{t.name}</AuthorName>
                  {(t.role || t.company) && (
                    <AuthorMeta>
                      {[t.role, t.company].filter(Boolean).join(' · ')}
                    </AuthorMeta>
                  )}
                </AuthorInfo>
              </AuthorRow>
            </Card>
          ))}
        </Grid>
      </Inner>
    </Section>
  );
}

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Section = styled.section`
  position: relative;
  width: 100%;
  padding: 5rem 1.5rem 6rem;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 4rem 1rem 5rem;
  }
`;

const BackgroundLayer = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(10, 12, 22, 0.97);
  background-image:
    radial-gradient(ellipse 60% 40% at 20% 80%, rgba(14, 165, 233, 0.06) 0%, transparent 70%),
    radial-gradient(ellipse 50% 35% at 80% 20%, rgba(14, 165, 233, 0.04) 0%, transparent 70%);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  z-index: 0;
`;

const Inner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3.5rem;
  animation: ${fadeUp} 0.7s ease-out both;

  @media (max-width: 768px) {
    margin-bottom: 2.5rem;
  }
`;

const Eyebrow = styled.p`
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-accent-light, #38bdf8);
  margin: 0 0 0.75rem;
`;

const Heading = styled.h2`
  font-family: var(--font-display, 'Syne', system-ui, sans-serif);
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 800;
  color: white;
  letter-spacing: -0.025em;
  line-height: 1.1;
  margin: 0 0 0.85rem;
`;

const Subheading = styled.p`
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  font-size: clamp(0.9rem, 1.5vw, 1.05rem);
  color: rgba(255, 255, 255, 0.50);
  font-weight: 300;
  line-height: 1.7;
  margin: 0;
`;

const Grid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(
    ${({ $count }) => Math.min($count, 3)},
    1fr
  );

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.75rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  backdrop-filter: blur(12px);
  transition: border-color 0.25s ease, background 0.25s ease, transform 0.25s ease;
  animation: ${fadeUp} 0.7s ease-out both;

  &:hover {
    border-color: rgba(14, 165, 233, 0.25);
    background: rgba(14, 165, 233, 0.05);
    transform: translateY(-4px);
  }

  @media (max-width: 640px) {
    padding: 1.5rem;
  }
`;

const QuoteMark = styled.span`
  font-family: Georgia, serif;
  font-size: 4rem;
  line-height: 0.8;
  color: var(--color-accent, #0ea5e9);
  opacity: 0.35;
  display: block;
  margin-bottom: -0.5rem;
  user-select: none;
`;

const StarRow = styled.div`
  display: flex;
  gap: 2px;
`;

const Star = styled.span`
  font-size: 0.9rem;
  color: ${({ $filled }) => ($filled ? '#fbbf24' : 'rgba(255,255,255,0.15)')};
`;

const Quote = styled.blockquote`
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  font-size: clamp(0.9rem, 1.2vw, 1rem);
  font-weight: 300;
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.82);
  margin: 0;
  flex: 1;
`;

const AuthorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;
  margin-top: auto;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
`;

const AvatarImg = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  border: 1.5px solid rgba(14, 165, 233, 0.3);
`;

const AvatarInitials = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  flex-shrink: 0;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.3), rgba(56, 189, 248, 0.2));
  border: 1.5px solid rgba(14, 165, 233, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display, 'Syne', system-ui, sans-serif);
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--color-accent-light, #38bdf8);
`;

const AuthorInfo = styled.div`
  min-width: 0;
`;

const AuthorName = styled.p`
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  font-size: 0.9rem;
  font-weight: 600;
  color: white;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AuthorMeta = styled.p`
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.45);
  font-weight: 400;
  margin: 0.2rem 0 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
