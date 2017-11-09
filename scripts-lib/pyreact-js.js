//  If you already have pyreact-js-bundle.min.js, you just need to include it
//  in your html file with a <script> tag.
//
//  If you need to create the bundle, first install npm:
// 
//      npm install -g browserify uglify
//      npm install jsx-transform
//
//  Command is:
//
//      browserify pyreact-js.js --standalone PyReact > pyreact-js-bundle.js
//      uglify -s pyreact-js-bundle.js -o pyreact-js-bundle.min.js
//
//  Author: Conan Albrecht <doconix@gmail.com>
//  License: Apache Open Source
//
var jsx = require('jsx-transform')

PyReact = {
    
    // for matching against pyreact.py
    __pyreact_version__: '1.0.0',
    
    // creates elements from a JSX string
    jsx: function(jsx_st, context) {
        with (context) { 
            return eval(jsx.fromString(jsx_st, { 
                factory: "React.createElement", 
                passUnknownTagsToFactory: true,   // these are usually our custom Component names
                arrayChildren: false              // if true (the default), react thinks everything is a list and warns incessantly about unique keys, even on regular html tags
            }))
        }
    }
    
}//PyReact

module.exports = PyReact