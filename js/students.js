layout('add-student.html');
function render(q=''){
 const list=DB.get('smd_students').filter(s=>(s.name+s.id+s.cls).toLowerCase().includes(q.toLowerCase()));
 $('#tbody').innerHTML=list.map(s=>`<tr><td>${s.id}</td><td>${s.name}</td><td>${s.cls}</td><td>${s.gender}</td><td>${s.phone}</td><td>
  <button class="btn sm" onclick="showProfile('${s.id}')">View</button>
  <a class="btn sm gray" href="edit-student.html?id=${s.id}">Edit</a>
  <button class="btn sm red" onclick="del('${s.id}')">Delete</button></td></tr>`).join('')||'<tr><td colspan="6">No students found</td></tr>';
}
function del(id){
 if(!confirm('Delete this student and their marks?'))return;
 DB.set('smd_students',DB.get('smd_students').filter(s=>s.id!==id));
 const m=DB.get('smd_marks',{});delete m[id];DB.set('smd_marks',m);render($('#search').value);
}
$('#studentForm').addEventListener('submit',e=>{
 e.preventDefault();
 const list=DB.get('smd_students'),id=$('#id').value.trim().toUpperCase();
 if(list.some(s=>s.id===id))return showMsg('#msg','Roll number already exists.',false);
 list.push({id,name:$('#name').value.trim(),cls:$('#cls').value.trim(),gender:$('#gender').value,email:$('#email').value.trim(),phone:$('#phone').value.trim()});
 DB.set('smd_students',list);e.target.reset();showMsg('#msg','Student added successfully.');render();
});
$('#search').addEventListener('input',e=>render(e.target.value));
render();
