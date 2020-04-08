DROP DATABASE IF EXISTS Employee_Tracker;
CREATE DATABASE Employee_Tracker;
USE Employee_Tracker;
CREATE TABLE department(
  id integer auto_increment NOT NULL,
  name VARCHAR(30) NOT NULL,
  primary key(id)
);
CREATE TABLE role(
  id integer auto_increment NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary decimal NOT NULL,
  department_id integer NOT NULL,
  constraint fk_department_id foreign key (department_id) references department(id),
  primary key(id)
);
CREATE TABLE employee(
  id integer auto_increment NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id integer NOT NULL,
  constraint fk_role_id foreign key(role_id) REFERENCES role(id),
  manager_id integer,
  constraint fk_manager_id foreign key (manager_id) REFERENCES employee(id),
  primary key(id)
);
select
  *
from employee;
select
  *
from role;
select
  *
from department;
-- Insert data
  -- Deparments
INSERT into department(name)
VALUES
  ("Engineering"),
  ("Human resources"),
  ("Accounting"),
  ("Legal"),
  ("Finance"),
  ("Sales");
select
  *
from department;
-- Roles
INSERT into role (title, salary, id, department_id)
VALUES
  ("Lead Engineer", 125000, 1, 1),
  ("Engineer", 95000, 2, 1),
  ("HR", 85000, 3, 2),
  ("Accountant", 75000, 4, 3),
  ("Attorney", 155000, 5, 4),
  ("Manager", 105000, 6, 5),
  ("Sales lead", 120000, 7, 6);
select
  *
from role;
-- Employees
INSERT into employee (first_name, last_name, role_id, manager_id)
VALUES
  ("Mia", "Gilbert", 1, NULL),
  ("Sophie", "Preston", 2, 1),
  ("Jade", "Brennan", 3, NULL),
  ("Naomi", "Thornton", 4, NULL),
  ("Finley", "May", 5, NULL),
  ("Eloise", "Simmons", 6, NULL);
select
  *
from employee;