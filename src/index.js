// Imports
import { Request } from './requests';
import { UI } from './ui';

// Elements
const form = document.getElementById('employee-form');
const nameInput = document.getElementById('name');
const departmentInput = document.getElementById('department');
const salaryInput = document.getElementById('salary');
const employeesList = document.getElementById('employees');
const updateEmployeeButton = document.getElementById('update');

// Imports call
const request = new Request('http://localhost:3000/employees');
const ui = new UI();

// Variables
let updateState = null;

// Eventlisteners
eventListeners();
function eventListeners() {
  document.addEventListener('DOMContentLoaded', getAllEmployees);
  form.addEventListener('submit', addEmployee);
  employeesList.addEventListener('click', updateOrDelete);
  updateEmployeeButton.addEventListener('click', updateEmployee);
}

function getAllEmployees() {
  request
    .get()
    .then((employees) => {
      ui.addAllEmployeesToUI(employees);
    })
    .catch((err) => console.error(err));
}

function addEmployee(e) {
  const employeeName = nameInput.value.trim();
  const employeeDepartment = departmentInput.value.trim();
  const employeeSalary = Number(salaryInput.value.trim());

  if (employeeName === '' || employeeDepartment === '' || employeeSalary === '')
    alert('Tüm alanları doldurun!');
  else {
    const newEmployee = {
      name: employeeName,
      department: employeeDepartment,
      salary: employeeSalary,
    };
    request
      .post(newEmployee)
      .then((employee) => ui.addEmployeeToUI(employee))
      .catch((err) => console.error(err));
  }

  ui.clearInput();
  e.preventDefault();
}

function updateOrDelete(e) {
  if (e.target.id === 'delete-employee') {
    // Silme
    deleteEmployee(e.target);
  } else if (e.target.id === 'update-employee') {
    // Güncelleme
    updateEmployeeController(e.target.parentElement.parentElement);
  }
}

function deleteEmployee(targetEmployee) {
  const id = targetEmployee.parentElement.parentElement.children[0].textContent;

  request
    .delete(id)
    .then((message) => {
      ui.deleteEmployeeFromUI(targetEmployee.parentElement.parentElement);
    })
    .catch((err) => console.error(err));
}

function updateEmployeeController(targetEmployee) {
  ui.toggleUpdateButton(targetEmployee);

  if (updateState === null) {
    updateState = {
      updateId: targetEmployee.children[0].textContent,
      updateParent: targetEmployee,
    };
  } else {
    updateState = null;
  }
}

function updateEmployee() {
  if (updateState) {
    // Güncelleme
    const newEmployee = {
      name: nameInput.value.trim(),
      department: departmentInput.value.trim(),
      salary: Number(salaryInput.value.trim()),
    };

    request
      .put(updateState.updateId, newEmployee)
      .then((updatedEmployee) => {
        ui.updateEmployeeOnUI(updatedEmployee, updateState.updateParent);
      })
      .catch((err) => console.error(err));
  }
}
