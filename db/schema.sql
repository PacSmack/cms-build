DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;

CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL    
);

CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    job_title VARCHAR(30) NOT NULL,
    salary INTEGER(10) NOT NULL,
    department_id INTEGER,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    job_title_id INTEGER,
    manager_id INTEGER,    
    CONSTRAINT fk_role FOREIGN KEY (job_title_id) REFERENCES roles(id),
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employees(id)
);

