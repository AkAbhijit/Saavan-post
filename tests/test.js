const discordToken = process.argv[2];
const topggToken = 'abc';
const { AutoPoster } = require('..');

function debug(msg) {
  console.debug(`[Saavan] ${currentRunning}: ${msg}`);
}

const { Api } = require('@top-gg/sdk');
const sdk = new Api(topggToken);

sdk._request = (method, path, body) => {
  debug(`${method} ${path}\n${JSON.stringify(body, null, 2)}`);
};

const Oceanic = require('oceanic.js');
const shardCount = Math.floor(Math.random() * 3) + 2;

let currentRunning = 'ESTABLISH';
let kill;

let poster;

debug(`Spawning ${shardCount} shards.`);

const runs = {
  'oceanic.js': () => {
    const client = new Oceanic.Client({ auth: `Bot ${discordToken}`, gateway: { maxShards: 'auto' } });
    poster = AutoPoster(topggToken, client, { sdk });
    client.on('ready', () => {
      debug('Received READY');
    });

    client.connect();
    kill = () => {
      poster.stop();
      client.disconnect();
    };
  }
};

const wait = (time) => new Promise(resolve => setTimeout(() => resolve(), time));

async function run() {
  if (process.argv[3]) {
    currentRunning = process.argv[3];
    runs[currentRunning]();
    poster.once('posted', () => {
      return process.exit();
    });
  }
  for (const cur in runs) {
    currentRunning = cur;
    debug('Loading');
    runs[cur]();
    await new Promise((r) => poster.on('posted', () => r()));
    debug('Cleaning up');
    await wait(5000);
    kill();
  }

  process.exit();
}

run();