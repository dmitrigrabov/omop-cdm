import "@typespec/http";
import "@typespec/rest";
import "../common/models.tsp";

using TypeSpec.Http;
using TypeSpec.Rest;
using OmopCdm.Common;

namespace OmopCdm.Vocabulary;

/**
 * ConceptAncestor Resource
 *
 * The CONCEPT_ANCESTOR table is designed to simplify observational
analysis by providing the complete hierarchical relationships between
Concepts. Only direct parent-child relationships between Concepts are
stored in the CONCEPT_RELATIONSHIP table. To determine higher-level
ancestry connections, all individual direct relationships would have to
be navigated at analysis time. The CONCEPT_ANCESTOR table includes
records for all parent-child relationships, as well as
grandparent-grandchild relationships and those of any other level of
lineage for Standard or Classification concepts. Using the
CONCEPT_ANCESTOR table allows for querying for all descendants of a
hierarchical concept, and the other way around. For example, drug
ingredients and drug products, beneath them in the hierarchy, are all
descendants of a drug class ancestor. This table is entirely derived
from the CONCEPT, CONCEPT_RELATIONSHIP, and RELATIONSHIP tables.
 *
 * **User Guide**: The CONCEPT_ANCESTOR table can be used to explore the hierarchical
relationships captured in the table to gain insights into the
hierarchical structure of clinical concepts. Understanding the
hierarchical relationships of concepts can facilitate accurate
interpretation and analysis of healthcare data. Also, by incorporating
hierarchical relationships from the CONCEPT_ANCESTOR table, users can
create cohorts containing related concepts within a hierarchical
structure, enabling more comprehensive cohort definitions.
 *
 * **ETL Conventions**: NA
 */

@doc("ConceptAncestor record in the OMOP CDM")
model ConceptAncestor {
  @doc("The Concept Id for the higher-level concept that forms the ancestor in the relationship.  References CONCEPT table.")
  ancestor_concept_id: ConceptId;

  @doc("The Concept Id for the lower-level concept that forms the descendant in the relationship.  References CONCEPT table.")
  descendant_concept_id: ConceptId;

  @doc("The minimum separation in number of levels of hierarchy between ancestor and descendant concepts. This is an attribute that is used to simplify hierarchic analysis.")
  min_levels_of_separation: int64;

  @doc("The maximum separation in number of levels of hierarchy between ancestor and descendant concepts. This is an attribute that is used to simplify hierarchic analysis.")
  max_levels_of_separation: int64;
}

/**
 * ConceptAncestor creation request
 */
@doc("Request body for creating a new ConceptAncestor record")
model ConceptAncestorCreate {
  @doc("The Concept Id for the higher-level concept that forms the ancestor in the relationship.  References CONCEPT table.")
  ancestor_concept_id: ConceptId;

  @doc("The Concept Id for the lower-level concept that forms the descendant in the relationship.  References CONCEPT table.")
  descendant_concept_id: ConceptId;

  @doc("The minimum separation in number of levels of hierarchy between ancestor and descendant concepts. This is an attribute that is used to simplify hierarchic analysis.")
  min_levels_of_separation: int64;

  @doc("The maximum separation in number of levels of hierarchy between ancestor and descendant concepts. This is an attribute that is used to simplify hierarchic analysis.")
  max_levels_of_separation: int64;
}

/**
 * ConceptAncestor update request
 */
@doc("Request body for updating an existing ConceptAncestor record")
model ConceptAncestorUpdate {
  @doc("The Concept Id for the higher-level concept that forms the ancestor in the relationship.  References CONCEPT table.")
  ancestor_concept_id?: ConceptId;

  @doc("The Concept Id for the lower-level concept that forms the descendant in the relationship.  References CONCEPT table.")
  descendant_concept_id?: ConceptId;

  @doc("The minimum separation in number of levels of hierarchy between ancestor and descendant concepts. This is an attribute that is used to simplify hierarchic analysis.")
  min_levels_of_separation?: int64;

  @doc("The maximum separation in number of levels of hierarchy between ancestor and descendant concepts. This is an attribute that is used to simplify hierarchic analysis.")
  max_levels_of_separation?: int64;
}

/**
 * Query parameters for filtering concept-ancestor
 */
@doc("Filter parameters for ConceptAncestor list operations")
model ConceptAncestorQueryParams {
  ...PaginationParams;

  @doc("Filter by ancestor concept id")
  @query
  ancestor_concept_id?: ConceptId;

  @doc("Filter by descendant concept id")
  @query
  descendant_concept_id?: ConceptId;

  @doc("Sort field")
  @query
  sort_by?: "concept_ancestor_id";

  @doc("Sort order")
  @query
  sort_order?: SortOrder;
}

/**
 * ConceptAncestor API operations
 */
@route("/concept-ancestors")
@tag("Vocabulary - ConceptAncestors")
interface ConceptAncestors {
  @get
  @summary("List all concept-ancestors")
  @doc("Returns a paginated list of ConceptAncestor records.")
  list(
    ...ConceptAncestorQueryParams,
  ): {
    @statusCode statusCode: 200;
    @body body: PaginatedList<ConceptAncestor>;
  } | ErrorResponse;

  @get
  @summary("Get concept-ancestor by ID")
  @doc("Retrieve a single ConceptAncestor record by its unique identifier.")
  read(
    @path
    @doc("Unique concept-ancestor identifier")
    concept_ancestor_id: int64,
  ): {
    @statusCode statusCode: 200;
    @body body: ConceptAncestor;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @post
  @summary("Create a new concept-ancestor")
  @doc("Create a new ConceptAncestor record.")
  create(
    @body
    @doc("ConceptAncestor data to create")
    record: ConceptAncestorCreate,
  ): {
    @statusCode statusCode: 201;
    @body body: ConceptAncestor;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @put
  @summary("Update concept-ancestor (full replacement)")
  @doc("Replace all fields of an existing ConceptAncestor record.")
  update(
    @path
    @doc("Unique concept-ancestor identifier")
    concept_ancestor_id: int64,

    @body
    @doc("Complete concept-ancestor data")
    record: ConceptAncestorCreate,
  ): {
    @statusCode statusCode: 200;
    @body body: ConceptAncestor;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @patch
  @summary("Update concept-ancestor (partial)")
  @doc("Update specific fields of an existing ConceptAncestor record.")
  patch(
    @path
    @doc("Unique concept-ancestor identifier")
    concept_ancestor_id: int64,

    @body
    @doc("Fields to update")
    record: ConceptAncestorUpdate,
  ): {
    @statusCode statusCode: 200;
    @body body: ConceptAncestor;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @delete
  @summary("Delete concept-ancestor")
  @doc("Delete a ConceptAncestor record.")
  delete(
    @path
    @doc("Unique concept-ancestor identifier")
    concept_ancestor_id: int64,
  ): {
    @statusCode statusCode: 204;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;
}
