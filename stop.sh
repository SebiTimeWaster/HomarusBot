#!/bin/bash

if ! screen -list homarusbot | grep -q "No Sockets"; then
    screen -S homarusbot -p 0 -X stuff "^C"
else
    echo "HomarusBot is not running."
fi
