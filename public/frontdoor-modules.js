/**
 * VSee Front Door — Module View Registry
 *
 * Each module has a render function that returns HTML for its main pane.
 * Functions are looked up by module ID (matching MODULE_REGISTRY keys).
 * Unimplemented modules fall back to renderModulePlaceholder.
 *
 * Render fn signature: (moduleId, presetId, isDefault) => string
 *   isDefault is true when this module is the preset's landing view.
 *   When true, the function should prepend the dashboard stat cards.
 */

(function(global) {
  'use strict';

  // ── Helpers ──────────────────────────────────────────────────

  function fmtSvg(name, opts) {
    opts = opts || {};
    var size = opts.size || 16;
    var inner = (typeof ICON_SVG !== 'undefined' && ICON_SVG[name]) || '';
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" '
      + 'stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
      + inner + '</svg>';
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function(c) {
      return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c];
    });
  }

  function getRoleVisibilityForCurrentRole(presetId) {
    if (typeof getCurrentRole !== 'function') return null;
    var roleId = getCurrentRole(presetId);
    if (!roleId) return null;
    var rv = getEffectiveRoleVisibility(presetId, roleId);
    if (!rv || !Array.isArray(rv)) return null;
    var set = {};
    rv.forEach(function(m) { set[m] = true; });
    return set;
  }

  // Stat-cards strip rendered at top of the landing view
  function renderHomeStatCards(presetId) {
    var cards = (typeof DASHBOARD_CARDS !== 'undefined' && DASHBOARD_CARDS[presetId]) || [];
    if (cards.length === 0) return '';
    var visibleSet = getRoleVisibilityForCurrentRole(presetId);
    var modules = (typeof getEffectiveModules === 'function') ? getEffectiveModules(presetId)
                  : (DEPLOYMENT_PRESETS[presetId] && DEPLOYMENT_PRESETS[presetId].modules) || {};
    var filtered = cards.filter(function(c) {
      var st = modules[c.link];
      if (st !== 'on' && st !== 'opt') return false;
      if (visibleSet && !visibleSet[c.link]) return false;
      return true;
    });
    if (filtered.length === 0) return '';

    var html = '<div class="stat-cards">';
    filtered.forEach(function(c) {
      var mod = MODULE_REGISTRY[c.link];
      html += '<div class="stat-card" onclick="showView(\'' + c.link + '\')" style="cursor:pointer;">';
      html += '<div class="stat-icon accent">' + fmtSvg(mod ? mod.icon : 'settings', { size: 20 }) + '</div>';
      html += '<div class="stat-content">';
      html += '<div class="stat-label">' + escapeHtml(c.title) + '</div>';
      html += '<div class="stat-value accent">' + escapeHtml(c.value) + '</div>';
      html += '<div class="stat-sub" style="font-size:11px;color:var(--text-tertiary);margin-top:2px;">' + escapeHtml(c.subtitle) + '</div>';
      html += '</div>';
      html += '</div>';
    });
    html += '</div>';
    return html;
  }

  function renderViewHeader(title, subtitle, controls) {
    var html = '<div class="view-header">';
    html += '<div class="view-header-text">';
    html += '<h1 class="view-title">' + escapeHtml(title) + '</h1>';
    if (subtitle) html += '<div class="view-subtitle">' + escapeHtml(subtitle) + '</div>';
    html += '</div>';
    if (controls) html += '<div class="view-header-controls">' + controls + '</div>';
    html += '</div>';
    return html;
  }

  function chip(text, kind) {
    var classes = 'fd-chip';
    if (kind) classes += ' fd-chip-' + kind;
    return '<span class="' + classes + '">' + escapeHtml(text) + '</span>';
  }

  // ── Module Views ─────────────────────────────────────────────

  var MODULE_VIEWS = {};

  // ── Scheduling & Visits ──

  MODULE_VIEWS['scheduling'] = function(modId, presetId, isDefault) {
    var preset = DEPLOYMENT_PRESETS[presetId];
    var html = isDefault ? renderHomeStatCards(presetId) : '';

    html += renderViewHeader("Today's Schedule", preset.facilityName, '');
    var slots = [
      { time: '8:30 AM',  patient: 'Maria Sanchez',   reason: 'Annual physical',           type: 'in-person', status: 'checked-in' },
      { time: '9:00 AM',  patient: 'David Chen',      reason: 'Follow-up — hypertension',  type: 'video',     status: 'in-progress' },
      { time: '9:30 AM',  patient: 'Anna Williams',   reason: 'New patient consultation',  type: 'in-person', status: 'waiting' },
      { time: '10:00 AM', patient: 'Robert Johnson',  reason: 'Diabetes management',       type: 'video',     status: 'scheduled' },
      { time: '10:30 AM', patient: 'Linda Park',      reason: 'Med refill',                type: 'phone',     status: 'scheduled' },
      { time: '11:00 AM', patient: 'James Carter',    reason: 'Lab review',                type: 'in-person', status: 'scheduled' },
      { time: '11:30 AM', patient: 'Sarah Mitchell',  reason: 'Telehealth consult',        type: 'video',     status: 'scheduled' },
      { time: '1:00 PM',  patient: 'Michael Brown',   reason: 'Knee pain',                 type: 'in-person', status: 'scheduled' }
    ];

    html += '<div class="fd-table">';
    html += '<div class="fd-thead"><div class="fd-th" style="width:90px">Time</div><div class="fd-th">Patient</div><div class="fd-th">Reason</div><div class="fd-th" style="width:120px">Type</div><div class="fd-th" style="width:140px">Status</div></div>';
    slots.forEach(function(s) {
      html += '<div class="fd-tr">';
      html += '<div class="fd-td"><strong>' + s.time + '</strong></div>';
      html += '<div class="fd-td">' + s.patient + '</div>';
      html += '<div class="fd-td" style="color:var(--text-secondary)">' + s.reason + '</div>';
      html += '<div class="fd-td">' + chip(s.type, s.type === 'video' ? 'accent' : '') + '</div>';
      html += '<div class="fd-td">' + chip(s.status.replace('-',' '), statusKind(s.status)) + '</div>';
      html += '</div>';
    });
    html += '</div>';
    return html;
  };

  function statusKind(s) {
    if (s === 'in-progress') return 'success';
    if (s === 'checked-in') return 'accent';
    if (s === 'waiting') return 'warn';
    return 'muted';
  }

  MODULE_VIEWS['waiting-room'] = function(modId, presetId, isDefault) {
    var html = isDefault ? renderHomeStatCards(presetId) : '';
    html += renderViewHeader('Waiting Room', 'Patients waiting to be seen', '');

    var patients = [
      { name: 'David Chen',      reason: 'Follow-up',           wait: '4 min',  triage: 'standard' },
      { name: 'Anna Williams',   reason: 'New patient',         wait: '8 min',  triage: 'standard' },
      { name: 'Maria Sanchez',   reason: 'Annual physical',     wait: '12 min', triage: 'standard' },
      { name: 'Greg Thompson',   reason: 'Chest discomfort',    wait: '2 min',  triage: 'urgent' }
    ];

    html += '<div class="fd-card-grid">';
    patients.forEach(function(p) {
      var triageColor = p.triage === 'urgent' ? '#DC2626' : 'var(--text-tertiary)';
      html += '<div class="fd-card">';
      html += '<div class="fd-card-header"><div style="display:flex;align-items:center;gap:8px;"><div style="width:8px;height:8px;border-radius:50%;background:' + triageColor + '"></div><strong>' + p.name + '</strong></div>';
      html += chip(p.wait, p.triage === 'urgent' ? 'danger' : 'muted') + '</div>';
      html += '<div class="fd-card-body" style="color:var(--text-secondary);font-size:13px;">' + p.reason + '</div>';
      html += '<div class="fd-card-actions"><button class="btn btn-primary btn-sm">Start visit</button><button class="btn btn-outline btn-sm">Message</button></div>';
      html += '</div>';
    });
    html += '</div>';
    return html;
  };

  MODULE_VIEWS['video-visits'] = function(modId, presetId, isDefault) {
    var html = isDefault ? renderHomeStatCards(presetId) : '';
    html += renderViewHeader('Video Visits', 'Active and upcoming telehealth sessions', '');

    html += '<div class="fd-section-label">In progress</div>';
    html += '<div class="fd-card-grid">';
    html += '<div class="fd-card" style="border-left:3px solid #059669;">';
    html += '<div class="fd-card-header"><strong>David Chen</strong>' + chip('11 min in', 'success') + '</div>';
    html += '<div class="fd-card-body">Follow-up — hypertension</div>';
    html += '<div class="fd-card-actions"><button class="btn btn-primary btn-sm">Rejoin</button></div>';
    html += '</div></div>';

    html += '<div class="fd-section-label" style="margin-top:18px;">Upcoming today</div>';
    var queue = [
      { name: 'Robert Johnson',   reason: 'Diabetes management',   when: '10:00 AM' },
      { name: 'Linda Park',       reason: 'Med refill',            when: '10:30 AM' },
      { name: 'Sarah Mitchell',   reason: 'Telehealth consult',    when: '11:30 AM' },
      { name: 'Tony Ramirez',     reason: 'Post-op check-in',      when: '2:00 PM' }
    ];
    html += '<div class="fd-table">';
    html += '<div class="fd-thead"><div class="fd-th" style="width:100px">Time</div><div class="fd-th">Patient</div><div class="fd-th">Reason</div><div class="fd-th" style="width:100px"></div></div>';
    queue.forEach(function(q) {
      html += '<div class="fd-tr">';
      html += '<div class="fd-td"><strong>' + q.when + '</strong></div>';
      html += '<div class="fd-td">' + q.name + '</div>';
      html += '<div class="fd-td" style="color:var(--text-secondary)">' + q.reason + '</div>';
      html += '<div class="fd-td"><button class="btn btn-outline btn-sm">Start</button></div>';
      html += '</div>';
    });
    html += '</div>';
    return html;
  };

  MODULE_VIEWS['walk-in-queue'] = function(modId, presetId, isDefault) {
    var html = isDefault ? renderHomeStatCards(presetId) : '';
    html += renderViewHeader('Walk-in Queue', 'Active triage and walk-in patients', '');
    var triages = [
      { name: 'Patient #047 — Greg Thompson',  age: 64, complaint: 'Chest pain',          triage: 'red',    wait: '2 min' },
      { name: 'Patient #046 — Maya Singh',     age: 31, complaint: 'High fever',          triage: 'yellow', wait: '6 min' },
      { name: 'Patient #045 — Jake Morris',    age: 8,  complaint: 'Laceration on hand',  triage: 'yellow', wait: '11 min' },
      { name: 'Patient #044 — Mei Zhang',      age: 28, complaint: 'Sinus infection',     triage: 'green',  wait: '23 min' },
      { name: 'Patient #043 — Carlos Ruiz',    age: 42, complaint: 'Lower back pain',     triage: 'green',  wait: '34 min' }
    ];
    var triageColor = { red: '#DC2626', yellow: '#D97706', green: '#059669' };
    html += '<div class="fd-table">';
    html += '<div class="fd-thead"><div class="fd-th" style="width:80px">Triage</div><div class="fd-th">Patient</div><div class="fd-th" style="width:60px">Age</div><div class="fd-th">Complaint</div><div class="fd-th" style="width:90px">Wait</div><div class="fd-th" style="width:100px"></div></div>';
    triages.forEach(function(t) {
      html += '<div class="fd-tr">';
      html += '<div class="fd-td"><span style="display:inline-block;width:14px;height:14px;border-radius:50%;background:' + triageColor[t.triage] + '"></span></div>';
      html += '<div class="fd-td">' + t.name + '</div>';
      html += '<div class="fd-td">' + t.age + '</div>';
      html += '<div class="fd-td" style="color:var(--text-secondary)">' + t.complaint + '</div>';
      html += '<div class="fd-td">' + t.wait + '</div>';
      html += '<div class="fd-td"><button class="btn btn-primary btn-sm">Assess</button></div>';
      html += '</div>';
    });
    html += '</div>';
    return html;
  };

  MODULE_VIEWS['checkout'] = function(modId, presetId, isDefault) {
    var html = isDefault ? renderHomeStatCards(presetId) : '';
    html += renderViewHeader('Checkout Queue', 'Patients ready for checkout', '');
    var rows = [
      { name: 'David Chen',     copay: '$25.00', balance: '$0.00',  status: 'Ready' },
      { name: 'Anna Williams',  copay: '$40.00', balance: '$120.50', status: 'Balance owed' }
    ];
    html += '<div class="fd-table">';
    html += '<div class="fd-thead"><div class="fd-th">Patient</div><div class="fd-th" style="width:90px">Copay</div><div class="fd-th" style="width:100px">Balance</div><div class="fd-th" style="width:140px">Status</div><div class="fd-th" style="width:140px"></div></div>';
    rows.forEach(function(r) {
      html += '<div class="fd-tr">';
      html += '<div class="fd-td">' + r.name + '</div>';
      html += '<div class="fd-td">' + r.copay + '</div>';
      html += '<div class="fd-td">' + r.balance + '</div>';
      html += '<div class="fd-td">' + chip(r.status, r.status === 'Ready' ? 'success' : 'warn') + '</div>';
      html += '<div class="fd-td"><button class="btn btn-primary btn-sm">Process payment</button></div>';
      html += '</div>';
    });
    html += '</div>';
    return html;
  };

  MODULE_VIEWS['appointments'] = function(modId, presetId, isDefault) {
    var html = isDefault ? renderHomeStatCards(presetId) : '';
    html += renderViewHeader('Appointments', 'Your upcoming visits', '<button class="btn btn-primary btn-sm">+ Schedule</button>');
    var appts = [
      { date: 'Apr 28',  time: '10:30 AM', provider: 'Dr. Smith',   reason: 'Follow-up',         type: 'video' },
      { date: 'May 12',  time: '2:00 PM',  provider: 'Dr. Patel',   reason: 'Annual physical',   type: 'in-person' },
      { date: 'Jun 03',  time: '9:00 AM',  provider: 'Dr. Smith',   reason: 'Lab review',        type: 'video' }
    ];
    html += '<div class="fd-table">';
    html += '<div class="fd-thead"><div class="fd-th" style="width:90px">Date</div><div class="fd-th" style="width:100px">Time</div><div class="fd-th">Provider</div><div class="fd-th">Reason</div><div class="fd-th" style="width:100px">Type</div><div class="fd-th" style="width:90px"></div></div>';
    appts.forEach(function(a) {
      html += '<div class="fd-tr">';
      html += '<div class="fd-td"><strong>' + a.date + '</strong></div>';
      html += '<div class="fd-td">' + a.time + '</div>';
      html += '<div class="fd-td">' + a.provider + '</div>';
      html += '<div class="fd-td" style="color:var(--text-secondary)">' + a.reason + '</div>';
      html += '<div class="fd-td">' + chip(a.type, a.type === 'video' ? 'accent' : '') + '</div>';
      html += '<div class="fd-td"><button class="btn btn-outline btn-sm">Details</button></div>';
      html += '</div>';
    });
    html += '</div>';
    return html;
  };

  // ── Clinical ──

  MODULE_VIEWS['charts'] = function(modId, presetId, isDefault) {
    var html = isDefault ? renderHomeStatCards(presetId) : '';
    html += renderViewHeader('Patient Charts', 'Open and recent patient records',
      '<input class="fd-search" placeholder="Search patients…" />');

    var rows = [
      { name: 'David Chen',      mrn: 'MRN-00482', dob: '1972-03-14', last: 'Apr 28, 2026', alerts: 1 },
      { name: 'Anna Williams',   mrn: 'MRN-00481', dob: '1991-07-22', last: 'Apr 28, 2026', alerts: 0 },
      { name: 'Maria Sanchez',   mrn: 'MRN-00479', dob: '1984-11-04', last: 'Apr 27, 2026', alerts: 0 },
      { name: 'Robert Johnson',  mrn: 'MRN-00475', dob: '1958-06-19', last: 'Apr 26, 2026', alerts: 2 },
      { name: 'Linda Park',      mrn: 'MRN-00473', dob: '1975-01-30', last: 'Apr 25, 2026', alerts: 0 },
      { name: 'James Carter',    mrn: 'MRN-00472', dob: '1983-08-12', last: 'Apr 25, 2026', alerts: 0 },
      { name: 'Sarah Mitchell',  mrn: 'MRN-00470', dob: '1996-04-08', last: 'Apr 24, 2026', alerts: 0 }
    ];
    html += '<div class="fd-table">';
    html += '<div class="fd-thead"><div class="fd-th">Patient</div><div class="fd-th" style="width:120px">MRN</div><div class="fd-th" style="width:120px">DOB</div><div class="fd-th" style="width:140px">Last visit</div><div class="fd-th" style="width:100px">Alerts</div></div>';
    rows.forEach(function(r) {
      html += '<div class="fd-tr">';
      html += '<div class="fd-td"><strong>' + r.name + '</strong></div>';
      html += '<div class="fd-td" style="color:var(--text-secondary)">' + r.mrn + '</div>';
      html += '<div class="fd-td">' + r.dob + '</div>';
      html += '<div class="fd-td">' + r.last + '</div>';
      html += '<div class="fd-td">' + (r.alerts ? chip(r.alerts + ' alert' + (r.alerts > 1 ? 's' : ''), 'danger') : chip('clear', 'muted')) + '</div>';
      html += '</div>';
    });
    html += '</div>';
    return html;
  };

  MODULE_VIEWS['orders'] = function(modId, presetId, isDefault) {
    var html = isDefault ? renderHomeStatCards(presetId) : '';
    html += renderViewHeader('Orders & Rx', 'Active labs, imaging, and prescriptions', '<button class="btn btn-primary btn-sm">+ New order</button>');
    var rows = [
      { type: 'Lab',     order: 'CBC w/ diff',         patient: 'David Chen',     status: 'Pending',   priority: 'routine' },
      { type: 'Lab',     order: 'Comprehensive metabolic panel', patient: 'Robert Johnson',  status: 'Pending',   priority: 'stat' },
      { type: 'Imaging', order: 'Chest X-ray',         patient: 'Greg Thompson',  status: 'Resulted',  priority: 'stat' },
      { type: 'Rx',      order: 'Lisinopril 10mg',     patient: 'David Chen',     status: 'Sent',      priority: 'routine' },
      { type: 'Imaging', order: 'MRI lumbar spine',    patient: 'Carlos Ruiz',    status: 'Pending',   priority: 'routine' },
      { type: 'Rx',      order: 'Metformin 500mg',     patient: 'Robert Johnson', status: 'Sent',      priority: 'routine' }
    ];
    html += '<div class="fd-table">';
    html += '<div class="fd-thead"><div class="fd-th" style="width:90px">Type</div><div class="fd-th">Order</div><div class="fd-th">Patient</div><div class="fd-th" style="width:110px">Priority</div><div class="fd-th" style="width:120px">Status</div></div>';
    rows.forEach(function(r) {
      html += '<div class="fd-tr">';
      html += '<div class="fd-td">' + chip(r.type, 'muted') + '</div>';
      html += '<div class="fd-td">' + r.order + '</div>';
      html += '<div class="fd-td" style="color:var(--text-secondary)">' + r.patient + '</div>';
      html += '<div class="fd-td">' + chip(r.priority, r.priority === 'stat' ? 'danger' : 'muted') + '</div>';
      html += '<div class="fd-td">' + chip(r.status, r.status === 'Pending' ? 'warn' : 'success') + '</div>';
      html += '</div>';
    });
    html += '</div>';
    return html;
  };

  MODULE_VIEWS['vitals'] = function(modId, presetId, isDefault) {
    var html = isDefault ? renderHomeStatCards(presetId) : '';
    html += renderViewHeader('Vitals Monitor', 'Real-time vitals across active patients', '');

    var pts = [
      { name: 'Greg Thompson',  hr: 88,  bp: '142/95', spo2: 96, temp: 99.8, flag: 'BP elevated' },
      { name: 'Maya Singh',     hr: 102, bp: '128/82', spo2: 97, temp: 102.4, flag: 'Temp elevated' },
      { name: 'David Chen',     hr: 72,  bp: '118/76', spo2: 98, temp: 98.2, flag: null },
      { name: 'Robert Johnson', hr: 76,  bp: '134/88', spo2: 97, temp: 98.6, flag: null },
      { name: 'Anna Williams',  hr: 68,  bp: '116/72', spo2: 99, temp: 98.4, flag: null }
    ];
    html += '<div class="fd-table">';
    html += '<div class="fd-thead"><div class="fd-th">Patient</div><div class="fd-th" style="width:80px">HR</div><div class="fd-th" style="width:100px">BP</div><div class="fd-th" style="width:80px">SpO₂</div><div class="fd-th" style="width:80px">Temp °F</div><div class="fd-th" style="width:160px">Flag</div></div>';
    pts.forEach(function(p) {
      html += '<div class="fd-tr">';
      html += '<div class="fd-td"><strong>' + p.name + '</strong></div>';
      html += '<div class="fd-td">' + p.hr + '</div>';
      html += '<div class="fd-td">' + p.bp + '</div>';
      html += '<div class="fd-td">' + p.spo2 + '%</div>';
      html += '<div class="fd-td">' + p.temp.toFixed(1) + '</div>';
      html += '<div class="fd-td">' + (p.flag ? chip(p.flag, 'danger') : chip('normal', 'muted')) + '</div>';
      html += '</div>';
    });
    html += '</div>';
    return html;
  };

  MODULE_VIEWS['medications'] = function(modId, presetId, isDefault) {
    var html = isDefault ? renderHomeStatCards(presetId) : '';
    html += renderViewHeader('Medications', 'Active and recent prescriptions', '');
    var meds = [
      { name: 'Lisinopril', strength: '10mg', sig: 'Once daily', prescribed: '2026-04-15', refills: 5 },
      { name: 'Metformin',  strength: '500mg', sig: 'Twice daily with meals', prescribed: '2026-03-22', refills: 3 },
      { name: 'Atorvastatin', strength: '20mg', sig: 'Once daily at bedtime', prescribed: '2026-02-08', refills: 2 },
      { name: 'Albuterol HFA', strength: '90mcg', sig: '2 puffs as needed', prescribed: '2026-01-12', refills: 1 }
    ];
    html += '<div class="fd-table">';
    html += '<div class="fd-thead"><div class="fd-th">Medication</div><div class="fd-th" style="width:100px">Strength</div><div class="fd-th">Directions</div><div class="fd-th" style="width:130px">Prescribed</div><div class="fd-th" style="width:90px">Refills</div></div>';
    meds.forEach(function(m) {
      html += '<div class="fd-tr">';
      html += '<div class="fd-td"><strong>' + m.name + '</strong></div>';
      html += '<div class="fd-td">' + m.strength + '</div>';
      html += '<div class="fd-td" style="color:var(--text-secondary)">' + m.sig + '</div>';
      html += '<div class="fd-td">' + m.prescribed + '</div>';
      html += '<div class="fd-td">' + m.refills + '</div>';
      html += '</div>';
    });
    html += '</div>';
    return html;
  };

  MODULE_VIEWS['results'] = function(modId, presetId, isDefault) {
    var html = isDefault ? renderHomeStatCards(presetId) : '';
    html += renderViewHeader('Lab Results', 'Recent labs and tests', '');
    var rows = [
      { test: 'Lipid panel',       date: 'Apr 26', flags: ['LDL high'], status: 'Abnormal' },
      { test: 'A1c',               date: 'Apr 24', flags: [],            status: 'Normal' },
      { test: 'TSH',               date: 'Apr 22', flags: [],            status: 'Normal' },
      { test: 'CBC w/ differential', date: 'Apr 20', flags: ['WBC slightly elevated'], status: 'Abnormal' },
      { test: 'Comprehensive metabolic panel', date: 'Apr 18', flags: [], status: 'Normal' }
    ];
    html += '<div class="fd-table">';
    html += '<div class="fd-thead"><div class="fd-th">Test</div><div class="fd-th" style="width:100px">Date</div><div class="fd-th">Flags</div><div class="fd-th" style="width:120px">Status</div></div>';
    rows.forEach(function(r) {
      html += '<div class="fd-tr">';
      html += '<div class="fd-td"><strong>' + r.test + '</strong></div>';
      html += '<div class="fd-td">' + r.date + '</div>';
      html += '<div class="fd-td" style="color:var(--text-secondary)">' + (r.flags.length ? r.flags.join(', ') : '—') + '</div>';
      html += '<div class="fd-td">' + chip(r.status, r.status === 'Normal' ? 'success' : 'warn') + '</div>';
      html += '</div>';
    });
    html += '</div>';
    return html;
  };

  MODULE_VIEWS['rpm'] = function(modId, presetId, isDefault) {
    var html = isDefault ? renderHomeStatCards(presetId) : '';
    html += renderViewHeader('RPM Dashboard', 'Remote patient monitoring readings', '');
    var rows = [
      { patient: 'Robert Johnson',  reading: 'BP 152/96',         time: '8:14 AM',  status: 'critical' },
      { patient: 'Linda Park',      reading: 'BG 248 mg/dL',       time: '7:42 AM',  status: 'critical' },
      { patient: 'Maria Sanchez',   reading: 'Weight +2.4 lb',     time: '6:30 AM',  status: 'flagged' },
      { patient: 'David Chen',      reading: 'BP 124/82',          time: '6:12 AM',  status: 'normal' },
      { patient: 'Carlos Ruiz',     reading: 'SpO₂ 96%',           time: '5:55 AM',  status: 'normal' }
    ];
    var statusKindMap = { critical: 'danger', flagged: 'warn', normal: 'success' };
    html += '<div class="fd-table">';
    html += '<div class="fd-thead"><div class="fd-th">Patient</div><div class="fd-th">Reading</div><div class="fd-th" style="width:100px">Time</div><div class="fd-th" style="width:120px">Status</div></div>';
    rows.forEach(function(r) {
      html += '<div class="fd-tr">';
      html += '<div class="fd-td"><strong>' + r.patient + '</strong></div>';
      html += '<div class="fd-td">' + r.reading + '</div>';
      html += '<div class="fd-td">' + r.time + '</div>';
      html += '<div class="fd-td">' + chip(r.status, statusKindMap[r.status]) + '</div>';
      html += '</div>';
    });
    html += '</div>';
    return html;
  };

  // ── Inpatient ──

  MODULE_VIEWS['bed-mgmt'] = function(modId, presetId, isDefault) {
    var html = isDefault ? renderHomeStatCards(presetId) : '';
    html += renderViewHeader('Bed Management', 'Floor census and bed assignments', '');

    var floors = [
      { name: '3 West Medical', total: 24, occupied: 21 },
      { name: '4 East Cardiac', total: 16, occupied: 14 },
      { name: 'ICU',            total: 12, occupied: 9 }
    ];
    html += '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px;">';
    floors.forEach(function(f) {
      var pct = Math.round(f.occupied / f.total * 100);
      html += '<div class="fd-card">';
      html += '<div class="fd-card-header"><strong>' + f.name + '</strong>' + chip(pct + '% full', pct > 85 ? 'danger' : 'muted') + '</div>';
      html += '<div style="font-size:13px;color:var(--text-secondary);margin-bottom:10px;">' + f.occupied + ' / ' + f.total + ' beds occupied</div>';

      html += '<div style="display:grid;grid-template-columns:repeat(8,1fr);gap:4px;">';
      for (var i = 0; i < f.total; i++) {
        var occ = i < f.occupied;
        var label = (i + 1).toString();
        var bg = occ ? 'var(--accent)' : '#E5E7EB';
        var color = occ ? '#fff' : '#6B7280';
        html += '<div title="Bed ' + label + (occ ? ' — occupied' : ' — open') + '" style="aspect-ratio:1;background:' + bg + ';color:' + color + ';border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;">' + label + '</div>';
      }
      html += '</div></div>';
    });
    html += '</div>';
    return html;
  };

  MODULE_VIEWS['alerts'] = function(modId, presetId, isDefault) {
    var html = isDefault ? renderHomeStatCards(presetId) : '';
    html += renderViewHeader('Clinical Alerts', 'Active alerts requiring attention', '');
    var alerts = [
      { sev: 'critical', kind: 'Sepsis warning',     patient: 'Greg Thompson', detail: 'qSOFA score ≥2 — initiate sepsis protocol',  time: '4 min ago' },
      { sev: 'high',     kind: 'Falls risk',         patient: 'Maria Sanchez', detail: 'Elevated risk after PT consult',              time: '12 min ago' },
      { sev: 'high',     kind: 'Falls risk',         patient: 'James Carter',  detail: 'Recent dizziness reported by nursing',         time: '18 min ago' },
      { sev: 'medium',   kind: 'Drug interaction',   patient: 'Linda Park',    detail: 'Warfarin + new prescription — review',         time: '34 min ago' },
      { sev: 'medium',   kind: 'Allergy alert',      patient: 'Robert Johnson', detail: 'Documented penicillin allergy — order has β-lactam', time: '1 hr ago' }
    ];
    var sevKind = { critical: 'danger', high: 'warn', medium: 'muted' };
    html += '<div class="fd-list">';
    alerts.forEach(function(a) {
      html += '<div class="fd-list-item">';
      html += '<div style="width:6px;align-self:stretch;background:' + (a.sev === 'critical' ? '#DC2626' : a.sev === 'high' ? '#D97706' : '#6B7280') + ';border-radius:3px;"></div>';
      html += '<div style="flex:1;">';
      html += '<div style="display:flex;align-items:center;gap:10px;">';
      html += '<strong>' + a.kind + '</strong>' + chip(a.sev, sevKind[a.sev]);
      html += '<span style="margin-left:auto;color:var(--text-tertiary);font-size:12px;">' + a.time + '</span>';
      html += '</div>';
      html += '<div style="font-size:13px;color:var(--text-secondary);margin-top:2px;">' + a.patient + ' — ' + a.detail + '</div>';
      html += '</div>';
      html += '<div><button class="btn btn-outline btn-sm">Acknowledge</button></div>';
      html += '</div>';
    });
    html += '</div>';
    return html;
  };

  MODULE_VIEWS['mar'] = function(modId, presetId, isDefault) {
    var html = isDefault ? renderHomeStatCards(presetId) : '';
    html += renderViewHeader('Medication Administration Record (MAR)', 'Scheduled and PRN doses for shift', '');
    var rows = [
      { patient: 'Greg Thompson',  med: 'Acetaminophen 650 mg PO', sched: '08:00', status: 'given' },
      { patient: 'Greg Thompson',  med: 'Lisinopril 10 mg PO',     sched: '08:00', status: 'given' },
      { patient: 'Maria Sanchez',  med: 'Furosemide 40 mg IV',     sched: '09:00', status: 'due' },
      { patient: 'Maria Sanchez',  med: 'Insulin glargine 12 U SQ', sched: '09:00', status: 'due' },
      { patient: 'James Carter',   med: 'Pantoprazole 40 mg PO',   sched: '09:00', status: 'due' },
      { patient: 'Robert Johnson', med: 'Metformin 500 mg PO',     sched: '12:00', status: 'pending' }
    ];
    var statusKindMap = { given: 'success', due: 'warn', pending: 'muted' };
    html += '<div class="fd-table">';
    html += '<div class="fd-thead"><div class="fd-th">Patient</div><div class="fd-th">Medication</div><div class="fd-th" style="width:90px">Scheduled</div><div class="fd-th" style="width:110px">Status</div><div class="fd-th" style="width:120px"></div></div>';
    rows.forEach(function(r) {
      html += '<div class="fd-tr">';
      html += '<div class="fd-td">' + r.patient + '</div>';
      html += '<div class="fd-td">' + r.med + '</div>';
      html += '<div class="fd-td"><strong>' + r.sched + '</strong></div>';
      html += '<div class="fd-td">' + chip(r.status, statusKindMap[r.status]) + '</div>';
      html += '<div class="fd-td">' + (r.status === 'due' ? '<button class="btn btn-primary btn-sm">Administer</button>' : '') + '</div>';
      html += '</div>';
    });
    html += '</div>';
    return html;
  };

  MODULE_VIEWS['discharge'] = function(modId, presetId, isDefault) {
    var html = isDefault ? renderHomeStatCards(presetId) : '';
    html += renderViewHeader('Discharge Planning', 'Patients ready or pending discharge today', '');
    var rows = [
      { name: 'Greg Thompson',  bed: '3W-12', stay: '2 days', readiness: 'Ready', blockers: '' },
      { name: 'Maria Sanchez',  bed: '3W-08', stay: '4 days', readiness: 'Pending', blockers: 'Awaiting home health' },
      { name: 'Robert Johnson', bed: '4E-03', stay: '3 days', readiness: 'Ready', blockers: '' },
      { name: 'Linda Park',     bed: 'ICU-05', stay: '7 days', readiness: 'Pending', blockers: 'PT/OT clearance' }
    ];
    html += '<div class="fd-table">';
    html += '<div class="fd-thead"><div class="fd-th">Patient</div><div class="fd-th" style="width:100px">Bed</div><div class="fd-th" style="width:90px">Stay</div><div class="fd-th" style="width:120px">Readiness</div><div class="fd-th">Blockers</div></div>';
    rows.forEach(function(r) {
      html += '<div class="fd-tr">';
      html += '<div class="fd-td"><strong>' + r.name + '</strong></div>';
      html += '<div class="fd-td">' + r.bed + '</div>';
      html += '<div class="fd-td">' + r.stay + '</div>';
      html += '<div class="fd-td">' + chip(r.readiness, r.readiness === 'Ready' ? 'success' : 'warn') + '</div>';
      html += '<div class="fd-td" style="color:var(--text-secondary)">' + (r.blockers || '—') + '</div>';
      html += '</div>';
    });
    html += '</div>';
    return html;
  };

  // ── Communication ──

  MODULE_VIEWS['messenger'] = function(modId, presetId, isDefault) {
    var html = isDefault ? renderHomeStatCards(presetId) : '';
    html += renderViewHeader('VSee Messenger', 'Secure messaging with patients and care team',
      '<a class="btn btn-outline btn-sm" href="frontdoor-messenger.html">Open standalone →</a>');

    var threads = [
      { name: 'Anna Williams',  preview: 'Thanks, doctor! Will pick it up.', time: '4m', unread: 2 },
      { name: 'David Chen',     preview: 'Got the lab results, looks good.', time: '12m', unread: 0 },
      { name: 'Care Team — 3W', preview: 'Rounding starts in 15 min',         time: '1h',  unread: 1 },
      { name: 'Linda Park',     preview: 'Refill request for Metformin',      time: '3h',  unread: 0 }
    ];
    html += '<div style="display:grid;grid-template-columns:300px 1fr;gap:0;border:1px solid var(--border);border-radius:8px;overflow:hidden;height:520px;">';
    html += '<div style="border-right:1px solid var(--border);overflow-y:auto;background:var(--bg-subtle);">';
    threads.forEach(function(t, i) {
      html += '<div style="padding:12px 14px;border-bottom:1px solid var(--border);' + (i === 0 ? 'background:#fff;' : 'cursor:pointer;') + '">';
      html += '<div style="display:flex;align-items:center;gap:8px;"><strong>' + t.name + '</strong>';
      if (t.unread) html += '<span style="background:var(--accent);color:#fff;font-size:10px;font-weight:700;border-radius:10px;padding:2px 7px;">' + t.unread + '</span>';
      html += '<span style="margin-left:auto;color:var(--text-tertiary);font-size:11px;">' + t.time + '</span></div>';
      html += '<div style="color:var(--text-secondary);font-size:12px;margin-top:4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + t.preview + '</div>';
      html += '</div>';
    });
    html += '</div>';

    html += '<div style="display:flex;flex-direction:column;background:#fff;">';
    html += '<div style="padding:12px 16px;border-bottom:1px solid var(--border);font-weight:600;">Anna Williams</div>';
    html += '<div style="flex:1;padding:16px;overflow-y:auto;">';
    html += '<div style="background:var(--bg-subtle);padding:8px 12px;border-radius:8px;max-width:70%;margin-bottom:10px;">Hi Dr. Smith — quick question about the new prescription. Should I take it with food?</div>';
    html += '<div style="background:var(--accent);color:#fff;padding:8px 12px;border-radius:8px;max-width:70%;margin-left:auto;margin-bottom:10px;">Yes, take it with breakfast or another meal. Helps absorption.</div>';
    html += '<div style="background:var(--bg-subtle);padding:8px 12px;border-radius:8px;max-width:70%;margin-bottom:10px;">Got it, thanks!</div>';
    html += '</div>';
    html += '<div style="padding:10px 16px;border-top:1px solid var(--border);"><input class="fd-search" style="width:100%;" placeholder="Type a message…" /></div>';
    html += '</div>';
    html += '</div>';
    return html;
  };

  MODULE_VIEWS['video-call'] = function(modId, presetId, isDefault) {
    var html = isDefault ? renderHomeStatCards(presetId) : '';
    html += renderViewHeader('Video Call', 'Quick video calls with care team', '<button class="btn btn-primary btn-sm">+ Start call</button>');
    html += '<div style="background:#0F172A;border-radius:12px;height:420px;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.5);font-size:14px;">';
    html += 'Video call workspace — start a call to see live feed';
    html += '</div>';
    return html;
  };

  MODULE_VIEWS['channels'] = function(modId, presetId, isDefault) {
    var html = isDefault ? renderHomeStatCards(presetId) : '';
    html += renderViewHeader('Team Channels', 'Group channels for departments and teams', '');
    var chs = [
      { name: '#cardiology',   members: 12, unread: 3 },
      { name: '#3-west-rn',    members: 18, unread: 0 },
      { name: '#oncall',       members: 24, unread: 7 },
      { name: '#pharmacy',     members: 9,  unread: 1 },
      { name: '#general',      members: 47, unread: 0 }
    ];
    html += '<div class="fd-list">';
    chs.forEach(function(c) {
      html += '<div class="fd-list-item"><div style="flex:1"><strong>' + c.name + '</strong>';
      html += '<div style="font-size:12px;color:var(--text-secondary);">' + c.members + ' members</div></div>';
      if (c.unread) html += '<div>' + chip(c.unread + ' unread', 'accent') + '</div>';
      html += '</div>';
    });
    html += '</div>';
    return html;
  };

  // ── Field Operations ──

  MODULE_VIEWS['supply'] = function(modId, presetId, isDefault) {
    var html = isDefault ? renderHomeStatCards(presetId) : '';
    html += renderViewHeader('Supply Chain', 'Medical supplies and inventory', '');
    var rows = [
      { item: 'Saline 0.9% IV (1L)', stock: 142, par: 200, status: 'Low' },
      { item: 'Surgical gauze (4x4)', stock: 1240, par: 1500, status: 'OK' },
      { item: 'N95 masks',            stock: 86, par: 300, status: 'Critical' },
      { item: 'Acetaminophen 650mg',  stock: 320, par: 400, status: 'OK' },
      { item: 'Suture pack (4-0)',    stock: 12, par: 40, status: 'Low' }
    ];
    html += '<div class="fd-table">';
    html += '<div class="fd-thead"><div class="fd-th">Item</div><div class="fd-th" style="width:90px">Stock</div><div class="fd-th" style="width:90px">Par</div><div class="fd-th" style="width:120px">Status</div></div>';
    rows.forEach(function(r) {
      html += '<div class="fd-tr">';
      html += '<div class="fd-td"><strong>' + r.item + '</strong></div>';
      html += '<div class="fd-td">' + r.stock + '</div>';
      html += '<div class="fd-td">' + r.par + '</div>';
      html += '<div class="fd-td">' + chip(r.status, r.status === 'OK' ? 'success' : r.status === 'Low' ? 'warn' : 'danger') + '</div>';
      html += '</div>';
    });
    html += '</div>';
    return html;
  };

  MODULE_VIEWS['roster'] = function(modId, presetId, isDefault) {
    var html = isDefault ? renderHomeStatCards(presetId) : '';
    html += renderViewHeader('Team Roster', 'Active staff and skill mix', '');
    var rows = [
      { name: 'Dr. Lin Wei',     role: 'MD — Emergency',    status: 'Active',  shift: '07:00 – 19:00' },
      { name: 'Dr. Saul Patel',  role: 'MD — Internal',     status: 'Active',  shift: '07:00 – 19:00' },
      { name: 'Casey Morgan',    role: 'RN — Charge',       status: 'Active',  shift: '07:00 – 19:00' },
      { name: 'Jordan Singh',    role: 'RN',                status: 'Active',  shift: '07:00 – 19:00' },
      { name: 'Alex Carter',     role: 'Paramedic',         status: 'Off',     shift: '—' },
      { name: 'Sam Reyes',       role: 'Logistics',         status: 'Active',  shift: '07:00 – 15:00' }
    ];
    html += '<div class="fd-table">';
    html += '<div class="fd-thead"><div class="fd-th">Member</div><div class="fd-th">Role</div><div class="fd-th" style="width:100px">Status</div><div class="fd-th" style="width:160px">Shift</div></div>';
    rows.forEach(function(r) {
      html += '<div class="fd-tr">';
      html += '<div class="fd-td"><strong>' + r.name + '</strong></div>';
      html += '<div class="fd-td" style="color:var(--text-secondary)">' + r.role + '</div>';
      html += '<div class="fd-td">' + chip(r.status, r.status === 'Active' ? 'success' : 'muted') + '</div>';
      html += '<div class="fd-td">' + r.shift + '</div>';
      html += '</div>';
    });
    html += '</div>';
    return html;
  };

  MODULE_VIEWS['sync'] = function(modId, presetId, isDefault) {
    var html = isDefault ? renderHomeStatCards(presetId) : '';
    html += renderViewHeader('Sync Status', 'Offline-first data synchronization', '');
    html += '<div class="fd-card-grid">';

    html += '<div class="fd-card">';
    html += '<div class="fd-card-header"><strong>Connectivity</strong>' + chip('OFFLINE', 'warn') + '</div>';
    html += '<div style="font-size:13px;color:var(--text-secondary);margin-top:4px;">Last sync 4 minutes ago</div>';
    html += '</div>';

    html += '<div class="fd-card">';
    html += '<div class="fd-card-header"><strong>Pending records</strong>' + chip('17', 'accent') + '</div>';
    html += '<div style="font-size:13px;color:var(--text-secondary);margin-top:4px;">Encounters 9 · Vitals 5 · Notes 3</div>';
    html += '</div>';

    html += '<div class="fd-card">';
    html += '<div class="fd-card-header"><strong>Storage</strong>' + chip('OK', 'success') + '</div>';
    html += '<div style="font-size:13px;color:var(--text-secondary);margin-top:4px;">412 MB / 2 GB used</div>';
    html += '</div>';

    html += '</div>';

    html += '<div class="fd-section-label" style="margin-top:18px;">Recent sync events</div>';
    html += '<div class="fd-list">';
    [
      { type: 'attempt', time: '4 min ago', detail: 'Sync attempt failed — no signal' },
      { type: 'success', time: '23 min ago', detail: '12 records pushed, 5 received' },
      { type: 'success', time: '1h 4m ago',  detail: '8 records pushed' },
      { type: 'success', time: '2h 12m ago', detail: '3 records pushed, 14 received' }
    ].forEach(function(e) {
      html += '<div class="fd-list-item">';
      html += '<div style="width:8px;height:8px;border-radius:50%;background:' + (e.type === 'success' ? '#059669' : '#D97706') + ';"></div>';
      html += '<div style="flex:1;font-size:13px;">' + e.detail + '</div>';
      html += '<div style="color:var(--text-tertiary);font-size:12px;">' + e.time + '</div>';
      html += '</div>';
    });
    html += '</div>';
    return html;
  };

  MODULE_VIEWS['dispatch'] = function(modId, presetId, isDefault) {
    var html = isDefault ? renderHomeStatCards(presetId) : '';
    html += renderViewHeader('Dispatch', 'Team locations and active deployments', '');
    var rows = [
      { team: 'Alpha-1', members: 4, location: 'Sector 7 · Triage tent', status: 'Active' },
      { team: 'Bravo-2', members: 3, location: 'Sector 3 · Mobile clinic', status: 'En route' },
      { team: 'Charlie-3', members: 5, location: 'Forward base', status: 'Standby' }
    ];
    html += '<div class="fd-table">';
    html += '<div class="fd-thead"><div class="fd-th" style="width:120px">Team</div><div class="fd-th" style="width:110px">Members</div><div class="fd-th">Location</div><div class="fd-th" style="width:120px">Status</div></div>';
    rows.forEach(function(r) {
      html += '<div class="fd-tr">';
      html += '<div class="fd-td"><strong>' + r.team + '</strong></div>';
      html += '<div class="fd-td">' + r.members + '</div>';
      html += '<div class="fd-td" style="color:var(--text-secondary)">' + r.location + '</div>';
      html += '<div class="fd-td">' + chip(r.status, r.status === 'Active' ? 'success' : r.status === 'En route' ? 'warn' : 'muted') + '</div>';
      html += '</div>';
    });
    html += '</div>';
    return html;
  };

  MODULE_VIEWS['register'] = function(modId, presetId, isDefault) {
    var html = isDefault ? renderHomeStatCards(presetId) : '';
    html += renderViewHeader('Patient Registration', 'Rapid registration with offline support', '');
    html += '<div class="fd-card" style="max-width:520px;">';
    html += '<div class="fd-card-header"><strong>New patient</strong></div>';
    html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">';
    html += '<label class="fd-field"><span>First name</span><input class="fd-input" /></label>';
    html += '<label class="fd-field"><span>Last name</span><input class="fd-input" /></label>';
    html += '<label class="fd-field" style="grid-column:1/-1"><span>Date of birth</span><input class="fd-input" type="date" /></label>';
    html += '<label class="fd-field"><span>Sex</span><select class="fd-input"><option>—</option><option>Female</option><option>Male</option><option>Other</option></select></label>';
    html += '<label class="fd-field"><span>Triage</span><select class="fd-input"><option>Green</option><option>Yellow</option><option>Red</option></select></label>';
    html += '<label class="fd-field" style="grid-column:1/-1"><span>Chief complaint</span><textarea class="fd-input" rows="2"></textarea></label>';
    html += '</div>';
    html += '<div style="margin-top:12px;display:flex;gap:8px;justify-content:flex-end;"><button class="btn btn-outline btn-sm">Save offline</button><button class="btn btn-primary btn-sm">Register & assign</button></div>';
    html += '</div>';
    return html;
  };

  // ── Tools / Other ──

  MODULE_VIEWS['patients'] = function(modId, presetId, isDefault) {
    var html = isDefault ? renderHomeStatCards(presetId) : '';
    html += renderViewHeader('Patient List', 'All patients in system', '<input class="fd-search" placeholder="Search patients…" />');
    var rows = [
      { name: 'David Chen',      mrn: 'MRN-00482', age: 53, sex: 'M', insurer: 'Aetna' },
      { name: 'Anna Williams',   mrn: 'MRN-00481', age: 34, sex: 'F', insurer: 'BlueCross' },
      { name: 'Maria Sanchez',   mrn: 'MRN-00479', age: 41, sex: 'F', insurer: 'Cigna' },
      { name: 'Robert Johnson',  mrn: 'MRN-00475', age: 67, sex: 'M', insurer: 'Medicare' },
      { name: 'Linda Park',      mrn: 'MRN-00473', age: 50, sex: 'F', insurer: 'Aetna' },
      { name: 'James Carter',    mrn: 'MRN-00472', age: 42, sex: 'M', insurer: 'United' },
      { name: 'Sarah Mitchell',  mrn: 'MRN-00470', age: 29, sex: 'F', insurer: 'BlueCross' }
    ];
    html += '<div class="fd-table">';
    html += '<div class="fd-thead"><div class="fd-th">Name</div><div class="fd-th" style="width:120px">MRN</div><div class="fd-th" style="width:60px">Age</div><div class="fd-th" style="width:50px">Sex</div><div class="fd-th" style="width:140px">Insurer</div></div>';
    rows.forEach(function(r) {
      html += '<div class="fd-tr">';
      html += '<div class="fd-td"><strong>' + r.name + '</strong></div>';
      html += '<div class="fd-td" style="color:var(--text-secondary)">' + r.mrn + '</div>';
      html += '<div class="fd-td">' + r.age + '</div>';
      html += '<div class="fd-td">' + r.sex + '</div>';
      html += '<div class="fd-td">' + r.insurer + '</div>';
      html += '</div>';
    });
    html += '</div>';
    return html;
  };

  MODULE_VIEWS['scribe'] = function(modId, presetId, isDefault) {
    var html = isDefault ? renderHomeStatCards(presetId) : '';
    html += renderViewHeader('AI Scribe', 'AI-powered clinical documentation',
      '<button class="btn btn-primary btn-sm">● Start session</button>');
    html += '<div class="fd-card">';
    html += '<div class="fd-card-header"><strong>Recent transcripts</strong></div>';
    html += '<div class="fd-list" style="margin-top:8px;">';
    [
      { patient: 'David Chen',     date: 'Apr 28', length: '12 min', status: 'Signed' },
      { patient: 'Anna Williams',  date: 'Apr 28', length: '18 min', status: 'Draft' },
      { patient: 'Maria Sanchez',  date: 'Apr 27', length: '9 min',  status: 'Signed' }
    ].forEach(function(t) {
      html += '<div class="fd-list-item">';
      html += '<div style="flex:1"><strong>' + t.patient + '</strong>';
      html += '<div style="font-size:12px;color:var(--text-secondary);">' + t.date + ' · ' + t.length + '</div></div>';
      html += chip(t.status, t.status === 'Signed' ? 'success' : 'warn');
      html += '</div>';
    });
    html += '</div></div>';
    return html;
  };

  MODULE_VIEWS['records'] = function(modId, presetId, isDefault) {
    var html = isDefault ? renderHomeStatCards(presetId) : '';
    html += renderViewHeader('Health Records', 'Complete health record document repository', '');
    var rows = [
      { name: 'Discharge summary — Apr 24', kind: 'Note',     date: 'Apr 24, 2026' },
      { name: 'CT chest report — Apr 22',    kind: 'Imaging',  date: 'Apr 22, 2026' },
      { name: 'Cardiology consult',          kind: 'Note',     date: 'Apr 18, 2026' },
      { name: 'Lipid panel results',         kind: 'Lab',      date: 'Apr 18, 2026' },
      { name: 'Vaccination record',          kind: 'Imm',      date: 'Mar 04, 2026' }
    ];
    html += '<div class="fd-table">';
    html += '<div class="fd-thead"><div class="fd-th">Document</div><div class="fd-th" style="width:100px">Kind</div><div class="fd-th" style="width:140px">Date</div><div class="fd-th" style="width:100px"></div></div>';
    rows.forEach(function(r) {
      html += '<div class="fd-tr">';
      html += '<div class="fd-td"><strong>' + r.name + '</strong></div>';
      html += '<div class="fd-td">' + chip(r.kind, 'muted') + '</div>';
      html += '<div class="fd-td">' + r.date + '</div>';
      html += '<div class="fd-td"><button class="btn btn-outline btn-sm">View</button></div>';
      html += '</div>';
    });
    html += '</div>';
    return html;
  };

  MODULE_VIEWS['settings'] = function(modId, presetId, isDefault) {
    var preset = DEPLOYMENT_PRESETS[presetId];
    var html = isDefault ? renderHomeStatCards(presetId) : '';
    html += renderViewHeader('Settings', 'Deployment configuration and preferences',
      '<a class="btn btn-outline btn-sm" href="frontdoor-configurator.html">Open configurator →</a>');
    html += '<div class="fd-card">';
    html += '<div class="fd-card-header"><strong>Deployment</strong></div>';
    html += '<div style="display:grid;grid-template-columns:160px 1fr;gap:10px;font-size:13px;">';
    html += '<div style="color:var(--text-tertiary)">Type</div><div>' + preset.label + '</div>';
    html += '<div style="color:var(--text-tertiary)">Facility</div><div>' + preset.facilityName + '</div>';
    html += '<div style="color:var(--text-tertiary)">Header</div><div>' + preset.headerTitle + ' — ' + preset.headerSubtitle + '</div>';
    html += '<div style="color:var(--text-tertiary)">Examples</div><div style="color:var(--text-secondary)">' + preset.examples + '</div>';
    html += '</div></div>';
    return html;
  };

  // ── Generic placeholder (fallback for unimplemented modules) ──

  function renderModulePlaceholder(modId, presetId, isDefault) {
    var mod = (typeof MODULE_REGISTRY !== 'undefined' && MODULE_REGISTRY[modId]) || { label: modId, description: '', icon: 'settings' };
    var html = isDefault ? renderHomeStatCards(presetId) : '';
    html += '<div class="view-placeholder">';
    html += '<div class="vp-icon">' + fmtSvg(mod.icon, { size: 36 }) + '</div>';
    html += '<h2>' + escapeHtml(mod.label) + '</h2>';
    html += '<p>' + escapeHtml(mod.description) + '</p>';
    html += '<div class="vp-stub">Demo view — using shared placeholder. Add a render function to MODULE_VIEWS to customize.</div>';
    html += '</div>';
    return html;
  }

  // ── Public API ────────────────────────────────────────────────

  global.MODULE_VIEWS = MODULE_VIEWS;
  global.renderModuleView = function(modId, presetId, isDefault) {
    var fn = MODULE_VIEWS[modId] || renderModulePlaceholder;
    return fn(modId, presetId, !!isDefault);
  };
  global.renderModulePlaceholder = renderModulePlaceholder;
  global.renderHomeStatCards = renderHomeStatCards;
})(typeof window !== 'undefined' ? window : this);
