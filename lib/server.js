'use strict';

const Glue = require('glue');

const internals = {
    manifest: require('config')
};


Glue.compose(internals.manifest, { relativeTo: __dirname }, (err, server) => {

    if (err) {
        throw err;
    }
    server.start(() => {

        console.log(`server started at: ${server.info.uri}`);
    });
});
