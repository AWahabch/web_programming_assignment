import * as Joi from "joi";

export const createUserActivityModel = Joi.object().keys({
    userId: Joi.string().trim().required(),
    channelId: Joi.string().trim().required(),
    action: Joi.number().required(),
});

export const updateUserActivityModel = Joi.object().keys({
    userId: Joi.string().trim().required(),
    channelId: Joi.string().trim().required(),
    action: Joi.number().required(),
});



export const jwtValidator = Joi.object({ 'authorization': Joi.string().required() }).unknown();