import "@typespec/http";
import "@typespec/rest";
import "../common/models.tsp";

using TypeSpec.Http;
using TypeSpec.Rest;
using OmopCdm.Common;

namespace OmopCdm.Clinical;

/**
 * ProcedureOccurrence Resource
 *
 * This table contains records of activities or processes ordered by, or
carried out by, a healthcare provider on the patient with a diagnostic
or therapeutic purpose.
 *
 * **User Guide**: Lab tests are not a procedure, if something is observed with an
expected resulting amount and unit then it should be a measurement.
Phlebotomy is a procedure but so trivial that it tends to be rarely
captured. It can be assumed that there is a phlebotomy procedure
associated with many lab tests, therefore it is unnecessary to add them
as separate procedures.
 *
 * **ETL Conventions**: When dealing with duplicate records, the ETL must determine whether
to sum them up into one record or keep them separate. Things to consider
are: 
- Same Procedure
- Same procedure_datetime
- Same Visit Occurrence or Visit Detail
- Same Provider
- Same Modifier for Procedures.

Source codes and source text fields mapped to Standard Concepts of
the Procedure Domain have to be recorded here.
 */

@doc("ProcedureOccurrence record in the OMOP CDM")
model ProcedureOccurrence {
  @doc("The unique key given to a procedure record for a person. Refer to the ETL for how duplicate procedures during the same visit were handled. ETL Convention: Each instance of a procedure occurrence in the source data should be assigned this unique key. In some cases, a person can have multiple records of the same procedure within the same visit. It is valid to keep these duplicates and assign them individual, unique, PROCEDURE_OCCURRENCE_IDs, though it is up to the ETL how they should be handled.")
  procedure_occurrence_id: int64;

  @doc("The PERSON_ID of the PERSON for whom the procedure is recorded. This may be a system generated code.  References PERSON table.")
  person_id: int64;

  @doc("The PROCEDURE_CONCEPT_ID field is recommended for primary use in analyses, and must be used for network studies. This is the standard concept mapped from the source value which represents a procedure ETL Convention: The CONCEPT_ID that the PROCEDURE_SOURCE_VALUE maps to. Only records whose source values map to standard concepts with a domain of “Procedure” should go in this table. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Procedure&standardConcept=Standard&page=1&pageSize=15&query=). References CONCEPT table.")
  procedure_concept_id: ConceptId;

  @doc("Use this date to determine the date the procedure started. ETL Convention: This is meant to be the **start date** of the procedure. It will be renamed in a future version to **PROCEDURE_START_DATE**.")
  procedure_date: DateOnly;

  @doc("If the procedure has a start time in the native date, use this field to house that information. This will be renamed in a future version to **PROCEDURE_START_DATETIME**.")
  procedure_datetime?: DateTime;

  @doc("Use this field to house the date that the procedure ended. ETL Convention: This is meant to be the end date of the procedure. It is not required and for most cases will be the same as the PROCEDURE_START_DATE.")
  procedure_end_date?: DateOnly;

  @doc("Use this field to house the datetime that the procedure ended. ETL Convention: This is meant to house the end datetime of the procedure and will most often be used in conjunction with the procedure_start_datetime to determine the length of the procedure.")
  procedure_end_datetime?: DateTime;

  @doc("This field can be used to determine the provenance of the Procedure record, as in whether the procedure was from an EHR system, insurance claim, registry, or other sources. ETL Convention: Choose the PROCEDURE_TYPE_CONCEPT_ID that best represents the provenance of the record, for example whether it came from an EHR record or billing claim. If a procedure is recorded as an EHR encounter, the PROCEDURE_TYPE_CONCEPT would be ‘EHR encounter record’. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Type+Concept&standardConcept=Standard&page=1&pageSize=15&query=). A more detailed explanation of each Type Concept can be found on the [vocabulary wiki](https://github.com/OHDSI/Vocabulary-v5.0/wiki/Vocab.-TYPE_CONCEPT). References CONCEPT table.")
  procedure_type_concept_id: ConceptId;

  @doc("The modifiers are intended to give additional information about the procedure but as of now the vocabulary is under review. ETL Convention: It is up to the ETL to choose how to map modifiers if they exist in source data. These concepts are typically distinguished by ‘Modifier’ concept classes (e.g., ‘CPT4 Modifier’ as part of the ‘CPT4’ vocabulary). If there is more than one modifier on a record, one should be chosen that pertains to the procedure rather than provider. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?conceptClass=CPT4+Modifier&conceptClass=HCPCS+Modifier&vocabulary=CPT4&vocabulary=HCPCS&standardConcept=Standard&page=1&pageSize=15&query=). References CONCEPT table.")
  modifier_concept_id?: ConceptId;

  @doc("If the quantity value is omitted, a single procedure is assumed. ETL Convention: If a Procedure has a quantity of ‘0’ in the source, this should default to ‘1’ in the ETL. If there is a record in the source it can be assumed the exposure occurred at least once")
  quantity?: int64;

  @doc("The provider associated with the procedure record, e.g. the provider who performed the Procedure. ETL Convention: The ETL may need to make a choice as to which PROVIDER_ID to put here. Based on what is available this may or may not be different than the provider associated with the overall VISIT_OCCURRENCE record, for example the admitting vs attending physician on an EHR record. References PROVIDER table.")
  provider_id?: int64;

  @doc("The visit during which the procedure occurred. ETL Convention: Depending on the structure of the source data, this may have to be determined based on dates. If a PROCEDURE_DATE occurs within the start and end date of a Visit it is a valid ETL choice to choose the VISIT_OCCURRENCE_ID from the Visit that subsumes it, even if not explicitly stated in the data. While not required, an attempt should be made to locate the VISIT_OCCURRENCE_ID of the PROCEDURE_OCCURRENCE record. References VISIT_OCCURRENCE table.")
  visit_occurrence_id?: int64;

  @doc("The VISIT_DETAIL record during which the Procedure occurred. For example, if the Person was in the ICU at the time of the Procedure the VISIT_OCCURRENCE record would reflect the overall hospital stay and the VISIT_DETAIL record would reflect the ICU stay during the hospital visit. ETL Convention: Same rules apply as for the VISIT_OCCURRENCE_ID. References VISIT_DETAIL table.")
  visit_detail_id?: int64;

  @doc("This field houses the verbatim value from the source data representing the procedure that occurred. For example, this could be an CPT4 or OPCS4 code. ETL Convention: Use this value to look up the source concept id and then map the source concept id to a standard concept id.")
  @maxLength(50)
  procedure_source_value?: string;

  @doc("This is the concept representing the procedure source value and may not necessarily be standard. This field is discouraged from use in analysis because it is not required to contain Standard Concepts that are used across the OHDSI community, and should only be used when Standard Concepts do not adequately represent the source detail for the Procedure necessary for a given analytic use case. Consider using PROCEDURE_CONCEPT_ID instead to enable standardized analytics that can be consistent across the network. ETL Convention: If the PROCEDURE_SOURCE_VALUE is coded in the source data using an OMOP supported vocabulary put the concept id representing the source value here. References CONCEPT table.")
  procedure_source_concept_id?: ConceptId;

  @doc("This field houses the verbatim value from the source data representing the modifier code for the procedure that occurred. ETL Convention: The value stored here is mapped to a MODIFIER_CONCEPT_ID.")
  @maxLength(50)
  modifier_source_value?: string;
}

