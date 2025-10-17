import "@typespec/http";
import "@typespec/rest";
import "../common/models.tsp";

using TypeSpec.Http;
using TypeSpec.Rest;
using OmopCdm.Common;

namespace OmopCdm.Vocabulary;

/**
 * Vocabulary Resource
 *
 * The VOCABULARY table includes a list of the Vocabularies integrated
from various sources or created de novo in OMOP CDM. This reference
table contains a single record for each Vocabulary and includes a
descriptive name and other associated attributes for the Vocabulary.
 *
 * **User Guide**: The primary purpose of the VOCABULARY table is to provide explicit
information about specific vocabulary versions and the references to the
sources from which they are asserted. Users can identify the version of
a particular vocabulary used in the database, enabling consistency and
reproducibility in data analysis. Besides, users can check the
vocabulary release version in their CDM which refers to the
vocabulary_id = ‘None’.
 *
 * **ETL Conventions**: NA
 */

@doc("Vocabulary record in the OMOP CDM")
@example(#{
  id: "12345",
  vocabulary_name: "Example value",
  vocabulary_reference: "Example value",
  vocabulary_version: "Example value",
  vocabulary_concept_id: 8507
})
model Vocabulary {
  @doc("A unique identifier for each Vocabulary, such as ICD9CM, SNOMED, Visit.")
  @maxLength(20)
  id: string;

  @doc("The name describing the vocabulary, for example, International Classification of Diseases, Ninth Revision, Clinical Modification, Volume 1 and 2 (NCHS) etc.")
  @maxLength(255)
  vocabulary_name: string;

  @doc("External reference to documentation or available download of the about the vocabulary.")
  @maxLength(255)
  vocabulary_reference?: string;

  @doc("Version of the Vocabulary as indicated in the source.")
  @maxLength(255)
  vocabulary_version?: string;

  @doc("A Concept that represents the Vocabulary the VOCABULARY record belongs to. References CONCEPT table.")
  vocabulary_concept_id: ConceptId;
}

/**
 * Vocabulary creation request
 */
@doc("Request body for creating a new Vocabulary record")
model VocabularyCreate {
  @doc("The name describing the vocabulary, for example, International Classification of Diseases, Ninth Revision, Clinical Modification, Volume 1 and 2 (NCHS) etc.")
  @maxLength(255)
  vocabulary_name: string;

  @doc("External reference to documentation or available download of the about the vocabulary.")
  @maxLength(255)
  vocabulary_reference?: string;

  @doc("Version of the Vocabulary as indicated in the source.")
  @maxLength(255)
  vocabulary_version?: string;

  @doc("A Concept that represents the Vocabulary the VOCABULARY record belongs to. References CONCEPT table.")
  vocabulary_concept_id: ConceptId;
}

/**
 * Vocabulary update request
 */
@doc("Request body for updating an existing Vocabulary record")
model VocabularyUpdate {
  @doc("The name describing the vocabulary, for example, International Classification of Diseases, Ninth Revision, Clinical Modification, Volume 1 and 2 (NCHS) etc.")
  vocabulary_name?: string;

  @doc("External reference to documentation or available download of the about the vocabulary.")
  vocabulary_reference?: string;

  @doc("Version of the Vocabulary as indicated in the source.")
  vocabulary_version?: string;

  @doc("A Concept that represents the Vocabulary the VOCABULARY record belongs to. References CONCEPT table.")
  vocabulary_concept_id?: ConceptId;
}

/**
 * Query parameters for filtering vocabulary
 */
@doc("Filter parameters for Vocabulary list operations")
model VocabularyQueryParams {
  ...PaginationParams;

  @doc("Filter by vocabulary concept id")
  @query
  vocabulary_concept_id?: ConceptId;

  @doc("Sort field")
  @query
  sort_by?: "id";

  @doc("Sort order")
  @query
  sort_order?: SortOrder;
}

/**
 * Vocabulary API operations
 */
@route("/vocabularys")
@tag("Vocabulary - Vocabularys")
interface Vocabularys {
  @get
  @summary("List all vocabularys")
  @doc("Returns a paginated list of Vocabulary records.")
  list(
    ...VocabularyQueryParams,
  ): {
    @statusCode statusCode: 200;
    @body body: PaginatedList<Vocabulary>;
  } | ErrorResponse;

  @get
  @summary("Get vocabulary by ID")
  @doc("Retrieve a single Vocabulary record by its unique identifier.")
  read(
    @path
    @doc("Unique vocabulary identifier")
    id: string,
  ): {
    @statusCode statusCode: 200;
    @body body: Vocabulary;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @post
  @summary("Create a new vocabulary")
  @doc("Create a new Vocabulary record.")
  create(
    @body
    @doc("Vocabulary data to create")
    record: VocabularyCreate,
  ): {
    @statusCode statusCode: 201;
    @body body: Vocabulary;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @put
  @summary("Update vocabulary (full replacement)")
  @doc("Replace all fields of an existing Vocabulary record.")
  update(
    @path
    @doc("Unique vocabulary identifier")
    id: string,

    @body
    @doc("Complete vocabulary data")
    record: VocabularyCreate,
  ): {
    @statusCode statusCode: 200;
    @body body: Vocabulary;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @patch(#{implicitOptionality: true})
  @summary("Update vocabulary (partial)")
  @doc("Update specific fields of an existing Vocabulary record.")
  patch(
    @path
    @doc("Unique vocabulary identifier")
    id: string,

    @body
    @doc("Fields to update")
    record: VocabularyUpdate,
  ): {
    @statusCode statusCode: 200;
    @body body: Vocabulary;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @delete
  @summary("Delete vocabulary")
  @doc("Delete a Vocabulary record.")
  delete(
    @path
    @doc("Unique vocabulary identifier")
    id: string,
  ): {
    @statusCode statusCode: 204;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;
}
