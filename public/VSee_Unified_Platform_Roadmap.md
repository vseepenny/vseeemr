# VSee Unified Platform Roadmap
## From Two Products to One Cohesive Platform

**Version:** 1.0
**Date:** March 31, 2026
**Owner:** VSee Health Product & Engineering

---

## Executive Summary

VSee currently operates two distinct products: **VSee Clinic** (a mature, low-code/no-code telehealth platform with 250+ configuration points, patient scheduling, video visits, and a rich patient-facing frontend) and **VSee EMR** (a disaster-focused Electronic Medical Record system with deep clinical data management — patient records, orders, medications, allergies, problem lists, encounters — but no patient-facing frontend).

The strategic vision is to **unify these into a single cohesive platform** where VSee EMR serves as the authoritative backend for all patient medical records, and a new **configurable Digital Front Door** provides the patient-facing experience — adaptable for hospital inpatient/outpatient settings, single-mission deployments, and disaster relief operations.

This roadmap lays out a phased approach to get there.

---

## 1. Current State Analysis

### 1.1 VSee Clinic — What It Does Well

VSee Clinic is a mature SaaS telehealth platform (currently at v7.1) serving 1.5M+ video encounters monthly across 33,000+ clinics. Its key strengths:

- **Patient-Facing Frontend:** Full patient portal with self-scheduling, intake forms, video visits, health tracking, document access, and mobile apps (iOS/Android)
- **Scheduling Engine:** Multi-provider calendars, patient self-scheduling, walk-in/on-call/recurring appointments, CSR scheduling, drag-and-drop rescheduling
- **Waiting Room & Queue Management:** Real-time patient queue with auto-sorting, triage phases, patient paging, and Uber-like load distribution
- **250+ No-Code Configurations:** Every module (intake, scheduling, payments, chat, RPM, notifications) is independently toggleable and configurable per room/clinic
- **Video Engine:** Proprietary engine supporting simultaneous HD video + medical device streaming, group calls, breakout rooms, screen sharing with annotation
- **EHR Integrations:** Epic (SMART on FHIR), Cerner/Oracle Health, NextGen, HL7v2, FHIR R4
- **Dynamic Workflow System:** ReactJS microservices with Form.io integration for conditional intake, scoring, and custom workflows
- **Architecture:** Multi-tenant MongoDB, RESTful API v2/v3, migrating from KnockoutJS to ReactJS, Jitsi Meet for browser video

### 1.2 VSee EMR — What It Does Well

VSee EMR is a disaster-ready clinical records system built for ASPR, with FHIR-aligned data structures. Its key strengths:

- **Comprehensive Clinical Data Model:** FHIR-mapped collections for orders (ServiceRequest, MedicationRequest), encounters, observations, conditions, allergies, medications, immunizations, vital signs, documents, care plans
- **Deep Order Management:** Order catalogs, order entry, lab/imaging/procedure tracking with full lifecycle status
- **Encounter-Centric Design:** Triage → assessment → treatment → disposition workflow optimized for disaster and acute care
- **Multi-Site Coordination:** Site-based deployments with role management (DT Admin, EMR Admin, Medic, Provider)
- **Offline-First Capability:** Designed for low-bandwidth/no-connectivity environments; Aidan offline forms sync via API
- **Medical Device Integration:** Vital signs capture (SpO2, pulse, NIBP, temperature) auto-processed into EMR
- **FedRAMP High Authorization:** Highest government cloud security certification from HHS
- **AI Integration:** AI Virtual Scribe, AI X-ray analysis, SOAP note generation
- **Proven Deployments:** ASPR disaster telemedicine, Philippines medical missions (500+ patients/day), refugee camps, Tesla factory clinics

### 1.3 The Gap

| Capability | VSee Clinic | VSee EMR |
|---|---|---|
| Patient login/portal | ✅ Full | ❌ None |
| Self-scheduling | ✅ Full | ❌ None |
| Provider calendar/availability | ✅ Full | ❌ None |
| Video visits | ✅ Full | ✅ Via Clinic integration |
| Intake forms | ✅ Dynamic workflow | ⚠️ Basic (Aidan offline) |
| Clinical records (orders, meds, allergies) | ⚠️ Basic EMR module | ✅ Full FHIR-aligned |
| SOAP notes | ✅ With AI Scribe | ✅ With AI Scribe |
| Problem list / ICD codes | ✅ Basic | ✅ Full |
| Order management (labs, imaging, Rx) | ❌ DoseSpot only | ✅ Full catalog + lifecycle |
| Multi-site / disaster deployment | ❌ Not designed for this | ✅ Core capability |
| Offline capability | ❌ None | ✅ Core capability |
| Configurable dashboards per use case | ⚠️ Analytics only | ✅ Role-based |
| Insurance/eligibility | ✅ Full | ⚠️ Limited |
| Payments | ✅ Stripe | ❌ None |

