import React from "react";
import sinon from "sinon";
import { expect } from "chai";
import { mount, shallow } from "enzyme";

import Note from "../../src/components/note";

let wrapper;

const componentProps = {
  data: {
    id: 1,
    title: "Note 1",
    content: "12345",
    modified: 1540506998057,
    created: 1540506998057
  }
};

const getShallowComponent = (props = {}) => {
  props = Object.assign({}, componentProps, props);
  return shallow(<Note {...props} />);
};

const getMountedComponent = (props = {}) => {
  props = Object.assign({}, componentProps, props);
  return mount(<Note {...props} />);
};

describe("<Note />", () => {

  it("shallow renders without error", () => {
    expect(getShallowComponent()).to.exist;
  });

  context('renders a note correctly', () => {
    let wrapper = getShallowComponent();

    it('renders the correct title', () => {
      const cell = wrapper.find('.cell.title');
      expect(cell.text()).to.equal(componentProps.data.title);
    });

    it('renders the correct note content', () => {
      const cell = wrapper.find('.cell.note');
      expect(cell.text()).to.equal(componentProps.data.content);
    });

    it('renders the correct modified date', () => {
      const cell = wrapper.find('.cell.modified');
      expect(cell.text()).to.equal("2018-10-25 15:36:38");
    });
  });

  it('highlights the search term when present', () => {
    const wrapper = getMountedComponent({ searchTerm: "123" });
    const cell = wrapper.find('.cell.note');
    expect(cell.children().html()).to.equal("<strong>123</strong>");
  });

  it("calls onEditNote() prop when the edit button is clicked", () => {
    const onEditNote = sinon.spy();
    const wrapper = getShallowComponent({ onEditNote });
    wrapper.find(".btn-edit-note").simulate("click");
    expect(onEditNote).to.have.property('callCount', 1);
  });

  it("calls onDeleteNote() prop when the delete button is clicked", () => {
    const onDeleteNote = sinon.spy();
    const wrapper = getShallowComponent({ onDeleteNote });
    wrapper.find(".btn-delete-note").simulate("click");
    expect(onDeleteNote).to.have.property('callCount', 1);
  });
});
