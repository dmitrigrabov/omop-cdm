#!/usr/bin/env python3
"""
Fix @patch decorators in TypeSpec files to include implicitOptionality parameter.

This script updates all @patch decorators from:
  @patch
to:
  @patch(#{implicitOptionality: true})

This resolves TypeSpec 1.0.0 warnings about implicit optional transforms.
"""

import os
from pathlib import Path

def fix_patch_decorator(file_path: Path) -> bool:
    """
    Fix @patch decorator in a single TypeSpec file.

    Args:
        file_path: Path to the TypeSpec file

    Returns:
        True if file was modified, False otherwise
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check if file contains the old @patch pattern
    if '  @patch\n' not in content:
        return False

    # Replace the pattern
    modified_content = content.replace('  @patch\n', '  @patch(#{implicitOptionality: true})\n')

    # Write back
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(modified_content)

    return True

def main():
    """Main function to fix all TypeSpec files."""
    # Define the TypeSpec directory structure
    tsp_dir = Path('tsp')
    categories = ['clinical', 'health-system', 'derived', 'metadata', 'vocabulary', 'results']

    fixed_files = []
    unchanged_files = []

    # Process all TypeSpec files
    for category in categories:
        category_dir = tsp_dir / category
        if not category_dir.exists():
            print(f"Warning: Directory {category_dir} not found")
            continue

        for tsp_file in category_dir.glob('*.tsp'):
            if fix_patch_decorator(tsp_file):
                fixed_files.append(tsp_file)
                print(f"✓ Fixed: {tsp_file}")
            else:
                unchanged_files.append(tsp_file)

    # Summary
    print("\n" + "="*60)
    print("Summary:")
    print(f"  Files fixed: {len(fixed_files)}")
    print(f"  Files unchanged: {len(unchanged_files)}")
    print("="*60)

    if fixed_files:
        print("\nFixed files:")
        for file in fixed_files:
            print(f"  - {file}")

    if len(fixed_files) == 39:
        print("\n✓ All 39 expected files have been fixed!")
    elif len(fixed_files) > 0:
        print(f"\n⚠ Expected 39 files but only fixed {len(fixed_files)}")

if __name__ == '__main__':
    main()
