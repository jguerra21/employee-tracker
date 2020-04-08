var inquirer = require('inquirer');
var connection = require('./connection');

const viewOptions = [
  'View Departments',
  'View Roles',
  'View Employees',
  'Update Employees',
  'Update Employee',
  'Exit'
];

const employeeOptions = [
  'Mia Gilbert',
  'Sophie Preston',
  'Jade Brennan',
  'Naomi Thornton',
  'Finley May',
  'Eloise Simmons',
  'exit'
];

const updateOptions = ['First Name', 'Last Name', 'Role', 'exit'];

function runSearch() {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: viewOptions
    })
    .then(function(answer) {
      switch (answer.action) {
        case viewOptions[0]:
          departmentView();
          break;
        case viewOptions[1]:
          roleView();
          break;
        case viewOptions[2]:
          employeeView();
          break;
        case viewOptions[3]:
          updateEmployee();

        case updateOptions[4]:
          connection.end();
          break;
      }
    });
}

runSearch();

function departmentView() {

  var sqlStr = 'SELECT * FROM department';
  connection.query(sqlStr, function(err, result) {
    if (err) throw err;

    console.table(result);
    runSearch();
  });
}

function employeeView() {
  'SELECT first_name, last_name, title, salary FROM employee ';
  sqlStr += 'LEFT JOIN role ';
  sqlStr += 'ON employee.role_id = role.id';
  var sqlStr = 'SELECT emp.id, emp.first_name, emp.last_name, title, name as department, salary, ';
  sqlStr += 'CONCAT(mgr.first_name, \' \', mgr.last_name) as manager ';
  sqlStr += 'FROM employee emp ';
  sqlStr += 'LEFT JOIN employee mgr ';
  sqlStr += 'ON emp.manager_id = mgr.id ';
  sqlStr += 'LEFT JOIN role ';
  sqlStr += 'ON emp.role_id = role.id ';
  sqlStr += 'LEFT JOIN department ';
  sqlStr += 'ON role.department_id = department.id';

  connection.query(sqlStr, function(err, result) {
    if (err) throw err;

    console.table(result);
    runSearch();
  });
}

function roleView() {
 
  var sqlStr = 'SELECT * FROM role';
  connection.query(sqlStr, function(err, result) {
    if (err) throw err;

    console.table(result);
    runSearch();
  });
}

const updateEmployee = () => {
  
  function runUpdateSearch() {
    inquirer.prompt({
      name: 'action',
      type: 'list',
      message: 'which employee do you want to update?',
      choices: employeeOptions
    });
  }
  runUpdateSearch();
};
