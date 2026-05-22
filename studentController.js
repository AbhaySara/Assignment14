const Student = require("../models/Student");



// GET ALL STUDENTS

const getStudents = async (req, res) => {

    try {

        const students = await Student.find();

        res.json(students);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};



// ADD STUDENT

const addStudent = async (req, res) => {

    try {

        const student = new Student({

            name: req.body.name,

            age: req.body.age,

            course: req.body.course

        });

        const savedStudent = await student.save();

        res.status(201).json(savedStudent);

    }

    catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};



// UPDATE STUDENT

const updateStudent = async (req, res) => {

    try {

        const updatedStudent =
        await Student.findByIdAndUpdate(

            req.params.id,

            req.body,

            { new: true }

        );

        res.json(updatedStudent);

    }

    catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};



// DELETE STUDENT

const deleteStudent = async (req, res) => {

    try {

        await Student.findByIdAndDelete(req.params.id);

        res.json({
            message: "Student Deleted"
        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};



// EXPORTS

module.exports = {

    getStudents,

    addStudent,

    updateStudent,

    deleteStudent

};