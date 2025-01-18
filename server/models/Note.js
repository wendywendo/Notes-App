const mongoose = require('mongoose')
const { Schema } = mongoose

const noteSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: String,
    content: String
})

const NoteModel = mongoose.model("Note", noteSchema)

module.exports = NoteModel