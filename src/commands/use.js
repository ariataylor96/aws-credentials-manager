const {Command} = require('@oclif/command');
const {getProfiles, profileIsSymlink, profileExists, linkName, profilesDir} = require('../utils');
const colors = require('colors/safe');
const fs = require('fs');
const path = require('path');

class UseCommand extends Command {
  async run() {
    const {args} = this.parse(UseCommand);

    if (profileExists() && !profileIsSymlink()) {
      this.error(
        'Your current profile is not a symlink. Please run ' +
        colors.cyan('acm migrate <current profile name> ') +
        'to finish setting up acm.',
      );
      return;
    }

    fs.unlinkSync(linkName);

    fs.symlinkSync(path.join(profilesDir, args.profile), linkName);
    this.log('Now using ' + colors.green(args.profile) + '!');
  }
}

UseCommand.args = [
  {
    name: 'profile',
    required: true,
    description: 'profile to use',
    options: getProfiles(),
    parse: input => input.replace(/\s+/g, ''),
  }
];

UseCommand.description = 'Sets your current profile';

module.exports = UseCommand;
