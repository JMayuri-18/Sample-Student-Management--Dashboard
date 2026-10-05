/* Shared helpers, localStorage database and authentication */
const DB={get(k,d=[]){try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}},set(k,v){localStorage.setItem(k,JSON.stringify(v))}};
const SUBJECTS=['English','Mathematics','Science','Social Studies','Computer'];
const $=s=>document.querySelector(s);
if(!DB.get('smd_users').length)DB.set('smd_users',[{name:'Administrator',username:'admin',password:'admin123'}]);
if(!DB.get('smd_students').length){
 DB.set('smd_students',[
  {id:'S001',name:'Anil Kumar',cls:'10-A',gender:'Male',email:'anil@example.com',phone:'9876500001'},
  {id:'S002',name:'Priya Sharma',cls:'10-A',gender:'Female',email:'priya@example.com',phone:'9876500002'},
  {id:'S003',name:'Rahul Verma',cls:'10-B',gender:'Male',email:'rahul@example.com',phone:'9876500003'}]);
 DB.set('smd_marks',{S001:{English:78,Mathematics:85,Science:80,'Social Studies':72,Computer:90},
  S002:{English:88,Mathematics:92,Science:90,'Social Studies':85,Computer:95},S003:{English:55,Mathematics:48,Science:60,'Social Studies':52,Computer:70}});
}
const Auth={
 user:()=>DB.get('smd_session',null),
 login(u,p){const f=DB.get('smd_users').find(x=>x.username===u&&x.password===p);if(!f)return false;DB.set('smd_session',{name:f.name,username:f.username});return true},
 require(){if(!Auth.user())location.href='login.html'},
 logout(){localStorage.removeItem('smd_session');location.href='logout.html'}
};
function calc(m){
 const vals=SUBJECTS.map(s=>+m[s]||0),total=vals.reduce((a,b)=>a+b,0),pct=total/SUBJECTS.length;
 const grade=pct>=90?'A+':pct>=80?'A':pct>=70?'B':pct>=60?'C':pct>=40?'D':'F';
 return{total,pct:pct.toFixed(1),grade,result:vals.every(v=>v>=35)?'Pass':'Fail'};
}
function layout(active){
 Auth.require();
 const links=[['dashboard.html','Dashboard'],['add-student.html','Students'],['marks.html','Enter Marks'],['marksheet.html','Marksheet']];
 document.body.insertAdjacentHTML('afterbegin','<aside class="sidebar"><h2>SMD Portal</h2><nav>'+
  links.map(l=>`<a href="${l[0]}" class="${l[0]===active?'active':''}">${l[1]}</a>`).join('')+'<a href="#" id="logoutBtn">Logout</a></nav></aside>');
 $('#logoutBtn').onclick=e=>{e.preventDefault();Auth.logout()};
 const u=$('.topbar .user');if(u)u.textContent='Welcome, '+Auth.user().name;
}
function showMsg(id,text,ok=true){const e=$(id);e.textContent=text;e.className='msg '+(ok?'ok':'err')}
