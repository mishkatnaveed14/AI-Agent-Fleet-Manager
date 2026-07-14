// type AgentStatus = "Active" | "Idle" | "Queued" | "Failed" | "Offline";

// class Agentnew {
//   protected id: string;
//   protected name: string;
//   protected task: string = "";
//   public status: AgentStatus;

//   constructor(id: string, name: string, status: AgentStatus) {
//     this.id = id;
//     this.name = name;
//     this.status = status;
//   }

//   public getid(): string {
//     return this.id;
//   }

//   public getName(): string {
//     return this.name;
//   }

//   public getCurrentTask(): string {
//     return this.task || "—";
//   }

//   public setTask(task: string): void {
//     this.task = task;
//   }
// }

// class DeveloperAgent extends Agentnew {
//   constructor(id: string, name: string, status: AgentStatus) {
//     super(id, name, status);
//   }
// }

// class FleetManager {
//   private agents: Agentnew[] = [];

//   public addAgent(agent: Agentnew): void {
//     this.agents.push(agent);
//     this.renderAgents();
//   }

//   public assignTask(agentId: string, task: string): void {
//     const foundAgent = this.agents.find((a) => a.getid() === agentId);
//     if (foundAgent !== undefined) {
//       foundAgent.status = "Active";
//       foundAgent.setTask(task);
//       console.log(`Task '${task}' assigned. Agent status is now Active.`);
//       this.renderAgents();
//     } else {
//       console.error(`Agent with ID '${agentId}' not found.`);
//     }
//   }

//   public renderAgents(): void {
//     const tbody = document.getElementById("agentsTableBody");
//     const activeCountEl = document.getElementById("activeAgentsCount");
//     const totalMessagesEl = document.getElementById("agentMessagesCount");

//     if (tbody) {
//       if (this.agents.length === 0) {
//         tbody.innerHTML = `
//           <tr>
//             <td colspan="4" class="py-4 text-center text-slate-500 text-xs font-mono">
//               No agents deployed yet.
//             </td>
//           </tr>`;
//       } else {
//         tbody.innerHTML = this.agents
//           .map((a) => this.renderRow(a))
//           .join("");
//       }
//     }

//     if (activeCountEl) {
//       const activeCount = this.agents.filter((a) => a.status === "Active").length;
//       activeCountEl.textContent = String(activeCount);
//     }

//     if (totalMessagesEl) {
//       totalMessagesEl.textContent = String(this.agents.length);
//     }
//   }

//   private renderRow(agent: Agentnew): string {
//     const dotColor = this.statusDotColor(agent.status);
//     const textColor = this.statusTextColor(agent.status);

//     return `
//       <tr class="border-b border-slate-800/40">
//         <td class="py-2.5 flex items-center gap-2">
//           <span class="w-1.5 h-1.5 rounded-full ${dotColor}"></span>${agent.getName()}
//         </td>
//         <td class="py-2.5 text-slate-400">${agent.getCurrentTask()}</td>
//         <td class="py-2.5">
//           <span class="${textColor} text-xs font-mono">● ${agent.status}</span>
//         </td>
//         <td class="py-2.5 text-right text-slate-500 font-mono text-xs">just now</td>
//       </tr>`;
//   }

//   private statusDotColor(status: AgentStatus): string {
//     switch (status) {
//       case "Active":
//         return "bg-neon-blue";
//       case "Idle":
//         return "bg-slate-500";
//       case "Queued":
//         return "bg-amber-400";
//       case "Failed":
//         return "bg-rose-400";
//       case "Offline":
//         return "bg-slate-700";
//       default:
//         return "bg-slate-500";
//     }
//   }

//   private statusTextColor(status: AgentStatus): string {
//     switch (status) {
//       case "Active":
//         return "text-neon-green";
//       case "Idle":
//         return "text-slate-500";
//       case "Queued":
//         return "text-amber-400";
//       case "Failed":
//         return "text-rose-400";
//       case "Offline":
//         return "text-slate-600";
//       default:
//         return "text-slate-500";
//     }
//   }
// }


// const fleetManager = new FleetManager();

