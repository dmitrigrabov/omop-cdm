import "@typespec/http";
import "@typespec/rest";
import "../common/models.tsp";

using TypeSpec.Http;
using TypeSpec.Rest;
using OmopCdm.Common;

namespace OmopCdm.Clinical;

/**
 * VisitDetail Resource
 *
 * The VISIT_DETAIL table is an optional table used to represents
details of each record in the parent VISIT_OCCURRENCE table. A good
example of this would be the movement between units in a hospital during
an inpatient stay or claim lines associated with a one insurance claim.
For every record in the VISIT_OCCURRENCE table there may be 0 or more
records in the VISIT_DETAIL table with a 1:n relationship where n may be
0. The VISIT_DETAIL table is structurally very similar to
VISIT_OCCURRENCE table and belongs to the visit domain.
 *
 * **User Guide**: The configuration defining the Visit Detail is described by Concepts
in the Visit Domain, which form a hierarchical structure. The Visit
Detail record will have an associated to the Visit Occurrence record in
two ways:   
 1. The Visit Detail record will have the
VISIT_OCCURRENCE_ID it is associated to 2. The VISIT_DETAIL_CONCEPT_ID
will be a descendant of the VISIT_CONCEPT_ID for the Visit.
 *
 * **ETL Conventions**: It is not mandatory that the VISIT_DETAIL table be filled in, but if
you find that the logic to create VISIT_OCCURRENCE records includes the
roll-up of multiple smaller records to create one picture of a Visit
then it is a good idea to use VISIT_DETAIL. In EHR data, for example, a
Person may be in the hospital but instead of one over-arching Visit
their encounters are recorded as times they interacted with a health
care provider. A Person in the hospital interacts with multiple
providers multiple times a day so the encounters must be strung together
using some heuristic (defined by the ETL) to identify the entire Visit.
In this case the encounters would be considered Visit Details and the
entire Visit would be the Visit Occurrence. In this example it is also
possible to use the Vocabulary to distinguish Visit Details from a Visit
Occurrence by setting the VISIT_CONCEPT_ID to [9201](https://athena.ohdsi.org/search-terms/terms/9201) and the
VISIT_DETAIL_CONCEPT_IDs either to 9201 or its children to indicate
where the patient was in the hospital at the time of care.
 */

