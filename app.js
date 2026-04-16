/* ========================================================================
   Study Notes — Application Logic
   ======================================================================== */

// ===========================================
// SUBJECT DATA
// ===========================================
const SUBJECTS = {
  lld: {
    name: 'Low-Level Design',
    short: 'LLD',
    description: 'OOP · SOLID · 11 Design Patterns · UML · 300 MCQs · Master Cheatsheet — Coder Army examples',
    basePath: 'LLD/',
    compilerUrl: 'https://onecompiler.com/java',
    compilerLabel: 'Open Java Compiler',
    floatLabel: 'Try in Java Compiler',
    tag: 'JAVA',
    tagClass: 'java',
    tree: [
      { phase: "⚡ Master Cheatsheet — Quick Revision", files: [
        "MASTER_CHEATSHEET.md",
      ]},
      { phase: "Phase 1: OOP Fundamentals", files: [
        "OOP/OOP_NOTES.md", "OOP/OOP_Viva_Questions.md", "OOP/OOP_MCQ_Quiz.md", "OOP/OOP_Coding_Exam.md",
        { path: "Practice_Problems/01_OOP/Problem1_LibrarySystem/PROBLEM.md", solve: true },
        { path: "Practice_Problems/01_OOP/Problem2_VehicleFleet/PROBLEM.md", solve: true },
      ]},
      { phase: "Phase 2: Immutable Classes", files: [
        "OOP/Immutable_Classes.md", "Teacher_PDF_Practice/Creational/Immutable_Classes_Practice.md",
        { path: "Practice_Problems/02_Immutability/Problem1_MovieTicket/PROBLEM.md", solve: true },
      ]},
      { phase: "Phase 3: SOLID Principles", files: [
        "SOLID/SOLID_NOTES.md", "SOLID/SOLID_Viva_Questions.md", "SOLID/SOLID_MCQ_Quiz.md", "SOLID/SOLID_Coding_Exam.md",
        { path: "Practice_Problems/03_SOLID/Problem1_NotificationRefactor/PROBLEM.md", solve: true },
        { path: "Practice_Problems/03_SOLID/Problem2_FileExporter/PROBLEM.md", solve: true },
      ]},
      { phase: "⚡ Quick Start — Cheat Sheet & Overview", files: [
        "Design_Patterns/CHEAT_SHEET.md",
        "Design_Patterns/Design_Patterns_Overview.md",
      ]},
      { phase: "Phase 4: Design Patterns Overview", files: [
        "Design_Patterns/Design_Patterns_Overview.md",
      ]},
      { phase: "Phase 5: Creational Patterns", files: [
        "Design_Patterns/Singleton.md", "Teacher_PDF_Practice/Creational/Singleton_Practice.md",
        { path: "Practice_Problems/04_Creational/Problem1_Singleton_AppConfig/PROBLEM.md", solve: true },
        "Design_Patterns/Factory.md", "Teacher_PDF_Practice/Creational/Factory_Practice.md",
        "Design_Patterns/Builder.md", "Teacher_PDF_Practice/Creational/Builder_Practice.md",
        { path: "Practice_Problems/04_Creational/Problem2_Factory_DocumentCreator/PROBLEM.md", solve: true },
        { path: "Practice_Problems/04_Creational/Problem3_Builder_HttpRequest/PROBLEM.md", solve: true },
        "Design_Patterns/Prototype.md", "Teacher_PDF_Practice/Creational/Prototype_Practice.md",
        { path: "Practice_Problems/04_Creational/Problem4_Prototype_UITheme/PROBLEM.md", solve: true },
      ]},
      { phase: "Phase 6: Structural Patterns", files: [
        "Design_Patterns/Flyweight.md", "Design_Patterns/Proxy.md",
        "Design_Patterns/Adapter.md", "Teacher_PDF_Practice/Structural/Adapter_Practice.md",
        { path: "Practice_Problems/05_Structural/Problem1_Adapter_WeatherService/PROBLEM.md", solve: true },
        "Design_Patterns/Decorator.md", "Teacher_PDF_Practice/Structural/Decorator_Practice.md",
        { path: "Practice_Problems/05_Structural/Problem2_Decorator_Logger/PROBLEM.md", solve: true },
      ]},
      { phase: "Phase 7: Behavioral Patterns", files: [
        "Design_Patterns/Strategy.md", "Teacher_PDF_Practice/Behavioral/Strategy_Practice.md",
        { path: "Practice_Problems/06_Behavioral/Problem1_Strategy_Compression/PROBLEM.md", solve: true },
        "Design_Patterns/Observer.md",
      ]},
      { phase: "Phase 8: UML Diagrams", files: [ "OOP/UML_Diagrams.md" ]},
      { phase: "🎯 Phase 9: Final Revision + 300 MCQs", files: [
        "MASTER_CHEATSHEET.md",
        "Design_Patterns/CHEAT_SHEET.md",
        "Design_Patterns/MASTER_MCQ.md",
        "OOP/OOP_MCQ_Quiz.md", "SOLID/SOLID_MCQ_Quiz.md",
        "Teacher_PDF_Practice/Creational/Singleton_Practice.md", "Teacher_PDF_Practice/Creational/Factory_Practice.md",
        "Teacher_PDF_Practice/Creational/Builder_Practice.md", "Teacher_PDF_Practice/Creational/Prototype_Practice.md",
        "Teacher_PDF_Practice/Structural/Adapter_Practice.md", "Teacher_PDF_Practice/Structural/Decorator_Practice.md",
        "Teacher_PDF_Practice/Behavioral/Strategy_Practice.md",
        "Design_Patterns/Flyweight.md", "Design_Patterns/Proxy.md", "Design_Patterns/Observer.md",
        "Design_Patterns/Design_Patterns_Overview.md",
      ]},
      { phase: "Study Order", files: [ "STUDY_ORDER.md" ]},
      { phase: "Assignments", files: [
        "Assignments/01_Singleton_FileConfig.md",
        "Assignments/02_Singleton_Pool.md",
        "Assignments/03_Builder_Message.md",
        "Assignments/04_Builder_Config.md",
        "Assignments/05_Factory_Audio.md",
        "Assignments/06_Prototype_User.md",
        "Assignments/07_Prototype_Config.md",
        "Assignments/08_Flyweight_Graphic.md",
        "Assignments/09_Decorator_API.md",
      ]},
    ]
  },
  js: {
    name: 'JavaScript',
    short: 'JS',
    description: 'Functional Programming using JS — End Term April 2026',
    basePath: 'JS/',
    compilerUrl: 'https://onecompiler.com/javascript',
    compilerLabel: 'Open JS Console',
    floatLabel: 'Try in JS Console',
    tag: 'JAVASCRIPT',
    tagClass: 'js',
    tree: [
      { phase: "Module 1: OOP in JavaScript", files: [
        "Exam/01-this-keyword.md",
        "Exam/02-constructors-prototypes.md",
        "Exam/03-classes-oop.md",
      ]},
      { phase: "Module 2: Function Mastery & Functional JS", files: [
        "Exam/04-call-apply-bind.md",
        "Exam/05-hof-array-polyfills.md",
        "Exam/06-closures-scope-currying.md",
      ]},
      { phase: "Module 3: Asynchronous JavaScript", files: [
        "Exam/07-promises.md",
        "Exam/08-event-loop.md",
        "Exam/09-async-patterns.md",
      ]},
      { phase: "Module 4: Performance & Optimization", files: [
        "Exam/10-debounce-throttle.md",
        "Exam/11-memory-management.md",
        "Exam/12-clone-equality-immutability.md",
        "Exam/13-memoization-caching-lru.md",
        "Exam/14-js-weird-parts.md",
      ]},
      { phase: "Coding Practice", files: [
        "Contest_Practice-1.md",
        "practiceSheet.md",
      ]},
      { phase: "Quick Reference & Study Order", files: [
        "notes.md",
        "STUDY_ORDER.md",
      ]},
    ]
  },
  dsa: {
    name: 'Data Structures & Algorithms',
    short: 'DSA',
    description: "DSA IV · End Term 17 April 2026 — DP · Graphs · Shortest Paths · MST · Segment Trees · Number Theory · String Matching",
    basePath: 'DSA/',
    compilerUrl: 'https://onecompiler.com/cpp',
    compilerLabel: 'Open C++ Compiler',
    floatLabel: 'Try in C++ Compiler',
    tag: 'C++',
    tagClass: 'dsa',
    tree: [
      { phase: "⚡ Exam-Eve Cheatsheet", files: [
        "Revision/Cheatsheet.md",
        "Revision/STUDY_ORDER.md",
      ]},
      { phase: "Phase 1: Dynamic Programming", files: [
        "Revision/Topics/01_Dynamic_Programming.md",
        { path: "Revision/Assignments/01_Matrix_Chain_Multiplication.md", solve: true },
        { path: "Revision/Assignments/02_Unique_BSTs_II.md", solve: true },
      ]},
      { phase: "Phase 2: Graphs — Traversals", files: [
        "Revision/Topics/02_Graph_Basics.md",
        "Graph_Study_Plan.md",
      ]},
      { phase: "Phase 3: Shortest Paths", files: [
        "Revision/Topics/03_Shortest_Paths.md",
      ]},
      { phase: "Phase 4: Minimum Spanning Tree", files: [
        "Revision/Topics/04_Minimum_Spanning_Tree.md",
      ]},
      { phase: "Phase 5: Segment Trees", files: [
        "Revision/Topics/05_Segment_Trees.md",
        { path: "Revision/Assignments/03_Range_Minimum_Query.md", solve: true },
      ]},
      { phase: "Phase 6: TreeSet & TreeMap", files: [
        "Revision/Topics/06_TreeSet_TreeMap.md",
      ]},
      { phase: "Phase 7: Number Theory", files: [
        "Revision/Topics/07_Number_Theory.md",
      ]},
      { phase: "Phase 8: String Matching", files: [
        "Revision/Topics/08_String_Matching.md",
      ]},
      { phase: "🎯 Assignment Revision", files: [
        "Revision/Assignments/INDEX.md",
        { path: "Revision/Assignments/01_Matrix_Chain_Multiplication.md", solve: true },
        { path: "Revision/Assignments/02_Unique_BSTs_II.md", solve: true },
        { path: "Revision/Assignments/03_Range_Minimum_Query.md", solve: true },
      ]},
    ]
  },
  handbook: {
    name: 'Exam Handbook',
    short: 'Handbook',
    description: "SST Batch'28 End Term — April 2026 · Schedule, syllabus, exam rules",
    basePath: '',
    compilerUrl: '',
    compilerLabel: '',
    floatLabel: '',
    tag: 'HANDBOOK',
    tagClass: 'handbook',
    tree: [
      { phase: "End Term April 2026", files: [
        "Exam Handbook Batch'28 End Term April 2026.md",
      ]},
      { phase: "How to Teach Me", files: [
        "HOW_TO_TEACH_ME.md",
      ]},
    ]
  }
};

