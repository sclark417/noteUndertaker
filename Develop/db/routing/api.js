const fs = require("fs");
var data = JSON.parse(fs.readFileSync("./Develop/db/db.json", "utf8"));

//Creating a route
module.exports = function (app) {
  // get the current data that is being stored in the db.json and Display the notes
  app.get("/api/notes", function (req, res) {
    res.json(data);
  });

  //Display the place of the note in the array/
  app.get("/api/notes/:id", function (req, res) {
    res.json(data[Number(req.params.id)]);
  });

  // Create a new note and post that data to the json file. Stringify the data that will later be parsed to display.
  app.post("/api/notes", function (req, res) {
    let createNote = req.body;
    let uniqueId = data.length.toString();
    console.log(uniqueId);
    createNote.id = uniqueId;
    data.push(createNote);

    fs.writeFileSync(
      "./Develop/db/db.json",
      JSON.stringify(data),
      function (err) {
        if (err) throw err;
      }
    );

    res.json(data);
  });

  //to delete post it will select the note by its id
  app.delete("/api/notes/:id", function (req, res) {
    let noteId = req.params.id;
    let newId = 0;
    data = data.filter((currentNote) => {
      return currentNote.id != noteId;
    });
    for (currentNote of data) {
      currentNote.id = newId.toString();
      newId++;
    }
    fs.writeFileSync("./Develop/db/db.json", JSON.stringify(data));
    res.json(data);
  });
};
