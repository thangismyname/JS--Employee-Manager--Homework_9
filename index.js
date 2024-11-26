// Sample employee data structure
let employeeList = [];

// Render the employee table
function renderEmployeeTable() {
    const tableBody = document.getElementById("tableDanhSach");
    tableBody.innerHTML = "";

    employeeList.forEach((employee, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${employee.taiKhoan}</td>
            <td>${employee.hoTen}</td>
            <td>${employee.email}</td>
            <td>${employee.ngayLam}</td>
            <td>${employee.chucVu}</td>
            <td>${calculateTotalSalary(employee)}</td>
            <td>${classifyEmployee(employee)}</td>
            <td>
                    <button class="btn btn-danger" onclick="deleteEmployee(${index})">Xóa</button>
                    <button class="btn btn-primary" 
                            onclick="editEmployee(${index})" 
                            data-toggle="modal" 
                            data-target="#employeeModal">Sửa</button>
                </td>
        `;
        tableBody.appendChild(tr);
    });
}

// Calculate total salary
function calculateTotalSalary(employee) {
    let multiplier = 1;
    if (employee.chucVu === "Giám đốc") multiplier = 3;
    else if (employee.chucVu === "Trưởng phòng") multiplier = 2;

    return employee.luongCoBan * multiplier;
}

// Classify the employee based on working hours
function classifyEmployee(employee) {
    if (employee.gioLam >= 192) return "Xuất sắc";
    if (employee.gioLam >= 176) return "Giỏi";
    if (employee.gioLam >= 160) return "Khá";
    return "Trung bình";
}

// Add a new employee
function addEmployee() {
    const employee = collectEmployeeData();
    if (!employee) return; // Validation failed

    if (isDuplicate(employee)) {
        alert("Nhân viên này đã tồn tại!");
        return;
    }

    employeeList.push(employee);
    renderEmployeeTable();
    clearForm();
    $('#employeeModal').modal('hide');
}

// Edit an existing employee
function editEmployee(index) {
    const employee = employeeList[index];

    // Populate modal fields
    document.getElementById("tknv").value = employee.taiKhoan;
    document.getElementById("name").value = employee.hoTen;
    document.getElementById("email").value = employee.email;
    document.getElementById("password").value = employee.matKhau;
    document.getElementById("datepicker").value = employee.ngayLam;
    document.getElementById("luongCB").value = employee.luongCoBan;
    document.getElementById("chucvu").value = employee.chucVu;
    document.getElementById("gioLam").value = employee.gioLam;

    // Show update button
    document.getElementById("btnCapNhat").style.display = "block";
    document.getElementById("btnThemNV").style.display = "none";

    // Attach update function
    document.getElementById("btnCapNhat").onclick = () => updateEmployee(index);

    // Open the modal
    $('#employeeModal').modal('show');
}

// Update an employee
function updateEmployee(index) {
    const updatedEmployee = collectEmployeeData();
    if (!updatedEmployee) return; // Validation failed

    employeeList[index] = updatedEmployee;
    renderEmployeeTable();
    clearForm();
    $('#employeeModal').modal('hide');
}

// Delete an employee
function deleteEmployee(index) {
    if (confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) {
        employeeList.splice(index, 1);
        renderEmployeeTable();
    }
}

// Collect employee data from the form
function collectEmployeeData() {
    const taiKhoan = document.getElementById("tknv").value.trim();
    const hoTen = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const matKhau = document.getElementById("password").value.trim();
    const ngayLam = document.getElementById("datepicker").value.trim();
    const luongCoBan = parseFloat(document.getElementById("luongCB").value.trim());
    const chucVu = document.getElementById("chucvu").value.trim();
    const gioLam = parseInt(document.getElementById("gioLam").value.trim());

    // Validation
    if (!taiKhoan || !hoTen || !email || !matKhau || !ngayLam || !chucVu || isNaN(luongCoBan) || isNaN(gioLam)) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return null;
    }

    return { taiKhoan, hoTen, email, matKhau, ngayLam, luongCoBan, chucVu, gioLam };
}

// Clear the form
function clearForm() {
    document.getElementById("employeeForm").reset();
    document.getElementById("btnCapNhat").style.display = "none";
    document.getElementById("btnThemNV").style.display = "block";
}

// Check for duplicate employees
function isDuplicate(employee) {
    return employeeList.some(emp => emp.taiKhoan === employee.taiKhoan);
}

// Initialize the table on page load
renderEmployeeTable();

// Event listeners
document.getElementById("btnThemNV").addEventListener("click", addEmployee);