// ===========================================
// STATE
// ===========================================
let currentSubject = null;
let currentFilePath = null;
let allLinks = [];
let tocEntries = [];
let saveTimer = null;

// ===========================================
// DOM REFS
// ===========================================
const $ = id => document.getElementById(id);
const contentEl = $('content');
const tocEl = $('toc');
const tocLinksEl = $('toc-links');
const sidebarEl = $('sidebar');
const overlayEl = $('sidebar-overlay');
const searchInput = $('search-input');
const fileTreeEl = $('file-tree');
const breadcrumbEl = $('breadcrumb');
const progressEl = $('progress-text');
const compilerBtnEl = $('compiler-btn');
const tryItFloatEl = $('try-it-float');

// ===========================================
// LOCALSTORAGE
// ===========================================
function getPositions(subject) {
  try {
    const all = JSON.parse(localStorage.getItem('study_positions') || '{}');
    return all[subject] || {};
  } catch { return {}; }
}
function savePosition(subject, path, scrollTop) {
  try {
    const all = JSON.parse(localStorage.getItem('study_positions') || '{}');
    if (!all[subject]) all[subject] = {};
    all[subject][path] = scrollTop;
    localStorage.setItem('study_positions', JSON.stringify(all));
  } catch {}
}
function getPosition(subject, path) {
  return getPositions(subject)[path] || 0;
}
function getVisitedFiles(subject) {
  return new Set(Object.keys(getPositions(subject)));
}

