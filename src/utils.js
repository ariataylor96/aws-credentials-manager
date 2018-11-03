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

function profileExists() {
  return fs.existsSync(linkName);
}

function profileIsSymlink() {
  return fs.lstatSync(linkName).isSymbolicLink();
}

function getCurrentProfile() {
  let result = null;

  if (profileIsSymlink()) {
      result = path.basename(fs.readlinkSync(linkName));
  }

  return result;
}

function getProfiles() {
  return fs.readdirSync(profilesDir);
}

module.exports = {
  getProfiles,
  getCurrentProfile,
  profileIsSymlink,
  profileExists,
  linkName,
  awsDir,
  profilesDir,
};

setup();