@doc("VisitDetail record in the OMOP CDM")
@example(#{
  visit_detail_id: 12345,
  person_id: 100,
  visit_detail_concept_id: 8507,
  visit_detail_start_date: "2023-01-15",
  visit_detail_start_datetime: "2023-01-15",
  visit_detail_end_date: "2023-01-15",
  visit_detail_end_datetime: "2023-01-15",
  visit_detail_type_concept_id: 8507,
  provider_id: 100,
  care_site_id: 100,
  visit_detail_source_value: "Example value",
  visit_detail_source_concept_id: 8507,
  admitted_from_concept_id: 8507,
  admitted_from_source_value: "Example value",
  discharged_to_source_value: "Example value",
  discharged_to_concept_id: 8507,
  preceding_visit_detail_id: 100,
  parent_visit_detail_id: 100,
  visit_occurrence_id: 100
})
model VisitDetail {
  @doc("Use this to identify unique interactions between a person and the health care system. This identifier links across the other CDM event tables to associate events with a visit detail. ETL Convention: This should be populated by creating a unique identifier for each unique interaction between a person and the healthcare system where the person receives a medical good or service over a span of time.")
  visit_detail_id: int64;

  @doc("References PERSON table.")
  person_id: int64;

  @doc("This field contains a concept id representing the kind of visit detail, like inpatient or outpatient. All concepts in this field should be standard and belong to the Visit domain. ETL Convention: Populate this field based on the kind of visit that took place for the person. For example this could be “Inpatient Visit”, “Outpatient Visit”, “Ambulatory Visit”, etc. This table will contain standard concepts in the Visit domain. These concepts are arranged in a hierarchical structure to facilitate cohort definitions by rolling up to generally familiar Visits adopted in most healthcare systems worldwide. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Visit&standardConcept=Standard&page=1&pageSize=15&query=). References CONCEPT table.")
  visit_detail_concept_id: ConceptId;

  @doc("This is the date of the start of the encounter. This may or may not be equal to the date of the Visit the Visit Detail is associated with. ETL Convention: When populating VISIT_DETAIL_START_DATE, you should think about the patient experience to make decisions on how to define visits. Most likely this should be the date of the patient-provider interaction.")
  visit_detail_start_date: DateOnly;

  @doc("If no time is given for the start date of a visit, set it to midnight (00:00:0000).")
  visit_detail_start_datetime?: DateTime;

  @doc("This the end date of the patient-provider interaction. If a Person is still an inpatient in the hospital at the time of the data extract and does not have a visit_end_date, then set the visit_end_date to the date of the data pull. ETL Convention: Visit Detail end dates are mandatory. If end dates are not provided in the source there are three ways in which to derive them: - Outpatient Visit Detail: visit_detail_end_datetime = visit_detail_start_datetime - Emergency Room Visit Detail: visit_detail_end_datetime = visit_detail_start_datetime - Inpatient Visit Detail: Usually there is information about discharge. If not, you should be able to derive the end date from the sudden decline of activity or from the absence of inpatient procedures/drugs. - Non-hospital institution Visit Details: Particularly for claims data, if end dates are not provided assume the visit is for the duration of month that it occurs. For Inpatient Visit Details ongoing at the date of ETL, put date of processing the data into visit_detai_end_datetime and visit_detail_type_concept_id with 32220 “Still patient” to identify the visit as incomplete. All other Visits Details: visit_detail_end_datetime = visit_detail_start_datetime.")
  visit_detail_end_date: DateOnly;

  @doc("If a Person is still an inpatient in the hospital at the time of the data extract and does not have a visit_end_datetime, then set the visit_end_datetime to the datetime of the data pull. ETL Convention: If no time is given for the end date of a visit, set it to midnight (00:00:0000).")
  visit_detail_end_datetime?: DateTime;

  @doc("Use this field to understand the provenance of the visit detail record, or where the record comes from. ETL Convention: Populate this field based on the provenance of the visit detail record, as in whether it came from an EHR record or billing claim. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Type+Concept&standardConcept=Standard&page=1&pageSize=15&query=). A more detailed explanation of each Type Concept can be found on the [vocabulary wiki](https://github.com/OHDSI/Vocabulary-v5.0/wiki/Vocab.-TYPE_CONCEPT). References CONCEPT table.")
  visit_detail_type_concept_id: ConceptId;

  @doc("There will only be one provider per **visit** record and the ETL document should clearly state how they were chosen (attending, admitting, etc.). This is a typical reason for leveraging the VISIT_DETAIL table as even though each VISIT_DETAIL record can only have one provider, there is no limit to the number of VISIT_DETAIL records that can be associated to a VISIT_OCCURRENCE record. ETL Convention: The additional providers associated to a Visit can be stored in this table where each VISIT_DETAIL record represents a different provider. References PROVIDER table.")
  provider_id?: int64;

  @doc("This field provides information about the Care Site where the Visit Detail took place. ETL Convention: There should only be one Care Site associated with a Visit Detail. References CARE_SITE table.")
  care_site_id?: int64;

  @doc("This field houses the verbatim value from the source data representing the kind of visit detail that took place (inpatient, outpatient, emergency, etc.) ETL Convention: If there is information about the kind of visit detail in the source data that value should be stored here. If a visit is an amalgamation of visits from the source then use a hierarchy to choose the VISIT_DETAIL_SOURCE_VALUE, such as IP -> ER-> OP. This should line up with the logic chosen to determine how visits are created.")
  @maxLength(50)
  visit_detail_source_value?: string;

  @doc("If the VISIT_DETAIL_SOURCE_VALUE is coded in the source data using an OMOP supported vocabulary put the concept id representing the source value here. References CONCEPT table.")
  visit_detail_source_concept_id?: ConceptId;

  @doc("Use this field to determine where the patient was admitted from. This concept is part of the visit domain and can indicate if a patient was admitted to the hospital from a long-term care facility, for example. ETL Convention: If available, map the admitted_from_source_value to a standard concept in the visit domain. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Visit&standardConcept=Standard&page=1&pageSize=15&query=). If a person was admitted from home or was self-referred, set this to 0. References CONCEPT table.")
  admitted_from_concept_id?: ConceptId;

  @doc("This information may be called something different in the source data but the field is meant to contain a value indicating where a person was admitted from. Typically this applies only to visits that have a length of stay, like inpatient visits or long-term care visits.")
  @maxLength(50)
  admitted_from_source_value?: string;

  @doc("This information may be called something different in the source data but the field is meant to contain a value indicating where a person was discharged to after a visit, as in they went home or were moved to long-term care. Typically this applies only to visits that have a length of stay of a day or more.")
  @maxLength(50)
  discharged_to_source_value?: string;

  @doc("Use this field to determine where the patient was discharged to after a visit. This concept is part of the visit domain and can indicate if a patient was transferred to another hospital or sent to a long-term care facility, for example. It is assumed that a person is discharged to home therefore there is not a standard concept id for “home”. Use concept id = 0 when a person is discharged to home. ETL Convention: If available, map the DISCHARGE_TO_SOURCE_VALUE to a Standard Concept in the Visit domain. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Visit&standardConcept=Standard&page=1&pageSize=15&query=). References CONCEPT table.")
  discharged_to_concept_id?: ConceptId;

  @doc("Use this field to find the visit detail that occurred for the person prior to the given visit detail record. There could be a few days or a few years in between. ETL Convention: The PRECEDING_VISIT_DETAIL_ID can be used to link a visit immediately preceding the current Visit Detail. Note this is not symmetrical, and there is no such thing as a “following_visit_id”. References VISIT_DETAIL table.")
  preceding_visit_detail_id?: int64;

  @doc("Use this field to find the visit detail that subsumes the given visit detail record. This is used in the case that a visit detail record needs to be nested beyond the VISIT_OCCURRENCE/VISIT_DETAIL relationship. ETL Convention: If there are multiple nested levels to how Visits are represented in the source, the VISIT_DETAIL_PARENT_ID can be used to record this relationship. References VISIT_DETAIL table.")
  parent_visit_detail_id?: int64;

  @doc("Use this field to link the VISIT_DETAIL record to its VISIT_OCCURRENCE. ETL Convention: Put the VISIT_OCCURRENCE_ID that subsumes the VISIT_DETAIL record here. References VISIT_OCCURRENCE table.")
  visit_occurrence_id: int64;
}

