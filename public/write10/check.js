document.addEventListener('DOMContentLoaded', async () => {
    // 로딩 중... 화면을 보여주고, 컨텐츠를 숨깁니다.
    document.getElementById('loading').style.display = 'flex';
    document.getElementById('content').style.display = 'none';

    try {
        const apiResponse = await fetch(`https://asia-northeast3-life-legacy-dev.cloudfunctions.net/api/user/logincheck`,{
            method: 'GET',
            credentials: 'include',
        });

        const result = await apiResponse.json();

        if(result.code === "200"){
            const apiResponse = await fetch(`https://asia-northeast3-life-legacy-dev.cloudfunctions.net/api/write/check/10`,{
                method: 'GET',
                credentials: 'include',
            });
    
            const result = await apiResponse.json();
            if(result.result.data == 'true'){
                window.location.href = "/finish";
            }else{
                document.getElementById('loading').style.display = 'none';
                document.getElementById('content').style.display = 'flex';
                const checkJsCompleteEvent = new Event('checkJsComplete');
                document.dispatchEvent(checkJsCompleteEvent);
            }
        }else{
            alert("로그인을 해주세요!");
            window.location.href = "/login";
        }
    } catch (error) {
        console.error('Error fetching profile:', error);
        loadingElement.textContent = '데이터를 불러오는 중 오류가 발생했습니다.';
    }
});