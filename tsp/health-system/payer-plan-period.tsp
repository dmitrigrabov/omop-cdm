import "@typespec/http";
import "@typespec/rest";
import "../common/models.tsp";

using TypeSpec.Http;
using TypeSpec.Rest;
using OmopCdm.Common;

namespace OmopCdm.Healthsystem;

/**
 * PayerPlanPeriod Resource
 *
 * The PAYER_PLAN_PERIOD table captures details of the period of time
that a Person is continuously enrolled under a specific health Plan
benefit structure from a given Payer. Each Person receiving healthcare
is typically covered by a health benefit plan, which pays for (fully or
partially), or directly provides, the care. These benefit plans are
provided by payers, such as health insurances or state or government
agencies. In each plan the details of the health benefits are defined
for the Person or her family, and the health benefit Plan might change
over time typically with increasing utilization (reaching certain cost
thresholds such as deductibles), plan availability and purchasing
choices of the Person. The unique combinations of Payer organizations,
health benefit Plans and time periods in which they are valid for a
Person are recorded in this table.
 *
 * **User Guide**: A Person can have multiple, overlapping, Payer_Plan_Periods in this
table. For example, medical and drug coverage in the US can be
represented by two Payer_Plan_Periods. The details of the benefit
structure of the Plan is rarely known, the idea is just to identify that
the Plans are different.
 *
 * **ETL Conventions**: NA
 */

@doc("PayerPlanPeriod record in the OMOP CDM")
@example(#{
  payer_plan_period_id: 12345,
  person_id: 100,
  payer_plan_period_start_date: "2023-01-15",
  payer_plan_period_end_date: "2023-01-15",
  payer_concept_id: 8507,
  payer_source_value: "Example value",
  payer_source_concept_id: 8507,
  plan_concept_id: 8507,
  plan_source_value: "Example value",
  plan_source_concept_id: 8507,
  sponsor_concept_id: 8507,
  sponsor_source_value: "Example value",
  sponsor_source_concept_id: 8507,
  family_source_value: "Example value",
  stop_reason_concept_id: 8507,
  stop_reason_source_value: "Example value",
  stop_reason_source_concept_id: 8507
})
model PayerPlanPeriod {
  @doc("A unique identifier for each unique combination of a Person, Payer, Plan, and Period of time.")
  payer_plan_period_id: int64;

  @doc("The Person covered by the Plan. ETL Convention: A single Person can have multiple, overlapping, PAYER_PLAN_PERIOD records References PERSON table.")
  person_id: int64;

  @doc("Start date of Plan coverage.")
  payer_plan_period_start_date: DateOnly;

  @doc("End date of Plan coverage.")
  payer_plan_period_end_date: DateOnly;

  @doc("This field represents the organization who reimburses the provider which administers care to the Person. ETL Convention: Map the payer directly to a standard CONCEPT_ID with the domain_id of ‘Payer’ ([Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Payer&standardConcept=Standard&page=1&pageSize=15&query=)). This vocabulary is not exhaustive so if there is a value missing, please see the [custom concepts](https://ohdsi.github.io/CommonDataModel/customConcepts.html) page. References CONCEPT table.")
  payer_concept_id?: ConceptId;

  @doc("This is the Payer as it appears in the source data.")
  @maxLength(50)
  payer_source_value?: string;

  @doc("If the source data codes the Payer in an OMOP supported vocabulary store the concept_id here. References CONCEPT table.")
  payer_source_concept_id?: ConceptId;

  @doc("This field represents the specific health benefit Plan the Person is enrolled in. ETL Convention: Map the Plan directly to a standard CONCEPT_ID in the ‘Plan’ vocabulary ([Accepted Concepts](http://athena.ohdsi.org/search-terms/terms?domain=Plan&standardConcept=Standard&page=1&pageSize=15&query=)). This vocabulary is not exhaustive so if there is a value missing, please see the [custom concepts](https://ohdsi.github.io/CommonDataModel/customConcepts.html) page. References CONCEPT table.")
  plan_concept_id?: ConceptId;

  @doc("This is the health benefit Plan of the Person as it appears in the source data.")
  @maxLength(50)
  plan_source_value?: string;

  @doc("If the source data codes the Plan in an OMOP supported vocabulary store the concept_id here. References CONCEPT table.")
  plan_source_concept_id?: ConceptId;

  @doc("This field represents the sponsor of the Plan who finances the Plan. This includes self-insured, small group health plan and large group health plan. ETL Convention: Map the sponsor directly to a standard CONCEPT_ID with the domain_id of ‘Sponsor’ ([Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Sponsor&standardConcept=Standard&page=1&pageSize=15&query=)). This vocabulary is not exhaustive so if there is a value missing, please see the [custom concepts](https://ohdsi.github.io/CommonDataModel/customConcepts.html) page. References CONCEPT table.")
  sponsor_concept_id?: ConceptId;

  @doc("The Plan sponsor as it appears in the source data.")
  @maxLength(50)
  sponsor_source_value?: string;

  @doc("If the source data codes the sponsor in an OMOP supported vocabulary store the concept_id here. References CONCEPT table.")
  sponsor_source_concept_id?: ConceptId;

  @doc("The common identifier for all people (often a family) that covered by the same policy. ETL Convention: Often these are the common digits of the enrollment id of the policy members.")
  @maxLength(50)
  family_source_value?: string;

  @doc("This field represents the reason the Person left the Plan, if known. ETL Convention: Map the stop reason directly to a standard CONCEPT_ID with a domain of ‘Plan Stop Reason’ ([Accepted Concepts](http://athena.ohdsi.org/search-terms/terms?domain=Plan+Stop+Reason&standardConcept=Standard&page=1&pageSize=15&query=)). If one does not exist visit the [Custom Concepts](https://ohdsi.github.io/CommonDataModel/customConcepts.html) pate for more information. References CONCEPT table.")
  stop_reason_concept_id?: ConceptId;

  @doc("The Plan stop reason as it appears in the source data.")
  @maxLength(50)
  stop_reason_source_value?: string;

  @doc("If the source data codes the stop reason in an OMOP supported vocabulary store the concept_id here. References CONCEPT table.")
  stop_reason_source_concept_id?: ConceptId;
}

