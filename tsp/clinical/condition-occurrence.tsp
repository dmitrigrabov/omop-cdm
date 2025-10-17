import "@typespec/http";
import "@typespec/rest";
import "../common/models.tsp";

using TypeSpec.Http;
using TypeSpec.Rest;
using OmopCdm.Common;

namespace OmopCdm.Clinical;

/**
 * ConditionOccurrence Resource
 *
 * This table contains records of Events of a Person suggesting the
presence of a disease or medical condition stated as a diagnosis, a
sign, or a symptom, which is either observed by a Provider or reported
by the patient.
 *
 * **User Guide**: Conditions are defined by Concepts from the Condition domain, which
form a complex hierarchy. As a result, the same Person with the same
disease may have multiple Condition records, which belong to the same
hierarchical family. Most Condition records are mapped from diagnostic
codes, but recorded signs, symptoms and summary descriptions also
contribute to this table. Rule out diagnoses should not be recorded in
this table, but in reality their negating nature is not always captured
in the source data, and other precautions must be taken when when
identifying Persons who should suffer from the recorded Condition.
Record all conditions as they exist in the source data. Any decisions
about diagnosis/phenotype definitions would be done through cohort
specifications. These cohorts can be housed in the [COHORT](https://ohdsi.github.io/CommonDataModel/cdm54.html#payer_plan_period)
table. Conditions span a time interval from start to end, but are
typically recorded as single snapshot records with no end date. The
reason is twofold: (i) At the time of the recording the duration is not
known and later not recorded, and (ii) the Persons typically cease
interacting with the healthcare system when they feel better, which
leads to incomplete capture of resolved Conditions. The [CONDITION_ERA](https://ohdsi.github.io/CommonDataModel/cdm54.html#condition_era)
table addresses this issue. Family history and past diagnoses (‘history
of’) are not recorded in this table. Instead, they are listed in the [OBSERVATION](https://ohdsi.github.io/CommonDataModel/cdm54.html#observation)
table. Codes written in the process of establishing the diagnosis, such
as ‘question of’ of and ‘rule out’, should not represented here.
Instead, they should be recorded in the [OBSERVATION](https://ohdsi.github.io/CommonDataModel/cdm54.html#observation)
table, if they are used for analyses. However, this information is not
always available.
 *
 * **ETL Conventions**: Source codes and source text fields mapped to Standard Concepts of
the Condition Domain have to be recorded here.
 */