**The core problem:** VSee Clinic has the frontend and patient engagement, VSee EMR has the clinical depth — but they're separate systems with separate data models, separate APIs, and separate deployments.

---

## 2. Target Architecture

### 2.1 Architectural Vision

```
┌─────────────────────────────────────────────────────────────┐
│                   DIGITAL FRONT DOOR                         │
│            (Configurable Patient-Facing Layer)                │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │ Patient   │  │ Self-    │  │ Intake   │  │ Video    │    │
│  │ Portal    │  │ Schedule │  │ Forms    │  │ Visits   │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │ Payments  │  │ Messaging│  │ RPM      │  │ Check-in │    │
│  │ /Insurance│  │ /Chat    │  │ Dashboard│  │ /Triage  │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
└──────────────────────────┬──────────────────────────────────┘
                           │
              ┌────────────┴────────────┐
              │   UNIFIED API GATEWAY    │
              │  (Auth, Routing, RBAC)   │
              └────────────┬────────────┘
                           │
    ┌──────────────────────┼──────────────────────┐
    │                      │                      │
┌───┴────────┐   ┌────────┴────────┐   ┌────────┴────────┐
│ VSee Clinic │   │   VSee EMR      │   │  AI Services    │
│ Services    │   │   (Backend DB)  │   │                 │
│             │   │                 │   │ - AI Sidebar    │
│ - Scheduling│   │ - Patient       │   │ - Virtual Scribe│
│ - Video     │   │   Records       │   │ - SOAP Gen      │
│ - Queue     │   │ - Orders        │   │ - CDS           │
│ - Payments  │   │ - Encounters    │   │                 │
│ - Chat/SMS  │   │ - Medications   │   │                 │
│ - RPM       │   │ - Lab Results   │   │                 │
│ - Analytics │   │ - Documents     │   │                 │
│ - Webhooks  │   │ - Care Plans    │   │                 │
└─────────────┘   └─────────────────┘   └─────────────────┘
```

### 2.2 Key Architectural Principles

1. **EMR as Source of Truth:** All patient medical records (demographics, encounters, orders, medications, allergies, conditions, documents) live in VSee EMR's FHIR-aligned database. VSee Clinic's basic EMR module becomes a read/write proxy to the EMR backend.

2. **Digital Front Door as Configurable Shell:** The patient-facing experience is a configurable layer that can be themed, feature-toggled, and workflow-customized per deployment type (hospital, clinic, mission, disaster).

3. **Deployment Profiles:** Pre-built configuration bundles for common deployment scenarios — "Hospital Outpatient," "Hospital Inpatient," "Disaster Relief Mission," "Single Clinic," "Field Deployment" — each with appropriate defaults for dashboard layout, workflow steps, required modules, and UI theme.

4. **API-First Integration:** A unified API gateway routes requests to the appropriate backend service (Clinic for scheduling/video/payments, EMR for clinical data, AI for intelligence). External systems integrate through this single gateway.

5. **Progressive Enhancement:** In connectivity-limited environments (disaster, field), the system degrades gracefully — offline-first data capture syncs when connectivity returns, with the Digital Front Door adapting its UI to show only available capabilities.

---

## 3. Phased Roadmap

### Phase 1: Foundation — Unified Data Layer (Q2–Q3 2026)
*"Make the two backends talk to each other"*

**Goal:** Establish VSee EMR as the authoritative patient record store, with VSee Clinic reading/writing clinical data through EMR APIs rather than its own MongoDB collections.

#### Action Items

**1.1 Unified Patient Identity**
- Design and implement a shared patient identity service that maps VSee Clinic user records to VSee EMR patient records
- Implement bidirectional sync: when a patient registers via Clinic, a corresponding EMR patient record is created (and vice versa)
- Use FHIR Patient resource as the canonical schema; Clinic stores a reference ID pointing to the EMR record
- Handle edge cases: existing Clinic patients without EMR records, EMR patients from disaster deployments without Clinic accounts

