#!/usr/bin/env python3
"""
TypeSpec Generator for OMOP CDM v5.4

This script generates TypeSpec API definitions from the OMOP CDM v5.4 markdown specification.
It creates separate .tsp files for each table with complete CRUD operations, documentation,
and examples.

Usage:
    python3 generate_typespec.py
"""

import re
from pathlib import Path
from typing import List, Dict, Optional, Tuple

class Field:
    def __init__(self, name: str, datatype: str, required: bool, is_pk: bool,
                 user_guide: str, etl_conventions: str, fk_table: str = "", fk_domain: str = ""):
        self.name = name
        self.datatype = datatype
        self.required = required
        self.is_pk = is_pk
        self.user_guide = user_guide.strip()
        self.etl_conventions = etl_conventions.strip()
        self.fk_table = fk_table.strip()
        self.fk_domain = fk_domain.strip()

    def to_typespec_type(self) -> str:
        """Convert OMOP datatype to TypeSpec type"""
        type_map = {
            'integer': 'int64',
            'int': 'int64',
            'float': 'float64',
            'date': 'DateOnly',
            'datetime': 'DateTime',
            'time': 'TimeOnly',
        }

        # Handle varchar
        if 'varchar' in self.datatype.lower():
            return 'string'

        datatype_lower = self.datatype.lower()
        return type_map.get(datatype_lower, 'string')

    def is_concept_id(self) -> bool:
        """Check if field is a concept_id"""
        return 'concept_id' in self.name.lower()

    def generate_doc(self) -> str:
        """Generate @doc annotation"""
        doc_parts = []
        if self.user_guide:
            doc_parts.append(self.user_guide)
        if self.etl_conventions:
            if doc_parts:
                doc_parts.append(f"\n\nETL Convention: {self.etl_conventions}")
            else:
                doc_parts.append(self.etl_conventions)
        if self.fk_table:
            if doc_parts:
                doc_parts.append(f" References {self.fk_table} table.")
            else:
                doc_parts.append(f"References {self.fk_table} table.")

        doc = ' '.join(doc_parts)
        # Escape quotes
        doc = doc.replace('"', '\\"')
        return f'  @doc("{doc}")'

    def generate_field_definition(self, for_create: bool = False) -> str:
        """Generate TypeSpec field definition"""
        lines = []

        # Add documentation
        lines.append(self.generate_doc())

        # Add decorators
        if self.is_pk and not for_create:
            lines.append('  @visibility("read")')

        if 'varchar' in self.datatype.lower():
            match = re.search(r'varchar\((\d+)\)', self.datatype.lower())
            if match:
                max_length = match.group(1)
                lines.append(f'  @maxLength({max_length})')

        # Field type
        if self.is_concept_id():
            ts_type = 'ConceptId'
        else:
            ts_type = self.to_typespec_type()

        # Optional marker
        optional = '?' if not self.required or for_create and self.is_pk else ''

        # Generate field
        lines.append(f'  {self.name}{optional}: {ts_type};')

        return '\n'.join(lines)


