import "@typespec/http";
import "@typespec/rest";
import "../common/models.tsp";

using TypeSpec.Http;
using TypeSpec.Rest;
using OmopCdm.Common;

namespace OmopCdm.Clinical;

/**
 * Observation Resource
 *
 * The OBSERVATION table captures clinical facts about a Person obtained
in the context of examination, questioning or a procedure. Any data that
cannot be represented by any other domains, such as social and lifestyle
facts, medical history, family history, etc. are recorded here.
 *
 * **User Guide**: Observations differ from Measurements in that they do not require a
standardized test or some other activity to generate clinical fact.
Typical observations are medical history, family history, the stated
need for certain treatment, social circumstances, lifestyle choices,
healthcare utilization patterns, etc. If the generation clinical facts
requires a standardized testing such as lab testing or imaging and leads
to a standardized result, the data item is recorded in the MEASUREMENT
table. If the clinical fact observed determines a sign, symptom,
diagnosis of a disease or other medical condition, it is recorded in the
CONDITION_OCCURRENCE table. Valid Observation Concepts are not enforced
to be from any domain but they must not belong to the Condition,
Procedure, Drug, Device, Specimen, or Measurement domains and they must
be Standard Concepts.   
  
The observation table usually records the
date or datetime of when the observation was obtained, not the date of
the observation starting. For example, if the patient reports that they
had a heart attack when they were 50, the observation date or datetime
is the date of the report, the heart attack observation can have a
value_as_concept which captures how long ago the observation applied to
the patient.
 *
 * **ETL Conventions**: Records whose Source Values map to any domain besides Condition,
Procedure, Drug, Specimen, Measurement or Device should be stored in the
Observation table. Observations can be stored as attribute value pairs,
with the attribute as the Observation Concept and the value representing
the clinical fact. This fact can be a Concept (stored in
VALUE_AS_CONCEPT), a numerical value (VALUE_AS_NUMBER) or a verbatim
string (VALUE_AS_STRING). Even though Observations do not have an
explicit result, the clinical fact can be stated separately from the
type of Observation in the VALUE_AS_* fields. It is recommended for
Observations that are suggestive statements of positive assertion should
have a value of ‘Yes’ (concept_id=4188539), recorded, even though the
null value is the equivalent.
 */

