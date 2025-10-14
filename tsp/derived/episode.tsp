import "@typespec/http";
import "@typespec/rest";
import "../common/models.tsp";

using TypeSpec.Http;
using TypeSpec.Rest;
using OmopCdm.Common;

namespace OmopCdm.Derived;

/**
 * Episode Resource
 *
 * The EPISODE table aggregates lower-level clinical events
(VISIT_OCCURRENCE, DRUG_EXPOSURE, PROCEDURE_OCCURRENCE, DEVICE_EXPOSURE)
into a higher-level abstraction representing clinically and analytically
relevant disease phases,outcomes and treatments. The EPISODE_EVENT table
connects qualifying clinical events (VISIT_OCCURRENCE, DRUG_EXPOSURE,
PROCEDURE_OCCURRENCE, DEVICE_EXPOSURE) to the appropriate EPISODE entry.
For example cancers including their development over time, their
treatment, and final resolution.
 *
 * **User Guide**: Valid Episode Concepts belong to the ‘Episode’ domain. For cancer
episodes please see [article], for non-cancer episodes please see
[article]. If your source data does not have all episodes that are
relevant to the therapeutic area, write only those you can easily derive
from the data. It is understood that that table is not currently
expected to be comprehensive.
 *
 * **ETL Conventions**: NA
 */

@doc("Episode record in the OMOP CDM")
@example(#{
  episode_id: 12345,
  person_id: 100,
  episode_concept_id: 8507,
  episode_start_date: "2023-01-15",
  episode_start_datetime: "2023-01-15",
  episode_end_date: "2023-01-15",
  episode_end_datetime: "2023-01-15",
  episode_parent_id: 100,
  episode_number: 100,
  episode_object_concept_id: 8507,
  episode_type_concept_id: 8507,
  episode_source_value: "Example value",
  episode_source_concept_id: 8507
})
model Episode {
  @doc("A unique identifier for each Episode.")
  episode_id: int64;

  @doc("The PERSON_ID of the PERSON for whom the episode is recorded. References PERSON table.")
  person_id: int64;

  @doc("The EPISODE_CONCEPT_ID represents the kind abstraction related to the disease phase, outcome or treatment. ETL Convention: Choose a concept in the Episode domain that best represents the ongoing disease phase, outcome, or treatment. Please see [article] for cancers and [article] for non-cancers describing how these are defined. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Episode&page=1&pageSize=15&query=) References CONCEPT table.")
  episode_concept_id: ConceptId;

  @doc("The date when the Episode beings. ETL Convention: Please see [article] for how to define an Episode start date.")
  episode_start_date: DateOnly;

  @doc("The date and time when the Episode begins.")
  episode_start_datetime?: DateTime;

  @doc("The date when the instance of the Episode is considered to have ended. ETL Convention: Please see [article] for how to define an Episode end date.")
  episode_end_date?: DateOnly;

  @doc("The date when the instance of the Episode is considered to have ended.")
  episode_end_datetime?: DateTime;

  @doc("Use this field to find the Episode that subsumes the given Episode record. This is used in the case that an Episode are nested into each other. ETL Convention: If there are multiple nested levels to how Episodes are represented, the EPISODE_PARENT_ID can be used to record this relationship.")
  episode_parent_id?: int64;

  @doc("For sequences of episodes, this is used to indicate the order the episodes occurred. For example, lines of treatment could be indicated here. ETL Convention: Please see [article] for the details of how to count episodes.")
  episode_number?: int64;

  @doc("A Standard Concept representing the disease phase, outcome, or other abstraction of which the episode consists. For example, if the EPISODE_CONCEPT_ID is [treatment regimen](https://athena.ohdsi.org/search-terms/terms/32531) then the EPISODE_OBJECT_CONCEPT_ID should contain the chemotherapy regimen concept, like [Afatinib monotherapy](https://athena.ohdsi.org/search-terms/terms/35804392). ETL Convention: Episode entries from the ‘Disease Episode’ concept class should have an episode_object_concept_id that comes from the Condition domain. Episode entries from the ‘Treatment Episode’ concept class should have an episode_object_concept_id that scome from the ‘Procedure’ domain or ‘Regimen’ concept class. References CONCEPT table.")
  episode_object_concept_id: ConceptId;

  @doc("This field can be used to determine the provenance of the Episode record, as in whether the episode was from an EHR system, insurance claim, registry, or other sources. ETL Convention: Choose the EPISODE_TYPE_CONCEPT_ID that best represents the provenance of the record. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Type+Concept&standardConcept=Standard&page=1&pageSize=15&query=). A more detailed explanation of each Type Concept can be found on the [vocabulary wiki](https://github.com/OHDSI/Vocabulary-v5.0/wiki/Vocab.-TYPE_CONCEPT). References CONCEPT table.")
  episode_type_concept_id: ConceptId;

  @doc("The source code for the Episode as it appears in the source data. This code is mapped to a Standard Condition Concept in the Standardized Vocabularies and the original code is stored here for reference.")
  @maxLength(50)
  episode_source_value?: string;

  @doc("A foreign key to a Episode Concept that refers to the code used in the source. ETL Convention: Given that the Episodes are user-defined it is unlikely that there will be a Source Concept available. If that is the case then set this field to zero. References CONCEPT table.")
  episode_source_concept_id?: ConceptId;
}

