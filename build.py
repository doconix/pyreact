#!/usr/bin/env python3
import os, shutil, glob, sys, subprocess, re
from os.path import join as j


# update version numbers in pyreact.py and pyreact-js.js
VERSION = "1.0.0"

# to build this, you need a `js-npm` folder where you've done the following:
#   npm install -g browserify
#   npm install -g uglify
#   npm install jsx-transform
#   pyreact-js.js should be in the directory
#   package.json should have:  "main": "PyReact.js",

SROOT = 'src'
SSTYLES = 'styles'
SSCRIPTS = 'scripts'
SSCRIPTS_PY = j('scripts', '__javascript__')
SSCRIPTS_EXT = 'scripts-ext'

DROOT = 'dist'
DSTYLES = 'styles'
DSCRIPTS = 'scripts'


#########################
###  Main program

def main():

    # dist folder
    print('Initialize {} folder'.format(DROOT))
    if os.path.exists(DROOT):
        shutil.rmtree(DROOT)
    os.mkdir(DROOT)
    os.mkdir(j(DROOT, DSTYLES))
    os.mkdir(j(DROOT, DSCRIPTS))

    # html files
    log('Copy HTML')
    for src in glob.glob(j(SROOT, '*.html')):
        _, dest = os.path.split(src)
        with open(src, 'r') as fin:
            with open(j(DROOT, dest), 'w') as fout:
                for line in fin:
                    line = re.sub(j(SSCRIPTS, '([^/]+)\.js'), j(DSCRIPTS, '\\1.min.js'), line)
                    line = re.sub(j(SSCRIPTS_EXT, '([^/]+)\.js'), j(DSCRIPTS, '\\1.min.js'), line)
                    line = re.sub(j(SSCRIPTS_PY, '([^/]+)\.js'), j(DSCRIPTS, '\\1.min.js'), line)
                    fout.write(line)
    
    # css files
    log('Copy CSS')
    for src in glob.glob(j(SROOT, SSTYLES, '*.css')):
        shutil.copy(src, j(DROOT, DSTYLES))

    # js files
    log('Copy JS')
    for src in glob.glob(j(SROOT, SSCRIPTS, '*.js')):
        shutil.copy(src, j(DROOT, DSCRIPTS))
    for src in glob.glob(j(SROOT, SSCRIPTS_EXT, '*.min.js')):
        shutil.copy(src, j(DROOT, DSCRIPTS))

    # transcrypt files
    log('Transpile .py scripts')
    cwd = os.getcwd()
    os.chdir(SROOT)
    for src in glob.glob(j(SSCRIPTS, '*.py')):
        run('transcrypt --map --build --esv 6 {}'.format(src))
    os.chdir(cwd)
    shutil.move(j(SROOT, SSCRIPTS_PY, 'index.min.js'), j(DROOT, DSCRIPTS))
    shutil.rmtree(j(SROOT, SSCRIPTS_PY))




#########################
###  Helper functions

def log(msg):
    print()
    print('=== {} ==='.format(msg))

def run(cmd):
    print('\t' + cmd)
    subprocess.run(cmd, shell=True, check=True)
    
def minext(fn):
    filename, ext = os.path.splitext(os.path.split(fn)[1])
    return filename + '.min' + ext



#########################
###  Start the program

if __name__ == '__main__':
    main()