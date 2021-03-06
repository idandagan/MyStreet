import appActionTypes from './app-action-types';
import userActionTypes from './user-action-types';
import myStreetsActionTypes from './my-streets-action-types';
import * as streetApi from '../api/streets-api';
import * as userApi from '../api/user-api';

export function appLoaded() {
    return (dispatch, getState) => {
        window.state = getState;
        dispatch({
            type: appActionTypes.LOADED,
        });

        userApi.getActiveUser()
            .then(
                response => dispatch(getActiveUserSuccededed(response)),
                error => dispatch(getActiveUserFailed(error)),
            );
    };
}

function getActiveUserSuccededed({ activeUser }) {

    return dispatch => {

        if (!activeUser) {
            return dispatch({ type: userActionTypes.USER_NOT_FOUND });
        }

        dispatch({
            type: userActionTypes.LOGIN_SUCCEEDED,
            data: { ...activeUser },
        });

        if (activeUser.local.primaryStreet) {
            streetApi.getStreetByPlaceId(activeUser.local.primaryStreet.placeId)
                .then(
                    response => dispatch(getStreetSuccededed(response)),
                    error => dispatch(getStreetFailed(error)),
                );
        }

    };
}

function getActiveUserFailed(response) {
    return {
        type: userActionTypes.USER_NOT_FOUND,
    };
}

function getStreetSuccededed({ selectedStreet }) {
    return selectedStreet ? {
        type: myStreetsActionTypes.SEARCH_SUCCEEDED,
        data: { selectedStreet },
    } : { type: myStreetsActionTypes.STREET_NOT_FOUND };
}

function getStreetFailed(response) {
    return {
        type: myStreetsActionTypes.STREET_NOT_FOUND,
    };
}
