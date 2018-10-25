
const jsonHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

export const ACTION_TYPES = {
  LOAD_NOTES_FROM_SERVER_START: "LOAD_NOTES_FROM_SERVER_START",
  LOAD_NOTES_FROM_SERVER_END: "LOAD_NOTES_FROM_SERVER_END",
  SORT_NOTES: "SORT_NOTES",
  SEARCH_NOTES: "SEARCH_NOTES",
  CLEAR_SEARCH: "CLEAR_SEARCH"
};

function startLoadingNotes() {
  return {
    type: ACTION_TYPES.LOAD_NOTES_FROM_SERVER_START
  };
}

function finishLoadingNotes(data) {
  return {
    type: ACTION_TYPES.LOAD_NOTES_FROM_SERVER_END,
    payload: data.notes
  };
}

export function sortNotes(sortField, reverse) {
  return {
    type: ACTION_TYPES.SORT_NOTES,
    payload: {
      sortField,
      reverse
    }
  };
}

export function searchNotes(searchTerm) {
  return {
    type: ACTION_TYPES.SEARCH_NOTES,
    payload: {
      searchTerm
    }
  };
}

export function clearSearch() {
  return {
    type: ACTION_TYPES.CLEAR_SEARCH,
  };
}


export function loadAllNotes() {
  return function(dispatch, getState) {
    dispatch(startLoadingNotes());
    return fetch("http://localhost:3001/notes", {
      method: "GET",
      headers: jsonHeaders
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        dispatch(finishLoadingNotes(json));
      })
      .catch(ex => {
        console.log("loadAllNotes: response parsing failed", ex);
      });
  };
}

export function updateNote(note) {
  return function(dispatch, getState) {
    return fetch(`http://localhost:3001/note/${note.id}`, {
      method: "PUT",
      headers: jsonHeaders,
      body: JSON.stringify(note)
    })
      .then(() => {
        dispatch(loadAllNotes());
      })
      .catch(ex => {
        console.log("updateNote: error updating note on server", ex);
      });
  };
}

export function saveNote(note) {
  return function(dispatch, getState) {
    return fetch("http://localhost:3001/note", {
      method: "POST",
      headers: jsonHeaders,
      body: JSON.stringify(note)
    })
      .then(() => {
        dispatch(loadAllNotes());
      })
      .catch(ex => {
        console.log("saveNote: error saving note to server", ex);
      });
  };
}

export function deleteNote(noteid) {
  return function(dispatch, getState) {
    return fetch(`http://localhost:3001/note/${noteid}`, {
      method: "DELETE",
      headers: jsonHeaders
    })
      .then(() => {
        dispatch(loadAllNotes());
      })
      .catch(ex => {
        console.log("deleteNote: error deleting note from server", ex);
      });
  };
}
