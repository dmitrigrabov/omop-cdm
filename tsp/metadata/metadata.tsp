import "@typespec/http";
import "@typespec/rest";
import "../common/models.tsp";

using TypeSpec.Http;
using TypeSpec.Rest;
using OmopCdm.Common;

namespace OmopCdm.Metadata;

/**
 * Metadata Resource
 *
 * The METADATA table contains metadata information about a dataset that
has been transformed to the OMOP Common Data Model.
 *
 * **User Guide**: NA
 *
 * **ETL Conventions**: NA
 */

@doc("Metadata record in the OMOP CDM")
model Metadata {
  @doc("The unique key given to a Metadata record. ETL Convention: Attribute value is auto-generated")
  metadata_id: int64;

  @doc("References CONCEPT table.")
  metadata_concept_id: ConceptId;

  @doc("References CONCEPT table.")
  metadata_type_concept_id: ConceptId;

  @doc("")
  @maxLength(250)
  name: string;

  @doc("")
  @maxLength(250)
  value_as_string?: string;

  @doc("References CONCEPT table.")
  value_as_concept_id?: ConceptId;

  @doc("This is the numerical value of the result of the Metadata, if applicable and available. It is not expected that all Metadata will have numeric results, rather, this field is here to house values should they exist.")
  value_as_number?: float64;

  @doc("")
  metadata_date?: DateOnly;

  @doc("")
  metadata_datetime?: DateTime;
}

/**
 * Metadata creation request
 */
@doc("Request body for creating a new Metadata record")
model MetadataCreate {
  @doc("References CONCEPT table.")
  metadata_concept_id: ConceptId;

  @doc("References CONCEPT table.")
  metadata_type_concept_id: ConceptId;

  @doc("")
  @maxLength(250)
  name: string;

  @doc("")
  @maxLength(250)
  value_as_string?: string;

  @doc("References CONCEPT table.")
  value_as_concept_id?: ConceptId;

  @doc("This is the numerical value of the result of the Metadata, if applicable and available. It is not expected that all Metadata will have numeric results, rather, this field is here to house values should they exist.")
  value_as_number?: float64;

  @doc("")
  metadata_date?: DateOnly;

  @doc("")
  metadata_datetime?: DateTime;
}

/**
 * Metadata update request
 */
@doc("Request body for updating an existing Metadata record")
model MetadataUpdate {
  @doc("References CONCEPT table.")
  metadata_concept_id?: ConceptId;

  @doc("References CONCEPT table.")
  metadata_type_concept_id?: ConceptId;

  @doc("")
  name?: string;

  @doc("")
  value_as_string?: string;

  @doc("References CONCEPT table.")
  value_as_concept_id?: ConceptId;

  @doc("This is the numerical value of the result of the Metadata, if applicable and available. It is not expected that all Metadata will have numeric results, rather, this field is here to house values should they exist.")
  value_as_number?: float64;

  @doc("")
  metadata_date?: DateOnly;

  @doc("")
  metadata_datetime?: DateTime;
}

/**
 * Query parameters for filtering metadata
 */
@doc("Filter parameters for Metadata list operations")
model MetadataQueryParams {
  ...PaginationParams;

  @doc("Filter by metadata concept id")
  @query
  metadata_concept_id?: ConceptId;

  @doc("Filter by metadata type concept id")
  @query
  metadata_type_concept_id?: ConceptId;

  @doc("Filter by value as concept id")
  @query
  value_as_concept_id?: ConceptId;

  @doc("Sort field")
  @query
  sort_by?: "metadata_id";

  @doc("Sort order")
  @query
  sort_order?: SortOrder;
}

/**
 * Metadata API operations
 */
@route("/metadatas")
@tag("Metadata - Metadatas")
interface Metadatas {
  @get
  @summary("List all metadatas")
  @doc("Returns a paginated list of Metadata records.")
  list(
    ...MetadataQueryParams,
  ): {
    @statusCode statusCode: 200;
    @body body: PaginatedList<Metadata>;
  } | ErrorResponse;

  @get
  @summary("Get metadata by ID")
  @doc("Retrieve a single Metadata record by its unique identifier.")
  read(
    @path
    @doc("Unique metadata identifier")
    metadata_id: int64,
  ): {
    @statusCode statusCode: 200;
    @body body: Metadata;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @post
  @summary("Create a new metadata")
  @doc("Create a new Metadata record.")
  create(
    @body
    @doc("Metadata data to create")
    record: MetadataCreate,
  ): {
    @statusCode statusCode: 201;
    @body body: Metadata;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @put
  @summary("Update metadata (full replacement)")
  @doc("Replace all fields of an existing Metadata record.")
  update(
    @path
    @doc("Unique metadata identifier")
    metadata_id: int64,

    @body
    @doc("Complete metadata data")
    record: MetadataCreate,
  ): {
    @statusCode statusCode: 200;
    @body body: Metadata;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @patch(#{implicitOptionality: true})
  @summary("Update metadata (partial)")
  @doc("Update specific fields of an existing Metadata record.")
  patch(
    @path
    @doc("Unique metadata identifier")
    metadata_id: int64,

    @body
    @doc("Fields to update")
    record: MetadataUpdate,
  ): {
    @statusCode statusCode: 200;
    @body body: Metadata;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @delete
  @summary("Delete metadata")
  @doc("Delete a Metadata record.")
  delete(
    @path
    @doc("Unique metadata identifier")
    metadata_id: int64,
  ): {
    @statusCode statusCode: 204;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;
}
