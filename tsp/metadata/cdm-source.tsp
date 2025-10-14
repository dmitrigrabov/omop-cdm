import "@typespec/http";
import "@typespec/rest";
import "../common/models.tsp";

using TypeSpec.Http;
using TypeSpec.Rest;
using OmopCdm.Common;

namespace OmopCdm.Metadata;

/**
 * CdmSource Resource
 *
 * The CDM_SOURCE table contains detail about the source database and
the process used to transform the data into the OMOP Common Data
Model.
 *
 * **User Guide**: NA
 *
 * **ETL Conventions**: NA
 */

@doc("CdmSource record in the OMOP CDM")
@example(#{
  cdm_source_name: "Example value",
  cdm_source_abbreviation: "Example value",
  cdm_holder: "Example value",
  source_description: "Example value",
  source_documentation_reference: "Example value",
  cdm_etl_reference: "Example value",
  source_release_date: "2023-01-15",
  cdm_release_date: "2023-01-15",
  cdm_version: "Example value",
  cdm_version_concept_id: 8507,
  vocabulary_version: "Example value"
})
model CdmSource {
  @doc("The name of the CDM instance.")
  @maxLength(255)
  cdm_source_name: string;

  @doc("The abbreviation of the CDM instance.")
  @maxLength(25)
  cdm_source_abbreviation: string;

  @doc("The holder of the CDM instance.")
  @maxLength(255)
  cdm_holder: string;

  @doc("The description of the CDM instance.")
  source_description?: string;

  @doc("Refers to a publication or web resource describing the source data ETL Convention: e.g. a data dictionary.")
  @maxLength(255)
  source_documentation_reference?: string;

  @doc("Version of the ETL script used. e.g. link to the Git release")
  @maxLength(255)
  cdm_etl_reference?: string;

  @doc("The date the data was extracted from the source system. In some systems that is the same as the date the ETL was run. Typically the latest even date in the source is on the source_release_date.")
  source_release_date: DateOnly;

  @doc("The date the ETL script was completed. Typically this is after the source_release_date.")
  cdm_release_date: DateOnly;

  @doc("Version of the OMOP CDM used as string. e.g. v5.4")
  @maxLength(10)
  cdm_version?: string;

  @doc("The Concept Id representing the version of the CDM. ETL Convention: You can find all concepts that represent the CDM versions using the query: `SELECT * FROM CONCEPT WHERE VOCABULARY_ID = 'CDM' AND CONCEPT_CLASS = 'CDM'` References CONCEPT table.")
  cdm_version_concept_id: ConceptId;

  @doc("Version of the OMOP standardised vocabularies loaded ETL Convention: You can find the version of your Vocabulary using the query: `SELECT vocabulary_version from vocabulary where vocabulary_id = 'None'`")
  @maxLength(20)
  vocabulary_version: string;
}

/**
 * CdmSource creation request
 */
@doc("Request body for creating a new CdmSource record")
model CdmSourceCreate {
  @doc("The name of the CDM instance.")
  @maxLength(255)
  cdm_source_name: string;

  @doc("The abbreviation of the CDM instance.")
  @maxLength(25)
  cdm_source_abbreviation: string;

  @doc("The holder of the CDM instance.")
  @maxLength(255)
  cdm_holder: string;

  @doc("The description of the CDM instance.")
  source_description?: string;

  @doc("Refers to a publication or web resource describing the source data ETL Convention: e.g. a data dictionary.")
  @maxLength(255)
  source_documentation_reference?: string;

  @doc("Version of the ETL script used. e.g. link to the Git release")
  @maxLength(255)
  cdm_etl_reference?: string;

  @doc("The date the data was extracted from the source system. In some systems that is the same as the date the ETL was run. Typically the latest even date in the source is on the source_release_date.")
  source_release_date: DateOnly;

  @doc("The date the ETL script was completed. Typically this is after the source_release_date.")
  cdm_release_date: DateOnly;

  @doc("Version of the OMOP CDM used as string. e.g. v5.4")
  @maxLength(10)
  cdm_version?: string;

  @doc("The Concept Id representing the version of the CDM. ETL Convention: You can find all concepts that represent the CDM versions using the query: `SELECT * FROM CONCEPT WHERE VOCABULARY_ID = 'CDM' AND CONCEPT_CLASS = 'CDM'` References CONCEPT table.")
  cdm_version_concept_id: ConceptId;

  @doc("Version of the OMOP standardised vocabularies loaded ETL Convention: You can find the version of your Vocabulary using the query: `SELECT vocabulary_version from vocabulary where vocabulary_id = 'None'`")
  @maxLength(20)
  vocabulary_version: string;
}