// const deploybtn = document.getElementById("deploybtn") as HTMLButtonElement;
// const agentModal = document.getElementById("agentModal") as HTMLDivElement;
// const closeModalBtn = document.getElementById("closeModalBtn") as HTMLButtonElement;
// const cancelBtn = document.getElementById("cancelBtn") as HTMLButtonElement;
// const agentForm = document.getElementById("agentForm") as HTMLFormElement;

// deploybtn.addEventListener("click", () => {
//   agentModal.classList.remove("hidden");
// });

// const hideModal = () => agentModal.classList.add("hidden");
// closeModalBtn.addEventListener("click", hideModal);
// cancelBtn.addEventListener("click", hideModal);

// agentForm.addEventListener("submit", (e: Event) => {
//   e.preventDefault();

//   const modalNameField = document.getElementById("agentName") as HTMLInputElement;
//   const modalTaskField = document.getElementById("agentTask") as HTMLInputElement;

//   if (modalNameField && modalTaskField) {
//     const uniqueId = `agent-${Date.now().toString()}`;
//     const cleanName = modalNameField.value.trim();
//     const cleanTask = modalTaskField.value.trim();

//     if (!cleanName || !cleanTask) {
//       return;
//     }


//     const newAgent = new DeveloperAgent(uniqueId, cleanName, "Idle");
//     fleetManager.addAgent(newAgent);


//     fleetManager.assignTask(uniqueId, cleanTask);

//     agentForm.reset();
//     hideModal();
//   }
// });

// fleetManager.renderAgents();



// ============================================================
// VORTEX AI — shared front-end logic (TypeScript source)
// Compiled to app.js with `tsc app.ts --target ES2017 --lib dom,es2017`
// Loaded on every page. Every block checks for its own DOM
// elements first, so this one file is safe to include everywhere.
// ============================================================

/* ---------- Sidebar drawer (dashboard / agents / analytics) ---------- */
function openSidebar(): void {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebarOverlay");
  if (sidebar) sidebar.classList.remove("-translate-x-full");
  if (overlay) {
    overlay.classList.remove("opacity-0", "pointer-events-none");
    overlay.classList.add("opacity-100");
  }
}

function closeSidebar(): void {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebarOverlay");
  if (sidebar) sidebar.classList.add("-translate-x-full");
  if (overlay) {
    overlay.classList.add("opacity-0", "pointer-events-none");
    overlay.classList.remove("opacity-100");
  }
}

/* ---------- Landing page mobile nav ---------- */
(function initLandingNav(): void {
  const btn = document.getElementById("mobileMenuBtn");
  const menu = document.getElementById("mobileMenu");
  if (!btn || !menu) return;
  btn.addEventListener("click", () => menu.classList.toggle("hidden"));
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => menu.classList.add("hidden")));
})();

/* ---------- Fleet Manager (agents data model) ---------- */
type AgentStatus = "Active" | "Idle" | "Queued" | "Failed" | "Offline";

const STATUS_DOT: Record<AgentStatus, string> = {
  Active: "bg-neon-blue",
  Idle: "bg-slate-500",
  Queued: "bg-amber-400",
  Failed: "bg-rose-400",
  Offline: "bg-slate-700",
};

const STATUS_TEXT: Record<AgentStatus, string> = {
  Active: "text-neon-green",
  Idle: "text-slate-500",
  Queued: "text-amber-400",
  Failed: "text-rose-400",
  Offline: "text-slate-600",
};

class Agent {
  public id: string;
  public name: string;
  public status: AgentStatus;
  public task: string;
  public updated: string;

  constructor(id: string, name: string, status: AgentStatus, task?: string, updated?: string) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.task = task || "—";
    this.updated = updated || "just now";
  }
}

type AgentFilter = AgentStatus | "all";

class FleetManager {
  private agents: Agent[];
  public activeFilter: AgentFilter;

  constructor() {
    this.agents = [
      new Agent("a1", "Scout-01", "Active", "Lead Enrichment", "2m ago"),
      new Agent("a2", "Synth-07", "Active", "Report Generation", "14m ago"),
      new Agent("a3", "Relay-12", "Queued", "Data Sync", "31m ago"),
      new Agent("a4", "Vault-03", "Idle", "Compliance Scan", "1h ago"),
      new Agent("a5", "Guard-09", "Failed", "Anomaly Detect", "2h ago"),
    ];
    this.activeFilter = "all";
  }

