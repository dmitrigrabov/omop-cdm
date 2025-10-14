import "@typespec/http";
import "@typespec/rest";
import "../common/models.tsp";

using TypeSpec.Http;
using TypeSpec.Rest;
using OmopCdm.Common;

namespace OmopCdm.Vocabulary;

/**
 * DrugStrength Resource
 *
 * The DRUG_STRENGTH table contains structured content about the amount
or concentration and associated units of a specific ingredient contained
within a particular drug product. This table is supplemental information
to support standardized analysis of drug utilization.
 *
 * **User Guide**: NA
 *
 * **ETL Conventions**: NA
 */

@doc("DrugStrength record in the OMOP CDM")
@example(#{
  drug_concept_id: 8507,
  ingredient_concept_id: 8507,
  amount_value: 98.6,
  amount_unit_concept_id: 8507,
  numerator_value: 98.6,
  numerator_unit_concept_id: 8507,
  denominator_value: 98.6,
  denominator_unit_concept_id: 8507,
  box_size: 100,
  valid_start_date: "2023-01-15",
  valid_end_date: "2023-01-15",
  invalid_reason: "Example value"
})
model DrugStrength {
  @doc("The Concept representing the Branded Drug or Clinical Drug Product. References CONCEPT table.")
  drug_concept_id: ConceptId;

  @doc("The Concept representing the active ingredient contained within the drug product. ETL Convention: Combination Drugs will have more than one record in this table, one for each active Ingredient. References CONCEPT table.")
  ingredient_concept_id: ConceptId;

  @doc("The numeric value or the amount of active ingredient contained within the drug product.")
  amount_value?: float64;

  @doc("The Concept representing the Unit of measure for the amount of active ingredient contained within the drug product. References CONCEPT table.")
  amount_unit_concept_id?: ConceptId;

  @doc("The concentration of the active ingredient contained within the drug product.")
  numerator_value?: float64;

  @doc("The Concept representing the Unit of measure for the concentration of active ingredient. References CONCEPT table.")
  numerator_unit_concept_id?: ConceptId;

  @doc("The amount of total liquid (or other divisible product, such as ointment, gel, spray, etc.).")
  denominator_value?: float64;

  @doc("The Concept representing the denominator unit for the concentration of active ingredient. References CONCEPT table.")
  denominator_unit_concept_id?: ConceptId;

  @doc("The number of units of Clinical Branded Drug or Quantified Clinical or Branded Drug contained in a box as dispensed to the patient.")
  box_size?: int64;

  @doc("The date when the Concept was first recorded. The default value is 1-Jan-1970.")
  valid_start_date: DateOnly;

  @doc("The date when then Concept became invalid.")
  valid_end_date: DateOnly;

  @doc("Reason the concept was invalidated. Possible values are D (deleted), U (replaced with an update) or NULL when valid_end_date has the default value.")
  @maxLength(1)
  invalid_reason?: string;
}

/**
 * DrugStrength creation request
 */
@doc("Request body for creating a new DrugStrength record")
model DrugStrengthCreate {
  @doc("The Concept representing the Branded Drug or Clinical Drug Product. References CONCEPT table.")
  drug_concept_id: ConceptId;

  @doc("The Concept representing the active ingredient contained within the drug product. ETL Convention: Combination Drugs will have more than one record in this table, one for each active Ingredient. References CONCEPT table.")
  ingredient_concept_id: ConceptId;

  @doc("The numeric value or the amount of active ingredient contained within the drug product.")
  amount_value?: float64;

  @doc("The Concept representing the Unit of measure for the amount of active ingredient contained within the drug product. References CONCEPT table.")
  amount_unit_concept_id?: ConceptId;

  @doc("The concentration of the active ingredient contained within the drug product.")
  numerator_value?: float64;

  @doc("The Concept representing the Unit of measure for the concentration of active ingredient. References CONCEPT table.")
  numerator_unit_concept_id?: ConceptId;

  @doc("The amount of total liquid (or other divisible product, such as ointment, gel, spray, etc.).")
  denominator_value?: float64;

  @doc("The Concept representing the denominator unit for the concentration of active ingredient. References CONCEPT table.")
  denominator_unit_concept_id?: ConceptId;

  @doc("The number of units of Clinical Branded Drug or Quantified Clinical or Branded Drug contained in a box as dispensed to the patient.")
  box_size?: int64;

  @doc("The date when the Concept was first recorded. The default value is 1-Jan-1970.")
  valid_start_date: DateOnly;

  @doc("The date when then Concept became invalid.")
  valid_end_date: DateOnly;

  @doc("Reason the concept was invalidated. Possible values are D (deleted), U (replaced with an update) or NULL when valid_end_date has the default value.")
  @maxLength(1)
  invalid_reason?: string;
}

