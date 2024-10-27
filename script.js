function filterData() {
  event.preventDefault();
  var startdate = document.getElementById("startdate").value;
  var enddate = document.getElementById("enddate").value;
  alert(startdate);
  alert(enddate);
}
async function fetchPitchData() {
  try {
    const response = await fetch('https://compute.samford.edu/zohauth/clients/datajson');
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    populateTable(data);
  } catch (error) {
    console.error('There was a problem fetching the data:', error);
  }
}

function populateTable(data) {
  const tableBody = document.querySelector('#pitchTable tbody');
  tableBody.innerHTML = ''; // Clear existing rows if any

  data.forEach(pitch => {
    const row = document.createElement('tr');

    // Create ID column with a link
    const idCell = document.createElement('td');
    const link = document.createElement('a');
    link.href = `details.html?id=${pitch.id}`;
    link.textContent = `Pitch ${pitch.id}`;
    idCell.appendChild(link);
    row.appendChild(idCell);

    // Create Speed column
    const speedCell = document.createElement('td');
    speedCell.textContent = pitch.speed;
    row.appendChild(speedCell);

    // Create Result column
    const resultCell = document.createElement('td');
    resultCell.textContent = pitch.result || '--';
    row.appendChild(resultCell);

    tableBody.appendChild(row);
  });
}

// Fetch and populate the table on page load
fetchPitchData();