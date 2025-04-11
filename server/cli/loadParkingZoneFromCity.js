import { disconnectDb } from "../db.js"
import { createParkingZone, findParkingZoneByAddressDesc } from "../models/parkingZone.js"


const response = await fetch('https://data.calgary.ca/resource/45az-7kh9.json?$limit=500')
if (!response.ok) {
    console.log('Problem getting data from the city', response)
    process.exit()
}

const zone = await response.json()
for (const piece of zone) {
    const {address_desc,the_geom} = piece

    const existingZone = await findParkingZoneByAddressDesc(address_desc)
    if (existingZone) {
        console.log('Finding',address_desc)
        existingZone.address_description = address_desc
        existingZone.line = the_geom
        await existingZone.save()
    }
    else {
        console.log('Creating', address_desc, 'of' , the_geom)
        await createParkingZone(address_desc,the_geom)
    }
}

await disconnectDb()