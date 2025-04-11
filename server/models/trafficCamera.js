import { connectDb } from "../db.js";

const mongoose = await connectDb();

// Schema 
const cameralocationSchema = new mongoose.Schema({
    Camera_Name: String,
    Camera_URL: String,
    Quadrant: String,   
    Camera_Location: String,
    Point: String,
})

// cameralocationSchema.index({ location: '2dsphere' })

// Models
const CameraLocation = mongoose.model('cameralocation', cameralocationSchema, 'cameralocations')

// Functions to expose to the outside world!
export async function createCameraLocation(Camera_Name, Camera_URL, Quadrant, Camera_Location, Point) {
    const newCameraLocation = await CameraLocation.create({
        Camera_Name,
        Camera_URL,
        Quadrant,   
        Camera_Location,
        Point
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