/**
 * VisitDetail creation request
 */
@doc("Request body for creating a new VisitDetail record")
model VisitDetailCreate {
  @doc("References PERSON table.")
  person_id: int64;

  @doc("This field contains a concept id representing the kind of visit detail, like inpatient or outpatient. All concepts in this field should be standard and belong to the Visit domain. ETL Convention: Populate this field based on the kind of visit that took place for the person. For example this could be “Inpatient Visit”, “Outpatient Visit”, “Ambulatory Visit”, etc. This table will contain standard concepts in the Visit domain. These concepts are arranged in a hierarchical structure to facilitate cohort definitions by rolling up to generally familiar Visits adopted in most healthcare systems worldwide. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Visit&standardConcept=Standard&page=1&pageSize=15&query=). References CONCEPT table.")
  visit_detail_concept_id: ConceptId;

  @doc("This is the date of the start of the encounter. This may or may not be equal to the date of the Visit the Visit Detail is associated with. ETL Convention: When populating VISIT_DETAIL_START_DATE, you should think about the patient experience to make decisions on how to define visits. Most likely this should be the date of the patient-provider interaction.")
  visit_detail_start_date: DateOnly;

  @doc("If no time is given for the start date of a visit, set it to midnight (00:00:0000).")
  visit_detail_start_datetime?: DateTime;

  @doc("This the end date of the patient-provider interaction. If a Person is still an inpatient in the hospital at the time of the data extract and does not have a visit_end_date, then set the visit_end_date to the date of the data pull. ETL Convention: Visit Detail end dates are mandatory. If end dates are not provided in the source there are three ways in which to derive them: - Outpatient Visit Detail: visit_detail_end_datetime = visit_detail_start_datetime - Emergency Room Visit Detail: visit_detail_end_datetime = visit_detail_start_datetime - Inpatient Visit Detail: Usually there is information about discharge. If not, you should be able to derive the end date from the sudden decline of activity or from the absence of inpatient procedures/drugs. - Non-hospital institution Visit Details: Particularly for claims data, if end dates are not provided assume the visit is for the duration of month that it occurs. For Inpatient Visit Details ongoing at the date of ETL, put date of processing the data into visit_detai_end_datetime and visit_detail_type_concept_id with 32220 “Still patient” to identify the visit as incomplete. All other Visits Details: visit_detail_end_datetime = visit_detail_start_datetime.")
  visit_detail_end_date: DateOnly;

  @doc("If a Person is still an inpatient in the hospital at the time of the data extract and does not have a visit_end_datetime, then set the visit_end_datetime to the datetime of the data pull. ETL Convention: If no time is given for the end date of a visit, set it to midnight (00:00:0000).")
  visit_detail_end_datetime?: DateTime;

  @doc("Use this field to understand the provenance of the visit detail record, or where the record comes from. ETL Convention: Populate this field based on the provenance of the visit detail record, as in whether it came from an EHR record or billing claim. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Type+Concept&standardConcept=Standard&page=1&pageSize=15&query=). A more detailed explanation of each Type Concept can be found on the [vocabulary wiki](https://github.com/OHDSI/Vocabulary-v5.0/wiki/Vocab.-TYPE_CONCEPT). References CONCEPT table.")
  visit_detail_type_concept_id: ConceptId;

  @doc("There will only be one provider per **visit** record and the ETL document should clearly state how they were chosen (attending, admitting, etc.). This is a typical reason for leveraging the VISIT_DETAIL table as even though each VISIT_DETAIL record can only have one provider, there is no limit to the number of VISIT_DETAIL records that can be associated to a VISIT_OCCURRENCE record. ETL Convention: The additional providers associated to a Visit can be stored in this table where each VISIT_DETAIL record represents a different provider. References PROVIDER table.")
  provider_id?: int64;

  @doc("This field provides information about the Care Site where the Visit Detail took place. ETL Convention: There should only be one Care Site associated with a Visit Detail. References CARE_SITE table.")
  care_site_id?: int64;

  @doc("This field houses the verbatim value from the source data representing the kind of visit detail that took place (inpatient, outpatient, emergency, etc.) ETL Convention: If there is information about the kind of visit detail in the source data that value should be stored here. If a visit is an amalgamation of visits from the source then use a hierarchy to choose the VISIT_DETAIL_SOURCE_VALUE, such as IP -> ER-> OP. This should line up with the logic chosen to determine how visits are created.")
  @maxLength(50)
  visit_detail_source_value?: string;

  @doc("If the VISIT_DETAIL_SOURCE_VALUE is coded in the source data using an OMOP supported vocabulary put the concept id representing the source value here. References CONCEPT table.")
  visit_detail_source_concept_id?: ConceptId;

  @doc("Use this field to determine where the patient was admitted from. This concept is part of the visit domain and can indicate if a patient was admitted to the hospital from a long-term care facility, for example. ETL Convention: If available, map the admitted_from_source_value to a standard concept in the visit domain. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Visit&standardConcept=Standard&page=1&pageSize=15&query=). If a person was admitted from home or was self-referred, set this to 0. References CONCEPT table.")
  admitted_from_concept_id?: ConceptId;

  @doc("This information may be called something different in the source data but the field is meant to contain a value indicating where a person was admitted from. Typically this applies only to visits that have a length of stay, like inpatient visits or long-term care visits.")
  @maxLength(50)
  admitted_from_source_value?: string;

  @doc("This information may be called something different in the source data but the field is meant to contain a value indicating where a person was discharged to after a visit, as in they went home or were moved to long-term care. Typically this applies only to visits that have a length of stay of a day or more.")
  @maxLength(50)
  discharged_to_source_value?: string;

  @doc("Use this field to determine where the patient was discharged to after a visit. This concept is part of the visit domain and can indicate if a patient was transferred to another hospital or sent to a long-term care facility, for example. It is assumed that a person is discharged to home therefore there is not a standard concept id for “home”. Use concept id = 0 when a person is discharged to home. ETL Convention: If available, map the DISCHARGE_TO_SOURCE_VALUE to a Standard Concept in the Visit domain. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Visit&standardConcept=Standard&page=1&pageSize=15&query=). References CONCEPT table.")
  discharged_to_concept_id?: ConceptId;

  @doc("Use this field to find the visit detail that occurred for the person prior to the given visit detail record. There could be a few days or a few years in between. ETL Convention: The PRECEDING_VISIT_DETAIL_ID can be used to link a visit immediately preceding the current Visit Detail. Note this is not symmetrical, and there is no such thing as a “following_visit_id”. References VISIT_DETAIL table.")
  preceding_visit_detail_id?: int64;

  @doc("Use this field to find the visit detail that subsumes the given visit detail record. This is used in the case that a visit detail record needs to be nested beyond the VISIT_OCCURRENCE/VISIT_DETAIL relationship. ETL Convention: If there are multiple nested levels to how Visits are represented in the source, the VISIT_DETAIL_PARENT_ID can be used to record this relationship. References VISIT_DETAIL table.")
  parent_visit_detail_id?: int64;

  @doc("Use this field to link the VISIT_DETAIL record to its VISIT_OCCURRENCE. ETL Convention: Put the VISIT_OCCURRENCE_ID that subsumes the VISIT_DETAIL record here. References VISIT_OCCURRENCE table.")
  visit_occurrence_id: int64;
}

