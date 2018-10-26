const path = require('path');
const homeDir = require('os').homedir();
const fs = require('fs');

const awsDir = path.join(homeDir, '.aws');
const profilesDir = path.join(awsDir, 'profiles');

function setup() {
  if (!fs.existsSync(awsDir) || !fs.existsSync(profilesDir)) {
    fs.mkdirSync(awsDir);
    fs.mkdirSync(profilesDir);
  }
}

function getProfiles() {
  return fs.readdirSync(profilesDir);
}

module.exports = {
  getProfiles,
  awsDir,
  profilesDir,
};

setup();
