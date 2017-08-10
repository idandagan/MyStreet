import * as userApi from 'api/user-api';
import * as streetApi from 'api/streets-api';
import { push } from 'react-router-redux';
import headerActionTypes from 'views/header/state/header-action-types';
import userActionTypes from './user-action-types';
import myStreetsActionTypes from './my-streets-action-types';

export function facebookLoginSubmitted(user) {
    return dispatch => {
        dispatch({
            type: userActionTypes.FACEBOOK_LOGIN_SUBMITTED,
            data: { user },
        });

        userApi.getFacebookLogin(user)
            .then(
                response => dispatch(loginSucceded(response)),
                error => dispatch(loginFailed(error)),
            );
    };
}

function loginSucceded({ user }) {
    return dispatch => {
        dispatch({
            type: userActionTypes.LOGIN_SUCCEEDED,
            data: { ...user },
        });

        if (user.local.primaryStreet) {
            streetApi.getStreetByPlaceId(user.local.primaryStreet.placeId)
                .then(
                    response => dispatch(searchStreetSucceeded(response, user.local.primaryStreet)),
                    error => dispatch(searchStreetFailed(error)),
            );
        }

        dispatch(push('/mystreets'));
    };
}

function searchStreetSucceeded(response, primaryStreet) {
    const { selectedStreet } = response;
    return {
        type: myStreetsActionTypes.SEARCH_SUCCEEDED,
        data: { selectedStreet: selectedStreet || primaryStreet },
    };
}

function searchStreetFailed(error) {
    return {
        type: userActionTypes.SEARCH_FAILED,
    };
}

function loginFailed() {
    return {
        type: userActionTypes.LOGIN_FAILED,
    };
}

export function getPostsSucceeded(streetObject) {
    const { postsfeed } = streetObject;
    return {
        type: headerActionTypes.GET_POSTS_SUCCEEDED,
        data: { postsfeed },
    };
}

export function getPostsFailed(error) {
    return {
        type: headerActionTypes.GET_POSTS_FAILED,
        data: { error },
    };
}
