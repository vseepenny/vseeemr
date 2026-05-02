/**
 * VSee Platform — Configuration-Driven Deployment System
 *
 * 3-Layer Architecture:
 *   Layer 1: Module Registry — every feature the platform can offer
 *   Layer 2: Deployment Presets — which modules are ON/OFF/Optional per deployment type
 *   Layer 3: Role Views — how modules surface in the UI per user role
 */

// ═══════════════════════════════════════════════════════════════
// LAYER 1 — MODULE REGISTRY
// ═══════════════════════════════════════════════════════════════

const MODULE_REGISTRY = {

  // ── Scheduling & Visits ──────────────────────────────────────
  "scheduling": {
    id: "scheduling",
    label: "Today's Schedule",
    icon: "calendar",
    category: "scheduling",
    description: "Daily appointment calendar with provider view"
  },
  "waiting-room": {
    id: "waiting-room",
    label: "Waiting Room",
    icon: "users",
    category: "scheduling",
    description: "Virtual waiting room for queued patients"
  },
  "video-visits": {
    id: "video-visits",
    label: "Video Visits",
    icon: "video",
    category: "scheduling",
    description: "Telehealth video consultation sessions"
  },
  "walk-in-queue": {
    id: "walk-in-queue",
    label: "Walk-in Queue",
    icon: "user-plus",
    category: "scheduling",
    description: "Walk-in triage and queue management"
  },
  "appointments": {
    id: "appointments",
    label: "Appointments",
    icon: "calendar-check",
    category: "scheduling",
    description: "Patient appointment booking and management"
  },
  "checkout": {
    id: "checkout",
    label: "Checkout Queue",
    icon: "check-circle",
    category: "scheduling",
    description: "Post-visit checkout and follow-up scheduling"
  },

  // ── Clinical ─────────────────────────────────────────────────
  "charts": {
    id: "charts",
    label: "Patient Charts",
    icon: "file-text",
    category: "clinical",
    description: "Electronic health records and chart review"
  },
  "orders": {
    id: "orders",
    label: "Orders & Rx",
    icon: "clipboard",
    category: "clinical",
    description: "Lab orders, imaging orders, prescriptions"
  },
  "referrals": {
    id: "referrals",
    label: "Referrals",
    icon: "share",
    category: "clinical",
    description: "Specialist referral management"
  },
  "rpm": {
    id: "rpm",
    label: "RPM Dashboard",
    icon: "activity",
    category: "clinical",
    description: "Remote patient monitoring with device data"
  },
  "vitals": {
    id: "vitals",
    label: "Vitals Monitor",
    icon: "heart",
    category: "clinical",
    description: "Real-time patient vital signs tracking"
  },
  "medications": {
    id: "medications",
    label: "Medications",
    icon: "pill",
    category: "clinical",
    description: "Medication list and management"
  },
  "mar": {
    id: "mar",
    label: "MAR",
    icon: "grid",
    category: "clinical",
    description: "Medication Administration Record"
  },
  "erx": {
    id: "erx",
    label: "e-Prescribe",
    icon: "send",
    category: "clinical",
    description: "Electronic prescribing with pharmacy integration"
  },
  "results": {
    id: "results",
    label: "Lab Results",
    icon: "bar-chart-2",
    category: "clinical",
    description: "Lab and test result viewing"
  },
  "records": {
    id: "records",
    label: "Health Records",
    icon: "folder",
    category: "clinical",
    description: "Complete health record document repository"
  },
  "careplan": {
    id: "careplan",
    label: "Care Plan",
    icon: "target",
    category: "clinical",
    description: "Treatment care plans with goals and tasks"
  },

  // ── Inpatient ────────────────────────────────────────────────
  "bed-mgmt": {
    id: "bed-mgmt",
    label: "Bed Management",
    icon: "layout",
    category: "inpatient",
    description: "Bed census, assignments, and floor maps"
  },
  "alerts": {
    id: "alerts",
    label: "Clinical Alerts",
    icon: "alert-triangle",
    category: "inpatient",
    description: "Critical alerts, sepsis warnings, falls risk"
  },
  "discharge": {
    id: "discharge",
    label: "Discharge Planning",
    icon: "log-out",
    category: "inpatient",
    description: "Discharge readiness tracking and planning"
  },
  "handoff": {
    id: "handoff",
    label: "Shift Handoff",
    icon: "repeat",
    category: "inpatient",
    description: "SBAR-based shift handoff documentation"
  },

  // ── Communication ────────────────────────────────────────────
  "messenger": {
    id: "messenger",
    label: "VSee Messenger",
    icon: "message-circle",
    category: "communication",
    description: "Secure messaging with patients and care team"
  },
  "video-call": {
    id: "video-call",
    label: "Video Call",
    icon: "video",
    category: "communication",
    description: "Quick video calls with care team or patients"
  },
  "channels": {
    id: "channels",
    label: "Team Channels",
    icon: "hash",
    category: "communication",
    description: "Group channels for departments and teams"
  },
  "broadcast": {
    id: "broadcast",
    label: "Broadcast",
    icon: "radio",
    category: "communication",
    description: "Mass communication and emergency alerts"
  },
  "command": {
    id: "command",
    label: "Command Center",
    icon: "monitor",
    category: "communication",
    description: "Operations command and coordination center"
  },

  // ── Field Operations ─────────────────────────────────────────
  "register": {
    id: "register",
    label: "Patient Registration",
    icon: "user-plus",
    category: "field-ops",
    description: "Rapid patient registration with offline support"
  },
  "supply": {
    id: "supply",
    label: "Supply Chain",
    icon: "package",
    category: "field-ops",
    description: "Medical supply tracking and reorder alerts"
  },
  "roster": {
    id: "roster",
    label: "Team Roster",
    icon: "users",
    category: "field-ops",
    description: "Staff roster and skill tracking"
  },
  "sync": {
    id: "sync",
    label: "Sync Status",
    icon: "refresh-cw",
    category: "field-ops",
    description: "Offline/online data synchronization status"
  },
  "dispatch": {
    id: "dispatch",
    label: "Dispatch",
    icon: "map-pin",
    category: "field-ops",
    description: "Team dispatch and GPS coordination"
  },
  "xray": {
    id: "xray",
    label: "X-Ray / Imaging",
    icon: "image",
    category: "field-ops",
    description: "Portable imaging capture and upload"
  },
  "export": {
    id: "export",
    label: "Data Export",
    icon: "download",
    category: "field-ops",
    description: "Bulk data export and reporting packages"
  },

  // ── Tools & Admin ────────────────────────────────────────────
  "scribe": {
    id: "scribe",
    label: "AI Scribe",
    icon: "mic",
    category: "tools",
    description: "AI-powered clinical documentation"
  },
  "forms": {
    id: "forms",
    label: "Clinical Forms",
    icon: "file",
    category: "tools",
    description: "Intake forms, assessments, questionnaires"
  },
  "analytics": {
    id: "analytics",
    label: "Analytics",
    icon: "bar-chart",
    category: "tools",
    description: "Operational and clinical analytics dashboard"
  },
  "billing": {
    id: "billing",
    label: "Billing",
    icon: "credit-card",
    category: "tools",
    description: "Patient billing and payment management"
  },
  "settings": {
    id: "settings",
    label: "Settings",
    icon: "settings",
    category: "tools",
    description: "Deployment configuration and preferences"
  },
  "patients": {
    id: "patients",
    label: "Patient List",
    icon: "list",
    category: "tools",
    description: "Full patient roster with search"
  },
  "visits": {
    id: "visits",
    label: "Visit History",
    icon: "clock",
    category: "tools",
    description: "Past visit history and encounter log"
  }
};

