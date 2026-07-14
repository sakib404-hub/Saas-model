import type { UserRole } from "../../../prisma/generated/prisma/enums";

export interface IRegisterPayLoad {
    name : string;
    email : string;
    password : string;
    role ? : UserRole
}