/**
 * Episode creation request
 */
@doc("Request body for creating a new Episode record")
model EpisodeCreate {
  @doc("The PERSON_ID of the PERSON for whom the episode is recorded. References PERSON table.")
  person_id: int64;

  @doc("The EPISODE_CONCEPT_ID represents the kind abstraction related to the disease phase, outcome or treatment. ETL Convention: Choose a concept in the Episode domain that best represents the ongoing disease phase, outcome, or treatment. Please see [article] for cancers and [article] for non-cancers describing how these are defined. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Episode&page=1&pageSize=15&query=) References CONCEPT table.")
  episode_concept_id: ConceptId;

  @doc("The date when the Episode beings. ETL Convention: Please see [article] for how to define an Episode start date.")
  episode_start_date: DateOnly;

  @doc("The date and time when the Episode begins.")
  episode_start_datetime?: DateTime;

  @doc("The date when the instance of the Episode is considered to have ended. ETL Convention: Please see [article] for how to define an Episode end date.")
  episode_end_date?: DateOnly;

  @doc("The date when the instance of the Episode is considered to have ended.")
  episode_end_datetime?: DateTime;

  @doc("Use this field to find the Episode that subsumes the given Episode record. This is used in the case that an Episode are nested into each other. ETL Convention: If there are multiple nested levels to how Episodes are represented, the EPISODE_PARENT_ID can be used to record this relationship.")
  episode_parent_id?: int64;

  @doc("For sequences of episodes, this is used to indicate the order the episodes occurred. For example, lines of treatment could be indicated here. ETL Convention: Please see [article] for the details of how to count episodes.")
  episode_number?: int64;

  @doc("A Standard Concept representing the disease phase, outcome, or other abstraction of which the episode consists. For example, if the EPISODE_CONCEPT_ID is [treatment regimen](https://athena.ohdsi.org/search-terms/terms/32531) then the EPISODE_OBJECT_CONCEPT_ID should contain the chemotherapy regimen concept, like [Afatinib monotherapy](https://athena.ohdsi.org/search-terms/terms/35804392). ETL Convention: Episode entries from the ‘Disease Episode’ concept class should have an episode_object_concept_id that comes from the Condition domain. Episode entries from the ‘Treatment Episode’ concept class should have an episode_object_concept_id that scome from the ‘Procedure’ domain or ‘Regimen’ concept class. References CONCEPT table.")
  episode_object_concept_id: ConceptId;

  @doc("This field can be used to determine the provenance of the Episode record, as in whether the episode was from an EHR system, insurance claim, registry, or other sources. ETL Convention: Choose the EPISODE_TYPE_CONCEPT_ID that best represents the provenance of the record. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Type+Concept&standardConcept=Standard&page=1&pageSize=15&query=). A more detailed explanation of each Type Concept can be found on the [vocabulary wiki](https://github.com/OHDSI/Vocabulary-v5.0/wiki/Vocab.-TYPE_CONCEPT). References CONCEPT table.")
  episode_type_concept_id: ConceptId;

  @doc("The source code for the Episode as it appears in the source data. This code is mapped to a Standard Condition Concept in the Standardized Vocabularies and the original code is stored here for reference.")
  @maxLength(50)
  episode_source_value?: string;

  @doc("A foreign key to a Episode Concept that refers to the code used in the source. ETL Convention: Given that the Episodes are user-defined it is unlikely that there will be a Source Concept available. If that is the case then set this field to zero. References CONCEPT table.")
  episode_source_concept_id?: ConceptId;
}

/**
 * Episode update request
 */