@doc("ConditionOccurrence record in the OMOP CDM")
@example(#{
  id: 12345,
  person_id: 100,
  condition_concept_id: 8507,
  condition_start_date: "2023-01-15",
  condition_start_datetime: "2023-01-15",
  condition_end_date: "2023-01-15",
  condition_end_datetime: "2023-01-15",
  condition_type_concept_id: 8507,
  condition_status_concept_id: 8507,
  stop_reason: "Example value",
  provider_id: 100,
  visit_occurrence_id: 100,
  visit_detail_id: 100,
  condition_source_value: "Example value",
  condition_source_concept_id: 8507,
  condition_status_source_value: "Example value"
})
model ConditionOccurrence {
  @doc("The unique key given to a condition record for a person. Refer to the ETL for how duplicate conditions during the same visit were handled. ETL Convention: Each instance of a condition present in the source data should be assigned this unique key. In some cases, a person can have multiple records of the same condition within the same visit. It is valid to keep these duplicates and assign them individual, unique, CONDITION_OCCURRENCE_IDs, though it is up to the ETL how they should be handled.")
  id: int64;

  @doc("The PERSON_ID of the PERSON for whom the condition is recorded. References PERSON table.")
  person_id: int64;

  @doc("The CONDITION_CONCEPT_ID field is recommended for primary use in analyses, and must be used for network studies. This is the standard concept mapped from the source value which represents a condition ETL Convention: The CONCEPT_ID that the CONDITION_SOURCE_VALUE maps to. Only records whose source values map to concepts with a domain of “Condition” should go in this table. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Condition&standardConcept=Standard&page=1&pageSize=15&query=). References CONCEPT table.")
  condition_concept_id: ConceptId;

  @doc("Use this date to determine the start date of the condition ETL Convention: Most often data sources do not have the idea of a start date for a condition. Rather, if a source only has one date associated with a condition record it is acceptable to use that date for both the CONDITION_START_DATE and the CONDITION_END_DATE.")
  condition_start_date: DateOnly;

  @doc("If a source does not specify datetime the convention is to set the time to midnight (00:00:0000)")
  condition_start_datetime?: DateTime;

  @doc("Use this date to determine the end date of the condition ETL Convention: Most often data sources do not have the idea of a start date for a condition. Rather, if a source only has one date associated with a condition record it is acceptable to use that date for both the CONDITION_START_DATE and the CONDITION_END_DATE.")
  condition_end_date?: DateOnly;

  @doc("If a source does not specify datetime the convention is to set the time to midnight (00:00:0000)")
  condition_end_datetime?: DateTime;

  @doc("This field can be used to determine the provenance of the Condition record, as in whether the condition was from an EHR system, insurance claim, registry, or other sources. ETL Convention: Choose the CONDITION_TYPE_CONCEPT_ID that best represents the provenance of the record. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Type+Concept&standardConcept=Standard&page=1&pageSize=15&query=). A more detailed explanation of each Type Concept can be found on the [vocabulary wiki](https://github.com/OHDSI/Vocabulary-v5.0/wiki/Vocab.-TYPE_CONCEPT). References CONCEPT table.")
  condition_type_concept_id: ConceptId;

  @doc("This concept represents the point during the visit the diagnosis was given (admitting diagnosis, final diagnosis), whether the diagnosis was determined due to laboratory findings, if the diagnosis was exclusionary, or if it was a preliminary diagnosis, among others. ETL Convention: Choose the Concept in the Condition Status domain that best represents the point during the visit when the diagnosis was given. These can include admitting diagnosis, principal diagnosis, and secondary diagnosis. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Condition+Status&standardConcept=Standard&page=1&pageSize=15&query=). References CONCEPT table.")
  condition_status_concept_id?: ConceptId;

  @doc("The Stop Reason indicates why a Condition is no longer valid with respect to the purpose within the source data. Note that a Stop Reason does not necessarily imply that the condition is no longer occurring. ETL Convention: This information is often not populated in source data and it is a valid etl choice to leave it blank if the information does not exist.")
  @maxLength(20)
  stop_reason?: string;

  @doc("The provider associated with condition record, e.g. the provider who made the diagnosis or the provider who recorded the symptom. ETL Convention: The ETL may need to make a choice as to which PROVIDER_ID to put here. Based on what is available this may or may not be different than the provider associated with the overall VISIT_OCCURRENCE record, for example the admitting vs attending physician on an EHR record. References PROVIDER table.")
  provider_id?: int64;

  @doc("The visit during which the condition occurred. ETL Convention: Depending on the structure of the source data, this may have to be determined based on dates. If a CONDITION_START_DATE occurs within the start and end date of a Visit it is a valid ETL choice to choose the VISIT_OCCURRENCE_ID from the Visit that subsumes it, even if not explicitly stated in the data. While not required, an attempt should be made to locate the VISIT_OCCURRENCE_ID of the CONDITION_OCCURRENCE record. References VISIT_OCCURRENCE table.")
  visit_occurrence_id?: int64;

  @doc("The VISIT_DETAIL record during which the condition occurred. For example, if the person was in the ICU at the time of the diagnosis the VISIT_OCCURRENCE record would reflect the overall hospital stay and the VISIT_DETAIL record would reflect the ICU stay during the hospital visit. ETL Convention: Same rules apply as for the VISIT_OCCURRENCE_ID. References VISIT_DETAIL table.")
  visit_detail_id?: int64;

  @doc("This field houses the verbatim value from the source data representing the condition that occurred. For example, this could be an ICD10 or Read code. ETL Convention: This code is mapped to a Standard Condition Concept in the Standardized Vocabularies and the original code is stored here for reference.")
  @maxLength(50)
  condition_source_value?: string;

  @doc("This is the concept representing the condition source value and may not necessarily be standard. This field is discouraged from use in analysis because it is not required to contain Standard Concepts that are used across the OHDSI community, and should only be used when Standard Concepts do not adequately represent the source detail for the Condition necessary for a given analytic use case. Consider using CONDITION_CONCEPT_ID instead to enable standardized analytics that can be consistent across the network. ETL Convention: If the CONDITION_SOURCE_VALUE is coded in the source data using an OMOP supported vocabulary put the concept id representing the source value here. References CONCEPT table.")
  condition_source_concept_id?: ConceptId;

  @doc("This field houses the verbatim value from the source data representing the condition status. ETL Convention: This information may be called something different in the source data but the field is meant to contain a value indicating when and how a diagnosis was given to a patient. This source value is mapped to a standard concept which is stored in the CONDITION_STATUS_CONCEPT_ID field.")
  @maxLength(50)
  condition_status_source_value?: string;
}

