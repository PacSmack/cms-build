const inquirer = require("inquirer");
const connection = require("./connection");

class DB {
    async findAllDepartments() {
        return new Promise((resolve, reject) => {
            connection.query(
                "SELECT departments.id, departments.department_name AS Departments FROM departments", (err, results) => {
                    resolve(results)
                })
        })
    };
    async findRoles() {
        return new Promise((resolve, reject) => {
            connection.query(
                "SELECT roles.id, roles.job_title AS Role, roles.salary AS Salary, departments.department_name AS Department FROM roles LEFT JOIN departments ON roles.department_id = departments.id", (err, results) => {
                    resolve(results)
                }
            )
        })
    };
    async findEmployees() {
        return new Promise((resolve, reject) => {
            connection.query(
                "SELECT employees.id, employees.first_name AS Name, employees.last_name AS Surname, roles.job_title AS Role, departments.department_name AS Department, roles.salary AS Salary, manager_name.first_name AS Manager FROM employees INNER JOIN employees AS manager_name ON manager_name.id = employees.manager_id LEFT JOIN roles ON employees.job_title_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id",
                (err, results) => {
                    resolve(results)
                }
            )
        })
    };
    async addNewDepartment() {
        return inquirer.prompt([
            {
                name: "name",
                type: "input",
                message: "What Department would you like to add?"
            }
        ]).then(newDepartment => {
            connection.query(
                "INSERT INTO departments SET ? ",
                {
                    department_name: newDepartment.name
                }
            )
        })
    };
    async addNewRole() {
        return inquirer.prompt([
            {
                name: "name",
                type: "input",
                message: "What is the name of the new role?"
            },
            {
                name: "salary",
                type: "input",
                message: "Define the salary for the new role."
            },
            {
                name: "department",
                type: "input",
                message: "Which department does this role belongs to?"
            }

        ]).then(newRole => {
            connection.query(
                "INSERT INTO roles SET ?",
                {
                    job_title: newRole.name,
                    salary: newRole.salary,
                    department_id: newRole.department
                }
            )
        })
    };
    async addNewEmployee() {
        const rolesArr = [];
        function selectRole() {
            connection.query("SELECT * FROM roles", (err, res) => {
                if (err) throw err
                for (let i = 0; i < res.length; i++) {
                    rolesArr.push(res[i].job_title);
                }
            })
            return rolesArr
        }

        const managersArr = [];
        function selectManager() {
            connection.query("SELECT first_name, last_name FROM employees WHERE id IN (1, 2, 3)", (err, res) => {
                if (err) throw err
                for (let i = 0; i < res.length; i++) {
                    managersArr.push(res[i].first_name);
                }
            })
            return managersArr
        }
        return inquirer.prompt([
            {
                name: "firstName",
                type: "input",
                message: "What is the employee first name?"
            },
            {
                name: "lastName",
                type: "input",
                message: "What is the employee last name?"
            },
            {
                name: "role",
                type: "list",
                message: "What's the new employee's role?",
                choices: selectRole()
            },
            {
                name: "manager",
                type: "rawlist",
                message: "Who's the manager he/she reports to?",
                choices: selectManager()
            }
        ]).then(newEmployee => {
            const rolesId = selectRole().indexOf(newEmployee.role) + 1
            const managerId = selectManager().indexOf(newEmployee.manager) + 1
            connection.query(
                "INSERT INTO employees SET ?",
                {
                    first_name: newEmployee.firstName,
                    last_name: newEmployee.lastName,
                    manager_id: managerId,
                    job_title_id: rolesId
                }
            )
        })
    };
    async updatedEmployee() {
        const rolesArr = [];
        function selectRole() {
            connection.query("SELECT * FROM roles", (err, res) => {
                if (err) throw err
                for (let i = 0; i < res.length; i++) {
                    rolesArr.push(res[i].job_title);
                }
            })
            return rolesArr
        }
        connection.query("SELECT employees.first_name, roles.job_title FROM employees JOIN roles ON employees.job_title_id = roles.id", (err, res) => {
            if (err) throw err
            return inquirer.prompt([
                {
                    name: "firstName",
                    type: "rawlist",                    
                    choices: function () {
                        const firstName = [];
                        for (let i = 0; i < res.length; i++) {
                            firstName.push(res[i].first_name)
                        }
                        return firstName;
                    },
                    message: "What's your employee's name?"
                },
                {
                    name: "role",
                    type: "rawlist",
                    message: "What is the Employee's new role?",
                    choices: selectRole()
                }
            ]).then(updatedStaff => {
                const rolesId = selectRole().indexOf(updatedStaff.role) + 1
                connection.query("UPDATE employees SET WHERE ?"),
                {
                    first_name: updatedStaff.firstName,                    
                },     
                {
                    job_title_id: rolesId
                }           
            })
        })
    }
}





module.exports = new DB();