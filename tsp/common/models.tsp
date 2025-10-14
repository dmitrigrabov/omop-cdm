import "@typespec/http";
import "@typespec/rest";
import "@typespec/openapi3";

using TypeSpec.Http;
using TypeSpec.Rest;
using TypeSpec.OpenAPI;

namespace OmopCdm.Common;

/**
 * Standard pagination parameters for list operations
 */
@doc("Pagination parameters for list requests")
model PaginationParams {
  @doc("Number of items to skip (default: 0)")
  @query
  offset?: int32 = 0;

  @doc("Maximum number of items to return (default: 100, max: 1000)")
  @query
  @minValue(1)
  @maxValue(1000)
  limit?: int32 = 100;
}

/**
 * Pagination metadata in responses
 */
@doc("Pagination information in list responses")
model PaginationInfo {
  @doc("Total number of items available")
  total: int64;

  @doc("Number of items skipped")
  offset: int32;

  @doc("Maximum number of items in this response")
  limit: int32;

  @doc("Number of items in this response")
  count: int32;
}

/**
 * Standard paginated list response wrapper
 */
@doc("Generic paginated list response")
model PaginatedList<T> {
  @doc("Array of items")
  data: T[];

  @doc("Pagination information")
  pagination: PaginationInfo;
}

/**
 * Sorting parameters
 */
@doc("Sort order for list operations")
enum SortOrder {
  @doc("Ascending order")
  asc: "asc",

  @doc("Descending order")
  desc: "desc",
}

/**
 * Standard error response
 */
@doc("Error response")
@error
model ErrorResponse {
  @doc("HTTP status code")
  code: int32;

  @doc("Error message")
  message: string;

  @doc("Detailed error information")
  details?: string;

  @doc("Validation errors (if applicable)")
  validation?: ValidationError[];
}

/**
 * Validation error details
 */
@doc("Validation error for a specific field")
model ValidationError {
  @doc("Field name that failed validation")
  field: string;

  @doc("Validation error message")
  message: string;

  @doc("Rejected value")
  rejectedValue?: string;
}

/**
 * Standard success response for operations
 */
@doc("Success response")
model SuccessResponse {
  @doc("Success message")
  message: string;

  @doc("Additional metadata")
  metadata?: Record<string>;
}

/**
 * Common OMOP CDM types
 */

@doc("OMOP Concept ID - references the CONCEPT table")
scalar ConceptId extends int32;

@doc("Date in YYYY-MM-DD format")
scalar DateOnly extends string;

@doc("DateTime in ISO 8601 format")
scalar DateTime extends string;

@doc("Time in HH:MM:SS format")
scalar TimeOnly extends string;

/**
 * Common filter parameters for querying
 */
@doc("Date range filter")
model DateRangeFilter {
  @doc("Start date (inclusive)")
  @query("start_date")
  startDate?: DateOnly;

  @doc("End date (inclusive)")
  @query("end_date")
  endDate?: DateOnly;
}

/**
 * Batch operation request
 */
@doc("Batch operation request to create or update multiple records")
model BatchRequest<T> {
  @doc("Array of items to process")
  items: T[];
}

/**
 * Batch operation response
 */
@doc("Batch operation response")
model BatchResponse<T> {
  @doc("Successfully processed items")
  succeeded: T[];

  @doc("Failed items with error details")
  failed: BatchError[];

  @doc("Summary of the batch operation")
  summary: {
    @doc("Total number of items in the batch")
    total: int32;

    @doc("Number of successfully processed items")
    succeeded: int32;

    @doc("Number of failed items")
    failed: int32;
  };
}

/**
 * Batch error for individual items
 */
@doc("Error information for a failed batch item")
model BatchError {
  @doc("Index of the failed item in the original batch")
  index: int32;

  @doc("Error message")
  message: string;

  @doc("The item that failed")
  item: Record<string>;
}

/**
 * Metadata about the API response
 */
@doc("Response metadata")
model ResponseMetadata {
  @doc("Timestamp when the response was generated")
  timestamp: DateTime;

  @doc("API version")
  version: string;

  @doc("Request ID for tracking")
  requestId?: string;
}