/**
 * PayerPlanPeriod creation request
 */
@doc("Request body for creating a new PayerPlanPeriod record")
model PayerPlanPeriodCreate {
  @doc("The Person covered by the Plan. ETL Convention: A single Person can have multiple, overlapping, PAYER_PLAN_PERIOD records References PERSON table.")
  person_id: int64;

  @doc("Start date of Plan coverage.")
  payer_plan_period_start_date: DateOnly;

  @doc("End date of Plan coverage.")
  payer_plan_period_end_date: DateOnly;

  @doc("This field represents the organization who reimburses the provider which administers care to the Person. ETL Convention: Map the payer directly to a standard CONCEPT_ID with the domain_id of ‘Payer’ ([Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Payer&standardConcept=Standard&page=1&pageSize=15&query=)). This vocabulary is not exhaustive so if there is a value missing, please see the [custom concepts](https://ohdsi.github.io/CommonDataModel/customConcepts.html) page. References CONCEPT table.")
  payer_concept_id?: ConceptId;

  @doc("This is the Payer as it appears in the source data.")
  @maxLength(50)
  payer_source_value?: string;

  @doc("If the source data codes the Payer in an OMOP supported vocabulary store the concept_id here. References CONCEPT table.")
  payer_source_concept_id?: ConceptId;

  @doc("This field represents the specific health benefit Plan the Person is enrolled in. ETL Convention: Map the Plan directly to a standard CONCEPT_ID in the ‘Plan’ vocabulary ([Accepted Concepts](http://athena.ohdsi.org/search-terms/terms?domain=Plan&standardConcept=Standard&page=1&pageSize=15&query=)). This vocabulary is not exhaustive so if there is a value missing, please see the [custom concepts](https://ohdsi.github.io/CommonDataModel/customConcepts.html) page. References CONCEPT table.")
  plan_concept_id?: ConceptId;

  @doc("This is the health benefit Plan of the Person as it appears in the source data.")
  @maxLength(50)
  plan_source_value?: string;

  @doc("If the source data codes the Plan in an OMOP supported vocabulary store the concept_id here. References CONCEPT table.")
  plan_source_concept_id?: ConceptId;

  @doc("This field represents the sponsor of the Plan who finances the Plan. This includes self-insured, small group health plan and large group health plan. ETL Convention: Map the sponsor directly to a standard CONCEPT_ID with the domain_id of ‘Sponsor’ ([Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Sponsor&standardConcept=Standard&page=1&pageSize=15&query=)). This vocabulary is not exhaustive so if there is a value missing, please see the [custom concepts](https://ohdsi.github.io/CommonDataModel/customConcepts.html) page. References CONCEPT table.")
  sponsor_concept_id?: ConceptId;

  @doc("The Plan sponsor as it appears in the source data.")
  @maxLength(50)
  sponsor_source_value?: string;

  @doc("If the source data codes the sponsor in an OMOP supported vocabulary store the concept_id here. References CONCEPT table.")
  sponsor_source_concept_id?: ConceptId;

  @doc("The common identifier for all people (often a family) that covered by the same policy. ETL Convention: Often these are the common digits of the enrollment id of the policy members.")
  @maxLength(50)
  family_source_value?: string;

  @doc("This field represents the reason the Person left the Plan, if known. ETL Convention: Map the stop reason directly to a standard CONCEPT_ID with a domain of ‘Plan Stop Reason’ ([Accepted Concepts](http://athena.ohdsi.org/search-terms/terms?domain=Plan+Stop+Reason&standardConcept=Standard&page=1&pageSize=15&query=)). If one does not exist visit the [Custom Concepts](https://ohdsi.github.io/CommonDataModel/customConcepts.html) pate for more information. References CONCEPT table.")
  stop_reason_concept_id?: ConceptId;

  @doc("The Plan stop reason as it appears in the source data.")
  @maxLength(50)
  stop_reason_source_value?: string;

  @doc("If the source data codes the stop reason in an OMOP supported vocabulary store the concept_id here. References CONCEPT table.")
  stop_reason_source_concept_id?: ConceptId;
}

