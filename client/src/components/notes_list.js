import React, { PropTypes } from "react";
import { connect } from "react-redux";
import Octicon from "react-octicon";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import { sortNotes } from "../actions";
import Note from "./note";

const { func, array, string, bool } = PropTypes;

function NotesList(props) {
  
  const onEditNote = note => {
    props.editNote(note);
  };

  const onDeleteNote = noteid => {
    props.deleteNote(noteid);
  };

  const onSortClick = fieldName => {
    let reverse = fieldName !== props.sortField ? false : !props.reverse;
    props.sortNotes(fieldName, reverse);
  };

  const renderNote = note => {
    return (
      <Note
        data={note}
        key={note.id}
        onEditNote={onEditNote}
        onDeleteNote={onDeleteNote}
        searchTerm={props.searchTerm}
      />
    );
  };

  if (props.loading) {
    return <Octicon mega spin name="sync" className="note-list-loading" aria-label="Please wait..."/>;
  } else {
    return (
      <section className="notes-list">
        <div className="table">
          <div className="row header green">
            <div
              id="column-header-title"
              className={`cell title ${
                props.sortField == "title" ? "sorted" : "unsorted"
              }`}
            >
              <a
                className="clickable column-header"
                title="Click to Sort"
                onClick={() => {
                  onSortClick("title");
                }}
              >
                Title
              </a>
              <span
                className={`octicon ${
                  props.reverse == true
                    ? "octicon-chevron-down"
                    : "octicon-chevron-up"
                }`}
              />
            </div>
            <div className="cell note">Note</div>
            <div
              id="column-header-modified"
              className={`cell modified ${
                props.sortField == "modified" ? "sorted" : "unsorted"
              }`}
            >
              <a
                className="clickable column-header"
                title="Click to Sort"
                onClick={() => {
                  onSortClick("modified");
                }}
              >
                Modified{" "}
              </a>
              <span
                className={`octicon ${
                  props.reverse == true
                    ? "octicon-chevron-down"
                    : "octicon-chevron-up"
                }`}
              />
            </div>
            <div className="cell glyph">{""}</div>
          </div>
          <ReactCSSTransitionGroup
            component="div"
            transitionName="note"
            transitionAppear={true}
            transitionAppearTimeout={300}
            transitionEnterTimeout={400}
            transitionLeaveTimeout={400}
          >
            {props.notes &&
              props.notes.map(note => {
                return renderNote(note);
              })}
          </ReactCSSTransitionGroup>
        </div>
        {!props.notes || props.notes.length === 0 ? (
          <ReactCSSTransitionGroup
            component="div"
            transitionName="note"
            transitionAppear={true}
            transitionAppearTimeout={600}
            transitionEnterTimeout={600}
            transitionLeaveTimeout={400}
          >
          <h4>There are no notes to display. Try adding some.</h4>
            </ReactCSSTransitionGroup>
        ) : (
          ""
        )}
      </section>
    );
  }
}

NotesList.propTypes = {
  loading: bool,
  editNote: func.isRequired,
  deleteNote: func.isRequired,
  sortField: string,
  sortNotes: func.isRequired,
  searchTerm: string,
  reverse: bool,
  notes: array,
};

export default connect(
  null,
  { sortNotes }
)(NotesList);
