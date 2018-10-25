import React, { Component } from "react";
import SkyLight from "react-skylight";

import NoteEntryForm from "./entry_form";

export default class NoteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  show = () => {
    this.setState({ visible: true }, () => {
      this.modal.show();
    });
  };

  hide = () => {
    this.note = null;
    this.setState({ visible: false }, () => {
      this.modal.hide();
    });
  };

  render() {
    return (
      <div>
        <SkyLight
          hideOnOverlayClicked
          beforeClose={this.hide}
          ref={ref => (this.modal = ref)}
          title={this.note ? "Edit Note" : "Create Note"}
          on
        >
          {this.state.visible ? (
            <NoteEntryForm onClose={this.hide} editNote={this.note} />
          ) : null}
        </SkyLight>
      </div>
    );
  }
}
