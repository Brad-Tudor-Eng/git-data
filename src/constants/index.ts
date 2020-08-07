export enum Paths {
  Logs = "./logs",
  Json = "./repos.json",
  Repos = "./repos",
  Summary = "./logs/summary.tsv",
}

export const headers = "Author\tDate\tMessage\tInsertions\tDeletions\n";

export const statsHeaders = "Repo\tAuthor\tCommits\tInsertions\tDeletions\n"

export const authorMap: any = {
  "John Smith": "Johnny Smith",
};

export const startDate = "2019-11-01";
