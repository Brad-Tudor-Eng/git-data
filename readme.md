# Git Data

## Install and single run:

```sh
$ yarn
$ yarn single:build
$ yarn single:start
```

Installs the node packages and executes a single build and run.
See package.json for other options

## To Use:

The config.json located in the project root directory contains all of the variables for the
project setup.

- authorMap: provides the ability to map users to their alias
- branch: Which branch to generate the reports from
- repos: The key will be the name of the repo in the report, the value is the ssh address from which to clone the git repo.
- startDate: Earliest date to include in the reports
