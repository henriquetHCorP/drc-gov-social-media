import User from '../models/user.model'; 

import { connect } from '../mongodb/mongoose'; 

export const createOrUpdateUser = async(
    id,
    first_name, 
    last_name, 
    image_url, 
    email_adresses,
    username, 
)=> {
    try {
         await connect(); 
         const user = await User.findOneAndUpdate(
            { clerkId : id},
            // above here we are searching for the clerk id if it's there, we wanna update it else we wanna create it; 
            {
                $set: {
                    firstName: first_name, 
                    lastName: last_name, 
                    profilePicture: image_url, 
                    email: email_adresses[0].email_address,
                    username, 
                }, 
            }, { new : true, upsert:true }
            // upsert: true ===> if there's no clerkId we wanna create a new user; 
         );
         return user; 
    }catch(error){
     console.log('Error creating or updating the user:', error); 
    }
}; 

export const deleteUser = async (id) => {
    try {
       await connect(); 
       await User.findOneAndDelete({ clerkId: id }); 
    } catch(error) {
       console.log("Error deleting user:", error); 
    }
}
// inside the webhook we want to use these two functions to send the data from the clerk