/**
 * VisitDetail update request
 */
@doc("Request body for updating an existing VisitDetail record")
model VisitDetailUpdate {
  @doc("References PERSON table.")
  person_id?: int64;

  @doc("This field contains a concept id representing the kind of visit detail, like inpatient or outpatient. All concepts in this field should be standard and belong to the Visit domain. ETL Convention: Populate this field based on the kind of visit that took place for the person. For example this could be “Inpatient Visit”, “Outpatient Visit”, “Ambulatory Visit”, etc. This table will contain standard concepts in the Visit domain. These concepts are arranged in a hierarchical structure to facilitate cohort definitions by rolling up to generally familiar Visits adopted in most healthcare systems worldwide. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Visit&standardConcept=Standard&page=1&pageSize=15&query=). References CONCEPT table.")
  visit_detail_concept_id?: ConceptId;

  @doc("This is the date of the start of the encounter. This may or may not be equal to the date of the Visit the Visit Detail is associated with. ETL Convention: When populating VISIT_DETAIL_START_DATE, you should think about the patient experience to make decisions on how to define visits. Most likely this should be the date of the patient-provider interaction.")
  visit_detail_start_date?: DateOnly;

  @doc("If no time is given for the start date of a visit, set it to midnight (00:00:0000).")
  visit_detail_start_datetime?: DateTime;

  @doc("This the end date of the patient-provider interaction. If a Person is still an inpatient in the hospital at the time of the data extract and does not have a visit_end_date, then set the visit_end_date to the date of the data pull. ETL Convention: Visit Detail end dates are mandatory. If end dates are not provided in the source there are three ways in which to derive them: - Outpatient Visit Detail: visit_detail_end_datetime = visit_detail_start_datetime - Emergency Room Visit Detail: visit_detail_end_datetime = visit_detail_start_datetime - Inpatient Visit Detail: Usually there is information about discharge. If not, you should be able to derive the end date from the sudden decline of activity or from the absence of inpatient procedures/drugs. - Non-hospital institution Visit Details: Particularly for claims data, if end dates are not provided assume the visit is for the duration of month that it occurs. For Inpatient Visit Details ongoing at the date of ETL, put date of processing the data into visit_detai_end_datetime and visit_detail_type_concept_id with 32220 “Still patient” to identify the visit as incomplete. All other Visits Details: visit_detail_end_datetime = visit_detail_start_datetime.")
  visit_detail_end_date?: DateOnly;

  @doc("If a Person is still an inpatient in the hospital at the time of the data extract and does not have a visit_end_datetime, then set the visit_end_datetime to the datetime of the data pull. ETL Convention: If no time is given for the end date of a visit, set it to midnight (00:00:0000).")
  visit_detail_end_datetime?: DateTime;

  @doc("Use this field to understand the provenance of the visit detail record, or where the record comes from. ETL Convention: Populate this field based on the provenance of the visit detail record, as in whether it came from an EHR record or billing claim. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Type+Concept&standardConcept=Standard&page=1&pageSize=15&query=). A more detailed explanation of each Type Concept can be found on the [vocabulary wiki](https://github.com/OHDSI/Vocabulary-v5.0/wiki/Vocab.-TYPE_CONCEPT). References CONCEPT table.")
  visit_detail_type_concept_id?: ConceptId;

  @doc("There will only be one provider per **visit** record and the ETL document should clearly state how they were chosen (attending, admitting, etc.). This is a typical reason for leveraging the VISIT_DETAIL table as even though each VISIT_DETAIL record can only have one provider, there is no limit to the number of VISIT_DETAIL records that can be associated to a VISIT_OCCURRENCE record. ETL Convention: The additional providers associated to a Visit can be stored in this table where each VISIT_DETAIL record represents a different provider. References PROVIDER table.")
  provider_id?: int64;

  @doc("This field provides information about the Care Site where the Visit Detail took place. ETL Convention: There should only be one Care Site associated with a Visit Detail. References CARE_SITE table.")
  care_site_id?: int64;

  @doc("This field houses the verbatim value from the source data representing the kind of visit detail that took place (inpatient, outpatient, emergency, etc.) ETL Convention: If there is information about the kind of visit detail in the source data that value should be stored here. If a visit is an amalgamation of visits from the source then use a hierarchy to choose the VISIT_DETAIL_SOURCE_VALUE, such as IP -> ER-> OP. This should line up with the logic chosen to determine how visits are created.")
  visit_detail_source_value?: string;

  @doc("If the VISIT_DETAIL_SOURCE_VALUE is coded in the source data using an OMOP supported vocabulary put the concept id representing the source value here. References CONCEPT table.")
  visit_detail_source_concept_id?: ConceptId;

  @doc("Use this field to determine where the patient was admitted from. This concept is part of the visit domain and can indicate if a patient was admitted to the hospital from a long-term care facility, for example. ETL Convention: If available, map the admitted_from_source_value to a standard concept in the visit domain. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Visit&standardConcept=Standard&page=1&pageSize=15&query=). If a person was admitted from home or was self-referred, set this to 0. References CONCEPT table.")
  admitted_from_concept_id?: ConceptId;

  @doc("This information may be called something different in the source data but the field is meant to contain a value indicating where a person was admitted from. Typically this applies only to visits that have a length of stay, like inpatient visits or long-term care visits.")
  admitted_from_source_value?: string;

  @doc("This information may be called something different in the source data but the field is meant to contain a value indicating where a person was discharged to after a visit, as in they went home or were moved to long-term care. Typically this applies only to visits that have a length of stay of a day or more.")
  discharged_to_source_value?: string;

  @doc("Use this field to determine where the patient was discharged to after a visit. This concept is part of the visit domain and can indicate if a patient was transferred to another hospital or sent to a long-term care facility, for example. It is assumed that a person is discharged to home therefore there is not a standard concept id for “home”. Use concept id = 0 when a person is discharged to home. ETL Convention: If available, map the DISCHARGE_TO_SOURCE_VALUE to a Standard Concept in the Visit domain. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Visit&standardConcept=Standard&page=1&pageSize=15&query=). References CONCEPT table.")
  discharged_to_concept_id?: ConceptId;

  @doc("Use this field to find the visit detail that occurred for the person prior to the given visit detail record. There could be a few days or a few years in between. ETL Convention: The PRECEDING_VISIT_DETAIL_ID can be used to link a visit immediately preceding the current Visit Detail. Note this is not symmetrical, and there is no such thing as a “following_visit_id”. References VISIT_DETAIL table.")
  preceding_visit_detail_id?: int64;

  @doc("Use this field to find the visit detail that subsumes the given visit detail record. This is used in the case that a visit detail record needs to be nested beyond the VISIT_OCCURRENCE/VISIT_DETAIL relationship. ETL Convention: If there are multiple nested levels to how Visits are represented in the source, the VISIT_DETAIL_PARENT_ID can be used to record this relationship. References VISIT_DETAIL table.")
  parent_visit_detail_id?: int64;

  @doc("Use this field to link the VISIT_DETAIL record to its VISIT_OCCURRENCE. ETL Convention: Put the VISIT_OCCURRENCE_ID that subsumes the VISIT_DETAIL record here. References VISIT_OCCURRENCE table.")
  visit_occurrence_id?: int64;
}

