document.addEventListener('DOMContentLoaded', async () => {
   // 로그인 및 자서전 제출 확인    
    try {
        const logincheckResponse = await fetch(`https://asia-northeast3-life-legacy-dev.cloudfunctions.net/api/auth/status`,{
            method: 'GET',
            credentials:'include',
        });
        const logincheckResult = await logincheckResponse.json();
        if(logincheckResult.code != '200'){
            alert("로그인을 해주세요");
            window.location.href = "/login";
        }

        const apiResponse = await fetch(`https://asia-northeast3-life-legacy-dev.cloudfunctions.net/api/posts/check`, {
            method: 'GET',
            credentials:'include',
        });
        const result = await apiResponse.json();
        if(result.code === "201"){ // 작성한 데이터 없음
            alert("자서전을 먼저 작성해주세요!");
            window.location.href = "/myprofile";
        }
    } catch (error) {
        console.error('Error fetching profile:', error);
    }
});