@doc("Observation record in the OMOP CDM")
@example(#{
  id: 12345,
  person_id: 100,
  observation_concept_id: 8507,
  observation_date: "2023-01-15",
  observation_datetime: "2023-01-15",
  observation_type_concept_id: 8507,
  value_as_number: 98.6,
  value_as_string: "Example value",
  value_as_concept_id: 8507,
  qualifier_concept_id: 8507,
  unit_concept_id: 8507,
  provider_id: 100,
  visit_occurrence_id: 100,
  visit_detail_id: 100,
  observation_source_value: "Example value",
  observation_source_concept_id: 8507,
  unit_source_value: "Example value",
  qualifier_source_value: "Example value",
  value_source_value: "Example value",
  observation_event_id: 100,
  obs_event_field_concept_id: 8507
})
model Observation {
  @doc("The unique key given to an Observation record for a Person. Refer to the ETL for how duplicate Observations during the same Visit were handled. ETL Convention: Each instance of an observation present in the source data should be assigned this unique key.")
  id: int64;

  @doc("The PERSON_ID of the Person for whom the Observation is recorded. This may be a system generated code. References PERSON table.")
  person_id: int64;

  @doc("The OBSERVATION_CONCEPT_ID field is recommended for primary use in analyses, and must be used for network studies. ETL Convention: The CONCEPT_ID that the OBSERVATION_SOURCE_CONCEPT_ID maps to. There is no specified domain that the Concepts in this table must adhere to. The only rule is that records with Concepts in the Condition, Procedure, Drug, Measurement, or Device domains MUST go to the corresponding table. References CONCEPT table.")
  observation_concept_id: ConceptId;

  @doc("The date of when the Observation was obtained. Depending on what the Observation represents this could be the date of a lab test, the date of a survey, or the date a patient’s family history was taken. ETL Convention: For some observations the ETL may need to make a choice as to which date to choose.")
  observation_date: DateOnly;

  @doc("If no time is given set to midnight (00:00:00).")
  observation_datetime?: DateTime;

  @doc("This field can be used to determine the provenance of the Observation record, as in whether the measurement was from an EHR system, insurance claim, registry, or other sources. ETL Convention: Choose the OBSERVATION_TYPE_CONCEPT_ID that best represents the provenance of the record, for example whether it came from an EHR record or billing claim. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Type+Concept&standardConcept=Standard&page=1&pageSize=15&query=). A more detailed explanation of each Type Concept can be found on the [vocabulary wiki](https://github.com/OHDSI/Vocabulary-v5.0/wiki/Vocab.-TYPE_CONCEPT). References CONCEPT table.")
  observation_type_concept_id: ConceptId;

  @doc("This is the numerical value of the Result of the Observation, if applicable and available. It is not expected that all Observations will have numeric results, rather, this field is here to house values should they exist.")
  value_as_number?: float64;

  @doc("This is the categorical value of the Result of the Observation, if applicable and available.")
  @maxLength(60)
  value_as_string?: string;

  @doc("It is possible that some records destined for the Observation table have two clinical ideas represented in one source code. This is common with ICD10 codes that describe a family history of some Condition, for example. In OMOP the Vocabulary breaks these two clinical ideas into two codes; one becomes the OBSERVATION_CONCEPT_ID and the other becomes the VALUE_AS_CONCEPT_ID. It is important when using the Observation table to keep this possibility in mind and to examine the VALUE_AS_CONCEPT_ID field for relevant information. ETL Convention: Note that the value of VALUE_AS_CONCEPT_ID may be provided through mapping from a source Concept which contains the content of the Observation. In those situations, the CONCEPT_RELATIONSHIP table in addition to the ‘Maps to’ record contains a second record with the relationship_id set to ‘Maps to value’. For example, ICD10 [Z82.4](https://athena.ohdsi.org/search-terms/terms/45581076) ‘Family history of ischaemic heart disease and other diseases of the circulatory system’ has a ‘Maps to’ relationship to [4167217](https://athena.ohdsi.org/search-terms/terms/4167217) ‘Family history of clinical finding’ as well as a ‘Maps to value’ record to [134057](https://athena.ohdsi.org/search-terms/terms/134057) ‘Disorder of cardiovascular system’. If there’s no categorial result in a source_data, set value_as_concept_id to NULL, if there is a categorial result in a source_data but without mapping, set value_as_concept_id to 0. References CONCEPT table.")
  value_as_concept_id?: ConceptId;

  @doc("This field contains all attributes specifying the clinical fact further, such as as degrees, severities, drug-drug interaction alerts etc. ETL Convention: Use your best judgement as to what Concepts to use here and if they are necessary to accurately represent the clinical record. There is no restriction on the domain of these Concepts, they just need to be Standard. References CONCEPT table.")
  qualifier_concept_id?: ConceptId;

  @doc("There is currently no recommended unit for individual observation concepts. UNIT_SOURCE_VALUES should be mapped to a Standard Concept in the Unit domain that best represents the unit as given in the source data. ETL Convention: There is no standardization requirement for units associated with OBSERVATION_CONCEPT_IDs, however, it is the responsibility of the ETL to choose the most plausible unit. If the source unit is NULL (applicable to cases when there’s no numerical value or when it doesn’t require a unit), keep unit_concept_id NULL as well. If there’s no mapping of a source unit, populate unit_concept_id with 0. References CONCEPT table.")
  unit_concept_id?: ConceptId;

  @doc("The provider associated with the observation record, e.g. the provider who ordered the test or the provider who recorded the result. ETL Convention: The ETL may need to make a choice as to which PROVIDER_ID to put here. Based on what is available this may or may not be different than the provider associated with the overall VISIT_OCCURRENCE record. For example the admitting vs attending physician on an EHR record. References PROVIDER table.")
  provider_id?: int64;

  @doc("The visit during which the Observation occurred. ETL Convention: Depending on the structure of the source data, this may have to be determined based on dates. If an OBSERVATION_DATE occurs within the start and end date of a Visit it is a valid ETL choice to choose the VISIT_OCCURRENCE_ID from the visit that subsumes it, even if not explicitly stated in the data. While not required, an attempt should be made to locate the VISIT_OCCURRENCE_ID of the observation record. If an observation is related to a visit explicitly in the source data, it is possible that the result date of the Observation falls outside of the bounds of the Visit dates. References VISIT_OCCURRENCE table.")
  visit_occurrence_id?: int64;

  @doc("The VISIT_DETAIL record during which the Observation occurred. For example, if the Person was in the ICU at the time the VISIT_OCCURRENCE record would reflect the overall hospital stay and the VISIT_DETAIL record would reflect the ICU stay during the hospital visit. ETL Convention: Same rules apply as for the VISIT_OCCURRENCE_ID. References VISIT_DETAIL table.")
  visit_detail_id?: int64;

  @doc("This field houses the verbatim value from the source data representing the Observation that occurred. For example, this could be an ICD10 or Read code. ETL Convention: This code is mapped to a Standard Concept in the Standardized Vocabularies and the original code is stored here for reference.")
  @maxLength(50)
  observation_source_value?: string;

  @doc("This is the concept representing the OBSERVATION_SOURCE_VALUE and may not necessarily be standard. This field is discouraged from use in analysis because it is not required to contain Standard Concepts that are used across the OHDSI community, and should only be used when Standard Concepts do not adequately represent the source detail for the Observation necessary for a given analytic use case. Consider using OBSERVATION_CONCEPT_ID instead to enable standardized analytics that can be consistent across the network. ETL Convention: If the OBSERVATION_SOURCE_VALUE is coded in the source data using an OMOP supported vocabulary put the concept id representing the source value here. References CONCEPT table.")
  observation_source_concept_id?: ConceptId;

  @doc("This field houses the verbatim value from the source data representing the unit of the Observation that occurred. ETL Convention: This code is mapped to a Standard Condition Concept in the Standardized Vocabularies and the original code is stored here for reference.")
  @maxLength(50)
  unit_source_value?: string;

  @doc("This field houses the verbatim value from the source data representing the qualifier of the Observation that occurred. ETL Convention: This code is mapped to a Standard Condition Concept in the Standardized Vocabularies and the original code is stored here for reference.")
  @maxLength(50)
  qualifier_source_value?: string;

  @doc("This field houses the verbatim result value of the Observation from the source data. Do not get confused with the Observation_source_value which captures source value of the observation mapped to observation_concept_id. This field is the observation result value from the source. ETL Convention: If the observation_source_value was a question, for example, or an observation that requires a result then this field is the answer/ result from the source data. Store the verbatim value that represents the result of the observation_source_value.")
  @maxLength(50)
  value_source_value?: string;

  @doc("If the Observation record is related to another record in the database, this field is the primary key of the linked record. ETL Convention: Put the primary key of the linked record, if applicable, here. See the [ETL Conventions for the OBSERVATION](https://ohdsi.github.io/CommonDataModel/cdm54.html#observation) table for more details.")
  observation_event_id?: int64;

  @doc("If the Observation record is related to another record in the database, this field is the CONCEPT_ID that identifies which table the primary key of the linked record came from. ETL Convention: Put the CONCEPT_ID that identifies which table and field the OBSERVATION_EVENT_ID came from. References CONCEPT table.")
  obs_event_field_concept_id?: ConceptId;
}

