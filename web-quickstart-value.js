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

  // get element
  const preObject = document.getElementById('object');

  // database 참조를 만들어서 data를 실시간으로 동기화해보자.
  // create references 
  const dbRefObject = firebase.database().ref().child('object');
  // ref()함수 : database의 root로 접근하게 해주고, 객체의 child키를 생성한다. 
  // 그러면 필요한 값을 저장할 수 있다. 
  // on메서드 : 가장 강력한 메서드로서 
  dbRefObject.on('value', snap => preObject.innerText = JSON.stringify(snap.val(), null, 3)); // 여백 3
  // 첫 매개변수 : 이벤트 타입. 실시간 동기화를 어느 단계까지 할지를 정한다. 
  // value : database의 변경이 있을 때 매번 콜백함수를 호출한다. 
  // 두번째 매개변수 : 콜백함수
  // snap : 콜백함수의 매개변수로서 '데이터 스냅샷'이라고 불린다. 
  // 데이터 스냅샷은 key name, 자식요소 반복방식 등을 return한다. 
  // 그 값을 얻고 싶으면 지금처럼 .val()함수를 호출한다. 값이 객체라면 객체 전체를 동기화한다. 
  // 만약에 객체의 한 value가 바뀐다면, 객체 전체를 update한다. => state 동기화 
})();