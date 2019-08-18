# kubelog
Kubelog is a streaming logs viewer. Just pipe your logs into the `kubelog-server` and they will show up in `kubelog-webapp`.

It works great for when you want to see logs in real-time coming from your GKE cluster. `kubectl logs` piped into Kubelog is real-time, as opposed to Stackdriver which introduces a small delay.

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
