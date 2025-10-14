import "@typespec/http";
import "@typespec/rest";
import "@typespec/openapi3";

// Import common models
import "./tsp/common/models.tsp";

// Import clinical data resources
import "./tsp/clinical/person.tsp";
import "./tsp/clinical/observation-period.tsp";
import "./tsp/clinical/visit-occurrence.tsp";
import "./tsp/clinical/visit-detail.tsp";
import "./tsp/clinical/condition-occurrence.tsp";
import "./tsp/clinical/drug-exposure.tsp";
import "./tsp/clinical/procedure-occurrence.tsp";
import "./tsp/clinical/device-exposure.tsp";
import "./tsp/clinical/measurement.tsp";
import "./tsp/clinical/observation.tsp";
import "./tsp/clinical/death.tsp";
import "./tsp/clinical/note.tsp";
import "./tsp/clinical/note-nlp.tsp";
import "./tsp/clinical/specimen.tsp";

// Import health system resources
import "./tsp/health-system/location.tsp";
import "./tsp/health-system/care-site.tsp";
import "./tsp/health-system/provider.tsp";
import "./tsp/health-system/payer-plan-period.tsp";
import "./tsp/health-system/cost.tsp";

// Import derived element resources
import "./tsp/derived/drug-era.tsp";
import "./tsp/derived/dose-era.tsp";
import "./tsp/derived/condition-era.tsp";
import "./tsp/derived/episode.tsp";
import "./tsp/derived/episode-event.tsp";

// Import metadata resources
import "./tsp/metadata/metadata.tsp";
import "./tsp/metadata/cdm-source.tsp";

// Import vocabulary resources
import "./tsp/vocabulary/concept.tsp";
import "./tsp/vocabulary/vocabulary.tsp";
import "./tsp/vocabulary/domain.tsp";
import "./tsp/vocabulary/concept-class.tsp";
import "./tsp/vocabulary/concept-relationship.tsp";
import "./tsp/vocabulary/relationship.tsp";
import "./tsp/vocabulary/concept-synonym.tsp";
import "./tsp/vocabulary/concept-ancestor.tsp";
import "./tsp/vocabulary/source-to-concept-map.tsp";
import "./tsp/vocabulary/drug-strength.tsp";

// Import results resources
import "./tsp/results/cohort.tsp";
import "./tsp/results/cohort-definition.tsp";
import "./tsp/results/fact-relationship.tsp";

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
@service(#{ title: "OMOP CDM v5.4 API" })
@server("https://api.example.com", "Production server")
@useAuth(BearerAuth)
namespace OmopCdm;
