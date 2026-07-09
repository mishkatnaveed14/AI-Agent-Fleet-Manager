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
    let foundagent = this.agents.find((a) => a.id === agentId);
  }
}
