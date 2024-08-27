let currentStep = 1;
const totalSteps = 7;

document.getElementById("nextBtn").addEventListener("click", function () {
  document.getElementById(`step${currentStep}`).style.display = "none";
  currentStep++;

  if (currentStep > 1) {
    document.getElementById("prevBtn").style.display = "block";
  }

  if (currentStep > totalSteps) {
    window.location.href = "/myprofile";
  } else {
    document.getElementById(`step${currentStep}`).style.display = "block";

    if (currentStep === totalSteps) {
      document.getElementById("nextBtn").innerText = "시작하기";
    }
  }
});

document.getElementById("prevBtn").addEventListener("click", function () {
  document.getElementById(`step${currentStep}`).style.display = "none";
  currentStep--;

  if (currentStep === 1) {
    document.getElementById("prevBtn").style.display = "none";
  }

  if (currentStep < totalSteps) {
    document.getElementById("nextBtn").innerText = "다음";
  }

  document.getElementById(`step${currentStep}`).style.display = "block";
});