/**
 * PayerPlanPeriod update request
 */
@doc("Request body for updating an existing PayerPlanPeriod record")
model PayerPlanPeriodUpdate {
  @doc("The Person covered by the Plan. ETL Convention: A single Person can have multiple, overlapping, PAYER_PLAN_PERIOD records References PERSON table.")
  person_id?: int64;

  @doc("Start date of Plan coverage.")
  payer_plan_period_start_date?: DateOnly;

  @doc("End date of Plan coverage.")
  payer_plan_period_end_date?: DateOnly;

  @doc("This field represents the organization who reimburses the provider which administers care to the Person. ETL Convention: Map the payer directly to a standard CONCEPT_ID with the domain_id of ‘Payer’ ([Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Payer&standardConcept=Standard&page=1&pageSize=15&query=)). This vocabulary is not exhaustive so if there is a value missing, please see the [custom concepts](https://ohdsi.github.io/CommonDataModel/customConcepts.html) page. References CONCEPT table.")
  payer_concept_id?: ConceptId;

  @doc("This is the Payer as it appears in the source data.")
  payer_source_value?: string;

  @doc("If the source data codes the Payer in an OMOP supported vocabulary store the concept_id here. References CONCEPT table.")
  payer_source_concept_id?: ConceptId;

  @doc("This field represents the specific health benefit Plan the Person is enrolled in. ETL Convention: Map the Plan directly to a standard CONCEPT_ID in the ‘Plan’ vocabulary ([Accepted Concepts](http://athena.ohdsi.org/search-terms/terms?domain=Plan&standardConcept=Standard&page=1&pageSize=15&query=)). This vocabulary is not exhaustive so if there is a value missing, please see the [custom concepts](https://ohdsi.github.io/CommonDataModel/customConcepts.html) page. References CONCEPT table.")
  plan_concept_id?: ConceptId;

  @doc("This is the health benefit Plan of the Person as it appears in the source data.")
  plan_source_value?: string;

  @doc("If the source data codes the Plan in an OMOP supported vocabulary store the concept_id here. References CONCEPT table.")
  plan_source_concept_id?: ConceptId;

  @doc("This field represents the sponsor of the Plan who finances the Plan. This includes self-insured, small group health plan and large group health plan. ETL Convention: Map the sponsor directly to a standard CONCEPT_ID with the domain_id of ‘Sponsor’ ([Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Sponsor&standardConcept=Standard&page=1&pageSize=15&query=)). This vocabulary is not exhaustive so if there is a value missing, please see the [custom concepts](https://ohdsi.github.io/CommonDataModel/customConcepts.html) page. References CONCEPT table.")
  sponsor_concept_id?: ConceptId;

  @doc("The Plan sponsor as it appears in the source data.")
  sponsor_source_value?: string;

  @doc("If the source data codes the sponsor in an OMOP supported vocabulary store the concept_id here. References CONCEPT table.")
  sponsor_source_concept_id?: ConceptId;

  @doc("The common identifier for all people (often a family) that covered by the same policy. ETL Convention: Often these are the common digits of the enrollment id of the policy members.")
  family_source_value?: string;

  @doc("This field represents the reason the Person left the Plan, if known. ETL Convention: Map the stop reason directly to a standard CONCEPT_ID with a domain of ‘Plan Stop Reason’ ([Accepted Concepts](http://athena.ohdsi.org/search-terms/terms?domain=Plan+Stop+Reason&standardConcept=Standard&page=1&pageSize=15&query=)). If one does not exist visit the [Custom Concepts](https://ohdsi.github.io/CommonDataModel/customConcepts.html) pate for more information. References CONCEPT table.")
  stop_reason_concept_id?: ConceptId;

  @doc("The Plan stop reason as it appears in the source data.")
  stop_reason_source_value?: string;

  @doc("If the source data codes the stop reason in an OMOP supported vocabulary store the concept_id here. References CONCEPT table.")
  stop_reason_source_concept_id?: ConceptId;
}

