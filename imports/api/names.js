import { Meteor } from 'meteor/meteor'; 
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Names = new Mongo.Collection('names');

Meteor.methods({
    'names.insert'(text) {
        check(text, String);

        // Make sure the user is logged in before inserting a task
        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Names.insert({
            text,
            createdAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
        });
    },
    'names.remove'(nameId) {
        check(nameId, String);

        Names.remove(nameId);
    },
});