**1.2 EMR API Standardization**
- Audit the existing VSee EMR API surface (documented in ASPR EMR Workflows confluence page) and formalize it into a versioned, documented REST API
- Align EMR API patterns with the existing Clinic API v3 conventions (auth tokens, error formats, pagination)
- Ensure all EMR collections have CRUD endpoints: `emr_orders`, `emr_order_catalogs`, `emr_encounters`, `emr_observations`, `emr_conditions`, `emr_allergies`, `emr_medications`, `emr_immunizations`, `emr_documents`, `emr_care_plans`
- Add FHIR R4 endpoints alongside the native JSON API (leveraging the existing FHIR mapping documented in your confluence)

**1.3 Clinic → EMR Data Bridge**
- Build an adapter layer in VSee Clinic that redirects clinical data reads/writes to the EMR backend
- Clinic's EMR module (conditions, allergies, medications, SOAP notes) should read from and write to EMR rather than its own MongoDB
- This is a backend change — no UI changes yet. The Clinic provider dashboard continues to look the same but is now backed by EMR data
- Implement data migration tooling for existing Clinic-only customers who have clinical data in Clinic's MongoDB

**1.4 Unified API Gateway**
- Stand up an API gateway (e.g., Kong, AWS API Gateway) that routes requests to Clinic or EMR services based on the resource path
- Implement unified authentication: a single JWT/OAuth token works across both Clinic and EMR APIs
- Add RBAC layer that respects both Clinic roles (Patient/Provider/CSR/Admin) and EMR roles (DT Admin/EMR Admin/Medic/Provider)

**Milestone:** A provider using VSee Clinic can view and edit patient records that are stored in VSee EMR, without knowing or caring which backend stores what.

---

### Phase 2: Digital Front Door — Patient Experience (Q3–Q4 2026)
*"Give EMR patients a front door"*

**Goal:** Build a configurable patient-facing application that works with VSee EMR as its backend, borrowing and extending patterns from VSee Clinic's patient portal.

#### Action Items

**2.1 Patient Portal for EMR**
- Build a patient-facing web application (React 19 + TypeScript, consistent with the EMR codebase already in your repo and the AI Sidebar architecture)
- Core features for v1: patient login/registration, view upcoming appointments, view medical records (conditions, medications, allergies, lab results), view visit history, secure messaging
- Use the unified API gateway from Phase 1 — the portal doesn't need to know whether data comes from Clinic or EMR
- Design the portal as a **configurable shell** from day one: feature flags control which modules are visible, theme tokens control branding, deployment config controls workflow

**2.2 Provider Calendar & Availability**
- Extend the EMR to include provider scheduling data (availability slots, appointment types, location/room assignments)
- Option A: Build scheduling natively in EMR (significant effort, duplicates Clinic capability)
- **Option B (Recommended):** Use VSee Clinic's scheduling engine as a shared service. The EMR's Digital Front Door calls Clinic scheduling APIs through the unified gateway. This leverages the mature scheduling engine (drag-and-drop, on-call, recurring, multi-provider, CSR support) without rebuilding it
- Build the patient self-scheduling UI in the Digital Front Door, calling the shared scheduling service
- Provider-side: embed a calendar management view in the EMR dashboard (can be an iframe of the Clinic calendar component, or a new React component calling the same scheduling APIs)

**2.3 Appointment & Check-in Flow**
- Design configurable check-in workflows using the Dynamic Workflow system (Form.io-based, already built in Clinic)
- For hospital deployments: patient checks in → insurance verification → intake forms → waiting room assignment → provider notification
- For disaster/mission deployments: patient arrives → triage assessment → vital signs capture → provider assignment → encounter creation
- For outpatient clinic: patient self-schedules → reminder notifications → online check-in → intake forms → video or in-person visit
- Each workflow is a JSON configuration, not code — enabling no-code customization

**2.4 Deployment Profiles**
- Create pre-built deployment profile configs:

| Profile | Dashboard | Scheduling | Check-in | Key Modules |
|---|---|---|---|---|
| **Hospital Outpatient** | Provider schedule + patient queue | Full calendar, self-scheduling | Insurance → intake → waiting room | Eligibility, payments, referrals |
| **Hospital Inpatient** | Census board, bed management | Provider-initiated | Admission → assessment → orders | Orders, medications, nursing notes |
| **Disaster Relief** | Triage dashboard, patient volume | Walk-in only, field assignment | Triage → vitals → rapid assessment | Offline forms, mass casualty, supplies |
| **Single Mission** | Mission stats, patient log | Walk-in + pre-registered | Registration → screening → consult | Offline sync, medical devices, reporting |
| **Outpatient Clinic** | Today's appointments + queue | Full calendar | Self-check-in → intake → visit | Scheduling, payments, RPM, chat |

