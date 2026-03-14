const toggle = document.getElementById("light-toggle");

toggle.onclick = () => {

document.body.classList.toggle("light");

localStorage.setItem(
"theme",
document.body.classList.contains("light")
);

};

if(localStorage.getItem("theme") === "true")
document.body.classList.add("light");
