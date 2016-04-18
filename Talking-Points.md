# Hapi JS - Services

## Server Composition 

1. Plugins
    - Proxy
    - Static
    - Views (JS templates)
    - Community (`Blipp`, `Good`, `Hoek` etc)
2. Testing
    - `Lab` has a lot built in: coverage, linter (`.eslint`), random order
    - `Code` handles assertions
3. [`Server.inject`](http://hapijs.com/api#serverinjectoptions-callback) allows us to execute handlers without making a socket connection. 
        
> Injection is useful for testing purposes as well as for invoking routing logic internally without the overhead or limitations of the network stack.
