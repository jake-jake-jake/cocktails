#!/bin/bash

for p in `cat creds`; 
do
    export $p
done
