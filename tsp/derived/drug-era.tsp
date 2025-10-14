import "@typespec/http";
import "@typespec/rest";
import "../common/models.tsp";

using TypeSpec.Http;
using TypeSpec.Rest;
using OmopCdm.Common;

namespace OmopCdm.Derived;

/**
 * DrugEra Resource
 *
 * A Drug Era is defined as a span of time when the Person is assumed to
be exposed to a particular active ingredient. A Drug Era is not the same
as a Drug Exposure: Exposures are individual records corresponding to
the source when Drug was delivered to the Person, while successive
periods of Drug Exposures are combined under certain rules to produce
continuous Drug Eras. Every record in the DRUG_EXPOSURE table should be
part of a drug era based on the dates of exposure.
 *
 * **User Guide**: NA
 *
 * **ETL Conventions**: The SQL script for generating DRUG_ERA records can be found [here](https://ohdsi.github.io/CommonDataModel/sqlScripts.html#drug_eras).
 */

@doc("DrugEra record in the OMOP CDM")
model DrugEra {
  @doc("")
  @visibility("read")
  drug_era_id: int64;

  @doc("References PERSON table.")
  person_id: int64;

  @doc("The drug_concept_id should conform to the concept class ‘ingredient’ as the drug_era is an era of time where a person is exposed to a particular drug ingredient.  References CONCEPT table.")
  drug_concept_id: ConceptId;

  @doc("The Drug Era Start Date is the start date of the first Drug Exposure for a given ingredient, with at least 31 days since the previous exposure.")
  drug_era_start_date: DateOnly;

  @doc("The Drug Era End Date is the end date of the last Drug Exposure. The End Date of each Drug Exposure is either taken from the field drug_exposure_end_date or, as it is typically not available, inferred using the following rules: For pharmacy prescription data, the date when the drug was dispensed plus the number of days of supply are used to extrapolate the End Date for the Drug Exposure. Depending on the country-specific healthcare system, this supply information is either explicitly provided in the day_supply field or inferred from package size or similar information. For Procedure Drugs, usually the drug is administered on a single date (i.e., the administration date). A standard Persistence Window of 30 days (gap, slack) is permitted between two subsequent such extrapolated DRUG_EXPOSURE records to be considered to be merged into a single Drug Era.")
  drug_era_end_date: DateOnly;

  @doc("The count of grouped DRUG_EXPOSURE records that were included in the DRUG_ERA row")
  drug_exposure_count?: int64;

  @doc("The Gap Days determine how many total drug-free days are observed between all Drug Exposure events that contribute to a DRUG_ERA record. It is assumed that the drugs are “not stockpiled” by the patient, i.e. that if a new drug prescription or refill is observed (a new DRUG_EXPOSURE record is written), the remaining supply from the previous events is abandoned. The difference between Persistence Window and Gap Days is that the former is the maximum drug-free time allowed between two subsequent DRUG_EXPOSURE records, while the latter is the sum of actual drug-free days for the given Drug Era under the above assumption of non-stockpiling.")
  gap_days?: int64;
}

/**
 * DrugEra creation request
 */
@doc("Request body for creating a new DrugEra record")
model DrugEraCreate {
  @doc("References PERSON table.")
  person_id: int64;

  @doc("The drug_concept_id should conform to the concept class ‘ingredient’ as the drug_era is an era of time where a person is exposed to a particular drug ingredient.  References CONCEPT table.")
  drug_concept_id: ConceptId;

  @doc("The Drug Era Start Date is the start date of the first Drug Exposure for a given ingredient, with at least 31 days since the previous exposure.")
  drug_era_start_date: DateOnly;

  @doc("The Drug Era End Date is the end date of the last Drug Exposure. The End Date of each Drug Exposure is either taken from the field drug_exposure_end_date or, as it is typically not available, inferred using the following rules: For pharmacy prescription data, the date when the drug was dispensed plus the number of days of supply are used to extrapolate the End Date for the Drug Exposure. Depending on the country-specific healthcare system, this supply information is either explicitly provided in the day_supply field or inferred from package size or similar information. For Procedure Drugs, usually the drug is administered on a single date (i.e., the administration date). A standard Persistence Window of 30 days (gap, slack) is permitted between two subsequent such extrapolated DRUG_EXPOSURE records to be considered to be merged into a single Drug Era.")
  drug_era_end_date: DateOnly;

  @doc("The count of grouped DRUG_EXPOSURE records that were included in the DRUG_ERA row")
  drug_exposure_count?: int64;

  @doc("The Gap Days determine how many total drug-free days are observed between all Drug Exposure events that contribute to a DRUG_ERA record. It is assumed that the drugs are “not stockpiled” by the patient, i.e. that if a new drug prescription or refill is observed (a new DRUG_EXPOSURE record is written), the remaining supply from the previous events is abandoned. The difference between Persistence Window and Gap Days is that the former is the maximum drug-free time allowed between two subsequent DRUG_EXPOSURE records, while the latter is the sum of actual drug-free days for the given Drug Era under the above assumption of non-stockpiling.")
  gap_days?: int64;
}

