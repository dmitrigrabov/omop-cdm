import "@typespec/http";
import "@typespec/rest";
import "../common/models.tsp";

using TypeSpec.Http;
using TypeSpec.Rest;
using OmopCdm.Common;

namespace OmopCdm.Clinical;

/**
 * Measurement Resource
 *
 * The MEASUREMENT table contains records of Measurements,
i.e. structured values (numerical or categorical) obtained through
systematic and standardized examination or testing of a Person or
Person’s sample. The MEASUREMENT table contains both orders and results
of such Measurements as laboratory tests, vital signs, quantitative
findings from pathology reports, etc. Measurements are stored as
attribute value pairs, with the attribute as the Measurement Concept and
the value representing the result. The value can be a Concept (stored in
VALUE_AS_CONCEPT), or a numerical value (VALUE_AS_NUMBER) with a Unit
(UNIT_CONCEPT_ID). The Procedure for obtaining the sample is housed in
the PROCEDURE_OCCURRENCE table, though it is unnecessary to create a
PROCEDURE_OCCURRENCE record for each measurement if one does not exist
in the source data. Measurements differ from Observations in that they
require a standardized test or some other activity to generate a
quantitative or qualitative result. If there is no result, it is assumed
that the lab test was conducted but the result was not captured.
 *
 * **User Guide**: Measurements are predominately lab tests with a few exceptions, like
blood pressure or function tests. Results are given in the form of a
value and unit combination. When investigating measurements, look for
operator_concept_ids (<, >, etc.).
 *
 * **ETL Conventions**: Only records where the source value maps to a Concept in the
measurement domain should be included in this table. Even though each
Measurement always has a result, the fields VALUE_AS_NUMBER and
VALUE_AS_CONCEPT_ID are not mandatory as often the result is not given
in the source data. When the result is not known, the Measurement record
represents just the fact that the corresponding Measurement was carried
out, which in itself is already useful information for some use cases.
For some Measurement Concepts, the result is included in the test. For
example, ICD10 CONCEPT_ID [45548980](https://athena.ohdsi.org/search-terms/terms/45548980)
‘Abnormal level of unspecified serum enzyme’ indicates a Measurement and
the result (abnormal). In those situations, the CONCEPT_RELATIONSHIP
table in addition to the ‘Maps to’ record contains a second record with
the relationship_id set to ‘Maps to value’. In this example, the ‘Maps
to’ relationship directs to [4046263](https://athena.ohdsi.org/search-terms/terms/4046263)
‘Enzyme measurement’ as well as a ‘Maps to value’ record to [4135493](https://athena.ohdsi.org/search-terms/terms/4135493)
‘Abnormal’.
 */

