import { Paths } from "../constants/index";
import {
  appendToSummaryFile,
  importJson,
  cloneRepo,
  createTSVLogFile,
  getRepoLogs,
  getRepoStatistics,
  mapSummaryDataToTSV,
  removeDirectory,
} from "./index";

export const processSingleRepo = async ({ repoName, repos }) => {
  const { authorMap, startDate } = importJson({ path: Paths.Config });

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
