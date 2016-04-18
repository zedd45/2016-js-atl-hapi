'use strict';

const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Purdy = require('purdy');
const Server = require('../lib/server');


const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;


describe('static', () => {

    it('serves static files', (done) => {

        Server.inject('/static/test.txt', (res) => {

            // Purdy is a library for formatting & coloring output, making it easier to read on the terminal
            // Purdy(res.headers);
            expect(res.result).to.be.a.string().and.to.match(/hello/i);
            expect(res.headers['content-type']).to.match(/text/i);

            done();
        });
    });
});


// this test is not ideal; should use `nock` so we don't have to rely on network request
// then again, this is a proxy, so this counts as an integration test, I suppose
describe('fixtures', () => {

    it('serves static files', (done) => {

        Server.inject('/api/fixtures/placeholder/photos', (res) => {

            const result = JSON.parse(res.result);

            Purdy(result[0]);
            expect(result).to.be.an.array().and.not.be.empty();
            expect(result[0]).to.contain(['title', 'url']);

            done();
        });
    });
});
