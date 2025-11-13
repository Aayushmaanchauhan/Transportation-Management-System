// --- Feedback Storage Helpers ---
const KEY = "ctms_feedback";
const form = document.getElementById("feedbackForm");
const list = document.getElementById("feedbackList");
const exportBtn = document.getElementById("exportBtn");
const clearBtn = document.getElementById("clearBtn");
const statusMsg = document.getElementById("statusMsg");

function loadAll() {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); }
  catch { return []; }
}
function saveAll(arr) { localStorage.setItem(KEY, JSON.stringify(arr)); }
function escapeHTML(s){ return (s||"").replace(/[&<>"']/g,m=>({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[m])); }

function render() {
  const all = loadAll().slice().reverse();
  list.innerHTML = all.length
    ? all.map(f => `
      <div class="panel pad" style="background:rgba(255,255,255,.06)">
        <div class="row">
          <div><span class="pill">${escapeHTML(f.category)}</span></div>
          <div class="muted" style="text-align:right">${new Date(f.createdAt).toLocaleString()}</div>
        </div>
        <p style="margin:8px 0">${escapeHTML(f.message)}</p>
        <p class="muted" style="margin:0">
          ${f.name ? escapeHTML(f.name) : "Anonymous"}
          ${f.rating ? " • Rating: " + escapeHTML(f.rating) : ""}
          ${f.email ? " • " + escapeHTML(f.email) : ""}
        </p>
      </div>`).join("")
    : `<p class="muted">No feedback yet.</p>`;
}

// --- Form Events ---
if (form) {
  form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const fd = new FormData(form);
    const entry = {
      name: fd.get("name")?.trim(),
      email: fd.get("email")?.trim(),
      category: fd.get("category"),
      message: fd.get("message")?.trim(),
      rating: fd.get("rating"),
      consent: fd.get("consent"),
      createdAt: Date.now()
    };
    if(!entry.message){
      statusMsg.textContent = "Please write some feedback.";
      return;
    }
    const all = loadAll(); all.push(entry); saveAll(all);
    form.reset(); statusMsg.textContent = "✅ Thank you! Feedback saved locally.";
    render();
  });

  exportBtn.addEventListener("click", ()=>{
    const blob = new Blob([JSON.stringify(loadAll(), null, 2)], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement("a"), { href: url, download: "ctms-feedback.json" });
    document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
  });

  clearBtn.addEventListener("click", ()=>{
    if (confirm("Clear all saved feedback?")) { saveAll([]); render(); }
  });
}

// --- Simple tab highlight ---
function setActiveTab(){
  const h = (location.hash || "#feedback").toLowerCase();
  document.getElementById("t1")?.classList.toggle("active", h.includes("feedback"));
  document.getElementById("t2")?.classList.toggle("active", h.includes("faq"));
  const target = document.querySelector(h);
  if (target) target.scrollIntoView({behavior:"smooth", block:"start"});
}
window.addEventListener("hashchange", setActiveTab);
setActiveTab();

render();