/**
 * Query parameters for filtering payer-plan-period
 */
@doc("Filter parameters for PayerPlanPeriod list operations")
model PayerPlanPeriodQueryParams {
  ...PaginationParams;

  @doc("Filter by person id")
  @query
  person_id?: int64;

  @doc("Filter by payer concept id")
  @query
  payer_concept_id?: ConceptId;

  @doc("Filter by payer source concept id")
  @query
  payer_source_concept_id?: ConceptId;

  @doc("Filter by plan concept id")
  @query
  plan_concept_id?: ConceptId;

  @doc("Filter by plan source concept id")
  @query
  plan_source_concept_id?: ConceptId;

  @doc("Filter by sponsor concept id")
  @query
  sponsor_concept_id?: ConceptId;

  @doc("Filter by sponsor source concept id")
  @query
  sponsor_source_concept_id?: ConceptId;

  @doc("Filter by stop reason concept id")
  @query
  stop_reason_concept_id?: ConceptId;

  @doc("Filter by stop reason source concept id")
  @query
  stop_reason_source_concept_id?: ConceptId;

  @doc("Sort field")
  @query
  sort_by?: "payer_plan_period_id";

  @doc("Sort order")
  @query
  sort_order?: SortOrder;
}

/**
 * PayerPlanPeriod API operations
 */
@route("/payer-plan-periods")
@tag("Health System - PayerPlanPeriods")
interface PayerPlanPeriods {
  @get
  @summary("List all payer-plan-periods")
  @doc("Returns a paginated list of PayerPlanPeriod records.")
  list(
    ...PayerPlanPeriodQueryParams,
  ): {
    @statusCode statusCode: 200;
    @body body: PaginatedList<PayerPlanPeriod>;
  } | ErrorResponse;

  @get
  @summary("Get payer-plan-period by ID")
  @doc("Retrieve a single PayerPlanPeriod record by its unique identifier.")
  read(
    @path
    @doc("Unique payer-plan-period identifier")
    payer_plan_period_id: int64,
  ): {
    @statusCode statusCode: 200;
    @body body: PayerPlanPeriod;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @post
  @summary("Create a new payer-plan-period")
  @doc("Create a new PayerPlanPeriod record.")
  create(
    @body
    @doc("PayerPlanPeriod data to create")
    record: PayerPlanPeriodCreate,
  ): {
    @statusCode statusCode: 201;
    @body body: PayerPlanPeriod;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @put
  @summary("Update payer-plan-period (full replacement)")
  @doc("Replace all fields of an existing PayerPlanPeriod record.")
  update(
    @path
    @doc("Unique payer-plan-period identifier")
    payer_plan_period_id: int64,

    @body
    @doc("Complete payer-plan-period data")
    record: PayerPlanPeriodCreate,
  ): {
    @statusCode statusCode: 200;
    @body body: PayerPlanPeriod;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @patch(#{implicitOptionality: true})
  @summary("Update payer-plan-period (partial)")
  @doc("Update specific fields of an existing PayerPlanPeriod record.")
  patch(
    @path
    @doc("Unique payer-plan-period identifier")
    payer_plan_period_id: int64,

    @body
    @doc("Fields to update")
    record: PayerPlanPeriodUpdate,
  ): {
    @statusCode statusCode: 200;
    @body body: PayerPlanPeriod;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @delete
  @summary("Delete payer-plan-period")
  @doc("Delete a PayerPlanPeriod record.")
  delete(
    @path
    @doc("Unique payer-plan-period identifier")
    payer_plan_period_id: int64,
  ): {
    @statusCode statusCode: 204;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;
}
