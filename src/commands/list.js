const {Command} = require('@oclif/command');
const {getProfiles, getCurrentProfile} = require('../utils');
const colors = require('colors/safe');

class ListCommand extends Command {
  async run() {
    const profiles = getProfiles();
    let currentProfile = getCurrentProfile();

    if (currentProfile) {
      this.log(colors.green(currentProfile));
    }

    for (const profile of profiles) {
      if (profile !== currentProfile) {
        this.log(profile);
      }
    }
  }
}

ListCommand.description = `List all available profiles`;

module.exports = ListCommand;
