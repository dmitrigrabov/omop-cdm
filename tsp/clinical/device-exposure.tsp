import "@typespec/http";
import "@typespec/rest";
import "../common/models.tsp";

using TypeSpec.Http;
using TypeSpec.Rest;
using OmopCdm.Common;

namespace OmopCdm.Clinical;

/**
 * DeviceExposure Resource
 *
 * The Device domain captures information about a person’s exposure to a
foreign physical object or instrument which is used for diagnostic or
therapeutic purposes through a mechanism beyond chemical action. Devices
include implantable objects (e.g. pacemakers, stents, artificial
joints), medical equipment and supplies (e.g. bandages, crutches,
syringes), other instruments used in medical procedures (e.g. sutures,
defibrillators) and material used in clinical care (e.g. adhesives, body
material, dental material, surgical material).
 *
 * **User Guide**: The distinction between Devices or supplies and Procedures are
sometimes blurry, but the former are physical objects while the latter
are actions, often to apply a Device or supply.
 *
 * **ETL Conventions**: Source codes and source text fields mapped to Standard Concepts of
the Device Domain have to be recorded here.
 */

@doc("DeviceExposure record in the OMOP CDM")
@example(#{
  id: 12345,
  person_id: 100,
  device_concept_id: 8507,
  device_exposure_start_date: "2023-01-15",
  device_exposure_start_datetime: "2023-01-15",
  device_exposure_end_date: "2023-01-15",
  device_exposure_end_datetime: "2023-01-15",
  device_type_concept_id: 8507,
  unique_device_id: "Example value",
  production_id: "Example value",
  quantity: 100,
  provider_id: 100,
  visit_occurrence_id: 100,
  visit_detail_id: 100,
  device_source_value: "Example value",
  device_source_concept_id: 8507,
  unit_concept_id: 8507,
  unit_source_value: "Example value",
  unit_source_concept_id: 8507
})
model DeviceExposure {
  @doc("The unique key given to records a person's exposure to a foreign physical object or instrument. ETL Convention: Each instance of an exposure to a foreign object or device present in the source data should be assigned this unique key.")
  id: int64;

  @doc("References PERSON table.")
  person_id: int64;

  @doc("The DEVICE_CONCEPT_ID field is recommended for primary use in analyses, and must be used for network studies. This is the standard concept mapped from the source concept id which represents a foreign object or instrument the person was exposed to. ETL Convention: The CONCEPT_ID that the DEVICE_SOURCE_VALUE maps to. References CONCEPT table.")
  device_concept_id: ConceptId;

  @doc("Use this date to determine the start date of the device record. ETL Convention: Valid entries include a start date of a procedure to implant a device, the date of a prescription for a device, or the date of device administration.")
  device_exposure_start_date: DateOnly;

  @doc("This is not required, though it is in v6. If a source does not specify datetime the convention is to set the time to midnight (00:00:0000)")
  device_exposure_start_datetime?: DateTime;

  @doc("The DEVICE_EXPOSURE_END_DATE denotes the day the device exposure ended for the patient, if given. ETL Convention: Put the end date or discontinuation date as it appears from the source data or leave blank if unavailable.")
  device_exposure_end_date?: DateOnly;

  @doc("If a source does not specify datetime the convention is to set the time to midnight (00:00:0000)")
  device_exposure_end_datetime?: DateTime;

  @doc("You can use the TYPE_CONCEPT_ID to denote the provenance of the record, as in whether the record is from administrative claims or EHR. ETL Convention: Choose the device_type_concept_id that best represents the provenance of the record. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Type+Concept&standardConcept=Standard&page=1&pageSize=15&query=). A more detailed explanation of each Type Concept can be found on the [vocabulary wiki](https://github.com/OHDSI/Vocabulary-v5.0/wiki/Vocab.-TYPE_CONCEPT). References CONCEPT table.")
  device_type_concept_id: ConceptId;

  @doc("This is the Unique Device Identification (UDI-DI) number for devices regulated by the FDA, if given. ETL Convention: For medical devices that are regulated by the FDA, a Unique Device Identification (UDI) is provided if available in the data source and is recorded in the UNIQUE_DEVICE_ID field.")
  @maxLength(255)
  unique_device_id?: string;

  @doc("This is the Production Identifier (UDI-PI) portion of the Unique Device Identification.")
  @maxLength(255)
  production_id?: string;

  @doc("If there is a record of device exposure in the source but no quantity value, then set to 1.")
  quantity?: int64;

  @doc("The Provider associated with device record, e.g. the provider who wrote the prescription or the provider who implanted the device. ETL Convention: The ETL may need to make a choice as to which PROVIDER_ID to put here. Based on what is available this may or may not be different than the provider associated with the overall VISIT_OCCURRENCE record. References PROVIDER table.")
  provider_id?: int64;

  @doc("The Visit during which the device was prescribed or given. ETL Convention: To populate this field device exposures must be explicitly initiated in the visit. References VISIT_OCCURRENCE table.")
  visit_occurrence_id?: int64;

  @doc("The Visit Detail during which the device was prescribed or given. ETL Convention: To populate this field device exposures must be explicitly initiated in the visit detail record. References VISIT_DETAIL table.")
  visit_detail_id?: int64;

  @doc("This field houses the verbatim value from the source data representing the device exposure that occurred. For example, this could be an NDC or Gemscript code. ETL Convention: This code is mapped to a Standard Device Concept in the Standardized Vocabularies and the original code is stored here for reference.")
  @maxLength(50)
  device_source_value?: string;

  @doc("This is the concept representing the device source value and may not necessarily be standard. This field is discouraged from use in analysis because it is not required to contain Standard Concepts that are used across the OHDSI community, and should only be used when Standard Concepts do not adequately represent the source detail for the Device necessary for a given analytic use case. Consider using DEVICE_CONCEPT_ID instead to enable standardized analytics that can be consistent across the network. ETL Convention: If the DEVICE_SOURCE_VALUE is coded in the source data using an OMOP supported vocabulary put the concept id representing the source value here. References CONCEPT table.")
  device_source_concept_id?: ConceptId;

  @doc("UNIT_SOURCE_VALUES should be mapped to a Standard Concept in the Unit domain that best represents the unit as given in the source data. ETL Convention: There is no standardization requirement for units associated with DEVICE_CONCEPT_IDs, however, it is the responsibility of the ETL to choose the most plausible unit. If the source unit is NULL (applicable to cases when there’s no numerical value or when it doesn’t require a unit), keep unit_concept_id NULL as well. If there’s no mapping of a source unit, populate unit_concept_id with 0. References CONCEPT table.")
  unit_concept_id?: ConceptId;

  @doc("This field houses the verbatim value from the source data representing the unit of the Device. For example, blood transfusions are considered devices and can be given in mL quantities. ETL Convention: This code is mapped to a Standard Condition Concept in the Standardized Vocabularies and the original code is stored here for reference. Using the blood transfusion example, blood transfusion is represented by the DEVICE_CONCEPT_ID and the unit (mL) would be housed in the UNIT_SOURCE_VALUE and mapped to a standard concept in the unit domain.")
  @maxLength(50)
  unit_source_value?: string;

  @doc("This is the concept representing the UNIT_SOURCE_VALUE and may not necessarily be standard. This field is discouraged from use in analysis because it is not required to contain Standard Concepts that are used across the OHDSI community, and should only be used when Standard Concepts do not adequately represent the source detail for the Unit necessary for a given analytic use case. Consider using UNIT_CONCEPT_ID instead to enable standardized analytics that can be consistent across the network. ETL Convention: If the UNIT_SOURCE_VALUE is coded in the source data using an OMOP supported vocabulary put the concept id representing the source value here. References CONCEPT table.")
  unit_source_concept_id?: ConceptId;
}