/**
 * CdmSource update request
 */
@doc("Request body for updating an existing CdmSource record")
model CdmSourceUpdate {
  @doc("The name of the CDM instance.")
  cdm_source_name?: string;

  @doc("The abbreviation of the CDM instance.")
  cdm_source_abbreviation?: string;

  @doc("The holder of the CDM instance.")
  cdm_holder?: string;

  @doc("The description of the CDM instance.")
  source_description?: string;

  @doc("Refers to a publication or web resource describing the source data ETL Convention: e.g. a data dictionary.")
  source_documentation_reference?: string;

  @doc("Version of the ETL script used. e.g. link to the Git release")
  cdm_etl_reference?: string;

  @doc("The date the data was extracted from the source system. In some systems that is the same as the date the ETL was run. Typically the latest even date in the source is on the source_release_date.")
  source_release_date?: DateOnly;

  @doc("The date the ETL script was completed. Typically this is after the source_release_date.")
  cdm_release_date?: DateOnly;

  @doc("Version of the OMOP CDM used as string. e.g. v5.4")
  cdm_version?: string;

  @doc("The Concept Id representing the version of the CDM. ETL Convention: You can find all concepts that represent the CDM versions using the query: `SELECT * FROM CONCEPT WHERE VOCABULARY_ID = 'CDM' AND CONCEPT_CLASS = 'CDM'` References CONCEPT table.")
  cdm_version_concept_id?: ConceptId;

  @doc("Version of the OMOP standardised vocabularies loaded ETL Convention: You can find the version of your Vocabulary using the query: `SELECT vocabulary_version from vocabulary where vocabulary_id = 'None'`")
  vocabulary_version?: string;
}

/**
 * Query parameters for filtering cdm-source
 */
@doc("Filter parameters for CdmSource list operations")
model CdmSourceQueryParams {
  ...PaginationParams;

  @doc("Filter by cdm version concept id")
  @query
  cdm_version_concept_id?: ConceptId;

  @doc("Sort field")
  @query
  sort_by?: "cdm_source_id";

  @doc("Sort order")
  @query
  sort_order?: SortOrder;
}

/**
 * CdmSource API operations
 */
@route("/cdm-sources")
@tag("Metadata - CdmSources")
interface CdmSources {
  @get
  @summary("List all cdm-sources")
  @doc("Returns a paginated list of CdmSource records.")
  list(
    ...CdmSourceQueryParams,
  ): {
    @statusCode statusCode: 200;
    @body body: PaginatedList<CdmSource>;
  } | ErrorResponse;

  @get
  @summary("Get cdm-source by ID")
  @doc("Retrieve a single CdmSource record by its unique identifier.")
  read(
    @path
    @doc("Unique cdm-source identifier")
    cdm_source_id: int64,
  ): {
    @statusCode statusCode: 200;
    @body body: CdmSource;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @post
  @summary("Create a new cdm-source")
  @doc("Create a new CdmSource record.")
  create(
    @body
    @doc("CdmSource data to create")
    record: CdmSourceCreate,
  ): {
    @statusCode statusCode: 201;
    @body body: CdmSource;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @put
  @summary("Update cdm-source (full replacement)")
  @doc("Replace all fields of an existing CdmSource record.")
  update(
    @path
    @doc("Unique cdm-source identifier")
    cdm_source_id: int64,

    @body
    @doc("Complete cdm-source data")
    record: CdmSourceCreate,
  ): {
    @statusCode statusCode: 200;
    @body body: CdmSource;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @patch(#{implicitOptionality: true})
  @summary("Update cdm-source (partial)")
  @doc("Update specific fields of an existing CdmSource record.")
  patch(
    @path
    @doc("Unique cdm-source identifier")
    cdm_source_id: int64,

    @body
    @doc("Fields to update")
    record: CdmSourceUpdate,
  ): {
    @statusCode statusCode: 200;
    @body body: CdmSource;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @delete
  @summary("Delete cdm-source")
  @doc("Delete a CdmSource record.")
  delete(
    @path
    @doc("Unique cdm-source identifier")
    cdm_source_id: int64,
  ): {
    @statusCode statusCode: 204;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;
}
