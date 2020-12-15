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

  
var user_name = localStorage.getItem("username");
var room_name = localStorage.getItem("room_name");

function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("room_name");
    window.location = "login.html";
}

function send() {
    var msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name: user_name,
        msg: msg,
        like: 0
    });
    document.getElementById("msg").value = "";
}
function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") { 
        var firebase_message_id = childKey; 
        var message_data = childData; 
        console.log(firebase_message_id);
        console.log(message_data);
        //Start code 

        message = message_data['msg'];
        name = message_data['name'];
        like = message_data['like'];
        name_tag = "<h4>" + name + "</h4>";
        message_tag = "<h4 class='message_h4'>" + message + "</h4>";
        like_tag ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
        span_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";
        row = name_tag + message_tag + like_tag + span_tag;
        document.getElementById("output").innerHTML += row;

        //End code
       } }); }); } 
       
getData();

function updateLike(message_id) {
  var button_id = message_id;
  var likes = document.getElementById(button_id).value;
  var update_likes = Number(likes) + 1;
  console.log(update_likes);
  firebase.database().ref(room_name).child(message_id).update({
      like: update_likes
  });
}




  