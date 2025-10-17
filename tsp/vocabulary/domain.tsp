import "@typespec/http";
import "@typespec/rest";
import "../common/models.tsp";

using TypeSpec.Http;
using TypeSpec.Rest;
using OmopCdm.Common;

namespace OmopCdm.Vocabulary;

/**
 * Domain Resource
 *
 * The DOMAIN table includes a list of OMOP-defined Domains to which the
Concepts of the Standardized Vocabularies can belong. A Domain
represents a clinical definition whereby we assign matching Concepts for
the standardized fields in the CDM tables. For example, the Condition
Domain contains Concepts that describe a patient condition, and these
Concepts can only be used in the condition_concept_id field of the
CONDITION_OCCURRENCE and CONDITION_ERA tables. This reference table is
populated with a single record for each Domain, including a Domain ID
and a descriptive name for every Domain.
 *
 * **User Guide**: Users can leverage the DOMAIN table to explore the full spectrum of
health-related data Domains available in the Standardized Vocabularies.
Also, the information in the DOMAIN table may be used as a reference for
mapping source data to OMOP domains, facilitating data harmonization and
interoperability.
 *
 * **ETL Conventions**: NA
 */

@doc("Domain record in the OMOP CDM")
@example(#{
  id: "12345",
  domain_name: "Example value",
  domain_concept_id: 8507
})
model Domain {
  @doc("A unique key for each domain.")
  @maxLength(20)
  id: string;

  @doc("The name describing the Domain, e.g. Condition, Procedure, Measurement etc.")
  @maxLength(255)
  domain_name: string;

  @doc("A Concept representing the Domain Concept the DOMAIN record belongs to. References CONCEPT table.")
  domain_concept_id: ConceptId;
}

/**
 * Domain creation request
 */
@doc("Request body for creating a new Domain record")
model DomainCreate {
  @doc("The name describing the Domain, e.g. Condition, Procedure, Measurement etc.")
  @maxLength(255)
  domain_name: string;

  @doc("A Concept representing the Domain Concept the DOMAIN record belongs to. References CONCEPT table.")
  domain_concept_id: ConceptId;
}

/**
 * Domain update request
 */
@doc("Request body for updating an existing Domain record")
model DomainUpdate {
  @doc("The name describing the Domain, e.g. Condition, Procedure, Measurement etc.")
  domain_name?: string;

  @doc("A Concept representing the Domain Concept the DOMAIN record belongs to. References CONCEPT table.")
  domain_concept_id?: ConceptId;
}

/**
 * Query parameters for filtering domain
 */
@doc("Filter parameters for Domain list operations")
model DomainQueryParams {
  ...PaginationParams;

  @doc("Filter by domain concept id")
  @query
  domain_concept_id?: ConceptId;

  @doc("Sort field")
  @query
  sort_by?: "id";

  @doc("Sort order")
  @query
  sort_order?: SortOrder;
}

/**
 * Domain API operations
 */
@route("/domains")
@tag("Vocabulary - Domains")
interface Domains {
  @get
  @summary("List all domains")
  @doc("Returns a paginated list of Domain records.")
  list(
    ...DomainQueryParams,
  ): {
    @statusCode statusCode: 200;
    @body body: PaginatedList<Domain>;
  } | ErrorResponse;

  @get
  @summary("Get domain by ID")
  @doc("Retrieve a single Domain record by its unique identifier.")
  read(
    @path
    @doc("Unique domain identifier")
    id: string,
  ): {
    @statusCode statusCode: 200;
    @body body: Domain;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @post
  @summary("Create a new domain")
  @doc("Create a new Domain record.")
  create(
    @body
    @doc("Domain data to create")
    record: DomainCreate,
  ): {
    @statusCode statusCode: 201;
    @body body: Domain;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @put
  @summary("Update domain (full replacement)")
  @doc("Replace all fields of an existing Domain record.")
  update(
    @path
    @doc("Unique domain identifier")
    id: string,

    @body
    @doc("Complete domain data")
    record: DomainCreate,
  ): {
    @statusCode statusCode: 200;
    @body body: Domain;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @patch(#{implicitOptionality: true})
  @summary("Update domain (partial)")
  @doc("Update specific fields of an existing Domain record.")
  patch(
    @path
    @doc("Unique domain identifier")
    id: string,

    @body
    @doc("Fields to update")
    record: DomainUpdate,
  ): {
    @statusCode statusCode: 200;
    @body body: Domain;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @delete
  @summary("Delete domain")
  @doc("Delete a Domain record.")
  delete(
    @path
    @doc("Unique domain identifier")
    id: string,
  ): {
    @statusCode statusCode: 204;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;
}
