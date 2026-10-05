/* Student profile popup */
function showProfile(id){
 const s=DB.get('smd_students').find(x=>x.id===id),m=DB.get('smd_marks',{})[id];
 const r=m?calc(m):null;
 $('#profileBody').innerHTML=`<h3>${s.name}</h3><table>
  <tr><th>Roll No</th><td>${s.id}</td></tr><tr><th>Class</th><td>${s.cls}</td></tr><tr><th>Gender</th><td>${s.gender}</td></tr>
  <tr><th>Email</th><td>${s.email}</td></tr><tr><th>Phone</th><td>${s.phone}</td></tr>
  <tr><th>Result</th><td>${r?`${r.pct}% (Grade ${r.grade}) - <span class="${r.result==='Pass'?'pass':'fail'}">${r.result}</span>`:'Marks not entered'}</td></tr></table>
  <p style="margin-top:14px"><button class="btn gray" onclick="$('#profileModal').classList.remove('show')">Close</button></p>`;
 $('#profileModal').classList.add('show');
}