@doc("Measurement record in the OMOP CDM")
model Measurement {
  @doc("The unique key given to a Measurement record for a Person. Refer to the ETL for how duplicate Measurements during the same Visit were handled. ETL Convention: Each instance of a measurement present in the source data should be assigned this unique key. In some cases, a person can have multiple records of the same measurement within the same visit. It is valid to keep these duplicates and assign them individual, unique, MEASUREMENT_IDs, though it is up to the ETL how they should be handled.")
  measurement_id: int64;

  @doc("The PERSON_ID of the Person for whom the Measurement is recorded. This may be a system generated code.  References PERSON table.")
  person_id: int64;

  @doc("The MEASUREMENT_CONCEPT_ID field is recommended for primary use in analyses, and must be used for network studies. This is the standard concept mapped from the source value which represents a measurement. ETL Convention: The CONCEPT_ID that the MEASUREMENT_SOURCE_VALUE maps to. Only records whose source values map to concepts with a domain of �Measurement� should go in this table. References CONCEPT table.")
  measurement_concept_id: ConceptId;

  @doc("Use this date to determine the date of the measurement. ETL Convention: If there are multiple dates in the source data associated with a record such as order_date, draw_date, and result_date, choose the one that is closest to the date the sample was drawn from the patient.")
  measurement_date: DateOnly;

  @doc("This is not required, though it is in v6. If a source does not specify datetime the convention is to set the time to midnight (00:00:0000)")
  measurement_datetime?: DateTime;

  @doc("This is present for backwards compatibility and will be deprecated in an upcoming version.")
  @maxLength(10)
  measurement_time?: string;

  @doc("This field can be used to determine the provenance of the Measurement record, as in whether the measurement was from an EHR system, insurance claim, registry, or other sources. ETL Convention: Choose the MEASUREMENT_TYPE_CONCEPT_ID that best represents the provenance of the record, for example whether it came from an EHR record or billing claim. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Type+Concept&standardConcept=Standard&page=1&pageSize=15&query=). A more detailed explanation of each Type Concept can be found on the [vocabulary wiki](https://github.com/OHDSI/Vocabulary-v5.0/wiki/Vocab.-TYPE_CONCEPT). References CONCEPT table.")
  measurement_type_concept_id: ConceptId;

  @doc("The meaning of Concept [4172703](https://athena.ohdsi.org/search-terms/terms/4172703) for ‘=’ is identical to omission of a OPERATOR_CONCEPT_ID value. Since the use of this field is rare, it’s important when devising analyses to not to forget testing for the content of this field for values different from =. ETL Convention: Operators are =, > and these concepts belong to the ‘Meas Value Operator’ domain. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Meas+Value+Operator&standardConcept=Standard&page=1&pageSize=15&query=). The operator_concept_id explictly refers to the value of the measurement. Leave it NULL if there’s an exact numeric value given (instead of putting ‘=’) or there’s no numeric value at all. References CONCEPT table.")
  operator_concept_id?: ConceptId;

  @doc("This is the numerical value of the Result of the Measurement, if available. Note that measurements such as blood pressures will be split into their component parts i.e. one record for systolic, one record for diastolic. ETL Convention: [Convention for negative values](https://ohdsi.github.io/Themis/negative_value_as_number.html)")
  value_as_number?: float64;

  @doc("If the raw data gives a categorial result for measurements those values are captured and mapped to standard concepts in the ‘Meas Value’ domain. ETL Convention: If there is no categorial result in the source data, set VALUE_AS_CONCEPT_ID to NULL, if there is a categorial result in a source data but without mapping, set VALUE_AS_CONCEPT_ID to 0, else map to a CONCEPT_ID. References CONCEPT table.")
  value_as_concept_id?: ConceptId;

  @doc("At present, there isn’t a prescribed unit for individual measurements, such as Hemoglobin A1C, meaning it’s not obligatory to express these measurements as a percentage. UNIT_SOURCE_VALUES should be linked to a Standard Concept within the Unit domain that most accurately reflects the unit provided in the source data. ETL Convention: If the source data does not include units, set UNIT_CONCEPT_ID to NULL. If units are provided but not mapped, set UNIT_CONCEPT_ID to 0. Otherwise, map the units to a CONCEPT_ID. Remember that units are case-sensitive in vocabulary. References CONCEPT table.")
  unit_concept_id?: ConceptId;

  @doc("Ranges have the same unit as the VALUE_AS_NUMBER. These ranges are provided by the source and should remain NULL if not given. ETL Convention: If reference ranges for upper and lower limit of normal as provided (typically by a laboratory) these are stored in the RANGE_HIGH and RANGE_LOW fields. This should be set to NULL if not provided.")
  range_low?: float64;

  @doc("Ranges have the same unit as the VALUE_AS_NUMBER. These ranges are provided by the source and should remain NULL if not given. ETL Convention: If reference ranges for upper and lower limit of normal as provided (typically by a laboratory) these are stored in the RANGE_HIGH and RANGE_LOW fields. This should be set to NULL if not provided.")
  range_high?: float64;

  @doc("The provider associated with measurement record, e.g. the provider who ordered the test or the provider who recorded the result. ETL Convention: The ETL may need to make a choice as to which PROVIDER_ID to put here. Based on what is available this may or may not be different than the provider associated with the overall VISIT_OCCURRENCE record. For example the admitting vs attending physician on an EHR record. References PROVIDER table.")
  provider_id?: int64;

  @doc("The visit during which the Measurement occurred. ETL Convention: Depending on the structure of the source data, this may have to be determined based on dates. If a MEASUREMENT_DATE occurs within the start and end date of a Visit it is a valid ETL choice to choose the VISIT_OCCURRENCE_ID from the visit that subsumes it, even if not explicitly stated in the data. While not required, an attempt should be made to locate the VISIT_OCCURRENCE_ID of the measurement record. If a measurement is related to a visit explicitly in the source data, it is possible that the result date of the Measurement falls outside of the bounds of the Visit dates. References VISIT_OCCURRENCE table.")
  visit_occurrence_id?: int64;

  @doc("The VISIT_DETAIL record during which the Measurement occurred. For example, if the Person was in the ICU at the time the VISIT_OCCURRENCE record would reflect the overall hospital stay and the VISIT_DETAIL record would reflect the ICU stay during the hospital visit. ETL Convention: Same rules apply as for the VISIT_OCCURRENCE_ID. References VISIT_DETAIL table.")
  visit_detail_id?: int64;

  @doc("This field contains the exact value from the source data that represents the measurement that occurred. ETL Convention: This value corresponds to a standardized CONCEPT_ID found in MEASUREMENT_CONCEPT_ID and in the ‘Measurement’ domain within the Standardized Vocabularies. The original code is retained here for reference purposes.")
  @maxLength(50)
  measurement_source_value?: string;

  @doc("This is the concept representing the MEASUREMENT_SOURCE_VALUE and may not necessarily be standard. This field is discouraged from use in analysis because it is not required to contain Standard Concepts that are used across the OHDSI community, and should only be used when Standard Concepts do not adequately represent the source detail for the Measurement necessary for a given analytic use case. Consider using MEASUREMENT_CONCEPT_ID instead to enable standardized analytics that can be consistent across the network. ETL Convention: If the MEASUREMENT_SOURCE_VALUE is coded in the source data using a vocabulary supported by OMOP Standardized Vocabularies, insert the CONCEPT_ID representing the source value here. References CONCEPT table.")
  measurement_source_concept_id?: ConceptId;

  @doc("This field contains the exact value from the source data that represents the unit of measurement used. ETL Convention: This value corresponds to a standardized CONCEPT_ID found in UNIT_CONCEPT_ID and in the ‘Unit’ domain within the Standardized Vocabularies. The original code is retained here for reference purposes.")
  @maxLength(50)
  unit_source_value?: string;

  @doc("“This is the concept representing the UNIT_SOURCE_VALUE and may not necessarily be standard. This field is discouraged from use in analysis because it is not required to contain Standard Concepts that are used across the OHDSI community, and should only be used when Standard Concepts do not adequately represent the source detail for the Measurement necessary for a given analytic use case. Consider using UNIT_CONCEPT_ID instead to enable standardized analytics that can be consistent across the network.” ETL Convention: If the UNIT_SOURCE_VALUE is coded in the source data using an OMOP supported vocabulary put the concept id representing the source value here. References CONCEPT table.")
  unit_source_concept_id?: ConceptId;

  @doc("This field houses the verbatim result value of the Measurement from the source data . ETL Convention: If both a continuous and categorical result are given in the source data such that both VALUE_AS_NUMBER and VALUE_AS_CONCEPT_ID are both included, store the verbatim value that was mapped to VALUE_AS_CONCEPT_ID here.")
  @maxLength(50)
  value_source_value?: string;

  @doc("If the Measurement record is related to another record in the database, this field is the primary key of the linked record. ETL Convention: Put the primary key of the linked record, if applicable, here.")
  measurement_event_id?: int64;

  @doc("If the Measurement record is related to another record in the database, this field is the CONCEPT_ID that identifies which table the primary key of the linked record came from. ETL Convention: Put the CONCEPT_ID that identifies which table and field the MEASUREMENT_EVENT_ID came from. References CONCEPT table.")
  meas_event_field_concept_id?: ConceptId;
}

