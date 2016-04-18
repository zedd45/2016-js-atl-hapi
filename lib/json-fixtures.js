'use strict';

const Joi = require('joi');
const Url = require('url');
const Wreck = require('wreck');


const internals = {
    schema: Joi.object({
        timeout: Joi.number().default(5000)
    })
};



exports.register = function (server, options, next) {

    options = Joi.attempt(options, internals.schema, 'Plugin options do not match the schema');


    server.route({
        method: 'GET',
        path: '/api/fixtures/placeholder/photos',
        config: {
            description: 'proxies requests to JSON placeholder',
            tags: ['fixtures', 'proxy', 'json-placeholder'],
            handler: {
                proxy: {
                    uri: 'http://jsonplaceholder.typicode.com/photos'
                }
            }
            /*
            handler: (request, reply) => {

                return reply.proxy({
                    host: 'jsonplaceholder.typicode.com',
                    port: 80,
                    protocol: 'http',
                    timeout: options.timeout
                });
            }
            */
        }
    });


    server.route({
        method: 'GET',
        path: '/api/github/repos',
        config: {
            description: 'query github repos',
            tags: ['proxy', 'github'],
            validate: {
                params: Joi.object({
                    // .required() here is always failing, even when a valid string is provided for `q`?!?!
                    q: Joi.string().min(2).description('search keywords, as well as any qualifiers').example('https://developer.github.com/v3/search/#search-repositories'),
                    sort: Joi.string().optional().allow(['','stars', 'forks', 'updated']).default(''),
                    order: Joi.string().optional().allow(['asc', 'desc']).default('desc')
                }).with('order', 'sort')
            }
        },
        handler: function (request, reply) {

            const uri = Url.format({
                protocol: 'https',
                hostname: 'api.github.com',
                pathname: 'search/repositories',
                query:{
                    q: encodeURIComponent(request.query.q),
                    sort: encodeURIComponent(request.query.sort),
                    order: encodeURIComponent(request.query.order)
                }
            });

            const wreckOptions = {
                timeout: 1500,
                json: 'force',
                headers: {
                    // required for Github; https://developer.github.com/v3/#user-agent-required
                    'User-Agent': 'GITHUB_USERNAME'
                }
            };


            Wreck.get(uri, wreckOptions, (err, response, payload) => {

                if (err) {
                    const msg = 'problem reading from Github:';
                    const badGateway = Boom.badGateway(msg, { err: err });
                    console.error(msg, err);
                    return reply(badGateway);
                }

                if (response.statusCode >= 400) {
                    const msg = 'Github returned an HTTP status code corresponding to an error:';
                    const httpError = Boom.create(response.statusCode, msg, { payload: payload });
                    console.error(msg);
                    return reply(httpError);
                }

                return reply(payload).code(response.statusCode);
            });
        }
    });


    return next();
};


exports.register.attributes = {
    name: 'json-fixtures',
    version: '0.1.0',
    dependencies: ['h2o2']
};
