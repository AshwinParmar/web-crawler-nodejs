const myapp = require('./crawler');
const fs = require('fs');

fs.readFile('./sites.json', (err, data) => {

    if (err) throw err;

    let student = JSON.parse(data);
    let sites   = student.sites;
    let domains = Object.keys(sites);

	domains.forEach((domain, index, domains) => {
		console.log("[ Running on " + domain + " - Sites (" + index + ") Out of " + "(" + (domains.length - 1) + ")" + " ]");
		let myPromise = new Promise((resolve, reject) => {			
			myapp.websiteCrawler(domain);
	        if (index === domains.length -1) resolve();
	    });
		myPromise.then(() => {
			console.log('[ Completed ' + domain + ']');
		});
	});
});