/**
 * Observation creation request
 */
@doc("Request body for creating a new Observation record")
model ObservationCreate {
  @doc("The PERSON_ID of the Person for whom the Observation is recorded. This may be a system generated code. References PERSON table.")
  person_id: int64;

  @doc("The OBSERVATION_CONCEPT_ID field is recommended for primary use in analyses, and must be used for network studies. ETL Convention: The CONCEPT_ID that the OBSERVATION_SOURCE_CONCEPT_ID maps to. There is no specified domain that the Concepts in this table must adhere to. The only rule is that records with Concepts in the Condition, Procedure, Drug, Measurement, or Device domains MUST go to the corresponding table. References CONCEPT table.")
  observation_concept_id: ConceptId;

  @doc("The date of when the Observation was obtained. Depending on what the Observation represents this could be the date of a lab test, the date of a survey, or the date a patient’s family history was taken. ETL Convention: For some observations the ETL may need to make a choice as to which date to choose.")
  observation_date: DateOnly;

  @doc("If no time is given set to midnight (00:00:00).")
  observation_datetime?: DateTime;

  @doc("This field can be used to determine the provenance of the Observation record, as in whether the measurement was from an EHR system, insurance claim, registry, or other sources. ETL Convention: Choose the OBSERVATION_TYPE_CONCEPT_ID that best represents the provenance of the record, for example whether it came from an EHR record or billing claim. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Type+Concept&standardConcept=Standard&page=1&pageSize=15&query=). A more detailed explanation of each Type Concept can be found on the [vocabulary wiki](https://github.com/OHDSI/Vocabulary-v5.0/wiki/Vocab.-TYPE_CONCEPT). References CONCEPT table.")
  observation_type_concept_id: ConceptId;

  @doc("This is the numerical value of the Result of the Observation, if applicable and available. It is not expected that all Observations will have numeric results, rather, this field is here to house values should they exist.")
  value_as_number?: float64;

  @doc("This is the categorical value of the Result of the Observation, if applicable and available.")
  @maxLength(60)
  value_as_string?: string;

  @doc("It is possible that some records destined for the Observation table have two clinical ideas represented in one source code. This is common with ICD10 codes that describe a family history of some Condition, for example. In OMOP the Vocabulary breaks these two clinical ideas into two codes; one becomes the OBSERVATION_CONCEPT_ID and the other becomes the VALUE_AS_CONCEPT_ID. It is important when using the Observation table to keep this possibility in mind and to examine the VALUE_AS_CONCEPT_ID field for relevant information. ETL Convention: Note that the value of VALUE_AS_CONCEPT_ID may be provided through mapping from a source Concept which contains the content of the Observation. In those situations, the CONCEPT_RELATIONSHIP table in addition to the ‘Maps to’ record contains a second record with the relationship_id set to ‘Maps to value’. For example, ICD10 [Z82.4](https://athena.ohdsi.org/search-terms/terms/45581076) ‘Family history of ischaemic heart disease and other diseases of the circulatory system’ has a ‘Maps to’ relationship to [4167217](https://athena.ohdsi.org/search-terms/terms/4167217) ‘Family history of clinical finding’ as well as a ‘Maps to value’ record to [134057](https://athena.ohdsi.org/search-terms/terms/134057) ‘Disorder of cardiovascular system’. If there’s no categorial result in a source_data, set value_as_concept_id to NULL, if there is a categorial result in a source_data but without mapping, set value_as_concept_id to 0. References CONCEPT table.")
  value_as_concept_id?: ConceptId;

  @doc("This field contains all attributes specifying the clinical fact further, such as as degrees, severities, drug-drug interaction alerts etc. ETL Convention: Use your best judgement as to what Concepts to use here and if they are necessary to accurately represent the clinical record. There is no restriction on the domain of these Concepts, they just need to be Standard. References CONCEPT table.")
  qualifier_concept_id?: ConceptId;

  @doc("There is currently no recommended unit for individual observation concepts. UNIT_SOURCE_VALUES should be mapped to a Standard Concept in the Unit domain that best represents the unit as given in the source data. ETL Convention: There is no standardization requirement for units associated with OBSERVATION_CONCEPT_IDs, however, it is the responsibility of the ETL to choose the most plausible unit. If the source unit is NULL (applicable to cases when there’s no numerical value or when it doesn’t require a unit), keep unit_concept_id NULL as well. If there’s no mapping of a source unit, populate unit_concept_id with 0. References CONCEPT table.")
  unit_concept_id?: ConceptId;

  @doc("The provider associated with the observation record, e.g. the provider who ordered the test or the provider who recorded the result. ETL Convention: The ETL may need to make a choice as to which PROVIDER_ID to put here. Based on what is available this may or may not be different than the provider associated with the overall VISIT_OCCURRENCE record. For example the admitting vs attending physician on an EHR record. References PROVIDER table.")
  provider_id?: int64;

  @doc("The visit during which the Observation occurred. ETL Convention: Depending on the structure of the source data, this may have to be determined based on dates. If an OBSERVATION_DATE occurs within the start and end date of a Visit it is a valid ETL choice to choose the VISIT_OCCURRENCE_ID from the visit that subsumes it, even if not explicitly stated in the data. While not required, an attempt should be made to locate the VISIT_OCCURRENCE_ID of the observation record. If an observation is related to a visit explicitly in the source data, it is possible that the result date of the Observation falls outside of the bounds of the Visit dates. References VISIT_OCCURRENCE table.")
  visit_occurrence_id?: int64;

  @doc("The VISIT_DETAIL record during which the Observation occurred. For example, if the Person was in the ICU at the time the VISIT_OCCURRENCE record would reflect the overall hospital stay and the VISIT_DETAIL record would reflect the ICU stay during the hospital visit. ETL Convention: Same rules apply as for the VISIT_OCCURRENCE_ID. References VISIT_DETAIL table.")
  visit_detail_id?: int64;

  @doc("This field houses the verbatim value from the source data representing the Observation that occurred. For example, this could be an ICD10 or Read code. ETL Convention: This code is mapped to a Standard Concept in the Standardized Vocabularies and the original code is stored here for reference.")
  @maxLength(50)
  observation_source_value?: string;

  @doc("This is the concept representing the OBSERVATION_SOURCE_VALUE and may not necessarily be standard. This field is discouraged from use in analysis because it is not required to contain Standard Concepts that are used across the OHDSI community, and should only be used when Standard Concepts do not adequately represent the source detail for the Observation necessary for a given analytic use case. Consider using OBSERVATION_CONCEPT_ID instead to enable standardized analytics that can be consistent across the network. ETL Convention: If the OBSERVATION_SOURCE_VALUE is coded in the source data using an OMOP supported vocabulary put the concept id representing the source value here. References CONCEPT table.")
  observation_source_concept_id?: ConceptId;

  @doc("This field houses the verbatim value from the source data representing the unit of the Observation that occurred. ETL Convention: This code is mapped to a Standard Condition Concept in the Standardized Vocabularies and the original code is stored here for reference.")
  @maxLength(50)
  unit_source_value?: string;

  @doc("This field houses the verbatim value from the source data representing the qualifier of the Observation that occurred. ETL Convention: This code is mapped to a Standard Condition Concept in the Standardized Vocabularies and the original code is stored here for reference.")
  @maxLength(50)
  qualifier_source_value?: string;

  @doc("This field houses the verbatim result value of the Observation from the source data. Do not get confused with the Observation_source_value which captures source value of the observation mapped to observation_concept_id. This field is the observation result value from the source. ETL Convention: If the observation_source_value was a question, for example, or an observation that requires a result then this field is the answer/ result from the source data. Store the verbatim value that represents the result of the observation_source_value.")
  @maxLength(50)
  value_source_value?: string;

  @doc("If the Observation record is related to another record in the database, this field is the primary key of the linked record. ETL Convention: Put the primary key of the linked record, if applicable, here. See the [ETL Conventions for the OBSERVATION](https://ohdsi.github.io/CommonDataModel/cdm54.html#observation) table for more details.")
  observation_event_id?: int64;

  @doc("If the Observation record is related to another record in the database, this field is the CONCEPT_ID that identifies which table the primary key of the linked record came from. ETL Convention: Put the CONCEPT_ID that identifies which table and field the OBSERVATION_EVENT_ID came from. References CONCEPT table.")
  obs_event_field_concept_id?: ConceptId;
}

