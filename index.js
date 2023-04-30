 const form = document.querySelector("#login-form");
      const tableBody = document.querySelector("#table-body");
      const errorPrompt = document.querySelector("#errorPrompt");

      // Load existing entries from localStorage
      let entries = JSON.parse(localStorage.getItem("entries")) || [];

      // Render existing entries in the table
      entries.forEach((entry) => {
        const newRow = tableBody.insertRow();
        newRow.insertCell().textContent = entry.name;
        newRow.insertCell().textContent = entry.email;
        newRow.insertCell().textContent = entry.dob;
        newRow.insertCell().textContent = entry.password;
        newRow.insertCell().textContent = entry.accepted ? "Yes" : "No";
      });

      form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Check if all required fields are filled
        if (form.checkValidity()) {
          // Create a new row in the table
          const newRow = tableBody.insertRow();

          // Add the form data to the row
          const name = form.elements["name"].value;
          const email = form.elements["email"].value;
          const dob = form.elements["dob"].value;
          const password = form.elements["password"].value;
          const accepted = form.elements["acceptTerms"].checked;

          newRow.insertCell().textContent = name;
          newRow.insertCell().textContent = email;
          newRow.insertCell().textContent = dob;
          newRow.insertCell().textContent = password;
          newRow.insertCell().textContent = accepted ? "Yes" : "No";

          // Save the new entry to localStorage
          const entry = { name, email, dob, password, accepted };
          entries.push(entry);
          localStorage.setItem("entries", JSON.stringify(entries));

          // Reset the form
          form.reset();
        } else {
          errorPrompt.style.display = "block";
        }
      });

      const dobInput = document.getElementById("dob");
      const today = new Date();
      const maxDate = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
      )
        .toISOString()
        .split("T")[0];
      const minDate = new Date(
        today.getFullYear() - 55,
        today.getMonth(),
        today.getDate()
      )
        .toISOString()
        .split("T")[0];
      dobInput.setAttribute("max", maxDate);
      dobInput.setAttribute("min", minDate);
