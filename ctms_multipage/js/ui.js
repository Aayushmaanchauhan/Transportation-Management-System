// Shared header + auth guard + sidebar builder
export function injectHeader(){
  const header = document.createElement('header');
  header.className = 'sticky';
  header.innerHTML = `
    <div class="container nav">
      <div class="brand"><span class="chip">🚌</span> <span>College Transport</span></div>
      <nav class="flex">
        <a class="chip" href="dashboard.html">Dashboard</a>
        <a class="chip" href="vehicles.html">Vehicles</a>
        <a class="chip" href="drivers.html">Drivers</a>
        <a class="chip" href="routes.html">Routes</a>
        <a class="chip" href="students.html">Students</a>
        <a class="chip" href="fees.html">Fees</a>
        <a class="chip" href="alerts.html">Alerts</a>
        <a class="chip" href="reports.html">Reports</a>
      </nav>
      <div class="flex">
        <button class="btn ghost small" id="exportBtn">Export JSON</button>
        <button class="btn primary small" id="logoutBtn">Logout</button>
      </div>
    </div>`;
  document.body.prepend(header);
  const exportBtn = header.querySelector('#exportBtn');
  if(exportBtn){
    exportBtn.addEventListener('click', ()=>{
      const blob = new Blob([JSON.stringify(JSON.parse(localStorage.getItem('ctms_state')||'{}'), null, 2)], {type:'application/json'});
      const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href=url; a.download='ctms-data.json'; a.click(); URL.revokeObjectURL(url);
    });
  }
  const logoutBtn = header.querySelector('#logoutBtn');
  if(logoutBtn){
    logoutBtn.addEventListener('click', ()=>{
      localStorage.removeItem('ctms_user');
      location.href = 'index.html';
    });
  }
}

export function guard(){
  const user = JSON.parse(localStorage.getItem('ctms_user')||'null');
  if(!user){ location.replace('index.html'); }
}

export function buildSidebar(active){
  const wrap = document.getElementById('sidebar');
  if(!wrap) return;
  const links = [
    ['dashboard.html','Overview'],
    ['vehicles.html','Vehicles'],
    ['drivers.html','Drivers'],
    ['routes.html','Routes'],
    ['students.html','Students'],
    ['fees.html','Fee Payment'],
    ['alerts.html','Alerts'],
    ['reports.html','Reports & Exports'],
    ['settings.html','Settings']
  ];
  wrap.innerHTML = links.map(([href,label])=>`<a class="side-link ${active===label?'active':''}" href="${href}">${label}</a>`).join('');
}
