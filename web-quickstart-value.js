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
  const ulList = document.getElementById('list');

  // database 참조를 만들어서 data를 실시간으로 동기화해보자.
  // create references 
  const dbRefObject = firebase.database().ref().child('object');
  const dbRefList = dbRefObject.child('hobbies');

  // Sync object changes
  dbRefObject.on('value', snap => preObject.innerText = JSON.stringify(snap.val(), null, 3)); // 여백 3

  // Sync list changes
  // child_added : 리스트에 자식이 추가될 때만 작동한다. 
  // 처음에 모든 리스트가 동기화되며, 그 후엔 변한 부분만 동기화한다. 
  dbRefList.on('child_added', snap => {

    const li = document.createElement('li');
    // 각 항목의 key name을 li의 id값으로 준다.
    li.id = snap.key;  
    li.innerText = snap.val();
    ulList.appendChild(li);

  });
  
  // child_changed : 자식이 바뀔때만 작동  
  dbRefList.on('child_changed', snap => {

    const liChanged = document.getElementById(snap.key);
    liChanged.innerText = snap.val();

  });

  // child_changed : 자식이 삭제될 때만 작동  
  dbRefList.on('child_removed', snap => {

    const liRemove = document.getElementById(snap.key);
    liRemove.remove();

  });
})();