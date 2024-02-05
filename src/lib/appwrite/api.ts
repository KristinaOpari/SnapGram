import { INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases } from "./config";
import { ID, Query } from "appwrite";

export async function createUserAccount(user: INewUser){
    try{
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        )

        if(!newAccount) throw Error;

        const avatarURL = avatars.getInitials(user.name)

        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl: avatarURL,
        })
        return newUser;
    }catch(error){
        console.log(error)
        return error;
    }
}


export async function saveUserToDB(user: {
    accountId: string;
    email: string;
    name: string;
    imageUrl: URL,
    username?: string
}){
    try{
        const newUser = await databases.createDocument(
            appwriteConfig.databaseID,
            appwriteConfig.userCollectionID,
            ID.unique(),
            user
        )

        return newUser;

    }catch(error){
       console.log(error)
    }
}


export async function signInAccount(user: {email: string; password: string}){
    try{
        const session = await account.createEmailSession(user.email, user.password)
        
        return session
    }catch(error){
        console.log(error)
    }
}

export async function getCurrentUser(){
    try{
        const currentAccount = await account.get()

        if(!currentAccount) throw Error;

        const currentUser = databases.listDocuments(
            appwriteConfig.databaseID,
            appwriteConfig.userCollectionID,
            [
                Query.equal('accountId', currentAccount.$id)
            ]
        )

        if(!currentUser) throw Error;

        return (await currentUser).documents[0]

    }catch(error){
        console.log(error)
    }
}