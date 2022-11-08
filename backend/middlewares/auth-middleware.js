import ApiError from "../exceptions/api-error.js";
import tokenService from "../services/tokenService.js";

export function authMiddleware(req, res, next) {
    try{
        const autorizationHeaders = req.headers.authorization
        if (!autorizationHeaders) {
            return next(ApiError.UnAuthorizedError())
        }

        const accessToken = autorizationHeaders.split(" ")[1]
        if(!accessToken){
            return next(ApiError.UnAuthorizedError())
        }

        
        const userData = tokenService.validateAccessToken(accessToken)
        if(!userData){
            return next(ApiError.UnAuthorizedError())
        }
        
        req.user = userData
        next();
    } catch(e) {
        return next(ApiError.UnAuthorizedError())
    }
}