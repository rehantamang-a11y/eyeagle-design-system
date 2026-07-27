# Public Storybook

The repository can publish the static Storybook to GitHub Pages. This is separate from Chromatic:

- GitHub Pages provides a stable shareable URL.
- Chromatic provides visual review, baselines, and change approval.

## One-time GitHub setup

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Set **Source** to **GitHub Actions**.
4. Push to `main`, or manually run the **Publish Storybook** workflow from the Actions tab.

The workflow builds `storybook-static/` and deploys it as the Pages site. The URL normally follows this format:

```txt
https://rehantamang-a11y.github.io/eyeagle-design-system/
```

The exact URL is shown in the completed workflow run and the Pages settings.

## Publishing updates

```bash
git add .
git commit -m "update: refresh Storybook"
git push
```

The current design-system branch workflow also publishes the feature branch preview. Merge approved changes to `main` for the canonical public Storybook.
