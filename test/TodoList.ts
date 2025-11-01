import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.connect();

describe("TodoList", function () {
  let todoList: any;
  let owner: any;
  let addr1: any;

  beforeEach(async function () {
    todoList = await ethers.deployContract("TodoList");
    [owner, addr1] = await ethers.getSigners();
  });

  describe("Deployment", function () {
    it("Should deploy successfully", async function () {
      expect(await todoList.getAddress()).to.be.properAddress;
    });

    it("Should have zero tasks for new user", async function () {
      expect(await todoList.taskCount(owner.address)).to.equal(0n);
      const tasks = await todoList.getMyTasks();
      expect(tasks).to.have.length(0);
    });
  });

  describe("Adding Tasks", function () {
    it("Should add a new task and emit TaskCreated event", async function () {
      await expect(todoList.addTask("Test Task"))
        .to.emit(todoList, "TaskCreated")
        .withArgs(1n, "Test Task", owner.address);
    });

    it("Should increment task count after adding task", async function () {
      expect(await todoList.taskCount(owner.address)).to.equal(0n);
      await todoList.addTask("Task 1");
      expect(await todoList.taskCount(owner.address)).to.equal(1n);
      await todoList.addTask("Task 2");
      expect(await todoList.taskCount(owner.address)).to.equal(2n);
    });

    it("Should retrieve added tasks correctly", async function () {
      await todoList.addTask("First Task");
      await todoList.addTask("Second Task");

      const tasks = await todoList.getMyTasks();
      expect(tasks).to.have.length(2);
      expect(tasks[0].text).to.equal("First Task");
      expect(tasks[0].complete).to.equal(false);
      expect(tasks[1].text).to.equal("Second Task");
      expect(tasks[1].complete).to.equal(false);
    });
  });

  describe("Toggling Task Completion", function () {
    beforeEach(async function () {
      await todoList.addTask("Task to toggle");
    });

    it("Should toggle task completion status", async function () {
      let tasks = await todoList.getMyTasks();
      expect(tasks[0].complete).to.equal(false);

      await expect(todoList.toggleComplete(1))
        .to.emit(todoList, "TaskCompleted")
        .withArgs(1n, true, owner.address);

      tasks = await todoList.getMyTasks();
      expect(tasks[0].complete).to.equal(true);
    });

    it("Should toggle task completion multiple times", async function () {
      await todoList.toggleComplete(1);
      let tasks = await todoList.getMyTasks();
      expect(tasks[0].complete).to.equal(true);

      await todoList.toggleComplete(1);
      tasks = await todoList.getMyTasks();
      expect(tasks[0].complete).to.equal(false);
    });

    it("Should reject invalid task ID", async function () {
      await expect(todoList.toggleComplete(0)).to.be.revertedWith("Invalid task ID.");
      await expect(todoList.toggleComplete(999)).to.be.revertedWith("Invalid task ID.");
    });
  });

  describe("User Isolation", function () {
    it("Should keep tasks separate for different users", async function () {
      // Owner adds tasks
      await todoList.addTask("Owner Task 1");
      await todoList.addTask("Owner Task 2");

      // Connect as different user
      const todoListAsAddr1 = todoList.connect(addr1);
      await todoListAsAddr1.addTask("Addr1 Task 1");

      // Owner should see only their tasks
      const ownerTasks = await todoList.getMyTasks();
      expect(ownerTasks).to.have.length(2);
      expect(ownerTasks[0].text).to.equal("Owner Task 1");
      expect(ownerTasks[1].text).to.equal("Owner Task 2");

      // Addr1 should see only their tasks
      const addr1Tasks = await todoListAsAddr1.getMyTasks();
      expect(addr1Tasks).to.have.length(1);
      expect(addr1Tasks[0].text).to.equal("Addr1 Task 1");
    });

    it("Should maintain separate task counts per user", async function () {
      await todoList.addTask("Task 1");
      await todoList.addTask("Task 2");

      const todoListAsAddr1 = todoList.connect(addr1);
      await todoListAsAddr1.addTask("Another Task");

      expect(await todoList.taskCount(owner.address)).to.equal(2n);
      expect(await todoList.taskCount(addr1.address)).to.equal(1n);
    });
  });
});

