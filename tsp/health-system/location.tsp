import "@typespec/http";
import "@typespec/rest";
import "../common/models.tsp";

using TypeSpec.Http;
using TypeSpec.Rest;
using OmopCdm.Common;

namespace OmopCdm.Healthsystem;

/**
 * Location Resource
 *
 * The LOCATION table represents a generic way to capture physical
location or address information of Persons and Care Sites.
 *
 * **User Guide**: The current iteration of the LOCATION table is US centric. Until a
major release to correct this, certain fields can be used to represent
different international values.   
  
 - STATE can also be used for
province or district  
- ZIP is also the postal code or postcode   
-
COUNTY can also be used to represent region
 *
 * **ETL Conventions**: Each address or Location is unique and is present only once in the
table. Locations do not contain names, such as the name of a hospital.
In order to construct a full address that can be used in the postal
service, the address information from the Location needs to be combined
with information from the Care Site.
 */

@doc("Location record in the OMOP CDM")
model Location {
  @doc("The unique key given to a unique Location. ETL Convention: Each instance of a Location in the source data should be assigned this unique key.")
  @visibility("read")
  location_id: int64;

  @doc("")
  @maxLength(50)
  city?: string;

  @doc("")
  @maxLength(2)
  state?: string;

  @doc("Zip codes are handled as strings of up to 9 characters length. For US addresses, these represent either a 3-digit abbreviated Zip code as provided by many sources for patient protection reasons, the full 5-digit Zip or the 9-digit (ZIP + 4) codes. Unless for specific reasons analytical methods should expect and utilize only the first 3 digits. For international addresses, different rules apply.")
  @maxLength(9)
  zip?: string;

  @doc("")
  @maxLength(20)
  county?: string;

  @doc("Put the verbatim value for the location here, as it shows up in the source.")
  @maxLength(50)
  location_source_value?: string;

  @doc("The Concept Id representing the country. Values should conform to the [Geography](https://athena.ohdsi.org/search-terms/terms?domain=Geography&standardConcept=Standard&page=1&pageSize=15&query=&boosts) domain.  References CONCEPT table.")
  country_concept_id?: ConceptId;

  @doc("The name of the country.")
  @maxLength(80)
  country_source_value?: string;

  @doc("Must be between -90 and 90.")
  latitude?: float64;

  @doc("Must be between -180 and 180.")
  longitude?: float64;
}

/**
 * Location creation request
 */
@doc("Request body for creating a new Location record")
model LocationCreate {
  @doc("")
  @maxLength(50)
  city?: string;

  @doc("")
  @maxLength(2)
  state?: string;

  @doc("Zip codes are handled as strings of up to 9 characters length. For US addresses, these represent either a 3-digit abbreviated Zip code as provided by many sources for patient protection reasons, the full 5-digit Zip or the 9-digit (ZIP + 4) codes. Unless for specific reasons analytical methods should expect and utilize only the first 3 digits. For international addresses, different rules apply.")
  @maxLength(9)
  zip?: string;

  @doc("")
  @maxLength(20)
  county?: string;

  @doc("Put the verbatim value for the location here, as it shows up in the source.")
  @maxLength(50)
  location_source_value?: string;

  @doc("The Concept Id representing the country. Values should conform to the [Geography](https://athena.ohdsi.org/search-terms/terms?domain=Geography&standardConcept=Standard&page=1&pageSize=15&query=&boosts) domain.  References CONCEPT table.")
  country_concept_id?: ConceptId;

  @doc("The name of the country.")
  @maxLength(80)
  country_source_value?: string;

  @doc("Must be between -90 and 90.")
  latitude?: float64;

  @doc("Must be between -180 and 180.")
  longitude?: float64;
}

/**
 * Location update request
 */
@doc("Request body for updating an existing Location record")
model LocationUpdate {
  @doc("")
  city?: string;

  @doc("")
  state?: string;

  @doc("Zip codes are handled as strings of up to 9 characters length. For US addresses, these represent either a 3-digit abbreviated Zip code as provided by many sources for patient protection reasons, the full 5-digit Zip or the 9-digit (ZIP + 4) codes. Unless for specific reasons analytical methods should expect and utilize only the first 3 digits. For international addresses, different rules apply.")
  zip?: string;

  @doc("")
  county?: string;

  @doc("Put the verbatim value for the location here, as it shows up in the source.")
  location_source_value?: string;

  @doc("The Concept Id representing the country. Values should conform to the [Geography](https://athena.ohdsi.org/search-terms/terms?domain=Geography&standardConcept=Standard&page=1&pageSize=15&query=&boosts) domain.  References CONCEPT table.")
  country_concept_id?: ConceptId;

  @doc("The name of the country.")
  country_source_value?: string;

  @doc("Must be between -90 and 90.")
  latitude?: float64;

  @doc("Must be between -180 and 180.")
  longitude?: float64;
}

/**
 * Query parameters for filtering location
 */
@doc("Filter parameters for Location list operations")
model LocationQueryParams {
  ...PaginationParams;

  @doc("Filter by country concept id")
  @query
  country_concept_id?: ConceptId;

  @doc("Sort field")
  @query
  sort_by?: "location_id";

  @doc("Sort order")
  @query
  sort_order?: SortOrder;
}

/**
 * Location API operations
 */
@route("/locations")
@tag("Health System - Locations")
interface Locations {
  @get
  @summary("List all locations")
  @doc("Returns a paginated list of Location records.")
  list(
    ...LocationQueryParams,
  ): {
    @statusCode statusCode: 200;
    @body body: PaginatedList<Location>;
  } | ErrorResponse;

  @get
  @summary("Get location by ID")
  @doc("Retrieve a single Location record by its unique identifier.")
  read(
    @path
    @doc("Unique location identifier")
    location_id: int64,
  ): {
    @statusCode statusCode: 200;
    @body body: Location;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @post
  @summary("Create a new location")
  @doc("Create a new Location record.")
  create(
    @body
    @doc("Location data to create")
    record: LocationCreate,
  ): {
    @statusCode statusCode: 201;
    @body body: Location;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @put
  @summary("Update location (full replacement)")
  @doc("Replace all fields of an existing Location record.")
  update(
    @path
    @doc("Unique location identifier")
    location_id: int64,

    @body
    @doc("Complete location data")
    record: LocationCreate,
  ): {
    @statusCode statusCode: 200;
    @body body: Location;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @patch
  @summary("Update location (partial)")
  @doc("Update specific fields of an existing Location record.")
  patch(
    @path
    @doc("Unique location identifier")
    location_id: int64,

    @body
    @doc("Fields to update")
    record: LocationUpdate,
  ): {
    @statusCode statusCode: 200;
    @body body: Location;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @delete
  @summary("Delete location")
  @doc("Delete a Location record.")
  delete(
    @path
    @doc("Unique location identifier")
    location_id: int64,
  ): {
    @statusCode statusCode: 204;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;
}
