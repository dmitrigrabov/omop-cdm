import "@typespec/http";
import "@typespec/rest";
import "../common/models.tsp";

using TypeSpec.Http;
using TypeSpec.Rest;
using OmopCdm.Common;

namespace OmopCdm.Vocabulary;

/**
 * SourceToConceptMap Resource
 *
 * The source to concept map table is recommended for use in ETL
processes to maintain local source codes which are not available as
Concepts in the Standardized Vocabularies, and to establish mappings for
each source code into a Standard Concept as target_concept_ids that can
be used to populate the Common Data Model tables. The
SOURCE_TO_CONCEPT_MAP table is no longer populated with content within
the Standardized Vocabularies published to the OMOP community.
**There are OHDSI tools to help you populate this table; [Usagi](https://github.com/OHDSI/Usagi) and [Perseus](https://github.com/ohdsi/Perseus). You can read more
about OMOP vocabulary mapping in [The
Book of OHDSI Chapter 6.3](https://ohdsi.github.io/TheBookOfOhdsi/ExtractTransformLoad.html#step-2-create-the-code-mappings).**
 *
 * **User Guide**: NA
 *
 * **ETL Conventions**: NA
 */

@doc("SourceToConceptMap record in the OMOP CDM")
model SourceToConceptMap {
  @doc("The source code being translated into a Standard Concept.")
  @maxLength(50)
  source_code: string;

  @doc("A foreign key to the Source Concept that is being translated into a Standard Concept. ETL Convention: This is either 0 or should be a number above 2 billion, which are the Concepts reserved for site-specific codes and mappings. References CONCEPT table.")
  source_concept_id: ConceptId;

  @doc("A foreign key to the VOCABULARY table defining the vocabulary of the source code that is being translated to a Standard Concept.")
  @maxLength(20)
  source_vocabulary_id: string;

  @doc("An optional description for the source code. This is included as a convenience to compare the description of the source code to the name of the concept.")
  @maxLength(255)
  source_code_description?: string;

  @doc("The target Concept to which the source code is being mapped.  References CONCEPT table.")
  target_concept_id: ConceptId;

  @doc("The Vocabulary of the target Concept.  References VOCABULARY table.")
  @maxLength(20)
  target_vocabulary_id: string;

  @doc("The date when the mapping instance was first recorded.")
  valid_start_date: DateOnly;

  @doc("The date when the mapping instance became invalid because it was deleted or superseded (updated) by a new relationship. Default value is 31-Dec-2099.")
  valid_end_date: DateOnly;

  @doc("Reason the mapping instance was invalidated. Possible values are D (deleted), U (replaced with an update) or NULL when valid_end_date has the default value.")
  @maxLength(1)
  invalid_reason?: string;
}

/**
 * SourceToConceptMap creation request
 */
@doc("Request body for creating a new SourceToConceptMap record")
model SourceToConceptMapCreate {
  @doc("The source code being translated into a Standard Concept.")
  @maxLength(50)
  source_code: string;

  @doc("A foreign key to the Source Concept that is being translated into a Standard Concept. ETL Convention: This is either 0 or should be a number above 2 billion, which are the Concepts reserved for site-specific codes and mappings. References CONCEPT table.")
  source_concept_id: ConceptId;

  @doc("A foreign key to the VOCABULARY table defining the vocabulary of the source code that is being translated to a Standard Concept.")
  @maxLength(20)
  source_vocabulary_id: string;

  @doc("An optional description for the source code. This is included as a convenience to compare the description of the source code to the name of the concept.")
  @maxLength(255)
  source_code_description?: string;

  @doc("The target Concept to which the source code is being mapped.  References CONCEPT table.")
  target_concept_id: ConceptId;

  @doc("The Vocabulary of the target Concept.  References VOCABULARY table.")
  @maxLength(20)
  target_vocabulary_id: string;

  @doc("The date when the mapping instance was first recorded.")
  valid_start_date: DateOnly;

  @doc("The date when the mapping instance became invalid because it was deleted or superseded (updated) by a new relationship. Default value is 31-Dec-2099.")
  valid_end_date: DateOnly;

  @doc("Reason the mapping instance was invalidated. Possible values are D (deleted), U (replaced with an update) or NULL when valid_end_date has the default value.")
  @maxLength(1)
  invalid_reason?: string;
}

/**
 * SourceToConceptMap update request
 */