/**
 * Measurement creation request
 */
@doc("Request body for creating a new Measurement record")
model MeasurementCreate {
  @doc("The PERSON_ID of the Person for whom the Measurement is recorded. This may be a system generated code.  References PERSON table.")
  person_id: int64;

  @doc("The MEASUREMENT_CONCEPT_ID field is recommended for primary use in analyses, and must be used for network studies. This is the standard concept mapped from the source value which represents a measurement. ETL Convention: The CONCEPT_ID that the MEASUREMENT_SOURCE_VALUE maps to. Only records whose source values map to concepts with a domain of �Measurement� should go in this table. References CONCEPT table.")
  measurement_concept_id: ConceptId;

  @doc("Use this date to determine the date of the measurement. ETL Convention: If there are multiple dates in the source data associated with a record such as order_date, draw_date, and result_date, choose the one that is closest to the date the sample was drawn from the patient.")
  measurement_date: DateOnly;

  @doc("This is not required, though it is in v6. If a source does not specify datetime the convention is to set the time to midnight (00:00:0000)")
  measurement_datetime?: DateTime;

  @doc("This is present for backwards compatibility and will be deprecated in an upcoming version.")
  @maxLength(10)
  measurement_time?: string;

  @doc("This field can be used to determine the provenance of the Measurement record, as in whether the measurement was from an EHR system, insurance claim, registry, or other sources. ETL Convention: Choose the MEASUREMENT_TYPE_CONCEPT_ID that best represents the provenance of the record, for example whether it came from an EHR record or billing claim. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Type+Concept&standardConcept=Standard&page=1&pageSize=15&query=). A more detailed explanation of each Type Concept can be found on the [vocabulary wiki](https://github.com/OHDSI/Vocabulary-v5.0/wiki/Vocab.-TYPE_CONCEPT). References CONCEPT table.")
  measurement_type_concept_id: ConceptId;

  @doc("The meaning of Concept [4172703](https://athena.ohdsi.org/search-terms/terms/4172703) for ‘=’ is identical to omission of a OPERATOR_CONCEPT_ID value. Since the use of this field is rare, it’s important when devising analyses to not to forget testing for the content of this field for values different from =. ETL Convention: Operators are =, > and these concepts belong to the ‘Meas Value Operator’ domain. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Meas+Value+Operator&standardConcept=Standard&page=1&pageSize=15&query=). The operator_concept_id explictly refers to the value of the measurement. Leave it NULL if there’s an exact numeric value given (instead of putting ‘=’) or there’s no numeric value at all. References CONCEPT table.")
  operator_concept_id?: ConceptId;

  @doc("This is the numerical value of the Result of the Measurement, if available. Note that measurements such as blood pressures will be split into their component parts i.e. one record for systolic, one record for diastolic. ETL Convention: [Convention for negative values](https://ohdsi.github.io/Themis/negative_value_as_number.html)")
  value_as_number?: float64;

  @doc("If the raw data gives a categorial result for measurements those values are captured and mapped to standard concepts in the ‘Meas Value’ domain. ETL Convention: If there is no categorial result in the source data, set VALUE_AS_CONCEPT_ID to NULL, if there is a categorial result in a source data but without mapping, set VALUE_AS_CONCEPT_ID to 0, else map to a CONCEPT_ID. References CONCEPT table.")
  value_as_concept_id?: ConceptId;

  @doc("At present, there isn’t a prescribed unit for individual measurements, such as Hemoglobin A1C, meaning it’s not obligatory to express these measurements as a percentage. UNIT_SOURCE_VALUES should be linked to a Standard Concept within the Unit domain that most accurately reflects the unit provided in the source data. ETL Convention: If the source data does not include units, set UNIT_CONCEPT_ID to NULL. If units are provided but not mapped, set UNIT_CONCEPT_ID to 0. Otherwise, map the units to a CONCEPT_ID. Remember that units are case-sensitive in vocabulary. References CONCEPT table.")
  unit_concept_id?: ConceptId;

  @doc("Ranges have the same unit as the VALUE_AS_NUMBER. These ranges are provided by the source and should remain NULL if not given. ETL Convention: If reference ranges for upper and lower limit of normal as provided (typically by a laboratory) these are stored in the RANGE_HIGH and RANGE_LOW fields. This should be set to NULL if not provided.")
  range_low?: float64;

  @doc("Ranges have the same unit as the VALUE_AS_NUMBER. These ranges are provided by the source and should remain NULL if not given. ETL Convention: If reference ranges for upper and lower limit of normal as provided (typically by a laboratory) these are stored in the RANGE_HIGH and RANGE_LOW fields. This should be set to NULL if not provided.")
  range_high?: float64;

  @doc("The provider associated with measurement record, e.g. the provider who ordered the test or the provider who recorded the result. ETL Convention: The ETL may need to make a choice as to which PROVIDER_ID to put here. Based on what is available this may or may not be different than the provider associated with the overall VISIT_OCCURRENCE record. For example the admitting vs attending physician on an EHR record. References PROVIDER table.")
  provider_id?: int64;

  @doc("The visit during which the Measurement occurred. ETL Convention: Depending on the structure of the source data, this may have to be determined based on dates. If a MEASUREMENT_DATE occurs within the start and end date of a Visit it is a valid ETL choice to choose the VISIT_OCCURRENCE_ID from the visit that subsumes it, even if not explicitly stated in the data. While not required, an attempt should be made to locate the VISIT_OCCURRENCE_ID of the measurement record. If a measurement is related to a visit explicitly in the source data, it is possible that the result date of the Measurement falls outside of the bounds of the Visit dates. References VISIT_OCCURRENCE table.")
  visit_occurrence_id?: int64;

  @doc("The VISIT_DETAIL record during which the Measurement occurred. For example, if the Person was in the ICU at the time the VISIT_OCCURRENCE record would reflect the overall hospital stay and the VISIT_DETAIL record would reflect the ICU stay during the hospital visit. ETL Convention: Same rules apply as for the VISIT_OCCURRENCE_ID. References VISIT_DETAIL table.")
  visit_detail_id?: int64;

  @doc("This field contains the exact value from the source data that represents the measurement that occurred. ETL Convention: This value corresponds to a standardized CONCEPT_ID found in MEASUREMENT_CONCEPT_ID and in the ‘Measurement’ domain within the Standardized Vocabularies. The original code is retained here for reference purposes.")
  @maxLength(50)
  measurement_source_value?: string;

  @doc("This is the concept representing the MEASUREMENT_SOURCE_VALUE and may not necessarily be standard. This field is discouraged from use in analysis because it is not required to contain Standard Concepts that are used across the OHDSI community, and should only be used when Standard Concepts do not adequately represent the source detail for the Measurement necessary for a given analytic use case. Consider using MEASUREMENT_CONCEPT_ID instead to enable standardized analytics that can be consistent across the network. ETL Convention: If the MEASUREMENT_SOURCE_VALUE is coded in the source data using a vocabulary supported by OMOP Standardized Vocabularies, insert the CONCEPT_ID representing the source value here. References CONCEPT table.")
  measurement_source_concept_id?: ConceptId;

  @doc("This field contains the exact value from the source data that represents the unit of measurement used. ETL Convention: This value corresponds to a standardized CONCEPT_ID found in UNIT_CONCEPT_ID and in the ‘Unit’ domain within the Standardized Vocabularies. The original code is retained here for reference purposes.")
  @maxLength(50)
  unit_source_value?: string;

  @doc("“This is the concept representing the UNIT_SOURCE_VALUE and may not necessarily be standard. This field is discouraged from use in analysis because it is not required to contain Standard Concepts that are used across the OHDSI community, and should only be used when Standard Concepts do not adequately represent the source detail for the Measurement necessary for a given analytic use case. Consider using UNIT_CONCEPT_ID instead to enable standardized analytics that can be consistent across the network.” ETL Convention: If the UNIT_SOURCE_VALUE is coded in the source data using an OMOP supported vocabulary put the concept id representing the source value here. References CONCEPT table.")
  unit_source_concept_id?: ConceptId;

  @doc("This field houses the verbatim result value of the Measurement from the source data . ETL Convention: If both a continuous and categorical result are given in the source data such that both VALUE_AS_NUMBER and VALUE_AS_CONCEPT_ID are both included, store the verbatim value that was mapped to VALUE_AS_CONCEPT_ID here.")
  @maxLength(50)
  value_source_value?: string;

  @doc("If the Measurement record is related to another record in the database, this field is the primary key of the linked record. ETL Convention: Put the primary key of the linked record, if applicable, here.")
  measurement_event_id?: int64;

  @doc("If the Measurement record is related to another record in the database, this field is the CONCEPT_ID that identifies which table the primary key of the linked record came from. ETL Convention: Put the CONCEPT_ID that identifies which table and field the MEASUREMENT_EVENT_ID came from. References CONCEPT table.")
  meas_event_field_concept_id?: ConceptId;
}

