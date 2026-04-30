# VSee Unified Healthcare Platform — Build Summary & Design Rationale

## The Problem

VSee has two separate products: **VSee Clinic** (a telehealth SaaS platform for outpatient/virtual care) and **VSee EMR** (an EMR built for disaster response and field operations). The challenge is merging these into a **single, unified healthcare platform** that can serve wildly different deployment contexts — from a solo provider doing telehealth, all the way up to a multi-facility health system or a disaster-relief field hospital — without building separate apps for each.

The core tension: a solo provider needs a simple, focused interface with maybe 10 features. A hospital needs 30+. A disaster field team needs an entirely different set of modules (supply chain, dispatch, offline sync). A patient portal is different from all of them. How do you ship one platform that serves all these without overwhelming anyone?

---

## The Solution: Configuration-Driven Architecture

Rather than building separate apps or even separate front-ends, the approach is a **3-layer configuration engine** that controls what each deployment looks like:

### Layer 1 — Module Registry (the "what exists")

A single catalog of **39 modules** — every feature the platform can offer. Each module has an ID, label, icon, category, and description. The modules span six categories:

- **Scheduling & Visits** (6): Today's Schedule, Waiting Room, Video Visits, Walk-in Queue, Appointments, Checkout Queue
- **Clinical** (10): Patient Charts, Orders & Rx, Referrals, RPM Dashboard, Vitals Monitor, Medications, MAR, e-Prescribe, Lab Results, Health Records, Care Plan
- **Inpatient** (4): Bed Management, Clinical Alerts, Discharge Planning, Shift Handoff
- **Communication** (5): VSee Messenger, Video Call, Team Channels, Broadcast, Command Center
- **Field Operations** (6): Patient Registration, Supply Chain, Team Roster, Sync Status, Dispatch, X-Ray/Imaging, Data Export
- **Tools & Admin** (5): AI Scribe, Forms, Analytics, Billing, Settings

The thought process: rather than thinking in terms of "apps," think in terms of **capabilities**. Every healthcare deployment is just a different combination of the same underlying capabilities.

### Layer 2 — Deployment Presets (the "what's turned on")

Seven preset configurations define which modules are **ON**, **Optional (OPT)**, or **OFF** for each type of deployment:

| Preset | Target Audience | Typical ON Modules | Color |
|--------|----------------|-------------------|-------|
| **Solo Provider** | Single practitioner | ~18 core clinical + telehealth | #10B981 (green) |
| **Small Practice** | 2-10 provider group | ~20 with checkout, RPM | #7C3AED (purple) |
| **Multi-Specialty Clinic** | Large outpatient, FQHC | ~28 with walk-ins, referrals | #7C3AED (purple) |
| **Hospital** | Single-facility inpatient + outpatient | ~33 with bed mgmt, MAR, alerts | #3B82F6 (blue) |
| **Health System** | Multi-facility enterprise | ~37 (nearly everything) | #1D4ED8 (dark blue) |
| **Field Ops** | Disaster relief, mobile medical | ~28 with supply, dispatch, sync | #F97316 (orange) |
| **Patient Portal** | Patient-facing self-service | ~11 patient-relevant modules | #0D875C (teal) |

The thought process: the ON/OPT/OFF model means you don't just get "on" or "off" — you get a meaningful middle ground. A solo provider might never need Bed Management (OFF), always need Messenger (ON), and might optionally enable RPM if they do chronic care management (OPT). This three-state model lets implementation teams customize without starting from scratch.

### Layer 3 — Role Views (the "who sees what")

Even within a single deployment, different users need different views. A nurse at a hospital doesn't need billing. An admin doesn't need clinical alerts. Four preset roles define per-deployment visibility:

- **Provider** (Physician, NP, PA): Clinical decision-maker view — charts, orders, vitals, scribe. Not relevant in patient portal (null).
- **Nurse** (RN, LPN, MA): Clinical support — similar to provider but without billing/analytics, adds forms and MAR.
- **Admin / Front Desk** (Office manager, receptionist): Operations view — scheduling, checkout, billing, analytics, messaging. No clinical modules.
- **Patient**: Only applies to the Patient Portal preset — sees all patient-facing modules.

Plus **custom role creation**: the configurator allows creating additional roles with hand-picked module visibility, initialized from the preset's enabled modules.

