import { connectDb } from "../db.js";

const mongoose = await connectDb();

const parkingZoneSchema = new mongoose.Schema({
    addressDesc: String
})

//Model
const ParkingZone = mongoose.model('parkingZone', parkingZoneSchema, parkingZone)

//export default function createParkingZones
export async function createParkingZones(addressDesc) {
    const newParkingZone = await ParkingZone.create({
        addressDesc
    })    
    return newParkingZone
}

export async function findAllParkingZone() {
    const parkingZone = await ParkingZone.find()
    return parkingZone
}

export async function findParkingZoneById(id) {
    const parkingZone = await ParkingZone.findById(id)
    return parkingZone
}

export async function findParkingZoneByAddressDesc(address_desc) {
    const parkingZone = await ParkingZone.findOne({ addressDesc:address_desc })
    return parkingZone
}