const cTable = require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const connection = require("./src/connection");


function startProgram() {
  inquirer.prompt(
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'option',
      choices: [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Create Department',
        'Create Role',
        'Create New Employee',
        'Update Employee',
        'Exit'
      ]
    }).then(answer => {
      switch (answer.option) {
        case 'View All Departments':
          viewAllDepts();
          break;
        case 'View All Roles':
          viewAllRoles();
          break;
        case 'View All Employees':
          viewAllEmployees();
          break;
        case 'Create Department':
          createDept();
          break;
        case 'Create Role':
          createRole();
          break;
        case 'Create New Employee':
          createEmployee();
          break;
        case 'Update Employee':
          updateEmployee();
          break;
        case 'Exit':
          connection.end();
          console.log('You have exited the application!');
          break;
      }
    }
  )
}
//'View All' functions for Tables
function viewAllDepts() {
  connection.query(
    'SELECT * FROM Department', (err, res) => {
      if (err) {
        console.log(err);
      }
      console.table(res)
      startProgram();
    })
};

function viewAllRoles() {
  connection.query(
    'SELECT * FROM Role', (err, res) => {
      if (err) {
        console.log(err);
      }
      console.table(res)
      startProgram();
    })
};

function viewAllEmployees() {
  connection.query(
    `SELECT employee.id, employee.first_name, employee.last_name, role.title,  department.name AS department_name, CONCAT(manager.first_name ," ", manager.last_name) AS manager
    FROM Employee
    LEFT JOIN Role ON employee.role_id = role.id
    LEFT JOIN Department ON role.department_id = department.id
    LEFT JOIN Employee manager ON manager.id = employee.manager_id`,
    (err, res) => {
      if (err) {
        console.log(err);
      }
      console.table(res)
      startProgram();
    });
};

// 'Create' functions 
function createDept() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'department',
      message: 'What is the name of the new department?'
    }
  ]).then(answer => {
    console.log(answer);
    connection.query('INSERT INTO Department SET ?', { name: answer.department }, (err, res) => {
      if (err)
      throw err;
      console.log('New department has been added!')
      startProgram();
    });
  });
};

function createRole() {
  currentDepts = [];
  connection.query('SELECT * FROM Department', function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      currentDepts.push({name: res[i].name, value: res[i].id})
    }
  })
  inquirer.prompt([
    {
      type: 'input',
      name: 'role',
      message: 'What is the name of the new role?'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary of this new role?'
    },
    {
      type: 'list',
      name: 'department',
      message: 'What department should be assigned to this new role?',
      choices: currentDepts
    }
  ]).then(answer => {
    console.log(answer);
    connection.query('INSERT INTO Role SET ?', { title: answer.role, salary:answer.salary, department_id:answer.department }, (err, res) => {
      if (err)
      throw err;
      console.log("New role has been added!")
      startProgram();
    });
  });
}


function createEmployee() {
  const currentRoles = [];
  const currentEmployees = [];
  connection.query('SELECT * FROM Role', function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      currentRoles.push({name:res[i].title, value:res[i].id})
    }
  })
  connection.query('SELECT * FROM Employee', function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      currentEmployees.push({name: res[i].first_name + " " + res[i].last_name, value: res[i].id});
    }
  })
  inquirer.prompt([
    {
      type: 'input',
      name: 'first',
      message: 'What is the FIRST name of the new employee?'
    },
    {
      type: 'input',
      name: 'last',
      message:'What is the LAST name of the new employee?'
    },
    {
      type: 'list',
      name: 'role',
      message: 'Choose a role for this new employee.',
      choices: currentRoles
    },
    {
      type: 'list',
      name: 'manager',
      message: 'Choose a manager for this new employee.',
      choices: currentEmployees
    },

  ]).then(answer => {
    console.log(answer);
    connection.query('INSERT INTO Employee SET ?', 
    { 
      first_name: answer.first, 
      last_name: answer.last, 
      role_id: answer.role, 
      manager_id: answer.manager 
    }, (err, res) => {
      if (err) throw err;
      console.log("New employee has been added!")
      startProgram();
    });
  });
};

//'Update' functions
function updateEmployee() {
  connection.query(
  )
};

startProgram();



