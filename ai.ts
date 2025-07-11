import { GoogleGenAI } from "@google/genai"

const GEMINI_API_KEY = process.env.GEMINI_API_KEY

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY })

export async function generateContent(contents: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-001",
    contents,
  })
  return response.text
}

export async function completePRTemplate(gitDiff: string, prTemplate: string) {
  const prompt = `
Fill out the following PR Template using the provided Git diff. Only include the filled out template in the response, do not include any other content.
=== Start of PR Template ===
${prTemplate}
=== End of PR Template ===
=== Start of Git Diff ===
${gitDiff}
=== End of Git Diff ===
  `

  return generateContent(prompt)
}
