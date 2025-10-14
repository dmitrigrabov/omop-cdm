import "@typespec/http";
import "@typespec/rest";
import "../common/models.tsp";

using TypeSpec.Http;
using TypeSpec.Rest;
using OmopCdm.Common;

namespace OmopCdm.Clinical;

/**
 * Specimen Resource
 *
 * The specimen domain contains the records identifying biological
samples from a person.
 *
 * **User Guide**: NA
 *
 * **ETL Conventions**: Anatomic site is coded at the most specific level of granularity
possible, such that higher level classifications can be derived using
the Standardized Vocabularies.
 */

@doc("Specimen record in the OMOP CDM")
model Specimen {
  @doc("Unique identifier for each specimen.")
  @visibility("read")
  specimen_id: int64;

  @doc("The person from whom the specimen is collected.  References PERSON table.")
  person_id: int64;

  @doc("The standard CONCEPT_ID that the SPECIMEN_SOURCE_VALUE maps to in the specimen domain. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Specimen&standardConcept=Standard&page=1&pageSize=15&query=)  References CONCEPT table.")
  specimen_concept_id: ConceptId;

  @doc("Put the source of the specimen record, as in an EHR system. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?standardConcept=Standard&domain=Type+Concept&page=1&pageSize=15&query=). A more detailed explanation of each Type Concept can be found on the [vocabulary wiki](https://github.com/OHDSI/Vocabulary-v5.0/wiki/Vocab.-TYPE_CONCEPT).  References CONCEPT table.")
  specimen_type_concept_id: ConceptId;

  @doc("The date the specimen was collected.")
  specimen_date: DateOnly;

  @doc("")
  specimen_datetime?: DateTime;

  @doc("The amount of specimen collected from the person.")
  quantity?: float64;

  @doc("The unit for the quantity of the specimen. ETL Convention: Map the UNIT_SOURCE_VALUE to a Standard Concept in the Unit domain. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Unit&standardConcept=Standard&page=1&pageSize=15&query=). If the source unit is NULL (applicable to cases when there’s no numerical value or when it doesn’t require a unit), keep unit_concept_id NULL as well. If there’s no mapping of a source unit, populate unit_concept_id with 0. References CONCEPT table.")
  unit_concept_id?: ConceptId;

  @doc("This is the site on the body where the specimen is from. ETL Convention: Map the ANATOMIC_SITE_SOURCE_VALUE to a Standard Concept in the Spec Anatomic Site domain. This should be coded at the lowest level of granularity [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?standardConcept=Standard&domain=Spec+Anatomic+Site&conceptClass=Body+Structure&page=4&pageSize=15&query=) References CONCEPT table.")
  anatomic_site_concept_id?: ConceptId;

  @doc("References CONCEPT table.")
  disease_status_concept_id?: ConceptId;

  @doc("This is the identifier for the specimen from the source system.")
  @maxLength(50)
  specimen_source_id?: string;

  @doc("")
  @maxLength(50)
  specimen_source_value?: string;

  @doc("This unit for the quantity of the specimen, as represented in the source.")
  @maxLength(50)
  unit_source_value?: string;

  @doc("This is the site on the body where the specimen was taken from, as represented in the source.")
  @maxLength(50)
  anatomic_site_source_value?: string;

  @doc("")
  @maxLength(50)
  disease_status_source_value?: string;
}

/**
 * Specimen creation request
 */
@doc("Request body for creating a new Specimen record")
model SpecimenCreate {
  @doc("The person from whom the specimen is collected.  References PERSON table.")
  person_id: int64;

  @doc("The standard CONCEPT_ID that the SPECIMEN_SOURCE_VALUE maps to in the specimen domain. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Specimen&standardConcept=Standard&page=1&pageSize=15&query=)  References CONCEPT table.")
  specimen_concept_id: ConceptId;

  @doc("Put the source of the specimen record, as in an EHR system. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?standardConcept=Standard&domain=Type+Concept&page=1&pageSize=15&query=). A more detailed explanation of each Type Concept can be found on the [vocabulary wiki](https://github.com/OHDSI/Vocabulary-v5.0/wiki/Vocab.-TYPE_CONCEPT).  References CONCEPT table.")
  specimen_type_concept_id: ConceptId;

  @doc("The date the specimen was collected.")
  specimen_date: DateOnly;

  @doc("")
  specimen_datetime?: DateTime;

  @doc("The amount of specimen collected from the person.")
  quantity?: float64;

  @doc("The unit for the quantity of the specimen. ETL Convention: Map the UNIT_SOURCE_VALUE to a Standard Concept in the Unit domain. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Unit&standardConcept=Standard&page=1&pageSize=15&query=). If the source unit is NULL (applicable to cases when there’s no numerical value or when it doesn’t require a unit), keep unit_concept_id NULL as well. If there’s no mapping of a source unit, populate unit_concept_id with 0. References CONCEPT table.")
  unit_concept_id?: ConceptId;

  @doc("This is the site on the body where the specimen is from. ETL Convention: Map the ANATOMIC_SITE_SOURCE_VALUE to a Standard Concept in the Spec Anatomic Site domain. This should be coded at the lowest level of granularity [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?standardConcept=Standard&domain=Spec+Anatomic+Site&conceptClass=Body+Structure&page=4&pageSize=15&query=) References CONCEPT table.")
  anatomic_site_concept_id?: ConceptId;

  @doc("References CONCEPT table.")
  disease_status_concept_id?: ConceptId;

  @doc("This is the identifier for the specimen from the source system.")
  @maxLength(50)
  specimen_source_id?: string;

  @doc("")
  @maxLength(50)
  specimen_source_value?: string;

  @doc("This unit for the quantity of the specimen, as represented in the source.")
  @maxLength(50)
  unit_source_value?: string;

  @doc("This is the site on the body where the specimen was taken from, as represented in the source.")
  @maxLength(50)
  anatomic_site_source_value?: string;

  @doc("")
  @maxLength(50)
  disease_status_source_value?: string;
}

