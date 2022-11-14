const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');

// --SERVER--


const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);


const server = http.createServer((req,res) => {
   const {query,pathname} = url.parse(req.url,true);
   console.log(query);

    //Overview page
    if(pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard,el)).join('');
        const output = tempOverview.replace('{%PRODUCTCARDS%}', cardsHtml);
        res.end(output);
    }

    //Product page
    else if(pathname === '/product') {
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);
    }

    //API page
    else if(pathname == '/api') {
        res.writeHead(200, {
            'Content-type': 'application/json'
        });
        res.end(data);
    }

    //Page not found
    else {
        res.writeHead(404, {
            'Content-type':'text/html',
            'my-own-header': 'hello-world'
        });
        res.end("<h1>This page cannot be found</h1>")
    }
});

server.listen(8000,'127.0.0.1', () => {
    console.log('Listening to the request on port 8000');
});



// -------BLOCKING (SYNC)----------
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');

// const textOut = `this is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('file written');

// const hello = 'Hello world';
// console.log(hello);


// ------NON-BLOCKING (ASYNC)--------
// fs.readFile('./txt/start.txt', 'utf-8', (err,data1) => {
//     if(err) return console.log("error aa gaya" + err);
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err2, data2) => {
//         console.log(data2);
//         fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//             console.log(data3);

//             fs.writeFile('./txt/final1.txt', `${data2}\n${data3}`, (err) => {
//                 console.log("your file has been writen!")
//             })
//         })
//     } )
// })