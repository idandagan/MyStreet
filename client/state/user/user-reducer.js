import createReducer from 'util/create-reducer';
import userActionTypes from 'actions/user-action-types';
import myStreetsActionTypes from 'actions/my-streets-action-types';

const initialState = {
    activeUser: {
        _id: '',
        name: '',
        facebook: {
            id: '',
            name: '',
            token: '',
            first_name: '',
            last_name: '',
            gender: '',
            friends: [],
        },
        local: {
            isPremium: false,
            lastLogged: '',
            primaryStreet: {
                location: [34.7818, 32.0853],
                placeId: '',
                address: '',
            },
            streets: [],
        },
    },
};

export default createReducer(initialState, {
    [userActionTypes.LOGIN_SUCCEEDED](state, action) {
        const { data: { local, facebook, name, _id } } = action;

        return {
            ...state,
            activeUser: {
                name,
                local,
                facebook,
                _id,
            },
        };
    },

    [userActionTypes.FACEBOOK_LOGIN_SUBMITTED](state, action) {
        const { data: { user: { accessToken: token, id, name } } } = action;
        const facebook = { id, name, token };

        return {
            ...state,
            facebook,
        };
    },

    [userActionTypes.GET_USER_SUCCEEDED](state, action) {
        const { data: { selectedUser } } = action;

        return {
            ...state,
            selectedUser,
        };
    },

    [myStreetsActionTypes.CHANGE_PRIMARY_STREET_SUCCEEDED](state, action) {
        const { data: { activeUser } } = action;

        return {
            ...state,
            activeUser,
        };
    },

    [myStreetsActionTypes.LEAVE_STREET_SUCCEEDED](state, action) {
        const { data: { activeUser } } = action;

        return {
            ...state,
            activeUser,
        };
    },

    [myStreetsActionTypes.ADD_STREET_SUCCEEDED](state, action) {
        const { data: { activeUser } } = action;

        return {
            ...state,
            activeUser,
        };
    },

});