/**
 * Query parameters for filtering visit-detail
 */
@doc("Filter parameters for VisitDetail list operations")
model VisitDetailQueryParams {
  ...PaginationParams;

  @doc("Filter by person id")
  @query
  person_id?: int64;

  @doc("Filter by visit detail concept id")
  @query
  visit_detail_concept_id?: ConceptId;

  @doc("Filter by visit detail type concept id")
  @query
  visit_detail_type_concept_id?: ConceptId;

  @doc("Filter by provider id")
  @query
  provider_id?: int64;

  @doc("Filter by care site id")
  @query
  care_site_id?: int64;

  @doc("Filter by visit detail source concept id")
  @query
  visit_detail_source_concept_id?: ConceptId;

  @doc("Filter by admitted from concept id")
  @query
  admitted_from_concept_id?: ConceptId;

  @doc("Filter by discharged to concept id")
  @query
  discharged_to_concept_id?: ConceptId;

  @doc("Filter by preceding visit detail id")
  @query
  preceding_visit_detail_id?: int64;

  @doc("Filter by parent visit detail id")
  @query
  parent_visit_detail_id?: int64;

  @doc("Filter by visit occurrence id")
  @query
  visit_occurrence_id?: int64;

  @doc("Sort field")
  @query
  sort_by?: "visit_detail_id";

  @doc("Sort order")
  @query
  sort_order?: SortOrder;
}