// ═══════════════════════════════════════════════════════════════
// LAYER 2 — DEPLOYMENT PRESETS
// ═══════════════════════════════════════════════════════════════
// Values: "on" = enabled by default, "off" = disabled, "opt" = optional (shown toggle)

const DEPLOYMENT_PRESETS = {

  "solo-provider": {
    id: "solo-provider",
    label: "Solo Provider",
    subtitle: "Single physician / therapist practice",
    color: "#8B5CF6",
    icon: "user",
    examples: "Psychiatrist office, solo family doc, therapist practice",
    headerTitle: "VSee Health",
    headerSubtitle: "Provider Portal",
    facilityName: "Dr. Smith's Practice",
    modules: {
      // Scheduling
      "scheduling":    "on",
      "waiting-room":  "on",
      "video-visits":  "on",
      "walk-in-queue": "off",
      "appointments":  "off",
      "checkout":      "opt",
      // Clinical
      "charts":       "on",
      "orders":       "opt",
      "referrals":    "opt",
      "rpm":          "off",
      "vitals":       "off",
      "medications":  "opt",
      "mar":          "off",
      "erx":          "opt",
      "results":      "opt",
      "records":      "off",
      "careplan":     "off",
      // Inpatient
      "bed-mgmt":     "off",
      "alerts":       "off",
      "discharge":    "off",
      "handoff":      "off",
      // Communication
      "messenger":    "on",
      "video-call":   "on",
      "channels":     "off",
      "broadcast":    "off",
      "command":      "off",
      // Field Ops
      "register":     "off",
      "supply":       "off",
      "roster":       "off",
      "sync":         "off",
      "dispatch":     "off",
      "xray":         "off",
      "export":       "off",
      // Tools
      "scribe":       "on",
      "forms":        "on",
      "analytics":    "opt",
      "billing":      "opt",
      "settings":     "on",
      "patients":     "off",
      "visits":       "off"
    }
  },

  "small-practice": {
    id: "small-practice",
    label: "Small Practice",
    subtitle: "2–5 provider outpatient group",
    color: "#7C3AED",
    icon: "users",
    examples: "Family medicine group, urgent care, dental office",
    headerTitle: "VSee Health",
    headerSubtitle: "Clinic",
    facilityName: "Riverside Family Medicine",
    modules: {
      "scheduling":    "on",
      "waiting-room":  "on",
      "video-visits":  "on",
      "walk-in-queue": "opt",
      "appointments":  "off",
      "checkout":      "on",
      "charts":        "on",
      "orders":        "on",
      "referrals":     "on",
      "rpm":           "opt",
      "vitals":        "off",
      "medications":   "on",
      "mar":           "off",
      "erx":           "on",
      "results":       "on",
      "records":       "off",
      "careplan":      "opt",
      "bed-mgmt":      "off",
      "alerts":        "off",
      "discharge":     "off",
      "handoff":       "off",
      "messenger":     "on",
      "video-call":    "on",
      "channels":      "opt",
      "broadcast":     "off",
      "command":       "off",
      "register":      "off",
      "supply":        "off",
      "roster":        "off",
      "sync":          "off",
      "dispatch":      "off",
      "xray":          "off",
      "export":        "off",
      "scribe":        "on",
      "forms":         "on",
      "analytics":     "on",
      "billing":       "on",
      "settings":      "on",
      "patients":      "off",
      "visits":        "off"
    }
  },

  "multi-specialty": {
    id: "multi-specialty",
    label: "Multi-Specialty Clinic",
    subtitle: "Larger outpatient with multiple departments",
    color: "#7C3AED",
    icon: "building",
    examples: "Multi-specialty group, community health center, FQHC",
    headerTitle: "VSee Health",
    headerSubtitle: "Clinic",
    facilityName: "Main Street Medical Center",
    modules: {
      "scheduling":    "on",
      "waiting-room":  "on",
      "video-visits":  "on",
      "walk-in-queue": "on",
      "appointments":  "off",
      "checkout":      "on",
      "charts":        "on",
      "orders":        "on",
      "referrals":     "on",
      "rpm":           "on",
      "vitals":        "opt",
      "medications":   "on",
      "mar":           "off",
      "erx":           "on",
      "results":       "on",
      "records":       "opt",
      "careplan":      "on",
      "bed-mgmt":      "off",
      "alerts":        "opt",
      "discharge":     "off",
      "handoff":       "off",
      "messenger":     "on",
      "video-call":    "on",
      "channels":      "on",
      "broadcast":     "opt",
      "command":       "off",
      "register":      "off",
      "supply":        "opt",
      "roster":        "opt",
      "sync":          "off",
      "dispatch":      "off",
      "xray":          "opt",
      "export":        "opt",
      "scribe":        "on",
      "forms":         "on",
      "analytics":     "on",
      "billing":       "on",
      "settings":      "on",
      "patients":      "on",
      "visits":        "off"
    }
  },

  "hospital": {
    id: "hospital",
    label: "Hospital",
    subtitle: "Single-facility inpatient + outpatient",
    color: "#3B82F6",
    icon: "building-2",
    examples: "Community hospital, specialty hospital, rehab facility",
    headerTitle: "VSee Health",
    headerSubtitle: "Hospital",
    facilityName: "Metro General Hospital",
    modules: {
      "scheduling":    "on",
      "waiting-room":  "opt",
      "video-visits":  "on",
      "walk-in-queue": "opt",
      "appointments":  "off",
      "checkout":      "on",
      "charts":        "on",
      "orders":        "on",
      "referrals":     "on",
      "rpm":           "on",
      "vitals":        "on",
      "medications":   "on",
      "mar":           "on",
      "erx":           "on",
      "results":       "on",
      "records":       "on",
      "careplan":      "on",
      "bed-mgmt":      "on",
      "alerts":        "on",
      "discharge":     "on",
      "handoff":       "on",
      "messenger":     "on",
      "video-call":    "on",
      "channels":      "on",
      "broadcast":     "on",
      "command":       "opt",
      "register":      "opt",
      "supply":        "on",
      "roster":        "on",
      "sync":          "off",
      "dispatch":      "off",
      "xray":          "on",
      "export":        "on",
      "scribe":        "on",
      "forms":         "on",
      "analytics":     "on",
      "billing":       "on",
      "settings":      "on",
      "patients":      "on",
      "visits":        "off"
    }
  },

  "health-system": {
    id: "health-system",
    label: "Health System",
    subtitle: "Multi-facility enterprise network",
    color: "#1D4ED8",
    icon: "globe",
    examples: "Regional health system, IDN, academic medical center",
    headerTitle: "VSee Health",
    headerSubtitle: "Enterprise",
    facilityName: "Pacific Health Network",
    modules: {
      "scheduling":    "on",
      "waiting-room":  "on",
      "video-visits":  "on",
      "walk-in-queue": "on",
      "appointments":  "off",
      "checkout":      "on",
      "charts":        "on",
      "orders":        "on",
      "referrals":     "on",
      "rpm":           "on",
      "vitals":        "on",
      "medications":   "on",
      "mar":           "on",
      "erx":           "on",
      "results":       "on",
      "records":       "on",
      "careplan":      "on",
      "bed-mgmt":      "on",
      "alerts":        "on",
      "discharge":     "on",
      "handoff":       "on",
      "messenger":     "on",
      "video-call":    "on",
      "channels":      "on",
      "broadcast":     "on",
      "command":       "on",
      "register":      "opt",
      "supply":        "on",
      "roster":        "on",
      "sync":          "opt",
      "dispatch":      "opt",
      "xray":          "on",
      "export":        "on",
      "scribe":        "on",
      "forms":         "on",
      "analytics":     "on",
      "billing":       "on",
      "settings":      "on",
      "patients":      "on",
      "visits":        "on"
    }
  },

  "field-ops": {
    id: "field-ops",
    label: "Field Ops",
    subtitle: "Disaster response / mobile medical missions",
    color: "#F97316",
    icon: "compass",
    examples: "Disaster relief, military field hospital, mobile clinic, refugee camp",
    headerTitle: "VSee Health",
    headerSubtitle: "Field Ops",
    facilityName: "Forward Operating Base — Alpha",
    modules: {
      "scheduling":    "opt",
      "waiting-room":  "off",
      "video-visits":  "opt",
      "walk-in-queue": "on",
      "appointments":  "off",
      "checkout":      "off",
      "charts":        "on",
      "orders":        "on",
      "referrals":     "opt",
      "rpm":           "off",
      "vitals":        "on",
      "medications":   "on",
      "mar":           "opt",
      "erx":           "off",
      "results":       "opt",
      "records":       "opt",
      "careplan":      "off",
      "bed-mgmt":      "opt",
      "alerts":        "on",
      "discharge":     "opt",
      "handoff":       "on",
      "messenger":     "on",
      "video-call":    "on",
      "channels":      "on",
      "broadcast":     "on",
      "command":       "on",
      "register":      "on",
      "supply":        "on",
      "roster":        "on",
      "sync":          "on",
      "dispatch":      "on",
      "xray":          "on",
      "export":        "on",
      "scribe":        "opt",
      "forms":         "on",
      "analytics":     "opt",
      "billing":       "off",
      "settings":      "on",
      "patients":      "on",
      "visits":        "off"
    }
  },

  "patient-portal": {
    id: "patient-portal",
    label: "Patient Portal",
    subtitle: "Patient-facing self-service portal",
    color: "#0D875C",
    icon: "heart",
    examples: "Patient web portal, patient mobile app",
    headerTitle: "VSee Health",
    headerSubtitle: "Patient Portal",
    facilityName: "My Health Portal",
    modules: {
      "scheduling":    "off",
      "waiting-room":  "off",
      "video-visits":  "off",
      "walk-in-queue": "off",
      "appointments":  "on",
      "checkout":      "off",
      "charts":        "off",
      "orders":        "off",
      "referrals":     "off",
      "rpm":           "on",
      "vitals":        "off",
      "medications":   "on",
      "mar":           "off",
      "erx":           "off",
      "results":       "on",
      "records":       "on",
      "careplan":      "on",
      "bed-mgmt":      "off",
      "alerts":        "off",
      "discharge":     "off",
      "handoff":       "off",
      "messenger":     "on",
      "video-call":    "off",
      "channels":      "off",
      "broadcast":     "off",
      "command":       "off",
      "register":      "off",
      "supply":        "off",
      "roster":        "off",
      "sync":          "off",
      "dispatch":      "off",
      "xray":          "off",
      "export":        "off",
      "scribe":        "off",
      "forms":         "opt",
      "analytics":     "off",
      "billing":       "on",
      "settings":      "on",
      "patients":      "off",
      "visits":        "on"
    }
  }
};

