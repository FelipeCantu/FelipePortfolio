---
title: "SkateSpot"
excerpt: "A social platform for skateboarders to find spots on an interactive map, share clips and compete on global and local leaderboards."
---

SkateSpot is a full-stack social platform built for the skateboarding community. Skaters discover local spots, share clips and compete through a points-based progression system. It is live at [skate-spot-web.vercel.app](https://skate-spot-web.vercel.app).

## Discovery and spots

- **Map:** an interactive Leaflet map of skateable locations, filtered by type (street, park, DIY, transition) and difficulty.
- **Trust:** spot verification and star ratings.

## Content and social

- **Feed:** a TikTok-style infinite scroll of skate clips.
- **Interactions:** likes, comments, bookmarks, follows and real-time activity notifications.
- **Profiles elsewhere:** Instagram, YouTube and TikTok profile links.

## Progression and competition

- **Points:** earned by creating spots, uploading clips, and receiving likes, comments and followers.
- **Tiers:** Rookie, Amateur, Pro, then Legend.
- **Leaderboards:** global rankings plus location-specific "King of the Spot" rankings.

## Profiles

- Public and private profiles with clips, stats and gear setups.
- Auto-generated avatars from DiceBear.

## Stack

- **Frontend:** Next.js, React 19, TypeScript, Tailwind CSS, Framer Motion and Leaflet.
- **Backend:** Node.js with 26 API routes and NextAuth.js.
- **Database:** SQLite with the Prisma ORM.
- **Hosting:** Vercel.
