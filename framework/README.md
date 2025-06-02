## Updating the framework

Framework updates should be made to the `.xlxs` version, and versions updated accordingly using semantic versioning.

Running the `make_json.ipynb` with the correctly updated version added will then write this to the `terms.json` to be used in the frontend.

### Setup

To update the `terms.json`:
- Navigate to the `framework` folder in the repo
- `pip install -r ./requirements.txt`
- Open the `make_json.ipnb` notebook and update the version number to your new version and run.
- Update the `CHANGELOG.md` to reflect your updates
