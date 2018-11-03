const {Command, flags} = require('@oclif/command');
const fs = require('fs');
const path = require('path');

const {profilesDir} = require('../utils');

class AddCommand extends Command {
  get fileName() {
    const {args} = this.parse(AddCommand);

    return path.join(profilesDir, args.name);
  }

  get fileContents() {
    const {flags} = this.parse(AddCommand);

    return `[default]
aws_access_key_id = ${flags.accessKey}
aws_secret_access_key = ${flags.secretKey}`;
  }

  async run() {
    const {flags} = this.parse(AddCommand);
    this.log(`Creating ${this.fileName}`);

    if (fs.existsSync(this.fileName) && !flags.force) {
      this.error(`${this.fileName} already exists, please supply -f flag to overwrite`);
      return;
    }

    fs.writeFileSync(this.fileName, this.fileContents);
  }
}

AddCommand.description = 'add a new profile';

AddCommand.args = [
  {
    name: 'name',
    required: true,
    description: 'Name for the new profile',
  },
];

AddCommand.flags = {
  accessKey: flags.string({
    char: 'a',
    description: 'Access Key Id',
    required: true,
  }),
  secretKey: flags.string({
    char: 's',
    description: 'Secret Key Id',
    required: true,
  }),
  force: flags.boolean({
    char: 'f',
    description: 'Force overwrite an existing profile',
    default: false,
  }),
};

module.exports = AddCommand;
