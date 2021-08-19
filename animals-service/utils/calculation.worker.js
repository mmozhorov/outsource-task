const { parentPort, workerData } = require("worker_threads");

(function doSomeMassiveCalculation( animalId = '' ) {
    setTimeout( () => {
        if( parentPort )
            parentPort.postMessage({ animalId, status: "CREATED" });
    }, 5000 );
}( workerData.animalId));