const yearLinksElement = document.getElementById("yearLinks");
const sessionInfoElement = document.getElementById("info");
const yearsElement = document.getElementById("years");

async function loadJSON() {
    const response = await fetch("./data.json");
    const data = await response.json();

    generatePage(data);
}

function generatePage(data) {
    generateYearLinks(data);
    generateYears(data);
}

function generateYearLinks(data) {
    const ul = document.createElement("ul");

    for (let i = 0; i < data.years.length; i++) {
        let thisYear = data.years[i];

        const li = document.createElement("li");

        const a = document.createElement("a");
        a.innerHTML = thisYear.year;
        a.setAttribute("href", "#" + thisYear.year);
        li.appendChild(a);
        ul.appendChild(li);
    }
    yearLinksElement.appendChild(ul);
}

function generateYears(data) {
    for (let i = 0; i < data.years.length; i++) {
        let thisYear = data.years[i];
        let semOne = thisYear.semesterOne;
        let semTwo = thisYear.semesterTwo;

        const h2 = document.createElement("h2");
        h2.setAttribute("href", "#" + thisYear.year);

        const ulOne = document.createElement("ul");
        const ulTwo = document.createElement("ul");

        generateSessions(semOne, ulOne);
        generateSessions(semTwo, ulTwo);

        const semOneTitle = document.createElement("h3");
        semOneTitle.innerHTML = "Semester One";

        const semTwoTitle = document.createElement("h3");
        semTwoTitle.innerHTML = "Semester Two";

        yearsElement.appendChild(semOneTitle);
        yearsElement.appendChild(ulOne);
        yearsElement.appendChild(semTwoTitle);
        yearsElement.appendChild(ulTwo);
    }
}

function generateSessions(data, element) {
    for (let i = 0; i < data.length; i++) {
        const li = document.createElement("li");
        li.innerHTML = data[i].title;
        const id = Math.floor(Math.random() * 1000)
        li.setAttribute("id", id);

        li.addEventListener("click", () => {
            toggleVisability(data[i]);
        })


        element.appendChild(li);
    }
}

function toggleVisability(data) {
    sessionInfoElement.innerHTML = "";
    sessionInfoElement.style.display = "block";

    const h2 = document.createElement("h2");
    h2.innerHTML = data.title;
    sessionInfoElement.appendChild(h2);

    for (let i = 0; i < data.description.length; i++) {
        const p = document.createElement("p");
        p.innerHTML = data.description[i];
        sessionInfoElement.appendChild(p);
    }

    const h3 = document.createElement("h3");
    h3.innerHTML = "Links";
    sessionInfoElement.appendChild(h3);

    for (let i = 0; i < data.links.length; i++) {
        const p = document.createElement("p");
        const a = document.createElement("a");
        a.innerHTML = data.links[i];
        a.setAttribute("href", data.links[i]);
        p.appendChild(a);
        sessionInfoElement.appendChild(p);
    }
}

loadJSON();

