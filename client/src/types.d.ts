export interface Company {
    name: string
    catchPhrase: string
    bs: string
}
export interface Geo {
    lat: string
    lng: string
}
export interface Address {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: Geo
}
export interface User {
    id: string
    name: string
    username: string
    email: string
    address: Address
    phone: string
    website: string
    company: Company
}
export interface Todo {
    id: string
    title: string
    completed: boolean
    user: User
}