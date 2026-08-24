import json
import re
from datetime import datetime
from pathlib import Path

import pandas as pd

FRAMEWORK_FILE_PATTERN = re.compile(
    r"^LLMevalmonitorframework_v(?P<version>\d+\.\d+\.\d+)\.xlsx$"
)

upper_column_name_map = {
    "Meta": "Meta",
    "Considerations": "Considerations",
    "Monitoring Plan": "Monitoring",
    "Update/Retirement Plan": "UpdateRetire",
}

lower_column_name_map = {
    "Group": "Group",
    "Dimension": "Dimension",
    "Before monitoring": "Setup",
    "Action at monitoring time": "Action",
    "Rationale": "Rationale",
    "Frequency": "Frequency",
    "When to Update": "Update",
    "When to Retire": "Retire",
    "How to Update": "Update",
    "How to Retire": "Retire",
}

group_map = {
    "Suitability in Context": "sic",
    "Wider Impact": "wi",
    "Quantifiable Changes": "qc",
}


def get_framework_file_and_version(framework_dir: Path) -> tuple[Path, str]:
    """Return the single versioned framework spreadsheet and its version."""
    matches: list[tuple[Path, str]] = []

    for path in framework_dir.glob("LLMevalmonitorframework_v*.xlsx"):
        match = FRAMEWORK_FILE_PATTERN.fullmatch(path.name)
        if match:
            matches.append((path, match.group("version")))

    if not matches:
        raise FileNotFoundError(
            "No framework spreadsheet matching "
            "LLMevalmonitorframework_v<major>.<minor>.<patch>.xlsx was found."
        )

    if len(matches) > 1:
        filenames = ", ".join(sorted(path.name for path, _ in matches))
        raise RuntimeError(
            "Expected exactly one versioned framework spreadsheet, found: "
            f"{filenames}"
        )

    return matches[0]


framework_dir = Path(__file__).resolve().parent
framework_location, version = get_framework_file_and_version(framework_dir)
terms_output_location = framework_dir.parent / "data" / "terms.json"

df = pd.read_excel(
    framework_location,
    header=[0, 1]
)

df.columns = (
    upper_column_name_map[col[0]].lower()
    + lower_column_name_map[col[1]] for col in df.columns
)

df["termCode"] = (
    df.metaGroup.apply(lambda x: group_map[x])
    + "-"
    + df.metaDimension.apply(
        lambda x: x.lower().strip().replace(" ", "-").replace("--", "")
    )
)

df = df.map(
    lambda x: (
        x.replace("\n\n", "\n")
        .replace("\n", "<br>")
        .replace('"', "'")
    )
)
df = df.sort_values(by="metaDimension", axis=0).reset_index(drop=True)

write_date = datetime.now().strftime("%Y-%m-%d")

terms_json_out = json.loads(
    '{"terms": '
    + df.to_json(orient="records")
    + f', "version": "{version}", "lastUpdated": "{write_date}"'
    +  "}"
)

with open(terms_output_location, "w") as file:
    json.dump(terms_json_out, file, indent=4, ensure_ascii=False)

print(f"JSON file written to {terms_output_location} with {len(df)} terms.")