  public addAgent(name: string, task: string): void {
    const id = `agent-${Date.now()}`;
    this.agents.unshift(new Agent(id, name, "Active", task, "just now"));
    this.renderAll();
  }

  public renderAll(): void {
    this.renderTable();
    this.renderGrid();
    this.renderStats();
  }

  private renderStats(): void {
    const activeEl = document.getElementById("activeAgentsCount");
    const runningEl = document.getElementById("runningTasksCount");
    const messagesEl = document.getElementById("agentMessagesCount");
    if (activeEl) activeEl.textContent = String(this.agents.filter((a) => a.status === "Active").length + 40);
    if (runningEl) runningEl.textContent = String(this.agents.filter((a) => a.status === "Active" || a.status === "Queued").length + 13);
    if (messagesEl) messagesEl.textContent = String(this.agents.length + 84);
  }

  private renderTable(): void {
    const tbody = document.getElementById("agentsTableBody");
    if (!tbody) return;
    if (this.agents.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4" class="py-4 text-center text-slate-500 text-xs font-mono">No agents deployed yet.</td></tr>`;
      return;
    }
    tbody.innerHTML = this.agents
      .map(
        (a) => `
      <tr class="border-b border-slate-800/40 last:border-0">
        <td class="py-2.5 flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full ${STATUS_DOT[a.status]}"></span>${a.name}</td>
        <td class="py-2.5 text-slate-400">${a.task}</td>
        <td class="py-2.5"><span class="${STATUS_TEXT[a.status]} text-xs font-mono">● ${a.status}</span></td>
        <td class="py-2.5 text-right text-slate-500 font-mono text-xs">${a.updated}</td>
      </tr>`
      )
      .join("");
  }

  private renderGrid(): void {
    const grid = document.getElementById("agentsGrid");
    if (!grid) return;
    const filtered = this.activeFilter === "all" ? this.agents : this.agents.filter((a) => a.status === this.activeFilter);
    if (filtered.length === 0) {
      grid.innerHTML = `<div class="col-span-full text-center py-10 text-slate-500 text-sm font-mono">No agents match this filter.</div>`;
      return;
    }
    grid.innerHTML = filtered
      .map(
        (a) => `
      <div class="glass border border-slate-800/60 rounded-2xl p-4 hover:border-neon-blue/40 transition-all">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full ${STATUS_DOT[a.status]}"></span>
            <p class="font-semibold text-white text-sm">${a.name}</p>
          </div>
          <span class="${STATUS_TEXT[a.status]} text-[11px] font-mono">${a.status}</span>
        </div>
        <p class="text-xs text-slate-500 mb-1">Current task</p>
        <p class="text-sm text-slate-300 mb-3">${a.task}</p>
        <p class="text-[11px] text-slate-600 font-mono">Updated ${a.updated}</p>
      </div>`
      )
      .join("");
  }
}

const fleetManager = new FleetManager();

/* ---------- Deploy Agent modal (dashboard.html / agents.html) ---------- */
(function initDeployModal(): void {
  const deploybtn = document.getElementById("deploybtn");
  const agentModal = document.getElementById("agentModal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const cancelBtn = document.getElementById("cancelBtn");
  const agentForm = document.getElementById("agentForm") as HTMLFormElement | null;
  if (!deploybtn || !agentModal || !agentForm) return;

  deploybtn.addEventListener("click", () => agentModal.classList.remove("hidden"));
  const hideModal = () => agentModal.classList.add("hidden");
  if (closeModalBtn) closeModalBtn.addEventListener("click", hideModal);
  if (cancelBtn) cancelBtn.addEventListener("click", hideModal);
  agentModal.addEventListener("click", (e: MouseEvent) => {
    if (e.target === agentModal) hideModal();
  });

  agentForm.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    const nameField = document.getElementById("agentName") as HTMLInputElement;
    const taskField = document.getElementById("agentTask") as HTMLInputElement;
    const name = nameField.value.trim();
    const task = taskField.value.trim();
    if (!name || !task) return;
    fleetManager.addAgent(name, task);
    agentForm.reset();
    hideModal();
  });
})();

