//post
const postList = document.querySelector('.post');
const commentList = document.querySelector('.comment');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');


const setupUI = (user) => {
  if (user){
    //account detail
    db.collection('user').doc(user.uid).get().then(doc => {
      const html = `
        <div style="font-size:18px;font-weight:bold;">使用者名稱:&nbsp&nbsp&nbsp&nbsp${doc.data().username}</div>
        <div style="height:30px;"></div> 
        <div style="font-size:18px;font-weight:bold;">郵件:&nbsp&nbsp&nbsp&nbsp${user.email}</div>
      `;
      accountDetails.innerHTML = html;
    })   

    
    //toggle UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  }else{
    //hide account info
    accountDetails.innerHTML = '';
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
}
const setuppost = (data) => {
  
  if (data.length){
    let html = '';
    data.forEach(doc => {
      const post = doc.data();
      // const comment = doc.data();
      
      // db.collection('user').doc(user.uid).get().then(doc => {
      //   const author = `
      //   <div class="post_author">
      //   <p>作者:</p>&nbsp&nbsp&nbsp&nbsp${doc.data().username}
      // </div>
      //   `;
      //   html += author;
      // }) 
      const essay = `
        <div class="post_bg">

          <h3 style="font-size:30px;margin-bottom:30px;">${post.title}</h3>
          <div class="post_author">
            <p>作者:</p>&nbsp&nbsp&nbsp&nbsp${post.author}
          </div>
          <div class="post_time">
            <p>發佈日期:</p>&nbsp&nbsp${post.date}
          </div>
        </div>

        <div class="white post_content" style="font-size:16px;">${post.content}</div>   
        <h5 style="margin-top:40px;">留言板</h5>
        <input type="text" id="message" placeholder="請輸入留言">
        <button class="btn btn-primary" style="background:#1E2D61;">送出</button>
        <div style="height:100px;"></div>   
          
      `;
      html += essay;
    });
    postList.innerHTML = html;
  }else {
    postList.innerHTML = '<h5 class="center-align">登入查看更多資訊</h5>'
  }
}
const setupcomment = (data) => {
  
  if (data.length){
    let html = '';
    data.forEach(doc => {
      const comment = doc.data();
      const text =`
      <div class="post_time">
        <p>發佈日期:</p>&nbsp&nbsp${comment.date}
      </div>
        <div class="white">${comment.content}</div>
        
      `;
      html += text;
    });
    commentList.innerHTML = html;
  }

}

//setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  
  });
