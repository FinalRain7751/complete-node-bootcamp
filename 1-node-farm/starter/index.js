'use strict';

const fs = require('fs');
const http = require('http');
const url = require('url');

const slugify = require('slugify');

// Blocking, synchronous way

// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");

// // console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${new Date()}`;

// fs.writeFileSync("./txt/output.txt", textOut);

// console.log("File written");

// console.log(fs.readFileSync("./txt/output.txt", "utf-8"));

// Non-blocking, synchronous way

// let textRead = [];

// const readFile = function (filePath) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(filePath, "utf-8", (err, data) => {
//       console.log(data);
//       textRead.push(data);
//       resolve(data);
//     });
//   });
// };

// const writeFile = function (filePath, data) {
//   return new Promise((resolve, reject) => {
//     fs.writeFile(filePath, data, "utf-8", (err) => {
//       console.log("File written");
//     });
//   });
// };

// readFile("./txt/read-this.txt")
//   .then(() => readFile("./txt/start.txt"))
//   .then(() => readFile("./txt/append.txt"))
//   .then(() => writeFile("./txt/final.txt", `${textRead.join("\n")}`))
//   .then()
//   .catch((err) => {
//     console.error(err.message);
//   });

// console.log("Reading file...");

////////////////////////////////////////////

// SERVER

const replaceTemplate = function (template, el) {
  let card = template.replace(/{%PRODUCT_NAME%}/g, el.productName);
  card = card.replace(/{%ID%}/g, el.id);
  card = card.replace(/{%PRODUCT_NAME%}/g, el.productName);
  card = card.replace(/{%PRODUCT_IMAGE%}/g, el.image);
  card = card.replace(/{%PRODUCT_ORIGIN%}/g, el.from);
  card = card.replace(/{%PRODUCT_NUTRIENTS%}/g, el.nutrients);
  card = card.replace(/{%PRODUCT_QUANTITY%}/g, el.quantity);
  card = card.replace(/{%PRODUCT_PRICE%}/g, el.price);
  card = card.replace(/{%PRODUCT_DESCRIPTION%}/g, el.description);
  card = card.replace(/{%NOT_ORGANIC%}/g, el.organic ? 'not-organic' : '');
  return card;
};

const dataJSON = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const data = JSON.parse(dataJSON);

const slugs = data.map((el) => slugify(el.productName, { lower: true }));

const productTemp = fs.readFileSync(`./templates/product.html`, 'utf-8');
const overviewTemp = fs.readFileSync(
  `./templates/template-overview.html`,
  'utf-8'
);
const cardTemp = fs.readFileSync(`./templates/template-card.html`, 'utf-8');

console.log(slugs);

const server = http.createServer((req, res) => {
  // console.log(req);
  const { pathname: pathName, query } = url.parse(req.url, true);
  console.log(query);
  console.log(pathName);

  // Overview page
  if (pathName === '/' || pathName === '/overview') {
    res.writeHead('200', {
      'Content-type': 'text/html',
    });

    const cards = data.map((el) => replaceTemplate(cardTemp, el));

    const overviewHtml = overviewTemp.replace(/{%PRODUCT_CARD%}/g, cards);

    res.end(overviewHtml);

    // Product page
  } else if (pathName === `/product`) {
    res.writeHead('200', {
      'Content-type': 'text/html',
    });
    const id = query.id;
    console.log(id);
    const productHtml = replaceTemplate(productTemp, data[id]);

    res.end(productHtml);

    // API
  } else if (pathName === '/api') {
    res.writeHead('200', {
      'Content-type': 'application/json',
    });
    res.end(dataJSON);

    // Page not found
  } else {
    res.writeHead('404', {
      'Content-type': 'text/html',
    });
    res.end('<h1>Page not found</h1>');
  }
});

server.listen(8080, '127.0.0.1', () => {
  console.log('Listening for requests on port 8080...');
});

// console.log("Listening for requests on port 8080...");
