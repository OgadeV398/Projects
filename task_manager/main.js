const prompt = require("prompt-sync")();
const storage = {};

console.log("TASKMANAGER");
console.log("PRESS 'A' to add a task");
console.log("PRESS 'V' to view a task you created");
console.log("PRESS 'D' to delete a task");
console.log("PRESS 'U' to update one of your tasks");

const choice = prompt("Enter your choice: ").toLowerCase();

if (choice === 'a') {
    console.log("ADD A TASK\nType 'done' when finished adding tasks");
    let i = 0;
    while (true) {
        const input = prompt(`Task ${i}: `);
        if (input.toLowerCase() === 'done') {
            break;
        }
        storage[i] = input;
        i++;
    }
}

else if (choice === 'v') {
    const input = Number(prompt("TO VIEW ALL TASKS PRESS '1', TO VIEW A SPECIFIC TASK PRESS '2': "));
    if (input === 1) {
        console.log("ALL TASKS:");
        Object.entries(storage).forEach(([key, value]) => {
            console.log(`${key}: ${value}`);
        });
    } else if (input === 2) {
        const taskNumber = Number(prompt("Enter the task number you want to view: "));
        console.log(`${taskNumber}: ${storage[taskNumber]}`);
    }
}

else if (choice === 'd') {
    const delete_input = Number(prompt("WHICH TASK DO YOU WANT TO DELETE: "));
    try {
        delete storage[delete_input];
        console.log(`TASK ${delete_input} DELETED SUCCESSFULLY`);
    } catch (error) {
        console.log("AN ERROR OCCURRED");
    }
}

else if (choice === 'u') {
    const update_input = Number(prompt("WHICH TASK DO YOU WANT TO UPDATE: "));
    const new_task = prompt("Enter the new task: ");
    storage[update_input] = new_task;
    console.log(`TASK ${update_input} UPDATED TO: ${new_task}`);
}

else {
    console.log("Invalid choice.");
}
