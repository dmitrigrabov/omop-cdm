import "@typespec/http";
import "@typespec/rest";
import "../common/models.tsp";

using TypeSpec.Http;
using TypeSpec.Rest;
using OmopCdm.Common;

namespace OmopCdm.Results;

/**
 * CohortDefinition Resource
 *
 * The COHORT_DEFINITION table contains records defining a Cohort
derived from the data through the associated description and syntax and
upon instantiation (execution of the algorithm) placed into the COHORT
table. Cohorts are a set of subjects that satisfy a given combination of
inclusion criteria for a duration of time. The COHORT_DEFINITION table
provides a standardized structure for maintaining the rules governing
the inclusion of a subject into a cohort, and can store operational
programming code to instantiate the cohort within the OMOP Common Data
Model.
 *
 * **User Guide**: NA
 *
 * **ETL Conventions**: NA
 */

@doc("CohortDefinition record in the OMOP CDM")
@example(#{
  cohort_definition_id: 100,
  cohort_definition_name: "Example value",
  cohort_definition_description: "Example value",
  definition_type_concept_id: 8507,
  cohort_definition_syntax: "Example value",
  subject_concept_id: 8507,
  cohort_initiation_date: "2023-01-15"
})
model CohortDefinition {
  @doc("This is the identifier given to the cohort, usually by the ATLAS application")
  cohort_definition_id: int64;

  @doc("A short description of the cohort")
  @maxLength(255)
  cohort_definition_name: string;

  @doc("A complete description of the cohort.")
  cohort_definition_description?: string;

  @doc("Type defining what kind of Cohort Definition the record represents and how the syntax may be executed. References CONCEPT table.")
  definition_type_concept_id: ConceptId;

  @doc("Syntax or code to operationalize the Cohort Definition.")
  cohort_definition_syntax?: string;

  @doc("This field contains a Concept that represents the domain of the subjects that are members of the cohort (e.g., Person, Provider, Visit). References CONCEPT table.")
  subject_concept_id: ConceptId;

  @doc("A date to indicate when the Cohort was initiated in the COHORT table.")
  cohort_initiation_date?: DateOnly;
}

/**
 * CohortDefinition creation request
 */
@doc("Request body for creating a new CohortDefinition record")
model CohortDefinitionCreate {
  @doc("This is the identifier given to the cohort, usually by the ATLAS application")
  cohort_definition_id: int64;

  @doc("A short description of the cohort")
  @maxLength(255)
  cohort_definition_name: string;

  @doc("A complete description of the cohort.")
  cohort_definition_description?: string;

  @doc("Type defining what kind of Cohort Definition the record represents and how the syntax may be executed. References CONCEPT table.")
  definition_type_concept_id: ConceptId;

  @doc("Syntax or code to operationalize the Cohort Definition.")
  cohort_definition_syntax?: string;

  @doc("This field contains a Concept that represents the domain of the subjects that are members of the cohort (e.g., Person, Provider, Visit). References CONCEPT table.")
  subject_concept_id: ConceptId;

  @doc("A date to indicate when the Cohort was initiated in the COHORT table.")
  cohort_initiation_date?: DateOnly;
}

/**
 * CohortDefinition update request
 */
@doc("Request body for updating an existing CohortDefinition record")
model CohortDefinitionUpdate {
  @doc("This is the identifier given to the cohort, usually by the ATLAS application")
  cohort_definition_id?: int64;

  @doc("A short description of the cohort")
  cohort_definition_name?: string;

  @doc("A complete description of the cohort.")
  cohort_definition_description?: string;

  @doc("Type defining what kind of Cohort Definition the record represents and how the syntax may be executed. References CONCEPT table.")
  definition_type_concept_id?: ConceptId;

  @doc("Syntax or code to operationalize the Cohort Definition.")
  cohort_definition_syntax?: string;

  @doc("This field contains a Concept that represents the domain of the subjects that are members of the cohort (e.g., Person, Provider, Visit). References CONCEPT table.")
  subject_concept_id?: ConceptId;

  @doc("A date to indicate when the Cohort was initiated in the COHORT table.")
  cohort_initiation_date?: DateOnly;
}

/**
 * Query parameters for filtering cohort-definition
 */
@doc("Filter parameters for CohortDefinition list operations")
model CohortDefinitionQueryParams {
  ...PaginationParams;

  @doc("Filter by definition type concept id")
  @query
  definition_type_concept_id?: ConceptId;

  @doc("Filter by subject concept id")
  @query
  subject_concept_id?: ConceptId;

  @doc("Sort field")
  @query
  sort_by?: "id";

  @doc("Sort order")
  @query
  sort_order?: SortOrder;
}

/**
 * CohortDefinition API operations
 */
@route("/cohort-definitions")
@tag("Results - CohortDefinitions")
interface CohortDefinitions {
  @get
  @summary("List all cohort-definitions")
  @doc("Returns a paginated list of CohortDefinition records.")
  list(
    ...CohortDefinitionQueryParams,
  ): {
    @statusCode statusCode: 200;
    @body body: PaginatedList<CohortDefinition>;
  } | ErrorResponse;

  @get
  @summary("Get cohort-definition by ID")
  @doc("Retrieve a single CohortDefinition record by its unique identifier.")
  read(
    @path
    @doc("Unique cohort-definition identifier")
    id: int64,
  ): {
    @statusCode statusCode: 200;
    @body body: CohortDefinition;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @post
  @summary("Create a new cohort-definition")
  @doc("Create a new CohortDefinition record.")
  create(
    @body
    @doc("CohortDefinition data to create")
    record: CohortDefinitionCreate,
  ): {
    @statusCode statusCode: 201;
    @body body: CohortDefinition;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @put
  @summary("Update cohort-definition (full replacement)")
  @doc("Replace all fields of an existing CohortDefinition record.")
  update(
    @path
    @doc("Unique cohort-definition identifier")
    id: int64,

    @body
    @doc("Complete cohort-definition data")
    record: CohortDefinitionCreate,
  ): {
    @statusCode statusCode: 200;
    @body body: CohortDefinition;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @patch(#{implicitOptionality: true})
  @summary("Update cohort-definition (partial)")
  @doc("Update specific fields of an existing CohortDefinition record.")
  patch(
    @path
    @doc("Unique cohort-definition identifier")
    id: int64,

    @body
    @doc("Fields to update")
    record: CohortDefinitionUpdate,
  ): {
    @statusCode statusCode: 200;
    @body body: CohortDefinition;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @delete
  @summary("Delete cohort-definition")
  @doc("Delete a CohortDefinition record.")
  delete(
    @path
    @doc("Unique cohort-definition identifier")
    id: int64,
  ): {
    @statusCode statusCode: 204;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;
}
