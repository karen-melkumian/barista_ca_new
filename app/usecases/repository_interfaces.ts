export interface CRUD<T, U> {
    list: (limit: number, page: number, order: string | null) => Promise<Array<T> | null>,
    create: (resource: T) => Promise<string>,
    //update: (resource: T) => Promise<T | null>,
    readById: (resourceId: string) => Promise<T | null>,
    readByFilds: (resource: U) => Promise<T | null>,
    deleteById: (resourceId: string) => Promise<void>,
    patch: (resource: T) => Promise<T | null>,
}