/**
 * ConditionOccurrence creation request
 */
@doc("Request body for creating a new ConditionOccurrence record")
model ConditionOccurrenceCreate {
  @doc("The PERSON_ID of the PERSON for whom the condition is recorded. References PERSON table.")
  person_id: int64;

  @doc("The CONDITION_CONCEPT_ID field is recommended for primary use in analyses, and must be used for network studies. This is the standard concept mapped from the source value which represents a condition ETL Convention: The CONCEPT_ID that the CONDITION_SOURCE_VALUE maps to. Only records whose source values map to concepts with a domain of “Condition” should go in this table. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Condition&standardConcept=Standard&page=1&pageSize=15&query=). References CONCEPT table.")
  condition_concept_id: ConceptId;

  @doc("Use this date to determine the start date of the condition ETL Convention: Most often data sources do not have the idea of a start date for a condition. Rather, if a source only has one date associated with a condition record it is acceptable to use that date for both the CONDITION_START_DATE and the CONDITION_END_DATE.")
  condition_start_date: DateOnly;

  @doc("If a source does not specify datetime the convention is to set the time to midnight (00:00:0000)")
  condition_start_datetime?: DateTime;

  @doc("Use this date to determine the end date of the condition ETL Convention: Most often data sources do not have the idea of a start date for a condition. Rather, if a source only has one date associated with a condition record it is acceptable to use that date for both the CONDITION_START_DATE and the CONDITION_END_DATE.")
  condition_end_date?: DateOnly;

  @doc("If a source does not specify datetime the convention is to set the time to midnight (00:00:0000)")
  condition_end_datetime?: DateTime;

  @doc("This field can be used to determine the provenance of the Condition record, as in whether the condition was from an EHR system, insurance claim, registry, or other sources. ETL Convention: Choose the CONDITION_TYPE_CONCEPT_ID that best represents the provenance of the record. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Type+Concept&standardConcept=Standard&page=1&pageSize=15&query=). A more detailed explanation of each Type Concept can be found on the [vocabulary wiki](https://github.com/OHDSI/Vocabulary-v5.0/wiki/Vocab.-TYPE_CONCEPT). References CONCEPT table.")
  condition_type_concept_id: ConceptId;

  @doc("This concept represents the point during the visit the diagnosis was given (admitting diagnosis, final diagnosis), whether the diagnosis was determined due to laboratory findings, if the diagnosis was exclusionary, or if it was a preliminary diagnosis, among others. ETL Convention: Choose the Concept in the Condition Status domain that best represents the point during the visit when the diagnosis was given. These can include admitting diagnosis, principal diagnosis, and secondary diagnosis. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Condition+Status&standardConcept=Standard&page=1&pageSize=15&query=). References CONCEPT table.")
  condition_status_concept_id?: ConceptId;

  @doc("The Stop Reason indicates why a Condition is no longer valid with respect to the purpose within the source data. Note that a Stop Reason does not necessarily imply that the condition is no longer occurring. ETL Convention: This information is often not populated in source data and it is a valid etl choice to leave it blank if the information does not exist.")
  @maxLength(20)
  stop_reason?: string;

  @doc("The provider associated with condition record, e.g. the provider who made the diagnosis or the provider who recorded the symptom. ETL Convention: The ETL may need to make a choice as to which PROVIDER_ID to put here. Based on what is available this may or may not be different than the provider associated with the overall VISIT_OCCURRENCE record, for example the admitting vs attending physician on an EHR record. References PROVIDER table.")
  provider_id?: int64;

  @doc("The visit during which the condition occurred. ETL Convention: Depending on the structure of the source data, this may have to be determined based on dates. If a CONDITION_START_DATE occurs within the start and end date of a Visit it is a valid ETL choice to choose the VISIT_OCCURRENCE_ID from the Visit that subsumes it, even if not explicitly stated in the data. While not required, an attempt should be made to locate the VISIT_OCCURRENCE_ID of the CONDITION_OCCURRENCE record. References VISIT_OCCURRENCE table.")
  visit_occurrence_id?: int64;

  @doc("The VISIT_DETAIL record during which the condition occurred. For example, if the person was in the ICU at the time of the diagnosis the VISIT_OCCURRENCE record would reflect the overall hospital stay and the VISIT_DETAIL record would reflect the ICU stay during the hospital visit. ETL Convention: Same rules apply as for the VISIT_OCCURRENCE_ID. References VISIT_DETAIL table.")
  visit_detail_id?: int64;

  @doc("This field houses the verbatim value from the source data representing the condition that occurred. For example, this could be an ICD10 or Read code. ETL Convention: This code is mapped to a Standard Condition Concept in the Standardized Vocabularies and the original code is stored here for reference.")
  @maxLength(50)
  condition_source_value?: string;

  @doc("This is the concept representing the condition source value and may not necessarily be standard. This field is discouraged from use in analysis because it is not required to contain Standard Concepts that are used across the OHDSI community, and should only be used when Standard Concepts do not adequately represent the source detail for the Condition necessary for a given analytic use case. Consider using CONDITION_CONCEPT_ID instead to enable standardized analytics that can be consistent across the network. ETL Convention: If the CONDITION_SOURCE_VALUE is coded in the source data using an OMOP supported vocabulary put the concept id representing the source value here. References CONCEPT table.")
  condition_source_concept_id?: ConceptId;

  @doc("This field houses the verbatim value from the source data representing the condition status. ETL Convention: This information may be called something different in the source data but the field is meant to contain a value indicating when and how a diagnosis was given to a patient. This source value is mapped to a standard concept which is stored in the CONDITION_STATUS_CONCEPT_ID field.")
  @maxLength(50)
  condition_status_source_value?: string;
}

