import "@typespec/http";
import "@typespec/rest";
import "../common/models.tsp";

using TypeSpec.Http;
using TypeSpec.Rest;
using OmopCdm.Common;

namespace OmopCdm.Vocabulary;

/**
 * Relationship Resource
 *
 * The RELATIONSHIP table provides a reference list of all types of
relationships that can be used to associate any two Concepts in the
CONCEPT_RELATIONSHIP table, the respective reverse relationships, and
their hierarchical characteristics. Note, that Concepts representing
relationships between the clinical facts, used for filling in the
FACT_RELATIONSHIP table are stored in the CONCEPT table and belong to
the Relationship Domain.
 *
 * **User Guide**: Users can leverage the RELATIONSHIP table to explore the full list of
direct and reverse relationships within the OMOP vocabulary system.
Also, users can get insight into how these relationships can be used in
ETL, cohort creation, and other tasks according to their ancestral
characteristics.
 *
 * **ETL Conventions**: NA
 */

@doc("Relationship record in the OMOP CDM")
model Relationship {
  @doc("The type of relationship captured by the relationship record.")
  @maxLength(20)
  relationship_id: string;

  @doc("")
  @maxLength(255)
  relationship_name: string;

  @doc("Defines whether a relationship defines concepts into classes or hierarchies. Values are 1 for hierarchical relationship or 0 if not.")
  @maxLength(1)
  is_hierarchical: string;

  @doc("Defines whether a hierarchical relationship contributes to the concept_ancestor table. These are subsets of the hierarchical relationships. Valid values are 1 or 0.")
  @maxLength(1)
  defines_ancestry: string;

  @doc("The identifier for the relationship used to define the reverse relationship between two concepts.")
  @maxLength(20)
  reverse_relationship_id: string;

  @doc("A foreign key that refers to an identifier in the [CONCEPT](https://ohdsi.github.io/CommonDataModel/cdm54.html#concept) table for the unique relationship concept.  References CONCEPT table.")
  relationship_concept_id: ConceptId;
}

/**
 * Relationship creation request
 */
@doc("Request body for creating a new Relationship record")
model RelationshipCreate {
  @doc("")
  @maxLength(255)
  relationship_name: string;

  @doc("Defines whether a relationship defines concepts into classes or hierarchies. Values are 1 for hierarchical relationship or 0 if not.")
  @maxLength(1)
  is_hierarchical: string;

  @doc("Defines whether a hierarchical relationship contributes to the concept_ancestor table. These are subsets of the hierarchical relationships. Valid values are 1 or 0.")
  @maxLength(1)
  defines_ancestry: string;

  @doc("The identifier for the relationship used to define the reverse relationship between two concepts.")
  @maxLength(20)
  reverse_relationship_id: string;

  @doc("A foreign key that refers to an identifier in the [CONCEPT](https://ohdsi.github.io/CommonDataModel/cdm54.html#concept) table for the unique relationship concept.  References CONCEPT table.")
  relationship_concept_id: ConceptId;
}

/**
 * Relationship update request
 */
@doc("Request body for updating an existing Relationship record")
model RelationshipUpdate {
  @doc("")
  relationship_name?: string;

  @doc("Defines whether a relationship defines concepts into classes or hierarchies. Values are 1 for hierarchical relationship or 0 if not.")
  is_hierarchical?: string;

  @doc("Defines whether a hierarchical relationship contributes to the concept_ancestor table. These are subsets of the hierarchical relationships. Valid values are 1 or 0.")
  defines_ancestry?: string;

  @doc("The identifier for the relationship used to define the reverse relationship between two concepts.")
  reverse_relationship_id?: string;

  @doc("A foreign key that refers to an identifier in the [CONCEPT](https://ohdsi.github.io/CommonDataModel/cdm54.html#concept) table for the unique relationship concept.  References CONCEPT table.")
  relationship_concept_id?: ConceptId;
}

/**
 * Query parameters for filtering relationship
 */
@doc("Filter parameters for Relationship list operations")
model RelationshipQueryParams {
  ...PaginationParams;

  @doc("Filter by relationship concept id")
  @query
  relationship_concept_id?: ConceptId;

  @doc("Sort field")
  @query
  sort_by?: "relationship_id";

  @doc("Sort order")
  @query
  sort_order?: SortOrder;
}

/**
 * Relationship API operations
 */
@route("/relationships")
@tag("Vocabulary - Relationships")
interface Relationships {
  @get
  @summary("List all relationships")
  @doc("Returns a paginated list of Relationship records.")
  list(
    ...RelationshipQueryParams,
  ): {
    @statusCode statusCode: 200;
    @body body: PaginatedList<Relationship>;
  } | ErrorResponse;

  @get
  @summary("Get relationship by ID")
  @doc("Retrieve a single Relationship record by its unique identifier.")
  read(
    @path
    @doc("Unique relationship identifier")
    relationship_id: string,
  ): {
    @statusCode statusCode: 200;
    @body body: Relationship;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @post
  @summary("Create a new relationship")
  @doc("Create a new Relationship record.")
  create(
    @body
    @doc("Relationship data to create")
    record: RelationshipCreate,
  ): {
    @statusCode statusCode: 201;
    @body body: Relationship;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @put
  @summary("Update relationship (full replacement)")
  @doc("Replace all fields of an existing Relationship record.")
  update(
    @path
    @doc("Unique relationship identifier")
    relationship_id: string,

    @body
    @doc("Complete relationship data")
    record: RelationshipCreate,
  ): {
    @statusCode statusCode: 200;
    @body body: Relationship;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @patch(#{implicitOptionality: true})
  @summary("Update relationship (partial)")
  @doc("Update specific fields of an existing Relationship record.")
  patch(
    @path
    @doc("Unique relationship identifier")
    relationship_id: string,

    @body
    @doc("Fields to update")
    record: RelationshipUpdate,
  ): {
    @statusCode statusCode: 200;
    @body body: Relationship;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @delete
  @summary("Delete relationship")
  @doc("Delete a Relationship record.")
  delete(
    @path
    @doc("Unique relationship identifier")
    relationship_id: string,
  ): {
    @statusCode statusCode: 204;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;
}
