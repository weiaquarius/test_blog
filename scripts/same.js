var firebaseConfig = {
  apiKey: "AIzaSyA7CcEZ8Cm6BfNDXzSy2GNqw4KRhEKyrGk",
  authDomain: "blog-8f917.firebaseapp.com",
  databaseURL: "https://blog-8f917.firebaseio.com",
  projectId: "blog-8f917",
  storageBucket: "blog-8f917.appspot.com",
  messagingSenderId: "472701333427",
  appId: "1:472701333427:web:ab7be97f749227419965c6",
  measurementId: "G-K0927WPTBW"
};
firebase.initializeApp(firebaseConfig);
firebase.auth.Auth.Persistence.LOCAL;
firebase.analytics();


//reset Password
$("#btn-resetPassword").click(function(){
    var auth = firebase.auth();
    var email = $("#email").val();
    console.log("IN");
    if (email != ""){
      auth.sendPasswordResetEmail(email).then(function(){
        window.alert("郵件已經寄出~~~麻煩請查看信箱");
  
      }).catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;
  
        console.log(errorCode);
        console.log(errorMessage);
  
        window.alert("訊息: " + errorMessage);
      });
    }else{
      window.alert("請輸入郵件");
    }
});

//login
$("#btn-login").click(function(){

  var email = $("#login-email").val();
  var password = $("#login-password").val();  
  if (email != "" && password !=""){
    var result = firebase.auth().signInWithEmailAndPassword(email,password);
    result.catch(function(error){
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(errorCode);
      console.log(errorMessage);

      window.alert("訊息: " + errorMessage);
    });
  }else{
    window.alert("填寫未完成，請輸入資料");
  }
});

//signup
$("#btn-signup").click(function(){
  var email = $("#signup-email").val();
  var password = $("#signup-password").val();    
  var cpassword = $("#confirmpassword").val();    
  if (email != "" && password !="" && cpassword != ""){
    if (password == cpassword){
      var result = firebase.auth().createUserWithEmailAndPassword(email,password);
      console.log("B");  
      result.catch(function(error){
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(errorCode);
      console.log(errorMessage);

      window.alert("訊息: " + errorMessage);
      });
      // window.alert("註冊成功!接下來是帳號設定!");
    }
    else {
      window.alert("兩次輸入密碼不同，麻煩再輸入一次!!!");
    }
  }else{
    window.alert("填寫未完成，請輸入資料");
  }
});



//logout
$("#btn-logout").click(function(){
  firebase.auth().signOut();
});  
$("#btn-logout-rwd").click(function(){
  firebase.auth().signOut();
});  


//acccount
$("#btn-account").click(function(){

  var username = $("#username").val();
  var interest = $("#hobby").val(); 
  
  var rootRef = firebase.database().ref().child("Users");
  var userID = firebase.auth().currentUser.uid;
  var usersRef = rootRef.child(userID);

  if (username != "" && interest != ""){
    var userData = {
      "username":username,
      "interest":interest,
    };
    usersRef.set(userData, function(error){

        if (error){
          var errorCode = error.code;
          var errorMessage = error.message;

          console.log(errorCode);
          console.log(errorMessage);

          window.alert("訊息: " + errorMessage);
        }else{
          window.alert("資料設定完成!!");
          window.location.href = "MainPage.html";
        }
    });
  }else{
    window.alert("填寫未完成，請輸入資料");
  }
 });
 
 
// 控制手機板選單顯示
$('.menu').click(function() {
  console.log('fjsdiof')
  $('.hamburger').addClass('show')
})
$('.close-img').click(function() {
  $('.hamburger').removeClass('show')
})
$('.logout-rwd').click(function() {
  $('.hamburger').removeClass('show')
})
$('.login-rwd').click(function() {
  $('.hamburger').removeClass('show')
})
$('.signup-rwd').click(function() {
  $('.hamburger').removeClass('show')
})

function switchView(view){
  
  $.get({
    url:view,
    catche:false,
  })
  .then(function(data){
    $('#container').html(data)
  });
}

$('#create_post1').click(function(){
  $('.show_post').removeClass('hidden');
});
$('#create_post2').click(function(){
  $('.show_post').removeClass('hidden');
});
$('#create_post3').click(function(){
  $('.show_post').addClass('hidden');
});
$('#create_post1_rwd').click(function(){
  $('.show_post').removeClass('hidden');
});
$('#create_post2_rwd').click(function(){
  $('.show_post').removeClass('hidden');
});
$('#create_post3_rwd').click(function(){
  $('.show_post').addClass('hidden');
});
