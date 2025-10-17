import "@typespec/http";
import "@typespec/rest";
import "../common/models.tsp";

using TypeSpec.Http;
using TypeSpec.Rest;
using OmopCdm.Common;

namespace OmopCdm.Clinical;

/**
 * VisitOccurrence Resource
 *
 * This table contains Events where Persons engage with the healthcare
system for a duration of time. They are often also called “Encounters”.
Visits are defined by a configuration of circumstances under which they
occur, such as (i) whether the patient comes to a healthcare
institution, the other way around, or the interaction is remote, (ii)
whether and what kind of trained medical staff is delivering the service
during the Visit, and (iii) whether the Visit is transient or for a
longer period involving a stay in bed.
 *
 * **User Guide**: The configuration defining the Visit are described by Concepts in the
Visit Domain, which form a hierarchical structure, but rolling up to
generally familiar Visits adopted in most healthcare systems
worldwide: 
- [Inpatient
Visit](https://athena.ohdsi.org/search-terms/terms/9201): Person visiting hospital, at a Care Site, in bed, for
duration of more than one day, with physicians and other Providers
permanently available to deliver service around the clock
- [Emergency
Room Visit](https://athena.ohdsi.org/search-terms/terms/9203): Person visiting dedicated healthcare institution for
treating emergencies, at a Care Site, within one day, with physicians
and Providers permanently available to deliver service around the
clock
- [Emergency
Room and Inpatient Visit](https://athena.ohdsi.org/search-terms/terms/262): Person visiting ER followed by a
subsequent Inpatient Visit, where Emergency department is part of
hospital, and transition from the ER to other hospital departments is
undefined
- [Non-hospital
institution Visit](https://athena.ohdsi.org/search-terms/terms/42898160): Person visiting dedicated institution for reasons
of poor health, at a Care Site, long-term or permanently, with no
physician but possibly other Providers permanently available to deliver
service around the clock
- [Outpatient
Visit](https://athena.ohdsi.org/search-terms/terms/9202): Person visiting dedicated ambulatory healthcare institution,
at a Care Site, within one day, without bed, with physicians or medical
Providers delivering service during Visit
- [Home
Visit](https://athena.ohdsi.org/search-terms/terms/581476): Provider visiting Person, without a Care Site, within one
day, delivering service
- [Telehealth
Visit](https://athena.ohdsi.org/search-terms/terms/5083): Patient engages with Provider through communication
media
- [Pharmacy
Visit](https://athena.ohdsi.org/search-terms/terms/581458): Person visiting pharmacy for dispensing of Drug, at a Care
Site, within one day
- [Laboratory
Visit](https://athena.ohdsi.org/search-terms/terms/32036): Patient visiting dedicated institution, at a Care Site,
within one day, for the purpose of a Measurement.
- [Ambulance
Visit](https://athena.ohdsi.org/search-terms/terms/581478): Person using transportation service for the purpose of
initiating one of the other Visits, without a Care Site, within one day,
potentially with Providers accompanying the Visit and delivering
service
- [Case
Management Visit](https://athena.ohdsi.org/search-terms/terms/38004193): Person interacting with healthcare system, without
a Care Site, within a day, with no Providers involved, for
administrative purposes

The Visit duration, or ‘length of stay’, is defined as VISIT_END_DATE
- VISIT_START_DATE. For all Visits this is <1 day, except Inpatient
Visits and Non-hospital institution Visits. The CDM also contains the
VISIT_DETAIL table where additional information about the Visit is
stored, for example, transfers between units during an inpatient
Visit.
 *
 * **ETL Conventions**: Visits can be derived easily if the source data contain coding
systems for Place of Service or Procedures, like CPT codes for well
visits. In those cases, the codes can be looked up and mapped to a
Standard Visit Concept. Otherwise, Visit Concepts have to be identified
in the ETL process. This table will contain concepts in the Visit
domain. These concepts are arranged in a hierarchical structure to
facilitate cohort definitions by rolling up to generally familiar Visits
adopted in most healthcare systems worldwide. Visits can be adjacent to
each other, i.e. the end date of one can be identical with the start
date of the other. As a consequence, more than one-day Visits or their
descendants can be recorded for the same day. Multi-day visits must not
overlap, i.e. share days other than start and end days. It is often the
case that some logic should be written for how to define visits and how
to assign Visit_Concept_Id. For example, in US claims outpatient visits
that appear to occur within the time period of an inpatient visit can be
rolled into one with the same Visit_Occurrence_Id. In EHR data inpatient
visits that are within one day of each other may be strung together to
create one visit. It will all depend on the source data and how
encounter records should be translated to visit occurrences. Providers
can be associated with a Visit through the PROVIDER_ID field, or
indirectly through PROCEDURE_OCCURRENCE records linked both to the VISIT
and PROVIDER tables.
 */

