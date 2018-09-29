import * as Joi from "joi";

export const createMessageModel = Joi.object().keys({
    userId: Joi.string().trim().required(),
    channelId: Joi.string().trim().required(),
});

export const updateMessageModel = Joi.object().keys({
    userId: Joi.string().trim().required(),
    channelId: Joi.string().trim().required(),
});



export const jwtValidator = Joi.object({ 'authorization': Joi.string().required() }).unknown();