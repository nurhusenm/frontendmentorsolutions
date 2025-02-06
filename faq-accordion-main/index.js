document.addEventListener("DOMContentLoaded", function () {
  const questions = document.querySelectorAll(".question");

  questions.forEach((question) => {
    question.addEventListener("click", () => {
      // Toggle the answer visibility
      const answer = question.nextElementSibling;
      answer.classList.toggle("active");

      // Toggle the icons
      const icons = question.querySelectorAll(".icons img");
      icons.forEach((icon) => {
        icon.classList.toggle("active");
      });
    });
  });
});
