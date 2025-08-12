import { combineReducers } from 'redux';
import authReducer from './slice/authSlice';
import jobFiltersReducer from './slice/jobFilterSlice';
import jobListReducer from './slice/jobListSlice';
import jobDetailsReducer from './slice/jobDetailsSlice';
import jobApplicationReducer from './slice/jobApplication';

export default combineReducers({
  auth: authReducer,
  filters: jobFiltersReducer,
  jobs: jobListReducer,
  jobDetails: jobDetailsReducer,
  jobApplication: jobApplicationReducer,
});
