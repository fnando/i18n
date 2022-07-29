# Release Process

1. Make sure that git stage is clean.
2. Bump up version on `package.json`.
3. Run `yarn build`
4. Make a new commit containing any typing updates or documentation changes.
5. Create a new git tag (e.g. `git tag v4.0.0`).
6. Push both code changes and tags (`git push && git push --tags`).
7. Release the NPM package with `npm publish --access public --tag next`.
