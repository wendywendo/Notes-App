import { useEffect, useState } from "react"
import axios from 'axios'
import { FaTrash, FaEdit } from 'react-icons/fa'
import './Dashboard.css'
import { ToastContainer, toast } from 'react-toastify';

export default function Dashboard() {

    const [notes, setNotes] = useState([])
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [editing, setEditing] = useState(false)
    const [editingId, setEditingId] = useState('')

    const deleteNote = async (noteId) => {

        if (window.confirm("Are you sure? ")) {
            try {
                await axios.delete('/notes/delete', {
                    data: { noteId }
                })

                toast('Note deleted successfully')
                getUserNotes()
            } catch (error) {
                console.log(error)
            }
        }
    }

    const updateNote = async (e) => {

        e.preventDefault()

        try {

            await axios.put('/notes/update', {
                noteId: editingId, title, content
            })

            toast('Successfully updated!')
            getUserNotes()

        } catch (error) {
            console.log(error)
        } finally {
            setEditing(false)
            setTitle('')
            setContent('')
            setEditingId('')
        }
    }

    const getUserNotes = async () => {
        try {
            await axios.get('/notes')
            .then(response => setNotes(response.data))
            .catch(err => console.log(err))

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUserNotes()
    }, [])


    const addNote = async (e) => {
        e.preventDefault()

        try {
            const { data } = await axios.post('/notes/add', {
                title, content
            })

            if (data.error) {
                alert(data.error)
            } else {
                setTitle('')
                setContent('')
                toast('Note created successfully')
                getUserNotes()
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <main>
        <ToastContainer />
        <div className="dashboardPage">

            <form 
                className="input-form"
                onSubmit={editing ? (e) => updateNote(e) : (e) => addNote(e)}
            >
                <input 
                    type="text" 
                    placeholder="Title" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea 
                    placeholder="Content here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>

                <button type="submit">{ editing ? "SAVE CHANGES" : "ADD NOTE" }</button>
            </form>
            

            <div className="notes">
                <h2>MY NOTES</h2>

                {
                    notes.length > 0 ? (
                        notes.map((note) => (
                            <div key={note._id} className="note">
                                <h3 className="note-header">{ note.title }</h3>
                                <p className="note-body">{ note.content }</p>
                                <div className="note-icons">
                                    <FaEdit onClick={() => {
                                        setEditing(true)
                                        setEditingId(note._id)
                                        setTitle(note.title)
                                        setContent(note.content)
                                    }}/>
                                    <FaTrash onClick={() => deleteNote(note._id)} />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No notes available</p>
                    )
                }
            </div>

        </div>
    </main>
  )
}
