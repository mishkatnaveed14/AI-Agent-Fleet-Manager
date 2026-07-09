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
  //    let specialization: string = "";
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
    if(foundagent !== undefined) {
      foundagent.status = "Active";
      console.log(`Task '${task}' assigned. Agent status is now Active.`);
    }else {
      console.error(`Agent with ID '${agentId}' not found.`);
    }
  }
} 
 const fleetManager = new FleetManager();
const deploybtn = document.getElementById("deploybtn") as HTMLButtonElement;
deploybtn.addEventListener("click", () => {
const uniqueId = `agent-${Date.now().toString()}`;
const newAgent = new DeveloperAgent(uniqueId, "New Agent", "Idle");
fleetManager.addAgent(newAgent);

});
