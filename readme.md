# Git Data

## Install and single run:
```sh
$ yarn
$ yarn start 
```
Installs the node packages and executes a single build and run.
See package.json for other options

## To Use:
Edit the repos.json file with the name and ssh link of the repositories you'd like to collect the statistics on.
Individual log files will be stored in ./logs along with a summary file
You will need ssh setup for each repository

## Modifying Variables
repos.json contains the key value name for the repositories
the json key will be the name of the log file generated.

ex.  in the example below the following files will be created
containing the log files.  "foo_log.tsv", "bar_log.tsv", "summary.tsv"
```json
{
  "foo": "git@github.com:owner/repository.git",
  "bar": "git@github.com:owner/bar.git",
}
```


There are a few constants that can be modified in ./src/constants/index

startDate = earliest date stored in the log data
the date should be formatted as "YYYY-MM-DD" i.e.
```javascript
const startDate = "2019-11-01";
```

authorMap = key value pair, mapping author names to other aliases i.e.
```javascript
const authorMap: any = {
   "Johnny Smith" : "John Smith"
};
```
This will allow commits for Johnny Smith to be added to the alias John Smith

