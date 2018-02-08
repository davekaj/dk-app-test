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
const serviceAccount = require('/Users/dustinbrickwood/Documents/atomstats-c54dd-firebase-adminsdk-ff80m-e92ff3e492.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://atomstats-c54dd.firebaseio.com"
});

app.listen(PORT, () => {
    console.log('Server Started on ' + PORT);
    console.log('Press CTRL + C to stop server');
})

/***********************************APP STARTS ************************ */
let db = admin.database();
// let databaseAccesString = '';
let databaseSeedString = '/gaia2validators/';
// let ref = db.ref('/');
let latestValidators = [];
const gaia2url = 'http://gaia-2-node0.testnets.interblock.io:46657/dump_consensus_state'
const gaia1url = 'http://gaia-1-node0.testnets.interblock.io:46657/dump_consensus_state'



//******************************* API CALLS ************************************** */

app.get('/getGaia2Validators', async (req, res) => {
    try {
        // const gaia2ConsensusState = await axios.get(gaia2url);
        // console.log(gaia2ConsensusState.data.result.round_state.Validators);
        // res.send(gaia2ConsensusState.data.result.round_state.Validators)
        databaseAccesString = '/gaia2validators/'
        const dbValidators = await readValidatorData('/gaia2validators')

        console.log('gaia2 query received')
        res.send(dbValidators);
    } catch (err) {
        console.log(error);
    }
})

app.get('/getGaia1Validators', async (req, res) => {
    try {
        // const gaia2ConsensusState = await axios.get(gaia2url);
        // console.log(gaia2ConsensusState.data.result.round_state.Validators);
        // res.send(gaia2ConsensusState.data.result.round_state.Validators)

        databaseAccesString = '/gaia1validators/'
        const dbValidators = await readValidatorData('/gaia1validators')

        console.log('gaia1 query received')
        res.send(dbValidators);
    } catch (err) {
        console.log(error);
    }
})




//*********************************SERVER FUNCTIONALITY ********************************************** */

function writeValidatorData(pubkey, atoms, network) {
    admin.database().ref(network + pubkey).set({
        validatorPubkey: pubkey,
        dateRecorded: Date.now(),
        atomCount: atoms,
    });
}

async function readValidatorData(dbEndpoint) {
    let emptyArray = [];
    await db.ref(dbEndpoint).once("value", function (snapshot) {
        emptyArray.push(snapshot.val());
    });
    return emptyArray;
}

async function editValidatorData(atoms, pubKey, network) {
    let refPubkey = db.ref(network + pubKey);
    // console.log(pubKey);
    let dataHolder = [];
    let oldData = await refPubkey.once("value", function (snapshot) {
        dataHolder.push(snapshot.val());
    });
    let saveDate = dataHolder[0].dateRecorded;
    // console.log(saveDate);

    let updatedInfo = {
        validatorPubkey: pubKey,
        dateRecorded: saveDate,
        atomCount: atoms,
    }

    let updates = {}
    updates[`${databaseAccesString}${pubKey}`] = updatedInfo;

    return admin.database().ref().update(updates);

}


async function getLatestValidators(validatorEndPoint) {

    let whichURL = '';

    switch (validatorEndPoint) {
        case '/gaia2validators/':
            whichURL = gaia2url
            break
        case '/gaia1validators/':
            whichURL = gaia1url
    }

    try {
        const networkConsensusState = await axios.get(whichURL);
        //console.log(gaia2ConsensusState.data.result.round_state.Validators);
        latestValidators = networkConsensusState.data.result.round_state.Validators.validators
        // console.log(latestValidators);
    } catch (err) {
        console.log(err);
    }
}

//only ran at the start
async function seedDatabase(network) {
    await getLatestValidators(network);

    for (let i = 0; i < latestValidators.length; i++) {
        // console.log(latestValidators[i].pub_key.data, latestValidators[i].voting_power)
        writeValidatorData(latestValidators[i].pub_key.data, latestValidators[i].voting_power, network)
    }
}


async function removeDisconnectedValidatorsFromDatabase(network) {
    await getLatestValidators(network)
    let validatorListDatabase = await readValidatorData(network);
    let validatorPubKeyArray = Object.keys(validatorListDatabase[0]);

    //parse down the data returned from cosmos endpoint to just an array of the public keys 
    let arrayOfLiveNetworkValidatorKeys = [];
    latestValidators.forEach((element) => {
        arrayOfLiveNetworkValidatorKeys.push(element.pub_key.data)
    })

    //Search if our database stored keys are still available on the live network of cosmos
    for (let i = 0; i < validatorPubKeyArray.length; i++) {
        let valPubKey = validatorPubKeyArray[i];
        var exists = arrayOfLiveNetworkValidatorKeys.findIndex((element) => {
            return element == valPubKey
        })

        //means we did not find a match, which means this validator has went offline since the last recording on our end
        if (exists == -1) {
            console.log("Our saved database key no longer exists on live network, thus it has gone down. Key is: " + valPubKey)
            admin.database().ref(network + valPubKey).remove();
        }
    }
}

async function addNewValidatorsToDataBase(network) {
    await getLatestValidators(network)
    let shortenedValidatorList = await readValidatorData(network); //named shorted because it happens after removing disconnect ones from out DB
    let shortenedListKeysArray = Object.keys(shortenedValidatorList[0]);

    let keysToAtomsObject = {};
    //retrieve an array of the atom count we have stored in DB to check if it has updated.
    //@returns an array of pubkeys with values of atoms , each an object
    let atomsListLinkedToKeysArray = shortenedListKeysArray.map(theKey => {
        let recordAtomCount = shortenedValidatorList[0][theKey].atomCount;
        keysToAtomsObject[theKey] = recordAtomCount;
    })

    // console.log(keysToAtomsObject);

    //search if there are any validators on live network that do not exist in our database (therefore its new)
    for (let j = 0; j < latestValidators.length; j++) {
        let livePubKeys = latestValidators[j].pub_key.data;
        let liveAtomCount = latestValidators[j].voting_power;
        let liveExistsInDatabase = shortenedListKeysArray.findIndex((element) => {
            return element == livePubKeys
        })

        //write in a new validator
        if (liveExistsInDatabase == -1) {
            console.log(`We found a new validator on the blockchain. We added it in our database for today. Key is: ${livePubKeys}`)
            writeValidatorData(livePubKeys, latestValidators[j].voting_power, network);
            //check if their atom count has been changed, and fix it if it has
        } else {
            if (liveAtomCount != keysToAtomsObject[livePubKeys]) {
                editValidatorData(liveAtomCount, livePubKeys, network);
                console.log(`Validator ${livePubKeys} in the DB has changed the amount of atoms staked. Old amount: ${keysToAtomsObject[livePubKeys]}. New amount: ${liveAtomCount}`)
            }

        }

    }
}

//entry point to all updating 
async function updateDatabase(network) {
    let checkIfDatabaseIsSeeded = await readValidatorData(network);
    //if its empty, we just seed for the first time, and we dont have to update
    if (checkIfDatabaseIsSeeded[0] === null) {
        seedDatabase(network);
    } else {
        await removeDisconnectedValidatorsFromDatabase(network);
        await addNewValidatorsToDataBase(network)
    }
}


//run update upon starting the server
updateDatabase(databaseSeedString);


/*

NOW I NEED TO DO TEST DRIVE DEVELOPMENT
*/