@doc("VisitOccurrence record in the OMOP CDM")
@example(#{
  id: 12345,
  person_id: 100,
  visit_concept_id: 8507,
  visit_start_date: "2023-01-15",
  visit_start_datetime: "2023-01-15",
  visit_end_date: "2023-01-15",
  visit_end_datetime: "2023-01-15",
  visit_type_concept_id: 8507,
  provider_id: 100,
  care_site_id: 100,
  visit_source_value: "Example value",
  visit_source_concept_id: 8507,
  admitted_from_concept_id: 8507,
  admitted_from_source_value: "Example value",
  discharged_to_concept_id: 8507,
  discharged_to_source_value: "Example value",
  preceding_visit_occurrence_id: 100
})
model VisitOccurrence {
  @doc("Use this to identify unique interactions between a person and the health care system. This identifier links across the other CDM event tables to associate events with a visit. ETL Convention: This should be populated by creating a unique identifier for each unique interaction between a person and the healthcare system where the person receives a medical good or service over a span of time.")
  id: int64;

  @doc("References PERSON table.")
  person_id: int64;

  @doc("This field contains a concept id representing the kind of visit, like inpatient or outpatient. All concepts in this field should be standard and belong to the Visit domain. ETL Convention: Populate this field based on the kind of visit that took place for the person. For example this could be “Inpatient Visit”, “Outpatient Visit”, “Ambulatory Visit”, etc. This table will contain standard concepts in the Visit domain. These concepts are arranged in a hierarchical structure to facilitate cohort definitions by rolling up to generally familiar Visits adopted in most healthcare systems worldwide. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Visit&standardConcept=Standard&page=1&pageSize=15&query=). References CONCEPT table.")
  visit_concept_id: ConceptId;

  @doc("For inpatient visits, the start date is typically the admission date. For outpatient visits the start date and end date will be the same. ETL Convention: When populating VISIT_START_DATE, you should think about the patient experience to make decisions on how to define visits. In the case of an inpatient visit this should be the date the patient was admitted to the hospital or institution. In all other cases this should be the date of the patient-provider interaction. If this information is not available the record should be dropped.")
  visit_start_date: DateOnly;

  @doc("If no time is given for the start date of a visit, set it to midnight (00:00:0000).")
  visit_start_datetime?: DateTime;

  @doc("For inpatient visits the end date is typically the discharge date. If a Person is still an inpatient in the hospital at the time of the data extract and does not have a visit_end_date, then set the visit_end_date to the date of the data pull. ETL Convention: Visit end dates are mandatory. If end dates are not provided in the source there are three ways in which to derive them: - Outpatient Visit: visit_end_datetime = visit_start_datetime - Emergency Room Visit: visit_end_datetime = visit_start_datetime - Inpatient Visit: Usually there is information about discharge. If not, you should be able to derive the end date from the sudden decline of activity or from the absence of inpatient procedures/drugs. - Non-hospital institution Visits: Particularly for claims data, if end dates are not provided assume the visit is for the duration of month that it occurs. For Inpatient Visits ongoing at the date of ETL, put date of processing the data into visit_end_datetime and visit_type_concept_id with 32220 “Still patient” to identify the visit as incomplete. - All other Visits: visit_end_datetime = visit_start_datetime. If this is a one-day visit the end date should match the start date.")
  visit_end_date: DateOnly;

  @doc("If a Person is still an inpatient in the hospital at the time of the data extract and does not have a visit_end_datetime, then set the visit_end_datetime to the datetime of the data pull. ETL Convention: If no time is given for the end date of a visit, set it to midnight (00:00:0000).")
  visit_end_datetime?: DateTime;

  @doc("Use this field to understand the provenance of the visit record, or where the record comes from. ETL Convention: Populate this field based on the provenance of the visit record, as in whether it came from an EHR record or billing claim. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Type+Concept&standardConcept=Standard&page=1&pageSize=15&query=). A more detailed explanation of each Type Concept can be found on the [vocabulary wiki](https://github.com/OHDSI/Vocabulary-v5.0/wiki/Vocab.-TYPE_CONCEPT). References CONCEPT table.")
  visit_type_concept_id: ConceptId;

  @doc("There will only be one provider per visit record and the ETL document should clearly state how they were chosen (attending, admitting, etc.). If there are multiple providers associated with a visit in the source, this can be reflected in the event tables (CONDITION_OCCURRENCE, PROCEDURE_OCCURRENCE, etc.) or in the VISIT_DETAIL table. ETL Convention: If there are multiple providers associated with a visit, you will need to choose which one to put here. The additional providers can be stored in the [VISIT_DETAIL](https://ohdsi.github.io/CommonDataModel/cdm54.html#visit_detail) table. References PROVIDER table.")
  provider_id?: int64;

  @doc("This field provides information about the Care Site where the Visit took place. ETL Convention: There should only be one Care Site associated with a Visit. References CARE_SITE table.")
  care_site_id?: int64;

  @doc("This field houses the verbatim value from the source data representing the kind of visit that took place (inpatient, outpatient, emergency, etc.) ETL Convention: If there is information about the kind of visit in the source data that value should be stored here. If a visit is an amalgamation of visits from the source then use a hierarchy to choose the visit source value, such as IP -> ER-> OP. This should line up with the logic chosen to determine how visits are created.")
  @maxLength(50)
  visit_source_value?: string;

  @doc("If the visit source value is coded in the source data using an OMOP supported vocabulary put the concept id representing the source value here. References CONCEPT table.")
  visit_source_concept_id?: ConceptId;

  @doc("Use this field to determine where the patient was admitted from. This concept is part of the visit domain and can indicate if a patient was admitted to the hospital from a long-term care facility, for example. ETL Convention: If available, map the admitted_from_source_value to a standard concept in the visit domain. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Visit&standardConcept=Standard&page=1&pageSize=15&query=). If a person was admitted from home or was self-referred, set this to 0. References CONCEPT table.")
  admitted_from_concept_id?: ConceptId;

  @doc("This information may be called something different in the source data but the field is meant to contain a value indicating where a person was admitted from. Typically this applies only to visits that have a length of stay, like inpatient visits or long-term care visits.")
  @maxLength(50)
  admitted_from_source_value?: string;

  @doc("Use this field to determine where the patient was discharged to after a visit. This concept is part of the visit domain and can indicate if a patient was transferred to another hospital or sent to a long-term care facility, for example. It is assumed that a person is discharged to home therefore there is not a standard concept id for “home”. Use concept id = 0 when a person is discharged to home. ETL Convention: If available, map the discharged_to_source_value to a standard concept in the visit domain. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Visit&standardConcept=Standard&page=1&pageSize=15&query=). References CONCEPT table.")
  discharged_to_concept_id?: ConceptId;

  @doc("This information may be called something different in the source data but the field is meant to contain a value indicating where a person was discharged to after a visit, as in they went home or were moved to long-term care. Typically this applies only to visits that have a length of stay of a day or more.")
  @maxLength(50)
  discharged_to_source_value?: string;

  @doc("Use this field to find the visit that occurred for the person prior to the given visit. There could be a few days or a few years in between. ETL Convention: This field can be used to link a visit immediately preceding the current visit. Note this is not symmetrical, and there is no such thing as a “following_visit_id”. References VISIT_OCCURRENCE table.")
  preceding_visit_occurrence_id?: int64;
}

