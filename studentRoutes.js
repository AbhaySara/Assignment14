const express = require("express");

const router = express.Router();

const {

    getStudents,

    addStudent,

    updateStudent,

    deleteStudent

} = require("../controllers/studentController");



// GET ALL STUDENTS

router.get("/", getStudents);



// ADD STUDENT

router.post("/", addStudent);



// UPDATE STUDENT

router.put("/:id", updateStudent);



// DELETE STUDENT

router.delete("/:id", deleteStudent);



module.exports = router;