/**
 * ProcedureOccurrence creation request
 */
@doc("Request body for creating a new ProcedureOccurrence record")
model ProcedureOccurrenceCreate {
  @doc("The PERSON_ID of the PERSON for whom the procedure is recorded. This may be a system generated code.  References PERSON table.")
  person_id: int64;

  @doc("The PROCEDURE_CONCEPT_ID field is recommended for primary use in analyses, and must be used for network studies. This is the standard concept mapped from the source value which represents a procedure ETL Convention: The CONCEPT_ID that the PROCEDURE_SOURCE_VALUE maps to. Only records whose source values map to standard concepts with a domain of “Procedure” should go in this table. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Procedure&standardConcept=Standard&page=1&pageSize=15&query=). References CONCEPT table.")
  procedure_concept_id: ConceptId;

  @doc("Use this date to determine the date the procedure started. ETL Convention: This is meant to be the **start date** of the procedure. It will be renamed in a future version to **PROCEDURE_START_DATE**.")
  procedure_date: DateOnly;

  @doc("If the procedure has a start time in the native date, use this field to house that information. This will be renamed in a future version to **PROCEDURE_START_DATETIME**.")
  procedure_datetime?: DateTime;

  @doc("Use this field to house the date that the procedure ended. ETL Convention: This is meant to be the end date of the procedure. It is not required and for most cases will be the same as the PROCEDURE_START_DATE.")
  procedure_end_date?: DateOnly;

  @doc("Use this field to house the datetime that the procedure ended. ETL Convention: This is meant to house the end datetime of the procedure and will most often be used in conjunction with the procedure_start_datetime to determine the length of the procedure.")
  procedure_end_datetime?: DateTime;

  @doc("This field can be used to determine the provenance of the Procedure record, as in whether the procedure was from an EHR system, insurance claim, registry, or other sources. ETL Convention: Choose the PROCEDURE_TYPE_CONCEPT_ID that best represents the provenance of the record, for example whether it came from an EHR record or billing claim. If a procedure is recorded as an EHR encounter, the PROCEDURE_TYPE_CONCEPT would be ‘EHR encounter record’. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Type+Concept&standardConcept=Standard&page=1&pageSize=15&query=). A more detailed explanation of each Type Concept can be found on the [vocabulary wiki](https://github.com/OHDSI/Vocabulary-v5.0/wiki/Vocab.-TYPE_CONCEPT). References CONCEPT table.")
  procedure_type_concept_id: ConceptId;

  @doc("The modifiers are intended to give additional information about the procedure but as of now the vocabulary is under review. ETL Convention: It is up to the ETL to choose how to map modifiers if they exist in source data. These concepts are typically distinguished by ‘Modifier’ concept classes (e.g., ‘CPT4 Modifier’ as part of the ‘CPT4’ vocabulary). If there is more than one modifier on a record, one should be chosen that pertains to the procedure rather than provider. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?conceptClass=CPT4+Modifier&conceptClass=HCPCS+Modifier&vocabulary=CPT4&vocabulary=HCPCS&standardConcept=Standard&page=1&pageSize=15&query=). References CONCEPT table.")
  modifier_concept_id?: ConceptId;

  @doc("If the quantity value is omitted, a single procedure is assumed. ETL Convention: If a Procedure has a quantity of ‘0’ in the source, this should default to ‘1’ in the ETL. If there is a record in the source it can be assumed the exposure occurred at least once")
  quantity?: int64;

  @doc("The provider associated with the procedure record, e.g. the provider who performed the Procedure. ETL Convention: The ETL may need to make a choice as to which PROVIDER_ID to put here. Based on what is available this may or may not be different than the provider associated with the overall VISIT_OCCURRENCE record, for example the admitting vs attending physician on an EHR record. References PROVIDER table.")
  provider_id?: int64;

  @doc("The visit during which the procedure occurred. ETL Convention: Depending on the structure of the source data, this may have to be determined based on dates. If a PROCEDURE_DATE occurs within the start and end date of a Visit it is a valid ETL choice to choose the VISIT_OCCURRENCE_ID from the Visit that subsumes it, even if not explicitly stated in the data. While not required, an attempt should be made to locate the VISIT_OCCURRENCE_ID of the PROCEDURE_OCCURRENCE record. References VISIT_OCCURRENCE table.")
  visit_occurrence_id?: int64;

  @doc("The VISIT_DETAIL record during which the Procedure occurred. For example, if the Person was in the ICU at the time of the Procedure the VISIT_OCCURRENCE record would reflect the overall hospital stay and the VISIT_DETAIL record would reflect the ICU stay during the hospital visit. ETL Convention: Same rules apply as for the VISIT_OCCURRENCE_ID. References VISIT_DETAIL table.")
  visit_detail_id?: int64;

  @doc("This field houses the verbatim value from the source data representing the procedure that occurred. For example, this could be an CPT4 or OPCS4 code. ETL Convention: Use this value to look up the source concept id and then map the source concept id to a standard concept id.")
  @maxLength(50)
  procedure_source_value?: string;

  @doc("This is the concept representing the procedure source value and may not necessarily be standard. This field is discouraged from use in analysis because it is not required to contain Standard Concepts that are used across the OHDSI community, and should only be used when Standard Concepts do not adequately represent the source detail for the Procedure necessary for a given analytic use case. Consider using PROCEDURE_CONCEPT_ID instead to enable standardized analytics that can be consistent across the network. ETL Convention: If the PROCEDURE_SOURCE_VALUE is coded in the source data using an OMOP supported vocabulary put the concept id representing the source value here. References CONCEPT table.")
  procedure_source_concept_id?: ConceptId;

  @doc("This field houses the verbatim value from the source data representing the modifier code for the procedure that occurred. ETL Convention: The value stored here is mapped to a MODIFIER_CONCEPT_ID.")
  @maxLength(50)
  modifier_source_value?: string;
}

