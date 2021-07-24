const fs = require('fs');
const csv = require('csv-parser');
const { resolve } = require('path');

exports.GetCsvFromPath = function (path) {

    const files = [];

    fs.readdir(directory, (err, files) => {
        files.forEach(file => {
            console.log(file);
            files.push(file);
        });
    });

    delete fs;

    return files;
}

exports.GetCsvData = function (csvfile) {

    const csvdata = [];

    fs.createReadStream(csvfile)
        .pipe(csv({ separator: ';' }))
        .on('data', (row) => {
            csvdata.push(row);
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
        });

    console.log(csvdata);
    delete fs;
    return csvdata;
}

let filepath = "/Users/bayer/Development/devops/web-crawler-nodejs/result/staging77nz75pv.ch-bayerwsf.acsitefactory.com.csv";
let data = this.GetCsvData(filepath);

let mydata = [
    {
      url: 'http://staging77nz75pv.ch-bayerwsf.acsitefactory.com/',
      href: '/contact-us',
      status: '200'
    },
    {
      url: 'http://staging77nz75pv.ch-bayerwsf.acsitefactory.com/',
      href: 'http://staging77nz75pv.ch-bayerwsf.acsitefactory.com/',
      status: '200'
    }
  ];
mydata.forEach((val, key, mydata) => {
    console.log(key.url);
});

console.log(data);