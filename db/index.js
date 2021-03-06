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
        const [departmentRows] = await connection.promise().query("SELECT * FROM departments");
        const answers = await inquirer.prompt([
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
                type: "rawlist",
                message: "Which department does this role belongs to?",
                choices: function () {
                    const departmentArr = [];
                    for (let i = 0; i < departmentRows.length; i++) {
                        departmentArr.push({ name: departmentRows[i].department_name, value: departmentRows[i].id })
                    }
                    return departmentArr;
                }
            }
        ])

        const [newRole] = await connection.promise().query("INSERT INTO roles SET ?",
            [{
                job_title: answers.name,
                salary: answers.salary,
                department_id: answers.department
            }]
            
        )    
        return newRole    
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
        const [roleRows] = await connection.promise().query("SELECT * FROM roles");
        const [employeeRows] = await connection.promise().query("SELECT * FROM employees");
        const answers = await inquirer.prompt([
            {
                name: "employeeId",
                type: "rawlist",
                choices: function () {
                    const firstName = [];
                    for (let i = 0; i < employeeRows.length; i++) {
                        firstName.push({ name: employeeRows[i].first_name, value: employeeRows[i].id })
                    }
                    return firstName;
                },
                message: "What's your employee's name?"
            },
            {
                name: "roleId",
                type: "rawlist",
                message: "What is the Employee's new role?",
                choices: function () {
                    const rolesArr = [];
                    for (let i = 0; i < roleRows.length; i++) {
                        rolesArr.push({ name: roleRows[i].job_title, value: roleRows[i].id });
                    }
                    return rolesArr
                }
            }
        ]);

        const [updatedEmployees] = await connection.promise().query("UPDATE employees SET ? WHERE ?",
            [{
                job_title_id: answers.roleId,
            },
            {
                id: answers.employeeId
            }]
        );
        return updatedEmployees
    }
};


module.exports = new DB();