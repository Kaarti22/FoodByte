import { Schema, model, models } from 'mongoose';

const UserInfoSchema = new Schema({
    email: {type: String, required: true},
    phoneno: {type: String},
    streetaddress: {type: String},
    city: {type: String},
    country: {type: String},
    pincode: {type: String},
    admin: {type: Boolean, default: false},
}, {timestamps: true});

export const UserInfo = models?.UserInfo || model('UserInfo', UserInfoSchema);