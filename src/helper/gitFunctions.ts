import * as fs from "fs";
import simpleGit from "simple-git";

import { headers } from "../constants/index";

const git = simpleGit("./");

/**
 * @summary clones a git repo into a directory
 * @param repo: url to repo ex: git@github.com:Company/repo.git
 * @param directory: path to where the repo will be cloned
 * @return void
 */
export const cloneRepo = async ({
  repo,
  directory,
}: {
  repo: string;
  directory: string;
}) => {
  try {
    if (!fs.existsSync(directory)) {
      await git.clone(repo, directory);
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * @summary gets the log from the repository
 * @param directory: path to the cloned repository
 * @param startDate: earliest date to pull from ex '2019-11-01'
 * @returns git repository log
 */

export const getRepoLogs = async ({ directory, startDate }) =>
  await simpleGit(directory)
    .checkout("remotes/origin/develop") //@ts-ignore
    .log({
      "--date": "local",
      "--pretty": 'format:"%h%x09%an%x09%ad%x09%"',
      "--after": startDate,
      "--stat": true,
    });

const updateStats = (
  author: string,
  insertions: number,
  deletions: number,
  stats: any
) => {
  return {
    ...stats,
    [author]: {
      author,
      count: !!stats[author]?.count ? stats[author].count + 1 : 1,
      insertions: !!stats[author]?.insertions
        ? stats[author].insertions + insertions
        : insertions,
      deletions: !!stats[author]?.deletions
        ? stats[author].deletions + deletions
        : deletions,
    },
  };
};

/**
 * @summary Takes a log file and author aliases and
 * returns a tsv string and the statistics for the repository
 * @param log: log file from simple git
 * @param aliases: Key value pair mapping autor aliases
 */

export const getRepoStatistics = ({
  log,
  aliases,
}: {
  log: any;
  aliases: { [key: string]: string };
}) =>
  log.all.reduce(
    ({ tsv, stats }, commit: any) => {
      const author = Object.keys(aliases).includes(commit.author_name)
        ? aliases[commit.author_name]
        : commit.author_name;

      const date = commit.date;

      const message = commit.message;

      const deletions = isNaN(commit.diff?.deletions)
        ? 0
        : commit.diff?.deletions;

      const insertions = isNaN(commit.diff?.insertions)
        ? 0
        : commit.diff?.insertions;

      const updatedStats = updateStats(author, insertions, deletions, stats);

      return {
        tsv:
          tsv + `${author}\t${date}\t${message}\t${insertions}\t${deletions}\n`,
        stats: updatedStats,
      };
    },
    { tsv: headers, stats: {} }
  );
