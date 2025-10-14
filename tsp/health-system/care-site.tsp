import "@typespec/http";
import "@typespec/rest";
import "../common/models.tsp";

using TypeSpec.Http;
using TypeSpec.Rest;
using OmopCdm.Common;

namespace OmopCdm.Healthsystem;

/**
 * CareSite Resource
 *
 * The CARE_SITE table contains a list of uniquely identified
institutional (physical or organizational) units where healthcare
delivery is practiced (offices, wards, hospitals, clinics, etc.).
 *
 * **User Guide**: NA
 *
 * **ETL Conventions**: Care site is a unique combination of location_id and nature of the
site - the latter could be the place of service, name, or another
characteristic in your source data. Care site does not take into account
the provider (human) information such a specialty. Many source data do
not make a distinction between individual and institutional providers.
The CARE_SITE table contains the institutional providers. If the source,
instead of uniquely identifying individual Care Sites, only provides
limited information such as Place of Service, generic or “pooled” Care
Site records are listed in the CARE_SITE table. There can be
hierarchical and business relationships between Care Sites. For example,
wards can belong to clinics or departments, which can in turn belong to
hospitals, which in turn can belong to hospital systems, which in turn
can belong to HMOs.The relationships between Care Sites are defined in
the FACT_RELATIONSHIP table.  
  
For additional detailed conventions
on how to populate this table, please refer to [THEMIS
repository](https://ohdsi.github.io/Themis/care_site.html).
 */

@doc("CareSite record in the OMOP CDM")
@example(#{
  care_site_id: 12345,
  care_site_name: "Example value",
  place_of_service_concept_id: 8507,
  location_id: 100,
  care_site_source_value: "Example value",
  place_of_service_source_value: "Example value"
})
model CareSite {
  @doc("Assign an ID to each combination of a location and nature of the site - the latter could be the Place of Service, name or another characteristic in your source data.")
  care_site_id: int64;

  @doc("The name of the care_site as it appears in the source data")
  @maxLength(255)
  care_site_name?: string;

  @doc("This is a high-level way of characterizing a Care Site. Typically, however, Care Sites can provide care in multiple settings (inpatient, outpatient, etc.) and this granularity should be reflected in the visit. ETL Convention: Choose the concept in the visit domain that best represents the setting in which healthcare is provided in the Care Site. If most visits in a Care Site are Inpatient, then the place_of_service_concept_id should represent Inpatient. If information is present about a unique Care Site (e.g. Pharmacy) then a Care Site record should be created. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Visit&standardConcept=Standard&page=2&pageSize=15&query=). For information about how to populate this field please see the [THEMIS Conventions](https://ohdsi.github.io/Themis/tag_place_of_service.html). References CONCEPT table.")
  place_of_service_concept_id?: ConceptId;

  @doc("The location_id from the LOCATION table representing the physical location of the care_site. References LOCATION table.")
  location_id?: int64;

  @doc("The identifier of the care_site as it appears in the source data. This could be an identifier separate from the name of the care_site.")
  @maxLength(50)
  care_site_source_value?: string;

  @doc("Put the place of service of the care_site as it appears in the source data.")
  @maxLength(50)
  place_of_service_source_value?: string;
}

/**
 * CareSite creation request
 */
@doc("Request body for creating a new CareSite record")
model CareSiteCreate {
  @doc("The name of the care_site as it appears in the source data")
  @maxLength(255)
  care_site_name?: string;

  @doc("This is a high-level way of characterizing a Care Site. Typically, however, Care Sites can provide care in multiple settings (inpatient, outpatient, etc.) and this granularity should be reflected in the visit. ETL Convention: Choose the concept in the visit domain that best represents the setting in which healthcare is provided in the Care Site. If most visits in a Care Site are Inpatient, then the place_of_service_concept_id should represent Inpatient. If information is present about a unique Care Site (e.g. Pharmacy) then a Care Site record should be created. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Visit&standardConcept=Standard&page=2&pageSize=15&query=). For information about how to populate this field please see the [THEMIS Conventions](https://ohdsi.github.io/Themis/tag_place_of_service.html). References CONCEPT table.")
  place_of_service_concept_id?: ConceptId;

  @doc("The location_id from the LOCATION table representing the physical location of the care_site. References LOCATION table.")
  location_id?: int64;

  @doc("The identifier of the care_site as it appears in the source data. This could be an identifier separate from the name of the care_site.")
  @maxLength(50)
  care_site_source_value?: string;

  @doc("Put the place of service of the care_site as it appears in the source data.")
  @maxLength(50)
  place_of_service_source_value?: string;
}