/**
 * Observation update request
 */
@doc("Request body for updating an existing Observation record")
model ObservationUpdate {
  @doc("The PERSON_ID of the Person for whom the Observation is recorded. This may be a system generated code. References PERSON table.")
  person_id?: int64;

  @doc("The OBSERVATION_CONCEPT_ID field is recommended for primary use in analyses, and must be used for network studies. ETL Convention: The CONCEPT_ID that the OBSERVATION_SOURCE_CONCEPT_ID maps to. There is no specified domain that the Concepts in this table must adhere to. The only rule is that records with Concepts in the Condition, Procedure, Drug, Measurement, or Device domains MUST go to the corresponding table. References CONCEPT table.")
  observation_concept_id?: ConceptId;

  @doc("The date of when the Observation was obtained. Depending on what the Observation represents this could be the date of a lab test, the date of a survey, or the date a patient’s family history was taken. ETL Convention: For some observations the ETL may need to make a choice as to which date to choose.")
  observation_date?: DateOnly;

  @doc("If no time is given set to midnight (00:00:00).")
  observation_datetime?: DateTime;

  @doc("This field can be used to determine the provenance of the Observation record, as in whether the measurement was from an EHR system, insurance claim, registry, or other sources. ETL Convention: Choose the OBSERVATION_TYPE_CONCEPT_ID that best represents the provenance of the record, for example whether it came from an EHR record or billing claim. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Type+Concept&standardConcept=Standard&page=1&pageSize=15&query=). A more detailed explanation of each Type Concept can be found on the [vocabulary wiki](https://github.com/OHDSI/Vocabulary-v5.0/wiki/Vocab.-TYPE_CONCEPT). References CONCEPT table.")
  observation_type_concept_id?: ConceptId;

  @doc("This is the numerical value of the Result of the Observation, if applicable and available. It is not expected that all Observations will have numeric results, rather, this field is here to house values should they exist.")
  value_as_number?: float64;

  @doc("This is the categorical value of the Result of the Observation, if applicable and available.")
  value_as_string?: string;

  @doc("It is possible that some records destined for the Observation table have two clinical ideas represented in one source code. This is common with ICD10 codes that describe a family history of some Condition, for example. In OMOP the Vocabulary breaks these two clinical ideas into two codes; one becomes the OBSERVATION_CONCEPT_ID and the other becomes the VALUE_AS_CONCEPT_ID. It is important when using the Observation table to keep this possibility in mind and to examine the VALUE_AS_CONCEPT_ID field for relevant information. ETL Convention: Note that the value of VALUE_AS_CONCEPT_ID may be provided through mapping from a source Concept which contains the content of the Observation. In those situations, the CONCEPT_RELATIONSHIP table in addition to the ‘Maps to’ record contains a second record with the relationship_id set to ‘Maps to value’. For example, ICD10 [Z82.4](https://athena.ohdsi.org/search-terms/terms/45581076) ‘Family history of ischaemic heart disease and other diseases of the circulatory system’ has a ‘Maps to’ relationship to [4167217](https://athena.ohdsi.org/search-terms/terms/4167217) ‘Family history of clinical finding’ as well as a ‘Maps to value’ record to [134057](https://athena.ohdsi.org/search-terms/terms/134057) ‘Disorder of cardiovascular system’. If there’s no categorial result in a source_data, set value_as_concept_id to NULL, if there is a categorial result in a source_data but without mapping, set value_as_concept_id to 0. References CONCEPT table.")
  value_as_concept_id?: ConceptId;

  @doc("This field contains all attributes specifying the clinical fact further, such as as degrees, severities, drug-drug interaction alerts etc. ETL Convention: Use your best judgement as to what Concepts to use here and if they are necessary to accurately represent the clinical record. There is no restriction on the domain of these Concepts, they just need to be Standard. References CONCEPT table.")
  qualifier_concept_id?: ConceptId;

  @doc("There is currently no recommended unit for individual observation concepts. UNIT_SOURCE_VALUES should be mapped to a Standard Concept in the Unit domain that best represents the unit as given in the source data. ETL Convention: There is no standardization requirement for units associated with OBSERVATION_CONCEPT_IDs, however, it is the responsibility of the ETL to choose the most plausible unit. If the source unit is NULL (applicable to cases when there’s no numerical value or when it doesn’t require a unit), keep unit_concept_id NULL as well. If there’s no mapping of a source unit, populate unit_concept_id with 0. References CONCEPT table.")
  unit_concept_id?: ConceptId;

  @doc("The provider associated with the observation record, e.g. the provider who ordered the test or the provider who recorded the result. ETL Convention: The ETL may need to make a choice as to which PROVIDER_ID to put here. Based on what is available this may or may not be different than the provider associated with the overall VISIT_OCCURRENCE record. For example the admitting vs attending physician on an EHR record. References PROVIDER table.")
  provider_id?: int64;

  @doc("The visit during which the Observation occurred. ETL Convention: Depending on the structure of the source data, this may have to be determined based on dates. If an OBSERVATION_DATE occurs within the start and end date of a Visit it is a valid ETL choice to choose the VISIT_OCCURRENCE_ID from the visit that subsumes it, even if not explicitly stated in the data. While not required, an attempt should be made to locate the VISIT_OCCURRENCE_ID of the observation record. If an observation is related to a visit explicitly in the source data, it is possible that the result date of the Observation falls outside of the bounds of the Visit dates. References VISIT_OCCURRENCE table.")
  visit_occurrence_id?: int64;

  @doc("The VISIT_DETAIL record during which the Observation occurred. For example, if the Person was in the ICU at the time the VISIT_OCCURRENCE record would reflect the overall hospital stay and the VISIT_DETAIL record would reflect the ICU stay during the hospital visit. ETL Convention: Same rules apply as for the VISIT_OCCURRENCE_ID. References VISIT_DETAIL table.")
  visit_detail_id?: int64;

  @doc("This field houses the verbatim value from the source data representing the Observation that occurred. For example, this could be an ICD10 or Read code. ETL Convention: This code is mapped to a Standard Concept in the Standardized Vocabularies and the original code is stored here for reference.")
  observation_source_value?: string;

  @doc("This is the concept representing the OBSERVATION_SOURCE_VALUE and may not necessarily be standard. This field is discouraged from use in analysis because it is not required to contain Standard Concepts that are used across the OHDSI community, and should only be used when Standard Concepts do not adequately represent the source detail for the Observation necessary for a given analytic use case. Consider using OBSERVATION_CONCEPT_ID instead to enable standardized analytics that can be consistent across the network. ETL Convention: If the OBSERVATION_SOURCE_VALUE is coded in the source data using an OMOP supported vocabulary put the concept id representing the source value here. References CONCEPT table.")
  observation_source_concept_id?: ConceptId;

  @doc("This field houses the verbatim value from the source data representing the unit of the Observation that occurred. ETL Convention: This code is mapped to a Standard Condition Concept in the Standardized Vocabularies and the original code is stored here for reference.")
  unit_source_value?: string;

  @doc("This field houses the verbatim value from the source data representing the qualifier of the Observation that occurred. ETL Convention: This code is mapped to a Standard Condition Concept in the Standardized Vocabularies and the original code is stored here for reference.")
  qualifier_source_value?: string;

  @doc("This field houses the verbatim result value of the Observation from the source data. Do not get confused with the Observation_source_value which captures source value of the observation mapped to observation_concept_id. This field is the observation result value from the source. ETL Convention: If the observation_source_value was a question, for example, or an observation that requires a result then this field is the answer/ result from the source data. Store the verbatim value that represents the result of the observation_source_value.")
  value_source_value?: string;

  @doc("If the Observation record is related to another record in the database, this field is the primary key of the linked record. ETL Convention: Put the primary key of the linked record, if applicable, here. See the [ETL Conventions for the OBSERVATION](https://ohdsi.github.io/CommonDataModel/cdm54.html#observation) table for more details.")
  observation_event_id?: int64;

  @doc("If the Observation record is related to another record in the database, this field is the CONCEPT_ID that identifies which table the primary key of the linked record came from. ETL Convention: Put the CONCEPT_ID that identifies which table and field the OBSERVATION_EVENT_ID came from. References CONCEPT table.")
  obs_event_field_concept_id?: ConceptId;
}