// ═══════════════════════════════════════════════════════════════
// LAYER 3 — SIDEBAR SECTION DEFINITIONS
// ═══════════════════════════════════════════════════════════════
// How modules are grouped in the sidebar per deployment type

const SIDEBAR_SECTIONS = {
  "solo-provider": [
    { label: "Schedule", modules: ["scheduling", "waiting-room", "video-visits", "checkout"] },
    { label: "Clinical", modules: ["charts", "orders", "referrals", "rpm", "medications", "erx", "results", "careplan"] },
    { label: "Communicate", modules: ["messenger", "video-call", "channels"] },
    { label: "Tools", modules: ["scribe", "forms", "analytics", "billing", "settings"] }
  ],
  "small-practice": [
    { label: "Schedule", modules: ["scheduling", "waiting-room", "video-visits", "checkout"] },
    { label: "Clinical", modules: ["charts", "orders", "referrals", "rpm", "medications", "erx", "results", "careplan"] },
    { label: "Communicate", modules: ["messenger", "video-call", "channels"] },
    { label: "Tools", modules: ["scribe", "forms", "analytics", "billing", "settings"] }
  ],
  "multi-specialty": [
    { label: "Schedule", modules: ["scheduling", "waiting-room", "video-visits", "walk-in-queue", "checkout"] },
    { label: "Clinical", modules: ["charts", "orders", "referrals", "rpm", "vitals", "medications", "erx", "results", "records", "careplan"] },
    { label: "Communicate", modules: ["messenger", "video-call", "channels", "broadcast"] },
    { label: "Tools", modules: ["scribe", "forms", "patients", "analytics", "billing", "settings"] }
  ],
  "hospital": [
    { label: "Operations", modules: ["scheduling", "bed-mgmt", "alerts", "discharge"] },
    { label: "Clinical", modules: ["charts", "orders", "vitals", "mar", "handoff", "rpm", "erx", "results", "records", "careplan"] },
    { label: "Communicate", modules: ["messenger", "video-call", "channels", "broadcast", "command"] },
    { label: "Tools", modules: ["scribe", "forms", "patients", "xray", "analytics", "billing", "settings"] }
  ],
  "health-system": [
    { label: "Operations", modules: ["scheduling", "bed-mgmt", "alerts", "discharge", "waiting-room"] },
    { label: "Clinical", modules: ["charts", "orders", "vitals", "mar", "handoff", "rpm", "erx", "results", "records", "careplan"] },
    { label: "Communicate", modules: ["messenger", "video-call", "channels", "broadcast", "command"] },
    { label: "Enterprise", modules: ["supply", "roster", "dispatch", "export"] },
    { label: "Tools", modules: ["scribe", "forms", "patients", "visits", "xray", "analytics", "billing", "settings"] }
  ],
  "field-ops": [
    { label: "Triage", modules: ["walk-in-queue", "patients", "register"] },
    { label: "Clinical", modules: ["charts", "orders", "vitals", "medications", "mar", "alerts", "handoff", "results", "records"] },
    { label: "Logistics", modules: ["supply", "roster", "sync", "dispatch"] },
    { label: "Communicate", modules: ["messenger", "video-call", "channels", "broadcast", "command"] },
    { label: "Tools", modules: ["scribe", "forms", "xray", "export", "analytics", "settings"] }
  ],
  "patient-portal": [
    { label: "My Health", modules: ["appointments", "visits", "results", "rpm"] },
    { label: "Care", modules: ["medications", "records", "careplan"] },
    { label: "Communicate", modules: ["messenger"] },
    { label: "Account", modules: ["billing", "forms", "settings"] }
  ]
};

