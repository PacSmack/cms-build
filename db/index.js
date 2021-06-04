const connection = require("./connection");

class DB {
    async findAllDepartments() {
        return new Promise((resolve, reject) => {
            connection.query(
                "SELECT * FROM departments", (err, results) => {
                    resolve(results)             
                })
        })
    };
    async findRoles() {
        return new Promise((resolve, reject) => {
            connection.query(
                "SELECT roles.job_title FROM roles", (err, results) => {
                    resolve(results)
                }
            )
        })
    }
};

module.exports = new DB();