/**
 * Query parameters for filtering observation
 */
@doc("Filter parameters for Observation list operations")
model ObservationQueryParams {
  ...PaginationParams;

  @doc("Filter by person id")
  @query
  person_id?: int64;

  @doc("Filter by observation concept id")
  @query
  observation_concept_id?: ConceptId;

  @doc("Filter by observation type concept id")
  @query
  observation_type_concept_id?: ConceptId;

  @doc("Filter by value as concept id")
  @query
  value_as_concept_id?: ConceptId;

  @doc("Filter by qualifier concept id")
  @query
  qualifier_concept_id?: ConceptId;

  @doc("Filter by unit concept id")
  @query
  unit_concept_id?: ConceptId;

  @doc("Filter by provider id")
  @query
  provider_id?: int64;

  @doc("Filter by visit occurrence id")
  @query
  visit_occurrence_id?: int64;

  @doc("Filter by visit detail id")
  @query
  visit_detail_id?: int64;

  @doc("Filter by observation source concept id")
  @query
  observation_source_concept_id?: ConceptId;

  @doc("Filter by obs event field concept id")
  @query
  obs_event_field_concept_id?: ConceptId;

  @doc("Sort field")
  @query
  sort_by?: "id";

  @doc("Sort order")
  @query
  sort_order?: SortOrder;
}

