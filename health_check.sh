#!/bin/bash

while true; do date && curl -m 5 http://localhost:3000/healthcheck && echo; sleep 1; done