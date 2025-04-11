import { disconnectDb } from "../db.js"
import { createWaterPipe, findWaterPipeByWaterServiceAddress } from "../models/waterPipe.js";

const response = await fetch('https://data.calgary.ca/resource/ta76-7bfx.json?$limit=500')

if (!response.ok) {
    console.log('Problem getting data from the city', response)
    process.exit()
}

const buildingTypes = await response.json();
for (const pipe of buildingTypes) {
    const { building_type, water_service_address } = pipe;

    const existingBuildingType = await findWaterPipeByWaterServiceAddress(water_service_address);
    if (existingBuildingType) {
        console.log('Updating', buildiwater_service_addressng_type);
        existingBuildingType.water_service_address = water_service_address;
        existingBuildingType.building_type = building_type;
        await existingBuildingType.save();
    } else {
        console.log('Creating', water_service_address, 'of', building_type);
        await createWaterPipe(building_type, water_service_address);
    }
}
await disconnectDb()