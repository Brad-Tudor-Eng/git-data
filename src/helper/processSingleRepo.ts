import { Paths, authorMap, startDate } from "../constants/index";
import {
  appendToSummaryFile,
  clearOldFiles,
  cloneRepo,
  createTSVLogFile,
  getRepoLogs,
  getRepoStatistics,
  importJson,
  mapSummaryDataToTSV,
  removeDirectory,
} from "./index";

export const processSingleRepo = async ({ repoName, repos }) => {
  const directory = `${Paths.Repos}/${repoName}`;
  await cloneRepo({ repo: repos[repoName], directory });

  const log = await getRepoLogs({ directory, startDate });

  const { tsv, stats } = await getRepoStatistics({
    log,
    aliases: authorMap,
  });

  createTSVLogFile({ repoName, tsvData: tsv });

  const summaryData = mapSummaryDataToTSV(stats);

  appendToSummaryFile({ repoName, summaryData });

  removeDirectory(directory);
};