import { db } from './storage.js';

export function el(id){ return document.getElementById(id); }

export function renderVehicles(filter=""){
  const t = el('vehicleTable');
  const rows = db.state.vehicles
    .filter(v => JSON.stringify(v).toLowerCase().includes(filter))
    .map(v => `<tr>
      <td>${v.id}</td><td>${v.type}</td><td>${v.capacity}</td>
      <td class="${v.status==='Active'?'ok':v.status==='Maintenance'?'warn':'muted'}">${v.status}</td>
      <td>${v.lastService}</td><td>${v.notes||''}</td>
      <td><button class="btn small ghost" data-del="${v.id}">Delete</button></td>
    </tr>`).join('');
  t.innerHTML = `<thead><tr><th>ID</th><th>Type</th><th>Cap.</th><th>Status</th><th>Last Service</th><th>Notes</th><th></th></tr></thead>
  <tbody>${rows || `<tr><td colspan="7" class="muted">No vehicles</td></tr>`}</tbody>`;
}

export function renderDrivers(filter=""){
  const t = el('driverTable');
  const rows = db.state.drivers
    .filter(d => JSON.stringify(d).toLowerCase().includes(filter))
    .map(d => `<tr>
      <td>${d.id}</td><td>${d.name}</td><td>${d.phone}</td><td>${d.license}</td><td>${d.rating.toFixed(1)}★</td><td>${d.status}</td>
      <td><button class="btn small ghost" data-del="${d.id}">Delete</button></td>
    </tr>`).join('');
  t.innerHTML = `<thead><tr><th>ID</th><th>Name</th><th>Phone</th><th>License</th><th>Rating</th><th>Status</th><th></th></tr></thead>
  <tbody>${rows || `<tr><td colspan="7" class="muted">No drivers</td></tr>`}</tbody>`;
}

export function renderRoutes(filter=""){
  const t = el('routeTable');
  const rows = db.state.routes
    .filter(r => JSON.stringify(r).toLowerCase().includes(filter))
    .map(r => `<tr>
      <td>${r.routeId}</td><td>${r.vehicleId}</td><td>${r.driverId}</td>
      <td>${r.start} → ${r.end}</td><td>${r.stops.join(', ')}</td><td>${r.time}</td>
      <td><button class="btn small ghost" data-del="${r.routeId}">Delete</button></td>
    </tr>`).join('');
  t.innerHTML = `<thead><tr><th>ID</th><th>Vehicle</th><th>Driver</th><th>Route</th><th>Stops</th><th>Time</th><th></th></tr></thead>
  <tbody>${rows || `<tr><td colspan="7" class="muted">No routes</td></tr>`}</tbody>`;

  // selects
  const rv = el('routeVehicle'), rd = el('routeDriver'), sr = el('studentRoute');
  if(rv) rv.innerHTML = db.state.vehicles.map(v=>`<option>${v.id}</option>`).join('');
  if(rd) rd.innerHTML = db.state.drivers.map(d=>`<option>${d.id}</option>`).join('');
  if(sr) sr.innerHTML = db.state.routes.map(r=>`<option>${r.routeId}</option>`).join('');
}

export function renderStudents(filter=""){
  const t = el('studentTable');
  const rows = db.state.students
    .filter(s => JSON.stringify(s).toLowerCase().includes(filter))
    .map(s => `<tr>
      <td>${s.roll}</td><td>${s.name}</td><td>${s.routeId}</td><td>${s.stop}</td>
      <td>${s.feeDue ? `₹${s.feeDue}` : '<span class="ok">Paid</span>'}</td>
      <td><button class="btn small" data-pay="${s.roll}">Mark Paid</button> <button class="btn small ghost" data-del="${s.roll}">Delete</button></td>
    </tr>`).join('');
  t.innerHTML = `<thead><tr><th>Roll</th><th>Name</th><th>Route</th><th>Stop</th><th>Fee</th><th></th></tr></thead>
  <tbody>${rows || `<tr><td colspan="6" class="muted">No students</td></tr>`}</tbody>`;
}

export function renderFeesSummary(){
  const totalDue = db.state.students.reduce((n,s)=>n + (Number(s.feeDue)||0), 0);
  const students = db.state.students.length;
  const routes = db.state.routes.length;
  const collected =  db.state.students.reduce((n,s)=> n + (s.feeDue?0:1), 0);
  el('feeDue').textContent = `₹${totalDue}`;
  el('feeStudents').textContent = students;
  el('feeRoutes').textContent = routes;
  el('feeCollected').textContent = `${collected} paid`;
}
