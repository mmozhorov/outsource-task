export interface DBInterface {
    connect: any,
    query: any,
    disconnect: any
}

export const DB = Symbol.for('DB');