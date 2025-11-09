# M.I.N.I.O.N

Keybank 2025 Hackoween project with the 2025 Rotational Analyst group. The M.I.N.I.O.N dashboard researches major cyber attacks and APTs in the current environment and generates a dashboard of threat profiles and current breaking news. The project utilizes WRITER's Web Scraping AI Agents to gather intel on APTs and uses React to create a user friendly dashboard.

## Members
Developers: Muskan Shergill & Ellie Fahey

Research/Security Team: Autumn Groen, Hannah Taupieka, Mary Kromer

Storyteller: Jake Burdick

### Developer Steps

## Install Necessary Dependencies 
##### `npm install`
Installs necessary packages and dependencies for Node.js development.

##### `npm install express cors`
Installs Express.js and CORS middleware.

## Run manual scripts (if no data exists)
#### `node threat_profile.js`
Calls Web Scraper AI Agent in Writer to scrape knowledge network for APT information and generate profiles.

#### `node news.js`
Calls Web Scraper AI Agent in Writer to scrape knowledge network for recent news reports on cyber attacks.

## Run Developer Environment
#### `npm run server`
Starts the API Server

#### `npm start`
Starts the React App.
