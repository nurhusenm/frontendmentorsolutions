const jobLists = document.querySelector(".job-lists");
const selectedTag = document.querySelector(".selected-tag");
const requiredLang = document.querySelector(".selected-tags ul");

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

// Create HTML for a job listing
function createJobListHTML(job) {
  if (!job || !job.logo) {
    console.error("Job is undefined or missing logo:", job);
    return "";
  }

  return `
    <div class="job-list">
      <div class="left-side">
        <div class="logos-div">
          <img src="${job.logo}" alt="${job.company}" class="company-logo" />
        </div>
        <div class="job-infos">
          <div class="info-header">
            <h3 class="company-name">${job.company}</h3>
            <p class="${job.new ? "new" : ""}">${job.new ? "New!" : ""}</p>
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
          <li class="skill-tag" data-value="${job.role}">${job.role}</li>
          <li class="skill-tag" data-value="${job.level}">${job.level}</li>
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

document.addEventListener("DOMContentLoaded", async () => {
  const data = await fetchJobs();

  if (Array.isArray(data)) {
    let allJobsHTML = "";
    data.forEach((job) => {
      allJobsHTML += createJobListHTML(job);
    });
    jobLists.innerHTML = allJobsHTML;

    const skillTags = document.querySelectorAll(".skill-tag");
    skillTags.forEach((skill) => {
      skill.addEventListener("click", (e) => {
        const value = e.target.dataset.value;
        const newLi = document.createElement("li");
        newLi.classList.add("selected-tag");
        newLi.innerHTML = `<span class="delete-skill"> &times; </span>`;

        requiredLang.appendChild(newLi);

        // console.log(value + " clicked");
        // You can now use 'value' to filter your jobs
        newLi.innerHTML += value;

        const deleteButton = newLi.querySelector(".delete-skill");
        if (deleteButton) {
          deleteButton.addEventListener("click", () => {
            console.log("clicked" + value);
            newLi.remove();
          });
        }
      });
    });
  } else {
    console.error("Fetched data is not an array");
  }
});
