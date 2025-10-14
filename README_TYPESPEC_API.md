# OMOP CDM v5.4 TypeSpec API

This directory contains a comprehensive RESTful API specification for the OMOP Common Data Model (CDM) v5.4, built using TypeSpec.

## Overview

The OMOP CDM is a standardized data model for organizing and storing observational health data. This TypeSpec API provides programmatic access to all 39 tables in the OMOP CDM v5.4 with full CRUD operations, comprehensive documentation, and OpenAPI 3.0 generation.

### Status

✅ **Ready for Production**
- All 39 resources fully implemented
- Clean compilation with zero warnings
- OpenAPI 3.0.0 specification generated (16,742 lines)
- Complete test coverage (22 tests passing)

## Directory Structure

```
omop-cdm/
├── .scripts/                    # Python scripts for generation and maintenance
│   ├── generate_typespec.py   # Generates TypeSpec from omop.md
│   ├── test_generator.py      # Unit tests for the generator
│   ├── html_to_markdown.py    # Converts OMOP HTML spec to Markdown
│   └── fix_patch_decorators.py # Utility to fix @patch decorators
├── tsp/                         # TypeSpec API definitions
│   ├── main.tsp                # Main API entry point with service config
│   ├── common/
│   │   └── models.tsp          # Shared models (pagination, errors, types)
│   ├── clinical/               # 14 clinical data tables
│   │   ├── person.tsp
│   │   ├── observation-period.tsp
│   │   ├── visit-occurrence.tsp
│   │   ├── visit-detail.tsp
│   │   ├── condition-occurrence.tsp
│   │   ├── drug-exposure.tsp
│   │   ├── procedure-occurrence.tsp
│   │   ├── device-exposure.tsp
│   │   ├── measurement.tsp
│   │   ├── observation.tsp
│   │   ├── death.tsp
│   │   ├── note.tsp
│   │   ├── note-nlp.tsp
│   │   └── specimen.tsp
│   ├── health-system/          # 5 health system tables
│   │   ├── location.tsp
│   │   ├── care-site.tsp
│   │   ├── provider.tsp
│   │   ├── payer-plan-period.tsp
│   │   └── cost.tsp
│   ├── derived/                # 5 derived/era tables
│   │   ├── drug-era.tsp
│   │   ├── dose-era.tsp
│   │   ├── condition-era.tsp
│   │   ├── episode.tsp
│   │   └── episode-event.tsp
│   ├── metadata/               # 2 metadata tables
│   │   ├── metadata.tsp
│   │   └── cdm-source.tsp
│   ├── vocabulary/             # 10 vocabulary tables
│   │   ├── concept.tsp
│   │   ├── vocabulary.tsp
│   │   ├── domain.tsp
│   │   ├── concept-class.tsp
│   │   ├── concept-relationship.tsp
│   │   ├── relationship.tsp
│   │   ├── concept-synonym.tsp
│   │   ├── concept-ancestor.tsp
│   │   ├── source-to-concept-map.tsp
│   │   └── drug-strength.tsp
│   └── results/                # 3 results/cohort tables
│       ├── cohort.tsp
│       ├── cohort-definition.tsp
│       └── fact-relationship.tsp
├── tsp-output/                  # Compiled OpenAPI specifications
│   └── openapi/
│       └── openapi.yaml        # OpenAPI 3.0.0 specification
├── omop.html                    # Source OMOP CDM v5.4 HTML spec
├── omop.md                      # Markdown version of OMOP spec
├── tspconfig.yaml               # TypeSpec compiler configuration
├── package.json                 # Node.js dependencies
└── README_TYPESPEC_API.md      # This file
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
# Install TypeSpec compiler and dependencies
npm install

# Or install globally
npm install -g @typespec/compiler @typespec/http @typespec/rest @typespec/openapi3
```

### Compiling the TypeSpec
```bash
# Compile TypeSpec to OpenAPI 3.0
tsp compile tsp/main.tsp --output-dir tsp-output

# Output will be generated in tsp-output/openapi/openapi.yaml
# Compilation completes with zero warnings
```

### Viewing the OpenAPI Specification
```bash
# Check the generated OpenAPI file
cat tsp-output/openapi/openapi.yaml | head -30

# View file statistics
wc -l tsp-output/openapi/openapi.yaml  # 16,742 lines
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
  resource_id: int64;  // Primary key

  @doc("Foreign key reference")
  concept_id: ConceptId;  // OMOP concept reference

  // ... other fields with rich documentation
}

// Create model (excludes auto-generated fields like primary keys)
model ResourceNameCreate { ... }

// Update model (all fields optional for partial updates)
model ResourceNameUpdate { ... }

// Query parameters with filterable fields
model ResourceNameQueryParams {
  ...PaginationParams;
  @query concept_id?: ConceptId;
  // ... other filterable fields
}

// API operations with full CRUD support
@route("/resource-names")
@tag("Category - ResourceNames")
interface ResourceNames {
  @get list(...QueryParams): PaginatedList<ResourceName> | ErrorResponse;
  @get read(@path id: int64): ResourceName | ErrorResponse;
  @post create(@body): ResourceName | ErrorResponse;
  @put update(@path id, @body): ResourceName | ErrorResponse;
  @patch(#{implicitOptionality: true}) patch(@path id, @body): ResourceName | ErrorResponse;
  @delete delete(@path id): void | ErrorResponse;
}
```

**Note**: The `@patch(#{implicitOptionality: true})` decorator ensures that PATCH operations correctly treat all fields as optional, following RFC 7396 JSON Merge Patch semantics.

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

## Python Scripts

All Python scripts are located in the `.scripts/` directory for better organization.

### Generator Script

