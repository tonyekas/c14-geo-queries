import { connectDb } from "../db.js";

const mongoose = await connectDb();

// Schema 
const cameralocationSchema = new mongoose.Schema({
    cameraName: String,
    cameraUrl: String,
    quadrant: String,   
    cameraLocation: String,
})

// cameralocationSchema.index({ location: '2dsphere' })

// Models
const CameraLocation = mongoose.model('cameralocation', cameralocationSchema, 'cameralocations')

// Functions to expose to the outside world!
export async function createCameraLocation(cameraName, cameraUrl, quadrant, cameraLocation ) {
    const newCameraLocation = await CameraLocation.create({
        cameraName,
        cameraUrl,
        quadrant,   
        cameraLocation,
        
    })
    return newCameraLocation
}

export async function findAllCameraLocations() {
    const locations = await CameraLocation.find()
    return locations
}

export async function findCameraLocationById(id) {
    console.log("findCameraLocationById", id)
    const location = await CameraLocation.findById(new mongoose.Types.ObjectId(id))
    return location
}

