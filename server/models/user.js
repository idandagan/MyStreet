/* eslint-disable no-param-reassign */
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    local: {

        isPremium: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
        },
        lastLogged: {
            type: Date,
            default: Date.now,
        },
        primaryStreet: {
            type: ObjectId,
            default: null,
            ref: 'street',
        },
        streets: [{
            type: ObjectId,
            ref: 'street',
        }],
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String,
    },

}, { collection: 'user' });

export const User = mongoose.model('user', userSchema);

export function removeStreet(memberID, streetID) {

    if (streetID == null || memberID == null) {
        return;
    }

    User.findByIdAndUpdate({ _id: memberID }, { $pull: { 'local.streets': streetID } },
        { new: true }).exec()
        .then(user => {
            if (user) {
                if (user.local.streets.length === 0) {
                    user.local.primaryStreet = null;
                } else if (user.local.primaryStreet === streetID) {
                    user.local.primaryStreet = user.local.streets[0];
                }
                user.save();
                console.log('Removed street from users list');
            }
        });
}
