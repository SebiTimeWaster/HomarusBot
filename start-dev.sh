#!/bin/bash

if screen -list homarusbot | grep -q "No Sockets"; then
    VERBOSITY=2 npm run-script run-dev
else
    echo "HomarusBot is already running, stop it first."
fi
