# OMOP CDM v5.4 TypeSpec API

This directory contains a comprehensive RESTful API specification for the OMOP Common Data Model (CDM) v5.4, built using TypeSpec.

## Overview

The OMOP CDM is a standardized data model for organizing and storing observational health data. This TypeSpec API provides programmatic access to all 39 tables in the OMOP CDM v5.4 with full CRUD operations, comprehensive documentation, and OpenAPI 3.0 generation.

## Directory Structure

```
tsp/
├── main.tsp                     # Main API entry point
├── common/
│   ├── models.tsp              # Shared models (pagination, errors, common types)
│   └── operations.tsp          # (Reserved for future operation templates)
├── clinical/                    # 14 clinical data tables
│   ├── person.tsp
│   ├── observation-period.tsp
│   ├── visit-occurrence.tsp
│   ├── visit-detail.tsp
│   ├── condition-occurrence.tsp
│   ├── drug-exposure.tsp
│   ├── procedure-occurrence.tsp
│   ├── device-exposure.tsp
│   ├── measurement.tsp
│   ├── observation.tsp
│   ├── death.tsp
│   ├── note.tsp
│   ├── note-nlp.tsp
│   └── specimen.tsp
├── health-system/              # 5 health system tables
│   ├── location.tsp
│   ├── care-site.tsp
│   ├── provider.tsp
│   ├── payer-plan-period.tsp
│   └── cost.tsp
├── derived/                     # 5 derived/era tables
│   ├── drug-era.tsp
│   ├── dose-era.tsp
│   ├── condition-era.tsp
│   ├── episode.tsp
│   └── episode-event.tsp
├── metadata/                    # 2 metadata tables
│   ├── metadata.tsp
│   └── cdm-source.tsp
├── vocabulary/                  # 10 vocabulary tables
│   ├── concept.tsp
│   ├── vocabulary.tsp
│   ├── domain.tsp
│   ├── concept-class.tsp
│   ├── concept-relationship.tsp
│   ├── relationship.tsp
│   ├── concept-synonym.tsp
│   ├── concept-ancestor.tsp
│   ├── source-to-concept-map.tsp
│   └── drug-strength.tsp
└── results/                     # 3 results/cohort tables
    ├── cohort.tsp
    ├── cohort-definition.tsp
    └── fact-relationship.tsp
```

## Features

### API Coverage
- **39 Resource Endpoints**: One for each OMOP CDM v5.4 table
- **Full CRUD Operations**: Create, Read, Update, Patch, Delete for all resources
- **Pagination Support**: Offset/limit-based pagination for list operations
- **Rich Filtering**: Query parameters for filtering by key fields
- **Sorting**: Configurable sort fields and order

### Documentation
- **Comprehensive Field Documentation**: Every field includes User Guide and ETL Conventions from the OMOP specification
- **Table Descriptions**: Detailed explanations of each table's purpose and usage
- **Foreign Key References**: Clear indication of relationships between tables
- **Constraints**: Primary keys, foreign keys, required fields, and data type specifications

### Common Models
- **Pagination**: Standard pagination parameters and response metadata
- **Error Handling**: Standardized error responses with validation details
- **OMOP-Specific Types**: ConceptId, DateOnly, DateTime custom scalars
- **Batch Operations**: Support for bulk create/update operations (defined in common models)

## Usage

### Prerequisites
```bash
npm install -g @typespec/compiler @typespec/http @typespec/rest @typespec/openapi3
```

### Compiling the TypeSpec
```bash
# Compile TypeSpec to OpenAPI 3.1
tsp compile tsp/main.tsp

# Output will be generated in tsp-output/openapi/
```

### Generating Client SDKs
Once compiled to OpenAPI, you can use various tools to generate client SDKs:

```bash
# Example: Generate TypeScript client using openapi-generator
openapi-generator-cli generate \
  -i tsp-output/openapi/openapi.yaml \
  -g typescript-fetch \
  -o clients/typescript

# Example: Generate Python client
openapi-generator-cli generate \
  -i tsp-output/openapi/openapi.yaml \
  -g python \
  -o clients/python
```

## API Structure

### Resource Pattern
Each resource follows a consistent pattern:

```typespec
// Model definition with full field documentation
model ResourceName {
  @doc("Field documentation from OMOP spec")
  @visibility("read")  // For auto-generated IDs
  resource_id: int64;

  // ... other fields
}

// Create model (excludes auto-generated fields)
model ResourceNameCreate { ... }

// Update model (all fields optional)
model ResourceNameUpdate { ... }

// Query parameters
model ResourceNameQueryParams {
  ...PaginationParams;
  // Filterable fields
}

// API operations
@route("/resource-names")
@tag("Category - ResourceNames")
interface ResourceNames {
  @get list(...QueryParams): PaginatedList<ResourceName> | ErrorResponse;
  @get read(@path id: int64): ResourceName | ErrorResponse;
  @post create(@body): ResourceName | ErrorResponse;
  @put update(@path id, @body): ResourceName | ErrorResponse;
  @patch patch(@path id, @body): ResourceName | ErrorResponse;
  @delete delete(@path id): void | ErrorResponse;
}
```

### Example Request/Response

**List Persons with Filtering:**
```http
GET /persons?gender_concept_id=8507&limit=10&offset=0
```

**Response:**
```json
{
  "data": [
    {
      "person_id": 12345,
      "gender_concept_id": 8507,
      "year_of_birth": 1975,
      "race_concept_id": 8527,
      "ethnicity_concept_id": 38003564
    }
  ],
  "pagination": {
    "total": 1000,
    "offset": 0,
    "limit": 10,
    "count": 10
  }
}
```

## Generator Script

The `generate_typespec.py` script was used to automatically generate all 39 resource files from the OMOP CDM markdown specification:

```bash
# Regenerate all TypeSpec files from omop.md
python3 generate_typespec.py

# Run tests
python3 test_generator.py
```

### Generator Features
- **Automatic Field Mapping**: Converts OMOP datatypes to TypeSpec types
- **Documentation Extraction**: Pulls User Guide and ETL Conventions from spec
- **Foreign Key Detection**: Identifies and documents table relationships
- **Category Classification**: Organizes tables into logical groups
- **Consistent Patterns**: Ensures all resources follow the same structure

## References

- [OMOP CDM v5.4 Specification](https://ohdsi.github.io/CommonDataModel/)
- [TypeSpec Documentation](https://typespec.io/)
- [OHDSI Community](https://ohdsi.org/)

## Files

### Core Files
- `tsp/main.tsp` - Main API service definition with all imports
- `tsp/common/models.tsp` - Shared types and models
- `generate_typespec.py` - Generator script for creating TypeSpec from markdown
- `test_generator.py` - Unit tests for the generator
- `html_to_markdown.py` - HTML to Markdown converter for OMOP spec
- `omop.md` - Markdown version of OMOP CDM v5.4 specification

### Generated Files
- 39 `.tsp` files across 6 categories (clinical, health-system, derived, metadata, vocabulary, results)
- Each file contains complete CRUD operations with rich documentation

## Contributing

When adding new tables or updating existing ones:

1. Update `omop.md` with the latest OMOP CDM specification
2. Run `python3 generate_typespec.py` to regenerate TypeSpec files
3. Run `python3 test_generator.py` to verify generation
4. Compile with `tsp compile tsp/main.tsp` to check for errors
5. Review the generated OpenAPI specification

## License

This API specification is based on the OMOP Common Data Model, which is licensed under Apache 2.0.
See the [OHDSI CommonDataModel repository](https://github.com/OHDSI/CommonDataModel) for details.