The thought process: this is the key insight that makes the platform actually usable. Turning on 33 modules for a hospital deployment doesn't mean every user sees 33 sidebar items. The nurse sees their 18. The admin sees their 14. The provider sees their 22. Same deployment, different experience — all driven by config, not code.

---

## What Was Built

### 1. Master Configuration File (`vsee-platform-config.js`) — ~950 lines

The single source of truth. Everything else reads from this file. It contains:

- `MODULE_REGISTRY` — all 39 modules with metadata
- `DEPLOYMENT_PRESETS` — 7 presets, each with a full module ON/OFF/OPT map plus display metadata (color, icon, header titles, facility name)
- `SIDEBAR_SECTIONS` — per-preset sidebar groupings (which modules go under which section labels, and in what order)
- `MODULE_CATEGORIES` — 6 categories for the config UI
- `DASHBOARD_CARDS` — per-preset stat cards with realistic sample data (e.g., hospital shows Census: 142, 84% occupancy)
- `ROLE_PRESETS` — 4 roles with per-preset visibility arrays
- `ICON_SVG` — 44 Feather-style SVG icon paths
- `getVisibleModules(presetId, roleId)` — intersection function that returns which modules a role can see in a given preset
- `buildSidebarHTML(presetId, viewIdMap, defaultViewId, badgeCounts)` — the key function that generates sidebar HTML dynamically from config

The design decision to put everything in one JS file (instead of, say, a JSON file + separate renderer) was deliberate: the front doors need to load this at runtime and call `buildSidebarHTML()` directly. A single `<script src>` include keeps it simple. The file is structured with clear section dividers so it reads like a spec document.

### 2. Interactive Configurator (`frontdoor-configurator.html`) — ~1,200 lines

A 3-panel interactive demo that lets users explore the configuration system:

**Left panel (260px, split):**
- Top half: 7 deployment preset cards with color-coded left borders. Click to switch presets.
- Bottom half: 4 role cards (Provider, Nurse, Admin, Patient) plus a "+ Add Custom Role" button. Roles that don't apply to the current preset show as grayed out with "N/A" label.

