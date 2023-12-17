// Side bar

const body = document.querySelector('body'),
sidebar = body.querySelector('nav'),
toggle = body.querySelector(".toggle"),
searchBtn = body.querySelector(".search-box"),
modeSwitch = body.querySelector(".toggle-switch"),
modeText = body.querySelector(".mode-text");


toggle.addEventListener("click" , () =>{
sidebar.classList.toggle("close");
})

searchBtn.addEventListener("click" , () =>{
sidebar.classList.remove("close");
})

modeSwitch.addEventListener("click" , () =>{
body.classList.toggle("dark");

if(body.classList.contains("dark")){
  modeText.innerText = "Light mode";
}else{
  modeText.innerText = "Dark mode";
  
}
});

// sign in
$(document).ready(function(){
  console.log($('#define-modal').html());
  if($('#define-modal').html() === "signup"){
    openRegisterModal();
  }
  else {
    openLoginModal();
  }
  $('#define-modal').html('')
});




function showRegisterForm(){
$('.loginBox').fadeOut('fast',function(){
  $('.registerBox').fadeIn('fast');
  $('.login-footer').fadeOut('fast',function(){
      $('.register-footer').fadeIn('fast');
  });
  $('.modal-title').html('Register with');
}); 
}
function showLoginForm(){
$('#loginModal .registerBox').fadeOut('fast',function(){
  $('.loginBox').fadeIn('fast');
  $('.register-footer').fadeOut('fast',function(){
      $('.login-footer').fadeIn('fast');    
  });
  
  $('.modal-title').html('Login with');
});       
$('.error').removeClass('alert alert-danger'); 
}

function openLoginModal(){
showLoginForm();
if( $('.error').html() !== ""){
  shakeModal();
}  
setTimeout(function(){
  $('#loginModal').modal('show');  
  
}, 230);
setTimeout(() => {
  $('.error').removeClass('alert alert-danger').html('');
$('.error-message').html('');
},15000)


}
function openRegisterModal(){
showRegisterForm();
if( $('.error').html() !== ""){
  shakeModal();
}  
setTimeout(function(){
  $('#loginModal').modal('show');    
}, 230);

setTimeout(() => {
  $('.error').removeClass('alert alert-danger').html('');
$('.error-message').html('');
},15000)

}

function loginAjax(){
/*   Remove this comments when moving to server
$.post( "/login", function( data ) {
      if(data == 1){
          window.location.replace("/home");            
      } else {
           shakeModal(); 
      }
  });
*/

/*   Simulate error message from the server   */
shakeModal();
}

function shakeModal(){
$('#loginModal .modal-dialog').addClass('shake');
       $('.error').addClass('alert alert-danger').html("Invalid email/password combination");
       $('input[type="password"]').val('');
       setTimeout( function(){ 
          $('#loginModal .modal-dialog').removeClass('shake'); 
          
}, 1000 ); 
};

