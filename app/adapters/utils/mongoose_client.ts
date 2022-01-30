import mongoose from 'mongoose';

export type DbClient = typeof import('mongoose');

export function getDatabaseClient(mongodbConnect: string) {
    return new Promise<DbClient>((resolve, reject) => {
        const options = {
            autoIndex: false,
            useNewUrlParser: true,
            useUnifiedTopology: true
        };

        mongoose.connect(mongodbConnect, options);
        const db = mongoose.connection;
        db.on("error", (e: Error) => {
            console.error("Db conenction error:", e);
            reject(e);
        });
        db.once("open", () => {
            console.log("Db conenction success:", mongodbConnect);
            resolve(mongoose);
        });
    });
}
