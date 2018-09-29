import * as Joi from "joi";

export const createUserChannelModel = Joi.object().keys({
    userId: Joi.string().trim().required(),
    channelId: Joi.string().trim().required(),
});

export const updateUserChannelModel = Joi.object().keys({
    userId: Joi.string().trim().required(),
    channelId: Joi.string().trim().required(),
});



export const jwtValidator = Joi.object({ 'authorization': Joi.string().required() }).unknown();