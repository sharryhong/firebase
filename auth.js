(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBNKetOhIuxti9ugG_ZGmr_QFslh54dd_A",
    authDomain: "web-quickstart-8a66e.firebaseapp.com",
    databaseURL: "https://web-quickstart-8a66e.firebaseio.com",
    storageBucket: "web-quickstart-8a66e.appspot.com",
    messagingSenderId: "479757967532"
  };
  firebase.initializeApp(config);

  // 1. DOM 요소
  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignUp = document.getElementById('btnSignUp');
  const btnLogout = document.getElementById('btnLogout');

  // 2. Add login event
  btnLogin.addEventListener('click', e => {
    // Get email and password
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    // 사용자가 있다면 로그인 
    const promise = auth.signInWithEmailAndPassword(email, pass);
    // 사용자가 없으면 에러를 찾아내고 콘솔에 기록
    promise.catch( e => console.log(e.message) );
  });

  btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
  });

  // 3. Add signup event
  btnSignUp.addEventListener('click', e => {
    // Get email and password
    // to-do : check for real email
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    // 사용자가 있다면 로그인 
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    // 사용자가 없으면 에러를 찾아내고 콘솔에 기록
    promise.catch( e => console.log(e.message) );
  });

  // 4. Add realtime listener (인증 상태 감시)
  firebase.auth().onAuthStateChanged(firebaseUser => {
    // 로그인 했다면 
    if(firebaseUser) {
      console.log(firebaseUser);
      btnLogout.classList.remove('hide');
    } else { // 로그인 하지 않은 경우 
      console.log('not logged in');
      btnLogout.classList.add('hide');
    }
  });

})();