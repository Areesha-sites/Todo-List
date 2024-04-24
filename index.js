#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let todos = [];
let condition = true;
let main = async () => {
    while (condition) {
        let option = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: chalk.yellow("Select an option you want to do:"),
                choices: [
                    chalk.green("Add Task"),
                    chalk.magenta("Delete Task"),
                    chalk.blue("Update Task"),
                    chalk.yellow("View Todo-List"),
                    chalk.red("Exit"),
                ],
            },
        ]);
        if (option.choice === chalk.green("Add Task")) {
            await addTask();
        }
        else if (option.choice === chalk.magenta("Delete Task")) {
            await deleteTask();
        }
        else if (option.choice === chalk.blue("Update Task")) {
            await updateTask();
        }
        else if (option.choice === chalk.yellow("View Todo-List")) {
            await viewTask();
        }
        else if (option.choice === chalk.red("Exit")) {
            condition = false;
        }
    }
};
let addTask = async () => {
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: chalk.yellow("Enter your new task :"),
        },
    ]);
    todos.push(newTask.task);
    console.log(`\n ${chalk.green(newTask.task)} task added successfully in Todo-List`);
};
// function to view all Todo-List Task
let viewTask = () => {
    console.log("\n your Todo-List: \n");
    todos.forEach((task, index) => {
        console.log(`${index + 1}: ${task}`);
    });
};
// function to delete a task from the list
let deleteTask = async () => {
    await viewTask();
    let taskIndx = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.yellow("Enter the 'index no.' of the task you want to delete: "),
        },
    ]);
    let deletedTask = todos.splice(taskIndx.index - 1, 1);
    console.log(`\n ${deletedTask} this task has been deleted successfully from your Todo-List\n`);
};
// function to update a task
let updateTask = async () => {
    await viewTask();
    let updateTaskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.yellow("Enter the 'index no' of the task you want to update"),
        },
        {
            name: "newTask",
            type: "input",
            message: chalk.yellow("Now enter new task name"),
        },
    ]);
    todos[updateTaskIndex.index - 1] = updateTaskIndex.newTask;
    console.log(`\n Task at index no ${updateTaskIndex.index - 1} updated successfully[for updated list check option: "view Todo-List"]`);
};
main();
