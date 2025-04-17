export type User = {
    id:string
    name:string
    email:string
    gender: UserGender
    profileImage:string
    about:string
    rating:number
}

export type UserGender = "male" | "female"
export type UserRole = "client" | "tasker"