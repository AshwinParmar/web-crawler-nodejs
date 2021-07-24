const myapp = require('./crawler');
const fs = require('fs');

// Read sites.json file to get all the domains for process.
fs.readFile('./sites.json', (err, data) => {

    if (err) throw err;

    let jsonFileData = JSON.parse(data);
    let sites   = jsonFileData.sites;
    let domains = Object.keys(sites);

	const main = async () => {
	  for (let index = 0; index < domains.length; index++) {

	    const url = domains[index];

	    // Crawl each domain from sites.json and waiting for response.
	    await myapp.websiteCrawler(url);
	  }
	};

	main().catch(console.error);

});
