const inquirer = require('inquirer');
const cTable = require('console.table');

const mainMenu = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'mainMenu',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
        },
    ])
    .then(answers => {
        console.info
    })
    
}

mainMenu()