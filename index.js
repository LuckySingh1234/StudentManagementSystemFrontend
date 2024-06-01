const data = [
    { id: "k6ij0q5o0", name: "Paramjot", age: 28, grade: "A", joiningDate: "2024-05-19" },
    { id: "2awplt6sr", name: "Raj", age: 24, grade: "B", joiningDate: "2024-05-15" },
    { id: "w9kve5gj5", name: "Nitin", age: 35, grade: "C", joiningDate: "2024-05-12" }
];

function toggleAllCheckboxes(source) {
    const checkboxes = document.querySelectorAll('.checkItem');
    checkboxes.forEach(checkbox => {
        checkbox.checked = source.checked;
    });
}

function generateRandomId() {
    return Math.random().toString(36).substring(2, 11);
}

function addRowsToTable(dataArray) {
    const tableBody = document.querySelector('#dataTable tbody');

    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }

    dataArray.forEach(item => {
        const row = document.createElement('tr');

        const checkBoxCell = document.createElement('td');
        const checkBoxInput = document.createElement('input');
        checkBoxInput.type = 'checkbox';
        checkBoxInput.classList.add('checkItem')
        checkBoxCell.appendChild(checkBoxInput);
        row.appendChild(checkBoxCell);

        const idCell = document.createElement('td');
        idCell.classList.add('rowId');
        idCell.textContent = item.id;
        idCell.style.display = 'none'
        row.appendChild(idCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = item.name;
        row.appendChild(nameCell);

        const ageCell = document.createElement('td');
        ageCell.textContent = item.age;
        row.appendChild(ageCell);

        const gradeCell = document.createElement('td');
        gradeCell.textContent = item.grade;
        row.appendChild(gradeCell);

        const joiningDateCell = document.createElement('td');
        joiningDateCell.textContent = item.joiningDate;
        row.appendChild(joiningDateCell);

        tableBody.appendChild(row);
    });
}

function getCurrentDate() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
}

function addStudentData(e) {
    e.preventDefault();

    const id = generateRandomId();
    const name = document.getElementById('name').value.trim();
    let age = document.getElementById('age').value.trim();
    const grade = document.getElementById('grade').value.trim().toUpperCase();

    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = '';

    if (name === '' || age === '' || grade === '') {
        errorMessage.textContent = 'Please fill in all fields.';
        return;
    }

    try {
        age = parseInt(age);
    } catch (error) {
        errorMessage.textContent = 'Age must be a number.';
        return;
    }

    const gradeArray = ['A', 'B', 'C', 'D', 'E', 'F'];

    if (!gradeArray.includes(grade)) {
        errorMessage.textContent = 'Grade can only have values from A to F.';
        return;
    }

    let alreadyExists = false;
    data.forEach(function(existingStudent) {
        if (existingStudent.name === name && existingStudent.age === age && existingStudent.grade === grade) {
            errorMessage.textContent = 'Entry with same values already exist.';
            alreadyExists = true;
            return;
        }
    });
    if (alreadyExists) {
        return;
    }

    const student = {
        id: id,
        name: name,
        age: age,
        grade: grade,
        joiningDate: getCurrentDate()
    };
    data.push(student);

    addRowsToTable(data);

    document.getElementById('name').value = '';
    document.getElementById('age').value = '';
    document.getElementById('grade').value = '';
}

function removeElementById(array, id) {
    const index = array.findIndex(item => item.id === id);

    if (index !== -1) {
        array.splice(index, 1);
    }
}

function deleteStudent() {
    const tableBody = document.querySelector('#dataTable tbody');

    for (let i = 0; i < tableBody.rows.length; i++) {
        const row = tableBody.rows[i];
    
        const checkbox = row.querySelector('td input[type="checkbox"]');
    
        if (checkbox.checked) {
            const id = row.querySelector('.rowId').textContent;

            removeElementById(data, id);

            tableBody.deleteRow(i);
            i--;
        }    
    }

    if (tableBody.rows.length === 0) {
        document.getElementById("selectAll").checked = false
    }
}

function renderFilteredTable(value) {
    if (value === 'All') {
        addRowsToTable(data);
    } else {
        const filteredData = data.filter(student => student.grade === value);
        addRowsToTable(filteredData);
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    addRowsToTable(data);
    document.getElementById('add-student').addEventListener('submit', addStudentData);
    document.getElementById('grade-filter').addEventListener('change', function() {
        renderFilteredTable(this.value);
    });
});