/**
 * VisitOccurrence creation request
 */
@doc("Request body for creating a new VisitOccurrence record")
model VisitOccurrenceCreate {
  @doc("References PERSON table.")
  person_id: int64;

  @doc("This field contains a concept id representing the kind of visit, like inpatient or outpatient. All concepts in this field should be standard and belong to the Visit domain. ETL Convention: Populate this field based on the kind of visit that took place for the person. For example this could be “Inpatient Visit”, “Outpatient Visit”, “Ambulatory Visit”, etc. This table will contain standard concepts in the Visit domain. These concepts are arranged in a hierarchical structure to facilitate cohort definitions by rolling up to generally familiar Visits adopted in most healthcare systems worldwide. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Visit&standardConcept=Standard&page=1&pageSize=15&query=). References CONCEPT table.")
  visit_concept_id: ConceptId;

  @doc("For inpatient visits, the start date is typically the admission date. For outpatient visits the start date and end date will be the same. ETL Convention: When populating VISIT_START_DATE, you should think about the patient experience to make decisions on how to define visits. In the case of an inpatient visit this should be the date the patient was admitted to the hospital or institution. In all other cases this should be the date of the patient-provider interaction. If this information is not available the record should be dropped.")
  visit_start_date: DateOnly;

  @doc("If no time is given for the start date of a visit, set it to midnight (00:00:0000).")
  visit_start_datetime?: DateTime;

  @doc("For inpatient visits the end date is typically the discharge date. If a Person is still an inpatient in the hospital at the time of the data extract and does not have a visit_end_date, then set the visit_end_date to the date of the data pull. ETL Convention: Visit end dates are mandatory. If end dates are not provided in the source there are three ways in which to derive them: - Outpatient Visit: visit_end_datetime = visit_start_datetime - Emergency Room Visit: visit_end_datetime = visit_start_datetime - Inpatient Visit: Usually there is information about discharge. If not, you should be able to derive the end date from the sudden decline of activity or from the absence of inpatient procedures/drugs. - Non-hospital institution Visits: Particularly for claims data, if end dates are not provided assume the visit is for the duration of month that it occurs. For Inpatient Visits ongoing at the date of ETL, put date of processing the data into visit_end_datetime and visit_type_concept_id with 32220 “Still patient” to identify the visit as incomplete. - All other Visits: visit_end_datetime = visit_start_datetime. If this is a one-day visit the end date should match the start date.")
  visit_end_date: DateOnly;

  @doc("If a Person is still an inpatient in the hospital at the time of the data extract and does not have a visit_end_datetime, then set the visit_end_datetime to the datetime of the data pull. ETL Convention: If no time is given for the end date of a visit, set it to midnight (00:00:0000).")
  visit_end_datetime?: DateTime;

  @doc("Use this field to understand the provenance of the visit record, or where the record comes from. ETL Convention: Populate this field based on the provenance of the visit record, as in whether it came from an EHR record or billing claim. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Type+Concept&standardConcept=Standard&page=1&pageSize=15&query=). A more detailed explanation of each Type Concept can be found on the [vocabulary wiki](https://github.com/OHDSI/Vocabulary-v5.0/wiki/Vocab.-TYPE_CONCEPT). References CONCEPT table.")
  visit_type_concept_id: ConceptId;

  @doc("There will only be one provider per visit record and the ETL document should clearly state how they were chosen (attending, admitting, etc.). If there are multiple providers associated with a visit in the source, this can be reflected in the event tables (CONDITION_OCCURRENCE, PROCEDURE_OCCURRENCE, etc.) or in the VISIT_DETAIL table. ETL Convention: If there are multiple providers associated with a visit, you will need to choose which one to put here. The additional providers can be stored in the [VISIT_DETAIL](https://ohdsi.github.io/CommonDataModel/cdm54.html#visit_detail) table. References PROVIDER table.")
  provider_id?: int64;

  @doc("This field provides information about the Care Site where the Visit took place. ETL Convention: There should only be one Care Site associated with a Visit. References CARE_SITE table.")
  care_site_id?: int64;

  @doc("This field houses the verbatim value from the source data representing the kind of visit that took place (inpatient, outpatient, emergency, etc.) ETL Convention: If there is information about the kind of visit in the source data that value should be stored here. If a visit is an amalgamation of visits from the source then use a hierarchy to choose the visit source value, such as IP -> ER-> OP. This should line up with the logic chosen to determine how visits are created.")
  @maxLength(50)
  visit_source_value?: string;

  @doc("If the visit source value is coded in the source data using an OMOP supported vocabulary put the concept id representing the source value here. References CONCEPT table.")
  visit_source_concept_id?: ConceptId;

  @doc("Use this field to determine where the patient was admitted from. This concept is part of the visit domain and can indicate if a patient was admitted to the hospital from a long-term care facility, for example. ETL Convention: If available, map the admitted_from_source_value to a standard concept in the visit domain. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Visit&standardConcept=Standard&page=1&pageSize=15&query=). If a person was admitted from home or was self-referred, set this to 0. References CONCEPT table.")
  admitted_from_concept_id?: ConceptId;

  @doc("This information may be called something different in the source data but the field is meant to contain a value indicating where a person was admitted from. Typically this applies only to visits that have a length of stay, like inpatient visits or long-term care visits.")
  @maxLength(50)
  admitted_from_source_value?: string;

  @doc("Use this field to determine where the patient was discharged to after a visit. This concept is part of the visit domain and can indicate if a patient was transferred to another hospital or sent to a long-term care facility, for example. It is assumed that a person is discharged to home therefore there is not a standard concept id for “home”. Use concept id = 0 when a person is discharged to home. ETL Convention: If available, map the discharged_to_source_value to a standard concept in the visit domain. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Visit&standardConcept=Standard&page=1&pageSize=15&query=). References CONCEPT table.")
  discharged_to_concept_id?: ConceptId;

  @doc("This information may be called something different in the source data but the field is meant to contain a value indicating where a person was discharged to after a visit, as in they went home or were moved to long-term care. Typically this applies only to visits that have a length of stay of a day or more.")
  @maxLength(50)
  discharged_to_source_value?: string;

  @doc("Use this field to find the visit that occurred for the person prior to the given visit. There could be a few days or a few years in between. ETL Convention: This field can be used to link a visit immediately preceding the current visit. Note this is not symmetrical, and there is no such thing as a “following_visit_id”. References VISIT_OCCURRENCE table.")
  preceding_visit_occurrence_id?: int64;
}

