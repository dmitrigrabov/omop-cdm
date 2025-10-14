import "@typespec/http";
import "@typespec/rest";
import "../common/models.tsp";

using TypeSpec.Http;
using TypeSpec.Rest;
using OmopCdm.Common;

namespace OmopCdm.Results;

/**
 * FactRelationship Resource
 *
 * The FACT_RELATIONSHIP table contains records about the relationships
between facts stored as records in any table of the CDM. Relationships
can be defined between facts from the same domain, or different domains.
Examples of Fact Relationships include: [Person
relationships](https://athena.ohdsi.org/search-terms/terms?domain=Relationship&standardConcept=Standard&page=2&pageSize=15&query=) (parent-child), care site relationships (hierarchical
organizational structure of facilities within a health system),
indication relationship (between drug exposures and associated
conditions), usage relationships (of devices during the course of an
associated procedure), or facts derived from one another (measurements
derived from an associated specimen).
 *
 * **User Guide**: NA
 *
 * **ETL Conventions**: All relationships are directional, and each relationship is
represented twice symmetrically within the FACT_RELATIONSHIP table. For
example, two persons if person_id = 1 is the mother of person_id = 2 two
records are in the FACT_RELATIONSHIP table (all strings in fact
concept_id records in the Concept table: - Person, 1, Person, 2, parent
of - Person, 2, Person, 1, child of
 */

@doc("FactRelationship record in the OMOP CDM")
model FactRelationship {
  @doc("References CONCEPT table.")
  relationship_concept_id: ConceptId;
}

/**
 * FactRelationship creation request
 */
@doc("Request body for creating a new FactRelationship record")
model FactRelationshipCreate {
  @doc("References CONCEPT table.")
  relationship_concept_id: ConceptId;
}

/**
 * FactRelationship update request
 */
@doc("Request body for updating an existing FactRelationship record")
model FactRelationshipUpdate {
  @doc("References CONCEPT table.")
  relationship_concept_id?: ConceptId;
}

/**
 * Query parameters for filtering fact-relationship
 */
@doc("Filter parameters for FactRelationship list operations")
model FactRelationshipQueryParams {
  ...PaginationParams;

  @doc("Filter by relationship concept id")
  @query
  relationship_concept_id?: ConceptId;

  @doc("Sort field")
  @query
  sort_by?: "fact_relationship_id";

  @doc("Sort order")
  @query
  sort_order?: SortOrder;
}

/**
 * FactRelationship API operations
 */
@route("/fact-relationships")
@tag("Results - FactRelationships")
interface FactRelationships {
  @get
  @summary("List all fact-relationships")
  @doc("Returns a paginated list of FactRelationship records.")
  list(
    ...FactRelationshipQueryParams,
  ): {
    @statusCode statusCode: 200;
    @body body: PaginatedList<FactRelationship>;
  } | ErrorResponse;

  @get
  @summary("Get fact-relationship by ID")
  @doc("Retrieve a single FactRelationship record by its unique identifier.")
  read(
    @path
    @doc("Unique fact-relationship identifier")
    fact_relationship_id: int64,
  ): {
    @statusCode statusCode: 200;
    @body body: FactRelationship;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @post
  @summary("Create a new fact-relationship")
  @doc("Create a new FactRelationship record.")
  create(
    @body
    @doc("FactRelationship data to create")
    record: FactRelationshipCreate,
  ): {
    @statusCode statusCode: 201;
    @body body: FactRelationship;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @put
  @summary("Update fact-relationship (full replacement)")
  @doc("Replace all fields of an existing FactRelationship record.")
  update(
    @path
    @doc("Unique fact-relationship identifier")
    fact_relationship_id: int64,

    @body
    @doc("Complete fact-relationship data")
    record: FactRelationshipCreate,
  ): {
    @statusCode statusCode: 200;
    @body body: FactRelationship;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @patch
  @summary("Update fact-relationship (partial)")
  @doc("Update specific fields of an existing FactRelationship record.")
  patch(
    @path
    @doc("Unique fact-relationship identifier")
    fact_relationship_id: int64,

    @body
    @doc("Fields to update")
    record: FactRelationshipUpdate,
  ): {
    @statusCode statusCode: 200;
    @body body: FactRelationship;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @delete
  @summary("Delete fact-relationship")
  @doc("Delete a FactRelationship record.")
  delete(
    @path
    @doc("Unique fact-relationship identifier")
    fact_relationship_id: int64,
  ): {
    @statusCode statusCode: 204;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;
}
