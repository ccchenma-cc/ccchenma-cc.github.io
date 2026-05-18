/* ============================================================
   SKILL GROUPS — rendered as flat pills, grouped by category
   ============================================================ */

const skillGroups = [
  {
    zh: "AI / Agent",
    en: "AI / Agent",
    items: ["Claude Code", "Codex", "Coze", "Dify", "Prompt Engineering", "RAG"],
  },
  {
    zh: "产品 / Product",
    en: "Product",
    items: ["PRD", "User Research", "Flow Design", "Localization Strategy", "Content Safety", "Prototype Building"],
  },
  {
    zh: "数据 / Data",
    en: "Data",
    items: ["SQL", "Python", "Power BI", "QGIS", "AntConc", "Voyant"],
  },
  {
    zh: "语言 / Language",
    en: "Language",
    items: ["Spanish (DELE C1 · TEM-8)", "English (CET-6)", "Chinese (Native)", "LATAM Context", "EU Context"],
  },
  {
    zh: "工具 / Tools",
    en: "Tools",
    items: ["Figma", "Notion", "Excel", "PowerPoint", "Tableau", "XML / RDF / OWL"],
  },
];

function renderSkillGroups(lang) {
  const root = document.querySelector("#skill-groups");
  if (!root) return;
  root.innerHTML = skillGroups
    .map(
      (group) => `
        <div class="skill-group">
          <p class="skill-group-name">${group[lang] || group.en}</p>
          <div class="skill-pills">
            ${group.items.map((item) => `<span class="skill-pill">${item}</span>`).join("")}
          </div>
        </div>
      `,
    )
    .join("");
}

/* ============================================================
   I18N — collect [data-en] elements, swap textContent on toggle
   ============================================================ */

const i18nElements = document.querySelectorAll("[data-en]");
i18nElements.forEach((el) => {
  el.dataset.zh = el.textContent.trim();
});

function setLang(lang) {
  document.documentElement.dataset.lang = lang;
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  i18nElements.forEach((el) => {
    const next = el.dataset[lang];
    if (next) el.textContent = next;
  });
  renderSkillGroups(lang);
  try {
    localStorage.setItem("site-lang", lang);
  } catch (e) {
    /* localStorage unavailable */
  }
}

const savedLang = (() => {
  try {
    return localStorage.getItem("site-lang");
  } catch (e) {
    return null;
  }
})();

setLang(savedLang === "en" ? "en" : "zh");

const langToggle = document.querySelector(".lang-toggle");
if (langToggle) {
  langToggle.addEventListener("click", () => {
    const current = document.documentElement.dataset.lang || "zh";
    setLang(current === "zh" ? "en" : "zh");
  });
}

/* ============================================================
   LUCIDE ICONS
   ============================================================ */

if (window.lucide) {
  window.lucide.createIcons();
}

/* ============================================================
   SCROLL REVEAL — fade up on entering viewport
   ============================================================ */

(function initReveal() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const targets = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // small stagger when multiple siblings enter together
          const delay = Math.min(index * 60, 240);
          entry.target.style.transitionDelay = `${delay}ms`;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -8% 0px",
    },
  );

  targets.forEach((el) => observer.observe(el));
})();
