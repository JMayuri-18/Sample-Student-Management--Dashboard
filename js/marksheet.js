layout('marksheet.html');
const studs=DB.get('smd_students');
$('#student').innerHTML='<option value="">-- Select Student --</option>'+studs.map(s=>`<option value="${s.id}">${s.id} - ${s.name}</option>`).join('');
$('#student').addEventListener('change',()=>{
 const id=$('#student').value,s=studs.find(x=>x.id===id),m=DB.get('smd_marks',{})[id];
 if(!s)return $('#sheet').innerHTML='';
 if(!m)return $('#sheet').innerHTML='<p class="msg err">Marks have not been entered for this student.</p>';
 const r=calc(m);
 $('#sheet').innerHTML=`<div class="sheet"><h2>STUDENT MARKSHEET</h2><hr style="margin:10px 0">
  <div class="meta"><div><b>Name:</b> ${s.name}</div><div><b>Roll No:</b> ${s.id}</div><div><b>Class:</b> ${s.cls}</div><div><b>Gender:</b> ${s.gender}</div></div>
  <table><tr><th>Subject</th><th>Max</th><th>Obtained</th></tr>${SUBJECTS.map(x=>`<tr><td>${x}</td><td>100</td><td>${m[x]}</td></tr>`).join('')}
  <tr><th>Total</th><th>500</th><th>${r.total}</th></tr></table>
  <p style="margin-top:14px"><b>Percentage:</b> ${r.pct}% &nbsp; <b>Grade:</b> ${r.grade} &nbsp; <b>Result:</b> <span class="${r.result==='Pass'?'pass':'fail'}">${r.result}</span></p></div>
  <p style="text-align:center;margin-top:16px" class="no-print"><button class="btn" onclick="window.print()">Print Marksheet</button></p>`;
});
