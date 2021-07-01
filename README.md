# Web Crawler for Scanning websites

## How to use

### Download code or Clone this repository.
`git clone https://github.com/AshwinParmar/web-crawler-nodejs.git`

### Install node packages
`npm install`

### Add list of websites in `sites.json` to crawl all the websites.
```
{
    "sites": {
        "www.examplesite1.com": { },
        "www.examplesite2.com": { }
    }
}
```

### Adjust configuration file `config.json`
```
{
  "protocol": "http:",
  "domain": "DYNAMIC_DOMAIN",
  "limitForConnections": "5",
  "limitForRedirects": "5",
  "timeout": "500",
  "headers": {
    "User-Agent": "Your-User-Agent/0.0.1"
  }
}
```
- Protocol -> http or https
- domain -> Do not change it as this will be replaced with you site from `sites.json`
- timeout -> Default timeout is `500`
- headers -> You can add headers as per your need
  - e.g. User-Agent, Cookie etc...

### How to crawl
`node index.js`

### Results will be available inside result directory and it will generate CSV file for each domain/site.
