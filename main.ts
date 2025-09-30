import { completePRTemplate } from "./ai"
import { excludeFilesByNameFromDiff } from "./diff"
import {
  parseGithubPrUrl,
  fetchPRDetails,
  fetchPRDiff,
  fetchPRTemplate,
} from "./github"

const prUrl = process.argv[2]

if (!prUrl) {
  console.error("Usage: pr-template-gen <pr-url>")
  process.exit(1)
}

async function run() {
  const { owner, repo, prNumber } = parseGithubPrUrl(prUrl)

  const gitDiff = await fetchPRDiff(owner, repo, prNumber)

  const gitDiffFiltered = excludeFilesByNameFromDiff(gitDiff, [
    "package-lock.json",
    "yarn.lock",
    "pnpm-lock.yaml",
  ])

  const prTemplate = await fetchPRTemplate(owner, repo)

  const completedTemplate = await completePRTemplate(
    gitDiffFiltered,
    prTemplate
  )

  console.log(completedTemplate)
}

run()
