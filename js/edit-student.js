layout('add-student.html');
const sid=new URLSearchParams(location.search).get('id');
const all=DB.get('smd_students'),st=all.find(s=>s.id===sid);
if(!st){alert('Student not found');location.href='add-student.html'}
else{
 $('#id').value=st.id;$('#name').value=st.name;$('#cls').value=st.cls;
 $('#gender').value=st.gender;$('#email').value=st.email;$('#phone').value=st.phone;
}
$('#editForm').addEventListener('submit',e=>{
 e.preventDefault();
 Object.assign(st,{name:$('#name').value.trim(),cls:$('#cls').value.trim(),gender:$('#gender').value,email:$('#email').value.trim(),phone:$('#phone').value.trim()});
 DB.set('smd_students',all);showMsg('#msg','Student updated successfully.');
 setTimeout(()=>location.href='add-student.html',1000);
});
