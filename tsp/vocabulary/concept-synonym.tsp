import "@typespec/http";
import "@typespec/rest";
import "../common/models.tsp";

using TypeSpec.Http;
using TypeSpec.Rest;
using OmopCdm.Common;

namespace OmopCdm.Vocabulary;

/**
 * ConceptSynonym Resource
 *
 * The CONCEPT_SYNONYM table captures alternative terms, synonyms, and
translations of Concept Name into various languages linked to specific
concepts, providing users with a comprehensive view of how Concepts may
be expressed or referenced.
 *
 * **User Guide**: Users can leverage the CONCEPT_SYNONYM table to expand search
capabilities and improve query accuracy by incorporating synonymous
terms into data analysis and retrieval processes. Also, users can
enhance their mapping efforts between local terminologies and
standardized concepts by identifying synonymous terms associated with
concepts in the CONCEPT_SYNONYM table.
 *
 * **ETL Conventions**: NA
 */

@doc("ConceptSynonym record in the OMOP CDM")
@example(#{
  concept_id: 8507,
  concept_synonym_name: "Example value",
  language_concept_id: 8507
})
model ConceptSynonym {
  @doc("References CONCEPT table.")
  concept_id: ConceptId;

  @doc("")
  @maxLength(1000)
  concept_synonym_name: string;

  @doc("References CONCEPT table.")
  language_concept_id: ConceptId;
}

/**
 * ConceptSynonym creation request
 */
@doc("Request body for creating a new ConceptSynonym record")
model ConceptSynonymCreate {
  @doc("References CONCEPT table.")
  concept_id: ConceptId;

  @doc("")
  @maxLength(1000)
  concept_synonym_name: string;

  @doc("References CONCEPT table.")
  language_concept_id: ConceptId;
}

/**
 * ConceptSynonym update request
 */
@doc("Request body for updating an existing ConceptSynonym record")
model ConceptSynonymUpdate {
  @doc("References CONCEPT table.")
  concept_id?: ConceptId;

  @doc("")
  concept_synonym_name?: string;

  @doc("References CONCEPT table.")
  language_concept_id?: ConceptId;
}

/**
 * Query parameters for filtering concept-synonym
 */
@doc("Filter parameters for ConceptSynonym list operations")
model ConceptSynonymQueryParams {
  ...PaginationParams;

  @doc("Filter by concept id")
  @query
  concept_id?: ConceptId;

  @doc("Filter by language concept id")
  @query
  language_concept_id?: ConceptId;

  @doc("Sort field")
  @query
  sort_by?: "concept_synonym_id";

  @doc("Sort order")
  @query
  sort_order?: SortOrder;
}

/**
 * ConceptSynonym API operations
 */
@route("/concept-synonyms")
@tag("Vocabulary - ConceptSynonyms")
interface ConceptSynonyms {
  @get
  @summary("List all concept-synonyms")
  @doc("Returns a paginated list of ConceptSynonym records.")
  list(
    ...ConceptSynonymQueryParams,
  ): {
    @statusCode statusCode: 200;
    @body body: PaginatedList<ConceptSynonym>;
  } | ErrorResponse;

  @get
  @summary("Get concept-synonym by ID")
  @doc("Retrieve a single ConceptSynonym record by its unique identifier.")
  read(
    @path
    @doc("Unique concept-synonym identifier")
    concept_synonym_id: int64,
  ): {
    @statusCode statusCode: 200;
    @body body: ConceptSynonym;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @post
  @summary("Create a new concept-synonym")
  @doc("Create a new ConceptSynonym record.")
  create(
    @body
    @doc("ConceptSynonym data to create")
    record: ConceptSynonymCreate,
  ): {
    @statusCode statusCode: 201;
    @body body: ConceptSynonym;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @put
  @summary("Update concept-synonym (full replacement)")
  @doc("Replace all fields of an existing ConceptSynonym record.")
  update(
    @path
    @doc("Unique concept-synonym identifier")
    concept_synonym_id: int64,

    @body
    @doc("Complete concept-synonym data")
    record: ConceptSynonymCreate,
  ): {
    @statusCode statusCode: 200;
    @body body: ConceptSynonym;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @patch(#{implicitOptionality: true})
  @summary("Update concept-synonym (partial)")
  @doc("Update specific fields of an existing ConceptSynonym record.")
  patch(
    @path
    @doc("Unique concept-synonym identifier")
    concept_synonym_id: int64,

    @body
    @doc("Fields to update")
    record: ConceptSynonymUpdate,
  ): {
    @statusCode statusCode: 200;
    @body body: ConceptSynonym;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @delete
  @summary("Delete concept-synonym")
  @doc("Delete a ConceptSynonym record.")
  delete(
    @path
    @doc("Unique concept-synonym identifier")
    concept_synonym_id: int64,
  ): {
    @statusCode statusCode: 204;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;
}
