![node version 14](https://img.shields.io/badge/node-v14-green)
[![Validate terms.json](https://github.com/nhsengland/llm-eval-monitor-framework/actions/workflows/validate-json.yml/badge.svg)](https://github.com/nhsengland/llm-eval-monitor-framework/actions/workflows/validate-json.yml)
[![status: experimental](https://github.com/GIScience/badges/raw/master/status/experimental.svg)](https://github.com/GIScience/badges#experimental)

# (Draft) Large Language Model Evaluation and Monitoring Framework

## What is it?

This Large Language Model Evaluation and Monitoring Framework presents a structured approach to evaluating and monitoring in the responsible use of Large Language Models (LLMs).

It is organised around three key groups:

- Suitability in Context
- Wider Impact
- Quantifiable Changes

each containing critical dimensions for consideration.

The emphasis is on the practical implications e.g. how often to review each dimension, what decisions they inform, and what actions they drive.

## Dimension Management

The dimensions are currently stored in [`data/terms.json`](data/terms.json) following the schema defined in [`data/terms.schema.json`](data/terms.schema.json).

To add new dimensions, simply add a new item to the terms array following the structure below:

| Field                | Type   | Description                                                                                              |
|----------------------|--------|----------------------------------------------------------------------------------------------------------|
| metaGroup            | string | The title of the group e.g. "Wider Impact".                                                              |
| metaDimension        | string | The title of the dimension e.g. "Benchmark Relevance".                                                   |
| considerationsSetup  | string | Considerations at setup for the given dimension.                                                         |
| monitoringAction     | string | Actions around monitoring for the given dimension.                                                       |
| monitoringRationale  | string | Rationale around monitoring for the given dimension.                                                     |
| monitoringFrequency  | string | Frequency of monitoring for the given dimension.                                                         |
| monitoringUpdate     | string | Whilst monitoring when to update a model for the given dimension.                                        |
| monitoringRetire     | string | Whilst monitoring when to retire a model for the given dimension.                                        |
| updateretireUpdate   | string | How to update a model for the given dimension.                                                           |
| updateretireRetire   | string | How to retire a model for the given dimension.                                                           |
| termCode             | string | The short-name of the dimension for use in the URL and related dimensions e.g. "qc-benchmark-relevance". |
| related              | array  | (optional) Array of termCodes of related dimensions, e.g. "sic-cost" or "wi-documentation".              |

Take a look at the existing dimensions in the JSON file as an example of the structure above.
You can also edit existing dimensions or remove them from the array.

### Updates to the Framework

Framework updates should be made to the `.xlxs` version in [framework](framework/) folder, and versions updated accordingly using semantic versioning.

The `README.md` in the `framework` folder gives details on how to then automatically update the `terms.json`.

Changes should be reflected in the `CHANGELOG.md`.

### Tests

- [Automated tests](tests/) run to check valid JSON syntax on every push to this repo.
- To run tests manually, using python3 from the main directory, execute:
  - `pip install -r tests/requirements.txt`
  - `jsonschema --instance data/terms.json data/terms.schema.json`
  - `cd tests && python validate_json.py`

## Stack

The tool is primarily built using `Next.js (v12)` and `Tailwind CSS (v3)` on top of `React (v17)`.
There are also some other supporting tools such as Framer Motion, Headless UI and Heroicons.

There is currently no 'backend' for this project. A JSON file (`data/terms.json`) is used to house and manage the available terms.

## Getting started

You will need:

- `node v14`

It is recommended to use a node package manager like [nvm](https://github.com/nvm-sh/nvm) to manage node versions.

Once the project has been cloned, ensure you have installed the required dependencies using the command below:

```bash
npm i
```

Now you have installed the required packages, you can start the development server using the following command:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Hot reloading is enabled on this project, so your changes should reflect in realtime when running the dev server without constantly refreshing the page.

## Building

If you want to build and export the project locally, then run the commands below:

```bash
npm run build
```

If the build completes successfully, then you can export the project to static HTML files using the command:

```bash
npm run export
```

**Note:** using the static export feature disables some of the features of `Next.js` as you can [read here](https://nextjs.org/docs/advanced-features/static-html-export). Currently, none of these features are used on this project.

## Deployment

Upon merging into `main`, the project is automatically deployed to Github Pages via a Githook Action found in `.github/workflows/gh-pages-deploy.yml`.

## Licence

Unless stated otherwise, the codebase is released under [the MIT Licence][mit].
This covers both the codebase and any sample code in the documentation.

The documentation including term definitions is [© Crown copyright][copyright] and available under the terms
of the [Open Government 3.0][ogl] licence.

[mit]: LICENCE.md
[copyright]: http://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/
[ogl]: http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/
