import "@typespec/http";
import "@typespec/rest";
import "@typespec/openapi3";

// Import common models
import "./common/models.tsp";

// Import clinical data resources
import "./clinical/person.tsp";
import "./clinical/observation-period.tsp";
import "./clinical/visit-occurrence.tsp";
import "./clinical/visit-detail.tsp";
import "./clinical/condition-occurrence.tsp";
import "./clinical/drug-exposure.tsp";
import "./clinical/procedure-occurrence.tsp";
import "./clinical/device-exposure.tsp";
import "./clinical/measurement.tsp";
import "./clinical/observation.tsp";
import "./clinical/death.tsp";
import "./clinical/note.tsp";
import "./clinical/note-nlp.tsp";
import "./clinical/specimen.tsp";

// Import health system resources
import "./health-system/location.tsp";
import "./health-system/care-site.tsp";
import "./health-system/provider.tsp";
import "./health-system/payer-plan-period.tsp";
import "./health-system/cost.tsp";

// Import derived element resources
import "./derived/drug-era.tsp";
import "./derived/dose-era.tsp";
import "./derived/condition-era.tsp";
import "./derived/episode.tsp";
import "./derived/episode-event.tsp";

// Import metadata resources
import "./metadata/metadata.tsp";
import "./metadata/cdm-source.tsp";

// Import vocabulary resources
import "./vocabulary/concept.tsp";
import "./vocabulary/vocabulary.tsp";
import "./vocabulary/domain.tsp";
import "./vocabulary/concept-class.tsp";
import "./vocabulary/concept-relationship.tsp";
import "./vocabulary/relationship.tsp";
import "./vocabulary/concept-synonym.tsp";
import "./vocabulary/concept-ancestor.tsp";
import "./vocabulary/source-to-concept-map.tsp";
import "./vocabulary/drug-strength.tsp";

// Import results resources
import "./results/cohort.tsp";
import "./results/cohort-definition.tsp";
import "./results/fact-relationship.tsp";

using TypeSpec.Http;
using TypeSpec.Rest;
using TypeSpec.OpenAPI;

/**
 * OMOP Common Data Model (CDM) v5.4 RESTful API
 *
 * This API provides programmatic access to the OMOP Common Data Model v5.4,
 * which is a standardized data model for organizing and storing observational
 * health data. The OMOP CDM enables systematic analysis of disparate
 * observational databases and is the foundation for the OHDSI collaborative.
 *
 * The API is organized into the following resource groups:
 * - Clinical Data: Person-level clinical observations and events
 * - Health System: Infrastructure and organizational entities
 * - Derived Elements: Computed eras and episodes
 * - Vocabulary: Standardized medical terminologies and concepts
 * - Metadata: Information about the CDM instance
 * - Results: Cohort definitions and analysis results
 *
 * For more information about the OMOP CDM, visit:
 * https://github.com/OHDSI/CommonDataModel
 */
@service(#{
  title: "OMOP CDM v5.4 API",
})
@server("https://api.example.com", "Production server")
@useAuth(BearerAuth)
namespace OmopCdm;
