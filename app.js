const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db');


async function mainMenu() {
    const choice = await inquirer.prompt([
        {
            type: 'list',
            name: 'mainMenu',
            message: 'What would you like to do?',
            choices: [{ name: 'View all departments', value: "VIEW_ALL_DEPARTMENTS" }, {name: 'View all roles', value: "VIEW_ALL_ROLES"}, 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
        }
    ])
    switch (choice.mainMenu) {
        case "VIEW_ALL_DEPARTMENTS":
            return viewDepartments();
        case "VIEW_ALL_ROLES":
            return  viewRoles();
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
    }
}

async function viewDepartments() {
    const departments = await db.findAllDepartments();
    console.log("\n")
    console.table(departments)
    mainMenu()    
};

async function viewRoles() {
    const roles = await db.findRoles();
    console.log("\n")
    console.table(roles)
    mainMenu()
};




mainMenu()