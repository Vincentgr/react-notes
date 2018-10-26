import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { reset, change } from "redux-form";

import classnames from "classnames";
import Octicon from "react-octicon";

import { saveNote, updateNote } from "../actions/index";
import { reduxForm } from "redux-form";

const { func, object } = PropTypes;

class NoteEntryForm extends Component {
  componentWillMount() {
    if (this.props.editNote) {
      const { editNote } = this.props;
      this.props.dispatch(change("NoteEntryForm", "title", editNote.title));
      this.props.dispatch(change("NoteEntryForm", "content", editNote.content));
    }
  }

  componentDidMount = () => {
    this.firstInput.focus();
  };

  componentWillUnmount() {
    this.initializeForm();
  }

  onFormSubmit = (values, dispatch) => {
    return new Promise((resolve, reject) => {
      if (!values.title) {
        reject({ title: "You must enter a title", _error: "Add note failed!" });
        return;
      } else if (!values.content) {
        reject({
          content: "You must enter a note",
          _error: "Add note failed!"
        });
        return;
      } else {
        if (this.props.editNote) {
          const newNote = Object.assign(this.props.editNote, { ...values });
          dispatch(updateNote(newNote)).then(() => {
            this.initializeForm();
            this.props.onClose();
            resolve();
          });
        } else {
          dispatch(saveNote(values)).then(() => {
            this.initializeForm();
            this.props.onClose();
            resolve();
          });
        }
      }
    });
  };

  initializeForm = () => {
    this.props.resetForm();
  };

  onCancel = () => {
    this.initializeForm();
    this.props.onClose();
  };

  render() {
    const {
      fields: { title, content },
      handleSubmit
    } = this.props;

    return (
      <section className="note-entry-section">
        <form
          className={classnames("input-group note-entry")}
          onSubmit={handleSubmit(this.onFormSubmit)}
        >
          <div
            className={`form-group ${
              title.touched && title.invalid ? "has-danger" : ""
            }`}
          >
            <input
              id="title"
              className="title form-control"
              placeholder="Title"
              {...title}
              autofocus
              ref={ref => {
                this.firstInput = ref;
              }}
            />
          </div>

          <div className={`form-group ${content.invalid ? "has-danger" : ""}`}>
            <textarea
              id="content"
              className="content form-control"
              placeholder="Note"
              {...content}
              value={content.value || ""}
            />
          </div>

          <div className="input-group-btn form-group">
            <button
              id="cancel"
              className="btn btn-sm btn-secondary"
              onClick={this.onCancel}
            >
              Cancel
            </button>
            <button
              id="save-note"
              type="submit"
              className={`btn btn-sm btn-primary
						${title.value && content.value ? "enabled" : "disabled"}`}
            >
              Save Note
            </button>
          </div>
        </form>
      </section>
    );
  }
}

NoteEntryForm.propTypes = {
  onClose: func.isRequired,
  resetForm: func.isRequired,
  editNote: object
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ saveNote, updateNote, change }, dispatch);
}

export default reduxForm({
  form: "NoteEntryForm",
  fields: ["title", "content"]
})(NoteEntryForm);