@doc("Request body for updating an existing SourceToConceptMap record")
model SourceToConceptMapUpdate {
  @doc("The source code being translated into a Standard Concept.")
  source_code?: string;

  @doc("A foreign key to the Source Concept that is being translated into a Standard Concept. ETL Convention: This is either 0 or should be a number above 2 billion, which are the Concepts reserved for site-specific codes and mappings. References CONCEPT table.")
  source_concept_id?: ConceptId;

  @doc("A foreign key to the VOCABULARY table defining the vocabulary of the source code that is being translated to a Standard Concept.")
  source_vocabulary_id?: string;

  @doc("An optional description for the source code. This is included as a convenience to compare the description of the source code to the name of the concept.")
  source_code_description?: string;

  @doc("The target Concept to which the source code is being mapped.  References CONCEPT table.")
  target_concept_id?: ConceptId;

  @doc("The Vocabulary of the target Concept.  References VOCABULARY table.")
  target_vocabulary_id?: string;

  @doc("The date when the mapping instance was first recorded.")
  valid_start_date?: DateOnly;

  @doc("The date when the mapping instance became invalid because it was deleted or superseded (updated) by a new relationship. Default value is 31-Dec-2099.")
  valid_end_date?: DateOnly;

  @doc("Reason the mapping instance was invalidated. Possible values are D (deleted), U (replaced with an update) or NULL when valid_end_date has the default value.")
  invalid_reason?: string;
}

/**
 * Query parameters for filtering source-to-concept-map
 */
@doc("Filter parameters for SourceToConceptMap list operations")
model SourceToConceptMapQueryParams {
  ...PaginationParams;

  @doc("Filter by source concept id")
  @query
  source_concept_id?: ConceptId;

  @doc("Filter by target concept id")
  @query
  target_concept_id?: ConceptId;

  @doc("Filter by target vocabulary id")
  @query
  target_vocabulary_id?: string;

  @doc("Sort field")
  @query
  sort_by?: "source_to_concept_map_id";

  @doc("Sort order")
  @query
  sort_order?: SortOrder;
}

/**
 * SourceToConceptMap API operations
 */
@route("/source-to-concept-maps")
@tag("Vocabulary - SourceToConceptMaps")
interface SourceToConceptMaps {
  @get
  @summary("List all source-to-concept-maps")
  @doc("Returns a paginated list of SourceToConceptMap records.")
  list(
    ...SourceToConceptMapQueryParams,
  ): {
    @statusCode statusCode: 200;
    @body body: PaginatedList<SourceToConceptMap>;
  } | ErrorResponse;

  @get
  @summary("Get source-to-concept-map by ID")
  @doc("Retrieve a single SourceToConceptMap record by its unique identifier.")
  read(
    @path
    @doc("Unique source-to-concept-map identifier")
    source_to_concept_map_id: int64,
  ): {
    @statusCode statusCode: 200;
    @body body: SourceToConceptMap;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @post
  @summary("Create a new source-to-concept-map")
  @doc("Create a new SourceToConceptMap record.")
  create(
    @body
    @doc("SourceToConceptMap data to create")
    record: SourceToConceptMapCreate,
  ): {
    @statusCode statusCode: 201;
    @body body: SourceToConceptMap;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @put
  @summary("Update source-to-concept-map (full replacement)")
  @doc("Replace all fields of an existing SourceToConceptMap record.")
  update(
    @path
    @doc("Unique source-to-concept-map identifier")
    source_to_concept_map_id: int64,

    @body
    @doc("Complete source-to-concept-map data")
    record: SourceToConceptMapCreate,
  ): {
    @statusCode statusCode: 200;
    @body body: SourceToConceptMap;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @patch
  @summary("Update source-to-concept-map (partial)")
  @doc("Update specific fields of an existing SourceToConceptMap record.")
  patch(
    @path
    @doc("Unique source-to-concept-map identifier")
    source_to_concept_map_id: int64,

    @body
    @doc("Fields to update")
    record: SourceToConceptMapUpdate,
  ): {
    @statusCode statusCode: 200;
    @body body: SourceToConceptMap;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @delete
  @summary("Delete source-to-concept-map")
  @doc("Delete a SourceToConceptMap record.")
  delete(
    @path
    @doc("Unique source-to-concept-map identifier")
    source_to_concept_map_id: int64,
  ): {
    @statusCode statusCode: 204;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;
}
