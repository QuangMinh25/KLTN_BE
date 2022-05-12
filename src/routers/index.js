const express = require('express');
const router = express.Router()

// Import Schema
const userSchema = require('../controllers/userSchema')
const stationSchema = require('../controllers/stationSchema')
const subjectSchema = require('../controllers/subjectSchema')
const trainSchema = require('../controllers/trainSchema')
const trainCodeSchema = require('../controllers/trainCodeSchema')
const wagonsSchema = require('../controllers/wagonsSchema')
const ticketSchema = require('../controllers/ticketSchema')
const returnTicketSchema = require('../controllers/returnTrainTicketSchema')
const mailSchema = require('../controllers/mailSchema')

// Boy Parser
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json())

// User
router.post('/login', userSchema.login)
router.post('/register', userSchema.register)
router.get('/profile', userSchema.profile)

// Station
router.post('/station', stationSchema.add)
router.get('/station', stationSchema.get)
router.get('/station/:id', stationSchema.getId)
router.put('/station/:id', stationSchema.edit)
router.delete('/station/:id', stationSchema.delete)

// Subject
router.post('/subject', subjectSchema.add)
router.get('/subject', subjectSchema.get)
router.get('/subject/:id', subjectSchema.getId)
router.put('/subject/:id', subjectSchema.edit)
router.delete('/subject/:id', subjectSchema.delete)

// Train
router.post('/train', trainSchema.add)
router.get('/train', trainSchema.get)
router.get('/train/:id', trainSchema.getId)
router.put('/train/:id', trainSchema.edit)
router.delete('/train/:id', trainSchema.delete)

// Train Code
router.post('/train-code', trainCodeSchema.add)
router.get('/train-code', trainCodeSchema.get)
router.get('/admin/train-code', trainCodeSchema.getAdmin)
router.get('/train-code/:id', trainCodeSchema.getId)
router.put('/train-code/:id', trainCodeSchema.edit)
router.delete('/train-code/:id', trainCodeSchema.delete)

// Wagons
router.post('/wagons', wagonsSchema.add)
router.get('/wagons', wagonsSchema.get)
router.get('/wagons/:id', wagonsSchema.getId)
router.put('/wagons/:id', wagonsSchema.edit)
router.delete('/wagons/:id', wagonsSchema.delete)

// Ticket
router.post('/ticket', ticketSchema.add)
router.get('/ticket', ticketSchema.get)
router.get('/admin/ticket', ticketSchema.getAdmin)
router.get('/ticket/:id', ticketSchema.getId)
router.put('/ticket/:id', ticketSchema.edit)
router.delete('/ticket/:id', ticketSchema.delete)

// Return Ticket
router.post('/return-ticket', returnTicketSchema.add)
router.get('/return-ticket', returnTicketSchema.get)
router.get('/return-tickets', returnTicketSchema.gets)
router.put('/return-ticket/:id', returnTicketSchema.edit)
router.put('/accept-return-ticket/:id', returnTicketSchema.acceptReturnTicket)

// Mail
router.get('/send-mail', mailSchema.send)

// Exports
module.exports = router