// Migrate old lld_positions from previous version
(function migrate() {
  try {
    const old = localStorage.getItem('lld_positions');
    if (old && !localStorage.getItem('study_positions_migrated')) {
      const parsed = JSON.parse(old);
      const all = JSON.parse(localStorage.getItem('study_positions') || '{}');
      all.lld = { ...parsed, ...(all.lld || {}) };
      localStorage.setItem('study_positions', JSON.stringify(all));
      localStorage.setItem('study_positions_migrated', '1');
    }
  } catch {}
})();

// ===========================================
// HOME VIEW
// ===========================================
function buildHomeCards() {
  const grid = $('subject-grid');
  grid.innerHTML = '';
  for (const [key, subj] of Object.entries(SUBJECTS)) {
    const fileCount = subj.tree.reduce((n, g) => n + g.files.length, 0);
    const phaseCount = subj.tree.length;
    const card = document.createElement('a');
    card.className = 'subject-card';
    card.href = '#/' + key;
    card.innerHTML =
      '<div class="card-tag ' + subj.tagClass + '">' + subj.tag + '</div>' +
      '<h3>' + subj.name + '</h3>' +
      '<p class="card-desc">' + subj.description + '</p>' +
      '<div class="card-meta"><span>' + fileCount + ' files</span> &middot; ' + phaseCount + ' sections</div>';
    grid.appendChild(card);
  }
}
buildHomeCards();

