#!/usr/bin/env python3
from livereload import Server, shell
import os, os.path, glob
from subprocess import run
##
##  To install the dependencies for this script, run:
## 
##      pip3 install transcrypt livereload
##
##  Then start the script and load http://localhost:8000/
##

WATCH = [
    ( 'scripts/*.py', 'scripts/*.py' ),
]

def recompile(to_compile):
    def inner():
        for fn in glob.glob(to_compile):
            run('transcrypt --map --build --nomin --esv 6 {}'.format(fn), shell=True, check=True)
    return inner
    

# initial start
for watch, to_compile in WATCH:
    recompile(to_compile)()

# watch .py files
server = Server()
for watch, to_compile in WATCH:
    server.watch(watch, recompile(to_compile))
server.serve(root='.', port=8000)