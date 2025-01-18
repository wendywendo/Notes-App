const express = require('express')
const router = express.Router()
const cors = require('cors')
const { addNote, getNotes, deleteNote, updateNote } = require('../controllers/notesController')

// Middleware
router.use(cors({
    credentials: true,
    origin: 'https://notes-app-59at.vercel.app'
}))

router.get('/', getNotes)
router.post('/add', addNote)
router.delete('/delete', deleteNote)
router.put('/update', updateNote)

module.exports = router