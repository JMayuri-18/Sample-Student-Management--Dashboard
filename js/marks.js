layout('marks.html');
const students=DB.get('smd_students');
$('#student').innerHTML='<option value="">-- Select Student --</option>'+students.map(s=>`<option value="${s.id}">${s.id} - ${s.name} (${s.cls})</option>`).join('');
$('#fields').innerHTML=SUBJECTS.map(s=>`<div><label>${s} (0-100)</label><input type="number" min="0" max="100" data-sub="${s}" required></div>`).join('');
$('#student').addEventListener('change',()=>{
 const m=DB.get('smd_marks',{})[$('#student').value]||{};
 document.querySelectorAll('[data-sub]').forEach(i=>i.value=m[i.dataset.sub]??'');
});
$('#marksForm').addEventListener('submit',e=>{
 e.preventDefault();
 const id=$('#student').value;if(!id)return showMsg('#msg','Please select a student.',false);
 const m=DB.get('smd_marks',{}),row={};
 document.querySelectorAll('[data-sub]').forEach(i=>row[i.dataset.sub]=Math.min(100,Math.max(0,+i.value)));
 m[id]=row;DB.set('smd_marks',m);showMsg('#msg','Marks saved successfully.');list();
});
function list(){
 const m=DB.get('smd_marks',{});
 $('#tbody').innerHTML=students.filter(s=>m[s.id]).map(s=>{const r=calc(m[s.id]);
  return `<tr><td>${s.id}</td><td>${s.name}</td>${SUBJECTS.map(x=>`<td>${m[s.id][x]}</td>`).join('')}<td>${r.total}</td><td>${r.pct}%</td></tr>`}).join('')||'<tr><td colspan="9">No marks entered yet</td></tr>';
}
list();
