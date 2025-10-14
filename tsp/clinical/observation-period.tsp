import "@typespec/http";
import "@typespec/rest";
import "../common/models.tsp";

using TypeSpec.Http;
using TypeSpec.Rest;
using OmopCdm.Common;

namespace OmopCdm.Clinical;

/**
 * ObservationPeriod Resource
 *
 * This table contains records which define spans of time during which
two conditions are expected to hold: (i) Clinical Events that happened
to the Person are recorded in the Event tables, and (ii) absence of
records indicate such Events did not occur during this span of time.
 *
 * **User Guide**: For each Person, one or more OBSERVATION_PERIOD records may be
present, but they will not overlap or be back to back to each other.
Events may exist outside all of the time spans of the OBSERVATION_PERIOD
records for a patient, however, absence of an Event outside these time
spans cannot be construed as evidence of absence of an Event. Incidence
or prevalence rates should only be calculated for the time of active
OBSERVATION_PERIOD records. When constructing cohorts, outside Events
can be used for inclusion criteria definition, but without any guarantee
for the performance of these criteria. Also, OBSERVATION_PERIOD records
can be as short as a single day, greatly disturbing the denominator of
any rate calculation as part of cohort characterizations. To avoid that,
apply minimal observation time as a requirement for any cohort
definition.
 *
 * **ETL Conventions**: Each Person needs to have at least one OBSERVATION_PERIOD record,
which should represent time intervals with a high capture rate of
Clinical Events. Some source data have very similar concepts, such as
enrollment periods in insurance claims data. In other source data such
as most EHR systems these time spans need to be inferred under a set of
assumptions. It is the discretion of the ETL developer to define these
assumptions. In many ETL solutions the start date of the first
occurrence or the first high quality occurrence of a Clinical Event
(Condition, Drug, Procedure, Device, Measurement, Visit) is defined as
the start of the OBSERVATION_PERIOD record, and the end date of the last
occurrence of last high quality occurrence of a Clinical Event, or the
end of the database period becomes the end of the OBSERVATION_PERIOD for
each Person. If a Person only has a single Clinical Event the
OBSERVATION_PERIOD record can be as short as one day. Depending on these
definitions it is possible that Clinical Events fall outside the time
spans defined by OBSERVATION_PERIOD records. Family history or history
of Clinical Events generally are not used to generate OBSERVATION_PERIOD
records around the time they are referring to. Any two overlapping or
adjacent OBSERVATION_PERIOD records have to be merged into one.
 */

@doc("ObservationPeriod record in the OMOP CDM")
model ObservationPeriod {
  @doc("A Person can have multiple discrete Observation Periods which are identified by the Observation_Period_Id. ETL Convention: Assign a unique observation_period_id to each discrete Observation Period for a Person.")
  @visibility("read")
  observation_period_id: int64;

  @doc("The Person ID of the PERSON record for which the Observation Period is recorded.  References PERSON table.")
  person_id: int64;

  @doc("Use this date to determine the start date of the Observation Period. ETL Convention: It is often the case that the idea of Observation Periods does not exist in source data. In those cases, the observation_period_start_date can be inferred as the earliest Event date available for the Person. In insurance claim data, the Observation Period can be considered as the time period the Person is enrolled with a payer. If a Person switches plans but stays with the same payer, and therefore capturing of data continues, that change would be captured in [PAYER_PLAN_PERIOD](https://ohdsi.github.io/CommonDataModel/cdm54.html#payer_plan_period).")
  observation_period_start_date: DateOnly;

  @doc("Use this date to determine the end date of the period for which we can assume that all events for a Person are recorded. ETL Convention: It is often the case that the idea of Observation Periods does not exist in source data. In those cases, the observation_period_end_date can be inferred as the last Event date available for the Person. In insurance claim data, the Observation Period can be considered as the time period the Person is enrolled with a payer.")
  observation_period_end_date: DateOnly;

  @doc("This field can be used to determine the provenance of the Observation Period as in whether the period was determined from an insurance enrollment file, EHR healthcare encounters, or other sources. ETL Convention: Choose the observation_period_type_concept_id that best represents how the period was determined. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Type+Concept&standardConcept=Standard&page=1&pageSize=15&query=). A more detailed explanation of each Type Concept can be found on the [vocabulary wiki](https://github.com/OHDSI/Vocabulary-v5.0/wiki/Vocab.-TYPE_CONCEPT). References CONCEPT table.")
  period_type_concept_id: ConceptId;
}

/**
 * ObservationPeriod creation request
 */
