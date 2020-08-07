import * as fs from "fs";
import * as rimraf from "rimraf";

import { Paths, headers, statsHeaders } from "../constants/index";

/**
 * @summary Creates a file to store the repos statistics
 */
export const createSummaryFile = () => {
  fs.writeFileSync(Paths.Summary, statsHeaders);
};

/**
 * @summary Removes old files from repos and logs
 */
export const clearOldFiles = () => {
  rimraf.sync(Paths.Logs);
  fs.mkdirSync(Paths.Logs);
  rimraf.sync(Paths.Repos);
  rimraf.sync(Paths.Summary);
  createSummaryFile();
};

/**
 * @summary Imports and parses a json file
 * @param {string} path: path to the JSON file to be parsed
 */
export const importJson = ({ path }: { path: string }) =>
  JSON.parse(fs.readFileSync(path).toString());

/**
 * @summary Creates a log file
 * @param {string} repoName: name of the repository
 * @param {string} tsvData: string containing tsv data
 */
export const createTSVLogFile = ({
  repoName,
  tsvData,
}: {
  repoName: string;
  tsvData: string;
}) => {
  const filePath = `${Paths.Logs}/${repoName}_log.tsv`;
  fs.existsSync(filePath) && rimraf.sync(filePath);
  fs.writeFileSync(filePath, tsvData);
};

/**
* @summary Adds tsv data to the summary file
* @params repoName: name of the repository
* @params summaryData: data to append
*/
export const appendToSummaryFile = ({
  repoName,
  summaryData,
}: {
  repoName: string;
  summaryData: string;
}) => fs.appendFileSync(Paths.Summary, `${repoName}\n${summaryData}`);

/**
* @summary Processes the raw summary data into a TSV object
*/
export const mapSummaryDataToTSV = (rawData) =>
  Object.values(rawData).reduce((data, line) => {
    const { author, insertions, deletions, count } = line as any;
    return data + `\t${author}\t${count}\t${insertions}\t${deletions}\n`;
  }, "") as string;


/**
* @summary removes item at the give path
*/
export const removeDirectory = (directory) => rimraf.sync(directory);
