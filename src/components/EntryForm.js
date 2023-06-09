import React, { useState, useEffect } from "react"
import "./Entry.css"
export const EntryForm = ({ entry, moods, onFormSubmit, tags }) => {
    const [editMode, setEditMode] = useState(false)
    const [updatedEntry, setUpdatedEntry] = useState(entry)
    useEffect(() => {
        setUpdatedEntry(entry)
        if ('id' in entry) {
            setEditMode(true)
        }
        else {
            setEditMode(false)
        }
    }, [entry])
    entry.entry_tags = []
    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newEntry = { ...updatedEntry }
        if (event.target.name === "entry_tags") {
            if (newEntry.entry_tags?.includes(parseInt(event.target.value))) {
                const index = newEntry.entry_tags.indexOf(parseInt(event.target.value));
                newEntry.entry_tags.splice(index, 1)
            }
            else {
                newEntry.entry_tags.push(parseInt(event.target.value))
            }
        } else {
            newEntry[event.target.name] = event.target.value
        }
        setUpdatedEntry(newEntry)
    }



    const constructNewEntry = () => {
        const copyEntry = { ...updatedEntry }
        copyEntry.mood_id = parseInt(copyEntry.mood_id)
        if (!copyEntry.date) {
            copyEntry.date = Date(Date.now()).toLocaleString('en-us').split('GMT')[0]
        }
        onFormSubmit(copyEntry)
    }

    return (
        <article className="panel is-info">
            <h2 className="panel-heading">{editMode ? "Update Entry" : "Create Entry"}</h2>
            <div className="panel-block">
                <form style={{ width: "100%" }}>
                    <div className="field">
                        <label htmlFor="concept" className="label">Concept: </label>
                        <div className="control">
                            <input type="text" name="concept" required autoFocus className="input"
                                proptype="varchar"
                                placeholder="Concept"
                                value={updatedEntry.concept}
                                onChange={handleControlledInputChange}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="entry" className="label">Entry: </label>
                        <div className="control">
                            <textarea
                                className="textarea"
                                name="entry"
                                value={updatedEntry.entry}
                                onChange={handleControlledInputChange}
                            ></textarea>
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="mood_id" className="label">Mood: </label>
                        <div className="control">
                            <div className="select">
                                <select name="mood_id"
                                    proptype="int"
                                    value={updatedEntry.mood_id}
                                    onChange={handleControlledInputChange}>
                                    <option value="0">Select a mood</option>
                                    {moods.map(m => (
                                        <option key={m.id} value={m.id}>
                                            {m.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field" id="entryTagsContainer">
                        {
                            tags.map(tag => {
                                return <>
                                    <div>
                                        <label htmlFor="tags" className="label">{tag.subject}</label>
                                        <input name="entry_tags"
                                            type="checkbox"
                                            value={tag.id}
                                            onChange={handleControlledInputChange} />
                                    </div>
                                </>
                            })
                        }
                    </div>
                    <div className="field">
                        <div className="control">
                            <button type="submit"
                                onClick={evt => {
                                    evt.preventDefault()
                                    constructNewEntry()
                                }}
                                className="button is-link">
                                {editMode ? "Update" : "Save"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </article>
    )
}