/**
 * VisitDetail API operations
 */
@route("/visit-details")
@tag("Clinical - VisitDetails")
interface VisitDetails {
  @get
  @summary("List all visit-details")
  @doc("Returns a paginated list of VisitDetail records.")
  list(
    ...VisitDetailQueryParams,
  ): {
    @statusCode statusCode: 200;
    @body body: PaginatedList<VisitDetail>;
  } | ErrorResponse;

  @get
  @summary("Get visit-detail by ID")
  @doc("Retrieve a single VisitDetail record by its unique identifier.")
  read(
    @path
    @doc("Unique visit-detail identifier")
    visit_detail_id: int64,
  ): {
    @statusCode statusCode: 200;
    @body body: VisitDetail;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @post
  @summary("Create a new visit-detail")
  @doc("Create a new VisitDetail record.")
  create(
    @body
    @doc("VisitDetail data to create")
    record: VisitDetailCreate,
  ): {
    @statusCode statusCode: 201;
    @body body: VisitDetail;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @put
  @summary("Update visit-detail (full replacement)")
  @doc("Replace all fields of an existing VisitDetail record.")
  update(
    @path
    @doc("Unique visit-detail identifier")
    visit_detail_id: int64,

    @body
    @doc("Complete visit-detail data")
    record: VisitDetailCreate,
  ): {
    @statusCode statusCode: 200;
    @body body: VisitDetail;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @patch(#{implicitOptionality: true})
  @summary("Update visit-detail (partial)")
  @doc("Update specific fields of an existing VisitDetail record.")
  patch(
    @path
    @doc("Unique visit-detail identifier")
    visit_detail_id: int64,

    @body
    @doc("Fields to update")
    record: VisitDetailUpdate,
  ): {
    @statusCode statusCode: 200;
    @body body: VisitDetail;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @delete
  @summary("Delete visit-detail")
  @doc("Delete a VisitDetail record.")
  delete(
    @path
    @doc("Unique visit-detail identifier")
    visit_detail_id: int64,
  ): {
    @statusCode statusCode: 204;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;
}