/**
 * Measurement update request
 */
@doc("Request body for updating an existing Measurement record")
model MeasurementUpdate {
  @doc("The PERSON_ID of the Person for whom the Measurement is recorded. This may be a system generated code.  References PERSON table.")
  person_id?: int64;

  @doc("The MEASUREMENT_CONCEPT_ID field is recommended for primary use in analyses, and must be used for network studies. This is the standard concept mapped from the source value which represents a measurement. ETL Convention: The CONCEPT_ID that the MEASUREMENT_SOURCE_VALUE maps to. Only records whose source values map to concepts with a domain of �Measurement� should go in this table. References CONCEPT table.")
  measurement_concept_id?: ConceptId;

  @doc("Use this date to determine the date of the measurement. ETL Convention: If there are multiple dates in the source data associated with a record such as order_date, draw_date, and result_date, choose the one that is closest to the date the sample was drawn from the patient.")
  measurement_date?: DateOnly;

  @doc("This is not required, though it is in v6. If a source does not specify datetime the convention is to set the time to midnight (00:00:0000)")
  measurement_datetime?: DateTime;

  @doc("This is present for backwards compatibility and will be deprecated in an upcoming version.")
  measurement_time?: string;

  @doc("This field can be used to determine the provenance of the Measurement record, as in whether the measurement was from an EHR system, insurance claim, registry, or other sources. ETL Convention: Choose the MEASUREMENT_TYPE_CONCEPT_ID that best represents the provenance of the record, for example whether it came from an EHR record or billing claim. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Type+Concept&standardConcept=Standard&page=1&pageSize=15&query=). A more detailed explanation of each Type Concept can be found on the [vocabulary wiki](https://github.com/OHDSI/Vocabulary-v5.0/wiki/Vocab.-TYPE_CONCEPT). References CONCEPT table.")
  measurement_type_concept_id?: ConceptId;

  @doc("The meaning of Concept [4172703](https://athena.ohdsi.org/search-terms/terms/4172703) for ‘=’ is identical to omission of a OPERATOR_CONCEPT_ID value. Since the use of this field is rare, it’s important when devising analyses to not to forget testing for the content of this field for values different from =. ETL Convention: Operators are =, > and these concepts belong to the ‘Meas Value Operator’ domain. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Meas+Value+Operator&standardConcept=Standard&page=1&pageSize=15&query=). The operator_concept_id explictly refers to the value of the measurement. Leave it NULL if there’s an exact numeric value given (instead of putting ‘=’) or there’s no numeric value at all. References CONCEPT table.")
  operator_concept_id?: ConceptId;

  @doc("This is the numerical value of the Result of the Measurement, if available. Note that measurements such as blood pressures will be split into their component parts i.e. one record for systolic, one record for diastolic. ETL Convention: [Convention for negative values](https://ohdsi.github.io/Themis/negative_value_as_number.html)")
  value_as_number?: float64;

  @doc("If the raw data gives a categorial result for measurements those values are captured and mapped to standard concepts in the ‘Meas Value’ domain. ETL Convention: If there is no categorial result in the source data, set VALUE_AS_CONCEPT_ID to NULL, if there is a categorial result in a source data but without mapping, set VALUE_AS_CONCEPT_ID to 0, else map to a CONCEPT_ID. References CONCEPT table.")
  value_as_concept_id?: ConceptId;

  @doc("At present, there isn’t a prescribed unit for individual measurements, such as Hemoglobin A1C, meaning it’s not obligatory to express these measurements as a percentage. UNIT_SOURCE_VALUES should be linked to a Standard Concept within the Unit domain that most accurately reflects the unit provided in the source data. ETL Convention: If the source data does not include units, set UNIT_CONCEPT_ID to NULL. If units are provided but not mapped, set UNIT_CONCEPT_ID to 0. Otherwise, map the units to a CONCEPT_ID. Remember that units are case-sensitive in vocabulary. References CONCEPT table.")
  unit_concept_id?: ConceptId;

  @doc("Ranges have the same unit as the VALUE_AS_NUMBER. These ranges are provided by the source and should remain NULL if not given. ETL Convention: If reference ranges for upper and lower limit of normal as provided (typically by a laboratory) these are stored in the RANGE_HIGH and RANGE_LOW fields. This should be set to NULL if not provided.")
  range_low?: float64;

  @doc("Ranges have the same unit as the VALUE_AS_NUMBER. These ranges are provided by the source and should remain NULL if not given. ETL Convention: If reference ranges for upper and lower limit of normal as provided (typically by a laboratory) these are stored in the RANGE_HIGH and RANGE_LOW fields. This should be set to NULL if not provided.")
  range_high?: float64;

  @doc("The provider associated with measurement record, e.g. the provider who ordered the test or the provider who recorded the result. ETL Convention: The ETL may need to make a choice as to which PROVIDER_ID to put here. Based on what is available this may or may not be different than the provider associated with the overall VISIT_OCCURRENCE record. For example the admitting vs attending physician on an EHR record. References PROVIDER table.")
  provider_id?: int64;

  @doc("The visit during which the Measurement occurred. ETL Convention: Depending on the structure of the source data, this may have to be determined based on dates. If a MEASUREMENT_DATE occurs within the start and end date of a Visit it is a valid ETL choice to choose the VISIT_OCCURRENCE_ID from the visit that subsumes it, even if not explicitly stated in the data. While not required, an attempt should be made to locate the VISIT_OCCURRENCE_ID of the measurement record. If a measurement is related to a visit explicitly in the source data, it is possible that the result date of the Measurement falls outside of the bounds of the Visit dates. References VISIT_OCCURRENCE table.")
  visit_occurrence_id?: int64;

  @doc("The VISIT_DETAIL record during which the Measurement occurred. For example, if the Person was in the ICU at the time the VISIT_OCCURRENCE record would reflect the overall hospital stay and the VISIT_DETAIL record would reflect the ICU stay during the hospital visit. ETL Convention: Same rules apply as for the VISIT_OCCURRENCE_ID. References VISIT_DETAIL table.")
  visit_detail_id?: int64;

  @doc("This field contains the exact value from the source data that represents the measurement that occurred. ETL Convention: This value corresponds to a standardized CONCEPT_ID found in MEASUREMENT_CONCEPT_ID and in the ‘Measurement’ domain within the Standardized Vocabularies. The original code is retained here for reference purposes.")
  measurement_source_value?: string;

  @doc("This is the concept representing the MEASUREMENT_SOURCE_VALUE and may not necessarily be standard. This field is discouraged from use in analysis because it is not required to contain Standard Concepts that are used across the OHDSI community, and should only be used when Standard Concepts do not adequately represent the source detail for the Measurement necessary for a given analytic use case. Consider using MEASUREMENT_CONCEPT_ID instead to enable standardized analytics that can be consistent across the network. ETL Convention: If the MEASUREMENT_SOURCE_VALUE is coded in the source data using a vocabulary supported by OMOP Standardized Vocabularies, insert the CONCEPT_ID representing the source value here. References CONCEPT table.")
  measurement_source_concept_id?: ConceptId;

  @doc("This field contains the exact value from the source data that represents the unit of measurement used. ETL Convention: This value corresponds to a standardized CONCEPT_ID found in UNIT_CONCEPT_ID and in the ‘Unit’ domain within the Standardized Vocabularies. The original code is retained here for reference purposes.")
  unit_source_value?: string;

  @doc("“This is the concept representing the UNIT_SOURCE_VALUE and may not necessarily be standard. This field is discouraged from use in analysis because it is not required to contain Standard Concepts that are used across the OHDSI community, and should only be used when Standard Concepts do not adequately represent the source detail for the Measurement necessary for a given analytic use case. Consider using UNIT_CONCEPT_ID instead to enable standardized analytics that can be consistent across the network.” ETL Convention: If the UNIT_SOURCE_VALUE is coded in the source data using an OMOP supported vocabulary put the concept id representing the source value here. References CONCEPT table.")
  unit_source_concept_id?: ConceptId;

  @doc("This field houses the verbatim result value of the Measurement from the source data . ETL Convention: If both a continuous and categorical result are given in the source data such that both VALUE_AS_NUMBER and VALUE_AS_CONCEPT_ID are both included, store the verbatim value that was mapped to VALUE_AS_CONCEPT_ID here.")
  value_source_value?: string;

  @doc("If the Measurement record is related to another record in the database, this field is the primary key of the linked record. ETL Convention: Put the primary key of the linked record, if applicable, here.")
  measurement_event_id?: int64;

  @doc("If the Measurement record is related to another record in the database, this field is the CONCEPT_ID that identifies which table the primary key of the linked record came from. ETL Convention: Put the CONCEPT_ID that identifies which table and field the MEASUREMENT_EVENT_ID came from. References CONCEPT table.")
  meas_event_field_concept_id?: ConceptId;
}

