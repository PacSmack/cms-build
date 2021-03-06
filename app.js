const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db');
const connection = require("./db/connection");


async function mainMenu() {
    const choice = await inquirer.prompt([
        {
            type: 'list',
            name: 'mainMenu',
            message: 'What would you like to do?',
            choices: [{ name: 'View all departments', value: "VIEW_ALL_DEPARTMENTS" }, { name: 'View all roles', value: "VIEW_ALL_ROLES" }, { name: 'View all employees', value: "VIEW_ALL_EMPLOYEES" }, { name: 'Add a department', value: "ADD_DEPARTMENT" }, { name: 'Add a role', value: "ADD_ROLE" }, { name: 'Add an employee', value: "ADD_EMPLOYEE" }, { name: 'Update an employee role', value: "UPDATE_EMLPOYEE" }]
        }
    ])
    switch (choice.mainMenu) {
        case "VIEW_ALL_DEPARTMENTS":
            return viewDepartments();
        case "VIEW_ALL_ROLES":
            return viewRoles();
        case "VIEW_ALL_EMPLOYEES":
            return viewEmployees();
        case "ADD_DEPARTMENT":
            return addDepartment();
        case "ADD_ROLE":
            return addRole();
        case "ADD_EMPLOYEE":
            return addEmployee();
        case "UPDATE_EMLPOYEE":
            return updateEmployee();        
    }
}

async function viewDepartments() {
    const departments = await db.findAllDepartments();
    console.table(departments)
    mainMenu()
};

async function viewRoles() {
    const roles = await db.findRoles();
    console.table(roles)
    mainMenu()
};

async function viewEmployees() {
    const employees = await db.findEmployees();
    console.table(employees)
    mainMenu()
};

async function addDepartment() {
    const newDepartment = await db.addNewDepartment();    
    mainMenu()
};

async function addRole() {
    const newRole = await db.addNewRole();    
    mainMenu()
};

async function addEmployee() {
    const newEmployee = await db.addNewEmployee();    
    mainMenu()
};

async function updateEmployee() {
    const updatedEmployee = await db.updatedEmployee();    
    mainMenu()
};

mainMenu()