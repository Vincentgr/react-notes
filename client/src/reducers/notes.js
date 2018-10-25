import { ACTION_TYPES } from "../actions/index";

const initialState = {
  loading: false,
  data: [],
  sortField: null,
  reverse: false,
  searchTerm: null
};

export default function(state = initialState, action) {

  switch (action.type) {
    
    case ACTION_TYPES.SORT_NOTES:
      return {
        ...state,
        sortField: action.payload.sortField,
        reverse:
          action.payload.sortField !== state.sortField ? false : !state.reverse
      };

    case ACTION_TYPES.SEARCH_NOTES:
      return {
        ...state,
        searchTerm: action.payload.searchTerm
      };

    case ACTION_TYPES.CLEAR_SEARCH:
      return {
        ...state,
        searchTerm: null
      };

    case ACTION_TYPES.LOAD_NOTES_FROM_SERVER_START:
      return {
        ...state,
        loading: true
      };

    case ACTION_TYPES.LOAD_NOTES_FROM_SERVER_END:
      return {
        sortedBy: "modified",
        sortDirection: "desc",
        ...state,
        data: action.payload,
        loading: false
      };

    default:
      return state;
  }
}