**Milestone:** A disaster relief deployment can spin up with the "Disaster Relief" profile and have a patient-facing triage flow, while a hospital can spin up with "Hospital Outpatient" and have insurance verification and self-scheduling — all from the same codebase.

---

### Phase 3: Deep Integration — Shared Services (Q1–Q2 2027)
*"Make every module work everywhere"*

**Goal:** Ensure all the powerful modules from both products are available as shared services that any deployment profile can enable.

#### Action Items

**3.1 Shared Video Visit Service**
- Abstract the video visit capability into a standalone service that both Clinic and EMR Digital Front Door can invoke
- Video visits should automatically create/update EMR encounters
- Medical device streaming (already proprietary to VSee) should pipe vitals data directly into EMR observation records
- Support for disaster-scenario video: low-bandwidth optimization, satellite connectivity, store-and-forward when connection drops

**3.2 Shared Messaging & Notifications**
- Unify the chat/messaging system: patient ↔ provider chat, provider ↔ provider chat, bulk SMS dispatch, push notifications
- Notifications should be context-aware: a disaster deployment sends SMS alerts about triage status, a hospital sends appointment reminders
- Leverage the existing Twilio SMS integration and push notification infrastructure

**3.3 Shared Payments & Insurance**
- Make the payments module (Stripe) and insurance eligibility module available to EMR deployments
- For disaster/mission deployments, these modules are simply toggled off
- For hospital deployments, integrate with the HL7 DFT (financial transaction) messages already documented in your HL7 interfaces page

**3.4 Shared RPM & Device Integration**
- Extend RPM from Clinic into the EMR context: RPM readings flow directly into EMR observation records
- The RPM health dashboard becomes available in the Digital Front Door for chronic care patients
- Medical device data from disaster kits (SpO2, BP, temp, EKG) auto-populates EMR vitals via the same pipeline

**3.5 Shared Analytics & Reporting**
- Build a unified analytics layer that can query both Clinic operational data (visit counts, wait times, payments) and EMR clinical data (encounter volumes, diagnosis distribution, order completion rates)
- Deployment-profile-specific dashboards: disaster deployments see patient throughput and supply usage; hospitals see revenue cycle and quality metrics

**3.6 AI Services Integration**
- Deploy the AI Clinical Assistant Sidebar (already architecturally designed — Phase 0 spec in your Confluence) across all deployment types
- The sidebar's context bridge (`window.VSeeAI.setContext()`) works with both Clinic and EMR page contexts
- AI capabilities adapt per deployment: hospitals get SOAP drafts + ICD suggestions + drug interaction checks; disaster deployments get triage assistance + treatment protocol suggestions
- Leverage the multi-source data layer architecture (adapters for VSee APIs + MCP servers + FHIR/HIE) documented in the AI Sidebar architecture

**Milestone:** Every "building block" module (video, scheduling, payments, RPM, messaging, analytics, AI) is available as a shared service. A new deployment just selects which blocks to enable.

---

### Phase 4: Platform Maturity — Self-Service & Scale (Q3 2027+)
*"Let customers configure everything themselves"*

**Goal:** Achieve the long-stated vision of a fully self-service, low-code/no-code platform where customers can stand up new deployments and customize workflows without engineering involvement.

#### Action Items

**4.1 No-Code Deployment Configurator**
- Build an admin interface where a customer/admin can create a new deployment by selecting a profile (hospital, clinic, disaster, mission), toggling modules on/off, customizing branding, and configuring workflows — all without code
- Extend the existing 250+ Clinic configuration points to cover EMR-specific settings (order catalogs, assessment templates, triage protocols, disposition options)

**4.2 Workflow Builder**
- Evolve the Dynamic Workflow system into a visual drag-and-drop builder
- Admin users can create custom patient flows: registration → screening → consult → follow-up, with conditional branching based on assessment scores, triage levels, or insurance status
- Publish the Low-Code Workflow Builder (referenced in your Confluence ref [46]) as a generally available feature

**4.3 Marketplace & Templates**
- Create a template marketplace where deployment profiles, intake form templates, order catalog templates, and workflow templates can be shared across organizations
- Pre-built templates for common use cases: TB screening mission, mental health outpatient, ER diversion, chronic care management, post-disaster recovery

