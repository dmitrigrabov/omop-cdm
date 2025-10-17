import "@typespec/http";
import "@typespec/rest";
import "../common/models.tsp";

using TypeSpec.Http;
using TypeSpec.Rest;
using OmopCdm.Common;

namespace OmopCdm.Healthsystem;

/**
 * Cost Resource
 *
 * The COST table captures records containing the cost of any medical
event recorded in one of the OMOP clinical event tables such as
DRUG_EXPOSURE, PROCEDURE_OCCURRENCE, VISIT_OCCURRENCE, VISIT_DETAIL,
DEVICE_OCCURRENCE, OBSERVATION or MEASUREMENT. 

Each record in the cost table account for the amount of money
transacted for the clinical event. So, the COST table may be used to
represent both receivables (charges) and payments (paid), each
transaction type represented by its COST_CONCEPT_ID. The
COST_TYPE_CONCEPT_ID field will use concepts in the Standardized
Vocabularies to designate the source (provenance) of the cost data. A
reference to the health plan information in the PAYER_PLAN_PERIOD table
is stored in the record for information used for the adjudication system
to determine the persons benefit for the clinical event.
 *
 * **User Guide**: When dealing with summary costs, the cost of the goods or services
the provider provides is often not known directly, but derived from the
hospital charges multiplied by an average cost-to-charge ratio.
 *
 * **ETL Conventions**: One cost record is generated for each response by a payer. In a
claims databases, the payment and payment terms reported by the payer
for the goods or services billed will generate one cost record. If the
source data has payment information for more than one payer
(i.e. primary insurance and secondary insurance payment for one entity),
then a cost record is created for each reporting payer. Therefore, it is
possible for one procedure to have multiple cost records for each payer,
but typically it contains one or no record per entity. Payer
reimbursement cost records will be identified by using the PAYER_PLAN_ID
field. Drug costs are composed of ingredient cost (the amount charged by
the wholesale distributor or manufacturer), the dispensing fee (the
amount charged by the pharmacy and the sales tax).
 */

@doc("Cost record in the OMOP CDM")
@example(#{
  id: 12345,
  cost_event_id: 100,
  cost_domain_id: "Example value",
  cost_type_concept_id: 8507,
  currency_concept_id: 8507,
  total_charge: 98.6,
  total_cost: 98.6,
  total_paid: 98.6,
  paid_by_payer: 98.6,
  paid_by_patient: 98.6,
  paid_patient_copay: 98.6,
  paid_patient_coinsurance: 98.6,
  paid_patient_deductible: 98.6,
  paid_by_primary: 98.6,
  paid_ingredient_cost: 98.6,
  paid_dispensing_fee: 98.6,
  payer_plan_period_id: 100,
  amount_allowed: 98.6,
  revenue_code_concept_id: 8507,
  revenue_code_source_value: "Example value",
  drg_concept_id: 8507,
  drg_source_value: "Example value"
})
model Cost {
  @doc("")
  id: int64;

  @doc("")
  cost_event_id: int64;

  @doc("References DOMAIN table.")
  @maxLength(20)
  cost_domain_id: string;

  @doc("References CONCEPT table.")
  cost_type_concept_id: ConceptId;

  @doc("References CONCEPT table.")
  currency_concept_id?: ConceptId;

  @doc("")
  total_charge?: float64;

  @doc("")
  total_cost?: float64;

  @doc("")
  total_paid?: float64;

  @doc("")
  paid_by_payer?: float64;

  @doc("")
  paid_by_patient?: float64;

  @doc("")
  paid_patient_copay?: float64;

  @doc("")
  paid_patient_coinsurance?: float64;

  @doc("")
  paid_patient_deductible?: float64;

  @doc("")
  paid_by_primary?: float64;

  @doc("")
  paid_ingredient_cost?: float64;

  @doc("")
  paid_dispensing_fee?: float64;

  @doc("")
  payer_plan_period_id?: int64;

  @doc("")
  amount_allowed?: float64;

  @doc("References CONCEPT table.")
  revenue_code_concept_id?: ConceptId;

  @doc("Revenue codes are a method to charge for a class of procedures and conditions in the U.S. hospital system.")
  @maxLength(50)
  revenue_code_source_value?: string;

  @doc("References CONCEPT table.")
  drg_concept_id?: ConceptId;

  @doc("Diagnosis Related Groups are US codes used to classify hospital cases into one of approximately 500 groups.")
  @maxLength(3)
  drg_source_value?: string;
}

/**
 * Cost creation request
 */
@doc("Request body for creating a new Cost record")
model CostCreate {
  @doc("")
  cost_event_id: int64;

  @doc("References DOMAIN table.")
  @maxLength(20)
  cost_domain_id: string;

  @doc("References CONCEPT table.")
  cost_type_concept_id: ConceptId;

  @doc("References CONCEPT table.")
  currency_concept_id?: ConceptId;

  @doc("")
  total_charge?: float64;

  @doc("")
  total_cost?: float64;

  @doc("")
  total_paid?: float64;

  @doc("")
  paid_by_payer?: float64;

  @doc("")
  paid_by_patient?: float64;

  @doc("")
  paid_patient_copay?: float64;

  @doc("")
  paid_patient_coinsurance?: float64;

  @doc("")
  paid_patient_deductible?: float64;

  @doc("")
  paid_by_primary?: float64;

  @doc("")
  paid_ingredient_cost?: float64;

  @doc("")
  paid_dispensing_fee?: float64;

  @doc("")
  payer_plan_period_id?: int64;

  @doc("")
  amount_allowed?: float64;

  @doc("References CONCEPT table.")
  revenue_code_concept_id?: ConceptId;

  @doc("Revenue codes are a method to charge for a class of procedures and conditions in the U.S. hospital system.")
  @maxLength(50)
  revenue_code_source_value?: string;

  @doc("References CONCEPT table.")
  drg_concept_id?: ConceptId;

  @doc("Diagnosis Related Groups are US codes used to classify hospital cases into one of approximately 500 groups.")
  @maxLength(3)
  drg_source_value?: string;
}