**Center column (240px):**
- Horizontal role tab bar (dark background, #0F172A) sits above the sidebar preview. Shows "All Modules" plus applicable roles. Active tab is highlighted.
- Below the tabs: a live sidebar preview that exactly mirrors what the actual front door would show. SVG icons, section groupings, badges — all rendered from the shared config.

**Right panel (flexible):**
- Dashboard cards section showing realistic stat cards for the selected preset
- Module configuration section with toggle switches grouped by category. Each module shows ON/OPT/OFF state. Toggling a module updates the sidebar preview in real-time.
- When a custom role is selected, the right panel also shows module visibility checkboxes.

The thought process behind the UI evolution: the role picker was originally just a section below the module config on the right side. But that buried it — the user pointed out it was too far down. We tried two UI patterns simultaneously: (1) a horizontal tab bar above the sidebar, and (2) a split left panel with roles in the bottom half. Both work together — clicking a role card in the left panel updates the tab bar, and vice versa. The tab bar gives quick switching; the role cards give descriptive context.

### 3. Four Refactored Front Doors

Each front door was converted from a hardcoded sidebar to a **config-driven dynamic sidebar**:

**Clinic (`frontdoor-clinic.html`)** — Small Practice preset, purple accent (#7C3AED)
- 16 mapped modules with view IDs
- Sidebar built dynamically via `buildSidebarHTML('small-practice', viewIdMap, 'dashboard-view', badgeCounts)`

**Hospital (`frontdoor-hospital.html`)** — Hospital preset, blue accent (#3B82F6)
- 14 mapped modules (Operations, Clinical, Communication, Tools sections)
- Includes inpatient modules: Bed Management, Clinical Alerts, Discharge, Shift Handoff

**Field Ops (`frontdoor-fieldops.html`)** — Field Ops preset, orange accent (#F97316)
- 16 mapped modules including Triage, Logistics, and Field Operations sections
- Modules like Supply Chain, Team Roster, Sync Status, Dispatch

**Patient Portal (`frontdoor-patient.html`)** — Patient Portal preset, teal accent (#0D875C)
- 10 mapped modules, patient-facing language (My Health, Care, Account sections)

Each front door provides a `viewIdMap` that maps module IDs to the actual view element IDs in its HTML (since different front doors use different naming conventions — some use `-view` suffix, some don't). The config runtime at the bottom of each file loads the shared config and calls `buildSidebarHTML()`.

The key design decision: only modules that have actual HTML view elements in the file get mapped. Earlier iterations mapped all preset modules, but clicking a sidebar item that had no corresponding view was a dead click. We audited every front door and stripped the viewIdMap down to only what's actually implemented.

### 4. Deployment Preset Matrix Spreadsheet (`VSee_Deployment_Preset_Matrix.xlsx`)

A two-sheet Excel workbook:
- **Sheet 1**: Full 39×7 matrix — every module vs. every preset, color-coded cells (green=ON, yellow=OPT, red=OFF)
- **Sheet 2**: Summary with module counts per preset and category breakdowns

### 5. Updated Architecture Diagram (`VSee_Platform_Architecture.html`)

A multi-page interactive HTML document. Page 1 was updated to reflect the 3-layer model with:
- Config Engine badge
- Module Registry visualization
- 7 Deployment Preset pills with color dots
- Role Views layer
- API Layer connecting to 6 backend service blocks

### 6. Supporting Files

- **`frontdoor-messenger.html`** — Standalone messenger app with Configurator added to top nav
- **`frontdoor-shared.css`** — Shared CSS for consistent styling across all front doors
- All front doors have a consistent dark top nav bar (#1a1a2e) with links to each other and the Configurator

---

## Architecture Decision Log

### Why a single config file, not a database?

At this stage, the configuration system is a **demo and design artifact**, not a production backend. A JS file that exports constants is the simplest thing that works: front doors can `<script src>` it, the configurator can import it, and it's human-readable. If this moves to production, the config would likely become a REST API backed by a database — but the shape of the data wouldn't change.

### Why `buildSidebarHTML()` instead of a framework?

The front doors are standalone HTML files, not a React/Vue app. They use vanilla JS with a `showView('viewId')` pattern for toggling content areas. A framework would add build complexity without benefit at this stage. `buildSidebarHTML()` returns an HTML string that gets dropped into `sidebar-container.innerHTML`. Simple, debuggable, no build step.

### Why ON/OPT/OFF instead of just ON/OFF?

Real healthcare implementations need nuance. A hospital *might* want to enable Command Center for large-scale events, but it's not a default. An FQHC *might* want X-Ray integration. The OPT state lets implementation teams see what's available without cluttering the default experience.

### Why per-preset sidebar sections instead of a universal sidebar order?

A hospital groups features by Operations → Clinical → Communication → Tools. A field ops team groups by Triage → Clinical → Logistics → Communication → Tools. A patient portal groups by My Health → Care → Communicate → Account. The sidebar section groupings are fundamentally different because the mental models are different. A nurse in a field hospital thinks "triage first" — a nurse in a clinic thinks "schedule first."

### Why role visibility uses intersection, not override?

`getVisibleModules()` returns the intersection of what the preset enables and what the role allows. This means a role can never see a module that the deployment hasn't turned on. If the Hospital preset has Dispatch=OFF, even if someone accidentally puts "dispatch" in the admin role's visibility list for hospitals, it won't show. The preset is the ceiling; the role is the filter.

---

## File Inventory

| File | Size | Purpose |
|------|------|---------|
| `vsee-platform-config.js` | 47 KB | Master configuration — all 3 layers |
| `frontdoor-configurator.html` | 44 KB | Interactive config explorer with role views |
| `frontdoor-clinic.html` | 88 KB | Small Practice front door (demo) |
| `frontdoor-hospital.html` | 103 KB | Hospital front door (demo) |
| `frontdoor-fieldops.html` | 107 KB | Field Ops front door (demo) |
| `frontdoor-patient.html` | 104 KB | Patient Portal front door (demo) |
| `frontdoor-messenger.html` | 29 KB | Standalone Messenger app |
| `VSee_Platform_Architecture.html` | 120 KB | Multi-page architecture diagram |
| `VSee_Deployment_Preset_Matrix.xlsx` | 10 KB | Module × Preset matrix spreadsheet |
| `VSee_FrontDoor_Module_Matrix.xlsx` | 13 KB | Front door module mapping matrix |
