export enum Gender {
    Male = 'male',
    Female = 'female',
}

export enum ClientType {
    Men = 'men',
    Women = 'women',
    Boys = 'boy',
    Girls = 'girls',
}

export const allGenders = [
    ClientType.Men,
    ClientType.Women,
    ClientType.Boys,
    ClientType.Girls,
] as const
