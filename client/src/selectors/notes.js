import { createSelector } from "reselect";

const getNotesData = state => state.notes.data;
const getSortField = state => state.notes.sortField;
const getReverse = state => state.notes.reverse;
const getSearchTerm = state => state.notes.searchTerm;

const comparators = {
  text: (a, b, reverse) => {
    if (a < b) return reverse ? -1 : 1;
    if (a > b) return reverse ? 1 : -1;
    if (a === b) return 0;
  },
  numeric: (a, b, reverse) => {
    return reverse ? a - b : b - a;
  }
};

export const getSortedNotes = createSelector(
  [getNotesData, getSortField, getReverse, getSearchTerm],
  (notes, sortField, reverse, searchTerm) => {
    const sortedNotes = notes.sort((a, b) => {
      switch (sortField) {
        case "title":
          return comparators.text(a["title"], b["title"], reverse);
          break;

        case "modified":
          return comparators.numeric(a[sortField], b[sortField], reverse);
      }
    });

    if (searchTerm) {
      const exp = new RegExp(searchTerm, 'i');
      return sortedNotes.filter(
        note => exp.test(note.title) || exp.test(note.content)
      );
    }

    return sortedNotes;
  }
);
