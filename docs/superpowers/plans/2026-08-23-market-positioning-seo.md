# Market Positioning SEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposition Jonas Suhard around the current market term `Growth Engineer` while keeping junior seniority explicit and preserving the credible `Product Builder IA` and `Chef de projet IA` aliases.

**Architecture:** `lib/projects.ts` remains the human-site identity source and gains explicit fields for the SEO title, display headline and aliases. App pages consume those fields instead of duplicating the title. Public machine-readable files remain static artifacts but are protected by a cross-surface regression test and regenerated content checks.

**Tech Stack:** Next.js 16, React, TypeScript, Node test runner, static Markdown/JSON, ReportLab CV generator, Vercel.

**Spec:** `public/profile.json` is the machine profile contract; the approved market decision is recorded under Global Constraints below.

## Global Constraints

- Primary market keyword: `Growth Engineer`.
- Seniority must remain explicitly `junior` on the H1, recruiter surfaces, machine profile and CV.
- SEO title must be `Growth Engineer IA & automatisation à Paris | Jonas Suhard` and remain between 50 and 60 characters.
- Human H1 must be `Growth Engineer junior · IA appliquée & automatisation`.
- Aliases must be `Product Builder IA` and `Chef de projet IA junior`.
- No unsupported experience, revenue, production-scale LLM or SQL claim may be added.
- Existing project copy, evidence levels, motion, layout, routes and design tokens remain unchanged.
- Canonicals remain route-specific; never add a root canonical inherited by every page.

---

### Task 1: Cross-Surface Positioning Contract

**Files:**
- Modify: `tests/seo.test.ts`

**Interfaces:**
- Consumes: `site` from `lib/projects.ts`, `personJsonLd()` from `lib/json-ld.ts`, public profile and LLM files.
- Produces: a regression test that fails until every identity surface agrees.

- [x] **Step 1: Write the failing positioning test**

Assert the exact SEO title, 50-60 character length, exact headline, exact aliases, `Growth Engineer junior` JSON-LD job title, and matching `profile.json`, `profile.md`, `llms.txt`, home and recruiter copy.

- [x] **Step 2: Run the focused test and verify RED**

Run: `node --import tsx --test tests/seo.test.ts`

Expected: FAIL because the current primary title is `Chef de projet IA appliquée & automatisation junior`.

- [x] **Step 3: Keep the failure message as the implementation contract**

The failure must identify a market-positioning mismatch, not a syntax or fixture error.

### Task 2: Canonical Human-Site Identity

**Files:**
- Modify: `lib/projects.ts`
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`
- Modify: `app/recruteurs/page.tsx`
- Modify: `app/a-propos/page.tsx`
- Modify: `lib/json-ld.ts`
- Modify: `lib/faq.ts`
- Modify: `lib/knowledge.ts`

**Interfaces:**
- Consumes: exact strings from Global Constraints.
- Produces: `site.title`, `site.seoTitle`, `site.headline`, and `site.roleAliases`, consumed across app and schema.

- [x] **Step 1: Add canonical identity fields to `site`**

Set `site.title` to `Growth Engineer junior`, add the exact SEO title and headline, and store both aliases in order.

- [x] **Step 2: Replace duplicated page titles with canonical fields**

Use `site.seoTitle` for root metadata, `site.headline` for primary H1/footer display, and aliases for the home and recruiter supporting line.

- [x] **Step 3: Align narrative and schema wording**

Update recruiter matrix, about copy, FAQ, knowledge explanation and `Demand.name` without changing claims or project evidence.

- [x] **Step 4: Run the focused test**

Run: `node --import tsx --test tests/seo.test.ts`

Expected: still FAIL only on public static sources not yet synchronized.

### Task 3: Machine Profile and CV Synchronization

**Files:**
- Modify: `public/profile.json`
- Modify: `public/profile.md`
- Modify: `public/llms.txt`
- Modify: `public/cv.md`
- Modify: `README.md`
- Generate: `public/claims.json`
- Generate: `public/knowledge/growth-engineer-ia.md`
- Generate: `public/cv.pdf`
- Generate: `public/cv-portfolio.pdf`

**Interfaces:**
- Consumes: canonical identity strings from `site` and `lib/faq.ts`.
- Produces: consistent recruiter, crawler, LLM and downloadable-CV surfaces.

- [x] **Step 1: Update static source documents**

Lead with `Growth Engineer junior`, keep both aliases, and preserve every evidence qualifier and availability date.

- [x] **Step 2: Regenerate derived content**

Run: `npm run prebuild`

Expected: 13 project Markdown files, five knowledge files, claims and verification generated successfully.

- [x] **Step 3: Regenerate both CV PDFs**

Run: `npm run generate:cv`

Expected: both one-page PDFs generated from `public/cv.md`.

- [x] **Step 4: Run focused SEO and content checks**

Run: `node --import tsx --test tests/seo.test.ts tests/content.test.ts`

Expected: PASS.

### Task 4: Production-Grade Verification

**Files:**
- Verify only: all changed files and generated artifacts.

**Interfaces:**
- Consumes: completed implementation.
- Produces: proof that behavior, SEO, layout and build remain valid.

- [x] **Step 1: Run repository checks**

Run: `npm run check && npm run build && git diff --check`

Expected: all tests pass and 38 static pages build successfully.

- [x] **Step 2: Verify exact SEO output locally**

Serve the production build safely and inspect `/`, `/recruteurs`, `/profile.json`, `/llms.txt` and root JSON-LD.

Expected: exact SEO title, correct H1 and aliases, valid JSON, route-specific canonical.

- [x] **Step 3: Verify responsive and accessible presentation**

Capture `/` and `/recruteurs` at 375, 768 and 1440 pixels. Confirm no overflow, clipping, text overlap, console error or reduced-motion regression.

- [x] **Step 4: Inspect CV PDFs**

Confirm both PDFs remain one page and render the new title without clipping.

### Task 5: Land and Verify Production

**Files:**
- No additional source changes unless verification finds a defect.

**Interfaces:**
- Consumes: fully verified branch.
- Produces: the exact commit on `origin/master` and the existing Vercel production project.

- [x] **Step 1: Commit the verified change**

Commit message: `fix(seo): align portfolio title with Growth Engineer market`

- [x] **Step 2: Fast-forward `master` and push without force**

Fetch first, require `origin/master` to be an ancestor, then use `--ff-only`.

- [x] **Step 3: Wait for GitHub checks and deploy the linked Vercel project**

Require `verify` and `lighthouse` success before production deployment.

- [x] **Step 4: Verify the public domain**

Check `https://jonassuhard.com`, `/recruteurs`, `/profile.json` and `/llms.txt` for the exact new identity and preserved security headers.
