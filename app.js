// The website remains readable and all cases can be opened without JavaScript.
const root = document.documentElement;
const theme = document.querySelector('#theme');
let savedTheme;
try { savedTheme = localStorage.getItem('rahul-theme'); } catch { /* Storage can be blocked. */ }
if (savedTheme === 'light' || savedTheme === 'dark') root.dataset.theme = savedTheme;
const systemDark = matchMedia('(prefers-color-scheme: dark)');
const isDark = () => root.dataset.theme ? root.dataset.theme === 'dark' : systemDark.matches;
function updateThemeButton() {
    theme.textContent = isDark() ? 'Light' : 'Dark';
    theme.setAttribute('aria-label', `Switch to ${isDark() ? 'light' : 'dark'} theme`);
    document.querySelector('meta[name="theme-color"]').content = isDark() ? '#151515' : '#ffffff';
}
theme.hidden = false;
updateThemeButton();
theme.addEventListener('click', () => {
    root.dataset.theme = isDark() ? 'light' : 'dark';
    try { localStorage.setItem('rahul-theme', root.dataset.theme); } catch { /* Theme still works. */ }
    updateThemeButton();
});
systemDark.addEventListener('change', updateThemeButton);

const cases = [...document.querySelectorAll('.case')];
const finder = document.querySelector('.finder');
const challenge = document.querySelector('#challenge');
const match = document.querySelector('#match');
finder.hidden = false;
challenge.addEventListener('change', () => {
    const selected = document.getElementById(`case-${challenge.value}`);
    cases.forEach(item => { item.open = item === selected; });
    match.textContent = selected
        ? `Opened: ${selected.querySelector('summary span').textContent}.`
        : 'Choose a challenge to highlight relevant work.';
});
function openLinkedCase() {
    const selected = cases.find(item => `#${item.id}` === location.hash);
    if (selected) selected.open = true;
}
document.querySelectorAll('.proof a, a.proof-item').forEach(link => {
    link.addEventListener('click', () => {
        const selected = document.getElementById(link.hash.slice(1));
        if (selected) selected.open = true;
    });
});
window.addEventListener('hashchange', openLinkedCase);
openLinkedCase();
