var firebaseConfig = {
  apiKey: "AIzaSyBJ604sjNm696ZsYGFl75RV7lpUXp9WbKo",
  authDomain: "chat-caac4.firebaseapp.com",
  databaseURL: "https://chat-caac4.firebaseio.com",
  projectId: "chat-caac4",
  storageBucket: "chat-caac4.appspot.com",
  messagingSenderId: "977615355651",
  appId: "1:977615355651:web:8dea658a264d70e3cdb336",
  measurementId: "G-5K3ZTF475C"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var name = localStorage.getItem("username");
console.log("hi")
document.getElementById("greeting").innerHTML = "Welcome " + name + "!";

function room() {
  roomname = document.getElementById("get_roomName").value;
  firebase.database().ref("/").child(roomname).update({
    roomname: "username"
  });
  localStorage.setItem("roomname", roomname);
  window.location = "chat.html";
}

var row1;

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey =childSnapshot.key;
   Room_names = childKey;
   //Start code
   console.log(Room_names);
   var row = "<div class='room_name' id="+Room_names+" onclick='redirect(this.id)'>#" + Room_names + "</div><hr>";
   if (row1 != null){
     row1 = row1 + row;
   } else {
     row1 = row;
   }
   document.getElementById("output").innerHTML = row1;
   //End code
 });});}

getData();

function redirect(id) {
  console.log(id);
  localStorage.setItem("room_name", id);
  window.location = "chat.html";
}

function logout() {
  localStorage.removeItem("username");
  localStorage.removeItem("room_name");
  window.location = "login.html";
}
