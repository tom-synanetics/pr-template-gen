import path from "path"

export function excludeFilesByNameFromDiff(
  diff: string,
  filenames: string[]
): string {
  const excludeSet = new Set(filenames)
  const lines = diff.split("\n")
  const result: string[] = []

  let skipping = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.startsWith("diff --git")) {
      const match = line.match(/^diff --git a\/(.+?) b\/(.+)$/)
      if (match) {
        const [, aPath, bPath] = match
        const aBase = path.basename(aPath)
        const bBase = path.basename(bPath)

        if (excludeSet.has(aBase) || excludeSet.has(bBase)) {
          skipping = true
          continue // skip this "diff --git" line too
        } else {
          skipping = false
        }
      }
    }

    if (!skipping) {
      result.push(line)
    }
  }

  return result.join("\n")
}
