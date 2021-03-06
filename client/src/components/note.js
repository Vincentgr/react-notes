import React, { Component, PropTypes } from "react";
import reactStringReplace from "react-string-replace";
import Octicon from "react-octicon";

const { func, string, object } = PropTypes;

export default function Note(props) {
  const { onEditNote, onDeleteNote, searchTerm, data: note } = props;
  return (
    <div className="row note">
      <div className="cell title" data-title="Title">
        {searchTerm
          ? reactStringReplace(
              note.title.substring(0, 100),
              searchTerm,
              (match, i) => <strong key={i}>{match}</strong>
            )
          : note.title.substring(0, 100)}
      </div>
      <div className="cell note" data-title="Note">
        {searchTerm
          ? reactStringReplace(
              note.content.substring(0, 250),
              searchTerm,
              (match, i) => <strong key={i}>{match}</strong>
            )
          : note.content.substring(0, 250)}
      </div>
      <div className="cell modified" data-title="Modified">
        {new Date(note.modified).toLocaleString()}
      </div>
      <div className="cell glyphs">
        <div className="glyph edit">
          <Octicon
            title="Edit Note"
            aria-label="Edit Note"
            name="pencil"
            className="btn btn-sm btn-secondary btn-edit-note"
            onClick={() => {
              onEditNote(note);
            }}
          />
        </div>
        <div className="glyph delete">
          <Octicon
            title="Delete Note"
            aria-label="Delete Note"
            name="trashcan"
            className="btn btn-sm btn-danger btn-delete-note"
            onClick={() => {
              onDeleteNote(note.id);
            }}
          />
        </div>
      </div>
    </div>
  );
}

Note.propTypes = {
  onDeleteNote: func.isRequired,
  onEditNote: func.isRequired,
  searchTerm: string,
  data: object
};
