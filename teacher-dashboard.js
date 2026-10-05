/* Teacher-specific widgets: recent admissions and top performers */
(function(){
 const students=DB.get('smd_students'),marks=DB.get('smd_marks',{});
 $('#recent').innerHTML=students.slice(-5).reverse().map(s=>`<tr><td>${s.id}</td><td>${s.name}</td><td>${s.cls}</td></tr>`).join('')||'<tr><td colspan="3">No students yet</td></tr>';
 const top=students.filter(s=>marks[s.id]).map(s=>({...s,...calc(marks[s.id])})).sort((a,b)=>b.pct-a.pct).slice(0,5);
 $('#top').innerHTML=top.map(s=>`<tr><td>${s.name}</td><td>${s.cls}</td><td>${s.pct}%</td><td>${s.grade}</td></tr>`).join('')||'<tr><td colspan="4">No marks entered</td></tr>';
})();
