// Thanks to @wildlyinaccurate for jsx-transform-cli, which this code is loosely based on
// 
// When transpyle encounters __pragma__('xtrans'), it runs this js file using node:
//     node jsx-transpiler.js
//
// The magic is jsx.fromString() below, which converts the jsx code into js.
// The input is piped in, output is piped back to transcrypt.

var jsx = require('jsx-transform')

var chunks = []
process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
    chunks.push(process.stdin.read())
})

process.stdin.on('end', () => {
    process.stdout.write(jsx.fromString(chunks.join(''), {
        factory: "React.createElement",
        passUnknownTagsToFactory: true,   // these are usually our custom Component names
        arrayChildren: false              // if true (the default), react thinks everything is a list and warns incessantly about unique keys, even on regular html tags
    }))
})

