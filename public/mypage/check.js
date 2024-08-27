const idToken = Cookies.get('token');
if(!idToken){
  alert("로그인을 해주세요!");
  window.location.href = "/login";
}
document.addEventListener('DOMContentLoaded', async () => {
   // 로그인 및 자서전 제출 확인    
    try {
        const apiResponse = await fetch(`https://asia-northeast3-life-legacy-dev.cloudfunctions.net/api/write/check`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}`
            }
        });
        const result = await apiResponse.json();
        console.log(result);
        if(result.code === "201"){ // 작성한 데이터 없음
            alert("자서전을 먼저 작성해주세요!");
            window.location.href = "/myprofile";
        }
    } catch (error) {
        console.error('Error fetching profile:', error);
    }
});