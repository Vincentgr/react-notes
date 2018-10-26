import React from "react";
import sinon from "sinon";
import { expect } from "chai";
import { mount, shallow } from "enzyme";
import configureStore from "redux-mock-store";
import {JSDOM} from 'jsdom'

import NotesList from "../../src/components/notes_list";
import Note from "../../src/components/note";

let wrapper;
const mockStore = configureStore();
const store = mockStore({}); // mock an empty store because the component calls `connect` to dispatch
const dom = new JSDOM('<!doctype html><html><body></body></html>')

global.window = dom.window
global.document = dom.window.document

const componentProps = {
  store,
  notes: [
	  {
	    id: 1,
	    title: "Note 1",
	    content: "12345",
	    modified: 1540506998057,
	    created: 1540506998057
	  },
	  {
	    id: 2,
	    title: "Note 2",
	    content: "saddsadsaasd",
	    modified: 1540509277964,
	    created: 1540509277964
	  },
		{
		 id: 3,
		 title: "Note 3",
		 content: "xcvxcxvcxcv",
		 modified: 1540509277965,
		 created: 1540509277965
	 }
	],
};

const getShallowComponent = (props = {}) => {
  props = Object.assign({}, componentProps, props);
  return shallow(<NotesList {...props} />);
};

const getMountedComponent = (props = {}) => {
  props = Object.assign({}, componentProps, props);
  return mount(<NotesList {...props} />);
};

describe("<NotesList />", () => {

  it("shallow renders without error", () => {
    expect(getShallowComponent()).to.exist;
  });

  it("renders as many <Note /> elements as objects in the notes prop", () => {
    const wrapper = getMountedComponent();
		const Notes = wrapper.find(Note);
		expect(Notes).to.have.length(componentProps.notes.length);
  });

  it("renders a loading indicator when loading prop is true", () => {
    const wrapper = getShallowComponent({ loading: true });
		const indicator = wrapper.find('.note-list-loading');
		expect(indicator).to.exist;
  });

  context('sorts the notes list when column headers are clicked', () => {
    let sortNotes = sinon.spy();
    let wrapper = getMountedComponent({ sortNotes: sortNotes });

    beforeEach(() => {
      sortNotes = sinon.spy();
      wrapper = getMountedComponent({ sortNotes: sortNotes });
      store.clearActions();
    });

    it('dispatches a Sort action when Title column is clicked', () => {
      wrapper.find('#column-header-title .clickable').simulate('click');
      const action = store.getActions()[0];
      expect(action).to.have.property('type', 'SORT_NOTES');
      expect(action.payload).to.have.property('sortField', 'title');
    });

    it('dispatches a Sort action when Modified column is clicked', () => {
      wrapper.find('#column-header-modified .clickable').simulate('click');
      const action = store.getActions()[0];
      expect(action).to.have.property('type', 'SORT_NOTES');
      expect(action.payload).to.have.property('sortField', 'modified');
    });
  });
});
