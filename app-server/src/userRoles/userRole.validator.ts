import * as Joi from "joi";

export const createUserRoleModel = Joi.object().keys({
    userId: Joi.string().trim().required(),
    roleId: Joi.string().trim().required(),
});

export const updateUserRoleModel = Joi.object().keys({
    userId: Joi.string().trim().required(),
    roleId: Joi.string().trim().required(),
});



export const jwtValidator = Joi.object({ 'authorization': Joi.string().required() }).unknown();