/**
 * VisitOccurrence update request
 */
@doc("Request body for updating an existing VisitOccurrence record")
model VisitOccurrenceUpdate {
  @doc("References PERSON table.")
  person_id?: int64;

  @doc("This field contains a concept id representing the kind of visit, like inpatient or outpatient. All concepts in this field should be standard and belong to the Visit domain. ETL Convention: Populate this field based on the kind of visit that took place for the person. For example this could be “Inpatient Visit”, “Outpatient Visit”, “Ambulatory Visit”, etc. This table will contain standard concepts in the Visit domain. These concepts are arranged in a hierarchical structure to facilitate cohort definitions by rolling up to generally familiar Visits adopted in most healthcare systems worldwide. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Visit&standardConcept=Standard&page=1&pageSize=15&query=). References CONCEPT table.")
  visit_concept_id?: ConceptId;

  @doc("For inpatient visits, the start date is typically the admission date. For outpatient visits the start date and end date will be the same. ETL Convention: When populating VISIT_START_DATE, you should think about the patient experience to make decisions on how to define visits. In the case of an inpatient visit this should be the date the patient was admitted to the hospital or institution. In all other cases this should be the date of the patient-provider interaction. If this information is not available the record should be dropped.")
  visit_start_date?: DateOnly;

  @doc("If no time is given for the start date of a visit, set it to midnight (00:00:0000).")
  visit_start_datetime?: DateTime;

  @doc("For inpatient visits the end date is typically the discharge date. If a Person is still an inpatient in the hospital at the time of the data extract and does not have a visit_end_date, then set the visit_end_date to the date of the data pull. ETL Convention: Visit end dates are mandatory. If end dates are not provided in the source there are three ways in which to derive them: - Outpatient Visit: visit_end_datetime = visit_start_datetime - Emergency Room Visit: visit_end_datetime = visit_start_datetime - Inpatient Visit: Usually there is information about discharge. If not, you should be able to derive the end date from the sudden decline of activity or from the absence of inpatient procedures/drugs. - Non-hospital institution Visits: Particularly for claims data, if end dates are not provided assume the visit is for the duration of month that it occurs. For Inpatient Visits ongoing at the date of ETL, put date of processing the data into visit_end_datetime and visit_type_concept_id with 32220 “Still patient” to identify the visit as incomplete. - All other Visits: visit_end_datetime = visit_start_datetime. If this is a one-day visit the end date should match the start date.")
  visit_end_date?: DateOnly;

  @doc("If a Person is still an inpatient in the hospital at the time of the data extract and does not have a visit_end_datetime, then set the visit_end_datetime to the datetime of the data pull. ETL Convention: If no time is given for the end date of a visit, set it to midnight (00:00:0000).")
  visit_end_datetime?: DateTime;

  @doc("Use this field to understand the provenance of the visit record, or where the record comes from. ETL Convention: Populate this field based on the provenance of the visit record, as in whether it came from an EHR record or billing claim. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Type+Concept&standardConcept=Standard&page=1&pageSize=15&query=). A more detailed explanation of each Type Concept can be found on the [vocabulary wiki](https://github.com/OHDSI/Vocabulary-v5.0/wiki/Vocab.-TYPE_CONCEPT). References CONCEPT table.")
  visit_type_concept_id?: ConceptId;

  @doc("There will only be one provider per visit record and the ETL document should clearly state how they were chosen (attending, admitting, etc.). If there are multiple providers associated with a visit in the source, this can be reflected in the event tables (CONDITION_OCCURRENCE, PROCEDURE_OCCURRENCE, etc.) or in the VISIT_DETAIL table. ETL Convention: If there are multiple providers associated with a visit, you will need to choose which one to put here. The additional providers can be stored in the [VISIT_DETAIL](https://ohdsi.github.io/CommonDataModel/cdm54.html#visit_detail) table. References PROVIDER table.")
  provider_id?: int64;

  @doc("This field provides information about the Care Site where the Visit took place. ETL Convention: There should only be one Care Site associated with a Visit. References CARE_SITE table.")
  care_site_id?: int64;

  @doc("This field houses the verbatim value from the source data representing the kind of visit that took place (inpatient, outpatient, emergency, etc.) ETL Convention: If there is information about the kind of visit in the source data that value should be stored here. If a visit is an amalgamation of visits from the source then use a hierarchy to choose the visit source value, such as IP -> ER-> OP. This should line up with the logic chosen to determine how visits are created.")
  visit_source_value?: string;

  @doc("If the visit source value is coded in the source data using an OMOP supported vocabulary put the concept id representing the source value here. References CONCEPT table.")
  visit_source_concept_id?: ConceptId;

  @doc("Use this field to determine where the patient was admitted from. This concept is part of the visit domain and can indicate if a patient was admitted to the hospital from a long-term care facility, for example. ETL Convention: If available, map the admitted_from_source_value to a standard concept in the visit domain. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Visit&standardConcept=Standard&page=1&pageSize=15&query=). If a person was admitted from home or was self-referred, set this to 0. References CONCEPT table.")
  admitted_from_concept_id?: ConceptId;

  @doc("This information may be called something different in the source data but the field is meant to contain a value indicating where a person was admitted from. Typically this applies only to visits that have a length of stay, like inpatient visits or long-term care visits.")
  admitted_from_source_value?: string;

  @doc("Use this field to determine where the patient was discharged to after a visit. This concept is part of the visit domain and can indicate if a patient was transferred to another hospital or sent to a long-term care facility, for example. It is assumed that a person is discharged to home therefore there is not a standard concept id for “home”. Use concept id = 0 when a person is discharged to home. ETL Convention: If available, map the discharged_to_source_value to a standard concept in the visit domain. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Visit&standardConcept=Standard&page=1&pageSize=15&query=). References CONCEPT table.")
  discharged_to_concept_id?: ConceptId;

  @doc("This information may be called something different in the source data but the field is meant to contain a value indicating where a person was discharged to after a visit, as in they went home or were moved to long-term care. Typically this applies only to visits that have a length of stay of a day or more.")
  discharged_to_source_value?: string;

  @doc("Use this field to find the visit that occurred for the person prior to the given visit. There could be a few days or a few years in between. ETL Convention: This field can be used to link a visit immediately preceding the current visit. Note this is not symmetrical, and there is no such thing as a “following_visit_id”. References VISIT_OCCURRENCE table.")
  preceding_visit_occurrence_id?: int64;
}

