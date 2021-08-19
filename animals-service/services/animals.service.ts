import { v4 as uuidv4 } from 'uuid';
import { injectable } from 'inversify';
import 'reflect-metadata';

import { DBInterface } from '../types/db.types';
import { Animal } from '../types/animals.types';
import { serviceLogger as log } from '../utils/logger.helpers';
import { callHardCalcuationForAnimal } from './calculation.service';

enum ANIMAL_STATUSES {
    PENDING = 'PENDING',
    CREATED = 'CREATED'
}

@injectable()
class AnimalsService{
    private readonly DB: DBInterface;
    private readonly table = `animals`;

    constructor( DB: DBInterface ) {
        this.DB = DB;
    }

    @log
    public async getAllAnimals( ): Promise<Animal[]> {
        const { rows } = await this.DB.query(
            `SELECT * FROM ${ this.table }`
        );

        return rows;
    }

    @log
    public async createAnimal( kind: string, positionX: number, positionY: number ) {
        const animalId: string = uuidv4();

        const { rows: [ animal ] } = await this.DB.query(
            `INSERT INTO ${ this.table }
                ( id, kind, positionX, positionY, status )
                    VALUES ( $1, $2, $3, $4, $5 ) RETURNING *`, 
                    [ animalId, kind, positionX, positionY, ANIMAL_STATUSES.PENDING ]
        );

        callHardCalcuationForAnimal( animalId );

        return animal;
    }

    @log
    public async updateAnimalStatus( animalId: string, status: string ): Promise<void>{
        await this.DB.query(
            `UPDATE ${ this.table }
                SET status = $1
                    WHERE id = $2`, 
                    [ status, animalId ]
        );
    }
}

export { AnimalsService };