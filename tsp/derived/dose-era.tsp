import "@typespec/http";
import "@typespec/rest";
import "../common/models.tsp";

using TypeSpec.Http;
using TypeSpec.Rest;
using OmopCdm.Common;

namespace OmopCdm.Derived;

/**
 * DoseEra Resource
 *
 * A Dose Era is defined as a span of time when the Person is assumed to
be exposed to a constant dose of a specific active ingredient.
 *
 * **User Guide**: NA
 *
 * **ETL Conventions**: Dose Eras will be derived from records in the DRUG_EXPOSURE table and
the Dose information from the DRUG_STRENGTH table using a standardized
algorithm. Dose Form information is not taken into account. So, if the
patient changes between different formulations, or different
manufacturers with the same formulation, the Dose Era is still spanning
the entire time of exposure to the Ingredient.
 */

@doc("DoseEra record in the OMOP CDM")
model DoseEra {
  @doc("")
  dose_era_id: int64;

  @doc("References PERSON table.")
  person_id: int64;

  @doc("The Concept Id representing the specific drug ingredient.  References CONCEPT table.")
  drug_concept_id: ConceptId;

  @doc("The Concept Id representing the unit of the specific drug ingredient.  References CONCEPT table.")
  unit_concept_id: ConceptId;

  @doc("The numeric value of the dosage of the drug_ingredient.")
  dose_value: float64;

  @doc("The date the Person started on the specific dosage, with at least 31 days since any prior exposure.")
  dose_era_start_date: DateOnly;

  @doc("The date the Person was no longer exposed to the dosage of the specific drug ingredient. An era is ended if there are 31 days or more between dosage records.")
  dose_era_end_date: DateOnly;
}

/**
 * DoseEra creation request
 */
@doc("Request body for creating a new DoseEra record")
model DoseEraCreate {
  @doc("References PERSON table.")
  person_id: int64;

  @doc("The Concept Id representing the specific drug ingredient.  References CONCEPT table.")
  drug_concept_id: ConceptId;

  @doc("The Concept Id representing the unit of the specific drug ingredient.  References CONCEPT table.")
  unit_concept_id: ConceptId;

  @doc("The numeric value of the dosage of the drug_ingredient.")
  dose_value: float64;

  @doc("The date the Person started on the specific dosage, with at least 31 days since any prior exposure.")
  dose_era_start_date: DateOnly;

  @doc("The date the Person was no longer exposed to the dosage of the specific drug ingredient. An era is ended if there are 31 days or more between dosage records.")
  dose_era_end_date: DateOnly;
}

/**
 * DoseEra update request
 */
@doc("Request body for updating an existing DoseEra record")
model DoseEraUpdate {
  @doc("References PERSON table.")
  person_id?: int64;

  @doc("The Concept Id representing the specific drug ingredient.  References CONCEPT table.")
  drug_concept_id?: ConceptId;

  @doc("The Concept Id representing the unit of the specific drug ingredient.  References CONCEPT table.")
  unit_concept_id?: ConceptId;

  @doc("The numeric value of the dosage of the drug_ingredient.")
  dose_value?: float64;

  @doc("The date the Person started on the specific dosage, with at least 31 days since any prior exposure.")
  dose_era_start_date?: DateOnly;

  @doc("The date the Person was no longer exposed to the dosage of the specific drug ingredient. An era is ended if there are 31 days or more between dosage records.")
  dose_era_end_date?: DateOnly;
}

/**
 * Query parameters for filtering dose-era
 */
@doc("Filter parameters for DoseEra list operations")
model DoseEraQueryParams {
  ...PaginationParams;

  @doc("Filter by person id")
  @query
  person_id?: int64;

  @doc("Filter by drug concept id")
  @query
  drug_concept_id?: ConceptId;

  @doc("Filter by unit concept id")
  @query
  unit_concept_id?: ConceptId;

  @doc("Sort field")
  @query
  sort_by?: "dose_era_id";

  @doc("Sort order")
  @query
  sort_order?: SortOrder;
}

/**
 * DoseEra API operations
 */
@route("/dose-eras")
@tag("Derived - DoseEras")
interface DoseEras {
  @get
  @summary("List all dose-eras")
  @doc("Returns a paginated list of DoseEra records.")
  list(
    ...DoseEraQueryParams,
  ): {
    @statusCode statusCode: 200;
    @body body: PaginatedList<DoseEra>;
  } | ErrorResponse;

  @get
  @summary("Get dose-era by ID")
  @doc("Retrieve a single DoseEra record by its unique identifier.")
  read(
    @path
    @doc("Unique dose-era identifier")
    dose_era_id: int64,
  ): {
    @statusCode statusCode: 200;
    @body body: DoseEra;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @post
  @summary("Create a new dose-era")
  @doc("Create a new DoseEra record.")
  create(
    @body
    @doc("DoseEra data to create")
    record: DoseEraCreate,
  ): {
    @statusCode statusCode: 201;
    @body body: DoseEra;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @put
  @summary("Update dose-era (full replacement)")
  @doc("Replace all fields of an existing DoseEra record.")
  update(
    @path
    @doc("Unique dose-era identifier")
    dose_era_id: int64,

    @body
    @doc("Complete dose-era data")
    record: DoseEraCreate,
  ): {
    @statusCode statusCode: 200;
    @body body: DoseEra;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @patch(#{implicitOptionality: true})
  @summary("Update dose-era (partial)")
  @doc("Update specific fields of an existing DoseEra record.")
  patch(
    @path
    @doc("Unique dose-era identifier")
    dose_era_id: int64,

    @body
    @doc("Fields to update")
    record: DoseEraUpdate,
  ): {
    @statusCode statusCode: 200;
    @body body: DoseEra;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @delete
  @summary("Delete dose-era")
  @doc("Delete a DoseEra record.")
  delete(
    @path
    @doc("Unique dose-era identifier")
    dose_era_id: int64,
  ): {
    @statusCode statusCode: 204;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;
}
