# Contribution guidelines

Thank you for your interest in contributing to the LLM MEvaluation and Monitoring Framework,
we really appreciate it. There are a number of ways that you can contribute – reporting
bugs, fixing bugs, suggesting new features, or writing documentation.

## Contributing

If you’ve got an idea, suggestion, or encountered a bug, you can
[create a GitHub issue](https://github.com/nhsengland/llm-eval-monitor-framework/issues/new/choose).

When raising bugs please explain the issue in good detail and provide a guide to how to replicate it.

Please raise feature requests as issues before contributing any code. This ensures
they are discussed properly before any time is spent on them.

## Updating the Changelog

If you open a GitHub pull request on this repo that includes a substantive change, please update `CHANGELOG` to reflect your contribution.

Changes to the project that not part of the public API do not need changelog entries, for example fixing the CI build server.

These sections follow [semantic versioning](https://semver.org/spec/v2.0.0.html), where:

- `Breaking changes` corresponds to a `major` (1.X.X) change.
- `New features` corresponds to a `minor` (X.1.X) change.
- `Fixes` corresponds to a `patch` (X.X.1) change.

Versioning should correspond to [tags](https://github.com/nhsengland/llm-eval-monitor-framework/tags) which can be done retrospectively.

Changes to the underlying framework (i.e. changes to `terms.json`) may require further documentation via a [release](https://github.com/nhsengland/llm-eval-monitor-framework/releases).

See the [`CHANGELOG.md`](./CHANGELOG.md) for an example for how this looks.
