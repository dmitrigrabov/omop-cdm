import "@typespec/http";
import "@typespec/rest";
import "../common/models.tsp";

using TypeSpec.Http;
using TypeSpec.Rest;
using OmopCdm.Common;

namespace OmopCdm.Results;

/**
 * Cohort Resource
 *
 * The subject of a cohort can have multiple, discrete records in the
cohort table per cohort_definition_id, subject_id, and non-overlapping
time periods. The definition of the cohort is contained within the
COHORT_DEFINITION table. It is listed as part of the RESULTS schema
because it is a table that users of the database as well as tools such
as ATLAS need to be able to write to. The CDM and Vocabulary tables are
all read-only so it is suggested that the COHORT and COHORT_DEFINTION
tables are kept in a separate schema to alleviate confusion.
 *
 * **User Guide**: NA
 *
 * **ETL Conventions**: Cohorts typically include patients diagnosed with a specific
condition, patients exposed to a particular drug, but can also be
Providers who have performed a specific Procedure. Cohort records must
have a Start Date and an End Date, but the End Date may be set to Start
Date or could have an applied censor date using the Observation Period
Start Date. Cohort records must contain a Subject Id, which can refer to
the Person, Provider, Visit record or Care Site though they are most
often Person Ids. The Cohort Definition will define the type of subject
through the subject concept id. A subject can belong (or not belong) to
a cohort at any moment in time. A subject can only have one record in
the cohort table for any moment of time, i.e. it is not possible for a
person to contain multiple records indicating cohort membership that are
overlapping in time
 */

@doc("Cohort record in the OMOP CDM")
@example(#{
  cohort_definition_id: 100,
  subject_id: 100,
  cohort_start_date: "2023-01-15",
  cohort_end_date: "2023-01-15"
})
model Cohort {
  @doc("")
  cohort_definition_id: int64;

  @doc("")
  subject_id: int64;

  @doc("")
  cohort_start_date: DateOnly;

  @doc("")
  cohort_end_date: DateOnly;
}

/**
 * Cohort creation request
 */
@doc("Request body for creating a new Cohort record")
model CohortCreate {
  @doc("")
  cohort_definition_id: int64;

  @doc("")
  subject_id: int64;

  @doc("")
  cohort_start_date: DateOnly;

  @doc("")
  cohort_end_date: DateOnly;
}

/**
 * Cohort update request
 */
@doc("Request body for updating an existing Cohort record")
model CohortUpdate {
  @doc("")
  cohort_definition_id?: int64;

  @doc("")
  subject_id?: int64;

  @doc("")
  cohort_start_date?: DateOnly;

  @doc("")
  cohort_end_date?: DateOnly;
}

/**
 * Query parameters for filtering cohort
 */
@doc("Filter parameters for Cohort list operations")
model CohortQueryParams {
  ...PaginationParams;

  // No filterable fields

  @doc("Sort field")
  @query
  sort_by?: "cohort_id";

  @doc("Sort order")
  @query
  sort_order?: SortOrder;
}

/**
 * Cohort API operations
 */
@route("/cohorts")
@tag("Results - Cohorts")
interface Cohorts {
  @get
  @summary("List all cohorts")
  @doc("Returns a paginated list of Cohort records.")
  list(
    ...CohortQueryParams,
  ): {
    @statusCode statusCode: 200;
    @body body: PaginatedList<Cohort>;
  } | ErrorResponse;

  @get
  @summary("Get cohort by ID")
  @doc("Retrieve a single Cohort record by its unique identifier.")
  read(
    @path
    @doc("Unique cohort identifier")
    cohort_id: int64,
  ): {
    @statusCode statusCode: 200;
    @body body: Cohort;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @post
  @summary("Create a new cohort")
  @doc("Create a new Cohort record.")
  create(
    @body
    @doc("Cohort data to create")
    record: CohortCreate,
  ): {
    @statusCode statusCode: 201;
    @body body: Cohort;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @put
  @summary("Update cohort (full replacement)")
  @doc("Replace all fields of an existing Cohort record.")
  update(
    @path
    @doc("Unique cohort identifier")
    cohort_id: int64,

    @body
    @doc("Complete cohort data")
    record: CohortCreate,
  ): {
    @statusCode statusCode: 200;
    @body body: Cohort;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @patch(#{implicitOptionality: true})
  @summary("Update cohort (partial)")
  @doc("Update specific fields of an existing Cohort record.")
  patch(
    @path
    @doc("Unique cohort identifier")
    cohort_id: int64,

    @body
    @doc("Fields to update")
    record: CohortUpdate,
  ): {
    @statusCode statusCode: 200;
    @body body: Cohort;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @delete
  @summary("Delete cohort")
  @doc("Delete a Cohort record.")
  delete(
    @path
    @doc("Unique cohort identifier")
    cohort_id: int64,
  ): {
    @statusCode statusCode: 204;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;
}