// ═══════════════════════════════════════════════════════════════
// MODULE CATEGORIES (for grouping in config UI)
// ═══════════════════════════════════════════════════════════════

const MODULE_CATEGORIES = [
  { id: "scheduling",     label: "Scheduling & Visits",   color: "#7C3AED" },
  { id: "clinical",       label: "Clinical",              color: "#3B82F6" },
  { id: "inpatient",      label: "Inpatient",             color: "#1D4ED8" },
  { id: "communication",  label: "Communication",         color: "#0D875C" },
  { id: "field-ops",      label: "Field Operations",      color: "#F97316" },
  { id: "tools",          label: "Tools & Admin",         color: "#6B7280" }
];

// ═══════════════════════════════════════════════════════════════
// DASHBOARD CARD DEFINITIONS (per preset)
// ═══════════════════════════════════════════════════════════════

const DASHBOARD_CARDS = {
  "solo-provider": [
    { title: "Today's Patients", value: "6", subtitle: "2 telehealth, 4 in-office", link: "scheduling" },
    { title: "Waiting Now", value: "1", subtitle: "Avg wait 4 min", link: "waiting-room" },
    { title: "Unread Messages", value: "3", subtitle: "1 urgent", link: "messenger" },
    { title: "Notes to Sign", value: "2", subtitle: "From yesterday", link: "scribe" }
  ],
  "small-practice": [
    { title: "Today's Schedule", value: "28", subtitle: "5 providers active", link: "scheduling" },
    { title: "Waiting Room", value: "3", subtitle: "Avg wait 8 min", link: "waiting-room" },
    { title: "Video Visits", value: "4", subtitle: "Next in 12 min", link: "video-visits" },
    { title: "Checkout Queue", value: "2", subtitle: "Copays pending", link: "checkout" },
    { title: "RPM Alerts", value: "5", subtitle: "2 critical", link: "rpm" },
    { title: "Messages", value: "12", subtitle: "4 unread", link: "messenger" }
  ],
  "multi-specialty": [
    { title: "Today's Schedule", value: "64", subtitle: "12 providers across 4 depts", link: "scheduling" },
    { title: "Waiting Room", value: "7", subtitle: "Avg wait 11 min", link: "waiting-room" },
    { title: "Video Visits", value: "8", subtitle: "3 in progress", link: "video-visits" },
    { title: "Checkout Queue", value: "4", subtitle: "2 with balances", link: "checkout" },
    { title: "RPM Alerts", value: "12", subtitle: "3 critical", link: "rpm" },
    { title: "Open Referrals", value: "18", subtitle: "6 pending auth", link: "referrals" },
    { title: "Messages", value: "34", subtitle: "8 unread", link: "messenger" },
    { title: "Pending Orders", value: "9", subtitle: "2 stat", link: "orders" }
  ],
  "hospital": [
    { title: "Census", value: "142", subtitle: "84% occupancy", link: "bed-mgmt" },
    { title: "Critical Alerts", value: "3", subtitle: "1 sepsis, 2 falls", link: "alerts" },
    { title: "Pending Orders", value: "24", subtitle: "6 stat", link: "orders" },
    { title: "Discharges Today", value: "11", subtitle: "4 ready", link: "discharge" },
    { title: "Shift Handoffs", value: "6", subtitle: "2 pending sign-off", link: "handoff" },
    { title: "Messages", value: "45", subtitle: "12 unread", link: "messenger" }
  ],
  "health-system": [
    { title: "System Census", value: "1,247", subtitle: "3 facilities, 78% avg occ.", link: "bed-mgmt" },
    { title: "Critical Alerts", value: "8", subtitle: "Across all facilities", link: "alerts" },
    { title: "Active Providers", value: "186", subtitle: "42 on telehealth", link: "scheduling" },
    { title: "Pending Orders", value: "67", subtitle: "14 stat", link: "orders" },
    { title: "Transfers", value: "4", subtitle: "2 incoming, 2 outgoing", link: "dispatch" },
    { title: "System Messages", value: "234", subtitle: "28 unread", link: "messenger" }
  ],
  "field-ops": [
    { title: "Patients Today", value: "47", subtitle: "12 in triage", link: "walk-in-queue" },
    { title: "Triage Queue", value: "8", subtitle: "2 red, 3 yellow", link: "walk-in-queue" },
    { title: "Supply Status", value: "OK", subtitle: "3 items low", link: "supply" },
    { title: "Team Deployed", value: "16", subtitle: "4 teams active", link: "roster" },
    { title: "Sync Status", value: "85%", subtitle: "Last sync 4 min ago", link: "sync" },
    { title: "Comms", value: "23", subtitle: "5 priority msgs", link: "messenger" }
  ],
  "patient-portal": [
    { title: "Next Appointment", value: "Apr 28", subtitle: "Dr. Smith — 10:30 AM", link: "appointments" },
    { title: "RPM Readings", value: "3", subtitle: "All normal range", link: "rpm" },
    { title: "New Results", value: "1", subtitle: "Lab panel ready", link: "results" },
    { title: "Messages", value: "2", subtitle: "1 from care team", link: "messenger" }
  ]
};

