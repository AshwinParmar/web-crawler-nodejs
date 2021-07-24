const fs = require('fs');
const Crawler = require('node-html-crawler');
const CONFIG_JSON = require('./config.json');

exports.websiteCrawler = function(domain) {

	console.log("[ Running on " + domain + " ]");

	CONFIG_JSON.domain = domain;
	const crawler = new Crawler(CONFIG_JSON);
	const siteTree = { pages: [], urls: {}, redirects: {} };
	const getFinalStatusCodeOfRedirects = (url) => {
	  if (/30\d/.test(siteTree.urls[url])) return getFinalStatusCodeOfRedirects(siteTree.redirects[url]);

	  return siteTree.urls[url];
	};

	crawler.crawl();

	crawler.on('data', data => {
		siteTree.urls[data.url] = data.result.statusCode;
		siteTree.pages.push({
			url: data.url,
			links: data.result.links,
		});

		process.stdout.write(`\n\r${crawler.countOfProcessedUrls} out of ${crawler.foundLinks.size}\n`);

		if (/30\d/.test(data.result.statusCode) && data.result.links[0].url) siteTree.redirects[data.url] = data.result.links[0].url;
		console.table([{'PageURL': data.url, 'HTTPStatus': data.result.statusCode}]);
	}); // some html-page a loaded

	crawler.on('error', error => {
		console.error("ERROR::");
		console.table(error);
	}); // error in crawling

	crawler.on('end', () => {
	  const resultFilePath = `${__dirname}/result/${domain}.csv`;

	  fs.writeFileSync(resultFilePath, 'url;href;status\r\n');

	  siteTree.pages.forEach((page, pageIndex) => {
	    const urlOfPage = siteTree.pages[pageIndex].url;

	    siteTree.pages[pageIndex].links.forEach((link, linkIndex) => {
	      const urlOfLink = siteTree.pages[pageIndex].links[linkIndex].url;

	      if (urlOfLink) {
	        const hrefOfLink = siteTree.pages[pageIndex].links[linkIndex].href;
	        const statusCodeOfLink = (/30\d/.test(siteTree.urls[urlOfLink])) ? getFinalStatusCodeOfRedirects(urlOfLink) : siteTree.urls[urlOfLink];

	        if (statusCodeOfLink) {
	          fs.appendFileSync(resultFilePath, `"${urlOfPage}";"${hrefOfLink}";"${statusCodeOfLink}"\r\n`);
	        }
	      }
	    });
	  });

	  //console.log(`\r\nAll Done${crawler.foundLinks.size} links on pages on domain ${domain} a checked!`);
	  console.log("────────────────────────────────────── COMPLETED ───────────────────────────────────────────────────────────");

	  delete siteTree;
	}); // all pages found are crawled and loaded
}