@doc("Request body for updating an existing Episode record")
model EpisodeUpdate {
  @doc("The PERSON_ID of the PERSON for whom the episode is recorded. References PERSON table.")
  person_id?: int64;

  @doc("The EPISODE_CONCEPT_ID represents the kind abstraction related to the disease phase, outcome or treatment. ETL Convention: Choose a concept in the Episode domain that best represents the ongoing disease phase, outcome, or treatment. Please see [article] for cancers and [article] for non-cancers describing how these are defined. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Episode&page=1&pageSize=15&query=) References CONCEPT table.")
  episode_concept_id?: ConceptId;

  @doc("The date when the Episode beings. ETL Convention: Please see [article] for how to define an Episode start date.")
  episode_start_date?: DateOnly;

  @doc("The date and time when the Episode begins.")
  episode_start_datetime?: DateTime;

  @doc("The date when the instance of the Episode is considered to have ended. ETL Convention: Please see [article] for how to define an Episode end date.")
  episode_end_date?: DateOnly;

  @doc("The date when the instance of the Episode is considered to have ended.")
  episode_end_datetime?: DateTime;

  @doc("Use this field to find the Episode that subsumes the given Episode record. This is used in the case that an Episode are nested into each other. ETL Convention: If there are multiple nested levels to how Episodes are represented, the EPISODE_PARENT_ID can be used to record this relationship.")
  episode_parent_id?: int64;

  @doc("For sequences of episodes, this is used to indicate the order the episodes occurred. For example, lines of treatment could be indicated here. ETL Convention: Please see [article] for the details of how to count episodes.")
  episode_number?: int64;

  @doc("A Standard Concept representing the disease phase, outcome, or other abstraction of which the episode consists. For example, if the EPISODE_CONCEPT_ID is [treatment regimen](https://athena.ohdsi.org/search-terms/terms/32531) then the EPISODE_OBJECT_CONCEPT_ID should contain the chemotherapy regimen concept, like [Afatinib monotherapy](https://athena.ohdsi.org/search-terms/terms/35804392). ETL Convention: Episode entries from the ‘Disease Episode’ concept class should have an episode_object_concept_id that comes from the Condition domain. Episode entries from the ‘Treatment Episode’ concept class should have an episode_object_concept_id that scome from the ‘Procedure’ domain or ‘Regimen’ concept class. References CONCEPT table.")
  episode_object_concept_id?: ConceptId;

  @doc("This field can be used to determine the provenance of the Episode record, as in whether the episode was from an EHR system, insurance claim, registry, or other sources. ETL Convention: Choose the EPISODE_TYPE_CONCEPT_ID that best represents the provenance of the record. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?domain=Type+Concept&standardConcept=Standard&page=1&pageSize=15&query=). A more detailed explanation of each Type Concept can be found on the [vocabulary wiki](https://github.com/OHDSI/Vocabulary-v5.0/wiki/Vocab.-TYPE_CONCEPT). References CONCEPT table.")
  episode_type_concept_id?: ConceptId;

  @doc("The source code for the Episode as it appears in the source data. This code is mapped to a Standard Condition Concept in the Standardized Vocabularies and the original code is stored here for reference.")
  episode_source_value?: string;

  @doc("A foreign key to a Episode Concept that refers to the code used in the source. ETL Convention: Given that the Episodes are user-defined it is unlikely that there will be a Source Concept available. If that is the case then set this field to zero. References CONCEPT table.")
  episode_source_concept_id?: ConceptId;
}

/**
 * Query parameters for filtering episode
 */
@doc("Filter parameters for Episode list operations")
model EpisodeQueryParams {
  ...PaginationParams;

  @doc("Filter by person id")
  @query
  person_id?: int64;

  @doc("Filter by episode concept id")
  @query
  episode_concept_id?: ConceptId;

  @doc("Filter by episode object concept id")
  @query
  episode_object_concept_id?: ConceptId;

  @doc("Filter by episode type concept id")
  @query
  episode_type_concept_id?: ConceptId;

  @doc("Filter by episode source concept id")
  @query
  episode_source_concept_id?: ConceptId;

  @doc("Sort field")
  @query
  sort_by?: "episode_id";

  @doc("Sort order")
  @query
  sort_order?: SortOrder;
}

/**
 * Episode API operations
 */
@route("/episodes")
@tag("Derived - Episodes")
interface Episodes {
  @get
  @summary("List all episodes")
  @doc("Returns a paginated list of Episode records.")
  list(
    ...EpisodeQueryParams,
  ): {
    @statusCode statusCode: 200;
    @body body: PaginatedList<Episode>;
  } | ErrorResponse;

  @get
  @summary("Get episode by ID")
  @doc("Retrieve a single Episode record by its unique identifier.")
  read(
    @path
    @doc("Unique episode identifier")
    episode_id: int64,
  ): {
    @statusCode statusCode: 200;
    @body body: Episode;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @post
  @summary("Create a new episode")
  @doc("Create a new Episode record.")
  create(
    @body
    @doc("Episode data to create")
    record: EpisodeCreate,
  ): {
    @statusCode statusCode: 201;
    @body body: Episode;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @put
  @summary("Update episode (full replacement)")
  @doc("Replace all fields of an existing Episode record.")
  update(
    @path
    @doc("Unique episode identifier")
    episode_id: int64,

    @body
    @doc("Complete episode data")
    record: EpisodeCreate,
  ): {
    @statusCode statusCode: 200;
    @body body: Episode;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @patch(#{implicitOptionality: true})
  @summary("Update episode (partial)")
  @doc("Update specific fields of an existing Episode record.")
  patch(
    @path
    @doc("Unique episode identifier")
    episode_id: int64,

    @body
    @doc("Fields to update")
    record: EpisodeUpdate,
  ): {
    @statusCode statusCode: 200;
    @body body: Episode;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @delete
  @summary("Delete episode")
  @doc("Delete a Episode record.")
  delete(
    @path
    @doc("Unique episode identifier")
    episode_id: int64,
  ): {
    @statusCode statusCode: 204;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;
}