/**
 * Query parameters for filtering visit-occurrence
 */
@doc("Filter parameters for VisitOccurrence list operations")
model VisitOccurrenceQueryParams {
  ...PaginationParams;

  @doc("Filter by person id")
  @query
  person_id?: int64;

  @doc("Filter by visit concept id")
  @query
  visit_concept_id?: ConceptId;

  @doc("Filter by visit type concept id")
  @query
  visit_type_concept_id?: ConceptId;

  @doc("Filter by provider id")
  @query
  provider_id?: int64;

  @doc("Filter by care site id")
  @query
  care_site_id?: int64;

  @doc("Filter by visit source concept id")
  @query
  visit_source_concept_id?: ConceptId;

  @doc("Filter by admitted from concept id")
  @query
  admitted_from_concept_id?: ConceptId;

  @doc("Filter by discharged to concept id")
  @query
  discharged_to_concept_id?: ConceptId;

  @doc("Filter by preceding visit occurrence id")
  @query
  preceding_visit_occurrence_id?: int64;

  @doc("Sort field")
  @query
  sort_by?: "id";

  @doc("Sort order")
  @query
  sort_order?: SortOrder;
}

/**
 * VisitOccurrence API operations
 */
@route("/visit-occurrences")
@tag("Clinical - VisitOccurrences")
interface VisitOccurrences {
  @get
  @summary("List all visit-occurrences")
  @doc("Returns a paginated list of VisitOccurrence records.")
  list(
    ...VisitOccurrenceQueryParams,
  ): {
    @statusCode statusCode: 200;
    @body body: PaginatedList<VisitOccurrence>;
  } | ErrorResponse;

