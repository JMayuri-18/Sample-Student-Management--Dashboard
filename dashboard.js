layout('dashboard.html');
const students=DB.get('smd_students'),marks=DB.get('smd_marks',{});
const entered=Object.keys(marks).filter(id=>students.some(s=>s.id===id));
const avg=entered.length?(entered.reduce((a,id)=>a+ +calc(marks[id]).pct,0)/entered.length).toFixed(1):0;
const passed=entered.filter(id=>calc(marks[id]).result==='Pass').length;
$('#stats').innerHTML=[['Total Students',students.length],['Classes',new Set(students.map(s=>s.cls)).size],
 ['Marks Entered',entered.length],['Average %',avg+'%'],['Passed',passed]].map(x=>`<div class="stat"><span>${x[0]}</span><b>${x[1]}</b></div>`).join('');
$('#chart').innerHTML=SUBJECTS.map(sub=>{
 const a=entered.length?entered.reduce((t,id)=>t+(+marks[id][sub]||0),0)/entered.length:0;
 return `<div class="bar-row"><span>${sub}</span><div class="bar"><i style="width:${a}%"></i></div><b>${a.toFixed(0)}</b></div>`}).join('');
