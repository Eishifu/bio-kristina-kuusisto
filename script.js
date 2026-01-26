// État courant
let currentPage = 'home';
let translations = {};
let navVisibility = true;
const navPanel =  document.querySelector('.nav-panel');
const toggleNav =  document.getElementById('toogle-nav');
const mediaQuery = window.matchMedia('(min-width: 780px)'); // @media 

// Language
async function setLanguage(lang) {
    // retrieve translation 
    const response = await fetch(`src/json/${lang}.json`); 
    translations = await response.json();

    // save current language
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;

    // apply language
    applyLanguage()
    loadPage(currentPage);
    buttonStyleSelectedLanguage(lang)
}
function getTranslation(path) {
    return path.split(".").reduce((obj, key) => {
        return obj && obj[key];
    }, translations);
}
function applyLanguage() {
    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.getAttribute("data-i18n");
        element.textContent = getTranslation(key);
    });
}

function buttonStyleSelectedLanguage(lang) {
    document.querySelectorAll(".lang-switch img").forEach(p => {
        p.classList.toggle(
            "active",
            p.dataset.lang === lang
        );
    });
}

// navi visibility
function toogleNavVisibility() {
    navVisibility = !navVisibility
    navPanel.classList.toggle('closed', !navVisibility);
    toggleNav.classList.toggle('closed', !navVisibility);
}

function updateActiveNav(page) {
    document.querySelectorAll(".page-selector").forEach(btn => {
        btn.classList.toggle(
            "active",
            btn.dataset.page === page
        );
    });
}

function reopenOnResize(e) {
  if (e.matches) {
    navVisibility = true
    navPanel.classList.remove('closed');
    toggleNav.classList.remove('closed');
  }
}
mediaQuery.addEventListener('change', reopenOnResize); // écoute les changements


// Virtual Page loading
function loadPage(page) {
    document.querySelectorAll(".page").forEach(p => {
        p.classList.remove("active");
    });
    document.getElementById(page).classList.add("active");

    localStorage.setItem("page", page);
    currentPage = page

    updateActiveNav(page)
}

// Theme switching
const toggle = document.getElementById('theme-toggle');

toggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('theme-dark');
    setTheme( isDark ? 'theme-dark' : 'theme-light')
});

function setTheme(themeName) {
    document.body.className = themeName;
    localStorage.setItem("theme", themeName);
}


// exécution initiale

const savedTheme = localStorage.getItem("theme")|| "theme-dark";
const savedLang = localStorage.getItem("lang") || "fr";
const savedPage = localStorage.getItem("page") || "home";
setTheme(savedTheme)
setLanguage(savedLang); // langue par défaut au chargement
loadPage(savedPage);
handleResize(mediaQuery);
