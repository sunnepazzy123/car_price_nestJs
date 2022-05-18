import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { promisify } from "util";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { UsersService } from "./users.service";


const scrypt = promisify(_scrypt)


@Injectable()
export class AuthService {

    constructor(private userService: UsersService) {}

    async signUp(email: string, password: string) {
        const users = await this.userService.find(email)
        if(users.length) {
            throw new BadRequestException("User already exist")
        }
        //generate a salt
        const salt = randomBytes(8).toString('hex')

        //generate a hash
        const hash = (await scrypt(password, salt, 32)) as Buffer

        const hashSaltedPassword = salt + '.' + hash.toString('hex') 
        const user = await this.userService.create(email, hashSaltedPassword)
        return user
    }

    async signIn(email: string, password: string) {
        const [user] = await this.userService.find(email)
        if(!user) {
            throw new NotFoundException("User not found")
        }

        const [salt, storedHash] = user.password.split('.')
        //generate a hash
        const hash = (await scrypt(password, salt, 32)) as Buffer
    
        if(hash.toString('hex') !== storedHash) {
            throw new BadRequestException("Invalid credential")
        }
        
        return user
    }
}