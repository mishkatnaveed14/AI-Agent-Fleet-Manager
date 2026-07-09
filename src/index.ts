// agent data bIue print
class Agentnew {
  protected id: string;
  protected name: string;
  public status: "Active" | "Idle" | "Queued" | "Failed" | "Offline";
  constructor(
    id: string,
    name: string,
    status: "Active" | "Idle" | "Queued" | "Failed" | "Offline",
  ) {
    this.id = id;
    this.name = name;
    this.status = status;
  }
  public getid(): string {
    return this.id;
  }
}
class DeveloperAgent extends Agentnew {
  constructor(
    id: string,
    name: string,
    status: "Active" | "Idle" | "Queued" | "Failed" | "Offline",
  ) {
    super(id, name, status);
  }

}
// fleet manager
class FleetManager {
  private agents: Agentnew[] = [];
  public addAgent(acceptagent: Agentnew): void {
    this.agents.push(acceptagent);
  }
  // assign task
  public assignTask(agentId: string, task: string): void {
    let foundagent = this.agents.find((a) => a.getid() === agentId);
    if (foundagent !== undefined) {
      foundagent.status = "Active";
      console.log(`Task '${task}' assigned. Agent status is now Active.`);
    } else {
      console.error(`Agent with ID '${agentId}' not found.`);
    }
  }
}
const fleetManager = new FleetManager();
// add event listener to the deploy button
const deploybtn = document.getElementById("deploybtn") as HTMLButtonElement;
const agentModal = document.getElementById("agentModal") as HTMLDivElement;
const closeModalBtn = document.getElementById(
  "closeModalBtn",
) as HTMLButtonElement;
const cancelBtn = document.getElementById("cancelBtn") as HTMLButtonElement;
const agentForm = document.getElementById("agentForm") as HTMLFormElement;

deploybtn.addEventListener("click", () => {
  agentModal.classList.remove("hidden");
});
const hideModal = () => agentModal.classList.add("hidden");
closeModalBtn.addEventListener("click", hideModal);
cancelBtn.addEventListener("click", hideModal);
agentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const nameInput = document.getElementById("agentName") as HTMLInputElement;
  const taskInput = document.getElementById("agentTask") as HTMLInputElement;
  const uniqueId = `agent-${Date.now().toString()}`;
  const newAgent = new DeveloperAgent(uniqueId, nameInput.value.trim(), "Idle");
  fleetManager.addAgent(newAgent);
  fleetManager.assignTask(uniqueId, taskInput.value.trim());
  agentForm.reset();
  hideModal();
  // nameInput.value = "";
  // taskInput.value = "";
});