The `generate_typespec.py` script automatically generates all 39 resource files from the OMOP CDM markdown specification:

```bash
cd .scripts

# Regenerate all TypeSpec files from omop.md
python3 generate_typespec.py

# Run tests
python3 test_generator.py
```

**Generator Features:**
- **Automatic Field Mapping**: Converts OMOP datatypes to TypeSpec types
- **Documentation Extraction**: Pulls User Guide and ETL Conventions from spec
- **Foreign Key Detection**: Identifies and documents table relationships
- **Category Classification**: Organizes tables into logical groups
- **Consistent Patterns**: Ensures all resources follow the same structure

### HTML to Markdown Converter

The `html_to_markdown.py` script converts the OMOP CDM HTML specification to Markdown format:

```bash
cd .scripts
python3 html_to_markdown.py ../omop.html ../omop.md
```

### Patch Decorator Fix Script

The `fix_patch_decorators.py` script updates all @patch decorators to use TypeSpec 1.0+ syntax:

```bash
cd .scripts
python3 fix_patch_decorators.py
```

This ensures compatibility with TypeSpec 1.0.0+ by adding `#{implicitOptionality: true}` to all PATCH operations.

## References

- [OMOP CDM v5.4 Specification](https://ohdsi.github.io/CommonDataModel/)
- [TypeSpec Documentation](https://typespec.io/)
- [OHDSI Community](https://ohdsi.org/)

## Files

### Core TypeSpec Files
- `tsp/main.tsp` - Main API service definition with all imports and service configuration
- `tsp/common/models.tsp` - Shared types, models, pagination, and error handling
- `tspconfig.yaml` - TypeSpec compiler configuration (targets OpenAPI 3.0.0)
- `package.json` - Node.js dependencies for TypeSpec compiler

### Generated TypeSpec Files
- **39 resource files** across 6 categories:
  - `tsp/clinical/` - 14 clinical data tables
  - `tsp/health-system/` - 5 health system tables
  - `tsp/derived/` - 5 derived/era tables
  - `tsp/metadata/` - 2 metadata tables
  - `tsp/vocabulary/` - 10 vocabulary tables
  - `tsp/results/` - 3 results/cohort tables
- Each file contains complete CRUD operations with rich documentation

### Python Scripts (`.scripts/`)
- `generate_typespec.py` - Generates TypeSpec from omop.md (with tests)
- `test_generator.py` - Unit tests for the generator (22 tests)
- `html_to_markdown.py` - Converts OMOP HTML spec to Markdown
- `fix_patch_decorators.py` - Updates @patch decorators for TypeSpec 1.0+

### Source Files
- `omop.html` - Original OMOP CDM v5.4 HTML specification
- `omop.md` - Markdown version of OMOP specification (185KB)

### Generated Output
- `tsp-output/openapi/openapi.yaml` - OpenAPI 3.0.0 specification (16,742 lines)

## Contributing

When adding new tables or updating existing ones:

1. **Update Source Specification**
   - Place the latest OMOP CDM HTML specification as `omop.html`
   - Run `cd .scripts && python3 html_to_markdown.py` to update `omop.md`

2. **Regenerate TypeSpec Files**
   ```bash
   cd .scripts
   python3 generate_typespec.py
   ```

3. **Run Tests**
   ```bash
   cd .scripts
   python3 test_generator.py  # Should pass all 22 tests
   ```

4. **Compile TypeSpec**
   ```bash
   tsp compile tsp/main.tsp --output-dir tsp-output
   # Should compile with zero warnings
   ```

5. **Review Generated Output**
   - Check `tsp-output/openapi/openapi.yaml`
   - Verify OpenAPI 3.0.0 format
   - Test with OpenAPI tools or documentation generators

### Maintenance Scripts

All maintenance scripts are in `.scripts/`:
- **generate_typespec.py** - Regenerate all TypeSpec from source
- **test_generator.py** - Validate generator logic
- **html_to_markdown.py** - Convert OMOP HTML to Markdown
- **fix_patch_decorators.py** - Fix TypeSpec 1.0+ compatibility issues

## Technical Details

### TypeSpec Compiler Version
- **TypeSpec Compiler**: v1.5.0
- **Target**: OpenAPI 3.0.0 (configured in `tspconfig.yaml`)
- **Compilation Status**: ✅ Clean (zero warnings)

### OpenAPI Output
- **Version**: 3.0.0
- **Size**: 16,742 lines
- **Format**: YAML
- **Location**: `tsp-output/openapi/openapi.yaml`

### Key Technical Decisions

**1. PATCH Operations with Implicit Optionality**
All PATCH operations use `@patch(#{implicitOptionality: true})` to ensure compatibility with TypeSpec 1.0+. This makes all fields in PATCH request bodies implicitly optional, following JSON Merge Patch (RFC 7396) semantics.

**2. OpenAPI 3.0 vs 3.1**
The project targets OpenAPI 3.0.0 for maximum compatibility with existing tools and generators, configured in `tspconfig.yaml`:
```yaml
options:
  "@typespec/openapi3":
    openapi-versions:
      - 3.0.0
```

**3. Error Response Model**
The ErrorResponse model does not use `@statusCode` decorator on body fields to avoid compilation issues. Status codes are properly defined in operation responses.

**4. Bearer Authentication**
The API uses Bearer token authentication configured at the service level:
```typespec
@service(#{
  title: "OMOP CDM v5.4 API",
})
@server("https://api.example.com", "Production server")
@useAuth(BearerAuth)
namespace OmopCdm;
```

## License

This API specification is based on the OMOP Common Data Model, which is licensed under Apache 2.0.
See the [OHDSI CommonDataModel repository](https://github.com/OHDSI/CommonDataModel) for details.
