# kubelog
Kubelog is a streaming logs viewer. Just pipe your logs into the `kubelog-server` and they will show up in `kubelog-webapp`.

## Getting Started
1. Run the containers for `server` and `webapp`.
```
docker-compose up --build
```
2. Pipe your streaming logs into the newly created `kubelog-server` container. The logs could come from any source. For example, this command streams the current date every second.
```
(while true; do echo $(date); sleep 1; done;) | docker attach kubelog-server
```
3. Open up `localhost:5000` to see the logs streaming in the `webapp`.

## Features Roadmap
See [projects page](https://github.com/ahsan/kubelog/projects/1).