**4.4 FHIR-Native Interoperability**
- Full FHIR R4 server implementation on the unified platform, enabling bidirectional data exchange with any FHIR-compliant system
- Support for SMART on FHIR app launch from both the provider and patient portals
- Integration with Health Information Exchanges (HIEs) for cross-organization patient record access
- Compliance with ONC Health IT Certification requirements

**4.5 Multi-Tenant Enterprise Management**
- Enterprise dashboard for organizations managing multiple deployment instances (e.g., a hospital system with 20 locations, or an NGO running missions across 5 countries)
- Centralized user management, cross-deployment analytics, and shared configuration templates
- Support for the organizational hierarchy: enterprise → organization → site → department/room

**Milestone:** A new hospital system customer can self-provision a multi-site deployment with customized workflows, branding, and integrations — going live in days rather than weeks.

---

## 4. Technical Architecture Decisions

### 4.1 Frontend Technology

The EMR codebase (in your repo) is already React 19 + TypeScript + Vite — consistent with the AI Sidebar architecture spec. VSee Clinic's frontend is migrating from KnockoutJS to ReactJS. **Recommendation:** accelerate the React migration for Clinic and align both products on the same frontend stack:

- **React 19 + TypeScript strict** (already in use for EMR and specified for AI Sidebar)
- **Vite** for build tooling (already in EMR)
- **Tailwind CSS** for styling (specified in AI Sidebar architecture)
- **shadcn/ui + Radix** for accessible component primitives (specified in AI Sidebar architecture)

This means the Digital Front Door, the EMR provider interface, and the AI Sidebar all share the same component library and design system.

### 4.2 Backend Architecture

- **VSee EMR database:** Continue with the FHIR-aligned MongoDB collections. This becomes the canonical patient record store.
- **VSee Clinic backend:** Continue with the existing CakePHP + MongoDB stack for scheduling, video, payments, and operational features. Gradually decompose into microservices as capacity allows.
- **Unified API Gateway:** Sits in front of both backends. Handles auth, routing, rate limiting, and RBAC. All new frontend work goes through this gateway.
- **Event Bus:** Implement an event-driven architecture (e.g., Kafka, AWS EventBridge) for cross-service communication. When a Clinic visit ends, it emits an event that the EMR service picks up to finalize the encounter record.

### 4.3 Data Synchronization Strategy

Rather than a big-bang data migration, use an **event-sourced synchronization** approach:

1. **Phase 1:** Write-through — Clinic writes clinical data to both its own MongoDB and the EMR backend. EMR is the source of truth for reads.
2. **Phase 2:** Read-redirect — Clinic reads clinical data from EMR backend. Clinic's own clinical data collections become write-only audit logs.
3. **Phase 3:** Deprecate — Clinic's clinical data collections are frozen. All clinical reads and writes go through EMR.

### 4.4 Offline-First Architecture

For disaster and field deployments, the Digital Front Door needs offline capability:

- **Service Worker** for caching the application shell and static assets
- **IndexedDB** for local data storage with a sync queue
- **Conflict resolution** strategy: last-write-wins for simple fields, merge for complex objects (medications, orders), manual review for conflicts
- **Sync protocol:** when connectivity returns, queue replays in order with server-side idempotency (leveraging the existing Aidan offline form pattern)

---

## 5. Migration Strategy for Existing Customers

### 5.1 VSee Clinic-Only Customers

These customers (33,000+ clinics) continue using VSee Clinic as-is. Behind the scenes, their clinical data gradually migrates to the EMR backend (Phase 1). They see no UI changes — just improved clinical data capabilities over time (deeper records, order management, FHIR interoperability).

### 5.2 VSee EMR-Only Customers (ASPR, Philippines, etc.)

These customers gain the Digital Front Door (Phase 2), giving their patients self-service capabilities for the first time. Migration path: deploy the Digital Front Door pointing at their existing EMR backend, configure a deployment profile, enable the modules they need.

### 5.3 New Customers

New customers get the unified platform from day one. They choose a deployment profile, configure their modules, and go live with both the patient-facing Digital Front Door and the full EMR backend.

---

## 6. Success Metrics