/**
 * DeviceExposure creation request
 */
@doc("Request body for creating a new DeviceExposure record")
model DeviceExposureCreate {
  @doc("References PERSON table.")
  person_id: int64;

  @doc("The DEVICE_CONCEPT_ID field is recommended for primary use in analyses, and must be used for network studies. This is the standard concept mapped from the source concept id which represents a foreign object or instrument the person was exposed to. ETL Convention: The CONCEPT_ID that the DEVICE_SOURCE_VALUE maps to. References CONCEPT table.")
  device_concept_id: ConceptId;

  @doc("Use this date to determine the start date of the device record. ETL Convention: Valid entries include a start date of a procedure to implant a device, the date of a prescription for a device, or the date of device administration.")
  device_exposure_start_date: DateOnly;

  @doc("This is not required, though it is in v6. If a source does not specify datetime the convention is to set the time to midnight (00:00:0000)")
  device_exposure_start_datetime?: DateTime;

  @doc("The DEVICE_EXPOSURE_END_DATE denotes the day the device exposure ended for the patient, if given. ETL Convention: Put the end date or discontinuation date as it appears from the source data or leave blank if unavailable.")
  device_exposure_end_date?: DateOnly;

  @doc("If a source does not specify datetime the convention is to set the time to midnight (00:00:0000)")
  device_exposure_end_datetime?: DateTime;

  @doc("You can use the TYPE_CONCEPT_ID to denote the provenance of the record, as in whether the record is from administrative claims or EHR. ETL Convention: Choose the device_type_concept_id that best represents the provenance of the record. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Type+Concept&standardConcept=Standard&page=1&pageSize=15&query=). A more detailed explanation of each Type Concept can be found on the [vocabulary wiki](https://github.com/OHDSI/Vocabulary-v5.0/wiki/Vocab.-TYPE_CONCEPT). References CONCEPT table.")
  device_type_concept_id: ConceptId;

  @doc("This is the Unique Device Identification (UDI-DI) number for devices regulated by the FDA, if given. ETL Convention: For medical devices that are regulated by the FDA, a Unique Device Identification (UDI) is provided if available in the data source and is recorded in the UNIQUE_DEVICE_ID field.")
  @maxLength(255)
  unique_device_id?: string;

  @doc("This is the Production Identifier (UDI-PI) portion of the Unique Device Identification.")
  @maxLength(255)
  production_id?: string;

  @doc("If there is a record of device exposure in the source but no quantity value, then set to 1.")
  quantity?: int64;

  @doc("The Provider associated with device record, e.g. the provider who wrote the prescription or the provider who implanted the device. ETL Convention: The ETL may need to make a choice as to which PROVIDER_ID to put here. Based on what is available this may or may not be different than the provider associated with the overall VISIT_OCCURRENCE record. References PROVIDER table.")
  provider_id?: int64;

  @doc("The Visit during which the device was prescribed or given. ETL Convention: To populate this field device exposures must be explicitly initiated in the visit. References VISIT_OCCURRENCE table.")
  visit_occurrence_id?: int64;

  @doc("The Visit Detail during which the device was prescribed or given. ETL Convention: To populate this field device exposures must be explicitly initiated in the visit detail record. References VISIT_DETAIL table.")
  visit_detail_id?: int64;

  @doc("This field houses the verbatim value from the source data representing the device exposure that occurred. For example, this could be an NDC or Gemscript code. ETL Convention: This code is mapped to a Standard Device Concept in the Standardized Vocabularies and the original code is stored here for reference.")
  @maxLength(50)
  device_source_value?: string;

  @doc("This is the concept representing the device source value and may not necessarily be standard. This field is discouraged from use in analysis because it is not required to contain Standard Concepts that are used across the OHDSI community, and should only be used when Standard Concepts do not adequately represent the source detail for the Device necessary for a given analytic use case. Consider using DEVICE_CONCEPT_ID instead to enable standardized analytics that can be consistent across the network. ETL Convention: If the DEVICE_SOURCE_VALUE is coded in the source data using an OMOP supported vocabulary put the concept id representing the source value here. References CONCEPT table.")
  device_source_concept_id?: ConceptId;

  @doc("UNIT_SOURCE_VALUES should be mapped to a Standard Concept in the Unit domain that best represents the unit as given in the source data. ETL Convention: There is no standardization requirement for units associated with DEVICE_CONCEPT_IDs, however, it is the responsibility of the ETL to choose the most plausible unit. If the source unit is NULL (applicable to cases when there’s no numerical value or when it doesn’t require a unit), keep unit_concept_id NULL as well. If there’s no mapping of a source unit, populate unit_concept_id with 0. References CONCEPT table.")
  unit_concept_id?: ConceptId;

  @doc("This field houses the verbatim value from the source data representing the unit of the Device. For example, blood transfusions are considered devices and can be given in mL quantities. ETL Convention: This code is mapped to a Standard Condition Concept in the Standardized Vocabularies and the original code is stored here for reference. Using the blood transfusion example, blood transfusion is represented by the DEVICE_CONCEPT_ID and the unit (mL) would be housed in the UNIT_SOURCE_VALUE and mapped to a standard concept in the unit domain.")
  @maxLength(50)
  unit_source_value?: string;

  @doc("This is the concept representing the UNIT_SOURCE_VALUE and may not necessarily be standard. This field is discouraged from use in analysis because it is not required to contain Standard Concepts that are used across the OHDSI community, and should only be used when Standard Concepts do not adequately represent the source detail for the Unit necessary for a given analytic use case. Consider using UNIT_CONCEPT_ID instead to enable standardized analytics that can be consistent across the network. ETL Convention: If the UNIT_SOURCE_VALUE is coded in the source data using an OMOP supported vocabulary put the concept id representing the source value here. References CONCEPT table.")
  unit_source_concept_id?: ConceptId;
}

