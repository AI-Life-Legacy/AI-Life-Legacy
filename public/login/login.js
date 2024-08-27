const firebaseConfig = {
  apiKey: "AIzaSyAtDXbFTP1BgOE0IkVnXAkcunKQBIwtLIo",
  authDomain: "life-legacy-dev.firebaseapp.com",
  projectId: "life-legacy-dev",
  storageBucket: "life-legacy-dev.appspot.com",
  messagingSenderId: "868977334464",
  appId: "1:868977334464:web:160d44de2a81abbf567525",
  measurementId: "G-CX1LGDP3P3"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// 사용자 로그인
const loginUser = async (email, password) => {
  try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      const idToken = await user.getIdToken();
      Cookies.set('token', idToken, { expires: 1 }); // 1일 동안 유효한 쿠키 설정
      return true;
  } catch (error) {
      console.error("Error logging in user:", error);
      return false;
  }
};

// 로그인 버튼 이벤트
document.getElementById('login-button').addEventListener('click', async () => {
  try{
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-coupon').value;
    const result = await loginUser(email, password);
    if(result){
        window.location.href = "/";
    }else{
      alert("아이디 비밀번호를 확인해주세요");
      document.getElementById('login-email').value = '';
      document.getElementById('login-coupon').value = '';
    }
  }catch(err){
    console.error(err);
    alert("아이디 비밀번호를 확인해주세요");
    document.getElementById('login-email').value = '';
    document.getElementById('login-coupon').value = '';
  }
});
