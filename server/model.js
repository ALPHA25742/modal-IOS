import mongoose from 'mongoose'
const Schema = mongoose.Schema

const pdfSchema = Schema({
    
})

const model = mongoose.model('pdf',pdfSchema)
module.exports = model