/**
 * DeviceExposure update request
 */
@doc("Request body for updating an existing DeviceExposure record")
model DeviceExposureUpdate {
  @doc("References PERSON table.")
  person_id?: int64;

  @doc("The DEVICE_CONCEPT_ID field is recommended for primary use in analyses, and must be used for network studies. This is the standard concept mapped from the source concept id which represents a foreign object or instrument the person was exposed to. ETL Convention: The CONCEPT_ID that the DEVICE_SOURCE_VALUE maps to. References CONCEPT table.")
  device_concept_id?: ConceptId;

  @doc("Use this date to determine the start date of the device record. ETL Convention: Valid entries include a start date of a procedure to implant a device, the date of a prescription for a device, or the date of device administration.")
  device_exposure_start_date?: DateOnly;

  @doc("This is not required, though it is in v6. If a source does not specify datetime the convention is to set the time to midnight (00:00:0000)")
  device_exposure_start_datetime?: DateTime;

  @doc("The DEVICE_EXPOSURE_END_DATE denotes the day the device exposure ended for the patient, if given. ETL Convention: Put the end date or discontinuation date as it appears from the source data or leave blank if unavailable.")
  device_exposure_end_date?: DateOnly;

  @doc("If a source does not specify datetime the convention is to set the time to midnight (00:00:0000)")
  device_exposure_end_datetime?: DateTime;

  @doc("You can use the TYPE_CONCEPT_ID to denote the provenance of the record, as in whether the record is from administrative claims or EHR. ETL Convention: Choose the device_type_concept_id that best represents the provenance of the record. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Type+Concept&standardConcept=Standard&page=1&pageSize=15&query=). A more detailed explanation of each Type Concept can be found on the [vocabulary wiki](https://github.com/OHDSI/Vocabulary-v5.0/wiki/Vocab.-TYPE_CONCEPT). References CONCEPT table.")
  device_type_concept_id?: ConceptId;

  @doc("This is the Unique Device Identification (UDI-DI) number for devices regulated by the FDA, if given. ETL Convention: For medical devices that are regulated by the FDA, a Unique Device Identification (UDI) is provided if available in the data source and is recorded in the UNIQUE_DEVICE_ID field.")
  unique_device_id?: string;

  @doc("This is the Production Identifier (UDI-PI) portion of the Unique Device Identification.")
  production_id?: string;

  @doc("If there is a record of device exposure in the source but no quantity value, then set to 1.")
  quantity?: int64;

  @doc("The Provider associated with device record, e.g. the provider who wrote the prescription or the provider who implanted the device. ETL Convention: The ETL may need to make a choice as to which PROVIDER_ID to put here. Based on what is available this may or may not be different than the provider associated with the overall VISIT_OCCURRENCE record. References PROVIDER table.")
  provider_id?: int64;

  @doc("The Visit during which the device was prescribed or given. ETL Convention: To populate this field device exposures must be explicitly initiated in the visit. References VISIT_OCCURRENCE table.")
  visit_occurrence_id?: int64;

  @doc("The Visit Detail during which the device was prescribed or given. ETL Convention: To populate this field device exposures must be explicitly initiated in the visit detail record. References VISIT_DETAIL table.")
  visit_detail_id?: int64;

  @doc("This field houses the verbatim value from the source data representing the device exposure that occurred. For example, this could be an NDC or Gemscript code. ETL Convention: This code is mapped to a Standard Device Concept in the Standardized Vocabularies and the original code is stored here for reference.")
  device_source_value?: string;

  @doc("This is the concept representing the device source value and may not necessarily be standard. This field is discouraged from use in analysis because it is not required to contain Standard Concepts that are used across the OHDSI community, and should only be used when Standard Concepts do not adequately represent the source detail for the Device necessary for a given analytic use case. Consider using DEVICE_CONCEPT_ID instead to enable standardized analytics that can be consistent across the network. ETL Convention: If the DEVICE_SOURCE_VALUE is coded in the source data using an OMOP supported vocabulary put the concept id representing the source value here. References CONCEPT table.")
  device_source_concept_id?: ConceptId;

  @doc("UNIT_SOURCE_VALUES should be mapped to a Standard Concept in the Unit domain that best represents the unit as given in the source data. ETL Convention: There is no standardization requirement for units associated with DEVICE_CONCEPT_IDs, however, it is the responsibility of the ETL to choose the most plausible unit. If the source unit is NULL (applicable to cases when there’s no numerical value or when it doesn’t require a unit), keep unit_concept_id NULL as well. If there’s no mapping of a source unit, populate unit_concept_id with 0. References CONCEPT table.")
  unit_concept_id?: ConceptId;

  @doc("This field houses the verbatim value from the source data representing the unit of the Device. For example, blood transfusions are considered devices and can be given in mL quantities. ETL Convention: This code is mapped to a Standard Condition Concept in the Standardized Vocabularies and the original code is stored here for reference. Using the blood transfusion example, blood transfusion is represented by the DEVICE_CONCEPT_ID and the unit (mL) would be housed in the UNIT_SOURCE_VALUE and mapped to a standard concept in the unit domain.")
  unit_source_value?: string;

  @doc("This is the concept representing the UNIT_SOURCE_VALUE and may not necessarily be standard. This field is discouraged from use in analysis because it is not required to contain Standard Concepts that are used across the OHDSI community, and should only be used when Standard Concepts do not adequately represent the source detail for the Unit necessary for a given analytic use case. Consider using UNIT_CONCEPT_ID instead to enable standardized analytics that can be consistent across the network. ETL Convention: If the UNIT_SOURCE_VALUE is coded in the source data using an OMOP supported vocabulary put the concept id representing the source value here. References CONCEPT table.")
  unit_source_concept_id?: ConceptId;
}

