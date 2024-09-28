// script.js

// Sample chemical data
let chemicals = [
    { id: 1, name: 'Ammonium Persulfate', vendor: 'LG Chem', density: 3525.92, viscosity: 60.63, packaging: 'Bag', packSize: 100, unit: 'kg', quantity: 6495.18 },
    { id: 2, name: 'Caustic Potash', vendor: 'Formosa', density: 3172.15, viscosity: 48.22, packaging: 'Bag', packSize: 100, unit: 'kg', quantity: 8751.90 },
    { id: 3, name: 'Dimethylaminopropylamine', vendor: 'LG Chem', density: 8435.37, viscosity: 12.62, packaging: 'Barrel', packSize: 75, unit: 'L', quantity: 5964.61 },
    { id: 4, name: 'Mono Ammonium Phosphate', vendor: 'Sinopec', density: 1597.65, viscosity: 76.51, packaging: 'Bag', packSize: 105, unit: 'kg', quantity: 8183.73 },
    { id: 5, name: 'Ferric Nitrate', vendor: 'DowDuPont', density: 364.04, viscosity: 14.90, packaging: 'Bag', packSize: 105, unit: 'kg', quantity: 4145.33 },
    { id: 6, name: 'n-Pentane', vendor: 'Sinopec', density: 4535.26, viscosity: 66.76, packaging: 'N/A', packSize: 'N/A', unit: 't', quantity: 6272.34 },
    { id: 7, name: 'Glycol Ether PM', vendor: 'LG Chem', density: 6495.18, viscosity: 72.12, packaging: 'Bag', packSize: 250, unit: 'kg', quantity: 8749.54 },
    // Add more data as needed
];

// Sort state
let sortState = {
    column: null,
    direction: 'asc'
};

// Populate the table when the page loads
document.addEventListener('DOMContentLoaded', function () {
    loadTableData();
    addEventListeners();
});

// Function to load data into the table
function loadTableData() {
    const tbody = document.querySelector('#chemicalTable tbody');
    tbody.innerHTML = ''; // Clear any existing rows
    chemicals.forEach((chemical) => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><input type="checkbox"></td>
        <td>${chemical.id}</td>
        <td contenteditable="true">${chemical.name}</td>
        <td contenteditable="true">${chemical.vendor}</td>
        <td contenteditable="true" class="editable">${chemical.density}</td>
        <td contenteditable="true" class="editable">${chemical.viscosity}</td>
        <td>${chemical.packaging}</td>
        <td class="editable">${chemical.packSize}</td>
        <td>${chemical.unit}</td>
        <td contenteditable="true" class="editable">${chemical.quantity}</td>
      `;
        tbody.appendChild(row);
    });
}

// Function to add new row
function addRow() {
    const newRow = {
        id: chemicals.length + 1,
        name: '',
        vendor: '',
        density: '',
        viscosity: '',
        packaging: 'Bag',
        packSize: 100,
        unit: 'kg',
        quantity: ''
    };
    chemicals.push(newRow);
    loadTableData();
}

// Function to delete selected rows
function deleteSelectedRows() {
    const checkboxes = document.querySelectorAll('#chemicalTable tbody input[type="checkbox"]');
    const rowsToDelete = [];
    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            rowsToDelete.push(index);
        }
    });

    // Remove the selected rows from the chemicals array
    rowsToDelete.reverse().forEach(index => chemicals.splice(index, 1));
    loadTableData(); // Refresh the table
}

// Function to sort table by a specific key
function sortTable(key) {
    if (sortState.column === key) {
        sortState.direction = sortState.direction === 'asc' ? 'desc' : 'asc';
    } else {
        sortState.column = key;
        sortState.direction = 'asc';
    }

    chemicals.sort((a, b) => {
        let comparison = 0;
        if (a[key] > b[key]) comparison = 1;
        if (a[key] < b[key]) comparison = -1;
        return sortState.direction === 'asc' ? comparison : comparison * -1;
    });

    loadTableData();
}

// Function to refresh the table
function refreshTable() {
    location.reload(); // Refresh the entire page
}

// Function to move row up
function moveRowUp() {
    const checkboxes = document.querySelectorAll('#chemicalTable tbody input[type="checkbox"]');
    let checkedIndex = -1;
    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) checkedIndex = index;
    });

    if (checkedIndex > 0) {
        [chemicals[checkedIndex - 1], chemicals[checkedIndex]] = [chemicals[checkedIndex], chemicals[checkedIndex - 1]];
        loadTableData();
    }
}

// Function to move row down
function moveRowDown() {
    const checkboxes = document.querySelectorAll('#chemicalTable tbody input[type="checkbox"]');
    let checkedIndex = -1;
    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) checkedIndex = index;
    });

    if (checkedIndex < chemicals.length - 1) {
        [chemicals[checkedIndex], chemicals[checkedIndex + 1]] = [chemicals[checkedIndex + 1], chemicals[checkedIndex]];
        loadTableData();
    }
}

// Save function to save edits (This can be expanded to save to a database)
function saveData() {
    // Loop through each editable cell and save changes if needed
    const rows = document.querySelectorAll('#chemicalTable tbody tr');
    rows.forEach((row) => {
        const cells = row.querySelectorAll('td');
        const density = cells[4].innerText; // Density
        const viscosity = cells[5].innerText; // Viscosity
        const packSize = cells[7].innerText; // Pack size
        const quantity = cells[9].innerText; // Quantity

        // Save changes logic (This is just a placeholder)
        console.log(`Saving data: Density: ${density}, Viscosity: ${viscosity}, Pack Size: ${packSize}, Quantity: ${quantity}`);
    });
    alert("Data saved successfully!");
}

// Toggle select all checkboxes
function toggleSelectAll() {
    const selectAllCheckbox = document.getElementById('selectAll');
    const checkboxes = document.querySelectorAll('#chemicalTable tbody input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAllCheckbox.checked;
    });
}

// Add event listeners for buttons
function addEventListeners() {
    document.getElementById('addRow').addEventListener('click', addRow);
    document.getElementById('deleteRow').addEventListener('click', deleteSelectedRows);
    document.getElementById('selectAll').addEventListener('change', toggleSelectAll);
    document.getElementById('moveUp').addEventListener('click', moveRowUp);
    document.getElementById('moveDown').addEventListener('click', moveRowDown);
    document.getElementById('refreshData').addEventListener('click', refreshTable);
    document.getElementById('saveData').addEventListener('click', saveData);

    // Add sorting functionality to headers
    document.getElementById('sortId').addEventListener('click', () => sortTable('id'));
    document.getElementById('sortChemicalName').addEventListener('click', () => sortTable('name'));
    document.getElementById('sortVendor').addEventListener('click', () => sortTable('vendor'));
    document.getElementById('sortDensity').addEventListener('click', () => sortTable('density'));
    document.getElementById('sortViscosity').addEventListener('click', () => sortTable('viscosity'));
    document.getElementById('sortPackaging').addEventListener('click', () => sortTable('packaging'));
    document.getElementById('sortPackSize').addEventListener('click', () => sortTable('packSize'));
    document.getElementById('sortUnit').addEventListener('click', () => sortTable('unit'));
    document.getElementById('sortQuantity').addEventListener('click', () => sortTable('quantity'));
}

