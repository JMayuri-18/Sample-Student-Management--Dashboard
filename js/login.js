if(Auth.user())location.href='dashboard.html';
$('#loginForm').addEventListener('submit',e=>{
 e.preventDefault();
 if(Auth.login($('#username').value.trim(),$('#password').value))location.href='dashboard.html';
 else showMsg('#msg','Invalid username or password.',false);
});