/**
 * ConditionOccurrence update request
 */
@doc("Request body for updating an existing ConditionOccurrence record")
model ConditionOccurrenceUpdate {
  @doc("The PERSON_ID of the PERSON for whom the condition is recorded. References PERSON table.")
  person_id?: int64;

  @doc("The CONDITION_CONCEPT_ID field is recommended for primary use in analyses, and must be used for network studies. This is the standard concept mapped from the source value which represents a condition ETL Convention: The CONCEPT_ID that the CONDITION_SOURCE_VALUE maps to. Only records whose source values map to concepts with a domain of “Condition” should go in this table. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Condition&standardConcept=Standard&page=1&pageSize=15&query=). References CONCEPT table.")
  condition_concept_id?: ConceptId;

  @doc("Use this date to determine the start date of the condition ETL Convention: Most often data sources do not have the idea of a start date for a condition. Rather, if a source only has one date associated with a condition record it is acceptable to use that date for both the CONDITION_START_DATE and the CONDITION_END_DATE.")
  condition_start_date?: DateOnly;

  @doc("If a source does not specify datetime the convention is to set the time to midnight (00:00:0000)")
  condition_start_datetime?: DateTime;

  @doc("Use this date to determine the end date of the condition ETL Convention: Most often data sources do not have the idea of a start date for a condition. Rather, if a source only has one date associated with a condition record it is acceptable to use that date for both the CONDITION_START_DATE and the CONDITION_END_DATE.")
  condition_end_date?: DateOnly;

  @doc("If a source does not specify datetime the convention is to set the time to midnight (00:00:0000)")
  condition_end_datetime?: DateTime;

  @doc("This field can be used to determine the provenance of the Condition record, as in whether the condition was from an EHR system, insurance claim, registry, or other sources. ETL Convention: Choose the CONDITION_TYPE_CONCEPT_ID that best represents the provenance of the record. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Type+Concept&standardConcept=Standard&page=1&pageSize=15&query=). A more detailed explanation of each Type Concept can be found on the [vocabulary wiki](https://github.com/OHDSI/Vocabulary-v5.0/wiki/Vocab.-TYPE_CONCEPT). References CONCEPT table.")
  condition_type_concept_id?: ConceptId;

  @doc("This concept represents the point during the visit the diagnosis was given (admitting diagnosis, final diagnosis), whether the diagnosis was determined due to laboratory findings, if the diagnosis was exclusionary, or if it was a preliminary diagnosis, among others. ETL Convention: Choose the Concept in the Condition Status domain that best represents the point during the visit when the diagnosis was given. These can include admitting diagnosis, principal diagnosis, and secondary diagnosis. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Condition+Status&standardConcept=Standard&page=1&pageSize=15&query=). References CONCEPT table.")
  condition_status_concept_id?: ConceptId;

  @doc("The Stop Reason indicates why a Condition is no longer valid with respect to the purpose within the source data. Note that a Stop Reason does not necessarily imply that the condition is no longer occurring. ETL Convention: This information is often not populated in source data and it is a valid etl choice to leave it blank if the information does not exist.")
  stop_reason?: string;

  @doc("The provider associated with condition record, e.g. the provider who made the diagnosis or the provider who recorded the symptom. ETL Convention: The ETL may need to make a choice as to which PROVIDER_ID to put here. Based on what is available this may or may not be different than the provider associated with the overall VISIT_OCCURRENCE record, for example the admitting vs attending physician on an EHR record. References PROVIDER table.")
  provider_id?: int64;

  @doc("The visit during which the condition occurred. ETL Convention: Depending on the structure of the source data, this may have to be determined based on dates. If a CONDITION_START_DATE occurs within the start and end date of a Visit it is a valid ETL choice to choose the VISIT_OCCURRENCE_ID from the Visit that subsumes it, even if not explicitly stated in the data. While not required, an attempt should be made to locate the VISIT_OCCURRENCE_ID of the CONDITION_OCCURRENCE record. References VISIT_OCCURRENCE table.")
  visit_occurrence_id?: int64;

  @doc("The VISIT_DETAIL record during which the condition occurred. For example, if the person was in the ICU at the time of the diagnosis the VISIT_OCCURRENCE record would reflect the overall hospital stay and the VISIT_DETAIL record would reflect the ICU stay during the hospital visit. ETL Convention: Same rules apply as for the VISIT_OCCURRENCE_ID. References VISIT_DETAIL table.")
  visit_detail_id?: int64;

  @doc("This field houses the verbatim value from the source data representing the condition that occurred. For example, this could be an ICD10 or Read code. ETL Convention: This code is mapped to a Standard Condition Concept in the Standardized Vocabularies and the original code is stored here for reference.")
  condition_source_value?: string;

  @doc("This is the concept representing the condition source value and may not necessarily be standard. This field is discouraged from use in analysis because it is not required to contain Standard Concepts that are used across the OHDSI community, and should only be used when Standard Concepts do not adequately represent the source detail for the Condition necessary for a given analytic use case. Consider using CONDITION_CONCEPT_ID instead to enable standardized analytics that can be consistent across the network. ETL Convention: If the CONDITION_SOURCE_VALUE is coded in the source data using an OMOP supported vocabulary put the concept id representing the source value here. References CONCEPT table.")
  condition_source_concept_id?: ConceptId;

  @doc("This field houses the verbatim value from the source data representing the condition status. ETL Convention: This information may be called something different in the source data but the field is meant to contain a value indicating when and how a diagnosis was given to a patient. This source value is mapped to a standard concept which is stored in the CONDITION_STATUS_CONCEPT_ID field.")
  condition_status_source_value?: string;
}