/**
 * Observation list response with example
 */
@doc("Paginated list of Observation records")
@example(#{
  data: #[#{
  id: 12345,
  person_id: 100,
  observation_concept_id: 8507,
  observation_date: "2023-01-15",
  observation_datetime: "2023-01-15",
  observation_type_concept_id: 8507,
  value_as_number: 98.6,
  value_as_string: "Example value",
  value_as_concept_id: 8507,
  qualifier_concept_id: 8507,
  unit_concept_id: 8507,
  provider_id: 100,
  visit_occurrence_id: 100,
  visit_detail_id: 100,
  observation_source_value: "Example value",
  observation_source_concept_id: 8507,
  unit_source_value: "Example value",
  qualifier_source_value: "Example value",
  value_source_value: "Example value",
  observation_event_id: 100,
  obs_event_field_concept_id: 8507
}],
  pagination: #{
    total: 1,
    offset: 0,
    limit: 100,
    count: 1
  }
})
model ObservationList {
  ...PaginatedList<Observation>;
}

/**
 * Observation API operations
 */
@route("/observations")
@tag("Clinical - Observations")
interface Observations {
  @get
  @summary("List all observations")
  @doc("Returns a paginated list of Observation records.")
  list(
    ...ObservationQueryParams,
  ): {
    @statusCode statusCode: 200;
    @body body: ObservationList;
  } | ErrorResponse;