/**
 * DrugStrength update request
 */
@doc("Request body for updating an existing DrugStrength record")
model DrugStrengthUpdate {
  @doc("The Concept representing the Branded Drug or Clinical Drug Product. References CONCEPT table.")
  drug_concept_id?: ConceptId;

  @doc("The Concept representing the active ingredient contained within the drug product. ETL Convention: Combination Drugs will have more than one record in this table, one for each active Ingredient. References CONCEPT table.")
  ingredient_concept_id?: ConceptId;

  @doc("The numeric value or the amount of active ingredient contained within the drug product.")
  amount_value?: float64;

  @doc("The Concept representing the Unit of measure for the amount of active ingredient contained within the drug product. References CONCEPT table.")
  amount_unit_concept_id?: ConceptId;

  @doc("The concentration of the active ingredient contained within the drug product.")
  numerator_value?: float64;

  @doc("The Concept representing the Unit of measure for the concentration of active ingredient. References CONCEPT table.")
  numerator_unit_concept_id?: ConceptId;

  @doc("The amount of total liquid (or other divisible product, such as ointment, gel, spray, etc.).")
  denominator_value?: float64;

  @doc("The Concept representing the denominator unit for the concentration of active ingredient. References CONCEPT table.")
  denominator_unit_concept_id?: ConceptId;

  @doc("The number of units of Clinical Branded Drug or Quantified Clinical or Branded Drug contained in a box as dispensed to the patient.")
  box_size?: int64;

  @doc("The date when the Concept was first recorded. The default value is 1-Jan-1970.")
  valid_start_date?: DateOnly;

  @doc("The date when then Concept became invalid.")
  valid_end_date?: DateOnly;

  @doc("Reason the concept was invalidated. Possible values are D (deleted), U (replaced with an update) or NULL when valid_end_date has the default value.")
  invalid_reason?: string;
}

/**
 * Query parameters for filtering drug-strength
 */
@doc("Filter parameters for DrugStrength list operations")
model DrugStrengthQueryParams {
  ...PaginationParams;

  @doc("Filter by drug concept id")
  @query
  drug_concept_id?: ConceptId;

  @doc("Filter by ingredient concept id")
  @query
  ingredient_concept_id?: ConceptId;

  @doc("Filter by amount unit concept id")
  @query
  amount_unit_concept_id?: ConceptId;

  @doc("Filter by numerator unit concept id")
  @query
  numerator_unit_concept_id?: ConceptId;

  @doc("Filter by denominator unit concept id")
  @query
  denominator_unit_concept_id?: ConceptId;

  @doc("Sort field")
  @query
  sort_by?: "drug_strength_id";

  @doc("Sort order")
  @query
  sort_order?: SortOrder;
}

/**
 * DrugStrength API operations
 */
@route("/drug-strengths")
@tag("Vocabulary - DrugStrengths")
interface DrugStrengths {
  @get
  @summary("List all drug-strengths")
  @doc("Returns a paginated list of DrugStrength records.")
  list(
    ...DrugStrengthQueryParams,
  ): {
    @statusCode statusCode: 200;
    @body body: PaginatedList<DrugStrength>;
  } | ErrorResponse;

  @get
  @summary("Get drug-strength by ID")
  @doc("Retrieve a single DrugStrength record by its unique identifier.")
  read(
    @path
    @doc("Unique drug-strength identifier")
    drug_strength_id: int64,
  ): {
    @statusCode statusCode: 200;
    @body body: DrugStrength;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @post
  @summary("Create a new drug-strength")
  @doc("Create a new DrugStrength record.")
  create(
    @body
    @doc("DrugStrength data to create")
    record: DrugStrengthCreate,
  ): {
    @statusCode statusCode: 201;
    @body body: DrugStrength;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @put
  @summary("Update drug-strength (full replacement)")
  @doc("Replace all fields of an existing DrugStrength record.")
  update(
    @path
    @doc("Unique drug-strength identifier")
    drug_strength_id: int64,

    @body
    @doc("Complete drug-strength data")
    record: DrugStrengthCreate,
  ): {
    @statusCode statusCode: 200;
    @body body: DrugStrength;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @patch(#{implicitOptionality: true})
  @summary("Update drug-strength (partial)")
  @doc("Update specific fields of an existing DrugStrength record.")
  patch(
    @path
    @doc("Unique drug-strength identifier")
    drug_strength_id: int64,

    @body
    @doc("Fields to update")
    record: DrugStrengthUpdate,
  ): {
    @statusCode statusCode: 200;
    @body body: DrugStrength;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @delete
  @summary("Delete drug-strength")
  @doc("Delete a DrugStrength record.")
  delete(
    @path
    @doc("Unique drug-strength identifier")
    drug_strength_id: int64,
  ): {
    @statusCode statusCode: 204;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;
}
