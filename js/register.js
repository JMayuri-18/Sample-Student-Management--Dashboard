$('#regForm').addEventListener('submit',e=>{
 e.preventDefault();
 const name=$('#name').value.trim(),username=$('#username').value.trim(),p=$('#password').value,c=$('#confirm').value;
 const users=DB.get('smd_users');
 if(p.length<6)return showMsg('#msg','Password must be at least 6 characters.',false);
 if(p!==c)return showMsg('#msg','Passwords do not match.',false);
 if(users.some(u=>u.username===username))return showMsg('#msg','Username already exists.',false);
 users.push({name,username,password:p});DB.set('smd_users',users);
 showMsg('#msg','Registration successful! Redirecting to login...');
 setTimeout(()=>location.href='login.html',1200);
});
