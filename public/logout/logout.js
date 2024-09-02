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
document.addEventListener('DOMContentLoaded', async () => {
  const logout = await fetch(`https://asia-northeast3-life-legacy-dev.cloudfunctions.net/api/user/logout`,{
    method: 'GET',
    credentials:'include',
  });
  const logoutresult = await logout.json();
  if(logoutresult.status == "success"){
    await auth.signOut();
    window.location.href = "/";
  }
});