class Table:
    def __init__(self, name: str, description: str, user_guide: str, etl_conventions: str):
        self.name = name
        self.description = description.strip()
        self.user_guide = user_guide.strip()
        self.etl_conventions = etl_conventions.strip()
        self.fields: List[Field] = []
        self.category = self.determine_category()

    def determine_category(self) -> str:
        """Determine which category this table belongs to"""
        clinical_tables = {
            'person', 'observation_period', 'visit_occurrence', 'visit_detail',
            'condition_occurrence', 'drug_exposure', 'procedure_occurrence',
            'device_exposure', 'measurement', 'observation', 'death', 'note',
            'note_nlp', 'specimen'
        }
        health_system_tables = {
            'location', 'care_site', 'provider', 'payer_plan_period', 'cost'
        }
        derived_tables = {
            'drug_era', 'dose_era', 'condition_era', 'episode', 'episode_event'
        }
        metadata_tables = {'metadata', 'cdm_source'}
        vocabulary_tables = {
            'concept', 'vocabulary', 'domain', 'concept_class',
            'concept_relationship', 'relationship', 'concept_synonym',
            'concept_ancestor', 'source_to_concept_map', 'drug_strength'
        }
        results_tables = {
            'cohort', 'cohort_definition', 'fact_relationship'
        }

        if self.name in clinical_tables:
            return 'clinical'
        elif self.name in health_system_tables:
            return 'health-system'
        elif self.name in derived_tables:
            return 'derived'
        elif self.name in metadata_tables:
            return 'metadata'
        elif self.name in vocabulary_tables:
            return 'vocabulary'
        elif self.name in results_tables:
            return 'results'
        else:
            return 'clinical'  # default

    def get_pk_field(self) -> Optional[Field]:
        """Get the primary key field"""
        for field in self.fields:
            if field.is_pk:
                return field
        return None

    def get_required_fields(self) -> List[Field]:
        """Get all required fields except PK"""
        return [f for f in self.fields if f.required and not f.is_pk]

    def generate_typespec(self) -> str:
        """Generate complete TypeSpec file for this table"""
        model_name = ''.join(word.capitalize() for word in self.name.split('_'))
        route_name = self.name.replace('_', '-')

        # Get primary key field name
        pk_field = self.get_pk_field()
        pk_name = pk_field.name if pk_field else f"{self.name}_id"
        pk_type = pk_field.to_typespec_type() if pk_field else "int64"

        # Prepare tag name
        category_display = self.category.replace('-', ' ').title()
        tag_name = f"{category_display} - {model_name}s"

        # Create example data
        example = self.generate_example()

        typespec = f'''import "@typespec/http";
import "@typespec/rest";
import "../common/models.tsp";

using TypeSpec.Http;
using TypeSpec.Rest;
using OmopCdm.Common;

namespace OmopCdm.{self.category.replace('-', '').title()};

/**
 * {model_name} Resource
 *
 * {self.description}
 *
 * **User Guide**: {self.user_guide}
 *
 * **ETL Conventions**: {self.etl_conventions}
 */

@doc("{model_name} record in the OMOP CDM")
@example({example})
model {model_name} {{
{self.generate_model_fields()}
}}

/**
 * {model_name} creation request
 */
@doc("Request body for creating a new {model_name} record")
model {model_name}Create {{
{self.generate_create_fields()}
}}

/**
 * {model_name} update request
 */
@doc("Request body for updating an existing {model_name} record")
model {model_name}Update {{
{self.generate_update_fields()}
}}

/**
 * Query parameters for filtering {route_name}
 */
@doc("Filter parameters for {model_name} list operations")
model {model_name}QueryParams {{
  ...PaginationParams;

{self.generate_query_params()}

  @doc("Sort field")
  @query
  sort_by?: "{pk_name}";

  @doc("Sort order")
  @query
  sort_order?: SortOrder;
}}

/**
 * {model_name} API operations
 */
@route("/{route_name}s")
@tag("{tag_name}")
interface {model_name}s {{
  @get
  @summary("List all {route_name}s")
  @doc("Returns a paginated list of {model_name} records.")
  list(
    ...{model_name}QueryParams,
  ): {{
    @statusCode statusCode: 200;
    @body body: PaginatedList<{model_name}>;
  }} | ErrorResponse;

  @get
  @summary("Get {route_name} by ID")
  @doc("Retrieve a single {model_name} record by its unique identifier.")
  read(
    @path
    @doc("Unique {route_name} identifier")
    {pk_name}: {pk_type},
  ): {{
    @statusCode statusCode: 200;
    @body body: {model_name};
  }} | {{
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  }} | ErrorResponse;

  @post
  @summary("Create a new {route_name}")
  @doc("Create a new {model_name} record.")
  create(
    @body
    @doc("{model_name} data to create")
    record: {model_name}Create,
  ): {{
    @statusCode statusCode: 201;
    @body body: {model_name};
  }} | {{
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  }} | ErrorResponse;

  @put
  @summary("Update {route_name} (full replacement)")
  @doc("Replace all fields of an existing {model_name} record.")
  update(
    @path
    @doc("Unique {route_name} identifier")
    {pk_name}: {pk_type},

    @body
    @doc("Complete {route_name} data")
    record: {model_name}Create,
  ): {{
    @statusCode statusCode: 200;
    @body body: {model_name};
  }} | {{
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  }} | {{
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  }} | ErrorResponse;

  @patch
  @summary("Update {route_name} (partial)")
  @doc("Update specific fields of an existing {model_name} record.")
  patch(
    @path
    @doc("Unique {route_name} identifier")
    {pk_name}: {pk_type},

    @body
    @doc("Fields to update")
    record: {model_name}Update,
  ): {{
    @statusCode statusCode: 200;
    @body body: {model_name};
  }} | {{
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  }} | ErrorResponse;

  @delete
  @summary("Delete {route_name}")
  @doc("Delete a {model_name} record.")
  delete(
    @path
    @doc("Unique {route_name} identifier")
    {pk_name}: {pk_type},
  ): {{
    @statusCode statusCode: 204;
  }} | {{
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  }} | ErrorResponse;
}}
'''
        return typespec

    def generate_model_fields(self) -> str:
        """Generate model field definitions"""
        return '\n\n'.join(f.generate_field_definition() for f in self.fields)

    def generate_create_fields(self) -> str:
        """Generate create model fields"""
        lines = []
        for field in self.fields:
            if field.is_pk:
                continue  # Skip PK in create
            lines.append(field.generate_field_definition(for_create=True))
        return '\n\n'.join(lines) if lines else '  // Auto-generated fields only'

    def generate_update_fields(self) -> str:
        """Generate update model fields (all optional)"""
        lines = []
        for field in self.fields:
            if field.is_pk:
                continue
            doc = field.generate_doc()
            ts_type = 'ConceptId' if field.is_concept_id() else field.to_typespec_type()
            lines.append(f'{doc}\n  {field.name}?: {ts_type};')
        return '\n\n'.join(lines) if lines else '  // No updatable fields'

    def generate_query_params(self) -> str:
        """Generate query parameters for filtering"""
        lines = []
        for field in self.fields:
            if field.is_pk:
                continue
            # Add filters for concept_ids and foreign keys
            if field.is_concept_id() or field.fk_table:
                doc = f'  @doc("Filter by {field.name.replace("_", " ")}")'
                ts_type = 'ConceptId' if field.is_concept_id() else field.to_typespec_type()
                lines.append(f'{doc}\n  @query\n  {field.name}?: {ts_type};')

        return '\n\n'.join(lines) if lines else '  // No filterable fields'

    def generate_example(self) -> str:
        """Generate example data"""
        examples = {}
        for field in self.fields:
            if field.is_pk:
                examples[field.name] = 12345
            elif field.is_concept_id():
                examples[field.name] = 8507
            elif field.datatype.lower() == 'integer' or field.datatype.lower() == 'int':
                examples[field.name] = 100
            elif 'date' in field.datatype.lower():
                examples[field.name] = '"2023-01-15"'
            elif 'time' in field.datatype.lower():
                examples[field.name] = '"14:30:00"'
            elif field.datatype.lower() == 'float':
                examples[field.name] = 98.6
            else:
                examples[field.name] = '"Example value"'

        example_str = ',\n  '.join(f'{k}: {v}' for k, v in examples.items())
        return f'#{{\\n  {example_str}\\n}}'


