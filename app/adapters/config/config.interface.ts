export interface IConfigApp {
    serverPort: number,
    jwtSecret: string,
    environment: string,
    mongodbConnect: string,
}
