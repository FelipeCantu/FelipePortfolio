import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

/*
 * Sidebar is rendered at the AppContent root in App.js, NOT inside the Nav element.
 *
 * Desktop (> 768px): position:fixed, top-right of viewport, z-index 1001.
 *   Visually identical to the old Nav flex-child position, but lives outside
 *   Nav's DOM so it is not trapped in Nav's backdrop-filter stacking context.
 *
 * Mobile (≤ 768px): position:fixed full-height drawer, slides in from the right.
 *   z-index 1300 — above the dimming overlay (1299) and all page content.
 *
 * The outer <nav> wrapper has no transform/opacity/filter so it does not
 * create an extra stacking context.
 */
const Sidebar = ({ open, onClose }) => {
  return (
    <nav>
      <Ul id="mobile-sidebar" open={open}>
        {/*
         * No close button here — the hamburger in App.js (z-index: 1400)
         * animates to an X when the sidebar is open and serves as the
         * single authoritative toggle control.
         */}
        <li><StyledLink to="/Home">Home</StyledLink></li>
        <li><StyledLink to="/Blog">Blogs</StyledLink></li>
        <li><StyledLink to="/Portfolio">Portfolio</StyledLink></li>
        <li><StyledLink to="/about">About</StyledLink></li>
        <li><StyledLink to="/Contact">Contact</StyledLink></li>
        <li className="contact-item"><GetStartedButton to="/get-started">Get Started</GetStartedButton></li>
      </Ul>
    </nav>
  );
};

/*
 * Why position:fixed on desktop too:
 *
 * Previously Sidebar was a flex child of Nav. Nav has backdrop-filter which
 * creates a stacking context, trapping any descendant z-index inside it. By
 * moving Sidebar out of Nav's DOM entirely (rendered at App root), we escape
 * that trapped context. But since it's no longer in the flex row, we anchor
 * it to the same visual position using position:fixed on desktop as well.
 *
 * z-index ladder:
 *   Nav bar              → 1000  (Navbar.jsx)
 *   Sidebar desktop/nav  → 1001  (sits just above Nav, same visual row)
 *   SidebarOverlay       → 1299  (App.js dimming backdrop, mobile only)
 *   Sidebar mobile panel → 1300  (slides over everything)
 */
const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin: 0;

  /* Desktop: fixed to the top-right of the viewport, matching the old Nav flex position */
  position: fixed;
  top: 0;
  right: 0;
  height: 60px;
  padding: 0 10px 0 0;
  z-index: 1001;
  pointer-events: auto;

  @media (min-width: 1250px) {
    padding-right: 200px;
  }

  li {
    color: #fff;
    margin: 20px;
    position: relative;
  }

  li.contact-item {
    margin-left: 20px;
    padding: 1.5px;
  }

  /* Mobile: full-height slide-in drawer */
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background: rgba(10, 12, 22, 0.96);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-left: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: -12px 0 40px rgba(0, 0, 0, 0.55);
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 100vh;
    width: 280px;
    padding: 5rem 0 2rem 0;
    transition: transform 0.32s cubic-bezier(0.4, 0, 0.2, 1);
    justify-content: flex-start;
    align-items: flex-start;
    z-index: 1300;

    li {
      padding: 0;
      width: 100%;
      margin: 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    li.contact-item {
      margin-top: 1rem;
      margin-left: 0;
      padding: 0 1.5rem;
      border-bottom: none;
    }
  }
`;

const StyledLink = styled(Link)`
  /*
   * DM Sans for nav links — pairs well with Syne headings,
   * less sterile than Arial which was set before.
   */
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  font-size: 0.95rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.82);
  text-decoration: none;
  letter-spacing: 0.02em;
  transition: color 0.2s ease;

  &:hover {
    color: var(--color-accent, #0ea5e9);
  }

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    padding: 1rem 1.5rem;
    font-size: 1.05rem;
    color: rgba(255, 255, 255, 0.85);

    &:hover {
      color: var(--color-accent, #0ea5e9);
      background: rgba(14, 165, 233, 0.07);
    }
  }
`;

const GetStartedButton = styled(Link)`
  display: inline-block;
  background-color: var(--color-gold, #f7ab0a);
  padding: 0.55rem 1.25rem;
  border-radius: 9999px;
  color: #1a1a1a;
  font-size: 0.88rem;
  font-weight: 700;
  font-family: var(--font-body, 'DM Sans', system-ui, sans-serif);
  letter-spacing: 0.02em;
  text-decoration: none;
  transition: background 0.22s ease, color 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease;
  border: 2px solid transparent;
  white-space: nowrap;

  &:hover {
    background-color: transparent;
    color: var(--color-gold, #f7ab0a);
    border-color: var(--color-gold, #f7ab0a);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(247, 171, 10, 0.22);
  }

  /*
   * Mobile: keep the pill style but adapt size/layout.
   * The old code stripped all button styles on mobile — replaced with
   * a full-width contained button that still reads as a CTA.
   */
  @media (max-width: 768px) {
    display: block;
    width: 100%;
    padding: 0.85rem 1.5rem;
    border-radius: var(--radius-md, 12px);
    text-align: center;
    font-size: 1rem;
    background-color: var(--color-gold, #f7ab0a);
    color: #1a1a1a;
    border-color: transparent;

    &:hover {
      background-color: #e09c00;
      color: #1a1a1a;
      border-color: transparent;
      box-shadow: none;
      transform: none;
    }
  }
`;

export default Sidebar;
