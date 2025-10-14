import "@typespec/http";
import "@typespec/rest";
import "../common/models.tsp";

using TypeSpec.Http;
using TypeSpec.Rest;
using OmopCdm.Common;

namespace OmopCdm.Derived;

/**
 * EpisodeEvent Resource
 *
 * The EPISODE_EVENT table connects qualifying clinical events (such as
CONDITION_OCCURRENCE, DRUG_EXPOSURE, PROCEDURE_OCCURRENCE, MEASUREMENT)
to the appropriate EPISODE entry. For example, linking the precise
location of the metastasis (cancer modifier in MEASUREMENT) to the
disease episode.
 *
 * **User Guide**: This connecting table is used instead of the FACT_RELATIONSHIP table
for linking low-level events to abstracted Episodes.
 *
 * **ETL Conventions**: Some episodes may not have links to any underlying clinical events.
For such episodes, the EPISODE_EVENT table is not populated.
 */

@doc("EpisodeEvent record in the OMOP CDM")
@example(#{
  episode_id: 100,
  event_id: 100,
  episode_event_field_concept_id: 8507
})
model EpisodeEvent {
  @doc("Use this field to link the EPISODE_EVENT record to its EPISODE. ETL Convention: Put the EPISODE_ID that subsumes the EPISODE_EVENT record here. References EPISODE table.")
  episode_id: int64;

  @doc("This field is the primary key of the linked record in the database. For example, if the Episode Event is a Condition Occurrence, then the CONDITION_OCCURRENCE_ID of the linked record goes in this field. ETL Convention: Put the primary key of the linked record here.")
  event_id: int64;

  @doc("This field is the CONCEPT_ID that identifies which table the primary key of the linked record came from. ETL Convention: Put the CONCEPT_ID that identifies which table and field the EVENT_ID came from. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?vocabulary=CDM&conceptClass=Field&page=1&pageSize=15&query=) References CONCEPT table.")
  episode_event_field_concept_id: ConceptId;
}

/**
 * EpisodeEvent creation request
 */
@doc("Request body for creating a new EpisodeEvent record")
model EpisodeEventCreate {
  @doc("Use this field to link the EPISODE_EVENT record to its EPISODE. ETL Convention: Put the EPISODE_ID that subsumes the EPISODE_EVENT record here. References EPISODE table.")
  episode_id: int64;

  @doc("This field is the primary key of the linked record in the database. For example, if the Episode Event is a Condition Occurrence, then the CONDITION_OCCURRENCE_ID of the linked record goes in this field. ETL Convention: Put the primary key of the linked record here.")
  event_id: int64;

  @doc("This field is the CONCEPT_ID that identifies which table the primary key of the linked record came from. ETL Convention: Put the CONCEPT_ID that identifies which table and field the EVENT_ID came from. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?vocabulary=CDM&conceptClass=Field&page=1&pageSize=15&query=) References CONCEPT table.")
  episode_event_field_concept_id: ConceptId;
}

/**
 * EpisodeEvent update request
 */
@doc("Request body for updating an existing EpisodeEvent record")
model EpisodeEventUpdate {
  @doc("Use this field to link the EPISODE_EVENT record to its EPISODE. ETL Convention: Put the EPISODE_ID that subsumes the EPISODE_EVENT record here. References EPISODE table.")
  episode_id?: int64;

  @doc("This field is the primary key of the linked record in the database. For example, if the Episode Event is a Condition Occurrence, then the CONDITION_OCCURRENCE_ID of the linked record goes in this field. ETL Convention: Put the primary key of the linked record here.")
  event_id?: int64;

  @doc("This field is the CONCEPT_ID that identifies which table the primary key of the linked record came from. ETL Convention: Put the CONCEPT_ID that identifies which table and field the EVENT_ID came from. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?vocabulary=CDM&conceptClass=Field&page=1&pageSize=15&query=) References CONCEPT table.")
  episode_event_field_concept_id?: ConceptId;
}

/**
 * Query parameters for filtering episode-event
 */
@doc("Filter parameters for EpisodeEvent list operations")
model EpisodeEventQueryParams {
  ...PaginationParams;

  @doc("Filter by episode id")
  @query
  episode_id?: int64;

  @doc("Filter by episode event field concept id")
  @query
  episode_event_field_concept_id?: ConceptId;

  @doc("Sort field")
  @query
  sort_by?: "episode_event_id";

  @doc("Sort order")
  @query
  sort_order?: SortOrder;
}

/**
 * EpisodeEvent API operations
 */
@route("/episode-events")
@tag("Derived - EpisodeEvents")
interface EpisodeEvents {
  @get
  @summary("List all episode-events")
  @doc("Returns a paginated list of EpisodeEvent records.")
  list(
    ...EpisodeEventQueryParams,
  ): {
    @statusCode statusCode: 200;
    @body body: PaginatedList<EpisodeEvent>;
  } | ErrorResponse;

  @get
  @summary("Get episode-event by ID")
  @doc("Retrieve a single EpisodeEvent record by its unique identifier.")
  read(
    @path
    @doc("Unique episode-event identifier")
    episode_event_id: int64,
  ): {
    @statusCode statusCode: 200;
    @body body: EpisodeEvent;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @post
  @summary("Create a new episode-event")
  @doc("Create a new EpisodeEvent record.")
  create(
    @body
    @doc("EpisodeEvent data to create")
    record: EpisodeEventCreate,
  ): {
    @statusCode statusCode: 201;
    @body body: EpisodeEvent;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @put
  @summary("Update episode-event (full replacement)")
  @doc("Replace all fields of an existing EpisodeEvent record.")
  update(
    @path
    @doc("Unique episode-event identifier")
    episode_event_id: int64,

    @body
    @doc("Complete episode-event data")
    record: EpisodeEventCreate,
  ): {
    @statusCode statusCode: 200;
    @body body: EpisodeEvent;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @patch(#{implicitOptionality: true})
  @summary("Update episode-event (partial)")
  @doc("Update specific fields of an existing EpisodeEvent record.")
  patch(
    @path
    @doc("Unique episode-event identifier")
    episode_event_id: int64,

    @body
    @doc("Fields to update")
    record: EpisodeEventUpdate,
  ): {
    @statusCode statusCode: 200;
    @body body: EpisodeEvent;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @delete
  @summary("Delete episode-event")
  @doc("Delete a EpisodeEvent record.")
  delete(
    @path
    @doc("Unique episode-event identifier")
    episode_event_id: int64,
  ): {
    @statusCode statusCode: 204;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;
}