def parse_omop_md(file_path: str) -> List[Table]:
    """Parse the OMOP markdown file and extract table definitions"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    tables = []

    # Find all table sections
    table_pattern = r'### ([a-z_]+)\n\n\n\*\*Table Description\*\*\s*\n\n(.*?)\n\n\*\*User Guide\*\*\s*\n\n(.*?)\n\n\*\*ETL Conventions\*\*\s*\n\n(.*?)\n\n\| CDM Field'

    for match in re.finditer(table_pattern, content, re.DOTALL):
        table_name = match.group(1)
        description = match.group(2).strip()
        user_guide = match.group(3).strip()
        etl_conventions = match.group(4).strip()

        # Skip "Current Support for CDM v5.4" section
        if table_name == "Current Support for CDM v5.4":
            continue

        table = Table(table_name, description, user_guide, etl_conventions)

        # Find the field table for this table
        field_table_start = match.end()
        field_table_end = content.find('\n### ', field_table_start)
        if field_table_end == -1:
            field_table_end = len(content)

        field_section = content[field_table_start:field_table_end]

        # Parse field table rows
        field_rows = re.findall(r'\| ([a-z_]+) \| (.*?) \| (.*?) \| (.*?) \| (.*?) \| (.*?) \| (.*?) \| (.*?) \| (.*?) \|', field_section)

        for row in field_rows:
            field_name = row[0].strip()
            user_guide = row[1].strip()
            etl_conv = row[2].strip()
            datatype = row[3].strip()
            required = row[4].strip().lower() == 'yes'
            is_pk = row[5].strip().lower() == 'yes'
            is_fk = row[6].strip().lower() == 'yes'
            fk_table = row[7].strip() if is_fk else ''
            fk_domain = row[8].strip()

            field = Field(field_name, datatype, required, is_pk, user_guide, etl_conv, fk_table, fk_domain)
            table.fields.append(field)

        tables.append(table)

    return tables


def main():
    """Main function to generate TypeSpec files"""
    print("Parsing omop.md...")
    tables = parse_omop_md('omop.md')

    print(f"Found {len(tables)} tables")

    # Create output directories if they don't exist
    base_dir = Path('tsp')

    # Generate TypeSpec files
    for table in tables:
        category_dir = base_dir / table.category
        category_dir.mkdir(parents=True, exist_ok=True)

        filename = f"{table.name.replace('_', '-')}.tsp"
        filepath = category_dir / filename

        print(f"Generating {filepath}...")
        typespec_content = table.generate_typespec()

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(typespec_content)

    print(f"\nSuccessfully generated {len(tables)} TypeSpec files!")
    print("\nFiles organized by category:")
    for category in ['clinical', 'health-system', 'derived', 'metadata', 'vocabulary', 'results']:
        category_tables = [t for t in tables if t.category == category]
        if category_tables:
            print(f"  {category}: {len(category_tables)} tables")


if __name__ == '__main__':
    main()
