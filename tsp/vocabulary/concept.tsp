import "@typespec/http";
import "@typespec/rest";
import "../common/models.tsp";

using TypeSpec.Http;
using TypeSpec.Rest;
using OmopCdm.Common;

namespace OmopCdm.Vocabulary;

/**
 * Concept Resource
 *
 * The Standardized Vocabularies contains records, or Concepts, that
uniquely identify each fundamental unit of meaning used to express
clinical information in all domain tables of the CDM. Concepts are
derived from vocabularies, which represent clinical information across a
domain (e.g. conditions, drugs, procedures) through the use of codes and
associated descriptions. Some Concepts are designated Standard Concepts,
meaning these Concepts can be used as normative expressions of a
clinical entity within the OMOP Common Data Model and standardized
analytics. Each Standard Concept belongs to one Domain, which defines
the location where the Concept would be expected to occur within the
data tables of the CDM. Concepts can represent broad categories
(‘Cardiovascular disease’), detailed clinical elements (‘Myocardial
infarction of the anterolateral wall’), or modifying characteristics and
attributes that define Concepts at various levels of detail (severity of
a disease, associated morphology, etc.). Records in the Standardized
Vocabularies tables are derived from national or international
vocabularies such as SNOMED-CT, RxNorm, and LOINC, or custom OMOP
Concepts defined to cover various aspects of observational data
analysis.
 *
 * **User Guide**: The primary purpose of the CONCEPT table is to provide a standardized
representation of medical Concepts, allowing for consistent querying and
analysis across the healthcare databases. Users can join the CONCEPT
table with other tables in the CDM to enrich clinical data with
standardized Concept information or use the CONCEPT table as a reference
for mapping clinical data from source terminologies to Standard
Concepts.
 *
 * **ETL Conventions**: NA
 */

@doc("Concept record in the OMOP CDM")
@example(#{
  id: 12345,
  concept_name: "Example value",
  domain_id: "Example value",
  vocabulary_id: "Example value",
  concept_class_id: "Example value",
  standard_concept: "Example value",
  concept_code: "Example value",
  valid_start_date: "2023-01-15",
  valid_end_date: "2023-01-15",
  invalid_reason: "Example value"
})
model Concept {
  @doc("A unique identifier for each Concept across all domains.")
  id: ConceptId;

  @doc("An unambiguous, meaningful and descriptive name for the Concept.")
  @maxLength(255)
  concept_name: string;

  @doc("A foreign key to the [DOMAIN](https://ohdsi.github.io/CommonDataModel/cdm54.html#domain) table the Concept belongs to. References DOMAIN table.")
  @maxLength(20)
  domain_id: string;

  @doc("A foreign key to the [VOCABULARY](https://ohdsi.github.io/CommonDataModel/cdm54.html#vocabulary) table indicating from which source the Concept has been adapted. References VOCABULARY table.")
  @maxLength(20)
  vocabulary_id: string;

  @doc("The attribute or concept class of the Concept. Examples are ‘Clinical Drug’, ‘Ingredient’, ‘Clinical Finding’ etc. References CONCEPT_CLASS table.")
  @maxLength(20)
  concept_class_id: string;

  @doc("This flag determines where a Concept is a Standard Concept, i.e. is used in the data, a Classification Concept, or a non-standard Source Concept. The allowable values are ‘S’ (Standard Concept) and ‘C’ (Classification Concept), otherwise the content is NULL.")
  @maxLength(1)
  standard_concept?: string;

  @doc("The concept code represents the identifier of the Concept in the source vocabulary, such as SNOMED-CT concept IDs, RxNorm RXCUIs etc. Note that concept codes are not unique across vocabularies.")
  @maxLength(50)
  concept_code: string;

  @doc("The date when the Concept was first recorded. The default value is 1-Jan-1970, meaning, the Concept has no (known) date of inception.")
  valid_start_date: DateOnly;

  @doc("The date when the Concept became invalid because it was deleted or superseded (updated) by a new concept. The default value is 31-Dec-2099, meaning, the Concept is valid until it becomes deprecated.")
  valid_end_date: DateOnly;

  @doc("Reason the Concept was invalidated. Possible values are D (deleted), U (replaced with an update) or NULL when valid_end_date has the default value.")
  @maxLength(1)
  invalid_reason?: string;
}

/**
 * Concept creation request
 */
@doc("Request body for creating a new Concept record")
model ConceptCreate {
  @doc("An unambiguous, meaningful and descriptive name for the Concept.")
  @maxLength(255)
  concept_name: string;

  @doc("A foreign key to the [DOMAIN](https://ohdsi.github.io/CommonDataModel/cdm54.html#domain) table the Concept belongs to. References DOMAIN table.")
  @maxLength(20)
  domain_id: string;

  @doc("A foreign key to the [VOCABULARY](https://ohdsi.github.io/CommonDataModel/cdm54.html#vocabulary) table indicating from which source the Concept has been adapted. References VOCABULARY table.")
  @maxLength(20)
  vocabulary_id: string;

  @doc("The attribute or concept class of the Concept. Examples are ‘Clinical Drug’, ‘Ingredient’, ‘Clinical Finding’ etc. References CONCEPT_CLASS table.")
  @maxLength(20)
  concept_class_id: string;

  @doc("This flag determines where a Concept is a Standard Concept, i.e. is used in the data, a Classification Concept, or a non-standard Source Concept. The allowable values are ‘S’ (Standard Concept) and ‘C’ (Classification Concept), otherwise the content is NULL.")
  @maxLength(1)
  standard_concept?: string;

  @doc("The concept code represents the identifier of the Concept in the source vocabulary, such as SNOMED-CT concept IDs, RxNorm RXCUIs etc. Note that concept codes are not unique across vocabularies.")
  @maxLength(50)
  concept_code: string;

  @doc("The date when the Concept was first recorded. The default value is 1-Jan-1970, meaning, the Concept has no (known) date of inception.")
  valid_start_date: DateOnly;

  @doc("The date when the Concept became invalid because it was deleted or superseded (updated) by a new concept. The default value is 31-Dec-2099, meaning, the Concept is valid until it becomes deprecated.")
  valid_end_date: DateOnly;

  @doc("Reason the Concept was invalidated. Possible values are D (deleted), U (replaced with an update) or NULL when valid_end_date has the default value.")
  @maxLength(1)
  invalid_reason?: string;
}

