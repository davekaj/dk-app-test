const chai = require('chai')
const axios = require('axios')
const mocha = require('mocha')


const { assert } = chai

const server = 'http://localhost:8080'
const gaia2url = 'http://gaia-2-node0.testnets.interblock.io:46657/dump_consensus_state'
const gaia1url = 'http://gaia-1-node0.testnets.interblock.io:46657/dump_consensus_state'


describe('Front end API call tests', () => {
    let gaia2ConsensusState
    let gaia1ConsensusState
    let backendValidators

    before(async () => {
    })

    describe('Gaia 2 calls', () => {

        beforeEach(async () => {
            gaia2ConsensusState = await axios.get(gaia2url)
            backendValidators = await axios.get(`${server}/getGaia2Validators`)
        })

        it('Should return the array of validators', async () => {
            // console.log(Object.keys(backendValidators.data[0]).length)
            assert.isAbove(Object.keys(backendValidators.data[0]).length, 1, 'it is above length 1 so we are good')
        })
        it('Check the validator keys and atoms staked equal direct call from cosmos', async () => {
            latestValidators = gaia2ConsensusState.data.result.round_state.Validators.validators
            console.log(latestValidators.length)
            console.log(Object.keys(backendValidators.data[0]).length)

            assert.equal((Object.keys(backendValidators.data[0])).length, latestValidators.length, "The list of validators is not equal from both sources");
            for (let i = 0; i < latestValidators.length; i++) {
                let publicKey = latestValidators[i].pub_key.data
                let liveAtomCount = latestValidators[i].voting_power
                // console.log(liveAtomCount)
                // console.log(backendValidators.data[0][publicKey].atomCount)
                let backendAtomCount = backendValidators.data[0][publicKey].atomCount
                assert.equal(liveAtomCount, backendAtomCount, `Atom counts for ${latestValidators[i].pub_key.data} are not equal! `)
            }
        })
        // it('should update when validator set changes'){

        // }
        // it('should update when atom count changes'){

        // }

        // it('should take a lot of requests and handle them greatly '){

        // }
    })

    describe('Gaia 1 calls', () => {

        beforeEach(async () => {
            gaia1ConsensusState = await axios.get(gaia1url)
            backendValidators = await axios.get(`${server}/getGaia1Validators`)
        })

        it('Should return the array of validators', async () => {
            // console.log(Object.keys(backendValidators.data[0]).length)
            assert.isAbove(Object.keys(backendValidators.data[0]).length, 1, 'it is above length 1 so we are good')
        })
        it('Check the validator keys and atoms staked equal direct call from cosmos', async () => {
            latestValidators = gaia1ConsensusState.data.result.round_state.Validators.validators

            console.log(latestValidators.length)
            console.log(Object.keys(backendValidators.data[0]).length)

            assert.equal((Object.keys(backendValidators.data[0])).length, latestValidators.length, "The list of validators is not equal from both sources");
            for (let i = 0; i < latestValidators.length; i++) {
                let publicKey = latestValidators[i].pub_key.data

                let liveAtomCount = latestValidators[i].voting_power
                // console.log(liveAtomCount)
                // console.log(backendValidators.data[0][publicKey].atomCount)
                let backendAtomCount = backendValidators.data[0][publicKey].atomCount
                assert.equal(liveAtomCount, backendAtomCount, `Atom counts for ${latestValidators[i].pub_key.data} are not equal! `)
            }
        })
        // it('should update when validator set changes'){

        // }
        // it('should update when atom count changes'){

        // }

        // it('should take a lot of requests and handle them greatly '){

        // }
    })

    describe('Switching between networks does not corrupt database', () => {

        beforeEach(async () => {
            gaia2ConsensusState = await axios.get(gaia2url)
            backendValidators = await axios.get(`${server}/getGaia2Validators`)
        })

        it('Should return the array of validators', async () => {
            // console.log(Object.keys(backendValidators.data[0]).length)
            assert.isAbove(Object.keys(backendValidators.data[0]).length, 1, 'it is above length 1 so we are good')
        })
        it('Check the validator keys and atoms staked equal direct call from cosmos', async () => {
            latestValidators = gaia2ConsensusState.data.result.round_state.Validators.validators
            console.log(latestValidators.length)
            console.log(Object.keys(backendValidators.data[0]).length)

            assert.equal((Object.keys(backendValidators.data[0])).length, latestValidators.length, "The list of validators is not equal from both sources");
            for (let i = 0; i < latestValidators.length; i++) {
                let publicKey = latestValidators[i].pub_key.data
                let liveAtomCount = latestValidators[i].voting_power
                // console.log(liveAtomCount)
                // console.log(backendValidators.data[0][publicKey].atomCount)
                let backendAtomCount = backendValidators.data[0][publicKey].atomCount
                assert.equal(liveAtomCount, backendAtomCount, `Atom counts for ${latestValidators[i].pub_key.data} are not equal! `)
            }
        })
        // it('should update when validator set changes'){

        // }
        // it('should update when atom count changes'){

        // }

        // it('should take a lot of requests and handle them greatly '){

        // }
    })


})




/*
https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai#a-better-test
ahhh, when testing an app, you can have one DB for testing and one for development.
makes sense now that i think about it

you can split this up with a config folder holding json's

okay things like mocha, and chai should be in devDependencies (--save-dev)

THEN i should write scripts like so in my package.json:
    "start": "SET NODE_ENV=dev && node server.js",
    "test": "mocha --timeout 10000" (timeout for fetching of datas)

it seems like i should relaly only be running tests from the front end
cuz that is how the interaction will happen. no one is running direct server 
commands, i just need the front end to get served up whast it needs.
if it doesnt work, then i debug the backend. duh

use postman to send HTTP requests to the server to check it all works if needed
test an immense amount of http requests

i have been doing "naive" testing with console logs. basically means i test 
single instances, and not were situations, like when you delete a validator,
and then add one, then delete 12, then add 40, etc. 

ahh, set an environment variable TEST in order to test your DB in test.js files
that makes so much sense. this just sets up the config file to hook up to my test 
database

before each runs beforeEach of the DESCRIBE blocks

So when testing HTTP requests, it should go like so:

status should be 200
the resutl should be an array
since the bookstore is empty, we presumed the lenght is equal to 0 

he tests everything, should have a proerty, and checks every property 

*/





/*****************
 * 
 * 
 * here is where i stopped
 * screw using chai http, just use axios 
 * so starting next put in axios, remove exports of servr, and then 
 * make the testing connection!
 */