/**
 * Query parameters for filtering device-exposure
 */
@doc("Filter parameters for DeviceExposure list operations")
model DeviceExposureQueryParams {
  ...PaginationParams;

  @doc("Filter by person id")
  @query
  person_id?: int64;

  @doc("Filter by device concept id")
  @query
  device_concept_id?: ConceptId;

  @doc("Filter by device type concept id")
  @query
  device_type_concept_id?: ConceptId;

  @doc("Filter by provider id")
  @query
  provider_id?: int64;

  @doc("Filter by visit occurrence id")
  @query
  visit_occurrence_id?: int64;

  @doc("Filter by visit detail id")
  @query
  visit_detail_id?: int64;

  @doc("Filter by device source concept id")
  @query
  device_source_concept_id?: ConceptId;

  @doc("Filter by unit concept id")
  @query
  unit_concept_id?: ConceptId;

  @doc("Filter by unit source concept id")
  @query
  unit_source_concept_id?: ConceptId;

  @doc("Sort field")
  @query
  sort_by?: "id";

  @doc("Sort order")
  @query
  sort_order?: SortOrder;
}

/**
 * DeviceExposure API operations
 */
@route("/device-exposures")
@tag("Clinical - DeviceExposures")
interface DeviceExposures {
  @get
  @summary("List all device-exposures")
  @doc("Returns a paginated list of DeviceExposure records.")
  list(
    ...DeviceExposureQueryParams,
  ): {
    @statusCode statusCode: 200;
    @body body: PaginatedList<DeviceExposure>;
  } | ErrorResponse;