/**
 * ProcedureOccurrence update request
 */
@doc("Request body for updating an existing ProcedureOccurrence record")
model ProcedureOccurrenceUpdate {
  @doc("The PERSON_ID of the PERSON for whom the procedure is recorded. This may be a system generated code.  References PERSON table.")
  person_id?: int64;

  @doc("The PROCEDURE_CONCEPT_ID field is recommended for primary use in analyses, and must be used for network studies. This is the standard concept mapped from the source value which represents a procedure ETL Convention: The CONCEPT_ID that the PROCEDURE_SOURCE_VALUE maps to. Only records whose source values map to standard concepts with a domain of “Procedure” should go in this table. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Procedure&standardConcept=Standard&page=1&pageSize=15&query=). References CONCEPT table.")
  procedure_concept_id?: ConceptId;

  @doc("Use this date to determine the date the procedure started. ETL Convention: This is meant to be the **start date** of the procedure. It will be renamed in a future version to **PROCEDURE_START_DATE**.")
  procedure_date?: DateOnly;

  @doc("If the procedure has a start time in the native date, use this field to house that information. This will be renamed in a future version to **PROCEDURE_START_DATETIME**.")
  procedure_datetime?: DateTime;

  @doc("Use this field to house the date that the procedure ended. ETL Convention: This is meant to be the end date of the procedure. It is not required and for most cases will be the same as the PROCEDURE_START_DATE.")
  procedure_end_date?: DateOnly;

  @doc("Use this field to house the datetime that the procedure ended. ETL Convention: This is meant to house the end datetime of the procedure and will most often be used in conjunction with the procedure_start_datetime to determine the length of the procedure.")
  procedure_end_datetime?: DateTime;

  @doc("This field can be used to determine the provenance of the Procedure record, as in whether the procedure was from an EHR system, insurance claim, registry, or other sources. ETL Convention: Choose the PROCEDURE_TYPE_CONCEPT_ID that best represents the provenance of the record, for example whether it came from an EHR record or billing claim. If a procedure is recorded as an EHR encounter, the PROCEDURE_TYPE_CONCEPT would be ‘EHR encounter record’. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Type+Concept&standardConcept=Standard&page=1&pageSize=15&query=). A more detailed explanation of each Type Concept can be found on the [vocabulary wiki](https://github.com/OHDSI/Vocabulary-v5.0/wiki/Vocab.-TYPE_CONCEPT). References CONCEPT table.")
  procedure_type_concept_id?: ConceptId;

  @doc("The modifiers are intended to give additional information about the procedure but as of now the vocabulary is under review. ETL Convention: It is up to the ETL to choose how to map modifiers if they exist in source data. These concepts are typically distinguished by ‘Modifier’ concept classes (e.g., ‘CPT4 Modifier’ as part of the ‘CPT4’ vocabulary). If there is more than one modifier on a record, one should be chosen that pertains to the procedure rather than provider. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?conceptClass=CPT4+Modifier&conceptClass=HCPCS+Modifier&vocabulary=CPT4&vocabulary=HCPCS&standardConcept=Standard&page=1&pageSize=15&query=). References CONCEPT table.")
  modifier_concept_id?: ConceptId;

  @doc("If the quantity value is omitted, a single procedure is assumed. ETL Convention: If a Procedure has a quantity of ‘0’ in the source, this should default to ‘1’ in the ETL. If there is a record in the source it can be assumed the exposure occurred at least once")
  quantity?: int64;

  @doc("The provider associated with the procedure record, e.g. the provider who performed the Procedure. ETL Convention: The ETL may need to make a choice as to which PROVIDER_ID to put here. Based on what is available this may or may not be different than the provider associated with the overall VISIT_OCCURRENCE record, for example the admitting vs attending physician on an EHR record. References PROVIDER table.")
  provider_id?: int64;

  @doc("The visit during which the procedure occurred. ETL Convention: Depending on the structure of the source data, this may have to be determined based on dates. If a PROCEDURE_DATE occurs within the start and end date of a Visit it is a valid ETL choice to choose the VISIT_OCCURRENCE_ID from the Visit that subsumes it, even if not explicitly stated in the data. While not required, an attempt should be made to locate the VISIT_OCCURRENCE_ID of the PROCEDURE_OCCURRENCE record. References VISIT_OCCURRENCE table.")
  visit_occurrence_id?: int64;

  @doc("The VISIT_DETAIL record during which the Procedure occurred. For example, if the Person was in the ICU at the time of the Procedure the VISIT_OCCURRENCE record would reflect the overall hospital stay and the VISIT_DETAIL record would reflect the ICU stay during the hospital visit. ETL Convention: Same rules apply as for the VISIT_OCCURRENCE_ID. References VISIT_DETAIL table.")
  visit_detail_id?: int64;

  @doc("This field houses the verbatim value from the source data representing the procedure that occurred. For example, this could be an CPT4 or OPCS4 code. ETL Convention: Use this value to look up the source concept id and then map the source concept id to a standard concept id.")
  procedure_source_value?: string;

  @doc("This is the concept representing the procedure source value and may not necessarily be standard. This field is discouraged from use in analysis because it is not required to contain Standard Concepts that are used across the OHDSI community, and should only be used when Standard Concepts do not adequately represent the source detail for the Procedure necessary for a given analytic use case. Consider using PROCEDURE_CONCEPT_ID instead to enable standardized analytics that can be consistent across the network. ETL Convention: If the PROCEDURE_SOURCE_VALUE is coded in the source data using an OMOP supported vocabulary put the concept id representing the source value here. References CONCEPT table.")
  procedure_source_concept_id?: ConceptId;

  @doc("This field houses the verbatim value from the source data representing the modifier code for the procedure that occurred. ETL Convention: The value stored here is mapped to a MODIFIER_CONCEPT_ID.")
  modifier_source_value?: string;
}

