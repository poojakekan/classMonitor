const apiUrl = 'https://crudcrud.com/api/a0bb4f7890784f4480b73395b2b014c6/class';
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

            // Create an object to store the count of votes for each candidate
            const votesCount = {};

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
                    // Increment the vote count for the selected candidate
                    votesCount[student.monitorSelect] = (votesCount[student.monitorSelect] || 0) + 1;
                }
            });

            document.getElementById('totalVotes').textContent = totalVotes.toString();

            // Display the total number of votes for each candidate
            for (const candidate in votesCount) {
                const candidateVotes = votesCount[candidate];
                const candidateVotesElement = document.createElement('li');
                candidateVotesElement.textContent = `${candidate} - Total Votes: ${candidateVotes}`;
                studentList.appendChild(candidateVotesElement);
            }
        })
        .catch(error => console.error(error));
}

displayStudents();
