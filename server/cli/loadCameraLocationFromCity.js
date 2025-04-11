import { disconnectDb } from "../db.js"
import { createCameraLocation, findCameraLocationByName } from "../models/trafficCamera.js"

const response = await fetch('https://data.calgary.ca/resource/k7p9-kppz.json?$limit=500')
if (!response.ok) {
    console.log('Problem getting data from the city', response)
    process.exit()
}

const camera = await response.json()
for (const piece of camera) {
    const {description, camera_url, quadrant} = piece

    const existingcamera = await findCameraLocationByName(camera_url.description)
    if (existingcamera) {
        console.log('Updating',camera_url.description)
        existingcamera.cameraUrl = camera_url.url,
        existingcamera.cameraName = camera_url.description,
        existingcamera.quadrant = quadrant,
        await existingcamera.save()
    }
    else {
        console.log('Creating', camera_url.description, 'of', camera_url, 'of', description, 'of', quadrant)
        await createCameraLocation(camera_url.url, camera_url.description, quadrant)
    }
}

await disconnectDb()