// ===========================================
// SIDEBAR
// ===========================================
function buildSidebar(subjectKey) {
  const subj = SUBJECTS[subjectKey];
  $('sidebar-title').textContent = subj.short + ' Notes';
  // Hide compiler buttons if subject has no compiler (e.g., Handbook)
  if (subj.compilerUrl) {
    compilerBtnEl.href = subj.compilerUrl;
    compilerBtnEl.textContent = subj.compilerLabel;
    compilerBtnEl.style.display = '';
    tryItFloatEl.href = subj.compilerUrl;
    tryItFloatEl.textContent = subj.floatLabel;
    tryItFloatEl.style.display = '';
  } else {
    compilerBtnEl.style.display = 'none';
    tryItFloatEl.style.display = 'none';
  }

  fileTreeEl.innerHTML = '';
  allLinks = [];
  const visited = getVisitedFiles(subjectKey);

  subj.tree.forEach(function(group, gi) {
    var div = document.createElement('div');
    div.className = 'phase' + (gi === 0 ? ' open' : '');

    var title = document.createElement('div');
    title.className = 'phase-title';
    title.textContent = group.phase;
    title.onclick = function() { div.classList.toggle('open'); };
    div.appendChild(title);

    var items = document.createElement('div');
    items.className = 'phase-items';

    group.files.forEach(function(f) {
      var path = typeof f === 'string' ? f : f.path;
      var isSolve = typeof f === 'object' && f.solve;
      var a = document.createElement('a');
      a.className = 'file-link' + (isSolve ? ' solve' : '');
      a.href = '#/' + subjectKey + '/' + path;

      var dot = visited.has(path) ? '<span class="resume-dot" title="Resume reading"></span>' : '';
      a.innerHTML = dot + (isSolve ? '[SOLVE] ' : '') + path.split('/').pop().replace('.md', '');
      a.dataset.path = path;

      a.addEventListener('click', function() { closeSidebar(); });

      items.appendChild(a);
      allLinks.push({ el: a, path: path, name: path.toLowerCase() });
    });

    div.appendChild(items);
    fileTreeEl.appendChild(div);
  });

  searchInput.value = '';
}