// ═══════════════════════════════════════════════════════════════
// LAYER 3 — ROLE DEFINITIONS
// ═══════════════════════════════════════════════════════════════
// Each role defines which modules (from the preset's enabled set) are visible.
// "all" means the role sees every enabled module; otherwise, list module IDs.
// Roles are per-preset because different deployments have different staffing.

const ROLE_PRESETS = {
  "provider": {
    id: "provider",
    label: "Provider",
    icon: "user",
    color: "#3B82F6",
    description: "Physician, NP, PA — clinical decision-makers",
    // Per-preset: which modules this role can see (from the preset's ON/OPT set)
    visibility: {
      "solo-provider":    "all",
      "small-practice":   ["scheduling", "waiting-room", "video-visits", "checkout", "charts", "orders", "referrals", "rpm", "medications", "erx", "results", "careplan", "messenger", "video-call", "channels", "scribe", "forms", "analytics", "settings"],
      "multi-specialty":  ["scheduling", "waiting-room", "video-visits", "checkout", "charts", "orders", "referrals", "rpm", "vitals", "medications", "erx", "results", "records", "careplan", "messenger", "video-call", "channels", "scribe", "forms", "patients", "analytics", "settings"],
      "hospital":         ["scheduling", "bed-mgmt", "alerts", "orders", "vitals", "discharge", "handoff", "mar", "rpm", "erx", "results", "records", "careplan", "messenger", "video-call", "channels", "scribe", "patients", "xray", "analytics", "settings"],
      "health-system":    ["scheduling", "bed-mgmt", "alerts", "orders", "vitals", "discharge", "handoff", "mar", "rpm", "erx", "results", "records", "careplan", "messenger", "video-call", "channels", "scribe", "patients", "visits", "xray", "analytics", "settings"],
      "field-ops":        ["walk-in-queue", "patients", "register", "charts", "orders", "vitals", "medications", "alerts", "handoff", "results", "messenger", "video-call", "broadcast", "command", "scribe", "forms", "xray", "settings"],
      "patient-portal":   null  // Providers don't use the patient portal
    }
  },
  "nurse": {
    id: "nurse",
    label: "Nurse",
    icon: "heart",
    color: "#EC4899",
    description: "RN, LPN, MA — clinical support and documentation",
    visibility: {
      "solo-provider":    ["scheduling", "waiting-room", "video-visits", "charts", "orders", "rpm", "medications", "messenger", "video-call", "forms", "settings"],
      "small-practice":   ["scheduling", "waiting-room", "video-visits", "checkout", "charts", "orders", "rpm", "medications", "results", "messenger", "video-call", "scribe", "forms", "settings"],
      "multi-specialty":  ["scheduling", "waiting-room", "video-visits", "walk-in-queue", "checkout", "charts", "orders", "rpm", "vitals", "medications", "results", "careplan", "messenger", "video-call", "channels", "scribe", "forms", "patients", "settings"],
      "hospital":         ["scheduling", "bed-mgmt", "alerts", "orders", "vitals", "discharge", "handoff", "mar", "rpm", "results", "records", "careplan", "messenger", "video-call", "channels", "scribe", "forms", "patients", "settings"],
      "health-system":    ["scheduling", "bed-mgmt", "alerts", "orders", "vitals", "discharge", "handoff", "mar", "rpm", "results", "records", "careplan", "messenger", "video-call", "channels", "scribe", "forms", "patients", "settings"],
      "field-ops":        ["walk-in-queue", "patients", "register", "charts", "orders", "vitals", "medications", "mar", "alerts", "handoff", "results", "supply", "messenger", "video-call", "broadcast", "forms", "xray", "settings"],
      "patient-portal":   null
    }
  },
  "admin": {
    id: "admin",
    label: "Admin / Front Desk",
    icon: "clipboard",
    color: "#F59E0B",
    description: "Office manager, receptionist, billing staff",
    visibility: {
      "solo-provider":    ["scheduling", "waiting-room", "checkout", "messenger", "forms", "analytics", "billing", "settings"],
      "small-practice":   ["scheduling", "waiting-room", "checkout", "charts", "messenger", "channels", "forms", "analytics", "billing", "settings"],
      "multi-specialty":  ["scheduling", "waiting-room", "walk-in-queue", "checkout", "charts", "referrals", "messenger", "channels", "broadcast", "forms", "patients", "analytics", "billing", "settings"],
      "hospital":         ["scheduling", "bed-mgmt", "discharge", "messenger", "channels", "broadcast", "supply", "roster", "forms", "patients", "analytics", "billing", "settings"],
      "health-system":    ["scheduling", "bed-mgmt", "discharge", "waiting-room", "messenger", "channels", "broadcast", "supply", "roster", "dispatch", "export", "forms", "patients", "visits", "analytics", "billing", "settings"],
      "field-ops":        ["walk-in-queue", "patients", "register", "supply", "roster", "sync", "dispatch", "messenger", "broadcast", "command", "forms", "export", "analytics", "settings"],
      "patient-portal":   null
    }
  },
  "patient": {
    id: "patient",
    label: "Patient",
    icon: "heart",
    color: "#0D875C",
    description: "Patient-facing self-service view",
    visibility: {
      "solo-provider":    null,  // Patients use the patient portal, not the provider app
      "small-practice":   null,
      "multi-specialty":  null,
      "hospital":         null,
      "health-system":    null,
      "field-ops":        null,
      "patient-portal":   "all"  // Patients see everything in the patient portal
    }
  }
};

