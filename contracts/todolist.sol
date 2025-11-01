// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract TodoList {
    // 1. Define the Task structure
    struct Task {
        uint id;
        string text;
        bool complete;
    }

    // 2. Mapping to store tasks for each user address
    // address => taskCount (to generate unique IDs)
    mapping(address => uint) public taskCount;
    // address => taskId => Task struct
    mapping(address => mapping(uint => Task)) public tasks;

    // Event to signal a new task was created
    event TaskCreated(uint id, string text, address indexed user);

    // Event to signal a task was completed
    event TaskCompleted(uint id, bool complete, address indexed user);

    // --- Functions ---

    /**
     * @dev Adds a new task for the calling address (msg.sender).
     * @param _text The description of the task.
     */
    function addTask(string memory _text) public {
        uint newId = taskCount[msg.sender] + 1;
        taskCount[msg.sender] = newId;

        tasks[msg.sender][newId] = Task(
            newId,
            _text,
            false // Initially incomplete
        );

        emit TaskCreated(newId, _text, msg.sender);
    }

    /**
     * @dev Toggles the completion status of a task.
     * @param _id The ID of the task to update.
     */
    function toggleComplete(uint _id) public {
        // Ensure the task exists for the user
        require(_id > 0 && _id <= taskCount[msg.sender], "Invalid task ID.");

        Task storage task = tasks[msg.sender][_id];
        task.complete = !task.complete; // Toggle the status

        emit TaskCompleted(_id, task.complete, msg.sender);
    }

    /**
     * @dev Retrieves all tasks for the calling address (msg.sender).
     * @return An array of Task structs.
     */
    function getMyTasks() public view returns (Task[] memory) {
        uint count = taskCount[msg.sender];
        Task[] memory userTasks = new Task[](count);

        for (uint i = 1; i <= count; i++) {
            userTasks[i - 1] = tasks[msg.sender][i];
        }

        return userTasks;
    }
}