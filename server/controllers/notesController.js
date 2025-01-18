const express = require('express')
const Note = require('../models/Note')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

// Get all notes 
const getNotes = async (req, res) => {
    try {
        
        const { token } = req.cookies;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { email } = decoded;

        const user = await User.findOne({ email })

        const notes = await Note.find({ user: user._id }).populate('user', 'name')

        return res.json(notes)
 
    } catch (error) {
        console.log(error)
    }
}

// Adding a note
const addNote = async (req, res) => {1

    try {
        
        const { title, content } = req.body;
        const { token } = req.cookies;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { email } = decoded;

        const user = await User.findOne({ email })

        // Check if title or content is empty
        if (!title || !content) {
            return res.json({
                error: 'No title or content'
            })
        }

        // Create new note
        const note = await Note.create({
            user: user._id, 
            title, 
            content
        })

        return res.json(note) 
 
    } catch (error) {
        console.log(error)
    }

}

// Delete note
const deleteNote = async (req, res) => {

    const { noteId } = req.body

    Note.findByIdAndDelete({ _id: noteId })
    .then(result => res.json("Successfully deleted"))
    .catch(err => res.json(err))

}

// Update note
const updateNote = async (req, res) => { 

    const { noteId, title, content } = req.body

    Note.findByIdAndUpdate({ _id: noteId }, { title: title, content: content })
    .then(result => res.json(result))
    .catch(err => res.json(err))

}

module.exports = {
    getNotes,
    addNote,
    deleteNote,
    updateNote
}