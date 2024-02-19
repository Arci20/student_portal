import express from "express";
import cors from "cors";
import mysql from "mysql2";

const app = express();
app.use(cors());
app.use(express.json());

app.listen(8081, ()=>{
    console.log('hello');
})

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "arci"
})

app.get('/arci', (req, res)=>{
    const q = `SELECT students.id, students.name, teachers.name, students.active
    FROM arci.students
    LEFT JOIN teachers
    ON students.name = teachers.name
    LEFT JOIN subjects
    ON teachers.name = subjects.name 
    WHERE students.id LIKE '%${searchTerm}%' OR students.name LIKE '%${searchTerm}%' OR teachers.name LIKE '%${searchTerm}%' OR subjects.name LIKE '%${searchTerm}%'`
    db.query(q, (err, data)=>{
      if(err) return (err)
      return res.json(data)
    })
})

app.post('/arci/teachers', cors(), (req, res)=>{
  const {searchTerm} = req.body;
  console.log(searchTerm);
  if(!searchTerm) return res.status(500).json({error: 'searchTearm is required'});
  //  const q = `SELECT teachers.id, teachers.name FROM arci.teachers WHERE teachers.id LIKE '%${searchTerm}%' OR teachers.name LIKE '%${searchTerm}%'`
  //  db.query(q, (err, data)=>{
  //   if(err) return (err)
  //   return res.json(data)
  // })
})

app.post('/arci', (req, res) => {
    const idToDelete = req.body.id;

    const query = `DELETE FROM arci.students WHERE id = ${idToDelete}`;

    db.query(query, (err, results) => {
      if (err) {
        console.error('MySQL delete error: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ success: true });
      }
    });
  });

  app.post('/arci', (req, res) => {
    const { id, updatedData } = req.body;

    const query = `UPDATE arci.students SET name = '${updatedData}', teacher_id = '${updatedData}', subject_id = '${updatedData}'  WHERE id = ${id}`;

    db.query(query, (err, data) => {
      if (err) {
        console.error('MySQL edit error: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ success: true });
      }
    });
  })