import { NextRequest, NextResponse } from 'next/server'
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, child } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyC99zF1_auGU5P4h8ttSAmiqHZFD_Mav2w",
    authDomain: "minilink-71a2c.firebaseapp.com",
    databaseURL: "https://minilink-71a2c-default-rtdb.firebaseio.com",
    projectId: "minilink-71a2c",
    storageBucket: "minilink-71a2c.appspot.com",
    messagingSenderId: "1081277008770",
    appId: "1:1081277008770:web:7981aff2c815a9acad9d9b"
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export async function POST(req: NextRequest){
    const reqJSON = await req?.json();
    ///console.log(reqJSON)
    const linkRef = ref(database);
    const snapshot = await get(child(linkRef, `links/${reqJSON.linkID}`));
    //console.log(snapshot.val());
    return NextResponse.json({ redirectURL: snapshot.val().originalLink })
}