/**
 * Query parameters for filtering condition-occurrence
 */
@doc("Filter parameters for ConditionOccurrence list operations")
model ConditionOccurrenceQueryParams {
  ...PaginationParams;

  @doc("Filter by person id")
  @query
  person_id?: int64;

  @doc("Filter by condition concept id")
  @query
  condition_concept_id?: ConceptId;

  @doc("Filter by condition type concept id")
  @query
  condition_type_concept_id?: ConceptId;

  @doc("Filter by condition status concept id")
  @query
  condition_status_concept_id?: ConceptId;

  @doc("Filter by provider id")
  @query
  provider_id?: int64;

  @doc("Filter by visit occurrence id")
  @query
  visit_occurrence_id?: int64;

  @doc("Filter by visit detail id")
  @query
  visit_detail_id?: int64;

  @doc("Filter by condition source concept id")
  @query
  condition_source_concept_id?: ConceptId;

  @doc("Sort field")
  @query
  sort_by?: "id";

  @doc("Sort order")
  @query
  sort_order?: SortOrder;
}

/**
 * ConditionOccurrence API operations
 */
@route("/condition-occurrences")
@tag("Clinical - ConditionOccurrences")
interface ConditionOccurrences {
  @get
  @summary("List all condition-occurrences")
  @doc("Returns a paginated list of ConditionOccurrence records.")
  list(
    ...ConditionOccurrenceQueryParams,
  ): {
    @statusCode statusCode: 200;
    @body body: PaginatedList<ConditionOccurrence>;
  } | ErrorResponse;

