// agent data bIue print
class Agentnew {
    constructor(id, name, status) {
        this.id = id;
        this.name = name;
        this.status = status;
    }
    getid() {
        return this.id;
    }
}
class DeveloperAgent extends Agentnew {
    constructor(id, name, status) {
        super(id, name, status);
    }
}
// fleet manager
class FleetManager {
    constructor() {
        this.agents = [];
    }
    addAgent(acceptagent) {
        this.agents.push(acceptagent);
    }
    // assign task
    assignTask(agentId, task) {
        let foundagent = this.agents.find((a) => a.getid() === agentId);
        if (foundagent !== undefined) {
            foundagent.status = "Active";
            console.log(`Task '${task}' assigned. Agent status is now Active.`);
        }
        else {
            console.error(`Agent with ID '${agentId}' not found.`);
        }
    }
}
const fleetManager = new FleetManager();
// add event listener to the deploy button
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
    const nameInput = document.getElementById("agentName");
    const taskInput = document.getElementById("agentTask");
    const uniqueId = `agent-${Date.now().toString()}`;
    const newAgent = new DeveloperAgent(uniqueId, nameInput.value.trim(), "Idle");
    fleetManager.addAgent(newAgent);
    fleetManager.assignTask(uniqueId, taskInput.value.trim());
    agentForm.reset();
    hideModal();
    // nameInput.value = "";
    // taskInput.value = "";
});
export {};
//# sourceMappingURL=index.js.map