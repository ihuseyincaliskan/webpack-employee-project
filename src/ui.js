export class UI {
  constructor() {
    this.employeesList = document.getElementById('employees');
    this.updateButton = document.getElementById('update');
    this.nameInput = document.getElementById('name');
    this.departmentInput = document.getElementById('department');
    this.salaryInput = document.getElementById('salary');
  }

  addAllEmployeesToUI(employees) {
    let result = '';
    employees.forEach((employee) => {
      result += `
        <tr>
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.department}</td>
            <td>${employee.salary}</td>
            <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
            <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
        </tr>
        `;
    });

    this.employeesList.innerHTML = result;
  }

  clearInput() {
    this.nameInput.value = '';
    this.departmentInput.value = '';
    this.salaryInput.value = '';
  }

  addEmployeeToUI(employee) {
    this.employeesList.innerHTML += `
        <tr>
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.department}</td>
            <td>${employee.salary}</td>
            <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
            <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
        </tr>
    `;
  }

  deleteEmployeeFromUI(element) {
    element.remove();
  }

  toggleUpdateButton(target) {
    if (this.updateButton.style.display === 'none') {
      this.updateButton.style.display = 'block';

      this.addEmployeeInfoToInputs(target);
    } else {
      this.updateButton.style.display = 'none';
      this.clearInput();
    }
  }

  addEmployeeInfoToInputs(target) {
    const children = target.children;
    this.nameInput.value = children[1].textContent;
    this.departmentInput.value = children[2].textContent;
    this.salaryInput.value = children[3].textContent;
  }

  updateEmployeeOnUI(employee, parent) {
    parent.innerHTML = `
        <tr>
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.department}</td>
            <td>${employee.salary}</td>
            <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
            <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
        </tr>
    `;

    this.clearInput();
  }
}
