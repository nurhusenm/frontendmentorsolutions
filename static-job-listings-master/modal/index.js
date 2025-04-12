const jobLists = document.querySelector(".job-lists");
const skillTags = document.querySelectorAll("li");
const skillTag = document.querySelector(".skill-tag");

// Fetch jobs from the JSON file
async function fetchJobs() {
  try {
    const res = await fetch("data.json");
    const data = await res.json(); // This will be an array of job objects
    return data; // Return the fetched data
  } catch (error) {
    console.log(error);
  }
}

// Create HTML for a job listing
function createJobListHTML(job) {
  // console.log(job); // Log the job object to see its structure
  if (!job || !job.logo) {
    console.error("Job is undefined or missing logo:", job);
    return ""; // Return an empty string if job is not valid
  }

  return `
    <div class="job-list">
    <div class="left-side">
    <div class="logos-div">
    <img src="${job.logo}" alt="${job.company}" class="company-logo"  /> 
    
    </div>
    
    <div class="job-infos">
    <div class="info-header">
    <h3 class="company-name">${job.company}</h3>
    <p class="${job.new ? "new" : ""}">${job.new ? "New!" : ""}
    </p>
    <p class="${job.featured ? "feature" : ""}">
    ${job.featured ? "featured" : ""} 
    </p>
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

          <li class="skill-tag">${job.role}  </li>
          <li class="skill-tag">${job.level}</li>
      
          ${job.languages
            .map((language) => `<li class="skill-tag">${language}</li>`)
            .join("")}
          ${job.tools
            .map((tool) => `<li class="skill-tag">${tool}</li>`)
            .join("")}
     
         
        </ul>
      </div>

    </div>
  `;
}

//  fetch jobs and display them
document.addEventListener("DOMContentLoaded", async () => {
  const data = await fetchJobs(); // Fetch the jobs data

  // console.log(data); // Log the fetched data to see its structure

  if (Array.isArray(data)) {
    // Check if data is an array
    let allJobsHTML = "";
    data.forEach((job) => {
      const jobHTML = createJobListHTML(job); // Create HTML for each job
      allJobsHTML += jobHTML;
    });
    jobLists.innerHTML = allJobsHTML;
  } else {
    console.error("Fetched data is not an array");
  }
});

skillTags.forEach((skill) => {
  skill.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(e.target.value + "clicked");
  });
});
skillTag.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("clicked");
});
