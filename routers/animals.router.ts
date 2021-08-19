import express from 'express';

import { serviceContainer } from '../config/inversify.config';

import { DB, DBInterface } from "../types/db.types";

import { AnimalsService } from "../services/animals.service";
import { routerErrorLog } from "../utils/logger.helpers";
import { Animal } from '../types/animals.types';

const router = express.Router();

const AnimalsServiceInstance = new AnimalsService( serviceContainer.get<DBInterface>(DB) );

router.get('/', async ( req: express.Request, res: express.Response, next ) => {
    try {
        const animals = await AnimalsServiceInstance.getAllAnimals();

        if ( animals )
            return res.status(200).json({ animals });

        return next({
            statusCode: 400,
                message: 'Bad request!'
        });
    }
    catch( error ){
        next( routerErrorLog('GET /animals', req.query, error ) );
    }
});

router.post('/', async ( req: express.Request, res: express.Response, next ) => {
    try{
        const { kind, positionX, positionY } = req.body;
        const animal = await AnimalsServiceInstance.createAnimal( kind, positionX, positionY );

        if( animal )
            return res.status(200).json({ animal })

        return next({
            statusCode: 400,
            message: 'Animal is already exists!'
        });
    }
    catch( error ){
        next( routerErrorLog('POST /animals', req.body, error ) );
    }
});

export default router;