/**
 * Concept update request
 */
@doc("Request body for updating an existing Concept record")
model ConceptUpdate {
  @doc("An unambiguous, meaningful and descriptive name for the Concept.")
  concept_name?: string;

  @doc("A foreign key to the [DOMAIN](https://ohdsi.github.io/CommonDataModel/cdm54.html#domain) table the Concept belongs to. References DOMAIN table.")
  domain_id?: string;

  @doc("A foreign key to the [VOCABULARY](https://ohdsi.github.io/CommonDataModel/cdm54.html#vocabulary) table indicating from which source the Concept has been adapted. References VOCABULARY table.")
  vocabulary_id?: string;

  @doc("The attribute or concept class of the Concept. Examples are ‘Clinical Drug’, ‘Ingredient’, ‘Clinical Finding’ etc. References CONCEPT_CLASS table.")
  concept_class_id?: string;

  @doc("This flag determines where a Concept is a Standard Concept, i.e. is used in the data, a Classification Concept, or a non-standard Source Concept. The allowable values are ‘S’ (Standard Concept) and ‘C’ (Classification Concept), otherwise the content is NULL.")
  standard_concept?: string;

  @doc("The concept code represents the identifier of the Concept in the source vocabulary, such as SNOMED-CT concept IDs, RxNorm RXCUIs etc. Note that concept codes are not unique across vocabularies.")
  concept_code?: string;

  @doc("The date when the Concept was first recorded. The default value is 1-Jan-1970, meaning, the Concept has no (known) date of inception.")
  valid_start_date?: DateOnly;

  @doc("The date when the Concept became invalid because it was deleted or superseded (updated) by a new concept. The default value is 31-Dec-2099, meaning, the Concept is valid until it becomes deprecated.")
  valid_end_date?: DateOnly;

  @doc("Reason the Concept was invalidated. Possible values are D (deleted), U (replaced with an update) or NULL when valid_end_date has the default value.")
  invalid_reason?: string;
}

/**
 * Query parameters for filtering concept
 */
@doc("Filter parameters for Concept list operations")
model ConceptQueryParams {
  ...PaginationParams;

  @doc("Filter by domain id")
  @query
  domain_id?: string;

  @doc("Filter by vocabulary id")
  @query
  vocabulary_id?: string;

  @doc("Filter by concept class id")
  @query
  concept_class_id?: string;

  @doc("Sort field")
  @query
  sort_by?: "id";

  @doc("Sort order")
  @query
  sort_order?: SortOrder;
}

/**
 * Concept list response with example
 */
@doc("Paginated list of Concept records")
@example(#{
  data: #[#{
  id: 12345,
  concept_name: "Example value",
  domain_id: "Example value",
  vocabulary_id: "Example value",
  concept_class_id: "Example value",
  standard_concept: "Example value",
  concept_code: "Example value",
  valid_start_date: "2023-01-15",
  valid_end_date: "2023-01-15",
  invalid_reason: "Example value"
}],
  pagination: #{
    total: 1,
    offset: 0,
    limit: 100,
    count: 1
  }
})
model ConceptList {
  ...PaginatedList<Concept>;
}

/**
 * Concept API operations
 */
@route("/concepts")
@tag("Vocabulary - Concepts")
interface Concepts {
  @get
  @summary("List all concepts")
  @doc("Returns a paginated list of Concept records.")
  list(
    ...ConceptQueryParams,
  ): {
    @statusCode statusCode: 200;
    @body body: ConceptList;
  } | ErrorResponse;

  @get
  @summary("Get concept by ID")
  @doc("Retrieve a single Concept record by its unique identifier.")
  read(
    @path
    @doc("Unique concept identifier")
    id: string,
  ): {
    @statusCode statusCode: 200;
    @body body: Concept;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @post
  @summary("Create a new concept")
  @doc("Create a new Concept record.")
  create(
    @body
    @doc("Concept data to create")
    record: ConceptCreate,
  ): {
    @statusCode statusCode: 201;
    @body body: Concept;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @put
  @summary("Update concept (full replacement)")
  @doc("Replace all fields of an existing Concept record.")
  update(
    @path
    @doc("Unique concept identifier")
    id: string,

    @body
    @doc("Complete concept data")
    record: ConceptCreate,
  ): {
    @statusCode statusCode: 200;
    @body body: Concept;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @patch(#{implicitOptionality: true})
  @summary("Update concept (partial)")
  @doc("Update specific fields of an existing Concept record.")
  patch(
    @path
    @doc("Unique concept identifier")
    id: string,

    @body
    @doc("Fields to update")
    record: ConceptUpdate,
  ): {
    @statusCode statusCode: 200;
    @body body: Concept;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @delete
  @summary("Delete concept")
  @doc("Delete a Concept record.")
  delete(
    @path
    @doc("Unique concept identifier")
    id: string,
  ): {
    @statusCode statusCode: 204;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;
}
