//REQUIRES
const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 8080;

//EXPRESS
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next()
})

//FIREBASE
const admin = require('firebase-admin');
const serviceAccount = require('/Users/davidkajpust/Desktop/cloud-providers/atomstats-c54dd-firebase-adminsdk-ff80m-e92ff3e492.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://atomstats-c54dd.firebaseio.com"
});

// app.use(express.static(__dirname + './data/db'))

// app.get('*', (req, res)=> {
//     res.sendFile(path.resolve((__dirname + './../public/index.html')))
// })

app.listen(PORT, () => {
    console.log('Server Started on ' + PORT);
    console.log('Press CTRL + C to stop server');
})


var db = admin.database();


/***********************************APP STARTS ************************ */

var ref = db.ref("gaia2validators");
const gaia2url = 'http://gaia-2-node0.testnets.interblock.io:46657/dump_consensus_state'



app.get('/dumpConsensusState', async (req, res) => {
    try {
        const gaia2ConsensusState = await axios.get(gaia2url);
        console.log(gaia2ConsensusState.data.result.round_state.Validators);
        res.send(gaia2ConsensusState.data.result.round_state.Validators)
    } catch (err) {
        console.log(error);
    }
})

let latestValidators = [];

async function getLatestValidators(req, res) {
    try {
        const gaia2ConsensusState = await axios.get(gaia2url);
        //console.log(gaia2ConsensusState.data.result.round_state.Validators);
        latestValidators = gaia2ConsensusState.data.result.round_state.Validators.validators
        // console.log(latestValidators);
    } catch (err) {
        console.log(err);
    }
}

//only ran at the start
async function seedDatabase() {
    await getLatestValidators();

    for (let i = 0; i < latestValidators.length; i++) {
        // console.log(latestValidators[i].pub_key.data, latestValidators[i].voting_power)
        writeValidatorData(latestValidators[i].pub_key.data, latestValidators[i].voting_power, i)
    }
}

async function updateDatabase() {
    let validatorListDatabase = await readValidatorData('/gaia2validators');
    await getLatestValidators()
    console.log(validatorListDatabase[0][0].validatorPubkey);
    console.log("GGGG");
    console.log(latestValidators);
    // console.log(validatorListDatabase[0].hasOwnProperty('0A29EF59C9B1CFC880354F83D1253FDF04B9FDCD7411B96D801B52C6F03D376'));

    //latestValidators[i].pub_key.data

    //now check if the titles of the public keys exist, IN THE LATEST QUEY. if they dont, delete them . this gets me to have only past ones that exist
    //REMOVE DEAD FROM DATABASE
    for (let i = 0; i < validatorListDatabase.length; i++) {
        let valPubKey = validatorListDatabase[0][i]
        for (let j = 0; i < latestValidators.length; i++) {
            //basically i gotta loop through here, fine if it matches and exit, if we reach end, then we continue, and DELETE from out DB!************&&&&&&&&&&&&&&&&&&&&&
        }
    }

    //then i flip back and add in the new list to the DB, if they exist from before you leave their good time, if they dont exist, they get instantiated with the new time
    //ADD NEW TO DB
}


function writeValidatorData(pubkey, atoms, counter) {
    admin.database().ref('gaia2validators/' + counter).set({
        validatorPubkey: pubkey,
        dateRecorded: Date.now(),
        atomCount: atoms,
    });
}

async function readValidatorData(dbEndpoint) {
    let emptyArray = [];

    await ref.once("value", function (snapshot) {
        // console.log(snapshot.key + " has " + snapshot.val().atomCount + "atoms");
        // console.log(snapshot.key + " has been active for " + Math.round((Date.now() - snapshot.val().dateRecorded)/1000/60) + " minutes");
        emptyArray.push(snapshot.val());
        // console.log(emptyArray);
    });
    return emptyArray;
}


//seedDatabase();
updateDatabase();



// //update 
// //push() creates a post
//   function writeNewPost(uid, username, picture, title, body) {
//     // A post entry.
//     var postData = {
//       author: username,
//       uid: uid,
//       body: body,
//       title: title,
//       starCount: 0,
//       authorPic: picture
//     };



//     // Get a key for a new Post.
//     var newPostKey = firebase.database().ref().child('posts').push().key;

//     // Write the new post's data simultaneously in the posts list and the user's post list.
//     var updates = {};
//     updates['/posts/' + newPostKey] = postData;
//     updates['/user-posts/' + uid + '/' + newPostKey] = postData;

//     return firebase.database().ref().update(updates);
//   }


  //deelet data
//remove()
