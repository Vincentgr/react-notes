import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import Octicon from "react-octicon";
import classnames from "classnames";

import {
  loadAllNotes,
  deleteNote,
  searchNotes,
  clearSearch
} from "../actions/index";
import { getSortedNotes } from "../selectors/notes";

import NoteModal from "./note_modal";
import NotesList from "./notes_list";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchOpen: false
    };
  }

  componentWillMount() {
    this.props.loadAllNotes();
  }

  newNote = () => {
    this.modal.note = null;
    this.modal.show();
  };

  editNote = note => {
    this.modal.note = note;
    this.modal.show();
  };

  toggleSearchVisibility = () => {
    this.setState(
      currentState => ({
        searchOpen: !currentState.searchOpen
      }),
      () => {
        if (this.state.searchOpen) {
          this.searchInput.focus(); //focus the input after the search panel opens
        } else {
          this.searchInput.value = "";
          this.props.clearSearch();
        }
      }
    );
  };

  onSearch = event => {
    this.props.searchNotes(event.target.value);
  };

  render() {
    return (
      <div id="NotesApp">
        <header>
          <h1>React Notes</h1>
          <section className="toolbar">
            <input
              className={classnames("search", {
                hidden: !this.state.searchOpen
              })}
              aria-label="Search Notes"
              placeholder="Search"
              onChange={this.onSearch}
              ref={ref => {
                this.searchInput = ref;
              }}
            />
            <button
              id="search"
              className="btn btn-sm btn-secondary"
              onClick={this.toggleSearchVisibility}
            >
              <Octicon aria-label="Search" name="search" />
            </button>
            <button
              id="add"
              className="btn btn-sm btn-primary"
              onClick={this.newNote}
            >
              <Octicon
                title="New Note"
                aria-label="Create New Note"
                name="plus"
              />{" "}
              <span className="text">Add New Note</span>
            </button>
          </section>
        </header>
        <NoteModal
          dialogStyle={{}}
          overlayStyle={{}}
          ref={ref => (this.modal = ref)}
        />
        <NotesList
          notes={this.props.notes}
          editNote={this.editNote}
          deleteNote={this.props.deleteNote}
          sortField={this.props.sortField}
          searchTerm={this.props.searchTerm}
          reverse={this.props.reverse}
        />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    notes: getSortedNotes(state),
    searchTerm: state.notes.searchTerm,
    sortField: state.notes.sortField,
    reverse: state.notes.reverse
  };
}

export default connect(
  mapStateToProps,
  {
    loadAllNotes,
    deleteNote,
    searchNotes,
    clearSearch
  }
)(App);
