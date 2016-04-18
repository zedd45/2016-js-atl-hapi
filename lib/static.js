'use strict';

const Joi = require('joi');


const internals = {
    schema: Joi.object({
        publicPath: Joi.string().required()
    })
};


exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/static/{filePath*}',
        config: {
            description: 'responds with a file from the filesystem, with appropriate MIME type',
            tags: ['static'],
            handler: {
                directory: {
                    path: [__dirname, '..', options.publicPath].join('/'),
                    listing: process.env.NODE_ENV !== 'production'
                }
            }
        }
    });


    next();
};


exports.register.attributes = {
    name: 'static',
    version: '0.1.0',
    dependencies: ['inert']
};
