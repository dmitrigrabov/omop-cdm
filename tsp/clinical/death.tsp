import "@typespec/http";
import "@typespec/rest";
import "../common/models.tsp";

using TypeSpec.Http;
using TypeSpec.Rest;
using OmopCdm.Common;

namespace OmopCdm.Clinical;

/**
 * Death Resource
 *
 * The death domain contains the clinical event for how and when a
Person dies. A person can have up to one record if the source system
contains evidence about the Death, such as: Condition in an
administrative claim, status of enrollment into a health plan, or
explicit record in EHR data.
 *
 * **User Guide**: NA
 *
 * **ETL Conventions**: For specific conventions on how to populate this table, please refer
to the [THEMIS
repository](https://ohdsi.github.io/Themis/death.html).
 */

@doc("Death record in the OMOP CDM")
@example(#{
  person_id: 100,
  death_date: "2023-01-15",
  death_datetime: "2023-01-15",
  death_type_concept_id: 8507,
  cause_concept_id: 8507,
  cause_source_value: "Example value",
  cause_source_concept_id: 8507
})
model Death {
  @doc("References PERSON table.")
  person_id: int64;

  @doc("The date the person was deceased. ETL Convention: If the precise date include day or month is not known or not allowed, December is used as the default month, and the last day of the month the default day. For additional conventions related to this field, please refer to the [THEMIS repository](https://ohdsi.github.io/Themis/tag_death_date.html).")
  death_date: DateOnly;

  @doc("If you have date and time of death, populate death_datetime, otherwise leave NULL")
  death_datetime?: DateTime;

  @doc("This is the provenance of the death record, i.e., where it came from. It is possible that an administrative claims database would source death information from a government file so do not assume the Death Type is the same as the Visit Type, etc. ETL Convention: Use the type concept that reflects the source of the death record. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Type+Concept&standardConcept=Standard&page=1&pageSize=15&query=). A more detailed explanation of each Type Concept can be found on the [vocabulary wiki](https://github.com/OHDSI/Vocabulary-v5.0/wiki/Vocab.-TYPE_CONCEPT). References CONCEPT table.")
  death_type_concept_id?: ConceptId;

  @doc("This is the Standard Concept representing the Person’s cause of death, if available. ETL Convention: There is no specified domain for this concept, just choose the Standard Concept Id that best represents the person’s cause of death. References CONCEPT table.")
  cause_concept_id?: ConceptId;

  @doc("If available, put the source code representing the cause of death here.")
  @maxLength(50)
  cause_source_value?: string;

  @doc("If the cause of death was coded using a Vocabulary present in the OMOP Vocabularies (not necessarily a standard concept) put the CONCEPT_ID representing the cause of death here. References CONCEPT table.")
  cause_source_concept_id?: ConceptId;
}

/**
 * Death creation request
 */
@doc("Request body for creating a new Death record")
model DeathCreate {
  @doc("References PERSON table.")
  person_id: int64;

  @doc("The date the person was deceased. ETL Convention: If the precise date include day or month is not known or not allowed, December is used as the default month, and the last day of the month the default day. For additional conventions related to this field, please refer to the [THEMIS repository](https://ohdsi.github.io/Themis/tag_death_date.html).")
  death_date: DateOnly;

  @doc("If you have date and time of death, populate death_datetime, otherwise leave NULL")
  death_datetime?: DateTime;

  @doc("This is the provenance of the death record, i.e., where it came from. It is possible that an administrative claims database would source death information from a government file so do not assume the Death Type is the same as the Visit Type, etc. ETL Convention: Use the type concept that reflects the source of the death record. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Type+Concept&standardConcept=Standard&page=1&pageSize=15&query=). A more detailed explanation of each Type Concept can be found on the [vocabulary wiki](https://github.com/OHDSI/Vocabulary-v5.0/wiki/Vocab.-TYPE_CONCEPT). References CONCEPT table.")
  death_type_concept_id?: ConceptId;

  @doc("This is the Standard Concept representing the Person’s cause of death, if available. ETL Convention: There is no specified domain for this concept, just choose the Standard Concept Id that best represents the person’s cause of death. References CONCEPT table.")
  cause_concept_id?: ConceptId;

  @doc("If available, put the source code representing the cause of death here.")
  @maxLength(50)
  cause_source_value?: string;

  @doc("If the cause of death was coded using a Vocabulary present in the OMOP Vocabularies (not necessarily a standard concept) put the CONCEPT_ID representing the cause of death here. References CONCEPT table.")
  cause_source_concept_id?: ConceptId;
}

/**
 * Death update request
 */
