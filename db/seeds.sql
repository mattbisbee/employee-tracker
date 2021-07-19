USE employee_db;

INSERT INTO Department (name)
VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO Role (title, salary, department_id)
VALUES
('Sales Lead', 100000, 1),
('Salesperson', 80000, 1),

('Software Lead', 150000, 2),
('Software Engineer', 120000, 2),

('Finance Lead', 160000, 3),
('Accountant', 125000, 3),

('Legal Team Lead', 250000, 4),
('Lawyer', 190000, 4);


INSERT INTO Employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('Hal', 'Jordan', 1, NULL),
    ('Scrooge', 'McDuck', 2, 1),
    ('Charles', 'Xavier', 3, NULL),
    ('Jean', 'Grey', 4, 3),
    ('Jessica', 'Jones', 5, NULL),
    ('Emma', 'Frost', 6, 5),
    ('Mina', 'Harker', 7, NULL),
    ('Peter', 'Parker', 8, 7);

