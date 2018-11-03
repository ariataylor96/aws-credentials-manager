const {Command} = require('@oclif/command');
const {profileIsSymlink, linkName, profilesDir} = require('../utils');

const colors = require('colors/safe');
const fs = require('fs');
const path = require('path');

class MigrateCommand extends Command {
  async run() {
    const {args} = this.parse(MigrateCommand);
    const newName = path.join(profilesDir, args.name);

    if (profileIsSymlink()) {
      this.log(
        colors.green('Your credentials profile is already a symlink, you\'re good to go!')
      );
      return;
    }

    fs.renameSync(linkName, newName);
    fs.symlinkSync(newName, linkName);

    this.log(colors.green(`Now using ${args.name}`));
  }
}

MigrateCommand.description = `migrate the current profile to the ACM structure
...
By default, running aws config will create a flat credentials file and you can add profiles there.
This involves adding a flag to most AWS commands - this makes scripting less fun and allows for accidents.
`;

MigrateCommand.args = [
  {
    name: 'name',
    required: true,
    description: 'Name for the new profile',
    parse: input => input.replace(/\s+/g, ''),
  }
];

module.exports = MigrateCommand;
