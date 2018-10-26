const path = require('path');
const homeDir = require('os').homedir();
const fs = require('fs');

const awsDir = path.join(homeDir, '.aws');
const profilesDir = path.join(awsDir, 'profiles');
const linkName = path.join(awsDir, 'credentials');

function setup() {
  if (!fs.existsSync(awsDir) || !fs.existsSync(profilesDir)) {
    fs.mkdirSync(profilesDir, {recursive: true});
  }
}

function getCurrentProfile() {
  let result = null;

  if (fs.existsSync(linkName)) {
    if (fs.lstatSync(linkName).isSymbolicLink()) {
      result = path.basename(fs.readlinkSync(linkName));
    }
  }

  return result;
}

function getProfiles() {
  return fs.readdirSync(profilesDir);
}

module.exports = {
  getProfiles,
  getCurrentProfile,
  awsDir,
  profilesDir,
};

setup();
