const jobLists = document.querySelector(".job-lists");

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
  console.log(job); // Log the job object to see its structure
  if (!job || !job.logo) {
    console.error("Job is undefined or missing logo:", job);
    return ""; // Return an empty string if job is not valid
  }

  return `
    <div>
      <div>
        <img src="${job.logo}" alt="${
    job.company
  } logo" /> <!-- Use lowercase 'logo' -->
        <div>
          <div>
            <h3>${job.company}</h3>
            <p>${job.new ? "new" : ""} ${job.featured ? "featured" : ""}</p>
          </div>
          <div>${job.position}</div>
          <div>
            <ul>
              <li>${job.postedAt}</li>
              <li>${job.contract}</li>
              <li>${job.location}</li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <ul>
          <li>${job.languages.join(", ")}</li>
          <li>${job.tools.join(", ")}</li>
        </ul>
      </div>
    </div>
  `;
}

// When the DOM is fully loaded, fetch jobs and display them
document.addEventListener("DOMContentLoaded", async () => {
  const data = await fetchJobs(); // Fetch the jobs data

  console.log(data); // Log the fetched data to see its structure

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
