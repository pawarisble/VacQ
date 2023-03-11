const mongoose = require("mongoose");

const HospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    address: {
        type: String,
        require: [true, 'Please add an address']
    },
    district: {
        type: String,
        require: [true, 'Please add a district']
    },
    province: {
        type: String,
        require: [true, 'Please add a province']
    },
    postalCode: {
        type: String,
        require: [true, 'Please add a postalcode'],
        maxlength: [5, 'Postal Code can not be more than 5 digits']
    },
    tel: {
        type: String
    },
    region: {
        type: String,
        require: [true, 'Please add a region']
    }
}, {
    toJSON: { virtuals: true },
    toObject: {virtuals:true}
} );

// Reverse populate 
HospitalSchema.virtual('appointments', {
    ref: 'Appointment',
    localField: "_id",
    foreignField: "hospital",
    justOne:false
})

// Cascade delete
HospitalSchema.pre('remove', async function (next) {
    console.log(`Appointments being removed from hospital ${this._id}`);
    await this.model('Appointment').deleteMany({ hospital: this._id });
    next();
});

module.exports = mongoose.model("Hospital", HospitalSchema);