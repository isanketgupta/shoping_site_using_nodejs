const  fs = require('fs');


const requestHandler = (req, res) => {
    const url =req.url;
    const method = req.method;
    if ( url === '/' ){
        res.write('<html>');
        res.write('<head><title>Enter message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">send</button></form></body>');
        res.write('</html>');
        return res.end();
    } 
    if ( url === '/message' && method === 'POST' ){
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFileSync("message.txt" , message );
        });

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile("message.txt" , message, () => {
                console.log('will be executed after file write completion');
            } );
        });
        // fs.writeFileSync("message.txt" , 'DUMMY' );
        res.statusCode = 302;
        res.setHeader('Location','/');
        return res.end();
    }
    res.setHeader('content-type','text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>hello from Node.js Server!</h1></body>')
    res.write('</html>');
    res.end();

}


// different methods to export function

// if we have only one function to export we can do that by this way 
module.exports = requestHandler;

// exporting multiple function together in a object 
module.exports = { 
    handler : requestHandler,
    someText : 'some hard coded text!'
};

// exporting multiple function seprately
module.exports.handler = requestHandler;
module.exports.someText = 'some hard coded text';


// shortcut supported only by node for this is 
exports.handler = requestHandler;
exports.someText = 'some hard coded text';
