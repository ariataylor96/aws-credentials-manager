aws-credentials-manager
=======================

Manages credentials profiles for the AWS CLI.

# Why?
The AWS cli tool does allow you to select between profiles all configured in the same credentials file by passing
an optional parameter to most commands. However, this does not really take into account legacy commands
(that are still in use in some places), custom scripts using boto, and makes scripting more cumbersome and error prone.

With this, you can simply switch your profile at the start of your work and switch back at the end without remembering
many profile names.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/aws-credentials-manager.svg)](https://npmjs.org/package/aws-credentials-manager)
[![Downloads/week](https://img.shields.io/npm/dw/aws-credentials-manager.svg)](https://npmjs.org/package/aws-credentials-manager)
[![License](https://img.shields.io/npm/l/aws-credentials-manager.svg)](https://github.com/markrawls/aws-credentials-manager/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage

    $ acm [COMMAND]

# Commands
    
    add      add a new profile
    help     display help for acm
    list     list all available profiles
    migrate  migrate the current profile to the ACM structure
    use      sets your current profile