/**
 * Query parameters for filtering measurement
 */
@doc("Filter parameters for Measurement list operations")
model MeasurementQueryParams {
  ...PaginationParams;

  @doc("Filter by person id")
  @query
  person_id?: int64;

  @doc("Filter by measurement concept id")
  @query
  measurement_concept_id?: ConceptId;

  @doc("Filter by measurement type concept id")
  @query
  measurement_type_concept_id?: ConceptId;

  @doc("Filter by operator concept id")
  @query
  operator_concept_id?: ConceptId;

  @doc("Filter by value as concept id")
  @query
  value_as_concept_id?: ConceptId;

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

  @doc("Filter by measurement source concept id")
  @query
  measurement_source_concept_id?: ConceptId;

  @doc("Filter by unit source concept id")
  @query
  unit_source_concept_id?: ConceptId;

  @doc("Filter by meas event field concept id")
  @query
  meas_event_field_concept_id?: ConceptId;

  @doc("Sort field")
  @query
  sort_by?: "measurement_id";

  @doc("Sort order")
  @query
  sort_order?: SortOrder;
}

/**
 * Measurement API operations
 */
@route("/measurements")
@tag("Clinical - Measurements")
interface Measurements {
  @get
  @summary("List all measurements")
  @doc("Returns a paginated list of Measurement records.")
  list(
    ...MeasurementQueryParams,
  ): {
    @statusCode statusCode: 200;
    @body body: PaginatedList<Measurement>;
  } | ErrorResponse;

