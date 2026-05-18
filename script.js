const skills = {
  ai: [
    ["Claude Code", "AI-assisted prototyping and implementation", "CC"],
    ["Codex", "Coding agent collaboration and iteration", "CX"],
    ["Coze", "Multi-agent workflow building", "CZ"],
    ["Dify", "Agent orchestration and AI app workflow", "DF"],
    ["Prompt Engineering", "Role, rubric, evaluation and refinement", "PE"],
    ["RAG", "Knowledge-base backed character and product logic", "RG"],
  ],
  product: [
    ["PRD", "Requirement definition and delivery specs", "PR"],
    ["User Research", "Interview, persona and scenario analysis", "UR"],
    ["Flow Design", "Interaction flow, launch rhythm and QA loop", "FL"],
    ["Localization Strategy", "Culture, context and market adaptation", "LS"],
    ["Content Safety", "Badcase analysis and evaluation set design", "CS"],
    ["Prototype Building", "Fast validation with AI-native tooling", "PB"],
  ],
  data: [
    ["SQL", "Basic query and structured data thinking", "SQL"],
    ["Python", "Analysis scripts and automation basics", "PY"],
    ["Power BI", "Dashboard and business data presentation", "BI"],
    ["QGIS", "Spatial data and map-based visualization", "QG"],
    ["AntConc", "Corpus analysis and frequency patterns", "AC"],
    ["Voyant", "Text visualization and corpus exploration", "VY"],
  ],
  language: [
    ["Spanish", "DELE C1 / TEM-8 excellent", "ES"],
    ["English", "CET-4 / CET-6, product communication", "EN"],
    ["Chinese", "Native, product writing and research", "ZH"],
    ["Latin America Context", "UGC, safety and cultural sensitivity", "LA"],
    ["Europe Context", "Study and life experience in Spain", "EU"],
    ["Multilingual Content", "Tri-lingual creation and localization judgment", "MC"],
  ],
  tools: [
    ["Figma", "Interface sketches and product communication", "FG"],
    ["Notion", "Portfolio, documentation and knowledge base", "NT"],
    ["Excel", "Data cleaning and lightweight analysis", "EX"],
    ["PowerPoint", "Narrative deck and stakeholder communication", "PP"],
    ["XML / RDF / OWL", "Digital humanities and semantic data basics", "XO"],
    ["Tableau", "Data exploration and visual storytelling", "TB"],
  ],
};

const grid = document.querySelector("#skill-grid");
const tabs = document.querySelectorAll(".skill-tab");

function renderSkills(category) {
  grid.innerHTML = skills[category]
    .map(
      ([name, description, icon]) => `
        <article class="skill-card">
          <span class="skill-icon">${icon}</span>
          <div>
            <strong>${name}</strong>
            <span>${description}</span>
          </div>
        </article>
      `,
    )
    .join("");
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    renderSkills(tab.dataset.skill);
  });
});

renderSkills("ai");

if (window.lucide) {
  window.lucide.createIcons();
}

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
  try {
    localStorage.setItem("site-lang", lang);
  } catch (e) {
    /* localStorage may be unavailable */
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
