const GITHUB_API_KEY = process.env.GITHUB_TOKEN

export function parseGithubPrUrl(prUrl: string) {
  const match = prUrl.match(/github\.com\/([^/]+)\/([^/]+)\/pull\/(\d+)/)

  if (!match) {
    throw new Error("Invalid GitHub PR URL")
  }

  const [_, owner, repo, prNumber] = match

  return { owner, repo, prNumber }
}

export async function fetchPRDetails(
  owner: string,
  repo: string,
  prNumber: string
) {
  const url = `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}`

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${GITHUB_API_KEY}`,
      Accept: "application/vnd.github+json",
    },
  })

  if (!response.ok) {
    const body = await response.json()
    throw new Error(
      `Failed to fetch PR: ${response.status} ${
        response.statusText
      } ${JSON.stringify(body)}`
    )
  }

  const prData = await response.json()
  console.log(JSON.stringify(prData, null, 2))
}

export async function fetchPRDiff(
  owner: string,
  repo: string,
  prNumber: string
) {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_API_KEY}`,
        Accept: "application/vnd.github.v3.diff",
      },
    }
  )

  if (!response.ok) {
    console.log(await response.json())
    throw new Error(
      `Failed to fetch diff: ${response.status} ${response.statusText}`
    )
  }

  const diff = await response.text()
  return diff
}

async function fetchGitHubFile(owner: string, repo: string, path: string) {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_API_KEY}`,
        Accept: "application/vnd.github.v3+json",
      },
    }
  )

  if (!response.ok) {
    throw new Error(
      `Failed to fetch file: ${response.status} ${response.statusText}`
    )
  }

  const json = await response.json()
  const content = Buffer.from(json.content, "base64").toString("utf-8")
  return content
}

export async function fetchPRTemplate(owner: string, repo: string) {
  return fetchGitHubFile(owner, repo, ".github/pull_request_template.md")
}
