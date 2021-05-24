#!/bin/bash

mkdir -p log

if screen -list homarusbot | grep -q "No Sockets"; then
    screen -d -m -S homarusbot bash -c "VERBOSITY=0 npm run-script run 2>&1 | tee log/homarusbot.log"
else
    echo "HomarusBot is already running, stop it first."
fi