// Search
searchInput.addEventListener('input', function() {
  var q = this.value.toLowerCase();
  allLinks.forEach(function(l) { l.el.style.display = l.name.includes(q) ? '' : 'none'; });
  if (q) document.querySelectorAll('.phase').forEach(function(p) { p.classList.add('open'); });
});

// ===========================================
// SIDEBAR MOBILE
// ===========================================
function openSidebar() {
  sidebarEl.classList.add('open');
  overlayEl.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeSidebar() {
  sidebarEl.classList.remove('open');
  overlayEl.classList.remove('open');
  document.body.style.overflow = '';
}
$('menu-btn').addEventListener('click', function() {
  sidebarEl.classList.contains('open') ? closeSidebar() : openSidebar();
});
overlayEl.addEventListener('click', closeSidebar);

// ===========================================
// BREADCRUMB
// ===========================================
function updateBreadcrumb() {
  var html = '<a href="#/">Home</a>';
  if (currentSubject) {
    var subj = SUBJECTS[currentSubject];
    html += '<span class="bc-sep"> / </span>';
    html += '<a href="#/' + currentSubject + '">' + subj.short + '</a>';
  }
  if (currentFilePath) {
    var name = currentFilePath.split('/').pop();
    html += '<span class="bc-sep"> / </span>';
    html += '<span class="bc-current" title="' + currentFilePath + '">' + name + '</span>';
  }
  breadcrumbEl.innerHTML = html;
}

// ===========================================
// TITLE
// ===========================================
function updateTitle() {
  var parts = ['Study Notes'];
  if (currentSubject) parts.unshift(SUBJECTS[currentSubject].short);
  if (currentFilePath) parts.unshift(currentFilePath.split('/').pop().replace('.md', ''));
  document.title = parts.join(' - ');
}

// ===========================================
// PROGRESS
// ===========================================
function updateProgress() {
  if (!currentFilePath) { progressEl.textContent = ''; return; }
  var sh = contentEl.scrollHeight - contentEl.clientHeight;
  if (sh <= 0) { progressEl.textContent = '100%'; return; }
  var pct = Math.min(100, Math.round((contentEl.scrollTop / sh) * 100));
  progressEl.textContent = pct + '%';
}

// ===========================================
// TOC
// ===========================================
function buildToc() {
  tocLinksEl.innerHTML = '';
  tocEntries = [];
  var headings = contentEl.querySelectorAll('h1, h2, h3, h4');
  if (headings.length < 2) {
    tocEl.classList.remove('visible');
    document.body.classList.remove('toc-visible');
    return;
  }

  tocEl.classList.add('visible');
  document.body.classList.add('toc-visible');

  headings.forEach(function(h, i) {
    if (!h.id) h.id = 'heading-' + i;
    var level = h.tagName.toLowerCase();
    var a = document.createElement('a');
    a.className = 'toc-' + level;
    a.textContent = h.textContent;
    a.onclick = function(e) {
      e.preventDefault();
      contentEl.scrollTo({ top: h.offsetTop - 20, behavior: 'smooth' });
    };
    tocLinksEl.appendChild(a);
    tocEntries.push({ link: a, target: h });
  });
}

function updateTocHighlight() {
  if (!tocEntries.length) return;
  var scrollTop = contentEl.scrollTop + 60;
  var active = tocEntries[0];
  for (var i = 0; i < tocEntries.length; i++) {
    if (tocEntries[i].target.offsetTop <= scrollTop) active = tocEntries[i];
  }
  tocEntries.forEach(function(e) { e.link.classList.remove('active'); });
  if (active) active.link.classList.add('active');
}

// ===========================================
// SCROLL EVENTS
// ===========================================
contentEl.addEventListener('scroll', function() {
  if (!currentFilePath || !currentSubject) return;
  clearTimeout(saveTimer);
  saveTimer = setTimeout(function() {
    savePosition(currentSubject, currentFilePath, contentEl.scrollTop);
    updateProgress();
  }, 300);
  updateTocHighlight();
});

// ===========================================
// MARKED CONFIG
// ===========================================
if (typeof marked !== 'undefined') {
  marked.use({ gfm: true, breaks: false });
}

function renderMarkdown(text) {
  if (typeof marked !== 'undefined' && marked.parse) {
    return marked.parse(text);
  }
  // Minimal fallback if CDN fails
  return '<pre style="white-space:pre-wrap">' + text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') + '</pre>';
}

// ===========================================
// FILE LOADING
// ===========================================
async function loadFile(subjectKey, filePath) {
  if (currentFilePath && currentSubject) {
    savePosition(currentSubject, currentFilePath, contentEl.scrollTop);
  }

  currentFilePath = filePath;
  updateBreadcrumb();
  updateTitle();

  // Highlight active link in sidebar
  document.querySelectorAll('.file-link').forEach(function(a) { a.classList.remove('active'); });
  var activeLink = allLinks.find(function(l) { return l.path === filePath; });
  if (activeLink) {
    activeLink.el.classList.add('active');
    var phase = activeLink.el.closest('.phase');
    if (phase) phase.classList.add('open');
  }

  var subj = SUBJECTS[subjectKey];
  var fetchPath = subj.basePath + filePath;

  try {
    var resp = await fetch(encodeURI(fetchPath));
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    var md = await resp.text();

    var html = renderMarkdown(md);

    // Wrap tables for responsive horizontal scrolling
    html = html.replace(/<table(?=[\s>])/g, '<div class="table-wrap"><table');
    html = html.replace(/<\/table>/g, '</table></div>');

    contentEl.innerHTML = '<div class="md">' + html + '</div>';

    // Syntax highlight all code blocks
    if (typeof hljs !== 'undefined') {
      contentEl.querySelectorAll('pre code').forEach(function(el) {
        hljs.highlightElement(el);
      });
    }

    buildToc();

    // Restore saved scroll position
    var saved = getPosition(subjectKey, filePath);
    contentEl.scrollTop = saved > 0 ? saved : 0;

    // Add resume dot if not present
    if (activeLink && !activeLink.el.querySelector('.resume-dot')) {
      var dot = document.createElement('span');
      dot.className = 'resume-dot';
      dot.title = 'Resume reading';
      activeLink.el.prepend(dot);
    }

    updateProgress();
    setTimeout(updateTocHighlight, 50);
  } catch (e) {
    contentEl.innerHTML = '<div class="md"><h2>Could not load file</h2><p>' + fetchPath + '</p><p style="color:var(--red);">' + e.message + '</p></div>';
    tocEl.classList.remove('visible');
    document.body.classList.remove('toc-visible');
    progressEl.textContent = '';
  }
}

function showWelcome(subjectKey) {
  currentFilePath = null;
  var subj = SUBJECTS[subjectKey];
  contentEl.innerHTML = '<div id="welcome"><h1>' + subj.name + ' Study Notes</h1><p>Pick a file from the sidebar to start reading.</p></div>';
  tocEl.classList.remove('visible');
  document.body.classList.remove('toc-visible');
  progressEl.textContent = '';
  document.querySelectorAll('.file-link').forEach(function(a) { a.classList.remove('active'); });
  updateBreadcrumb();
  updateTitle();
}

// ===========================================
// CONTENT LINK INTERCEPTION
// ===========================================
contentEl.addEventListener('click', function(e) {
  var link = e.target.closest('a');
  if (!link) return;
  var href = link.getAttribute('href');
  if (!href) return;

  // External links open normally
  if (href.startsWith('http://') || href.startsWith('https://')) return;

  // Anchor links within page
  if (href.startsWith('#') && !href.startsWith('#/')) {
    e.preventDefault();
    var id = href.slice(1);
    var target = document.getElementById(id);
    if (target) contentEl.scrollTo({ top: target.offsetTop - 20, behavior: 'smooth' });
    return;
  }

  // Internal .md file links
  if (href.endsWith('.md') || href.includes('.md#')) {
    e.preventDefault();
    var parts = href.split('#');
    var filePart = parts[0];
    if (!filePart) return;

    var basePath = currentFilePath ? currentFilePath.split('/').slice(0, -1).join('/') : '';
    var resolved;
    if (filePart.startsWith('/')) {
      resolved = filePart.slice(1);
    } else {
      resolved = basePath ? basePath + '/' + filePart : filePart;
    }

    // Normalize path (resolve ../ and ./)
    var segments = resolved.split('/');
    var normalized = [];
    for (var i = 0; i < segments.length; i++) {
      if (segments[i] === '..') normalized.pop();
      else if (segments[i] !== '.' && segments[i] !== '') normalized.push(segments[i]);
    }
    location.hash = '#/' + currentSubject + '/' + normalized.join('/');
  }
});

// ===========================================
// VIEW SWITCHING
// ===========================================
function showHome() {
  if (currentFilePath && currentSubject) {
    savePosition(currentSubject, currentFilePath, contentEl.scrollTop);
  }
  currentSubject = null;
  currentFilePath = null;
  document.body.className = 'view-home';
  closeSidebar();
  document.title = 'Study Notes';
}

function showSubject(subjectKey) {
  if (currentSubject === subjectKey) return;

  if (currentFilePath && currentSubject) {
    savePosition(currentSubject, currentFilePath, contentEl.scrollTop);
  }

  currentSubject = subjectKey;
  currentFilePath = null;
  document.body.className = 'view-subject';

  buildSidebar(subjectKey);
  showWelcome(subjectKey);
}

// ===========================================
// ROUTER
// ===========================================
function handleRoute() {
  var hash = location.hash || '#/';
  var raw = hash.startsWith('#/') ? hash.slice(2) : hash.slice(1);
  // Decode URI components in case spaces/special chars got encoded by browser
  try { raw = decodeURIComponent(raw); } catch (e) {}
  var parts = raw.split('/').filter(Boolean);

  if (parts.length === 0) {
    showHome();
    return;
  }

  var subjectKey = parts[0];
  if (!SUBJECTS[subjectKey]) {
    showHome();
    return;
  }

  var filePath = parts.slice(1).join('/');

  if (currentSubject !== subjectKey) {
    showSubject(subjectKey);
  }

  if (filePath) {
    loadFile(subjectKey, filePath);
  } else if (currentFilePath) {
    showWelcome(subjectKey);
  }
}

window.addEventListener('hashchange', handleRoute);
window.addEventListener('load', handleRoute);

// Save on unload
window.addEventListener('beforeunload', function() {
  if (currentSubject && currentFilePath) {
    savePosition(currentSubject, currentFilePath, contentEl.scrollTop);
  }
});

// ===========================================
// KEYBOARD SHORTCUTS
// ===========================================
document.addEventListener('keydown', function(e) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    if (currentSubject) {
      if (window.innerWidth <= 768) openSidebar();
      searchInput.focus();
    }
  }
  if (e.key === 'Escape') closeSidebar();
});
