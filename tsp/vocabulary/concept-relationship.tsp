import "@typespec/http";
import "@typespec/rest";
import "../common/models.tsp";

using TypeSpec.Http;
using TypeSpec.Rest;
using OmopCdm.Common;

namespace OmopCdm.Vocabulary;

/**
 * ConceptRelationship Resource
 *
 * The CONCEPT_RELATIONSHIP table contains records that define
relationships between any two Concepts and the nature or type of the
relationship. This table captures various types of relationships,
including hierarchical, associative, and other semantic connections,
enabling comprehensive analysis and interpretation of clinical concepts.
Every kind of relationship is defined in the RELATIONSHIP table.
 *
 * **User Guide**: The CONCEPT_RELATIONSHIP table can be used to explore hierarchical or
attribute relationships between concepts to understand the hierarchical
structure of clinical concepts and uncover implicit connections and
associations within healthcare data. For example, users can utilize
mapping relationships (‘Maps to’) to harmonize data from different
sources and terminologies, enabling interoperability and data
integration across disparate datasets.
 *
 * **ETL Conventions**: NA
 */

@doc("ConceptRelationship record in the OMOP CDM")
model ConceptRelationship {
  @doc("The relationship between CONCEPT_ID_1 and CONCEPT_ID_2. Please see the [Vocabulary Conventions](https://ohdsi.github.io/CommonDataModel/dataModelConventions.html#concept_relationships). for more information.  References RELATIONSHIP table.")
  @maxLength(20)
  relationship_id: string;

  @doc("The date when the relationship is first recorded.")
  valid_start_date: DateOnly;

  @doc("The date when the relationship is invalidated.")
  valid_end_date: DateOnly;

  @doc("Reason the relationship was invalidated. Possible values are ‘D’ (deleted), ‘U’ (updated) or NULL.")
  @maxLength(1)
  invalid_reason?: string;
}

/**
 * ConceptRelationship creation request
 */
@doc("Request body for creating a new ConceptRelationship record")
model ConceptRelationshipCreate {
  @doc("The relationship between CONCEPT_ID_1 and CONCEPT_ID_2. Please see the [Vocabulary Conventions](https://ohdsi.github.io/CommonDataModel/dataModelConventions.html#concept_relationships). for more information.  References RELATIONSHIP table.")
  @maxLength(20)
  relationship_id: string;

  @doc("The date when the relationship is first recorded.")
  valid_start_date: DateOnly;

  @doc("The date when the relationship is invalidated.")
  valid_end_date: DateOnly;

  @doc("Reason the relationship was invalidated. Possible values are ‘D’ (deleted), ‘U’ (updated) or NULL.")
  @maxLength(1)
  invalid_reason?: string;
}

/**
 * ConceptRelationship update request
 */
@doc("Request body for updating an existing ConceptRelationship record")
model ConceptRelationshipUpdate {
  @doc("The relationship between CONCEPT_ID_1 and CONCEPT_ID_2. Please see the [Vocabulary Conventions](https://ohdsi.github.io/CommonDataModel/dataModelConventions.html#concept_relationships). for more information.  References RELATIONSHIP table.")
  relationship_id?: string;

  @doc("The date when the relationship is first recorded.")
  valid_start_date?: DateOnly;

  @doc("The date when the relationship is invalidated.")
  valid_end_date?: DateOnly;

  @doc("Reason the relationship was invalidated. Possible values are ‘D’ (deleted), ‘U’ (updated) or NULL.")
  invalid_reason?: string;
}

/**
 * Query parameters for filtering concept-relationship
 */
@doc("Filter parameters for ConceptRelationship list operations")
model ConceptRelationshipQueryParams {
  ...PaginationParams;

  @doc("Filter by relationship id")
  @query
  relationship_id?: string;

  @doc("Sort field")
  @query
  sort_by?: "concept_relationship_id";

  @doc("Sort order")
  @query
  sort_order?: SortOrder;
}

/**
 * ConceptRelationship API operations
 */
@route("/concept-relationships")
@tag("Vocabulary - ConceptRelationships")
interface ConceptRelationships {
  @get
  @summary("List all concept-relationships")
  @doc("Returns a paginated list of ConceptRelationship records.")
  list(
    ...ConceptRelationshipQueryParams,
  ): {
    @statusCode statusCode: 200;
    @body body: PaginatedList<ConceptRelationship>;
  } | ErrorResponse;

  @get
  @summary("Get concept-relationship by ID")
  @doc("Retrieve a single ConceptRelationship record by its unique identifier.")
  read(
    @path
    @doc("Unique concept-relationship identifier")
    concept_relationship_id: int64,
  ): {
    @statusCode statusCode: 200;
    @body body: ConceptRelationship;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @post
  @summary("Create a new concept-relationship")
  @doc("Create a new ConceptRelationship record.")
  create(
    @body
    @doc("ConceptRelationship data to create")
    record: ConceptRelationshipCreate,
  ): {
    @statusCode statusCode: 201;
    @body body: ConceptRelationship;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @put
  @summary("Update concept-relationship (full replacement)")
  @doc("Replace all fields of an existing ConceptRelationship record.")
  update(
    @path
    @doc("Unique concept-relationship identifier")
    concept_relationship_id: int64,

    @body
    @doc("Complete concept-relationship data")
    record: ConceptRelationshipCreate,
  ): {
    @statusCode statusCode: 200;
    @body body: ConceptRelationship;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @patch
  @summary("Update concept-relationship (partial)")
  @doc("Update specific fields of an existing ConceptRelationship record.")
  patch(
    @path
    @doc("Unique concept-relationship identifier")
    concept_relationship_id: int64,

    @body
    @doc("Fields to update")
    record: ConceptRelationshipUpdate,
  ): {
    @statusCode statusCode: 200;
    @body body: ConceptRelationship;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @delete
  @summary("Delete concept-relationship")
  @doc("Delete a ConceptRelationship record.")
  delete(
    @path
    @doc("Unique concept-relationship identifier")
    concept_relationship_id: int64,
  ): {
    @statusCode statusCode: 204;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;
}
