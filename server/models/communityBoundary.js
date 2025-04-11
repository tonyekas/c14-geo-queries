import { connectDb } from "../db.js";

const mongoose = await connectDb();

// Schema 
const communityBoundarySchema = new mongoose.Schema({
    comm_code: String,
    name: String,
})

// Models
const CommunityBoundary = mongoose.model('communityBoundary', communityBoundarySchema, 'communityBoundary')

// Functions to expose to the outside world!
export async function createCommunityBoundary(comm_code, name) {
    const newCommunityBoundary = await CommunityBoundary.create({
        comm_code: comm_code,
        name: name
    })    
    return newCommunityBoundary
}

export async function findAllCommunityBoundaries() {
    const communityBoundary = await CommunityBoundary.find()
    return communityBoundary
}

export async function findCommunityBoundaryById(id) {
    const communityBoundary = await CommunityBoundary.findById(id)
    return communityBoundary
}

export async function findCommunityBoundaryByName(comm_code) {
    const communityBoundary = await CommunityBoundary.findOne({ comm_code: comm_code })
    return communityBoundary
}

// In 1791, the metre was defined as 1 ten millionth the distance
// between the north pole and the equator travelling through Paris. 
// 234 years later, Tony used this formula in a sofware development
// class focused on geographic queries.
const METERS_PER_DEGREE = 10000000/90 

export async function findCommunityBoundaryNear(lat, lon, distanceM) {
    return []
}
