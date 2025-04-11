import { connectDb } from "../db.js";

const mongoose = await connectDb();

// Schema
const cameralocationSchema = new mongoose.Schema({
  cameraUrl: String,
  cameraName: String,
  quadrant: String,
  cameraLocation: String,
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

cameralocationSchema.index({ location: "2dsphere" });

// Models
const CameraLocation = mongoose.model(
  "cameralocation",
  cameralocationSchema,
  "cameralocations"
);

// Functions to expose to the outside world!
export async function createCameraLocation(
  cameraName,
  cameraUrl,
  quadrant,
  cameraLocation,
  point
) {
  const newCameraLocation = await CameraLocation.create({
    cameraName,
    cameraUrl,
    quadrant,
    cameraLocation,
    point,
  });
  return newCameraLocation;
}

export async function findAllCameraLocations() {
  const locations = await CameraLocation.find();
  return locations;
}

export async function findCameraLocationById(id) {
  console.log("findCameraLocationById", id);
  const location = await CameraLocation.findById(
    new mongoose.Types.ObjectId(id)
  );
  return location;
}

export async function findCameraLocationByName(cameraNameAsset) {
  const locations = await CameraLocation.findOne({
    cameraName: cameraNameAsset,
  });
  return locations;
}

// In 1791, the metre was defined as 1 ten millionth the distance
// between the north pole and the equator travelling through Paris.
// 234 years later, Tony used this formula in a sofware development
// class focused on geographic queries.
const METERS_PER_DEGREE = 10000000 / 90;

export async function findCameraLocationNear(lat, lon, distanceM) {
  const locations = await CameraLocation.find({
    point: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [lon, lat],
        },
        $maxDistance: distanceM,
      },
    },
  });
  return locations;
}