/**
 * Get the visible modules for a given preset + role combination.
 * Returns an array of module IDs, or null if the role doesn't apply to this preset.
 */
function getVisibleModules(presetId, roleId) {
  var preset = DEPLOYMENT_PRESETS[presetId];
  var role = ROLE_PRESETS[roleId];
  if (!preset || !role) return null;

  var visibility = role.visibility[presetId];
  if (visibility === null) return null; // role doesn't apply

  // Get all enabled modules for this preset
  var enabledModules = Object.keys(preset.modules).filter(function(m) {
    return preset.modules[m] === 'on' || preset.modules[m] === 'opt';
  });

  if (visibility === 'all') return enabledModules;

  // Intersect: only modules that are both enabled AND in the role's visibility list
  return visibility.filter(function(m) {
    return preset.modules[m] === 'on' || preset.modules[m] === 'opt';
  });
}

// ═══════════════════════════════════════════════════════════════
// SVG ICON MAP (Feather-style, stroke-only)
// ═══════════════════════════════════════════════════════════════

const ICON_SVG = {
  'calendar':       '<path d="M3 6h18M3 6v14a2 2 0 002 2h14a2 2 0 002-2V6M3 6V4a2 2 0 012-2h2m10 0h2a2 2 0 012 2v2M8 2v4M16 2v4"/>',
  'users':          '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>',
  'video':          '<rect x="2" y="6" width="13" height="12" rx="2"/><path d="M20 8l4-2v12l-4-2"/>',
  'user-plus':      '<path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/>',
  'calendar-check': '<path d="M3 6h18M3 6v14a2 2 0 002 2h14a2 2 0 002-2V6M3 6V4a2 2 0 012-2h2m10 0h2a2 2 0 012 2v2M8 2v4M16 2v4"/><path d="M9 14l2 2 4-4"/>',
  'check-circle':   '<path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/>',
  'file-text':      '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>',
  'clipboard':      '<path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/>',
  'share':          '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>',
  'activity':       '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
  'heart':          '<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>',
  'pill':           '<path d="M10.5 1.5L3 9a4.24 4.24 0 006 6l7.5-7.5a4.24 4.24 0 00-6-6z"/><line x1="9" y1="9" x2="15" y2="15"/>',
  'grid':           '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
  'send':           '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
  'bar-chart-2':    '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
  'folder':         '<path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>',
  'target':         '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  'layout':         '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>',
  'alert-triangle': '<path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  'log-out':        '<path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
  'repeat':         '<polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/>',
  'message-circle': '<path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>',
  'hash':           '<line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/>',
  'radio':          '<circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 010 8.49M7.76 16.24a6 6 0 010-8.49"/><path d="M19.07 4.93a10 10 0 010 14.14M4.93 19.07a10 10 0 010-14.14"/>',
  'monitor':        '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
  'package':        '<path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
  'refresh-cw':     '<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>',
  'map-pin':        '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>',
  'image':          '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>',
  'download':       '<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  'mic':            '<path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>',
  'file':           '<path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/><polyline points="13 2 13 9 20 9"/>',
  'bar-chart':      '<line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>',
  'credit-card':    '<rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>',
  'settings':       '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>',
  'list':           '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>',
  'clock':          '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  'user':           '<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  'building':       '<rect x="4" y="2" width="16" height="20" rx="1"/><line x1="9" y1="6" x2="9.01" y2="6"/><line x1="15" y1="6" x2="15.01" y2="6"/><line x1="9" y1="10" x2="9.01" y2="10"/><line x1="15" y1="10" x2="15.01" y2="10"/><line x1="9" y1="14" x2="9.01" y2="14"/><line x1="15" y1="14" x2="15.01" y2="14"/><line x1="9" y1="18" x2="15" y2="18"/>',
  'building-2':     '<rect x="4" y="2" width="16" height="20" rx="1"/><path d="M9 22V6h6v16"/><line x1="8" y1="6" x2="8.01" y2="6"/><line x1="16" y1="6" x2="16.01" y2="6"/><line x1="8" y1="10" x2="8.01" y2="10"/><line x1="16" y1="10" x2="16.01" y2="10"/>',
  'globe':          '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>',
  'compass':        '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
  'sliders':        '<line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>'
};

/**
 * Get an SVG icon string by name.
 * @param {string} name — key from ICON_SVG
 * @returns {string} full <svg> markup
 */
function getIconSvg(name) {
  var inner = ICON_SVG[name] || ICON_SVG['settings'];
  return '<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + inner + '</svg>';
}

// ═══════════════════════════════════════════════════════════════
// PERSISTENCE — localStorage overrides + per-front-door active role
// ═══════════════════════════════════════════════════════════════
// The configurator writes to these keys on Save; front doors read from
// them to decide what to render. Falls back to DEPLOYMENT_PRESETS /
// ROLE_PRESETS when no override exists.

