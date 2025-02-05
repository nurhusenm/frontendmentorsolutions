const ratingButtons = document.querySelectorAll(".rating-button");
const submitButton = document.querySelector(".submitbtn");
const ratingState = document.querySelector(".rating-state");
const thankYouState = document.querySelector(".thank-you-state");
const selectedRating = document.querySelector(".selected-rating");
const ratingCard = document.querySelector(".card");
const thankYouCard = document.querySelector(".thankyou-card");

console.log(ratingButtons);

let userRating = null;

ratingButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    ratingButtons.forEach((button) => button.classList.remove("active"));

    e.target.classList.add("active");

    userRating = e.target.textContent;
    console.log("Selected Rating:", userRating);
  });
});

submitButton.addEventListener("click", () => {
  if (userRating) {
    // Hide the rating card
    ratingCard.classList.add("hidden");
    // Show the Thank You card
    thankYouCard.classList.remove("hidden");
    // Display the selected rating in the Thank You card
    selectedRating.innerHTML = userRating;
  } else {
    alert("Please select a rating before submitting.");
  }
});
