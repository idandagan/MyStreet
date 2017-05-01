import * as streetsApi from 'api/streets-api';
import * as postsApi from 'api/post-api';
import myStreetsActionTypes from './my-streets-action-types';

export function searchStreetSubmitted(streetObject) {
    return dispatch => {
        dispatch({
            type: myStreetsActionTypes.SEARCH_SUBMITTED,
            data: { streetObject },
        });
        streetsApi.getStreetByPlaceId(streetObject.place_id)
            .then(
                response => dispatch(searchStreetSucceeded(response, streetObject)),
                error => dispatch(searchStreetFailed(error)),
            );
        postsApi.getPostsByPlaceId(streetObject.place_id)
            .then(
                response => dispatch(getPostsSucceeded(response)),
                error => dispatch(getPostsFailed(error)),
            );
        streetsApi.getStreetsNearby(streetObject)
            .then(
                response => dispatch(getStreetsNearbySucceeded(response, streetObject)),
                error => dispatch(searchStreetFailed(error)),
            );
    };
}

export function addStreetSubmitted(street) {
    return (dispatch) => {

        dispatch({
            type: myStreetsActionTypes.ADD_STREET_SUBMITTED,
            data: { street },
        });

        streetsApi.addStreet(street)
            .then(
                response => dispatch(addStreetSucceeded(response, street)),
                error => dispatch(addStreetFailed(error)),
            );
    };
}

function searchStreetSucceeded(response, streetSelected) {
    const { street } = response;
    return {
        type: myStreetsActionTypes.SEARCH_SUCCEEDED,
        data: { selectedStreet: street || streetSelected },
    };
}

function searchStreetFailed(error) {
    return {
        type: myStreetsActionTypes.SEARCH_FAILED,
    };
}

function getMembersSucceeded(members) {
    return {
        type: myStreetsActionTypes.GET_MEMBERS_SUCCEEDED,
        data: { members },
    };
}

function addStreetSucceeded(response, street) {
    const { content: { selectedStreet, activeUser } } = response;

    return dispatch => {
        dispatch({
            type: myStreetsActionTypes.ADD_STREET_SUCCEEDED,
            data: { selectedStreet, activeUser },
        });

        dispatch(getStreet(street));
    };
}

function addStreetFailed(error) {
    return {
        type: myStreetsActionTypes.ADD_STREET_FAILED,
        data: { error },
    };
}

function getStreet(street) {
    return (dispatch) => {
        streetsApi.getStreetByPlaceId(street.place_id)
            .then(
                response => dispatch(searchStreetSucceeded(response, street)),
                error => dispatch(searchStreetFailed(error)),
            );
    };
}

function getPostsSucceeded(streetObject) {
    const { postsfeed } = streetObject;
    return {
        type: myStreetsActionTypes.GET_POSTS_SUCCEEDED,
        data: { postsfeed },
    };
}

function getPostsFailed(error) {
    return {
        type: myStreetsActionTypes.GET_POSTS_FAILED,
        data: { error },
    };
}

function getStreetsNearbySucceeded(streets, selectedStreet) {
    return {
        type: myStreetsActionTypes.GET_STREETS_NEARBY_SUCCEEDED,
        data: {
            ...streets,
            selectedStreet,
        },
    };
}