@doc("Request body for updating an existing Death record")
model DeathUpdate {
  @doc("References PERSON table.")
  person_id?: int64;

  @doc("The date the person was deceased. ETL Convention: If the precise date include day or month is not known or not allowed, December is used as the default month, and the last day of the month the default day. For additional conventions related to this field, please refer to the [THEMIS repository](https://ohdsi.github.io/Themis/tag_death_date.html).")
  death_date?: DateOnly;

  @doc("If you have date and time of death, populate death_datetime, otherwise leave NULL")
  death_datetime?: DateTime;

  @doc("This is the provenance of the death record, i.e., where it came from. It is possible that an administrative claims database would source death information from a government file so do not assume the Death Type is the same as the Visit Type, etc. ETL Convention: Use the type concept that reflects the source of the death record. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Type+Concept&standardConcept=Standard&page=1&pageSize=15&query=). A more detailed explanation of each Type Concept can be found on the [vocabulary wiki](https://github.com/OHDSI/Vocabulary-v5.0/wiki/Vocab.-TYPE_CONCEPT). References CONCEPT table.")
  death_type_concept_id?: ConceptId;

  @doc("This is the Standard Concept representing the Person’s cause of death, if available. ETL Convention: There is no specified domain for this concept, just choose the Standard Concept Id that best represents the person’s cause of death. References CONCEPT table.")
  cause_concept_id?: ConceptId;

  @doc("If available, put the source code representing the cause of death here.")
  cause_source_value?: string;

  @doc("If the cause of death was coded using a Vocabulary present in the OMOP Vocabularies (not necessarily a standard concept) put the CONCEPT_ID representing the cause of death here. References CONCEPT table.")
  cause_source_concept_id?: ConceptId;
}

/**
 * Query parameters for filtering death
 */
@doc("Filter parameters for Death list operations")
model DeathQueryParams {
  ...PaginationParams;

  @doc("Filter by person id")
  @query
  person_id?: int64;

  @doc("Filter by death type concept id")
  @query
  death_type_concept_id?: ConceptId;

  @doc("Filter by cause concept id")
  @query
  cause_concept_id?: ConceptId;

  @doc("Filter by cause source concept id")
  @query
  cause_source_concept_id?: ConceptId;

  @doc("Sort field")
  @query
  sort_by?: "id";

  @doc("Sort order")
  @query
  sort_order?: SortOrder;
}

/**
 * Death list response with example
 */
@doc("Paginated list of Death records")
@example(#{
  data: #[#{
  person_id: 100,
  death_date: "2023-01-15",
  death_datetime: "2023-01-15",
  death_type_concept_id: 8507,
  cause_concept_id: 8507,
  cause_source_value: "Example value",
  cause_source_concept_id: 8507
}],
  pagination: #{
    total: 1,
    offset: 0,
    limit: 100,
    count: 1
  }
})
model DeathList {
  ...PaginatedList<Death>;
}

/**
 * Death API operations
 */
@route("/deaths")
@tag("Clinical - Deaths")
interface Deaths {
  @get
  @summary("List all deaths")
  @doc("Returns a paginated list of Death records.")
  list(
    ...DeathQueryParams,
  ): {
    @statusCode statusCode: 200;
    @body body: DeathList;
  } | ErrorResponse;

  @get
  @summary("Get death by ID")
  @doc("Retrieve a single Death record by its unique identifier.")
  read(
    @path
    @doc("Unique death identifier")
    id: string,
  ): {
    @statusCode statusCode: 200;
    @body body: Death;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @post
  @summary("Create a new death")
  @doc("Create a new Death record.")
  create(
    @body
    @doc("Death data to create")
    record: DeathCreate,
  ): {
    @statusCode statusCode: 201;
    @body body: Death;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @put
  @summary("Update death (full replacement)")
  @doc("Replace all fields of an existing Death record.")
  update(
    @path
    @doc("Unique death identifier")
    id: string,

    @body
    @doc("Complete death data")
    record: DeathCreate,
  ): {
    @statusCode statusCode: 200;
    @body body: Death;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @patch(#{implicitOptionality: true})
  @summary("Update death (partial)")
  @doc("Update specific fields of an existing Death record.")
  patch(
    @path
    @doc("Unique death identifier")
    id: string,

    @body
    @doc("Fields to update")
    record: DeathUpdate,
  ): {
    @statusCode statusCode: 200;
    @body body: Death;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @delete
  @summary("Delete death")
  @doc("Delete a Death record.")
  delete(
    @path
    @doc("Unique death identifier")
    id: string,
  ): {
    @statusCode statusCode: 204;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;
}
