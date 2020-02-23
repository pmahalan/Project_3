import React, { useEffect, useState } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { List, ListItem } from "../../components/List";
import { TextArea, FormBtn } from "../../components/Form";
import ReactMusicPlayer from "../ReactMusicPlayer";
//import { }

let songs = [
  {
      url: 'http://tegos.kz/new/mp3_full/Redfoo_-_New_Thang.mp3',
      cover: 'http://www.nossoarmario.com/blog/wp-content/uploads/2015/01/redfoo.jpg',
      artist: {
          name: 'Redfoo',
          song: 'New Thang'
      }
  },
  {
      url: 'http://a.tumblr.com/tumblr_lpoc6cHNDP1r0jthjo1.mp3',
      cover: 'http://www.thailandballoonfestival.com/tibf2013/images/HugoSlider1.jpg',
      artist: {
          name: 'Hugo',
          song: '99 Problems'
      }
  },
  {
      url: 'http://claymore.france.free.fr/momo/summer love.mp3',
      cover: 'http://myuvn.com/wp-content/uploads/2015/07/justin-timberlake-pusher-love-girl.jpg',
      artist: {
          name: 'Justin Timberlake',
          song: 'Summer Love'
      }
  },
  {
      url: 'http://a.tumblr.com/tumblr_mlyactVSyX1qejx3lo1.mp3',
      cover: 'http://www.tenhomaisdiscosqueamigos.com/wp-content/uploads/2015/06/daft-punk.jpg',
      artist: {
          name: 'Daft Punk',
          song: 'Get Lucky'
      }
  },
  {
      url: 'http://a.tumblr.com/tumblr_lxe7hpIUPA1r3ne4ro1.mp3',
      artist: {
          name: 'Michael Buble',
          song: 'Feeling Good'
      }
  },
  {
      url: 'http://dl.tak3da.com/download/1394/03/The Weeknd - Can t Feel My Face [320].mp3',
      cover: 'http://www.clickgratis.com.br/fotos-imagens/the-weekend/aHR0cDovL3d3dy5iaWxsYm9hcmQuY29tL2ZpbGVzL3N0eWxlcy9wcm9tb182NTAvcHVibGljL21lZGlhL3RoZS13ZWVrZW5kLXRoZS1oaWxscy12aWRlby1iaWxsYm9hcmQtNjUwLmpwZw==.jpg',
      artist: {
          name: 'The Weekend',
          song: 'Can\'t Fell My Face'
      }
  },
  {
      url: 'http://midnightoilco.net/sitebuildercontent/sitebuilderfiles/metallicafuel.mp3',
      cover: 'http://imagens.ailhadometal.com/2015/03/Metallica3.png',
      artist: {
          name: 'Metallica',
          song: 'Fuel'
      }
  }
];

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

  function GetValue() {
    var myarray= new Array("item1","item2","item3");
    var random = myarray[Math.floor(Math.random() * myarray.length)];
    //alert(random);
    document.getElementById("message").innerHTML=random;
}

    return (
      <div id="parent">

        {/* begin columns-in-thirds! */}
        <div className="columns"> 

        {/* first one */}
        <div className="column is-one-third" id="funstuff"> 
        <h1 id="yournotesheading">Other Fun Stuff</h1>

          <div id="randomclicker">

              <p> Click the button to get a random item from an array!</p>

              <input 
              id="btnSearch" 
              type="button" 
              value="Search"
              onClick={GetValue} />
              <p id="message" ></p>
            
            
          </div>

          <ReactMusicPlayer songs={songs} autoplay />

        </div>


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
            <br></br>
             <TextArea id="textfield" className="column is-full"
              onChange={handleInputChange}
              name="season"
               placeholder="Summer, Spring, Fall, Winter, or all four?"
               value={formObject.season}
             />
             <br></br>
             <TextArea id="textfield" className="column is-full"
               onChange={handleInputChange}
               name="food"
               placeholder="Sushi? Poutine? Tiramisu? Escargo?"
               value={formObject.food}
             />
             <br></br>
             <TextArea id="textfield" className="column is-full"
               onChange={handleInputChange}
               name="activities"
               placeholder="Spa day? Catch up with friends? Museum tours?"
               value={formObject.activities}
             />
             <br></br>
           <TextArea id="textfield" className="column is-full"
               onChange={handleInputChange}
               name="sights"
               placeholder="Volcanoes, pyramids, Eiffel Tower, Taj Mahal..."
               value={formObject.sights}
             /> 
             <br></br>

            <FormBtn className="button is-medium"
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
                    <a href={"/notes/" + note._id} id="linkcolors">
                      <strong>
                      <DeleteBtn onClick={() => deleteNote(note._id)} />  {note.destination}
                      </strong>
                      <br></br>
                      {note.season} 
                      <br></br>
                      {note.food} 
                      <br></br>
                      {note.activities} 
                      <br></br>
                      {note.sights} 
                      <br></br>
                    </a>
                    <br></br>
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