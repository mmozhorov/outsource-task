import { Worker } from "worker_threads";
import path from 'path';

import { serviceContainer } from '../config/inversify.config';
import { DB, DBInterface } from "../types/db.types";
import { AnimalsService } from "./animals.service";

export const callHardCalcuationForAnimal = ( animalId: string ) => {
    const AnimalsServiceInstance = new AnimalsService( serviceContainer.get<DBInterface>(DB) );
    const worker = new Worker( path.resolve( __dirname, "../utils/calculation.worker.js" ), { workerData: { animalId }});

    worker.once("message", async ({ animalId, status}) => {
        console.log( `Animal: ${ animalId } will be updated with status: ${ status }` );

        AnimalsServiceInstance.updateAnimalStatus( animalId, status );

        console.log( `Animal: ${ animalId } was updated successfully` );
    });

    worker.on( "error", error => {
        throw new Error( error.message );
    });

    worker.on( "exit" , exitCode => {
        console.log(exitCode);
    })
};