/* ---------- Agent filter buttons (agents.html) ---------- */
(function initAgentFilters(): void {
  const buttons = document.querySelectorAll<HTMLButtonElement>(".agent-filter-btn");
  if (!buttons.length) return;
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => {
        b.classList.remove("border-neon-blue/40", "bg-neon-blue/10", "text-neon-blue");
        b.classList.add("border-slate-800", "text-slate-400");
      });
      btn.classList.add("border-neon-blue/40", "bg-neon-blue/10", "text-neon-blue");
      btn.classList.remove("border-slate-800", "text-slate-400");
      fleetManager.activeFilter = (btn.dataset.filter as AgentFilter) || "all";
      (fleetManager as any).renderGrid ? (fleetManager as any).renderGrid() : fleetManager.renderAll();
    });
  });
})();

/* Initial render for dashboard / agents pages */
fleetManager.renderAll();

/* ---------- Throughput chart (dashboard.html) ---------- */
declare const Chart: any;

(function initThroughputChart(): void {
  const ctx = document.getElementById("throughputChart") as HTMLCanvasElement | null;
  if (!ctx || typeof Chart === "undefined") return;

  const gradient = ctx.getContext("2d")!.createLinearGradient(0, 0, 0, 220);
  gradient.addColorStop(0, "rgba(0, 195, 253, 0.35)");
  gradient.addColorStop(1, "rgba(0, 195, 253, 0)");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Tasks completed",
          data: [1820, 1990, 2105, 1980, 2260, 2340, 2481],
          borderColor: "#00c3fd",
          backgroundColor: gradient,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#00ff66",
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { color: "#64748b", font: { family: "monospace", size: 10 } } },
        y: { grid: { color: "rgba(148,163,184,0.08)" }, ticks: { color: "#64748b", font: { family: "monospace", size: 10 } } },
      },
    },
  });

  const rangeSelect = document.getElementById("throughputRange");
  if (rangeSelect) {
    rangeSelect.addEventListener("change", () => {
      // Presentation-only control in this static build; wire to a real
      // data source when the API is available.
    });
  }
})();

/* ---------- Analytics page charts ---------- */
(function initAnalyticsCharts(): void {
  const lineCtx = document.getElementById("analyticsLineChart") as HTMLCanvasElement | null;
  const doughnutCtx = document.getElementById("analyticsDoughnutChart") as HTMLCanvasElement | null;
  const barCtx = document.getElementById("analyticsBarChart") as HTMLCanvasElement | null;
  if (typeof Chart === "undefined") return;

  if (lineCtx) {
    new Chart(lineCtx, {
      type: "line",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Throughput",
            data: [1820, 1990, 2105, 1980, 2260, 2340, 2481],
            borderColor: "#00ff66",
            backgroundColor: "rgba(0,255,102,0.12)",
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { color: "#64748b", font: { size: 10 } } },
          y: { grid: { color: "rgba(148,163,184,0.08)" }, ticks: { color: "#64748b", font: { size: 10 } } },
        },
      },
    });
  }

  if (doughnutCtx) {
    new Chart(doughnutCtx, {
      type: "doughnut",
      data: {
        labels: ["Active", "Queued", "Idle", "Failed"],
        datasets: [
          {
            data: [24, 8, 7, 3],
            backgroundColor: ["#00c3fd", "#fbbf24", "#64748b", "#fb7185"],
            borderColor: "#0a0e14",
            borderWidth: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: "bottom", labels: { color: "#94a3b8", font: { size: 11 } } } },
      },
    });
  }

  if (barCtx) {
    new Chart(barCtx, {
      type: "bar",
      data: {
        labels: ["Lead Enrichment", "Report Gen", "Data Sync", "Compliance", "Anomaly Detect"],
        datasets: [
          {
            label: "Tasks",
            data: [820, 640, 510, 340, 171],
            backgroundColor: "#00c3fd",
            borderRadius: 6,
            maxBarThickness: 42,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { color: "#64748b", font: { size: 10 } } },
          y: { grid: { color: "rgba(148,163,184,0.08)" }, ticks: { color: "#64748b", font: { size: 10 } } },
        },
      },
    });
  }
})();

