import * as Joi from "joi";

export const createChannelModel = Joi.object().keys({
    name: Joi.string().trim().required(),
    groupId: Joi.string().trim().required(),
});

export const updateChannelModel = Joi.object().keys({
    name: Joi.string().trim().required(),
    groupId: Joi.string().trim().required(),
});



export const jwtValidator = Joi.object({ 'authorization': Joi.string().required() }).unknown();