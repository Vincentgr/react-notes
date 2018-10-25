import { combineReducers } from 'redux';
import notesReducer from './notes';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  notes: notesReducer,
  form: formReducer
});

export default rootReducer;
