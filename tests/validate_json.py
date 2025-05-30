# # Validate terms lists
#
# This python script extends json schema validation (`jsonschema --instance terms.json terms.schema.json`) to ensure:
#
# 1. slug: unique
# 2. title: unique
# 3. related: no references to non-existent slugs
# 4. related: no self-references
# 5. description: checks for broken links

# Import libraries
import json
import urllib.request
from urlextract import URLExtract

# Define custom functions
def check_url_live(url):
    # Requires valid user agent for certain website
    req = urllib.request.Request(
        url,
        data=None,
        headers={
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.47 Safari/537.36"
        },
    )
    try:
        res = urllib.request.urlopen(req)
        if res.code == 200:
            return
        else:
            raise Exception(f"URL check failed for {url} with response {res.code}")
    except:
        raise Exception(f"URL check failed for {url}")


# Load terms
try:
    f = open("../data/terms.json")
except:
    raise Exception("Unable to open terms.json")

try:
    terms = json.load(f)
except:
    raise Exception("Unable to parse terms.json as valid json")

# Check for unique termCodes

termCodes = []
for term in terms["terms"]:
    if term["termCode"] in termCodes:
        raise Exception(f"Duplicate termCode found for \"{term['termCode']}\"")
    else:
        termCodes.append(term["termCode"])

print(f"{len(termCodes)} unique termCode(s) in database")

# Check for unique names

names = []
for term in terms["terms"]:
    if term["metaDimension"] in names:
        raise Exception(f"Duplicate dimension found for \"{term['metaDimension']}\"")
    else:
        names.append(term["metaDimension"])

print(f"{len(names)} unique dimension(s) in database")

# Check valid links

extractor = URLExtract()
for term in terms["terms"]:
    urls = extractor.find_urls(term["considerationsSetup"])
    for url in urls:
        check_url_live(url)

print("No broken links found")
