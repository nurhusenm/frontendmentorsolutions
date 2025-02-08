const emailId = document.getElementById("emailId");
const notifybtn = document.getElementById("notifybtn");
const errorlg = document.getElementById("errorlg");
const errorsm = document.getElementById("errorsm");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const forbiddenEmail = "example@gmail.com";

notifybtn.addEventListener("click", () => {
  const email = emailId.value;

  console.log(email);

  if (email === "" || !emailPattern.test(email)) {
    errorlg.textContent = "please provide a valid email adress";
    errorsm.textContent = "please provide a valid email adress";
    emailId.style.border = "1px solid hsl(354, 100%, 66%)";
  } else if (email === forbiddenEmail) {
    errorlg.textContent = "The email 'example@gmail.com' is not allowed.";
    errorsm.textContent = "The email 'example@gmail.com' is not allowed.";
    emailId.style.border = "2px solid red";
  } else {
    alert("thank you for subscribing!");
  }
});