  @get
  @summary("Get observation by ID")
  @doc("Retrieve a single Observation record by its unique identifier.")
  read(
    @path
    @doc("Unique observation identifier")
    id: string,
  ): {
    @statusCode statusCode: 200;
    @body body: Observation;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @post
  @summary("Create a new observation")
  @doc("Create a new Observation record.")
  create(
    @body
    @doc("Observation data to create")
    record: ObservationCreate,
  ): {
    @statusCode statusCode: 201;
    @body body: Observation;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @put
  @summary("Update observation (full replacement)")
  @doc("Replace all fields of an existing Observation record.")
  update(
    @path
    @doc("Unique observation identifier")
    id: string,

    @body
    @doc("Complete observation data")
    record: ObservationCreate,
  ): {
    @statusCode statusCode: 200;
    @body body: Observation;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @patch(#{implicitOptionality: true})
  @summary("Update observation (partial)")
  @doc("Update specific fields of an existing Observation record.")
  patch(
    @path
    @doc("Unique observation identifier")
    id: string,

    @body
    @doc("Fields to update")
    record: ObservationUpdate,
  ): {
    @statusCode statusCode: 200;
    @body body: Observation;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @delete
  @summary("Delete observation")
  @doc("Delete a Observation record.")
  delete(
    @path
    @doc("Unique observation identifier")
    id: string,
  ): {
    @statusCode statusCode: 204;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;
}
