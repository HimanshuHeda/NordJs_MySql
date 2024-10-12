// Index.js
const express = require("express");
const con = require("./Connection");  // Import the MySQL connection
const app = express();

// Set the server port
const PORT = 3000;

// Route to display data
app.get("/", (req, res) => {
  // Create 'students' table if it doesn't exist
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS students (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      age INT,
      course VARCHAR(255)
    )`;

  con.query(createTableQuery, (err, result) => {
    if (err) throw err;
    console.log('Students table created or already exists.');

    // Insert dummy data if the table is empty
    const insertDataQuery = `
      INSERT INTO students (name, age, course)
      SELECT * FROM (SELECT 'John Doe', 20, 'Computer Science') AS tmp
      WHERE NOT EXISTS (SELECT * FROM students) LIMIT 1;
    `;
    con.query(insertDataQuery, (err, result) => {
      if (err) throw err;

      // Fetch the records from the 'students' table
      con.query("SELECT * FROM students", (err, students) => {
        if (err) {
          res.send("Error fetching data from the students table.");
        } else {
          // Create an HTML table to display the data
          let html = `
            <html>
              <head><title>Student Records</title></head>
              <body>
                <h1>Student Records</h1>
                <table border='1' cellpadding='5' cellspacing='0'>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Age</th>
                      <th>Course</th>
                    </tr>
                  </thead>
                  <tbody>`;

          // Loop through the result and create table rows
          students.forEach(student => {
            html += `
              <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.course}</td>
              </tr>`;
          });

          html += `</tbody></table></body></html>`;

          // Send the generated HTML as a response
          res.send(html);
        }
      });
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
