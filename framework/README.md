## Updating the framework

Framework updates should be made to the `.xlxs` version, and versions updated accordingly using semantic versioning.

Running the `make_json.ipynb` with the correctly updated version added will then write this to the `terms.json` to be used in the frontend.

### Setup

To update the `terms.json`:

- Navigate to the `framework` folder in the repo
- `pip install -r ./requirements.txt`
- Ensure the framework workbook filename uses the `LLMevalmonitorframework_v<version>.xlsx` format
- `python make_json.py`
- Check to see if you need to prettify `terms.json` for human readability (for example, the [Prettify JSON VS Code extension](https://marketplace.visualstudio.com/items?itemName=mohsen1.prettify-json) can be useful here)
- Update the framework [`CHANGELOG.md`](./CHANGELOG.md) to reflect your updates