/* ---------- Password visibility toggles (login / signup) ---------- */
function wirePasswordToggle(buttonId: string, inputId: string): void {
  const btn = document.getElementById(buttonId);
  const input = document.getElementById(inputId) as HTMLInputElement | null;
  if (!btn || !input) return;
  btn.addEventListener("click", () => {
    input.type = input.type === "password" ? "text" : "password";
  });
}
wirePasswordToggle("toggleLoginPw", "loginPassword");
wirePasswordToggle("toggleSignupPw", "signupPassword");

/* ---------- Login form ---------- */
(function initLoginForm(): void {
  const form = document.getElementById("loginForm") as HTMLFormElement | null;
  const errorBox = document.getElementById("loginError");
  if (!form) return;

  form.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    const email = (document.getElementById("loginEmail") as HTMLInputElement).value.trim();
    const password = (document.getElementById("loginPassword") as HTMLInputElement).value;

    if (!email || !password) {
      showError(errorBox, "Enter your email and password to continue.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError(errorBox, "That email address doesn't look right.");
      return;
    }

    // Static demo build: no real backend, so any valid-looking
    // credentials proceed straight to the dashboard.
    window.location.href = "dashboard.html";
  });
})();

/* ---------- Signup form ---------- */
(function initSignupForm(): void {
  const form = document.getElementById("signupForm") as HTMLFormElement | null;
  const errorBox = document.getElementById("signupError");
  const pwInput = document.getElementById("signupPassword") as HTMLInputElement | null;
  const pwBar = document.getElementById("pwStrengthBar") as HTMLDivElement | null;
  const pwLabel = document.getElementById("pwStrengthLabel") as HTMLParagraphElement | null;
  if (!form) return;

  interface StrengthLevel {
    width: string;
    color: string;
    label: string;
  }

  if (pwInput && pwBar && pwLabel) {
    pwInput.addEventListener("input", () => {
      const val = pwInput.value;
      let score = 0;
      if (val.length >= 8) score++;
      if (/[A-Z]/.test(val)) score++;
      if (/[0-9]/.test(val)) score++;
      if (/[^A-Za-z0-9]/.test(val)) score++;

      const levels: StrengthLevel[] = [
        { width: "0%", color: "bg-rose-400", label: "Password strength" },
        { width: "25%", color: "bg-rose-400", label: "Weak" },
        { width: "50%", color: "bg-amber-400", label: "Fair" },
        { width: "75%", color: "bg-neon-blue", label: "Good" },
        { width: "100%", color: "bg-neon-green", label: "Strong" },
      ];
      const levelIndex = val.length === 0 ? 0 : Math.max(1, Math.min(score, levels.length - 1));
      const level: StrengthLevel = levels[levelIndex]!;
      pwBar.className = `h-full transition-all duration-300 ${level.color}`;
      pwBar.style.width = level.width;
      pwLabel.textContent = level.label;
    });
  }

  form.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    const name = (document.getElementById("signupName") as HTMLInputElement).value.trim();
    const email = (document.getElementById("signupEmail") as HTMLInputElement).value.trim();
    const password = (document.getElementById("signupPassword") as HTMLInputElement).value;
    const agreed = (document.getElementById("agreeTerms") as HTMLInputElement).checked;

    if (!name || !email || !password) {
      showError(errorBox, "Fill in every field to create your account.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError(errorBox, "That email address doesn't look right.");
      return;
    }
    if (password.length < 8) {
      showError(errorBox, "Your password needs at least 8 characters.");
      return;
    }
    if (!agreed) {
      showError(errorBox, "Please accept the Terms of Service to continue.");
      return;
    }

    window.location.href = "dashboard.html";
  });
})();

function showError(box: HTMLElement | null, message: string): void {
  if (!box) return;
  box.textContent = message;
  box.classList.remove("hidden");
}
