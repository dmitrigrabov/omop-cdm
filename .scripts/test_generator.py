#!/usr/bin/env python3
"""
Unit tests for the TypeSpec generator

Run with: python3 -m pytest test_generator.py -v
Or simply: python3 test_generator.py
"""

import unittest
import tempfile
import os
from pathlib import Path
from generate_typespec import Field, Table, parse_omop_md


class TestField(unittest.TestCase):
    """Test the Field class"""

    def test_to_typespec_type_integer(self):
        """Test integer type conversion"""
        field = Field("test_id", "integer", True, True, "Test field", "")
        self.assertEqual(field.to_typespec_type(), "int64")

    def test_to_typespec_type_varchar(self):
        """Test varchar type conversion"""
        field = Field("test_value", "varchar(50)", False, False, "Test field", "")
        self.assertEqual(field.to_typespec_type(), "string")

    def test_to_typespec_type_date(self):
        """Test date type conversion"""
        field = Field("test_date", "date", False, False, "Test field", "")
        self.assertEqual(field.to_typespec_type(), "DateOnly")

    def test_to_typespec_type_datetime(self):
        """Test datetime type conversion"""
        field = Field("test_datetime", "datetime", False, False, "Test field", "")
        self.assertEqual(field.to_typespec_type(), "DateTime")

    def test_to_typespec_type_float(self):
        """Test float type conversion"""
        field = Field("test_value", "float", False, False, "Test field", "")
        self.assertEqual(field.to_typespec_type(), "float64")

    def test_is_concept_id(self):
        """Test concept_id detection"""
        field1 = Field("gender_concept_id", "integer", True, False, "Test", "")
        field2 = Field("person_id", "integer", True, True, "Test", "")
        self.assertTrue(field1.is_concept_id())
        self.assertFalse(field2.is_concept_id())

    def test_generate_doc(self):
        """Test documentation generation"""
        field = Field(
            "test_field",
            "integer",
            True,
            False,
            "This is a user guide",
            "This is an ETL convention",
            "CONCEPT",
            "Type"
        )
        doc = field.generate_doc()
        self.assertIn("This is a user guide", doc)
        self.assertIn("ETL Convention: This is an ETL convention", doc)
        self.assertIn("References CONCEPT table", doc)

    def test_generate_field_definition(self):
        """Test field definition generation"""
        field = Field("person_id", "integer", True, True, "Unique identifier", "Auto-generated")
        definition = field.generate_field_definition()
        self.assertIn("@doc", definition)
        # PK fields are read-only by design (excluded from Create models), no @visibility decorator needed
        self.assertIn("person_id: int64", definition)

    def test_generate_field_definition_varchar_with_maxlength(self):
        """Test varchar field with maxLength decorator"""
        field = Field("name", "varchar(100)", False, False, "Person name", "")
        definition = field.generate_field_definition()
        self.assertIn("@maxLength(100)", definition)
        self.assertIn("name?: string", definition)


class TestTable(unittest.TestCase):
    """Test the Table class"""

    def test_determine_category_clinical(self):
        """Test clinical category determination"""
        table = Table("person", "Person table", "User guide", "ETL conventions")
        self.assertEqual(table.category, "clinical")

    def test_determine_category_vocabulary(self):
        """Test vocabulary category determination"""
        table = Table("concept", "Concept table", "User guide", "ETL conventions")
        self.assertEqual(table.category, "vocabulary")

    def test_determine_category_health_system(self):
        """Test health-system category determination"""
        table = Table("location", "Location table", "User guide", "ETL conventions")
        self.assertEqual(table.category, "health-system")

    def test_determine_category_derived(self):
        """Test derived category determination"""
        table = Table("drug_era", "Drug era table", "User guide", "ETL conventions")
        self.assertEqual(table.category, "derived")

    def test_determine_category_metadata(self):
        """Test metadata category determination"""
        table = Table("cdm_source", "CDM source table", "User guide", "ETL conventions")
        self.assertEqual(table.category, "metadata")

    def test_determine_category_results(self):
        """Test results category determination"""
        table = Table("cohort", "Cohort table", "User guide", "ETL conventions")
        self.assertEqual(table.category, "results")

    def test_get_pk_field(self):
        """Test primary key field retrieval"""
        table = Table("person", "Person table", "User guide", "ETL")
        table.fields = [
            Field("person_id", "integer", True, True, "PK", ""),
            Field("name", "varchar(50)", False, False, "Name", "")
        ]
        pk_field = table.get_pk_field()
        self.assertIsNotNone(pk_field)
        self.assertEqual(pk_field.name, "person_id")

    def test_get_required_fields(self):
        """Test required fields retrieval"""
        table = Table("person", "Person table", "User guide", "ETL")
        table.fields = [
            Field("person_id", "integer", True, True, "PK", ""),
            Field("gender_concept_id", "integer", True, False, "Gender", ""),
            Field("year_of_birth", "integer", True, False, "Birth year", ""),
            Field("location_id", "integer", False, False, "Location", "")
        ]
        required = table.get_required_fields()
        self.assertEqual(len(required), 2)
        self.assertTrue(all(f.required and not f.is_pk for f in required))

    def test_generate_typespec_structure(self):
        """Test TypeSpec generation structure"""
        table = Table("person", "Person table", "All persons", "One record per person")
        table.fields = [
            Field("person_id", "integer", True, True, "Unique ID", "Auto-generated"),
            Field("gender_concept_id", "integer", True, False, "Gender", "", "CONCEPT", "Gender")
        ]

        typespec = table.generate_typespec()

        # Check for key components
        self.assertIn("namespace OmopCdm.Clinical", typespec)
        self.assertIn("model Person {", typespec)
        self.assertIn("model PersonCreate {", typespec)
        self.assertIn("model PersonUpdate {", typespec)
        self.assertIn("model PersonQueryParams {", typespec)
        self.assertIn("interface Persons {", typespec)
        self.assertIn("@route(\"/persons\")", typespec)
        self.assertIn("@tag(\"Clinical - Persons\")", typespec)

        # Check for CRUD operations
        self.assertIn("@get", typespec)
        self.assertIn("@post", typespec)
        self.assertIn("@put", typespec)
        self.assertIn("@patch", typespec)
        self.assertIn("@delete", typespec)

        # Check for proper model fields
        self.assertIn("person_id: int64", typespec)
        self.assertIn("gender_concept_id: ConceptId", typespec)

    def test_generate_example(self):
        """Test example generation"""
        table = Table("person", "Person table", "User guide", "ETL")
        table.fields = [
            Field("person_id", "integer", True, True, "PK", ""),
            Field("name", "varchar(50)", False, False, "Name", ""),
            Field("birth_date", "date", False, False, "Birth date", "")
        ]
        example = table.generate_example()
        self.assertIn("person_id: 12345", example)
        self.assertIn("name:", example)
        self.assertIn("birth_date:", example)


