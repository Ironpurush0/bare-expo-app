const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const mogran = require('morgan')

//This server is going to generate a random id for every peer connection.
const {ExpressPeerServer} = require('peer')

const app = express()

app.use(express.json())

const customGenerationFunction = () => {
    (Math.random().toString(36) + "000000000000").substr(2, 16)
}

