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
