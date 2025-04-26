const jobLists = document.querySelector(".job-lists");
const requiredLang = document.querySelector(".selected-tags ul");
const selectedTagsUl = document.querySelector(".selected-tags ul");
const searchInput = document.querySelector(".search-input");

// State to store the currently selected filter tags
let activeFilters = [];
// Store the initially fetched job data globally
let allJobsData = [];

// Fetch jobs from the JSON file
async function fetchJobs() {
  try {
    const res = await fetch("data.json");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

function checkToggle() {
  const listItems = selectedTagsUl.querySelectorAll("li");
  if (listItems.length === 0) {
    searchInput.classList.add("display");
  } else {
    searchInput.classList.remove("display");
  }
}

function filterJobs(jobs, filters) {
  if (filters.length === 0) {
    return jobs;
  }
  return jobs.filter((job) => {
    const jobSkills = [job.role, job.level, ...job.languages, ...job.tools];
    return filters.every((filter) => jobSkills.includes(filter));
  });
}

function renderJobs(jobs) {
  let allJobsHTML = "";
  jobs.forEach((job) => {
    allJobsHTML += createJobListHTML(job);
  });
  jobLists.innerHTML = allJobsHTML;

  const skillTags = document.querySelectorAll(".skill-tag");
  skillTags.forEach((skill) => {
    skill.addEventListener("click", handleSkillTagClick);
  });
}

function createJobListHTML(job) {
  if (!job || !job.logo) {
    console.error("Job is undefined or missing logo:", job);
    return "";
  }

  return `
        <div class="job-list">
            <div class="left-side">
                <div class="logos-div">
                    <img src="${job.logo}" alt="${
    job.company
  }" class="company-logo" />
                </div>
                <div class="job-infos">
                    <div class="info-header">
                        <h3 class="company-name">${job.company}</h3>
                        <p class="${job.new ? "new" : ""}">${
    job.new ? "New!" : ""
  }</p>
                        <p class="${job.featured ? "feature" : ""}">${
    job.featured ? "featured" : ""
  }</p>
                    </div>
                    <div class="job-position">${job.position}</div>
                    <div class="job-desc">
                        <ul>
                            <li>${job.postedAt}</li>
                            <li>${job.contract}</li>
                            <li>${job.location}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="required-lang">
                <ul>
                    <li class="skill-tag" data-value="${job.role}">${
    job.role
  }</li>
                    <li class="skill-tag" data-value="${job.level}">${
    job.level
  }</li>
                    ${job.languages
                      .map(
                        (language) =>
                          `<li class="skill-tag" data-value="${language}">${language}</li>`
                      )
                      .join("")}
                    ${job.tools
                      .map(
                        (tool) =>
                          `<li class="skill-tag" data-value="${tool}">${tool}</li>`
                      )
                      .join("")}
                </ul>
            </div>
        </div>
    `;
}

function handleSkillTagClick(e) {
  const value = e.target.dataset.value;

  if (!activeFilters.includes(value)) {
    activeFilters.push(value);

    const newLi = document.createElement("li");
    newLi.classList.add("selected-tag");
    newLi.innerHTML = `<span class="delete-skill"> &times; </span>${value}`;
    requiredLang.appendChild(newLi);
    checkToggle();

    const deleteButton = newLi.querySelector(".delete-skill");
    if (deleteButton) {
      deleteButton.addEventListener("click", () => {
        activeFilters = activeFilters.filter((filter) => filter !== value);
        newLi.remove();
        checkToggle();
        renderJobs(filterJobs(allJobsData, activeFilters));
      });
    }

    renderJobs(filterJobs(allJobsData, activeFilters));
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const data = await fetchJobs();

  if (Array.isArray(data)) {
    allJobsData = data;
    renderJobs(data);
    checkToggle();
  } else {
    console.error("Fetched data is not an array");
  }
});
