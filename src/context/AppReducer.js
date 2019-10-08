import * as actionTypes from '../Types';

const initialUserState = {
	currentUser: null,
	isLoading: true
};


export default (state = initialUserState, action) => {
	switch(action.type) {
		case actionTypes.SET_USER:
			return {
				...state,
				users: action.payload,
				loading: false
			};
			
		default:
			return state;
	}
}

