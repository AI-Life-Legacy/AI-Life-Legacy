let currentStep = 1;
const totalSteps = 7;

// 기본 상태
document.getElementById("nextBtn").innerText = `다음 (${currentStep}/${totalSteps})`;
document.getElementById("prevBtn").innerText = "돌아가기";

// 다음 클릭 시
document.getElementById("nextBtn").addEventListener("click", function () {
  document.getElementById(`step${currentStep}`).style.display = "none";

  currentStep++;
  document.getElementById("nextBtn").innerText = `다음 (${currentStep}/${totalSteps})`;
  document.getElementById("guideHeader").innerText = `자서전 작성 가이드 (${currentStep}/${totalSteps})`;
  // if (currentStep > 1) {
  //   document.getElementById("prevBtn").style.display = "block";
  // }

  if (currentStep > totalSteps) {
    window.location.href = "/myprofile";
  } else {
    document.getElementById(`step${currentStep}`).style.display = "block";
    document.getElementById("prevBtn").innerText = "이전";

    if (currentStep === totalSteps) {
      document.getElementById("nextBtn").innerText = "시작하기";
    }
  }
});

document.getElementById("prevBtn").addEventListener("click", function () {
  document.getElementById(`step${currentStep}`).style.display = "none";
  
  currentStep--;
  document.getElementById("guideHeader").innerText = `자서전 작성 가이드 (${currentStep}/${totalSteps})`;

  if (currentStep < 1) {
    window.location.href = "/home";
  } else if(currentStep == 1) {
    document.getElementById("prevBtn").innerText = "돌아가기";
  }

  if (currentStep < totalSteps) {
    document.getElementById("nextBtn").innerText = `다음 (${currentStep}/${totalSteps})`;
  }

  document.getElementById(`step${currentStep}`).style.display = "block";
});
