const {Command} = require('@oclif/command');
const {getProfiles, getCurrentProfile, linkName, profilesDir} = require('../utils');
const colors = require('colors/safe');
const fs = require('fs');
const path = require('path');

class UseCommand extends Command {
  async run() {
    const {args} = this.parse(UseCommand);

    if (getCurrentProfile()) {
      fs.unlinkSync(linkName);
    }

    fs.symlinkSync(path.join(profilesDir, args.profile), linkName);
    this.log('Now using ' + colors.green(args.profile) + '!');
  }
}

UseCommand.args = [
  {
    name: 'profile',
    required: true,
    description: 'Profile to use',
    options: getProfiles(),
  }
];

UseCommand.description = 'Sets your current profile';

module.exports = UseCommand;