/**
 * Query parameters for filtering procedure-occurrence
 */
@doc("Filter parameters for ProcedureOccurrence list operations")
model ProcedureOccurrenceQueryParams {
  ...PaginationParams;

  @doc("Filter by person id")
  @query
  person_id?: int64;

  @doc("Filter by procedure concept id")
  @query
  procedure_concept_id?: ConceptId;

  @doc("Filter by procedure type concept id")
  @query
  procedure_type_concept_id?: ConceptId;

  @doc("Filter by modifier concept id")
  @query
  modifier_concept_id?: ConceptId;

  @doc("Filter by provider id")
  @query
  provider_id?: int64;

  @doc("Filter by visit occurrence id")
  @query
  visit_occurrence_id?: int64;

  @doc("Filter by visit detail id")
  @query
  visit_detail_id?: int64;

  @doc("Filter by procedure source concept id")
  @query
  procedure_source_concept_id?: ConceptId;

  @doc("Sort field")
  @query
  sort_by?: "procedure_occurrence_id";

  @doc("Sort order")
  @query
  sort_order?: SortOrder;
}

/**
 * ProcedureOccurrence API operations
 */
@route("/procedure-occurrences")
@tag("Clinical - ProcedureOccurrences")
interface ProcedureOccurrences {
  @get
  @summary("List all procedure-occurrences")
  @doc("Returns a paginated list of ProcedureOccurrence records.")
  list(
    ...ProcedureOccurrenceQueryParams,
  ): {
    @statusCode statusCode: 200;
    @body body: PaginatedList<ProcedureOccurrence>;
  } | ErrorResponse;

