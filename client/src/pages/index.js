import React, { useEffect, useState } from "react";
import DeleteBtn from "../components/DeleteBtn";
import API from "../utils/API";
import { List, ListItem } from "../components/List";
import { TextArea, FormBtn } from "../components/Form";

function Notes() {
//   Setting our component's initial state
  const [notes, setNotes] = useState([])
  const [formObject, setFormObject] = useState({
    destination: "",
    season: "",
    food: "",
    activities: "",
    sights: ""
  })

  // Load all notes and store them with setNotes
  useEffect(() => {
    loadNotes()
  }, [])

  // Loads all notes and sets them to notes
  function loadNotes() {
    API.getNotes()
      .then(res => 
        setNotes(res.data)
      )
      .catch(err => console.log(err));
  };

  // Deletes a note from the database with a given id, then reloads notes from the db
  function deleteNote(id) {
    API.deleteNote(id)
      .then(res => loadNotes())
      .catch(err => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  // When the form is submitted, use the API.saveNote method to save the note data
  // Then reload notes from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.destination) {
      API.saveNote({
        destination: formObject.destination,
        season: formObject.season,
        food: formObject.food,
        activities: formObject.activities,
        sights: formObject.sights
      })
        .then(() => setFormObject({
            destination: "",
            season: "",
            food: "",
            activities: "",
            sights: ""
        }))
        .then(() => loadNotes())
        .catch(err => console.log(err));
    }
  };

    return (
      <div id="parent">

        {/* begin columns-in-thirds! */}
        <div className="columns"> 

        {/* first one */}
        <div className="column is-one-third" id="funstuff"> Don't know where you want to go? Roll the dice!</div>

        {/* second one */}
        <div className="column is-one-third" id="new-note-area">
        <h1 id="yournotesheading">Vacay Ideas</h1>
          <form>
             <TextArea id="textfield" className="column is-full"
               onChange={handleInputChange}
               name="destination"
               placeholder="Where woud you go right now if you could?"
               value={formObject.destination}
            />
             <TextArea id="textfield" className="column is-full"
              onChange={handleInputChange}
              name="season"
               placeholder="Summer, Spring, Fall, Winter, or all four?"
               value={formObject.season}
             />
             <TextArea id="textfield" className="column is-full"
               onChange={handleInputChange}
               name="food"
               placeholder="Sushi? Poutine? Tiramisu? Escargo?"
               value={formObject.food}
             />
             <TextArea id="textfield" className="column is-full"
               onChange={handleInputChange}
               name="activities"
               placeholder="Spa day? Catch up with friends? Museum tours?"
               value={formObject.activities}
             />
           <TextArea id="textfield" className="column is-full"
               onChange={handleInputChange}
               name="sights"
               placeholder="Volcanoes, pyramids, Eiffel Tower, Taj Mahal..."
               value={formObject.sights}
             /> 

            <FormBtn
              disabled={!(formObject.destination)}
              onClick={handleFormSubmit}
            >
              Submit
            </FormBtn>
          </form>
        </div>

       {/* third one */}
        <div className="column is-one-third" id="old-note-area">
            <h1 id="yournotesheading">Your Notes</h1>
          {notes.length ? (
            <List>
              {notes.map(note => {
                return (
                  <ListItem key={note._id}>
                    <a href={"/notes/" + note._id}>
                      <strong>
                        {note.destination} 
                      </strong>
                    </a>
                    <DeleteBtn onClick={() => deleteNote(note._id)} />
                  </ListItem>
                );
              })}
            </List>
          ) : (
            <h3>No Results to Display</h3>
          )}
        </div>

    {/* end columns-in-thirds. */}
    </div>

    </div>
    );
  }

export default Notes;