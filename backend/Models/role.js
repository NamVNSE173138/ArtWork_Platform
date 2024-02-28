const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoleSchema = new Schema({
    roleName: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    }
}, {
    timestamps: true
})

const Role = mongoose.model('Role', RoleSchema)

module.exports = Role