/**
 * Cost update request
 */
@doc("Request body for updating an existing Cost record")
model CostUpdate {
  @doc("")
  cost_event_id?: int64;

  @doc("References DOMAIN table.")
  cost_domain_id?: string;

  @doc("References CONCEPT table.")
  cost_type_concept_id?: ConceptId;

  @doc("References CONCEPT table.")
  currency_concept_id?: ConceptId;

  @doc("")
  total_charge?: float64;

  @doc("")
  total_cost?: float64;

  @doc("")
  total_paid?: float64;

  @doc("")
  paid_by_payer?: float64;

  @doc("")
  paid_by_patient?: float64;

  @doc("")
  paid_patient_copay?: float64;

  @doc("")
  paid_patient_coinsurance?: float64;

  @doc("")
  paid_patient_deductible?: float64;

  @doc("")
  paid_by_primary?: float64;

  @doc("")
  paid_ingredient_cost?: float64;

  @doc("")
  paid_dispensing_fee?: float64;

  @doc("")
  payer_plan_period_id?: int64;

  @doc("")
  amount_allowed?: float64;

  @doc("References CONCEPT table.")
  revenue_code_concept_id?: ConceptId;

  @doc("Revenue codes are a method to charge for a class of procedures and conditions in the U.S. hospital system.")
  revenue_code_source_value?: string;

  @doc("References CONCEPT table.")
  drg_concept_id?: ConceptId;

  @doc("Diagnosis Related Groups are US codes used to classify hospital cases into one of approximately 500 groups.")
  drg_source_value?: string;
}

/**
 * Query parameters for filtering cost
 */
@doc("Filter parameters for Cost list operations")
model CostQueryParams {
  ...PaginationParams;

  @doc("Filter by cost domain id")
  @query
  cost_domain_id?: string;

  @doc("Filter by cost type concept id")
  @query
  cost_type_concept_id?: ConceptId;

  @doc("Filter by currency concept id")
  @query
  currency_concept_id?: ConceptId;

  @doc("Filter by revenue code concept id")
  @query
  revenue_code_concept_id?: ConceptId;

  @doc("Filter by drg concept id")
  @query
  drg_concept_id?: ConceptId;

  @doc("Sort field")
  @query
  sort_by?: "id";

  @doc("Sort order")
  @query
  sort_order?: SortOrder;
}

/**
 * Cost list response with example
 */
@doc("Paginated list of Cost records")
@example(#{
  data: #[#{
  id: 12345,
  cost_event_id: 100,
  cost_domain_id: "Example value",
  cost_type_concept_id: 8507,
  currency_concept_id: 8507,
  total_charge: 98.6,
  total_cost: 98.6,
  total_paid: 98.6,
  paid_by_payer: 98.6,
  paid_by_patient: 98.6,
  paid_patient_copay: 98.6,
  paid_patient_coinsurance: 98.6,
  paid_patient_deductible: 98.6,
  paid_by_primary: 98.6,
  paid_ingredient_cost: 98.6,
  paid_dispensing_fee: 98.6,
  payer_plan_period_id: 100,
  amount_allowed: 98.6,
  revenue_code_concept_id: 8507,
  revenue_code_source_value: "Example value",
  drg_concept_id: 8507,
  drg_source_value: "Example value"
}],
  pagination: #{
    total: 1,
    offset: 0,
    limit: 100,
    count: 1
  }
})
model CostList {
  ...PaginatedList<Cost>;
}

/**
 * Cost API operations
 */
@route("/costs")
@tag("Health System - Costs")
interface Costs {
  @get
  @summary("List all costs")
  @doc("Returns a paginated list of Cost records.")
  list(
    ...CostQueryParams,
  ): {
    @statusCode statusCode: 200;
    @body body: CostList;
  } | ErrorResponse;

  @get
  @summary("Get cost by ID")
  @doc("Retrieve a single Cost record by its unique identifier.")
  read(
    @path
    @doc("Unique cost identifier")
    id: string,
  ): {
    @statusCode statusCode: 200;
    @body body: Cost;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @post
  @summary("Create a new cost")
  @doc("Create a new Cost record.")
  create(
    @body
    @doc("Cost data to create")
    record: CostCreate,
  ): {
    @statusCode statusCode: 201;
    @body body: Cost;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @put
  @summary("Update cost (full replacement)")
  @doc("Replace all fields of an existing Cost record.")
  update(
    @path
    @doc("Unique cost identifier")
    id: string,

    @body
    @doc("Complete cost data")
    record: CostCreate,
  ): {
    @statusCode statusCode: 200;
    @body body: Cost;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @patch(#{implicitOptionality: true})
  @summary("Update cost (partial)")
  @doc("Update specific fields of an existing Cost record.")
  patch(
    @path
    @doc("Unique cost identifier")
    id: string,

    @body
    @doc("Fields to update")
    record: CostUpdate,
  ): {
    @statusCode statusCode: 200;
    @body body: Cost;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @delete
  @summary("Delete cost")
  @doc("Delete a Cost record.")
  delete(
    @path
    @doc("Unique cost identifier")
    id: string,
  ): {
    @statusCode statusCode: 204;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;
}
