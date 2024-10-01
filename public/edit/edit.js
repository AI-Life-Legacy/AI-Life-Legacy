document.addEventListener('DOMContentLoaded', async function () {
    const userAnswer = document.getElementById('userAnswer');
    const answerInput = document.getElementById('answerInput');
    const editButton = document.getElementById('editButton');
    const prevButton = document.getElementById('prevButton');
    const questionTitle = document.querySelector('h1 strong');

    const logincheckResponse = await fetch(`https://asia-northeast3-life-legacy-dev.cloudfunctions.net/api/auth/status`,{
        method: 'GET',
        credentials:'include',
    });
    const logincheckResult = await logincheckResponse.json();
    if(logincheckResult.code != '200'){
        alert("로그인을 해주세요");
        window.location.href = "/login";
    }

    // 현재 URL에서 mainQuestionId와 subQuestionId 추출
    const urlParts = window.location.pathname.split('/');
    const mainId = urlParts[2];
    const subId = urlParts[3];
    console.log(mainId,subId);
    try {
        // const apiResponse = await fetch(`https://asia-northeast3-life-legacy-dev.cloudfunctions.net/api/write/${mainId}/${subId}`, {
        //     method: 'GET',
        //     credentials: 'include',
        // });

        const apiResponse = await fetch(`https://asia-northeast3-life-legacy-dev.cloudfunctions.net/api/write/${1}/${1}`, {
            method: 'GET',
            credentials: 'include',
        });

        const result = await apiResponse.json();
        const { answer, question } = result.result.data;
        
        // 질문과 답변을 HTML에 표시
        questionTitle.textContent = question; // 질문 제목 설정
        userAnswer.textContent = answer; // 답변 텍스트 설정

    } catch (error) {
        alert('답변하지 않은 질문입니다.');
        window.location.href="/mypage";
    }

    editButton.addEventListener('click', function () {
        if (editButton.textContent === '수정하기') {
            // 수정하기 모드로 전환
            answerInput.value = userAnswer.textContent;
            userAnswer.style.display = 'none'; // 기존 텍스트 숨기기
            answerInput.style.display = 'block'; // 입력창 보이기
            editButton.textContent = '저장하기';
            editButton.classList.add('edit-mode');
        } else {
            // 저장하기 모드로 전환
            userAnswer.textContent = answerInput.value;
            answerInput.style.display = 'none'; // 입력창 숨기기
            userAnswer.style.display = 'block'; // 텍스트 보이기
            editButton.textContent = '수정하기';
            editButton.classList.remove('edit-mode');

            // 여기서 서버 API로 수정된 데이터를 전송
            saveUserAnswer(answerInput.value, mainId, subId);
        }
    });

    prevButton.addEventListener('click', function () {
        // '/mypage'로 이동
        window.location.href = '/mypage';
    });

    function saveUserAnswer(updatedAnswer, mainId, subId) {
        // 서버 API로 데이터 전송
        fetch(`https://asia-northeast3-life-legacy-dev.cloudfunctions.net/api/write`, {
            method: 'PATCH',  // 수정된 데이터를 전송할 때 PATCH 사용
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ data: updatedAnswer ,mainId,subId}),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('답변이 성공적으로 저장되었습니다.');
        })
        .catch((error) => {
            console.error('Error saving answer:', error);
            alert('답변을 저장하는 중 오류가 발생했습니다.');
        });
    }
});