/**
 * Specimen update request
 */
@doc("Request body for updating an existing Specimen record")
model SpecimenUpdate {
  @doc("The person from whom the specimen is collected.  References PERSON table.")
  person_id?: int64;

  @doc("The standard CONCEPT_ID that the SPECIMEN_SOURCE_VALUE maps to in the specimen domain. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Specimen&standardConcept=Standard&page=1&pageSize=15&query=)  References CONCEPT table.")
  specimen_concept_id?: ConceptId;

  @doc("Put the source of the specimen record, as in an EHR system. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?standardConcept=Standard&domain=Type+Concept&page=1&pageSize=15&query=). A more detailed explanation of each Type Concept can be found on the [vocabulary wiki](https://github.com/OHDSI/Vocabulary-v5.0/wiki/Vocab.-TYPE_CONCEPT).  References CONCEPT table.")
  specimen_type_concept_id?: ConceptId;

  @doc("The date the specimen was collected.")
  specimen_date?: DateOnly;

  @doc("")
  specimen_datetime?: DateTime;

  @doc("The amount of specimen collected from the person.")
  quantity?: float64;

  @doc("The unit for the quantity of the specimen. ETL Convention: Map the UNIT_SOURCE_VALUE to a Standard Concept in the Unit domain. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Unit&standardConcept=Standard&page=1&pageSize=15&query=). If the source unit is NULL (applicable to cases when there’s no numerical value or when it doesn’t require a unit), keep unit_concept_id NULL as well. If there’s no mapping of a source unit, populate unit_concept_id with 0. References CONCEPT table.")
  unit_concept_id?: ConceptId;

  @doc("This is the site on the body where the specimen is from. ETL Convention: Map the ANATOMIC_SITE_SOURCE_VALUE to a Standard Concept in the Spec Anatomic Site domain. This should be coded at the lowest level of granularity [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?standardConcept=Standard&domain=Spec+Anatomic+Site&conceptClass=Body+Structure&page=4&pageSize=15&query=) References CONCEPT table.")
  anatomic_site_concept_id?: ConceptId;

  @doc("References CONCEPT table.")
  disease_status_concept_id?: ConceptId;

  @doc("This is the identifier for the specimen from the source system.")
  specimen_source_id?: string;

  @doc("")
  specimen_source_value?: string;

  @doc("This unit for the quantity of the specimen, as represented in the source.")
  unit_source_value?: string;

  @doc("This is the site on the body where the specimen was taken from, as represented in the source.")
  anatomic_site_source_value?: string;

  @doc("")
  disease_status_source_value?: string;
}

/**
 * Query parameters for filtering specimen
 */
@doc("Filter parameters for Specimen list operations")
model SpecimenQueryParams {
  ...PaginationParams;

  @doc("Filter by person id")
  @query
  person_id?: int64;

  @doc("Filter by specimen concept id")
  @query
  specimen_concept_id?: ConceptId;

  @doc("Filter by specimen type concept id")
  @query
  specimen_type_concept_id?: ConceptId;

  @doc("Filter by unit concept id")
  @query
  unit_concept_id?: ConceptId;

  @doc("Filter by anatomic site concept id")
  @query
  anatomic_site_concept_id?: ConceptId;

  @doc("Filter by disease status concept id")
  @query
  disease_status_concept_id?: ConceptId;

  @doc("Sort field")
  @query
  sort_by?: "specimen_id";

  @doc("Sort order")
  @query
  sort_order?: SortOrder;
}

/**
 * Specimen API operations
 */
@route("/specimens")
@tag("Clinical - Specimens")
interface Specimens {
  @get
  @summary("List all specimens")
  @doc("Returns a paginated list of Specimen records.")
  list(
    ...SpecimenQueryParams,
  ): {
    @statusCode statusCode: 200;
    @body body: PaginatedList<Specimen>;
  } | ErrorResponse;

  @get
  @summary("Get specimen by ID")
  @doc("Retrieve a single Specimen record by its unique identifier.")
  read(
    @path
    @doc("Unique specimen identifier")
    specimen_id: int64,
  ): {
    @statusCode statusCode: 200;
    @body body: Specimen;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @post
  @summary("Create a new specimen")
  @doc("Create a new Specimen record.")
  create(
    @body
    @doc("Specimen data to create")
    record: SpecimenCreate,
  ): {
    @statusCode statusCode: 201;
    @body body: Specimen;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @put
  @summary("Update specimen (full replacement)")
  @doc("Replace all fields of an existing Specimen record.")
  update(
    @path
    @doc("Unique specimen identifier")
    specimen_id: int64,

    @body
    @doc("Complete specimen data")
    record: SpecimenCreate,
  ): {
    @statusCode statusCode: 200;
    @body body: Specimen;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @patch
  @summary("Update specimen (partial)")
  @doc("Update specific fields of an existing Specimen record.")
  patch(
    @path
    @doc("Unique specimen identifier")
    specimen_id: int64,

    @body
    @doc("Fields to update")
    record: SpecimenUpdate,
  ): {
    @statusCode statusCode: 200;
    @body body: Specimen;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @delete
  @summary("Delete specimen")
  @doc("Delete a Specimen record.")
  delete(
    @path
    @doc("Unique specimen identifier")
    specimen_id: int64,
  ): {
    @statusCode statusCode: 204;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;
}
