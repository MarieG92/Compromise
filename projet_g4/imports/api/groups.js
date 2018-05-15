//Import des méthodes
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';

export const Groups = new Mongo.Collection('groups');

//méthodes

Meteor.methods({
    'groups.create'(idUt, nom){
        check(idUt, String);
        check (nom, String);
        Groups.insert({
            admin: idUt,
            isCreated: true,
            name: nom,
            users: [
                idUt
            ]
        });
    },
    'groups.updateGroup'(idUt, idGrp){
        check(idUt, String);
        check(idGrp, String);
        console.log(idUt)
        // let monGroupe = Groups.findOne({_id: idGrp});
        // console.log(monGroupe.users);
        //monGroupe.users.push(idUt);
        //let thisGroup= Groups.findOne({_id:idGrp})
        Groups.update(
            {_id: idGrp},
            { $push : { users : idUt } }
        );
      },
    'groups.changeName'(idGrp,newName){
        check (idGrp, String);
        check (newName, String);
        let monGroupe = Groups.findOne({_id: idGrp});
        Groups.update(
            {_id: idGrp},
            { $set: {name: newName} },
        )
    },
    'groups.deleteGroup'(idGrp,idUt){
        check (idGrp, String);
        check (idUt, String);
        let monGroupe=Groups.findOne({_id: idGrp});
        Groups.remove(
            {_id: idGrp},
            {admin: idUt},
        )
    },
    'groups.leaveGroup'(idGrp,idUt){
        check (idGrp, String);
        check (idUt, String);
        let monGroupe=Groups.findOne({_id: idGrp});
        Groups.update(
            {_id:idGrp},
            {$pull:{users:idUt}}
        )
    }
})
