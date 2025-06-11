import pandas as pd
import json
from datetime import datetime

version="0.2.1"

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



framework_location = f"./LLMevalmonitorframework_v{version}.xlsx"
terms_output_location = "../data/terms.json"

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
    json.dump(terms_json_out, file)

print(f"JSON file written to {terms_output_location} with {len(df)} terms.")