/**
 * CareSite update request
 */
@doc("Request body for updating an existing CareSite record")
model CareSiteUpdate {
  @doc("The name of the care_site as it appears in the source data")
  care_site_name?: string;

  @doc("This is a high-level way of characterizing a Care Site. Typically, however, Care Sites can provide care in multiple settings (inpatient, outpatient, etc.) and this granularity should be reflected in the visit. ETL Convention: Choose the concept in the visit domain that best represents the setting in which healthcare is provided in the Care Site. If most visits in a Care Site are Inpatient, then the place_of_service_concept_id should represent Inpatient. If information is present about a unique Care Site (e.g. Pharmacy) then a Care Site record should be created. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Visit&standardConcept=Standard&page=2&pageSize=15&query=). For information about how to populate this field please see the [THEMIS Conventions](https://ohdsi.github.io/Themis/tag_place_of_service.html). References CONCEPT table.")
  place_of_service_concept_id?: ConceptId;

  @doc("The location_id from the LOCATION table representing the physical location of the care_site. References LOCATION table.")
  location_id?: int64;

  @doc("The identifier of the care_site as it appears in the source data. This could be an identifier separate from the name of the care_site.")
  care_site_source_value?: string;

  @doc("Put the place of service of the care_site as it appears in the source data.")
  place_of_service_source_value?: string;
}

/**
 * Query parameters for filtering care-site
 */
@doc("Filter parameters for CareSite list operations")
model CareSiteQueryParams {
  ...PaginationParams;

  @doc("Filter by place of service concept id")
  @query
  place_of_service_concept_id?: ConceptId;

  @doc("Filter by location id")
  @query
  location_id?: int64;

  @doc("Sort field")
  @query
  sort_by?: "care_site_id";

  @doc("Sort order")
  @query
  sort_order?: SortOrder;
}

/**
 * CareSite API operations
 */
@route("/care-sites")
@tag("Health System - CareSites")
interface CareSites {
  @get
  @summary("List all care-sites")
  @doc("Returns a paginated list of CareSite records.")
  list(
    ...CareSiteQueryParams,
  ): {
    @statusCode statusCode: 200;
    @body body: PaginatedList<CareSite>;
  } | ErrorResponse;

  @get
  @summary("Get care-site by ID")
  @doc("Retrieve a single CareSite record by its unique identifier.")
  read(
    @path
    @doc("Unique care-site identifier")
    care_site_id: int64,
  ): {
    @statusCode statusCode: 200;
    @body body: CareSite;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @post
  @summary("Create a new care-site")
  @doc("Create a new CareSite record.")
  create(
    @body
    @doc("CareSite data to create")
    record: CareSiteCreate,
  ): {
    @statusCode statusCode: 201;
    @body body: CareSite;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @put
  @summary("Update care-site (full replacement)")
  @doc("Replace all fields of an existing CareSite record.")
  update(
    @path
    @doc("Unique care-site identifier")
    care_site_id: int64,

    @body
    @doc("Complete care-site data")
    record: CareSiteCreate,
  ): {
    @statusCode statusCode: 200;
    @body body: CareSite;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @patch(#{implicitOptionality: true})
  @summary("Update care-site (partial)")
  @doc("Update specific fields of an existing CareSite record.")
  patch(
    @path
    @doc("Unique care-site identifier")
    care_site_id: int64,

    @body
    @doc("Fields to update")
    record: CareSiteUpdate,
  ): {
    @statusCode statusCode: 200;
    @body body: CareSite;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @delete
  @summary("Delete care-site")
  @doc("Delete a CareSite record.")
  delete(
    @path
    @doc("Unique care-site identifier")
    care_site_id: int64,
  ): {
    @statusCode statusCode: 204;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;
}