| Metric | Phase 1 | Phase 2 | Phase 3 | Phase 4 |
|---|---|---|---|---|
| **Data Unification** | 100% of clinical data flows through EMR | — | — | — |
| **Patient Portal Coverage** | — | EMR deployments have patient portal | All deployments use unified portal | — |
| **Deployment Profiles** | — | 3 profiles available | 5 profiles, customizable | Self-service configurator |
| **Time to Deploy** | — | 1 week (engineering-assisted) | 2-3 days (semi-automated) | < 1 day (self-service) |
| **Module Reuse** | 2 shared services | 5 shared services | All modules shared | Marketplace |
| **API Coverage** | Unified auth + patient identity | Scheduling + portal APIs | Full unified API | FHIR R4 server |

---

## 7. Key Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| **Data migration breaks existing Clinic customers** | High | Write-through strategy (Phase 1) ensures Clinic always has its own copy; EMR is additive, not replacement |
| **Scope creep on Digital Front Door** | Medium | Deployment profiles constrain scope — build the configurable shell first, then add modules incrementally |
| **Two backend stacks (CakePHP + Node/React) increase complexity** | Medium | Unified API gateway abstracts this; gradual migration rather than rewrite |
| **Offline sync conflicts in disaster scenarios** | High | Leverage existing Aidan offline pattern; implement robust conflict resolution with manual review option |
| **AI Sidebar integration delays** | Low | AI Sidebar Phase 0 infrastructure is already designed and independent of the unification work |
| **Customer resistance to change** | Medium | Existing Clinic customers see zero UI changes in Phase 1; new capabilities are additive |

---

## 8. Immediate Next Steps (Next 30 Days)

1. **Architecture Review:** Present this roadmap to engineering leads for feasibility review. Identify technical risks and dependencies not covered here.

2. **Patient Identity Design:** Start detailed technical design for the unified patient identity service (Action Item 1.1). This is the critical path item — everything else depends on it.

3. **EMR API Audit:** Document the current EMR API surface completely. Identify gaps between what exists and what the unified gateway needs.

4. **Clinic React Migration Assessment:** Assess the current state of the KnockoutJS → React migration in Clinic. Determine which Clinic components can be reused in the Digital Front Door vs. which need to be rebuilt.

5. **Deployment Profile Workshop:** Run a workshop with product, engineering, and key customers (ASPR, Tampa General, Philippines team) to validate the deployment profiles and their default configurations.

6. **AI Sidebar Phase 0 Kickoff:** Begin implementation of the AI Sidebar infrastructure (already fully specified in Confluence) — this work is independent and can proceed in parallel.

---

## Appendix A: Confluence References

- [ASPR EMR Workflows & Database Structure](https://vsee.atlassian.net/wiki/spaces/OF/pages/1380450313)
- [VSee Clinic - Product Features](https://vsee.atlassian.net/wiki/spaces/VC/pages/1899724809)
- [VSee Overview](https://vsee.atlassian.net/wiki/spaces/GC/pages/226656308)
- [VSee Patient's Data Exchange](https://vsee.atlassian.net/wiki/spaces/VC/pages/1708720133)
- [VSee AI Clinical Assistant – Sidebar Architecture](https://vsee.atlassian.net/wiki/spaces/ai/pages/1889533955)
- [VSee Clinic API](https://vsee.atlassian.net/wiki/spaces/VD/pages/8913772)
- [VSee HL7 Interfaces](https://vsee.atlassian.net/wiki/spaces/VC/pages/1559724036)
- [VSee EMR Philippines](https://vsee.atlassian.net/wiki/spaces/CT/pages/1608810499)
- [VSee EMR Actual Use Cases](https://vsee.atlassian.net/wiki/spaces/CT/pages/1529446401)
- [Patient Side Integration](https://vsee.atlassian.net/wiki/spaces/VD/pages/403997153)
- [TGH (Tampa General Hospital)](https://vsee.atlassian.net/wiki/spaces/CT/pages/768802831)

## Appendix B: Current EMR Codebase (vseeemr repo)

The existing EMR frontend codebase is a React 19 + TypeScript + Vite application with:
- 6 pages: Dashboard, Patients, Encounter, Schedule, Health (RPM)
- 8 encounter tabs: Notes (SOAP), Intake, Visits, Problem List, Medical History, Allergies, Medications, Documents
- AI integration: AI banner + AI panel for SOAP note generation
- Deployed on GitHub Pages via GitHub Actions
- Strong TypeScript interfaces for Patient, Visit, SOAPNote, Medication, Allergy, Problem, VitalSigns

This codebase is the starting point for Phase 2's Digital Front Door patient portal.