  @get
  @summary("Get procedure-occurrence by ID")
  @doc("Retrieve a single ProcedureOccurrence record by its unique identifier.")
  read(
    @path
    @doc("Unique procedure-occurrence identifier")
    procedure_occurrence_id: int64,
  ): {
    @statusCode statusCode: 200;
    @body body: ProcedureOccurrence;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @post
  @summary("Create a new procedure-occurrence")
  @doc("Create a new ProcedureOccurrence record.")
  create(
    @body
    @doc("ProcedureOccurrence data to create")
    record: ProcedureOccurrenceCreate,
  ): {
    @statusCode statusCode: 201;
    @body body: ProcedureOccurrence;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @put
  @summary("Update procedure-occurrence (full replacement)")
  @doc("Replace all fields of an existing ProcedureOccurrence record.")
  update(
    @path
    @doc("Unique procedure-occurrence identifier")
    procedure_occurrence_id: int64,

    @body
    @doc("Complete procedure-occurrence data")
    record: ProcedureOccurrenceCreate,
  ): {
    @statusCode statusCode: 200;
    @body body: ProcedureOccurrence;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @patch(#{implicitOptionality: true})
  @summary("Update procedure-occurrence (partial)")
  @doc("Update specific fields of an existing ProcedureOccurrence record.")
  patch(
    @path
    @doc("Unique procedure-occurrence identifier")
    procedure_occurrence_id: int64,

    @body
    @doc("Fields to update")
    record: ProcedureOccurrenceUpdate,
  ): {
    @statusCode statusCode: 200;
    @body body: ProcedureOccurrence;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @delete
  @summary("Delete procedure-occurrence")
  @doc("Delete a ProcedureOccurrence record.")
  delete(
    @path
    @doc("Unique procedure-occurrence identifier")
    procedure_occurrence_id: int64,
  ): {
    @statusCode statusCode: 204;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;
}
