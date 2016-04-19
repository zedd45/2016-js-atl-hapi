# 2016-js-atl-hapi
Lightning Talk for JS Atlanta - Hapi JS and Services 

## Install 

```
npm i
```

## Boot it!

```
npm start
# OR
npm run start:dev 
# to reload the server on changes
```

then, navigate to `localhost:3000`. 

## Tests

```
npm test
```

## Lint

```
npm run lint
```


# Under the hood

* [`blipp`](https://github.com/danielb2/blipp) - lists the routes (routing table) with optional `description` config property next to the route
* [`config`](https://github.com/lorenwest/node-config) - handles loading different configurations based on the `NODE_ENV`  (`hapi` devs tend to use [`confidence`](https://github.com/hapijs/confidence) for this; I prefer `config` for various reasons)
* [`glue`](https://github.com/hapijs/glue) - "sticks" plugins together, with the provided configuration.  With `config` this is doubly powerful, as you can have a different setup for each `NODE_ENV`
* [`good`](https://github.com/hapijs/good) - handles all the log(s), with various adapters for `console`, file, or even network requests (to `POST` your logs elsewhere, for instance)
* [`h2o2`](https://github.com/hapijs/h2o2) - creates a proxy handler to, well, proxy requests to another upstream source. Handles simple 1:1 url mapping as well as methods to mutate the outbound request, as well as the inbound response.
* [`inert`](https://github.com/hapijs/inert) - creates file & directory handlers for serving static content. (I almost always use directory at this point; it has better built in security.)
* [`joi`](https://github.com/hapijs/joi) - validation library for JavaScript.  Like `React`'s `PropTypes`, except more... robust!
* [`lab`](https://github.com/hapijs/lab) - testing, built for node with `hapi` specifically in mind.  Forked from `mocha`, but with built in coverage, reporters, linting, and other conveniences 
* [`wreck`](https://github.com/hapijs/wreck) - `http` library.  Think `curl` in node.



# Additional Reading

## Hapi Edge 

These guys wrote the book (literally).  Some of my colleagues from Walmart show how to set up [controllers](https://github.com/hapijs-edge/hapi-plugins.com/tree/master/lib/controllers) and [models](https://github.com/hapijs-edge/hapi-plugins.com/tree/master/lib/models) in order to be more organized. Because organized code is hapi code. 


## Resources

Speaking of that book, there are links on the [resources](http://hapijs.com/resources) page of Hapijs.com that include working [boilerplates](http://hapijs.com/resources#Boilerplates) and [tutorials](http://hapijs.com/resources#Tutorials) to help you get started quickly!  
