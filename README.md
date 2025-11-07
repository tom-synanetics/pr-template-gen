# PR Template Gen

`pr-template-gen` is a command-line tool that automatically fills out your GitHub pull request template using AI. Just provide a PR URL, and it analyzes the diff to generate a complete, context-aware PR description.

## Features

- Parses a GitHub PR URL and fetches PR details, diff, and template
- Excludes common noise files (e.g. lockfiles) from the analysis
- Uses AI to generate a filled-out PR template based on actual code changes
- Outputs the result directly to the console, ready to paste into your PR description

## Installation

1. Clone the repository:

   ```bash
    git clone git@github.com:tom-synanetics/pr-template-gen.git
    cd pr-template-gen
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Install `pr-template-gen` globally:

   ```bash
   npm install -g .
   ```

## Environment Variables

### Required Variables

- `GEMINI_API_KEY`: Create one at [Google AI Studio](https://aistudio.google.com/)
- `GITHUB_TOKEN`: Create a [personal access token](https://github.com/settings/tokens) or use the GitHub CLI to run `gh auth token`

### Setup

1. Copy the environment file:

   ```bash
   cp .env.example .env
   ```

2. Edit `.env` to add your keys:

   ```bash
   GITHUB_TOKEN=your_github_token_here
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. Alternatively, export them globally (e.g. in `.bashrc`):
   ```bash
   export GEMINI_API_KEY=your_gemini_api_key_here
   export GITHUB_TOKEN=your_github_token_here
   ```

> The `.env` file is optional: If your environment variables are already available globally, `pr-template-gen` will pick them up automatically.

## Usage

```bash
pr-template-gen <PR_URL>
```

Example:

```bash
pr-template-gen https://github.com/org/repo/pull/42
```

This will output a completed PR description to your terminal, ready to copy into GitHub.