  @get
  @summary("Get condition-occurrence by ID")
  @doc("Retrieve a single ConditionOccurrence record by its unique identifier.")
  read(
    @path
    @doc("Unique condition-occurrence identifier")
    id: int64,
  ): {
    @statusCode statusCode: 200;
    @body body: ConditionOccurrence;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @post
  @summary("Create a new condition-occurrence")
  @doc("Create a new ConditionOccurrence record.")
  create(
    @body
    @doc("ConditionOccurrence data to create")
    record: ConditionOccurrenceCreate,
  ): {
    @statusCode statusCode: 201;
    @body body: ConditionOccurrence;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @put
  @summary("Update condition-occurrence (full replacement)")
  @doc("Replace all fields of an existing ConditionOccurrence record.")
  update(
    @path
    @doc("Unique condition-occurrence identifier")
    id: int64,

    @body
    @doc("Complete condition-occurrence data")
    record: ConditionOccurrenceCreate,
  ): {
    @statusCode statusCode: 200;
    @body body: ConditionOccurrence;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @patch(#{implicitOptionality: true})
  @summary("Update condition-occurrence (partial)")
  @doc("Update specific fields of an existing ConditionOccurrence record.")
  patch(
    @path
    @doc("Unique condition-occurrence identifier")
    id: int64,

    @body
    @doc("Fields to update")
    record: ConditionOccurrenceUpdate,
  ): {
    @statusCode statusCode: 200;
    @body body: ConditionOccurrence;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @delete
  @summary("Delete condition-occurrence")
  @doc("Delete a ConditionOccurrence record.")
  delete(
    @path
    @doc("Unique condition-occurrence identifier")
    id: int64,
  ): {
    @statusCode statusCode: 204;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;
}
