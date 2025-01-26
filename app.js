 const studentForm = document.querySelector("#studentForm");
    const submitBtn = document.querySelector("#submitBtn");
    const studentList = document.querySelector("#studentList");

    // Validate inputs
    const validateInputs = () => {
      const name = document.querySelector("#names").value.trim();
      const id = document.querySelector("#roll").value.trim();
      const email = document.querySelector("#email").value.trim();
      const contact = document.querySelector("#contact").value.trim();

      if (!/^[a-zA-Z\s]+$/.test(name)) {
        alert("Student Name should only contain letters.");
        return null;
      }
      if (!/^\d+$/.test(id)) {
        alert("Student ID should only contain numbers.");
        return null;
      }
      if (!/^\d+$/.test(contact)) {
        alert("Contact No should only contain numbers.");
        return null;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Please enter a valid email.");
        return null;
      }

      return { name, id, email, contact };
    };

    // Render students
    const renderStudents = () => {
      const studentsData = JSON.parse(localStorage.getItem("studentsData")) || [];
      // studentList.innerHTML = "<h3>Registered Students</h3>";
      studentList.innerHTML = "<h3></h3>";
      studentsData.forEach((student, index) => {
        const studentRow = document.createElement("div");
        studentRow.classList.add("student-row");
        studentRow.innerHTML = `
          <p><strong>Name:</strong> ${student.name}</p>
          <p><strong>Roll No:</strong> ${student.id}</p>
          <p><strong>Email:</strong> ${student.email}</p>
          <p><strong>Contact:</strong> ${student.contact}</p>
          <div class="student-actions">
            <button onclick="deleteStudent(${index})">Delete</button>
            <button onclick="editStudent(${index})">Edit</button>
          </div>
        `;
        studentList.appendChild(studentRow);
      });
    };

    // Save student data
    const addStudent = (student, index = null) => {
      const studentsData = JSON.parse(localStorage.getItem("studentsData")) || [];
      if (index !== null) {
        studentsData[index] = student;
      } else {
        studentsData.push(student);
      }
      localStorage.setItem("studentsData", JSON.stringify(studentsData));
      renderStudents();
    };

    // Delete student
    window.deleteStudent = (index) => {
      const studentsData = JSON.parse(localStorage.getItem("studentsData")) || [];
      studentsData.splice(index, 1);
      localStorage.setItem("studentsData", JSON.stringify(studentsData));
      renderStudents();
    };

    // Edit student
    window.editStudent = (index) => {
      const studentsData = JSON.parse(localStorage.getItem("studentsData")) || [];
      const student = studentsData[index];
      document.querySelector("#names").value = student.name;
      document.querySelector("#roll").value = student.id;
      document.querySelector("#email").value = student.email;
      document.querySelector("#contact").value = student.contact;

      submitBtn.textContent = "Update";
      submitBtn.setAttribute("data-update-index", index);
    };

    // Handle form submission
    studentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const student = validateInputs();
      if (!student) return;

      const updateIndex = submitBtn.getAttribute("data-update-index");
      if (updateIndex) {
        addStudent(student, parseInt(updateIndex, 10));
        submitBtn.textContent = "Register";
        submitBtn.removeAttribute("data-update-index");
      } else {
        addStudent(student);
      }

      studentForm.reset();
    });

    // Initial render
    renderStudents();