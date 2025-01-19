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

const updateNote = async (req, res) => {
    try {
        const { noteId, title, content } = req.body;

        // Validate inputs
        if (!noteId || !title || !content) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Update note and return the updated document
        const updatedNote = await Note.findByIdAndUpdate(
            noteId, // Find by note ID
            { title, content }, // Fields to update
            { new: true } // Return the updated document
        );

        // Check if the note exists
        if (!updatedNote) {
            return res.status(404).json({ error: 'Note not found' });
        }

        // Send the updated note as a response
        res.json(updatedNote);

    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {
    getNotes,
    addNote,
    deleteNote,
    updateNote
}