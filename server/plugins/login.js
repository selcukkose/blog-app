const Users = require('../models/user');


exports.plugin = {

    name: "login",
    register: async (server, options) => {

        const addUser = async (email, password) => {

            let isAdded = false;
            let isAvaible = true;

            await Users.find({email: email}, (err, data)=>{

                if(err) console.log(err)
                else {
                    if(data.length == 0)
                        isAvaible = false;
                }
            })  
            
            if(!isAvaible){

                let newUser = new Users({
                    email: email,
                    password: password
                });

                let saved = await newUser.save();   

                if (saved) {
                    isAdded = true;
                }

            }

            return isAdded;
        }

        const deleteUser = async (email, password) => {

            let isDeleted = false;

            let isValidated = server.methods.validateUser(email, password);

            if(isValidated){

                await Users.deleteOne({email: email}, (err)=>{
                    if(err) 
                        console.log(err);
                    else
                        isDeleted = true;
                })
            }

            return isDeleted;
        }


        const setPassword = async (email, password) => {

            let isUpdated = false;

            let isValidated = server.methods.validateUser(email, password);

            if(isValidated){

                await Users.updateOne({email: email}, 
                {
                    $set:{
                        password: password
                    }
                    
                }, (err) => {
                    if (err)
                        console.log(err);
                    else
                        isUpdated = true;
                })
            }

            return isUpdated;
        }

        const validateUser = async (email, password) => {

            let isOK = false;

            await Users.find({
                email: email,
                password: password
            }, (err, userData) => {

                if (userData.length != 0)
                    isOK = true;
            });

            return isOK;
        }

        const getAllUsers = async () => {

            let users = [];

            await Users.find({}, (err, userData) => {

                users = userData;
            });

            return users;
        }

        server.method('addUser', addUser);
        server.method('validateUser', validateUser);
        server.method('getAllUsers', getAllUsers);
        server.method('setPassword', setPassword);
        server.method('deleteUser', deleteUser);
    }
}