//listen for auth status change
auth.onAuthStateChanged(user => {

  if (user){
    
    // console.log(name.value);
    db.collection('post').onSnapshot(snapshot => {
      // console.log(snapshot.docs)
      setuppost(snapshot.docs);
      setupUI(user);
    }, err =>{
      console.log(err.message);
    });
    db.collection('comment').onSnapshot(snapshot => {
      // console.log(snapshot.docs)
      setuppost(snapshot.docs);
      setupUI(user);
    }, err =>{
      console.log(err.message);
    });
    console.log('user logged in:');
  }else {
    setuppost([]);
    setupUI();
    console.log('user logged out');
  }
});

//create new comment
// const createComment = document.querySelector('#create-comment');
// createComment.addEventListener('submit', (e) => {
//   e.preventDefault();
//       let Today = new Date();
//       let data =  Today.getMonth()+1 + ' 月 '+ Today.getDate()+ ' 日 ' +  Today.getHours() + '時'+Today.getMinutes() + '分';
      
//       db.collection('comment').add({
//         // title: createPost.title.value;
//         date: data,
//         content: createComment['content'].value,
//         }).then(() => {
//           const modal = document.querySelector('#create-comment');
//           M.Modal.getInstance(modal).close();
//           // createComment.reset();
//         }).catch(err => {
//           console.log(err.message);
//   });
// });



// signup

const signupForm = document.querySelector("#signup-form");

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  //sign up the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    return db.collection('user').doc(cred.user.uid).set({
      username: signupForm['username'].value
    });     
  }).then(() => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
    signupForm.querySelector('.error').innerHTML = '';
  }).catch(err => {
    signupForm.querySelector('.error').innerHTML = '/'+ err.message +'/';
    console.log(err.message);
  });
});

// logout
const logout = document.querySelectorAll("#logout");
console.log(logout.length);
for (let i = 0; i < logout.length; i++) {
    logout[i].addEventListener("click", (e) => {
      e.preventDefault();
      auth.signOut();
    });
}


// login
const loginForm = document.querySelector('#login-form');
  loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log("Aa");
  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });
});

//create new post
// const createPost = document.querySelector('#create-post');
// createPost.addEventListener('submit', (e) => {
  
//   e.preventDefault();
//   let Today = new Date();
//   let data = Today.getFullYear()+ ' 年 ' + (Today.getMonth()+1) + ' 月 ' + Today.getDate() + ' 日 '+ Today.getHours() + ' 時 ' + Today.getMinutes() + ' 分 ';
//   auth.onAuthStateChanged(user => {
//     db.collection('user').doc(user.uid).get().then(doc => {
//       if (user){
//         const name = doc.data().username;
//         // console.log(user.email);
//         db.collection('post').add({
//           // title: createPost.title.value;
//           title: createPost['title'].value, //title is a "id" type
//           date: data,
//           author:name,
//           content: createPost['content'].value,
//         }).then(() => {
//             const modal = document.querySelector('#modal-create');
//             M.Modal.getInstance(modal).close();
//             createPost.reset();
//         }).catch(err => {
//           console.log(err.message);
//         })
//       }
//     });
//   });
  
// });

// google
// var provider = new firebase.auth.GoogleAuthProvider();
// var btnGoogleRedirect = document.getElementById('sign_google');

// btnGoogleRedirect.onclick = function() {
//   console.log('a');
//   firebase.auth().signInWithRedirect(provider).then(function(result) {    
//     var token = result.credential.accessToken;
//     var user = result.user;
//   });
//  }
