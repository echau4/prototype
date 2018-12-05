import { Meteor } from 'meteor/meteor'; 
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Names = new Mongo.Collection('names');

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish names that are public or belong to the current user
    Meteor.publish('names', function namesPublication() {
        return Names.find({
            $or: [
                { private: { $ne: true } },
                { owner: this.userId },
            ],
        });
    });
}

Meteor.methods({
    'names.insert'(data, data1, data2) {
        // check(data, String);
        // check(data1, String);
        // check(data2, Number);

        // Make sure the user is logged in before inserting a task
        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Names.insert({
            firstName: data,
            lastName: data1,
            ssn: data2,
            createdAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
        });
    },
    'names.remove'(nameId) {
        check(nameId, String);

        const name = Names.findOne(nameId);
        if (name.private && name.owner !== this.userId) {
            // If the name is private, make sure only the owner can delete it
            throw new Meteor.Error('not-authorized');
        }
        Names.remove(nameId);
    },
    'names.setPrivate'(nameId, setToPrivate) {
        check(nameId, String);
        check(setToPrivate, Boolean);

        const name = Names.findOne(nameId);

        // Make sure only the name owner can make a name private
        if (name.owner !== this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Names.update(nameId, { $set: { private: setToPrivate } });
    },
});
