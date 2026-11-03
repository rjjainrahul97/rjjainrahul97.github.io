document.documentElement.classList.add("js");

// Header rule appears once the page scrolls
const bar = document.querySelector(".bar");
const onScroll = () => bar.classList.toggle("scrolled", window.scrollY > 8);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Highlight the nav link for the section in view
const navLinks = [...document.querySelectorAll(".bar nav a")];
const sections = navLinks
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

const navObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            navLinks.forEach((a) => {
                const match = a.getAttribute("href") === "#" + entry.target.id;
                if (match) a.setAttribute("aria-current", "true");
                else a.removeAttribute("aria-current");
                // Scroll only the nav row sideways; never touch the page scroll
                const row = a.parentElement;
                if (match && row.scrollWidth > row.clientWidth) {
                    const r = row.getBoundingClientRect();
                    const l = a.getBoundingClientRect();
                    row.scrollLeft += l.left - r.left - (r.width - l.width) / 2;
                }
            });
        });
    },
    { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((s) => navObserver.observe(s));

// Case filters
const filterButtons = [...document.querySelectorAll("[data-filter]")];
const cases = [...document.querySelectorAll(".case")];
const empty = document.querySelector(".empty");

function applyFilter(filter) {
    let shown = 0;
    cases.forEach((c) => {
        const match = filter === "all" || c.dataset.tags.split(" ").includes(filter);
        c.hidden = !match;
        if (match) shown += 1;
    });
    document.querySelectorAll(".filters [data-filter]").forEach((b) => {
        b.setAttribute("aria-pressed", String(b.dataset.filter === filter));
    });
    empty.hidden = shown > 0;
}

filterButtons.forEach((b) => b.addEventListener("click", () => applyFilter(b.dataset.filter)));

// A result row opens its case
document.querySelectorAll(".shift-list a").forEach((link) => {
    link.addEventListener("click", () => {
        const target = document.querySelector(link.getAttribute("href"));
        if (!target) return;
        applyFilter("all");
        target.open = true;
    });
});

// Reveal the "after" values once, as the results band enters view
const rows = document.querySelectorAll(".shift-list li");
const rowObserver = new IntersectionObserver(
    (entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in");
                obs.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.6 }
);
rows.forEach((r) => rowObserver.observe(r));

// "Where is growth stuck?" diagnostic
const patterns = {
    complexity: {
        name: "The commercial model grew by exception",
        cause: "Every new partner type, deal or region added a plan, and nobody pruned. Complexity now costs more than it earns, and people stop trusting their payouts.",
        start: "Map each plan to the behaviour it pays for, then merge the ones that pay for the same thing.",
        caseId: "case-incentives",
        caseLabel: "Partner incentives redesign: 68% fewer plans",
        weights: { incent: 2, paid: 2, system: 1, quote: 1 }
    },
    gtm: {
        name: "Growth outran the go-to-market engine",
        cause: "Pre-sales runs on heroics. Offers, pricing and approvals get rebuilt for each deal, so speed falls as volume rises.",
        start: "Package the handful of offers that win most often, with pricing everyone can find in one place.",
        caseId: "case-cloud",
        caseLabel: "Cloud GTM control tower: RFPs from 2 months to 4 days",
        weights: { rfp: 2, custom: 2, quote: 1 }
    },
    process: {
        name: "The process lives in people's heads",
        cause: "Each team improvises its own version, so work stalls at handoffs. A new system would only automate the mess.",
        start: "Write down every scenario and its owner before anyone configures a tool.",
        caseId: "case-payments",
        caseLabel: "Payments standardisation across 480 sites",
        weights: { handoff: 2, regions: 1, system: 2 }
    },
    visibility: {
        name: "Leaders are flying blind",
        cause: "Data has no single owner, so reports compete, trust drops and meetings turn into debates about numbers.",
        start: "Give each number one owner and one source, then build the dashboard around the decisions leaders make each week.",
        caseId: "case-cloud",
        caseLabel: "Pipeline visibility: dashboard daily users up 9x",
        weights: { numbers: 2, dash: 2 }
    },
    opmodel: {
        name: "Nobody has drawn the operating model",
        cause: "Functions grew region by region. No one agreed what should be central, what stays local and who owns each process.",
        start: "Map capabilities first, then decide what to centralise. Org charts and hiring come last.",
        caseId: "case-gbs",
        caseLabel: "Shared services design: 40+ capabilities mapped",
        weights: { central: 2, regions: 2, handoff: 1 }
    },
    maturity: {
        name: "One roadmap for very different businesses",
        cause: "Units sit at different maturity levels, so a single big-bang programme moves too fast for some and too slow for others.",
        start: "Use what exists, optimise it, and build new only where the gap is real. Sequence by unit.",
        caseId: "case-qtc",
        caseLabel: "Quote-to-cash uplift: value in year 1, not year 3",
        weights: { maturity: 2, quote: 2, regions: 1 }
    }
};

const symptomButtons = [...document.querySelectorAll(".symptoms button")];
const verdictEmpty = document.querySelector(".verdict-empty");
const verdictFull = document.querySelector(".verdict-full");
const v = (key) => document.querySelector(`[data-v="${key}"]`);

function rankPatterns() {
    const picked = symptomButtons.filter((b) => b.getAttribute("aria-pressed") === "true").map((b) => b.dataset.s);
    return Object.entries(patterns)
        .map(([id, p]) => ({ id, p, score: picked.reduce((sum, s) => sum + (p.weights[s] || 0), 0) }))
        .filter((r) => r.score > 0)
        .sort((a, b) => b.score - a.score);
}

function showPattern(id, ranked) {
    const p = patterns[id];
    v("name").textContent = p.name;
    v("cause").textContent = p.cause;
    v("start").textContent = p.start;
    v("case").textContent = p.caseLabel;
    v("case").href = "#" + p.caseId;
    v("case").dataset.case = p.caseId;
    v("mail").href = "mailto:rjjainrahul97@gmail.com?subject=" + encodeURIComponent("Growth question: " + p.name);

    const also = v("also");
    const runnerUp = ranked.find((r) => r.id !== id && r.score >= ranked[0].score - 1);
    if (runnerUp) {
        also.hidden = false;
        also.textContent = "Also possible: ";
        const b = document.createElement("button");
        b.type = "button";
        b.textContent = patterns[runnerUp.id].name.toLowerCase();
        b.addEventListener("click", () => showPattern(runnerUp.id, ranked));
        also.append(b);
    } else {
        also.hidden = true;
    }
}

function updateVerdict() {
    const ranked = rankPatterns();
    verdictEmpty.hidden = ranked.length > 0;
    verdictFull.hidden = ranked.length === 0;
    if (ranked.length) showPattern(ranked[0].id, ranked);
}

symptomButtons.forEach((b) =>
    b.addEventListener("click", () => {
        b.setAttribute("aria-pressed", String(b.getAttribute("aria-pressed") !== "true"));
        updateVerdict();
    })
);

v("reset").addEventListener("click", () => {
    symptomButtons.forEach((b) => b.setAttribute("aria-pressed", "false"));
    updateVerdict();
    symptomButtons[0].focus();
});

v("case").addEventListener("click", () => {
    const target = document.getElementById(v("case").dataset.case);
    if (!target) return;
    applyFilter("all");
    target.open = true;
});

// On phones, keep the current read visible while ticking
const peek = document.querySelector(".diag-peek");
const symptomList = document.querySelector(".symptoms");
const verdictBox = document.getElementById("verdict");
let listInView = false;
let verdictInView = false;

function updatePeek() {
    const hasRead = !verdictFull.hidden;
    if (hasRead) v("peek").textContent = v("name").textContent;
    peek.hidden = !(hasRead && listInView && !verdictInView);
}

new IntersectionObserver(([e]) => { listInView = e.isIntersecting; updatePeek(); }).observe(symptomList);
new IntersectionObserver(([e]) => { verdictInView = e.isIntersecting; updatePeek(); }, { threshold: 0.35 }).observe(verdictBox);
symptomButtons.forEach((b) => b.addEventListener("click", updatePeek));
v("reset").addEventListener("click", updatePeek);
document.addEventListener("click", (e) => { if (e.target.closest(".verdict-also button")) updatePeek(); });
