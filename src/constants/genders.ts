export enum ClientType {
    Men = 'male',
    Women = 'female',
    Boys = 'malechild',
    Girls = 'femalechild',
}

export const allGenders = [
    ClientType.Men,
    ClientType.Women,
    ClientType.Boys,
    ClientType.Girls,
] as const