var STORAGE_OVERRIDES = 'vsee-config-overrides';
var STORAGE_CURRENT_ROLE = 'vsee-current-role';

function _safeGet(key) {
  try { var raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : null; }
  catch (e) { return null; }
}
function _safeSet(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); return true; }
  catch (e) { return false; }
}

function loadOverrides(presetId) {
  var all = _safeGet(STORAGE_OVERRIDES) || {};
  return all[presetId] || null;
}

function saveOverrides(presetId, data) {
  var all = _safeGet(STORAGE_OVERRIDES) || {};
  all[presetId] = Object.assign({}, data, { savedAt: new Date().toISOString() });
  return _safeSet(STORAGE_OVERRIDES, all);
}

function clearOverrides(presetId) {
  var all = _safeGet(STORAGE_OVERRIDES);
  if (!all) return;
  delete all[presetId];
  _safeSet(STORAGE_OVERRIDES, all);
}

function getCurrentRole(presetId) {
  var stored = _safeGet(STORAGE_CURRENT_ROLE);
  if (stored && stored[presetId]) return stored[presetId];
  // Default: first applicable preset role, then first custom role
  var roles = ['provider', 'nurse', 'admin', 'patient'];
  for (var i = 0; i < roles.length; i++) {
    var r = ROLE_PRESETS[roles[i]];
    if (r && r.visibility[presetId] !== null) return roles[i];
  }
  var ov = loadOverrides(presetId);
  if (ov && ov.customRoles && ov.customRoles.length > 0) return ov.customRoles[0].id;
  return null;
}

function setCurrentRole(presetId, roleId) {
  var stored = _safeGet(STORAGE_CURRENT_ROLE) || {};
  stored[presetId] = roleId;
  _safeSet(STORAGE_CURRENT_ROLE, stored);
}

// Returns the effective module-state map for a preset (overrides win).
function getEffectiveModules(presetId) {
  var preset = DEPLOYMENT_PRESETS[presetId];
  var overrides = loadOverrides(presetId);
  if (overrides && overrides.modules) {
    var merged = {};
    Object.keys(preset.modules).forEach(function(m) { merged[m] = preset.modules[m]; });
    Object.keys(overrides.modules).forEach(function(m) { merged[m] = overrides.modules[m]; });
    return merged;
  }
  return preset.modules;
}

// Returns visibility array for a role (overrides > ROLE_PRESETS).
// Returns null if the role doesn't apply to the preset.
function getEffectiveRoleVisibility(presetId, roleId) {
  var overrides = loadOverrides(presetId);
  if (overrides && overrides.roleVisibility && overrides.roleVisibility[roleId]) {
    return overrides.roleVisibility[roleId];
  }
  if (ROLE_PRESETS[roleId]) {
    var v = getVisibleModules(presetId, roleId);
    return v;
  }
  // Custom role with no override visibility: nothing visible
  return [];
}

// Returns role metadata (label, color) — looks up preset roles, then custom roles.
function getRoleInfo(presetId, roleId) {
  if (!roleId) return null;
  if (ROLE_PRESETS[roleId]) {
    return {
      id: roleId,
      label: ROLE_PRESETS[roleId].label,
      color: ROLE_PRESETS[roleId].color,
      isCustom: false
    };
  }
  var overrides = loadOverrides(presetId);
  if (overrides && overrides.customRoles) {
    for (var i = 0; i < overrides.customRoles.length; i++) {
      var cr = overrides.customRoles[i];
      if (cr.id === roleId) return Object.assign({ isCustom: true }, cr);
    }
  }
  return null;
}

// Returns the list of roles that apply to a preset (built-in + custom).
function getApplicableRoles(presetId) {
  var roles = [];
  ['provider', 'nurse', 'admin', 'patient'].forEach(function(rid) {
    var r = ROLE_PRESETS[rid];
    if (r && r.visibility[presetId] !== null) {
      roles.push({ id: rid, label: r.label, color: r.color, isCustom: false });
    }
  });
  var ov = loadOverrides(presetId);
  if (ov && ov.customRoles) {
    ov.customRoles.forEach(function(cr) {
      roles.push({ id: cr.id, label: cr.label, color: cr.color, isCustom: true });
    });
  }
  return roles;
}

/**
 * Build a sidebar dynamically from the deployment preset config.
 *
 * @param {string} presetId — key in DEPLOYMENT_PRESETS
 * @param {Object} viewIdMap — maps module ID → view element ID used by showView()
 * @param {string} defaultViewId — the view ID that should be active on load
 * @param {Object} [badgeCounts] — optional map of module ID → badge count
 * @param {string} [roleId] — if provided, filter to modules visible to this role
 * @returns {string} HTML string for the sidebar contents
 */
