import express from "express";
import fs from "fs";

import Note from "../note";

const DATAFILE_PATH = "./db.json";

const db = JSON.parse(fs.readFileSync(DATAFILE_PATH));
console.log("Database:", db);

class NotesController {
  isValidNote = note => {
    if (!note.title || !note.content) {
      return false;
    }
    return true;
  };

  logRequest = (request, id) => {
    let message;
    message = `${request.method} request received`;
    if (id) message += ` for ID: ${id}`;
    if (request.body) message += ` with body: ${JSON.stringify(request.body)}`;
    console.log(message);
  };

  flushDbFile = () => {
    fs.writeFileSync(DATAFILE_PATH, JSON.stringify(db));
  };

  options = (request, response) => {
		this.logRequest(request);
    response.header("Access-Control-Allow-Origin", "http://localhost:3000");
    response.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    response.header(
      "Access-Control-Allow-Headers",
      "Origin, Accept, Content-Type, Authorization, Content-Length, X-Requested-With"
    );
    response.sendStatus(200);
  };

  getAllNotes = (request, response) => {
    this.logRequest(request);
    return response.status(200).send({
      notes: db.notes
    });
  };

  getNote = (request, response) => {
    const id = parseInt(request.params.id, 10);
    this.logRequest(request, id);
    db.notes.find(note => {
      if (note.id === id) {
        return response.status(200).send({
          note
        });
      }
    });
    return response.status(404).send();
  };

  postNote = (request, response) => {
    this.logRequest(request);

    if (!this.isValidNote(request.body)) {
      return response.status(422).send({
        message: "title and note are required"
      });
    }

    const note = new Note(
      db.NextIndex,
      request.body.title,
      request.body.content
    );

    db.NextIndex++;
    db.notes.push(note);

    this.flushDbFile();

    return response.status(201).send({
      note
    });
  };

  putNote = (request, response) => {
    const id = parseInt(request.params.id, 10);
    this.logRequest(request, id);

    if (!this.isValidNote(request.body)) {
      return response.status(422).send({
        message: "title and note are required"
      });
    }

    let currentIndex;
    const foundNote = db.notes.find((note, idx) => {
      if (note.id === id) {
        currentIndex = idx;
        return true;
      }
    });

    if (!foundNote) {
      return response.status(404).send();
    }

    const newNote = new Note(
      foundNote.id,
      request.body.title,
      request.body.content,
      Date.now(),
      foundNote.created
    );

    db.notes.splice(currentIndex, 1, newNote);

    this.flushDbFile();

    return response.status(200).send({
      newNote
    });
  };

  deleteNote = (request, response) => {
    const id = parseInt(request.params.id, 10);
    this.logRequest(request, id);
    db.notes.find((note, idx) => {
      if (note.id === id) {
        db.notes.splice(idx, 1);
        this.flushDbFile();
        return response.status(200).send();
      }
    });

    return response.status(404).send();
  };
}

export default new NotesController();