  @get
  @summary("Get measurement by ID")
  @doc("Retrieve a single Measurement record by its unique identifier.")
  read(
    @path
    @doc("Unique measurement identifier")
    measurement_id: int64,
  ): {
    @statusCode statusCode: 200;
    @body body: Measurement;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @post
  @summary("Create a new measurement")
  @doc("Create a new Measurement record.")
  create(
    @body
    @doc("Measurement data to create")
    record: MeasurementCreate,
  ): {
    @statusCode statusCode: 201;
    @body body: Measurement;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @put
  @summary("Update measurement (full replacement)")
  @doc("Replace all fields of an existing Measurement record.")
  update(
    @path
    @doc("Unique measurement identifier")
    measurement_id: int64,

    @body
    @doc("Complete measurement data")
    record: MeasurementCreate,
  ): {
    @statusCode statusCode: 200;
    @body body: Measurement;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @patch(#{implicitOptionality: true})
  @summary("Update measurement (partial)")
  @doc("Update specific fields of an existing Measurement record.")
  patch(
    @path
    @doc("Unique measurement identifier")
    measurement_id: int64,

    @body
    @doc("Fields to update")
    record: MeasurementUpdate,
  ): {
    @statusCode statusCode: 200;
    @body body: Measurement;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @delete
  @summary("Delete measurement")
  @doc("Delete a Measurement record.")
  delete(
    @path
    @doc("Unique measurement identifier")
    measurement_id: int64,
  ): {
    @statusCode statusCode: 204;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;
}
