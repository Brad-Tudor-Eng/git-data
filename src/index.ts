import { Paths } from "./constants/index";
import {
  clearOldFiles,
  importJson,
  processSingleRepo
} from "./helper/index";

const processAllRepos = async () => {
  clearOldFiles();
  const repos = importJson({ path: Paths.Json });
  const names = Object.keys(repos);
  const promises = names.map((repoName) =>
    processSingleRepo({ repoName, repos })
  );
  await Promise.allSettled(promises);
  return 0;
};

processAllRepos();
