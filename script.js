const apiUrl = 'https://crudcrud.com/api/6b4bf01008444536a492782d7918a13b/votes';
let totalVotes = 0;

function vote() {
    const studentName = document.getElementById('studentName').value;
    const monitorSelect = document.getElementById('monitorSelect').value;

    if (!studentName || !monitorSelect) {
        alert('Please enter student name and select a monitor.');
        return;
    }

    axios.post(apiUrl, { studentName, monitorSelect })
        .then(() => {
            displayStudents();
            document.getElementById('studentName').value = '';
            document.getElementById('monitorSelect').value = '';
        })
        .catch(error => console.error(error));
}

function deleteVote(id) {
    axios.delete(`${apiUrl}/${id}`)
        .then(() => displayStudents())
        .catch(error => console.error(error));
}

function displayStudents() {
    axios.get(apiUrl)
        .then(response => {
            const students = response.data;
            const studentList = document.getElementById('studentList');
            studentList.innerHTML = '';
            totalVotes = 0;

            students.forEach(student => {
                const li = document.createElement('li');
                li.textContent = `${student.studentName} - Voted for: ${student.monitorSelect}`;

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.onclick = () => deleteVote(student._id);
                li.appendChild(deleteBtn);

                studentList.appendChild(li);

                if (student.monitorSelect !== '') {
                    totalVotes++;
                }
            });

            document.getElementById('totalVotes').textContent = totalVotes.toString();
        })
        .catch(error => console.error(error));
}

displayStudents();
