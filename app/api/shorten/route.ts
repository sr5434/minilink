import { NextRequest, NextResponse } from 'next/server'
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child } from "firebase/database";

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

function generateID() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
}

export async function POST(req: NextRequest){
    let isUnique = false;
    let linkID = "";
    while (!isUnique){
        linkID = generateID();
        let linkRef2 = ref(database);
        let snapshot = await get(child(linkRef2, `links/${linkID}`));
        isUnique = !snapshot.exists()
    }
    let linkRef = ref(database, `links/${linkID}`);
    let reqJSON = await req?.json();
    set(linkRef, {
        originalLink: reqJSON.link
    });
    return NextResponse.json({ linkID: linkID });
}