# Release Process

1. Make sure that git stage is clean.
2. Bump up version on `package.json`.
3. Update `CHANGELOG.md`.
4. Run `npm run build`
5. Make a new commit containing any typing updates or documentation changes.
6. Create a new git tag (e.g. `git tag v4.0.0`).
7. Push both code changes and tags (`git push && git push --tags`).
8. Release the NPM package with `npm publish --access public --tag latest`.
