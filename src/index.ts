
// // agent data bIue print
// class Agentnew {
//   protected id: string;
//   protected name: string;
//   public status: "Active" | "Idle" | "Queued" | "Failed" | "Offline";
//   constructor(
//     id: string,
//     name: string,
//     status: "Active" | "Idle" | "Queued" | "Failed" | "Offline",
//   ) {
//     this.id = id;
//     this.name = name;
//     this.status = status;
//   }
//   public getid(): string {
//     return this.id;
//   }
// }
// class DeveloperAgent extends Agentnew {
//   constructor(
//     id: string,
//     name: string,
//     status: "Active" | "Idle" | "Queued" | "Failed" | "Offline",
//   ) {
//     super(id, name, status);
//   }
// }
// // fleet manager
// class FleetManager {
//   private agents: Agentnew[] = [];
//   public addAgent(acceptagent: Agentnew): void {
//     this.agents.push(acceptagent);
//     this.renderAgents();
//   }
//   // assign task
//   public assignTask(agentId: string, task: string): void {
//     let foundagent = this.agents.find((a) => a.getid() === agentId);
//     if (foundagent !== undefined) {
//       foundagent.status = "Active";
//       console.log(`Task '${task}' assigned. Agent status is now Active.`);
//       this.renderAgents();
//     } else {
//       console.error(`Agent with ID '${agentId}' not found.`);
//     }
//   }
// }




// const fleetManager = new FleetManager();
// // add event listener to the deploy button
// const deploybtn = document.getElementById("deploybtn") as HTMLButtonElement;
// const agentModal = document.getElementById("agentModal") as HTMLDivElement;
// const closeModalBtn = document.getElementById(
//   "closeModalBtn",
// ) as HTMLButtonElement;
// const cancelBtn = document.getElementById("cancelBtn") as HTMLButtonElement;
// const agentForm = document.getElementById("agentForm") as HTMLFormElement;

// deploybtn.addEventListener("click", () => {
//   agentModal.classList.remove("hidden");
// });
// const hideModal = () => agentModal.classList.add("hidden");
// closeModalBtn.addEventListener("click", hideModal);
// cancelBtn.addEventListener("click", hideModal);
// // agentForm.addEventListener("submit", (e) => {
// //   e.preventDefault();
// //   const nameInput = document.getElementById("agentName") as HTMLInputElement;
// //   const taskInput = document.getElementById("agentTask") as HTMLInputElement;
// //   const uniqueId = `agent-${Date.now().toString()}`;
// //   const newAgent = new DeveloperAgent(uniqueId, nameInput.value.trim(), "Idle");
// //   fleetManager.addAgent(newAgent);
// //   fleetManager.assignTask(uniqueId, taskInput.value.trim());
// //   agentForm.reset();
// //   hideModal();
// //   // nameInput.value = "";
// //   // taskInput.value = "";
// // });


// agentForm.addEventListener("submit", (e: Event) => {
//   e.preventDefault();

//   // Scope conflicts aur crash se bachne ke liye unique variable naming
//   const modalNameField = document.getElementById("agentName") as HTMLInputElement;
//   const modalTaskField = document.getElementById("agentTask") as HTMLInputElement;

//   if (modalNameField && modalTaskField) {
//     const uniqueId = `agent-${Date.now().toString()}`;
//     const cleanName = modalNameField.value.trim();
//     const cleanTask = modalTaskField.value.trim();

//     // 1. Array Update
//     const newAgent = new DeveloperAgent(uniqueId, cleanName, "Idle");
//     fleetManager.addAgent(newAgent);
    
//     // 2. Task Allocation
//     fleetManager.assignTask(uniqueId, cleanTask);

//     // 3. Live UI Re-rendering
//     // fleetManager.renderAgents();

//     // Form cleanup & exit
//     agentForm.reset();
//     hideModal();
//   }
// });

// ============================================================
// AGENT DATA BLUEPRINT
// ============================================================
type AgentStatus = "Active" | "Idle" | "Queued" | "Failed" | "Offline";

class Agentnew {
  protected id: string;
  protected name: string;
  protected task: string = "";
  public status: AgentStatus;

  constructor(id: string, name: string, status: AgentStatus) {
    this.id = id;
    this.name = name;
    this.status = status;
  }

  public getid(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getCurrentTask(): string {
    return this.task || "—";
  }

  public setTask(task: string): void {
    this.task = task;
  }
}

class DeveloperAgent extends Agentnew {
  constructor(id: string, name: string, status: AgentStatus) {
    super(id, name, status);
  }
}

// ============================================================
// FLEET MANAGER
// ============================================================
class FleetManager {
  private agents: Agentnew[] = [];

  public addAgent(agent: Agentnew): void {
    this.agents.push(agent);
    this.renderAgents();
  }

  public assignTask(agentId: string, task: string): void {
    const foundAgent = this.agents.find((a) => a.getid() === agentId);
    if (foundAgent !== undefined) {
      foundAgent.status = "Active";
      foundAgent.setTask(task);
      console.log(`Task '${task}' assigned. Agent status is now Active.`);
      this.renderAgents();
    } else {
      console.error(`Agent with ID '${agentId}' not found.`);
    }
  }

  public renderAgents(): void {
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
      } else {
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

  private renderRow(agent: Agentnew): string {
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

  private statusDotColor(status: AgentStatus): string {
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

  private statusTextColor(status: AgentStatus): string {
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

const deploybtn = document.getElementById("deploybtn") as HTMLButtonElement;
const agentModal = document.getElementById("agentModal") as HTMLDivElement;
const closeModalBtn = document.getElementById("closeModalBtn") as HTMLButtonElement;
const cancelBtn = document.getElementById("cancelBtn") as HTMLButtonElement;
const agentForm = document.getElementById("agentForm") as HTMLFormElement;

deploybtn.addEventListener("click", () => {
  agentModal.classList.remove("hidden");
});

const hideModal = () => agentModal.classList.add("hidden");
closeModalBtn.addEventListener("click", hideModal);
cancelBtn.addEventListener("click", hideModal);

agentForm.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  const modalNameField = document.getElementById("agentName") as HTMLInputElement;
  const modalTaskField = document.getElementById("agentTask") as HTMLInputElement;

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
