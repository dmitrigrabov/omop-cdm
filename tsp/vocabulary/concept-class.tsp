import "@typespec/http";
import "@typespec/rest";
import "../common/models.tsp";

using TypeSpec.Http;
using TypeSpec.Rest;
using OmopCdm.Common;

namespace OmopCdm.Vocabulary;

/**
 * ConceptClass Resource
 *
 * The CONCEPT_CLASS table includes semantic categories that reference
the source structure of each Vocabulary. Concept Classes represent
so-called horizontal (e.g. MedDRA, RxNorm) or vertical levels
(e.g. SNOMED) of the vocabulary structure. Vocabularies without any
Concept Classes, such as HCPCS, use the vocabulary_id as the Concept
Class. This reference table is populated with a single record for each
Concept Class, which includes a Concept Class ID and a fully specified
Concept Class name.
 *
 * **User Guide**: Users can utilize the CONCEPT_CLASS table to explore the different
classes or categories of concepts within the OHDSI vocabularies.
 *
 * **ETL Conventions**: NA
 */

@doc("ConceptClass record in the OMOP CDM")
model ConceptClass {
  @doc("A unique key for each class.")
  @visibility("read")
  @maxLength(20)
  concept_class_id: string;

  @doc("The name describing the Concept Class, e.g. Clinical Finding, Ingredient, etc.")
  @maxLength(255)
  concept_class_name: string;

  @doc("A Concept that represents the Concept Class.  References CONCEPT table.")
  concept_class_concept_id: ConceptId;
}

/**
 * ConceptClass creation request
 */
@doc("Request body for creating a new ConceptClass record")
model ConceptClassCreate {
  @doc("The name describing the Concept Class, e.g. Clinical Finding, Ingredient, etc.")
  @maxLength(255)
  concept_class_name: string;

  @doc("A Concept that represents the Concept Class.  References CONCEPT table.")
  concept_class_concept_id: ConceptId;
}

/**
 * ConceptClass update request
 */
@doc("Request body for updating an existing ConceptClass record")
model ConceptClassUpdate {
  @doc("The name describing the Concept Class, e.g. Clinical Finding, Ingredient, etc.")
  concept_class_name?: string;

  @doc("A Concept that represents the Concept Class.  References CONCEPT table.")
  concept_class_concept_id?: ConceptId;
}

/**
 * Query parameters for filtering concept-class
 */
@doc("Filter parameters for ConceptClass list operations")
model ConceptClassQueryParams {
  ...PaginationParams;

  @doc("Filter by concept class concept id")
  @query
  concept_class_concept_id?: ConceptId;

  @doc("Sort field")
  @query
  sort_by?: "concept_class_id";

  @doc("Sort order")
  @query
  sort_order?: SortOrder;
}

/**
 * ConceptClass API operations
 */
@route("/concept-classs")
@tag("Vocabulary - ConceptClasss")
interface ConceptClasss {
  @get
  @summary("List all concept-classs")
  @doc("Returns a paginated list of ConceptClass records.")
  list(
    ...ConceptClassQueryParams,
  ): {
    @statusCode statusCode: 200;
    @body body: PaginatedList<ConceptClass>;
  } | ErrorResponse;

  @get
  @summary("Get concept-class by ID")
  @doc("Retrieve a single ConceptClass record by its unique identifier.")
  read(
    @path
    @doc("Unique concept-class identifier")
    concept_class_id: string,
  ): {
    @statusCode statusCode: 200;
    @body body: ConceptClass;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @post
  @summary("Create a new concept-class")
  @doc("Create a new ConceptClass record.")
  create(
    @body
    @doc("ConceptClass data to create")
    record: ConceptClassCreate,
  ): {
    @statusCode statusCode: 201;
    @body body: ConceptClass;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @put
  @summary("Update concept-class (full replacement)")
  @doc("Replace all fields of an existing ConceptClass record.")
  update(
    @path
    @doc("Unique concept-class identifier")
    concept_class_id: string,

    @body
    @doc("Complete concept-class data")
    record: ConceptClassCreate,
  ): {
    @statusCode statusCode: 200;
    @body body: ConceptClass;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @patch
  @summary("Update concept-class (partial)")
  @doc("Update specific fields of an existing ConceptClass record.")
  patch(
    @path
    @doc("Unique concept-class identifier")
    concept_class_id: string,

    @body
    @doc("Fields to update")
    record: ConceptClassUpdate,
  ): {
    @statusCode statusCode: 200;
    @body body: ConceptClass;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @delete
  @summary("Delete concept-class")
  @doc("Delete a ConceptClass record.")
  delete(
    @path
    @doc("Unique concept-class identifier")
    concept_class_id: string,
  ): {
    @statusCode statusCode: 204;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;
}