@doc("Request body for creating a new ObservationPeriod record")
model ObservationPeriodCreate {
  @doc("The Person ID of the PERSON record for which the Observation Period is recorded.  References PERSON table.")
  person_id: int64;

  @doc("Use this date to determine the start date of the Observation Period. ETL Convention: It is often the case that the idea of Observation Periods does not exist in source data. In those cases, the observation_period_start_date can be inferred as the earliest Event date available for the Person. In insurance claim data, the Observation Period can be considered as the time period the Person is enrolled with a payer. If a Person switches plans but stays with the same payer, and therefore capturing of data continues, that change would be captured in [PAYER_PLAN_PERIOD](https://ohdsi.github.io/CommonDataModel/cdm54.html#payer_plan_period).")
  observation_period_start_date: DateOnly;

  @doc("Use this date to determine the end date of the period for which we can assume that all events for a Person are recorded. ETL Convention: It is often the case that the idea of Observation Periods does not exist in source data. In those cases, the observation_period_end_date can be inferred as the last Event date available for the Person. In insurance claim data, the Observation Period can be considered as the time period the Person is enrolled with a payer.")
  observation_period_end_date: DateOnly;

  @doc("This field can be used to determine the provenance of the Observation Period as in whether the period was determined from an insurance enrollment file, EHR healthcare encounters, or other sources. ETL Convention: Choose the observation_period_type_concept_id that best represents how the period was determined. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Type+Concept&standardConcept=Standard&page=1&pageSize=15&query=). A more detailed explanation of each Type Concept can be found on the [vocabulary wiki](https://github.com/OHDSI/Vocabulary-v5.0/wiki/Vocab.-TYPE_CONCEPT). References CONCEPT table.")
  period_type_concept_id: ConceptId;
}

/**
 * ObservationPeriod update request
 */
@doc("Request body for updating an existing ObservationPeriod record")
model ObservationPeriodUpdate {
  @doc("The Person ID of the PERSON record for which the Observation Period is recorded.  References PERSON table.")
  person_id?: int64;

  @doc("Use this date to determine the start date of the Observation Period. ETL Convention: It is often the case that the idea of Observation Periods does not exist in source data. In those cases, the observation_period_start_date can be inferred as the earliest Event date available for the Person. In insurance claim data, the Observation Period can be considered as the time period the Person is enrolled with a payer. If a Person switches plans but stays with the same payer, and therefore capturing of data continues, that change would be captured in [PAYER_PLAN_PERIOD](https://ohdsi.github.io/CommonDataModel/cdm54.html#payer_plan_period).")
  observation_period_start_date?: DateOnly;

  @doc("Use this date to determine the end date of the period for which we can assume that all events for a Person are recorded. ETL Convention: It is often the case that the idea of Observation Periods does not exist in source data. In those cases, the observation_period_end_date can be inferred as the last Event date available for the Person. In insurance claim data, the Observation Period can be considered as the time period the Person is enrolled with a payer.")
  observation_period_end_date?: DateOnly;

  @doc("This field can be used to determine the provenance of the Observation Period as in whether the period was determined from an insurance enrollment file, EHR healthcare encounters, or other sources. ETL Convention: Choose the observation_period_type_concept_id that best represents how the period was determined. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Type+Concept&standardConcept=Standard&page=1&pageSize=15&query=). A more detailed explanation of each Type Concept can be found on the [vocabulary wiki](https://github.com/OHDSI/Vocabulary-v5.0/wiki/Vocab.-TYPE_CONCEPT). References CONCEPT table.")
  period_type_concept_id?: ConceptId;
}

/**
 * Query parameters for filtering observation-period
 */
@doc("Filter parameters for ObservationPeriod list operations")
model ObservationPeriodQueryParams {
  ...PaginationParams;

  @doc("Filter by person id")
  @query
  person_id?: int64;

  @doc("Filter by period type concept id")
  @query
  period_type_concept_id?: ConceptId;

  @doc("Sort field")
  @query
  sort_by?: "observation_period_id";

  @doc("Sort order")
  @query
  sort_order?: SortOrder;
}

/**
 * ObservationPeriod API operations
 */
@route("/observation-periods")
@tag("Clinical - ObservationPeriods")
interface ObservationPeriods {
  @get
  @summary("List all observation-periods")
  @doc("Returns a paginated list of ObservationPeriod records.")
  list(
    ...ObservationPeriodQueryParams,
  ): {
    @statusCode statusCode: 200;
    @body body: PaginatedList<ObservationPeriod>;
  } | ErrorResponse;

  @get
  @summary("Get observation-period by ID")
  @doc("Retrieve a single ObservationPeriod record by its unique identifier.")
  read(
    @path
    @doc("Unique observation-period identifier")
    observation_period_id: int64,
  ): {
    @statusCode statusCode: 200;
    @body body: ObservationPeriod;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @post
  @summary("Create a new observation-period")
  @doc("Create a new ObservationPeriod record.")
  create(
    @body
    @doc("ObservationPeriod data to create")
    record: ObservationPeriodCreate,
  ): {
    @statusCode statusCode: 201;
    @body body: ObservationPeriod;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @put
  @summary("Update observation-period (full replacement)")
  @doc("Replace all fields of an existing ObservationPeriod record.")
  update(
    @path
    @doc("Unique observation-period identifier")
    observation_period_id: int64,

    @body
    @doc("Complete observation-period data")
    record: ObservationPeriodCreate,
  ): {
    @statusCode statusCode: 200;
    @body body: ObservationPeriod;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @patch
  @summary("Update observation-period (partial)")
  @doc("Update specific fields of an existing ObservationPeriod record.")
  patch(
    @path
    @doc("Unique observation-period identifier")
    observation_period_id: int64,

    @body
    @doc("Fields to update")
    record: ObservationPeriodUpdate,
  ): {
    @statusCode statusCode: 200;
    @body body: ObservationPeriod;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @delete
  @summary("Delete observation-period")
  @doc("Delete a ObservationPeriod record.")
  delete(
    @path
    @doc("Unique observation-period identifier")
    observation_period_id: int64,
  ): {
    @statusCode statusCode: 204;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;
}