  @get
  @summary("Get visit-occurrence by ID")
  @doc("Retrieve a single VisitOccurrence record by its unique identifier.")
  read(
    @path
    @doc("Unique visit-occurrence identifier")
    id: int64,
  ): {
    @statusCode statusCode: 200;
    @body body: VisitOccurrence;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @post
  @summary("Create a new visit-occurrence")
  @doc("Create a new VisitOccurrence record.")
  create(
    @body
    @doc("VisitOccurrence data to create")
    record: VisitOccurrenceCreate,
  ): {
    @statusCode statusCode: 201;
    @body body: VisitOccurrence;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @put
  @summary("Update visit-occurrence (full replacement)")
  @doc("Replace all fields of an existing VisitOccurrence record.")
  update(
    @path
    @doc("Unique visit-occurrence identifier")
    id: int64,

    @body
    @doc("Complete visit-occurrence data")
    record: VisitOccurrenceCreate,
  ): {
    @statusCode statusCode: 200;
    @body body: VisitOccurrence;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @patch(#{implicitOptionality: true})
  @summary("Update visit-occurrence (partial)")
  @doc("Update specific fields of an existing VisitOccurrence record.")
  patch(
    @path
    @doc("Unique visit-occurrence identifier")
    id: int64,

    @body
    @doc("Fields to update")
    record: VisitOccurrenceUpdate,
  ): {
    @statusCode statusCode: 200;
    @body body: VisitOccurrence;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @delete
  @summary("Delete visit-occurrence")
  @doc("Delete a VisitOccurrence record.")
  delete(
    @path
    @doc("Unique visit-occurrence identifier")
    id: int64,
  ): {
    @statusCode statusCode: 204;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;
}