/**
 * DrugEra update request
 */
@doc("Request body for updating an existing DrugEra record")
model DrugEraUpdate {
  @doc("References PERSON table.")
  person_id?: int64;

  @doc("The drug_concept_id should conform to the concept class ‘ingredient’ as the drug_era is an era of time where a person is exposed to a particular drug ingredient.  References CONCEPT table.")
  drug_concept_id?: ConceptId;

  @doc("The Drug Era Start Date is the start date of the first Drug Exposure for a given ingredient, with at least 31 days since the previous exposure.")
  drug_era_start_date?: DateOnly;

  @doc("The Drug Era End Date is the end date of the last Drug Exposure. The End Date of each Drug Exposure is either taken from the field drug_exposure_end_date or, as it is typically not available, inferred using the following rules: For pharmacy prescription data, the date when the drug was dispensed plus the number of days of supply are used to extrapolate the End Date for the Drug Exposure. Depending on the country-specific healthcare system, this supply information is either explicitly provided in the day_supply field or inferred from package size or similar information. For Procedure Drugs, usually the drug is administered on a single date (i.e., the administration date). A standard Persistence Window of 30 days (gap, slack) is permitted between two subsequent such extrapolated DRUG_EXPOSURE records to be considered to be merged into a single Drug Era.")
  drug_era_end_date?: DateOnly;

  @doc("The count of grouped DRUG_EXPOSURE records that were included in the DRUG_ERA row")
  drug_exposure_count?: int64;

  @doc("The Gap Days determine how many total drug-free days are observed between all Drug Exposure events that contribute to a DRUG_ERA record. It is assumed that the drugs are “not stockpiled” by the patient, i.e. that if a new drug prescription or refill is observed (a new DRUG_EXPOSURE record is written), the remaining supply from the previous events is abandoned. The difference between Persistence Window and Gap Days is that the former is the maximum drug-free time allowed between two subsequent DRUG_EXPOSURE records, while the latter is the sum of actual drug-free days for the given Drug Era under the above assumption of non-stockpiling.")
  gap_days?: int64;
}

/**
 * Query parameters for filtering drug-era
 */
@doc("Filter parameters for DrugEra list operations")
model DrugEraQueryParams {
  ...PaginationParams;

  @doc("Filter by person id")
  @query
  person_id?: int64;

  @doc("Filter by drug concept id")
  @query
  drug_concept_id?: ConceptId;

  @doc("Sort field")
  @query
  sort_by?: "drug_era_id";

  @doc("Sort order")
  @query
  sort_order?: SortOrder;
}

/**
 * DrugEra API operations
 */
@route("/drug-eras")
@tag("Derived - DrugEras")
interface DrugEras {
  @get
  @summary("List all drug-eras")
  @doc("Returns a paginated list of DrugEra records.")
  list(
    ...DrugEraQueryParams,
  ): {
    @statusCode statusCode: 200;
    @body body: PaginatedList<DrugEra>;
  } | ErrorResponse;

  @get
  @summary("Get drug-era by ID")
  @doc("Retrieve a single DrugEra record by its unique identifier.")
  read(
    @path
    @doc("Unique drug-era identifier")
    drug_era_id: int64,
  ): {
    @statusCode statusCode: 200;
    @body body: DrugEra;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @post
  @summary("Create a new drug-era")
  @doc("Create a new DrugEra record.")
  create(
    @body
    @doc("DrugEra data to create")
    record: DrugEraCreate,
  ): {
    @statusCode statusCode: 201;
    @body body: DrugEra;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @put
  @summary("Update drug-era (full replacement)")
  @doc("Replace all fields of an existing DrugEra record.")
  update(
    @path
    @doc("Unique drug-era identifier")
    drug_era_id: int64,

    @body
    @doc("Complete drug-era data")
    record: DrugEraCreate,
  ): {
    @statusCode statusCode: 200;
    @body body: DrugEra;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @patch
  @summary("Update drug-era (partial)")
  @doc("Update specific fields of an existing DrugEra record.")
  patch(
    @path
    @doc("Unique drug-era identifier")
    drug_era_id: int64,

    @body
    @doc("Fields to update")
    record: DrugEraUpdate,
  ): {
    @statusCode statusCode: 200;
    @body body: DrugEra;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @delete
  @summary("Delete drug-era")
  @doc("Delete a DrugEra record.")
  delete(
    @path
    @doc("Unique drug-era identifier")
    drug_era_id: int64,
  ): {
    @statusCode statusCode: 204;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;
}