  @get
  @summary("Get device-exposure by ID")
  @doc("Retrieve a single DeviceExposure record by its unique identifier.")
  read(
    @path
    @doc("Unique device-exposure identifier")
    id: int64,
  ): {
    @statusCode statusCode: 200;
    @body body: DeviceExposure;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @post
  @summary("Create a new device-exposure")
  @doc("Create a new DeviceExposure record.")
  create(
    @body
    @doc("DeviceExposure data to create")
    record: DeviceExposureCreate,
  ): {
    @statusCode statusCode: 201;
    @body body: DeviceExposure;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @put
  @summary("Update device-exposure (full replacement)")
  @doc("Replace all fields of an existing DeviceExposure record.")
  update(
    @path
    @doc("Unique device-exposure identifier")
    id: int64,

    @body
    @doc("Complete device-exposure data")
    record: DeviceExposureCreate,
  ): {
    @statusCode statusCode: 200;
    @body body: DeviceExposure;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @patch(#{implicitOptionality: true})
  @summary("Update device-exposure (partial)")
  @doc("Update specific fields of an existing DeviceExposure record.")
  patch(
    @path
    @doc("Unique device-exposure identifier")
    id: int64,

    @body
    @doc("Fields to update")
    record: DeviceExposureUpdate,
  ): {
    @statusCode statusCode: 200;
    @body body: DeviceExposure;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @delete
  @summary("Delete device-exposure")
  @doc("Delete a DeviceExposure record.")
  delete(
    @path
    @doc("Unique device-exposure identifier")
    id: int64,
  ): {
    @statusCode statusCode: 204;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;
}
