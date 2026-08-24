from pathlib import Path

import pytest

from framework.make_json import get_framework_file_and_version


def test_get_framework_file_and_version_reads_semver_from_filename(tmp_path: Path):
    framework = tmp_path / "LLMevalmonitorframework_v1.2.3.xlsx"
    framework.touch()

    path, version = get_framework_file_and_version(tmp_path)

    assert path == framework
    assert version == "1.2.3"


def test_get_framework_file_and_version_ignores_invalid_names(tmp_path: Path):
    (tmp_path / "LLMevalmonitorframework_latest.xlsx").touch()

    with pytest.raises(FileNotFoundError):
        get_framework_file_and_version(tmp_path)


def test_get_framework_file_and_version_rejects_multiple_versioned_files(tmp_path: Path):
    (tmp_path / "LLMevalmonitorframework_v0.2.2.xlsx").touch()
    (tmp_path / "LLMevalmonitorframework_v0.2.3.xlsx").touch()

    with pytest.raises(RuntimeError):
        get_framework_file_and_version(tmp_path)
