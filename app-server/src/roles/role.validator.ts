import * as Joi from "joi";

export const createRoleModel = Joi.object().keys({
    name: Joi.string().trim().required(),
});

export const updateRoleModel = Joi.object().keys({
    name: Joi.string().trim().required(),
});



export const jwtValidator = Joi.object({ 'authorization': Joi.string().required() }).unknown();