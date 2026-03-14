const toggle = document.getElementById("dark-toggle");

toggle.onclick = () => {

document.body.classList.toggle("dark");

localStorage.setItem(
"theme",
document.body.classList.contains("dark")
);

};

if(localStorage.getItem("theme") === "true")
document.body.classList.add("dark");


async function loadRepoInfo() {

const projects = document.querySelectorAll(".project");

for (const project of projects) {

const repo = project.dataset.repo;

if (!repo) continue;

const res = await fetch(
`https://api.github.com/repos/zackeua/${repo}`
);

const data = await res.json();

const meta = project.querySelector(".project-meta");

meta.innerHTML = `
<span class="language">
<span class="lang-dot"
style="background:${languageColor(data.language)}">
</span>
${data.language ?? ""}
</span>
`;

}

}

loadRepoInfo();


function languageColor(lang){

const colors = {

"Python":"#3572A5",
"C++":"#f34b7d",
"Java":"#b07219",
"JavaScript":"#f1e05a",
"C":"#555"

};

return colors[lang] || "#888";

}