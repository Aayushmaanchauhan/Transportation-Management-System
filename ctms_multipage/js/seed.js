export const seed = {
  vehicles: [
    { id: "GJ-09-AB-1122", type: "Bus", capacity: 48, status: "Active", lastService: "2025-10-15", notes: "OK" },
    { id: "GJ-09-CD-3311", type: "Mini Bus", capacity: 26, status: "Active", lastService: "2025-09-20", notes: "Tyres" },
    { id: "GJ-09-EF-7766", type: "Bus", capacity: 52, status: "Maintenance", lastService: "2025-07-30", notes: "Brake check" },
  ],
  drivers: [
    { id: "DRV-001", name: "R. Sharma", phone: "+91-98765-12345", license: "GJ-2023-7788", rating: 4.8, status: "On Duty" },
    { id: "DRV-002", name: "M. Khan", phone: "+91-98989-77777", license: "GJ-2022-5531", rating: 4.6, status: "Standby" },
    { id: "DRV-003", name: "S. Patel", phone: "+91-91234-99999", license: "GJ-2021-1144", rating: 4.9, status: "On Duty" },
  ],
  routes: [
    { routeId: "R-01", vehicleId: "GJ-09-AB-1122", driverId: "DRV-001", start: "City Center", end: "Campus Main Gate", stops: ["Circle A","Mall Rd","Sector 5"], time: "07:10 → 08:05" },
    { routeId: "R-02", vehicleId: "GJ-09-CD-3311", driverId: "DRV-002", start: "Old Town", end: "Campus Main Gate", stops: ["Temple Chowk","Lake View","East Gate"], time: "07:20 → 08:15" },
  ],
  students: [
    { roll: "CSE21-001", name: "Anjali Verma", routeId: "R-01", stop: "Mall Rd", feeDue: 0 },
    { roll: "ECE21-044", name: "Harsh Gupta", routeId: "R-02", stop: "Lake View", feeDue: 1200 },
    { roll: "ME21-077", name: "Pooja Nair", routeId: "R-01", stop: "Sector 5", feeDue: 0 },
  ],
  alerts: [
    { id: 1, text: "Route R-01 delayed by 10 minutes due to traffic.", critical: false, ts: Date.now()-60000 },
    { id: 2, text: "Safety Drill on Monday 10 AM in Transport Bay.", critical: true, ts: Date.now()-360000 },
  ]
};
