import * as Joi from "joi";

export const createGroupModel = Joi.object().keys({
    name: Joi.string().trim().required(),
});

export const updateGroupModel = Joi.object().keys({
    name: Joi.string().trim().required(),
});



export const jwtValidator = Joi.object({ 'authorization': Joi.string().required() }).unknown();