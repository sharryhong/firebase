# Firebase on the Web
[Firecasts Youtube](https://www.youtube.com/playlist?list=PLl-K7zZEsYLmnJ_FpMOZgyg6XcIGBu2OX)

- 인증, 스토리지, 호스팅, firebase 클라우드의 웹푸시 알림 등 
- Angular 1 & 2, Polymer, React, Ember등의 자바스크립트 프레임워크 연동

## Realtime Database - 간단하게 구현해보기 

Firebase 콘솔에서 프로젝트 초기화 코드(initialization code)를 가져오기 

1) [Firebase 콘솔](https://console.firebase.google.com) <br>
2) Create new project > project name을 정하고 create project<br>
3) overview창에서 Add Firebase to your web app 클릭 <br>
 - 시작에 필요한 모델들과 초기화 코드가 나옵니다. 

4) DB변경이 있을 때마다 실시간으로 동기화 되는 간단한 테스트
```
<body>
  
<h1 id="bigOne"></h1>

<script src="https://www.gstatic.com/firebasejs/3.6.6/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "---",
    authDomain: "---",---https://web-quickstart-8a66e.firebaseio.com",
    storageBucket: "---",
    messagingSenderId: "---"
  };
  firebase.initializeApp(config);

  var bigOne = document. getElementById('bigOne');
  // database 참조 생성. text로케이션에 child로케이션 생성 
  // 이제 모든 변경에 대해 on()함수로 동기화할 수 있습니다. 
  var dbRef = firebase.database().ref().child('text');
  // arrow function. snap은 매개변수.
  dbRef.on('value', snap => bigOne.innerText = snap.val());
</script>
</body>
```

5) firebase의 Database를 열어보면 추가되어있습니다. <br>
6) 우선 테스트를 위해 rules 탭에서 보안을 true, true 처리합니다. publish 클릭 
```
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

7) data탭으로 돌아와서 + 버튼 누르고 Name : text, Value : h1에 넣고싶은 문구를 넣습니다. <br>
8) Realtime Database!! 

# Firebase Realtime Database
## Realtime Events 목차
[value events](#value-events) <br>
[child events](#child-events)

#### value events
객체, 데이터 등을 동기화시키는 데 좋습니다. 

```
(function() {

  // Initialize Firebase
  var config = {
    apiKey: "---",
    authDomain: ---",
    databaseURL: "---",
    storageBucket: "---",
    messagingSenderId: "---"
  };
  firebase.initializeApp(config);

  // get element
  const preObject = document.getElementById('object');

  // database 참조를 만들어서 data를 실시간으로 동기화해보자.
  // create references 
  const dbRefObject = firebase.database().ref().child('object');

  dbRefObject.on('value', snap => preObject.innerText = JSON.stringify(snap.val(), null, 3)); // 여백 3 
})();
```

##### ref() 함수 
database의 root로 접근하게 해주고, 객체의 child키를 생성합니다. 이제 필요한 값을 저장할 수 있습니다. 

##### on() 메서드 
가장 강력한 메서드로서 

첫 매개변수 : 이벤트 타입. 실시간 동기화를 어느 단계까지 할지를 정해줍니다. <br>
**value** : database의 변경이 있을 때 매번 콜백함수를 호출합니다.

두번째 매개변수 : 콜백함수<br>
**snap** : 콜백함수의 매개변수로서 '데이터 스냅샷'이라고 불립니다. <br>
데이터 스냅샷은 key name, 자식요소 반복방식 등을 return합니다. <br>
그 값을 얻고 싶으면 지금처럼 .val()함수를 호출합니다. 값이 객체라면 객체 전체를 동기화합니다. <br>
만약에 객체의 한 value가 바뀌어도, 객체 전체를 update한다. 이를 state 동기화라고 합니다.

#### child events
데이터 동기화를 미세하게 조절할 수 있습니다. 특히 list를 다룰 때 유용합니다. <br>
어떤 요소가 add, remove, update 되었을 때 특정 child 이벤트에 동기화시키고 싶을 때 사용합니다.<br>

Firebase Overview/Database에서 `object`객체 프로퍼티에 JSON 객체를 넣어봅니다. 
```
object
  hobbies: { "coffee" : "coffee" }

// 이렇게 하면 key가 coffee이고 값이 coffee인 JSON객체가 부여됩니다. 
// 이렇게 리스트를 추가합니다.
```

js파일에서 
```
// child_added : 리스트에 자식이 추가될 때만 작동합니다. 
// 처음에 모든 리스트가 동기화되며, 그 후엔 변한 부분만 동기화합니다. 
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
```