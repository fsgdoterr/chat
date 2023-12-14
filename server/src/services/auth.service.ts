import { UserDTO } from "../dtos/user.dto";
import { IUser } from "../interfaces/user.interfaces";
import tokenModel from "../models/token.model";
import userModel from "../models/user.model";
import { ApiError } from "../utils/api.error";
import bcrypt from 'bcrypt';
import tokenService from "./token.service";

class AuthService {

    async signin(
        email: string, 
        password: string, 
    ) {
        const candidate = await userModel.findOne({email});
        if(!candidate)
            throw ApiError.badRequest('No user with this email and password pair was found');

        const isPasswordEqual = await bcrypt.compare(password, candidate.password);

        if(!isPasswordEqual)
            throw ApiError.badRequest('No user with this email and password pair was found');

        const userDto = new UserDTO(candidate);
        return userDto.getDto();
    }
    async signup(
        email: string, 
        password: string, 
        name: string
    ): Promise<IUser> {
        const candidate = await userModel.findOne({email});
        if(candidate)
            throw ApiError.badRequest('A user with this email address is already registered');

        const hashPassword = await bcrypt.hash(password, 5);

        const newUser = await userModel.create({
            email,
            password: hashPassword,
            name,
        });

        const userDto = new UserDTO(newUser);
        return userDto.getDto();
    }
    async refresh(refreshToken: string) {

        const token = await tokenModel.findOne({refreshToken});
        if(!token)
            throw ApiError.unauthorized();

        const userFromToken = tokenService.verifyRefresh(refreshToken);
        if(!userFromToken)
            throw ApiError.unauthorized();

        const user = await userModel.findById(userFromToken.id);

        const userDto = new UserDTO(user!);
        return userDto.getDto();
    }

}

export default new AuthService();