import tempfile
import unittest
from pathlib import Path

from framework.make_json import get_framework_file_and_version


class FrameworkVersionDiscoveryTests(unittest.TestCase):
    def test_reads_semver_from_filename(self):
        with tempfile.TemporaryDirectory() as directory:
            framework_dir = Path(directory)
            framework = framework_dir / "LLMevalmonitorframework_v1.2.3.xlsx"
            framework.touch()

            path, version = get_framework_file_and_version(framework_dir)

            self.assertEqual(path, framework)
            self.assertEqual(version, "1.2.3")

    def test_ignores_invalid_names(self):
        with tempfile.TemporaryDirectory() as directory:
            framework_dir = Path(directory)
            (framework_dir / "LLMevalmonitorframework_latest.xlsx").touch()

            with self.assertRaises(FileNotFoundError):
                get_framework_file_and_version(framework_dir)

    def test_rejects_multiple_versioned_files(self):
        with tempfile.TemporaryDirectory() as directory:
            framework_dir = Path(directory)
            (framework_dir / "LLMevalmonitorframework_v0.2.2.xlsx").touch()
            (framework_dir / "LLMevalmonitorframework_v0.2.3.xlsx").touch()

            with self.assertRaises(RuntimeError):
                get_framework_file_and_version(framework_dir)


if __name__ == "__main__":
    unittest.main()
