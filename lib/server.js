'use strict';

const Glue = require('glue');

const internals = {
    manifest: require('config')
};


Glue.compose(internals.manifest, { relativeTo: __dirname }, (err, server) => {

    if (err) {
        throw err;
    }
    if (!module.parent) {
        server.start(() => {

            console.log(`server started at: ${server.info.uri}`);
        });
    }
    else {
        module.exports = server;
    }
});
