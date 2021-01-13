#!/bin/bash
if [ -d "template" ]
then
    rm template/*
else
    mkdir template
fi
if [ -d "crash" ]
then
    rm crash/*
else
    mkdir crash
fi
if [ -d "timeout" ]
then
    rm timeout/*
else
    mkdir timeout
fi
ITER=0
while :
    do
        ((ITER++))
        cd template 
        python3 ../domato/generator.py $ITER.html
        cd ..
        cd playwright_domato 
        node main.js $ITER.html
        cd ..
    done
