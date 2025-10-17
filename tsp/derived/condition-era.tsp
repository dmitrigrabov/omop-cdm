import "@typespec/http";
import "@typespec/rest";
import "../common/models.tsp";

using TypeSpec.Http;
using TypeSpec.Rest;
using OmopCdm.Common;

namespace OmopCdm.Derived;

/**
 * ConditionEra Resource
 *
 * A Condition Era is defined as a span of time when the Person is
assumed to have a given condition. Similar to Drug Eras, Condition Eras
are chronological periods of Condition Occurrence and every Condition
Occurrence record should be part of a Condition Era. Combining
individual Condition Occurrences into a single Condition Era serves two
purposes: 
- It allows aggregation of chronic conditions that require frequent
ongoing care, instead of treating each Condition Occurrence as an
independent event.
- It allows aggregation of multiple, closely timed doctor visits for
the same Condition to avoid double-counting the Condition Occurrences.
For example, consider a Person who visits her Primary Care Physician
(PCP) and who is referred to a specialist. At a later time, the Person
visits the specialist, who confirms the PCP’s original diagnosis and
provides the appropriate treatment to resolve the condition. These two
independent doctor visits should be aggregated into one Condition
Era.
 *
 * **User Guide**: NA
 *
 * **ETL Conventions**: Each Condition Era corresponds to one or many Condition Occurrence
records that form a continuous interval. The condition_concept_id field
contains Concepts that are identical to those of the
CONDITION_OCCURRENCE table records that make up the Condition Era. In
contrast to Drug Eras, Condition Eras are not aggregated to contain
Conditions of different hierarchical layers. The SQl Script for
generating CONDITION_ERA records can be found [here](https://ohdsi.github.io/CommonDataModel/sqlScripts.html#condition_eras)
The Condition Era Start Date is the start date of the first Condition
Occurrence. The Condition Era End Date is the end date of the last
Condition Occurrence. Condition Eras are built with a Persistence Window
of 30 days, meaning, if no occurrence of the same condition_concept_id
happens within 30 days of any one occurrence, it will be considered the
condition_era_end_date.
 */

@doc("ConditionEra record in the OMOP CDM")
@example(#{
  id: 12345,
  person_id: 100,
  condition_concept_id: 8507,
  condition_era_start_date: "2023-01-15",
  condition_era_end_date: "2023-01-15",
  condition_occurrence_count: 100
})
model ConditionEra {
  @doc("")
  id: int64;

  @doc("References PERSON table.")
  person_id: int64;

  @doc("The Concept Id representing the Condition. References CONCEPT table.")
  condition_concept_id: ConceptId;

  @doc("The start date for the Condition Era constructed from the individual instances of Condition Occurrences. It is the start date of the very first chronologically recorded instance of the condition with at least 31 days since any prior record of the same Condition.")
  condition_era_start_date: DateOnly;

  @doc("The end date for the Condition Era constructed from the individual instances of Condition Occurrences. It is the end date of the final continuously recorded instance of the Condition.")
  condition_era_end_date: DateOnly;

  @doc("The number of individual Condition Occurrences used to construct the condition era.")
  condition_occurrence_count?: int64;
}

/**
 * ConditionEra creation request
 */
@doc("Request body for creating a new ConditionEra record")
model ConditionEraCreate {
  @doc("References PERSON table.")
  person_id: int64;

  @doc("The Concept Id representing the Condition. References CONCEPT table.")
  condition_concept_id: ConceptId;

  @doc("The start date for the Condition Era constructed from the individual instances of Condition Occurrences. It is the start date of the very first chronologically recorded instance of the condition with at least 31 days since any prior record of the same Condition.")
  condition_era_start_date: DateOnly;

  @doc("The end date for the Condition Era constructed from the individual instances of Condition Occurrences. It is the end date of the final continuously recorded instance of the Condition.")
  condition_era_end_date: DateOnly;

  @doc("The number of individual Condition Occurrences used to construct the condition era.")
  condition_occurrence_count?: int64;
}

/**
 * ConditionEra update request
 */
@doc("Request body for updating an existing ConditionEra record")
model ConditionEraUpdate {
  @doc("References PERSON table.")
  person_id?: int64;

  @doc("The Concept Id representing the Condition. References CONCEPT table.")
  condition_concept_id?: ConceptId;

  @doc("The start date for the Condition Era constructed from the individual instances of Condition Occurrences. It is the start date of the very first chronologically recorded instance of the condition with at least 31 days since any prior record of the same Condition.")
  condition_era_start_date?: DateOnly;

  @doc("The end date for the Condition Era constructed from the individual instances of Condition Occurrences. It is the end date of the final continuously recorded instance of the Condition.")
  condition_era_end_date?: DateOnly;

  @doc("The number of individual Condition Occurrences used to construct the condition era.")
  condition_occurrence_count?: int64;
}

/**
 * Query parameters for filtering condition-era
 */
@doc("Filter parameters for ConditionEra list operations")
model ConditionEraQueryParams {
  ...PaginationParams;

  @doc("Filter by person id")
  @query
  person_id?: int64;

  @doc("Filter by condition concept id")
  @query
  condition_concept_id?: ConceptId;

  @doc("Sort field")
  @query
  sort_by?: "id";

  @doc("Sort order")
  @query
  sort_order?: SortOrder;
}

/**
 * ConditionEra API operations
 */
@route("/condition-eras")
@tag("Derived - ConditionEras")
interface ConditionEras {
  @get
  @summary("List all condition-eras")
  @doc("Returns a paginated list of ConditionEra records.")
  list(
    ...ConditionEraQueryParams,
  ): {
    @statusCode statusCode: 200;
    @body body: PaginatedList<ConditionEra>;
  } | ErrorResponse;

  @get
  @summary("Get condition-era by ID")
  @doc("Retrieve a single ConditionEra record by its unique identifier.")
  read(
    @path
    @doc("Unique condition-era identifier")
    id: int64,
  ): {
    @statusCode statusCode: 200;
    @body body: ConditionEra;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @post
  @summary("Create a new condition-era")
  @doc("Create a new ConditionEra record.")
  create(
    @body
    @doc("ConditionEra data to create")
    record: ConditionEraCreate,
  ): {
    @statusCode statusCode: 201;
    @body body: ConditionEra;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @put
  @summary("Update condition-era (full replacement)")
  @doc("Replace all fields of an existing ConditionEra record.")
  update(
    @path
    @doc("Unique condition-era identifier")
    id: int64,

    @body
    @doc("Complete condition-era data")
    record: ConditionEraCreate,
  ): {
    @statusCode statusCode: 200;
    @body body: ConditionEra;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @patch(#{implicitOptionality: true})
  @summary("Update condition-era (partial)")
  @doc("Update specific fields of an existing ConditionEra record.")
  patch(
    @path
    @doc("Unique condition-era identifier")
    id: int64,

    @body
    @doc("Fields to update")
    record: ConditionEraUpdate,
  ): {
    @statusCode statusCode: 200;
    @body body: ConditionEra;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @delete
  @summary("Delete condition-era")
  @doc("Delete a ConditionEra record.")
  delete(
    @path
    @doc("Unique condition-era identifier")
    id: int64,
  ): {
    @statusCode statusCode: 204;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;
}
