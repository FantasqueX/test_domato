#!/bin/bash
mkdir template
mkdir crash
ITER=0
while :
    do
        ((ITER++))
        cd template && python3 ../domato/generator.py $ITER.html && cd ..
        cd playwright_domato && node main.js ../template/$ITER.html && cd ..
    done