function buildSidebarHTML(presetId, viewIdMap, defaultViewId, badgeCounts, roleId) {
  var preset = DEPLOYMENT_PRESETS[presetId];
  if (!preset) return '';
  var sections = SIDEBAR_SECTIONS[presetId];
  if (!sections) return '';
  badgeCounts = badgeCounts || {};

  // Apply localStorage overrides on top of preset defaults
  var moduleStates = getEffectiveModules(presetId);

  // Build role-visibility filter (null means "show all enabled")
  var roleVisSet = null;
  var roleInfo = null;
  if (roleId) {
    roleInfo = getRoleInfo(presetId, roleId);
    var rv = getEffectiveRoleVisibility(presetId, roleId);
    if (rv && rv !== 'all' && Array.isArray(rv)) {
      roleVisSet = {};
      rv.forEach(function(m) { roleVisSet[m] = true; });
    }
  }

  function isVisible(modId) {
    var st = moduleStates[modId];
    if (st !== 'on' && st !== 'opt') return false;
    if (roleVisSet && !roleVisSet[modId]) return false;
    return true;
  }

  var html = '';

  // Config badge: shows preset name + (when filtered) role
  html += '<div class="config-badge" style="margin:12px 16px 4px;padding:6px 10px;'
    + 'background:' + preset.color + '15;border:1px solid ' + preset.color + '33;'
    + 'border-radius:8px;font-size:11px;color:' + preset.color + ';font-weight:600;'
    + 'display:flex;align-items:center;gap:6px;">'
    + '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">'
    + (ICON_SVG['settings'] || '') + '</svg>'
    + '<span>' + preset.label + (roleInfo ? ' · ' + roleInfo.label : '') + '</span></div>';

  sections.forEach(function(section) {
    var visibleModules = section.modules.filter(isVisible);
    if (visibleModules.length === 0) return;

    html += '<div class="nav-section">';
    html += '<div class="nav-section-label">' + section.label + '</div>';

    visibleModules.forEach(function(modId) {
      var mod = MODULE_REGISTRY[modId];
      if (!mod) return;
      var viewId = viewIdMap[modId];
      if (!viewId) return;
      var status = moduleStates[modId];
      var isDefault = (viewId === defaultViewId);
      var activeClass = isDefault ? ' active' : '';

      html += '<a class="nav-item' + activeClass + '" data-module="' + modId + '" onclick="showView(\'' + viewId + '\')">';
      html += getIconSvg(mod.icon);
      html += mod.label;

      if (badgeCounts[modId]) {
        var badgeClass = (modId === 'rpm' || modId === 'alerts') ? 'nav-badge nav-badge-danger' : 'nav-badge nav-badge-accent';
        html += '<span class="' + badgeClass + '">' + badgeCounts[modId] + '</span>';
      }

      if (status === 'opt') {
        html += '<span class="nav-badge" style="background:#FEF3C7;color:#92400E;font-size:9px;padding:1px 5px;border-radius:3px;margin-left:auto;">OPT</span>';
      }

      html += '</a>';
    });

    html += '</div>';
  });

  return html;
}

// ═══════════════════════════════════════════════════════════════
// ROLE SWITCHER — drop-in widget for front doors
// ═══════════════════════════════════════════════════════════════
// Usage:
//   initRoleSwitcher(document.getElementById('roleSwitcher'),
//                    'small-practice',
//                    { onChange: rebuildSidebar });

var _roleSwitcherStylesInjected = false;
function _injectRoleSwitcherStyles() {
  if (_roleSwitcherStylesInjected) return;
  _roleSwitcherStylesInjected = true;
  var s = document.createElement('style');
  s.textContent = ''
    + '.rs-wrap{position:relative;display:inline-flex}'
    + '.rs-btn{display:flex;align-items:center;gap:7px;padding:5px 10px;border:1px solid #E5E7EB;border-radius:6px;background:#fff;cursor:pointer;font-size:13px;font-weight:500;font-family:inherit;color:#111827;user-select:none}'
    + '.rs-btn:hover{border-color:#D1D5DB}'
    + '.rs-btn .rs-label{color:#6B7280;font-weight:400;font-size:11px}'
    + '.rs-btn .rs-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}'
    + '.rs-btn .rs-caret{color:#9CA3AF;width:10px;height:10px}'
    + '.rs-menu{position:absolute;top:calc(100% + 4px);right:0;background:#fff;border:1px solid #E5E7EB;border-radius:8px;padding:4px;box-shadow:0 4px 12px rgba(0,0,0,0.1);min-width:160px;z-index:50}'
    + '.rs-menu[hidden]{display:none}'
    + '.rs-item{display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:5px;cursor:pointer;font-size:13px;color:#111827}'
    + '.rs-item:hover{background:#F9FAFB}'
    + '.rs-item.active{background:#EFF6FF;color:#1E40AF;font-weight:600}'
    + '.rs-item .rs-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}';
  document.head.appendChild(s);
}

function initRoleSwitcher(containerEl, presetId, options) {
  if (!containerEl) return null;
  options = options || {};
  _injectRoleSwitcherStyles();

  var docHandlerBound = false;

  function render() {
    var current = getCurrentRole(presetId);
    var roles = getApplicableRoles(presetId);
    if (roles.length === 0) {
      containerEl.innerHTML = '';
      return;
    }
    var currentRole = null;
    for (var i = 0; i < roles.length; i++) {
      if (roles[i].id === current) { currentRole = roles[i]; break; }
    }
    if (!currentRole) {
      currentRole = roles[0];
      setCurrentRole(presetId, currentRole.id);
    }

    var html = '<div class="rs-wrap">';
    html += '<button type="button" class="rs-btn" data-rs-toggle>';
    html += '<span class="rs-label">View as</span>';
    html += '<span class="rs-dot" style="background:' + currentRole.color + '"></span>';
    html += '<span>' + currentRole.label + '</span>';
    html += '<svg class="rs-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>';
    html += '</button>';
    html += '<div class="rs-menu" hidden data-rs-menu>';
    roles.forEach(function(r) {
      var active = r.id === currentRole.id ? ' active' : '';
      html += '<div class="rs-item' + active + '" data-rs-pick="' + r.id + '">';
      html += '<span class="rs-dot" style="background:' + r.color + '"></span>';
      html += r.label;
      html += '</div>';
    });
    html += '</div></div>';
    containerEl.innerHTML = html;

    var btn = containerEl.querySelector('[data-rs-toggle]');
    var menu = containerEl.querySelector('[data-rs-menu]');

    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      menu.hidden = !menu.hidden;
    });
    menu.addEventListener('click', function(e) {
      var item = e.target.closest('[data-rs-pick]');
      if (!item) return;
      var newId = item.getAttribute('data-rs-pick');
      setCurrentRole(presetId, newId);
      menu.hidden = true;
      render();
      if (options.onChange) options.onChange(newId);
    });

    if (!docHandlerBound) {
      docHandlerBound = true;
      document.addEventListener('click', function() {
        var m = containerEl.querySelector('[data-rs-menu]');
        if (m) m.hidden = true;
      });
    }
  }

  render();
  return { rerender: render, getCurrent: function() { return getCurrentRole(presetId); } };
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    MODULE_REGISTRY, DEPLOYMENT_PRESETS, SIDEBAR_SECTIONS, MODULE_CATEGORIES,
    DASHBOARD_CARDS, ROLE_PRESETS,
    getVisibleModules, ICON_SVG, getIconSvg, buildSidebarHTML,
    loadOverrides, saveOverrides, clearOverrides,
    getCurrentRole, setCurrentRole,
    getEffectiveModules, getEffectiveRoleVisibility, getRoleInfo, getApplicableRoles,
    initRoleSwitcher
  };
}
