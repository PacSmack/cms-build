INSERT INTO
    departments (department_name)
VALUES
    ('Management'),
    ('Human Resources'),
    ('Front of the house'),
    ('Back of the house');

INSERT INTO
    roles (job_title, salary, department_id)
VALUES
    ('General Manager', 90000, 1),
    ('Assistant Manager', 70000, 1),
    ('Sales Manager', 65000, 1),
    ('HR Representative', 50000, 2),
    ('Server', 45000, 3),
    ('Busser', 30000, 3),
    ('Dishwasher', 25000, 4),
    ('Cook', 40000, 4),
    ('Salad Attendant', 31000, 4);

INSERT INTO
    employees (first_name, last_name, job_title_id, manager_id)
VALUES
    ('Mimi', 'Diaz', 1, 1),
    ('Clair', 'Napier', 2, 1),
    ('Rodrigo', 'Oliveira', 2, 1),
    ('Danielle', 'Smith', 3, 1),
    ('Diana', 'Williams', 4, 1),
    ('Mariana', 'Davis', 5, 2),
    ('Sophie', 'Garcia', 5, 2),
    ('Haley', 'Lincoln', 5, 2),
    ('Dustin', 'Alexander', 5, 2),
    ('Analaura', 'Madrid', 5, 2),
    ('Carolina', 'Madrid', 5, 2),
    ('Karina', 'Gallardo', 5, 2),
    ('Luana', 'Torres', 5, 2),
    ('Aurora', 'Gallardo', 6, 2),
    ('Dulio', 'Zamorra', 6, 2),
    ('Kim', 'Katagiri', 6, 2),
    ('Dulce', 'Antollin', 6, 2),
    ('Anthony', 'Silva', 7, 3),
    ('James', 'Rodriguez', 7, 3),
    ('Maria', 'Garcia', 7, 3),
    ('John', 'Wilson', 7, 3),
    ('Mary', 'Clark', 8, 3),
    ('Samuel', 'Taylor', 8, 3),
    ('Ann', 'Brown', 8, 3),
    ('Jane', 'Smith', 8, 3),
    ('Margaret', 'Rocha', 9, 3),
    ('Tamara', 'Rego', 9, 3);   