class TestParseOmopMd(unittest.TestCase):
    """Test the parse_omop_md function"""

    def test_parse_omop_md(self):
        """Test parsing of actual omop.md file"""
        if not os.path.exists('../omop.md'):
            self.skipTest("omop.md file not found")

        tables = parse_omop_md('../omop.md')

        # Check that we parsed tables
        self.assertGreater(len(tables), 0)
        self.assertLess(len(tables), 50)  # Should be around 39 tables

        # Check that known tables exist
        table_names = [t.name for t in tables]
        self.assertIn('person', table_names)
        self.assertIn('observation_period', table_names)
        self.assertIn('concept', table_names)

        # Check that tables have fields
        for table in tables:
            self.assertGreater(len(table.fields), 0, f"Table {table.name} has no fields")

        # Check specific table structure (person)
        person_table = next(t for t in tables if t.name == 'person')
        self.assertEqual(person_table.category, 'clinical')
        self.assertGreater(len(person_table.fields), 10)

        field_names = [f.name for f in person_table.fields]
        self.assertIn('person_id', field_names)
        self.assertIn('gender_concept_id', field_names)
        self.assertIn('year_of_birth', field_names)

    def test_field_parsing(self):
        """Test that fields are parsed correctly"""
        if not os.path.exists('../omop.md'):
            self.skipTest("omop.md file not found")

        tables = parse_omop_md('../omop.md')
        person_table = next(t for t in tables if t.name == 'person')

        # Find person_id field
        person_id = next(f for f in person_table.fields if f.name == 'person_id')
        self.assertTrue(person_id.required)
        self.assertTrue(person_id.is_pk)
        self.assertIn('integer', person_id.datatype.lower())

        # Find gender_concept_id field
        gender = next(f for f in person_table.fields if f.name == 'gender_concept_id')
        self.assertTrue(gender.required)
        self.assertFalse(gender.is_pk)
        self.assertEqual(gender.fk_table, 'CONCEPT')


class TestIntegration(unittest.TestCase):
    """Integration tests"""

    def test_full_generation_workflow(self):
        """Test the full generation workflow"""
        if not os.path.exists('../omop.md'):
            self.skipTest("omop.md file not found")

        # Parse
        tables = parse_omop_md('../omop.md')
        self.assertGreater(len(tables), 0)

        # Generate TypeSpec for one table
        table = tables[0]
        typespec = table.generate_typespec()

        # Verify it's valid TypeSpec-like structure
        self.assertIn('import "@typespec/http"', typespec)
        self.assertIn('import "@typespec/rest"', typespec)
        self.assertIn('model ', typespec)
        self.assertIn('interface ', typespec)

        # Verify it has CRUD operations
        self.assertIn('@get', typespec)
        self.assertIn('@post', typespec)
        self.assertIn('@put', typespec)
        self.assertIn('@patch', typespec)
        self.assertIn('@delete', typespec)


def run_tests():
    """Run all tests"""
    loader = unittest.TestLoader()
    suite = unittest.TestSuite()

    # Add all test classes
    suite.addTests(loader.loadTestsFromTestCase(TestField))
    suite.addTests(loader.loadTestsFromTestCase(TestTable))
    suite.addTests(loader.loadTestsFromTestCase(TestParseOmopMd))
    suite.addTests(loader.loadTestsFromTestCase(TestIntegration))

    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)

    return result.wasSuccessful()


if __name__ == '__main__':
    success = run_tests()
    exit(0 if success else 1)
