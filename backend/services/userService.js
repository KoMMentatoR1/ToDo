import UserModel from "../models/userModel.js"
import bcrypt from "bcrypt"
import {v4 as uuidv4} from "uuid"
import mailService from "./mailService.js"
import tokenService from "./tokenService.js"
import UserDto from "../dtos/user-dto.js"
import ApiError from "../exceptions/api-error.js"
import userTokenModel from "../models/userTokenModel.js"


class userService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({where:{email}})
        if (candidate){
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже сущестует`)
        } 

        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuidv4()

        const user = await UserModel.create({email, password: hashPassword, activationLink})
        await mailService.sendActivationMail(email, `${process.env.API_URL}user/activate/${activationLink}`);

        const userDto = new UserDto(user); 
        const tokens = tokenService.generateToken({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async activate(activationLink){
        const user = await UserModel.findOne({where: {activationLink: activationLink}})
        if (!user){
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже сущестует`)
        }
        user.isActivated = true
        await user.save()
    }

    async login(email, password) {
        const user = await UserModel.findOne({where: {email}})
        if (!user) {
            throw ApiError.BadRequest("Неверные данные")
        }
        const isPassEquils = await bcrypt.compare(password, user.password)
        if (!isPassEquils){
            throw ApiError.BadRequest("Неверные данные")
        }
        const userDto = new UserDto(user)
        const tokens = tokenService.generateToken({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token;
    }

    async refresh(refreshToken){
        if (!refreshToken) {
            throw ApiError.UnAuthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDB = await userTokenModel.findOne({where: {refreshToken}})
        if(!userData || !tokenFromDB) {
            throw ApiError.UnAuthorizedError()
        }

        const user = await UserModel.findByPk(userData.id)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateToken({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }
}

export default new userService