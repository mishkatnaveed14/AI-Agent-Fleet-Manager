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
class FleetManager{
    
}