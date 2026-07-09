class Agentnew {
    constructor(id, name, status) {
        this.task = "";
        this.id = id;
        this.name = name;
        this.status = status;
    }
    getid() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getCurrentTask() {
        return this.task || "—";
    }
    setTask(task) {
        this.task = task;
    }
}
class DeveloperAgent extends Agentnew {
    constructor(id, name, status) {
        super(id, name, status);
    }
}
class FleetManager {
    constructor() {
        this.agents = [];
    }
    addAgent(agent) {
        this.agents.push(agent);
        this.renderAgents();
    }
    assignTask(agentId, task) {
        const foundAgent = this.agents.find((a) => a.getid() === agentId);
        if (foundAgent !== undefined) {
            foundAgent.status = "Active";
            foundAgent.setTask(task);
            console.log(`Task '${task}' assigned. Agent status is now Active.`);
            this.renderAgents();
        }
        else {
            console.error(`Agent with ID '${agentId}' not found.`);
        }
    }
    renderAgents() {
        const tbody = document.getElementById("agentsTableBody");
        const activeCountEl = document.getElementById("activeAgentsCount");
        const totalMessagesEl = document.getElementById("agentMessagesCount");
        if (tbody) {
            if (this.agents.length === 0) {
                tbody.innerHTML = `
          <tr>
            <td colspan="4" class="py-4 text-center text-slate-500 text-xs font-mono">
              No agents deployed yet.
            </td>
          </tr>`;
            }
            else {
                tbody.innerHTML = this.agents
                    .map((a) => this.renderRow(a))
                    .join("");
            }
        }
        if (activeCountEl) {
            const activeCount = this.agents.filter((a) => a.status === "Active").length;
            activeCountEl.textContent = String(activeCount);
        }
        if (totalMessagesEl) {
            totalMessagesEl.textContent = String(this.agents.length);
        }
    }
    renderRow(agent) {
        const dotColor = this.statusDotColor(agent.status);
        const textColor = this.statusTextColor(agent.status);
        return `
      <tr class="border-b border-slate-800/40">
        <td class="py-2.5 flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full ${dotColor}"></span>${agent.getName()}
        </td>
        <td class="py-2.5 text-slate-400">${agent.getCurrentTask()}</td>
        <td class="py-2.5">
          <span class="${textColor} text-xs font-mono">● ${agent.status}</span>
        </td>
        <td class="py-2.5 text-right text-slate-500 font-mono text-xs">just now</td>
      </tr>`;
    }
    statusDotColor(status) {
        switch (status) {
            case "Active":
                return "bg-neon-blue";
            case "Idle":
                return "bg-slate-500";
            case "Queued":
                return "bg-amber-400";
            case "Failed":
                return "bg-rose-400";
            case "Offline":
                return "bg-slate-700";
            default:
                return "bg-slate-500";
        }
    }
    statusTextColor(status) {
        switch (status) {
            case "Active":
                return "text-neon-green";
            case "Idle":
                return "text-slate-500";
            case "Queued":
                return "text-amber-400";
            case "Failed":
                return "text-rose-400";
            case "Offline":
                return "text-slate-600";
            default:
                return "text-slate-500";
        }
    }
}
const fleetManager = new FleetManager();
const deploybtn = document.getElementById("deploybtn");
const agentModal = document.getElementById("agentModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const cancelBtn = document.getElementById("cancelBtn");
const agentForm = document.getElementById("agentForm");
deploybtn.addEventListener("click", () => {
    agentModal.classList.remove("hidden");
});
const hideModal = () => agentModal.classList.add("hidden");
closeModalBtn.addEventListener("click", hideModal);
cancelBtn.addEventListener("click", hideModal);
agentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const modalNameField = document.getElementById("agentName");
    const modalTaskField = document.getElementById("agentTask");
    if (modalNameField && modalTaskField) {
        const uniqueId = `agent-${Date.now().toString()}`;
        const cleanName = modalNameField.value.trim();
        const cleanTask = modalTaskField.value.trim();
        if (!cleanName || !cleanTask) {
            return;
        }
        const newAgent = new DeveloperAgent(uniqueId, cleanName, "Idle");
        fleetManager.addAgent(newAgent);
        fleetManager.assignTask(uniqueId, cleanTask);
        agentForm.reset();
        hideModal();
    }
});
fleetManager.renderAgents();
export {};
//# sourceMappingURL=index.js.map