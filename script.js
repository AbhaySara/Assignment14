const apiUrl = "http://localhost:3004/students";

const form = document.getElementById("studentForm");

const tableBody = document.getElementById("studentTableBody");



// FETCH ALL STUDENTS

async function fetchStudents() {

    try {

        const response = await fetch(apiUrl);

        const students = await response.json();

        tableBody.innerHTML = "";

        students.forEach((student) => {

            const row = `

            <tr>

                <td>${student.name}</td>

                <td>${student.age}</td>

                <td>${student.course}</td>

                <td>

                    <button class="editBtn"
                    onclick="editStudent(
                    '${student._id}',
                    '${student.name}',
                    '${student.age}',
                    '${student.course}'
                    )">

                    Edit

                    </button>

                    <button class="deleteBtn"
                    onclick="deleteStudent('${student._id}')">

                    Delete

                    </button>

                </td>

            </tr>

            `;

            tableBody.innerHTML += row;

        });

    }

    catch (error) {

        console.log("FETCH ERROR:", error);

    }

}



// ADD STUDENT

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const name = document.getElementById("name").value;

    const age = Number(document.getElementById("age").value);

    const course = document.getElementById("course").value;

    try {

        const response = await fetch(apiUrl, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: name,
                age: age,
                course: course
            })

        });

        const data = await response.json();

        console.log("Student Added:", data);

        // CLEAR FORM
        form.reset();

        // RELOAD STUDENTS
        await fetchStudents();

    }

    catch (error) {

        console.log("ADD ERROR:", error);

    }

});


// DELETE STUDENT

async function deleteStudent(id) {

    try {

        await fetch(`${apiUrl}/${id}`, {

            method: "DELETE"

        });

        fetchStudents();

    }

    catch (error) {

        console.log("DELETE ERROR:", error);

    }

}



// EDIT STUDENT

async function editStudent(id, oldName, oldAge, oldCourse) {

    const name = prompt("Enter New Name", oldName);

    const age = prompt("Enter New Age", oldAge);

    const course = prompt("Enter New Course", oldCourse);

    try {

        await fetch(`${apiUrl}/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name,
                age,
                course
            })

        });

        fetchStudents();

    }

    catch (error) {

        console.log("UPDATE ERROR:", error);

    }

}



// INITIAL LOAD

fetchStudents();