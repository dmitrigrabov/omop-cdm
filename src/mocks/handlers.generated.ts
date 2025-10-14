import { HealthsystemCareSite } from '@/types/healthsystemCareSite.generated.ts'
import { http, HttpResponse } from 'msw'
import { HealthsystemCareSiteCreate } from '@/types/healthsystemCareSiteCreate.generated.ts'
import { HealthsystemCareSiteUpdate } from '@/types/healthsystemCareSiteUpdate.generated.ts'
import { MetadataCdmSource } from '@/types/metadataCdmSource.generated.ts'
import { MetadataCdmSourceCreate } from '@/types/metadataCdmSourceCreate.generated.ts'
import { MetadataCdmSourceUpdate } from '@/types/metadataCdmSourceUpdate.generated.ts'
import { ResultsCohortDefinition } from '@/types/resultsCohortDefinition.generated.ts'
import { ResultsCohortDefinitionCreate } from '@/types/resultsCohortDefinitionCreate.generated.ts'
import { ResultsCohortDefinitionUpdate } from '@/types/resultsCohortDefinitionUpdate.generated.ts'
import { ResultsCohort } from '@/types/resultsCohort.generated.ts'
import { ResultsCohortCreate } from '@/types/resultsCohortCreate.generated.ts'
import { ResultsCohortUpdate } from '@/types/resultsCohortUpdate.generated.ts'
import { VocabularyConceptAncestor } from '@/types/vocabularyConceptAncestor.generated.ts'
import { VocabularyConceptAncestorCreate } from '@/types/vocabularyConceptAncestorCreate.generated.ts'
import { VocabularyConceptAncestorUpdate } from '@/types/vocabularyConceptAncestorUpdate.generated.ts'
import { VocabularyConceptClass } from '@/types/vocabularyConceptClass.generated.ts'
import { VocabularyConceptClassCreate } from '@/types/vocabularyConceptClassCreate.generated.ts'
import { VocabularyConceptClassUpdate } from '@/types/vocabularyConceptClassUpdate.generated.ts'
import { VocabularyConceptRelationship } from '@/types/vocabularyConceptRelationship.generated.ts'
import { VocabularyConceptRelationshipCreate } from '@/types/vocabularyConceptRelationshipCreate.generated.ts'
import { VocabularyConceptRelationshipUpdate } from '@/types/vocabularyConceptRelationshipUpdate.generated.ts'
import { VocabularyConceptSynonym } from '@/types/vocabularyConceptSynonym.generated.ts'
import { VocabularyConceptSynonymCreate } from '@/types/vocabularyConceptSynonymCreate.generated.ts'
import { VocabularyConceptSynonymUpdate } from '@/types/vocabularyConceptSynonymUpdate.generated.ts'
import { VocabularyConcept } from '@/types/vocabularyConcept.generated.ts'
import { VocabularyConceptCreate } from '@/types/vocabularyConceptCreate.generated.ts'
import { VocabularyConceptUpdate } from '@/types/vocabularyConceptUpdate.generated.ts'
import { DerivedConditionEra } from '@/types/derivedConditionEra.generated.ts'
import { DerivedConditionEraCreate } from '@/types/derivedConditionEraCreate.generated.ts'
import { DerivedConditionEraUpdate } from '@/types/derivedConditionEraUpdate.generated.ts'
import { ClinicalConditionOccurrence } from '@/types/clinicalConditionOccurrence.generated.ts'
import { ClinicalConditionOccurrenceCreate } from '@/types/clinicalConditionOccurrenceCreate.generated.ts'
import { ClinicalConditionOccurrenceUpdate } from '@/types/clinicalConditionOccurrenceUpdate.generated.ts'
import { HealthsystemCost } from '@/types/healthsystemCost.generated.ts'
import { HealthsystemCostCreate } from '@/types/healthsystemCostCreate.generated.ts'
import { HealthsystemCostUpdate } from '@/types/healthsystemCostUpdate.generated.ts'
import { ClinicalDeath } from '@/types/clinicalDeath.generated.ts'
import { ClinicalDeathCreate } from '@/types/clinicalDeathCreate.generated.ts'
import { ClinicalDeathUpdate } from '@/types/clinicalDeathUpdate.generated.ts'
import { ClinicalDeviceExposure } from '@/types/clinicalDeviceExposure.generated.ts'
import { ClinicalDeviceExposureCreate } from '@/types/clinicalDeviceExposureCreate.generated.ts'
import { ClinicalDeviceExposureUpdate } from '@/types/clinicalDeviceExposureUpdate.generated.ts'
import { VocabularyDomain } from '@/types/vocabularyDomain.generated.ts'
import { VocabularyDomainCreate } from '@/types/vocabularyDomainCreate.generated.ts'
import { VocabularyDomainUpdate } from '@/types/vocabularyDomainUpdate.generated.ts'
import { DerivedDoseEra } from '@/types/derivedDoseEra.generated.ts'
import { DerivedDoseEraCreate } from '@/types/derivedDoseEraCreate.generated.ts'
import { DerivedDoseEraUpdate } from '@/types/derivedDoseEraUpdate.generated.ts'
import { DerivedDrugEra } from '@/types/derivedDrugEra.generated.ts'
import { DerivedDrugEraCreate } from '@/types/derivedDrugEraCreate.generated.ts'
import { DerivedDrugEraUpdate } from '@/types/derivedDrugEraUpdate.generated.ts'
import { ClinicalDrugExposure } from '@/types/clinicalDrugExposure.generated.ts'
import { ClinicalDrugExposureCreate } from '@/types/clinicalDrugExposureCreate.generated.ts'
import { ClinicalDrugExposureUpdate } from '@/types/clinicalDrugExposureUpdate.generated.ts'
import { VocabularyDrugStrength } from '@/types/vocabularyDrugStrength.generated.ts'
import { VocabularyDrugStrengthCreate } from '@/types/vocabularyDrugStrengthCreate.generated.ts'
import { VocabularyDrugStrengthUpdate } from '@/types/vocabularyDrugStrengthUpdate.generated.ts'
import { DerivedEpisodeEvent } from '@/types/derivedEpisodeEvent.generated.ts'
import { DerivedEpisodeEventCreate } from '@/types/derivedEpisodeEventCreate.generated.ts'
import { DerivedEpisodeEventUpdate } from '@/types/derivedEpisodeEventUpdate.generated.ts'
import { DerivedEpisode } from '@/types/derivedEpisode.generated.ts'
import { DerivedEpisodeCreate } from '@/types/derivedEpisodeCreate.generated.ts'
import { DerivedEpisodeUpdate } from '@/types/derivedEpisodeUpdate.generated.ts'
import { ResultsFactRelationship } from '@/types/resultsFactRelationship.generated.ts'
import { ResultsFactRelationshipCreate } from '@/types/resultsFactRelationshipCreate.generated.ts'
import { ResultsFactRelationshipUpdate } from '@/types/resultsFactRelationshipUpdate.generated.ts'
import { HealthsystemLocation } from '@/types/healthsystemLocation.generated.ts'
import { HealthsystemLocationCreate } from '@/types/healthsystemLocationCreate.generated.ts'
import { HealthsystemLocationUpdate } from '@/types/healthsystemLocationUpdate.generated.ts'
import { ClinicalMeasurement } from '@/types/clinicalMeasurement.generated.ts'
import { ClinicalMeasurementCreate } from '@/types/clinicalMeasurementCreate.generated.ts'
import { ClinicalMeasurementUpdate } from '@/types/clinicalMeasurementUpdate.generated.ts'
import { MetadataMetadata } from '@/types/metadataMetadata.generated.ts'
import { MetadataMetadataCreate } from '@/types/metadataMetadataCreate.generated.ts'
import { MetadataMetadataUpdate } from '@/types/metadataMetadataUpdate.generated.ts'
import { ClinicalNoteNlp } from '@/types/clinicalNoteNlp.generated.ts'
import { ClinicalNoteNlpCreate } from '@/types/clinicalNoteNlpCreate.generated.ts'
import { ClinicalNoteNlpUpdate } from '@/types/clinicalNoteNlpUpdate.generated.ts'
import { ClinicalNote } from '@/types/clinicalNote.generated.ts'
import { ClinicalNoteCreate } from '@/types/clinicalNoteCreate.generated.ts'
import { ClinicalNoteUpdate } from '@/types/clinicalNoteUpdate.generated.ts'
import { ClinicalObservationPeriod } from '@/types/clinicalObservationPeriod.generated.ts'
import { ClinicalObservationPeriodCreate } from '@/types/clinicalObservationPeriodCreate.generated.ts'
import { ClinicalObservationPeriodUpdate } from '@/types/clinicalObservationPeriodUpdate.generated.ts'
import { ClinicalObservation } from '@/types/clinicalObservation.generated.ts'
import { ClinicalObservationCreate } from '@/types/clinicalObservationCreate.generated.ts'
import { ClinicalObservationUpdate } from '@/types/clinicalObservationUpdate.generated.ts'
import { HealthsystemPayerPlanPeriod } from '@/types/healthsystemPayerPlanPeriod.generated.ts'
import { HealthsystemPayerPlanPeriodCreate } from '@/types/healthsystemPayerPlanPeriodCreate.generated.ts'
import { HealthsystemPayerPlanPeriodUpdate } from '@/types/healthsystemPayerPlanPeriodUpdate.generated.ts'
import { ClinicalPerson } from '@/types/clinicalPerson.generated.ts'
import { ClinicalPersonCreate } from '@/types/clinicalPersonCreate.generated.ts'
import { ClinicalPersonUpdate } from '@/types/clinicalPersonUpdate.generated.ts'
import { ClinicalProcedureOccurrence } from '@/types/clinicalProcedureOccurrence.generated.ts'
import { ClinicalProcedureOccurrenceCreate } from '@/types/clinicalProcedureOccurrenceCreate.generated.ts'
import { ClinicalProcedureOccurrenceUpdate } from '@/types/clinicalProcedureOccurrenceUpdate.generated.ts'
import { HealthsystemProvider } from '@/types/healthsystemProvider.generated.ts'
import { HealthsystemProviderCreate } from '@/types/healthsystemProviderCreate.generated.ts'
import { HealthsystemProviderUpdate } from '@/types/healthsystemProviderUpdate.generated.ts'
import { VocabularyRelationship } from '@/types/vocabularyRelationship.generated.ts'
import { VocabularyRelationshipCreate } from '@/types/vocabularyRelationshipCreate.generated.ts'
import { VocabularyRelationshipUpdate } from '@/types/vocabularyRelationshipUpdate.generated.ts'
import { VocabularySourceToConceptMap } from '@/types/vocabularySourceToConceptMap.generated.ts'
import { VocabularySourceToConceptMapCreate } from '@/types/vocabularySourceToConceptMapCreate.generated.ts'
import { VocabularySourceToConceptMapUpdate } from '@/types/vocabularySourceToConceptMapUpdate.generated.ts'
import { ClinicalSpecimen } from '@/types/clinicalSpecimen.generated.ts'
import { ClinicalSpecimenCreate } from '@/types/clinicalSpecimenCreate.generated.ts'
import { ClinicalSpecimenUpdate } from '@/types/clinicalSpecimenUpdate.generated.ts'
import { ClinicalVisitDetail } from '@/types/clinicalVisitDetail.generated.ts'
import { ClinicalVisitDetailCreate } from '@/types/clinicalVisitDetailCreate.generated.ts'
import { ClinicalVisitDetailUpdate } from '@/types/clinicalVisitDetailUpdate.generated.ts'
import { ClinicalVisitOccurrence } from '@/types/clinicalVisitOccurrence.generated.ts'
import { ClinicalVisitOccurrenceCreate } from '@/types/clinicalVisitOccurrenceCreate.generated.ts'
import { ClinicalVisitOccurrenceUpdate } from '@/types/clinicalVisitOccurrenceUpdate.generated.ts'
import { VocabularyVocabulary } from '@/types/vocabularyVocabulary.generated.ts'
import { VocabularyVocabularyCreate } from '@/types/vocabularyVocabularyCreate.generated.ts'
import { VocabularyVocabularyUpdate } from '@/types/vocabularyVocabularyUpdate.generated.ts'

export const getCareSitesHandler = http.get<
  never,
  never,
  {
    data: Array<HealthsystemCareSite>
    pagination: { total: number; offset: number; limit: number; count: number }
  }
>('/care-sites', () => {
  return HttpResponse.json({
    data: [
      {
        care_site_id: 12345,
        care_site_name: 'Example value',
        place_of_service_concept_id: 8507,
        location_id: 100,
        care_site_source_value: 'Example value',
        place_of_service_source_value: 'Example value',
      },
    ],
  })
})

export const toRoutesList = () => [
  getCareSitesHandler,
  postCareSitesHandler,
  getCareSitesCareSiteIdHandler,
  putCareSitesCareSiteIdHandler,
  patchCareSitesCareSiteIdHandler,
  deleteCareSitesCareSiteIdHandler,
  getCdmSourcesHandler,
  postCdmSourcesHandler,
  getCdmSourcesCdmSourceIdHandler,
  putCdmSourcesCdmSourceIdHandler,
  patchCdmSourcesCdmSourceIdHandler,
  deleteCdmSourcesCdmSourceIdHandler,
  getCohortDefinitionsHandler,
  postCohortDefinitionsHandler,
  getCohortDefinitionsCohortDefinitionIdHandler,
  putCohortDefinitionsCohortDefinitionIdHandler,
  patchCohortDefinitionsCohortDefinitionIdHandler,
  deleteCohortDefinitionsCohortDefinitionIdHandler,
  getCohortsHandler,
  postCohortsHandler,
  getCohortsCohortIdHandler,
  putCohortsCohortIdHandler,
  patchCohortsCohortIdHandler,
  deleteCohortsCohortIdHandler,
  getConceptAncestorsHandler,
  postConceptAncestorsHandler,
  getConceptAncestorsConceptAncestorIdHandler,
  putConceptAncestorsConceptAncestorIdHandler,
  patchConceptAncestorsConceptAncestorIdHandler,
  deleteConceptAncestorsConceptAncestorIdHandler,
  getConceptClasssHandler,
  postConceptClasssHandler,
  getConceptClasssConceptClassIdHandler,
  putConceptClasssConceptClassIdHandler,
  patchConceptClasssConceptClassIdHandler,
  deleteConceptClasssConceptClassIdHandler,
  getConceptRelationshipsHandler,
  postConceptRelationshipsHandler,
  getConceptRelationshipsConceptRelationshipIdHandler,
  putConceptRelationshipsConceptRelationshipIdHandler,
  patchConceptRelationshipsConceptRelationshipIdHandler,
  deleteConceptRelationshipsConceptRelationshipIdHandler,
  getConceptSynonymsHandler,
  postConceptSynonymsHandler,
  getConceptSynonymsConceptSynonymIdHandler,
  putConceptSynonymsConceptSynonymIdHandler,
  patchConceptSynonymsConceptSynonymIdHandler,
  deleteConceptSynonymsConceptSynonymIdHandler,
  getConceptsHandler,
  postConceptsHandler,
  getConceptsConceptIdHandler,
  putConceptsConceptIdHandler,
  patchConceptsConceptIdHandler,
  deleteConceptsConceptIdHandler,
  getConditionErasHandler,
  postConditionErasHandler,
  getConditionErasConditionEraIdHandler,
  putConditionErasConditionEraIdHandler,
  patchConditionErasConditionEraIdHandler,
  deleteConditionErasConditionEraIdHandler,
  getConditionOccurrencesHandler,
  postConditionOccurrencesHandler,
  getConditionOccurrencesConditionOccurrenceIdHandler,
  putConditionOccurrencesConditionOccurrenceIdHandler,
  patchConditionOccurrencesConditionOccurrenceIdHandler,
  deleteConditionOccurrencesConditionOccurrenceIdHandler,
  getCostsHandler,
  postCostsHandler,
  getCostsCostIdHandler,
  putCostsCostIdHandler,
  patchCostsCostIdHandler,
  deleteCostsCostIdHandler,
  getDeathsHandler,
  postDeathsHandler,
  getDeathsDeathIdHandler,
  putDeathsDeathIdHandler,
  patchDeathsDeathIdHandler,
  deleteDeathsDeathIdHandler,
  getDeviceExposuresHandler,
  postDeviceExposuresHandler,
  getDeviceExposuresDeviceExposureIdHandler,
  putDeviceExposuresDeviceExposureIdHandler,
  patchDeviceExposuresDeviceExposureIdHandler,
  deleteDeviceExposuresDeviceExposureIdHandler,
  getDomainsHandler,
  postDomainsHandler,
  getDomainsDomainIdHandler,
  putDomainsDomainIdHandler,
  patchDomainsDomainIdHandler,
  deleteDomainsDomainIdHandler,
  getDoseErasHandler,
  postDoseErasHandler,
  getDoseErasDoseEraIdHandler,
  putDoseErasDoseEraIdHandler,
  patchDoseErasDoseEraIdHandler,
  deleteDoseErasDoseEraIdHandler,
  getDrugErasHandler,
  postDrugErasHandler,
  getDrugErasDrugEraIdHandler,
  putDrugErasDrugEraIdHandler,
  patchDrugErasDrugEraIdHandler,
  deleteDrugErasDrugEraIdHandler,
  getDrugExposuresHandler,
  postDrugExposuresHandler,
  getDrugExposuresDrugExposureIdHandler,
  putDrugExposuresDrugExposureIdHandler,
  patchDrugExposuresDrugExposureIdHandler,
  deleteDrugExposuresDrugExposureIdHandler,
  getDrugStrengthsHandler,
  postDrugStrengthsHandler,
  getDrugStrengthsDrugStrengthIdHandler,
  putDrugStrengthsDrugStrengthIdHandler,
  patchDrugStrengthsDrugStrengthIdHandler,
  deleteDrugStrengthsDrugStrengthIdHandler,
  getEpisodeEventsHandler,
  postEpisodeEventsHandler,
  getEpisodeEventsEpisodeEventIdHandler,
  putEpisodeEventsEpisodeEventIdHandler,
  patchEpisodeEventsEpisodeEventIdHandler,
  deleteEpisodeEventsEpisodeEventIdHandler,
  getEpisodesHandler,
  postEpisodesHandler,
  getEpisodesEpisodeIdHandler,
  putEpisodesEpisodeIdHandler,
  patchEpisodesEpisodeIdHandler,
  deleteEpisodesEpisodeIdHandler,
  getFactRelationshipsHandler,
  postFactRelationshipsHandler,
  getFactRelationshipsFactRelationshipIdHandler,
  putFactRelationshipsFactRelationshipIdHandler,
  patchFactRelationshipsFactRelationshipIdHandler,
  deleteFactRelationshipsFactRelationshipIdHandler,
  getLocationsHandler,
  postLocationsHandler,
  getLocationsLocationIdHandler,
  putLocationsLocationIdHandler,
  patchLocationsLocationIdHandler,
  deleteLocationsLocationIdHandler,
  getMeasurementsHandler,
  postMeasurementsHandler,
  getMeasurementsMeasurementIdHandler,
  putMeasurementsMeasurementIdHandler,
  patchMeasurementsMeasurementIdHandler,
  deleteMeasurementsMeasurementIdHandler,
  getMetadatasHandler,
  postMetadatasHandler,
  getMetadatasMetadataIdHandler,
  putMetadatasMetadataIdHandler,
  patchMetadatasMetadataIdHandler,
  deleteMetadatasMetadataIdHandler,
  getNoteNlpsHandler,
  postNoteNlpsHandler,
  getNoteNlpsNoteNlpIdHandler,
  putNoteNlpsNoteNlpIdHandler,
  patchNoteNlpsNoteNlpIdHandler,
  deleteNoteNlpsNoteNlpIdHandler,
  getNotesHandler,
  postNotesHandler,
  getNotesNoteIdHandler,
  putNotesNoteIdHandler,
  patchNotesNoteIdHandler,
  deleteNotesNoteIdHandler,
  getObservationPeriodsHandler,
  postObservationPeriodsHandler,
  getObservationPeriodsObservationPeriodIdHandler,
  putObservationPeriodsObservationPeriodIdHandler,
  patchObservationPeriodsObservationPeriodIdHandler,
  deleteObservationPeriodsObservationPeriodIdHandler,
  getObservationsHandler,
  postObservationsHandler,
  getObservationsObservationIdHandler,
  putObservationsObservationIdHandler,
  patchObservationsObservationIdHandler,
  deleteObservationsObservationIdHandler,
  getPayerPlanPeriodsHandler,
  postPayerPlanPeriodsHandler,
  getPayerPlanPeriodsPayerPlanPeriodIdHandler,
  putPayerPlanPeriodsPayerPlanPeriodIdHandler,
  patchPayerPlanPeriodsPayerPlanPeriodIdHandler,
  deletePayerPlanPeriodsPayerPlanPeriodIdHandler,
  getPersonsHandler,
  postPersonsHandler,
  getPersonsPersonIdHandler,
  putPersonsPersonIdHandler,
  patchPersonsPersonIdHandler,
  deletePersonsPersonIdHandler,
  getProcedureOccurrencesHandler,
  postProcedureOccurrencesHandler,
  getProcedureOccurrencesProcedureOccurrenceIdHandler,
  putProcedureOccurrencesProcedureOccurrenceIdHandler,
  patchProcedureOccurrencesProcedureOccurrenceIdHandler,
  deleteProcedureOccurrencesProcedureOccurrenceIdHandler,
  getProvidersHandler,
  postProvidersHandler,
  getProvidersProviderIdHandler,
  putProvidersProviderIdHandler,
  patchProvidersProviderIdHandler,
  deleteProvidersProviderIdHandler,
  getRelationshipsHandler,
  postRelationshipsHandler,
  getRelationshipsRelationshipIdHandler,
  putRelationshipsRelationshipIdHandler,
  patchRelationshipsRelationshipIdHandler,
  deleteRelationshipsRelationshipIdHandler,
  getSourceToConceptMapsHandler,
  postSourceToConceptMapsHandler,
  getSourceToConceptMapsSourceToConceptMapIdHandler,
  putSourceToConceptMapsSourceToConceptMapIdHandler,
  patchSourceToConceptMapsSourceToConceptMapIdHandler,
  deleteSourceToConceptMapsSourceToConceptMapIdHandler,
  getSpecimensHandler,
  postSpecimensHandler,
  getSpecimensSpecimenIdHandler,
  putSpecimensSpecimenIdHandler,
  patchSpecimensSpecimenIdHandler,
  deleteSpecimensSpecimenIdHandler,
  getVisitDetailsHandler,
  postVisitDetailsHandler,
  getVisitDetailsVisitDetailIdHandler,
  putVisitDetailsVisitDetailIdHandler,
  patchVisitDetailsVisitDetailIdHandler,
  deleteVisitDetailsVisitDetailIdHandler,
  getVisitOccurrencesHandler,
  postVisitOccurrencesHandler,
  getVisitOccurrencesVisitOccurrenceIdHandler,
  putVisitOccurrencesVisitOccurrenceIdHandler,
  patchVisitOccurrencesVisitOccurrenceIdHandler,
  deleteVisitOccurrencesVisitOccurrenceIdHandler,
  getVocabularysHandler,
  postVocabularysHandler,
  getVocabularysVocabularyIdHandler,
  putVocabularysVocabularyIdHandler,
  patchVocabularysVocabularyIdHandler,
  deleteVocabularysVocabularyIdHandler,
]

export const postCareSitesHandler = http.post<
  never,
  HealthsystemCareSiteCreate,
  HealthsystemCareSite
>('/care-sites', () => {
  return HttpResponse.json({
    care_site_id: 12345,
    care_site_name: 'Example value',
    place_of_service_concept_id: 8507,
    location_id: 100,
    care_site_source_value: 'Example value',
    place_of_service_source_value: 'Example value',
  })
})

export const getCareSitesCareSiteIdHandler = http.get<
  { care_site_id: number },
  never,
  HealthsystemCareSite
>('/care-sites/:care_site_id', () => {
  return HttpResponse.json({
    care_site_id: 12345,
    care_site_name: 'Example value',
    place_of_service_concept_id: 8507,
    location_id: 100,
    care_site_source_value: 'Example value',
    place_of_service_source_value: 'Example value',
  })
})

export const putCareSitesCareSiteIdHandler = http.put<
  { care_site_id: number },
  HealthsystemCareSiteCreate,
  HealthsystemCareSite
>('/care-sites/:care_site_id', () => {
  return HttpResponse.json({
    care_site_id: 12345,
    care_site_name: 'Example value',
    place_of_service_concept_id: 8507,
    location_id: 100,
    care_site_source_value: 'Example value',
    place_of_service_source_value: 'Example value',
  })
})

export const patchCareSitesCareSiteIdHandler = http.patch<
  { care_site_id: number },
  HealthsystemCareSiteUpdate,
  HealthsystemCareSite
>('/care-sites/:care_site_id', () => {
  return HttpResponse.json({
    care_site_id: 12345,
    care_site_name: 'Example value',
    place_of_service_concept_id: 8507,
    location_id: 100,
    care_site_source_value: 'Example value',
    place_of_service_source_value: 'Example value',
  })
})

export const deleteCareSitesCareSiteIdHandler = http.delete<
  { care_site_id: number },
  never,
  never
>('/care-sites/:care_site_id', () => {
  return HttpResponse.json(undefined)
})

export const getCdmSourcesHandler = http.get<
  never,
  never,
  {
    data: Array<MetadataCdmSource>
    pagination: { total: number; offset: number; limit: number; count: number }
  }
>('/cdm-sources', () => {
  return HttpResponse.json({
    data: [
      {
        cdm_source_name: 'Example value',
        cdm_source_abbreviation: 'Example value',
        cdm_holder: 'Example value',
        source_description: 'Example value',
        source_documentation_reference: 'Example value',
        cdm_etl_reference: 'Example value',
        source_release_date: '2023-01-15',
        cdm_release_date: '2023-01-15',
        cdm_version: 'Example value',
        cdm_version_concept_id: 8507,
        vocabulary_version: 'Example value',
      },
    ],
  })
})

export const postCdmSourcesHandler = http.post<
  never,
  MetadataCdmSourceCreate,
  MetadataCdmSource
>('/cdm-sources', () => {
  return HttpResponse.json({
    cdm_source_name: 'Example value',
    cdm_source_abbreviation: 'Example value',
    cdm_holder: 'Example value',
    source_description: 'Example value',
    source_documentation_reference: 'Example value',
    cdm_etl_reference: 'Example value',
    source_release_date: '2023-01-15',
    cdm_release_date: '2023-01-15',
    cdm_version: 'Example value',
    cdm_version_concept_id: 8507,
    vocabulary_version: 'Example value',
  })
})

export const getCdmSourcesCdmSourceIdHandler = http.get<
  { cdm_source_id: number },
  never,
  MetadataCdmSource
>('/cdm-sources/:cdm_source_id', () => {
  return HttpResponse.json({
    cdm_source_name: 'Example value',
    cdm_source_abbreviation: 'Example value',
    cdm_holder: 'Example value',
    source_description: 'Example value',
    source_documentation_reference: 'Example value',
    cdm_etl_reference: 'Example value',
    source_release_date: '2023-01-15',
    cdm_release_date: '2023-01-15',
    cdm_version: 'Example value',
    cdm_version_concept_id: 8507,
    vocabulary_version: 'Example value',
  })
})

export const putCdmSourcesCdmSourceIdHandler = http.put<
  { cdm_source_id: number },
  MetadataCdmSourceCreate,
  MetadataCdmSource
>('/cdm-sources/:cdm_source_id', () => {
  return HttpResponse.json({
    cdm_source_name: 'Example value',
    cdm_source_abbreviation: 'Example value',
    cdm_holder: 'Example value',
    source_description: 'Example value',
    source_documentation_reference: 'Example value',
    cdm_etl_reference: 'Example value',
    source_release_date: '2023-01-15',
    cdm_release_date: '2023-01-15',
    cdm_version: 'Example value',
    cdm_version_concept_id: 8507,
    vocabulary_version: 'Example value',
  })
})

export const patchCdmSourcesCdmSourceIdHandler = http.patch<
  { cdm_source_id: number },
  MetadataCdmSourceUpdate,
  MetadataCdmSource
>('/cdm-sources/:cdm_source_id', () => {
  return HttpResponse.json({
    cdm_source_name: 'Example value',
    cdm_source_abbreviation: 'Example value',
    cdm_holder: 'Example value',
    source_description: 'Example value',
    source_documentation_reference: 'Example value',
    cdm_etl_reference: 'Example value',
    source_release_date: '2023-01-15',
    cdm_release_date: '2023-01-15',
    cdm_version: 'Example value',
    cdm_version_concept_id: 8507,
    vocabulary_version: 'Example value',
  })
})

export const deleteCdmSourcesCdmSourceIdHandler = http.delete<
  { cdm_source_id: number },
  never,
  never
>('/cdm-sources/:cdm_source_id', () => {
  return HttpResponse.json(undefined)
})

export const getCohortDefinitionsHandler = http.get<
  never,
  never,
  {
    data: Array<ResultsCohortDefinition>
    pagination: { total: number; offset: number; limit: number; count: number }
  }
>('/cohort-definitions', () => {
  return HttpResponse.json({
    data: [
      {
        cohort_definition_id: 100,
        cohort_definition_name: 'Example value',
        cohort_definition_description: 'Example value',
        definition_type_concept_id: 8507,
        cohort_definition_syntax: 'Example value',
        subject_concept_id: 8507,
        cohort_initiation_date: '2023-01-15',
      },
    ],
  })
})

export const postCohortDefinitionsHandler = http.post<
  never,
  ResultsCohortDefinitionCreate,
  ResultsCohortDefinition
>('/cohort-definitions', () => {
  return HttpResponse.json({
    cohort_definition_id: 100,
    cohort_definition_name: 'Example value',
    cohort_definition_description: 'Example value',
    definition_type_concept_id: 8507,
    cohort_definition_syntax: 'Example value',
    subject_concept_id: 8507,
    cohort_initiation_date: '2023-01-15',
  })
})

export const getCohortDefinitionsCohortDefinitionIdHandler = http.get<
  { cohort_definition_id: number },
  never,
  ResultsCohortDefinition
>('/cohort-definitions/:cohort_definition_id', () => {
  return HttpResponse.json({
    cohort_definition_id: 100,
    cohort_definition_name: 'Example value',
    cohort_definition_description: 'Example value',
    definition_type_concept_id: 8507,
    cohort_definition_syntax: 'Example value',
    subject_concept_id: 8507,
    cohort_initiation_date: '2023-01-15',
  })
})

export const putCohortDefinitionsCohortDefinitionIdHandler = http.put<
  { cohort_definition_id: number },
  ResultsCohortDefinitionCreate,
  ResultsCohortDefinition
>('/cohort-definitions/:cohort_definition_id', () => {
  return HttpResponse.json({
    cohort_definition_id: 100,
    cohort_definition_name: 'Example value',
    cohort_definition_description: 'Example value',
    definition_type_concept_id: 8507,
    cohort_definition_syntax: 'Example value',
    subject_concept_id: 8507,
    cohort_initiation_date: '2023-01-15',
  })
})

export const patchCohortDefinitionsCohortDefinitionIdHandler = http.patch<
  { cohort_definition_id: number },
  ResultsCohortDefinitionUpdate,
  ResultsCohortDefinition
>('/cohort-definitions/:cohort_definition_id', () => {
  return HttpResponse.json({
    cohort_definition_id: 100,
    cohort_definition_name: 'Example value',
    cohort_definition_description: 'Example value',
    definition_type_concept_id: 8507,
    cohort_definition_syntax: 'Example value',
    subject_concept_id: 8507,
    cohort_initiation_date: '2023-01-15',
  })
})

export const deleteCohortDefinitionsCohortDefinitionIdHandler = http.delete<
  { cohort_definition_id: number },
  never,
  never
>('/cohort-definitions/:cohort_definition_id', () => {
  return HttpResponse.json(undefined)
})

export const getCohortsHandler = http.get<
  never,
  never,
  {
    data: Array<ResultsCohort>
    pagination: { total: number; offset: number; limit: number; count: number }
  }
>('/cohorts', () => {
  return HttpResponse.json({
    data: [
      {
        cohort_definition_id: 100,
        subject_id: 100,
        cohort_start_date: '2023-01-15',
        cohort_end_date: '2023-01-15',
      },
    ],
  })
})

export const postCohortsHandler = http.post<
  never,
  ResultsCohortCreate,
  ResultsCohort
>('/cohorts', () => {
  return HttpResponse.json({
    cohort_definition_id: 100,
    subject_id: 100,
    cohort_start_date: '2023-01-15',
    cohort_end_date: '2023-01-15',
  })
})

export const getCohortsCohortIdHandler = http.get<
  { cohort_id: number },
  never,
  ResultsCohort
>('/cohorts/:cohort_id', () => {
  return HttpResponse.json({
    cohort_definition_id: 100,
    subject_id: 100,
    cohort_start_date: '2023-01-15',
    cohort_end_date: '2023-01-15',
  })
})

export const putCohortsCohortIdHandler = http.put<
  { cohort_id: number },
  ResultsCohortCreate,
  ResultsCohort
>('/cohorts/:cohort_id', () => {
  return HttpResponse.json({
    cohort_definition_id: 100,
    subject_id: 100,
    cohort_start_date: '2023-01-15',
    cohort_end_date: '2023-01-15',
  })
})

export const patchCohortsCohortIdHandler = http.patch<
  { cohort_id: number },
  ResultsCohortUpdate,
  ResultsCohort
>('/cohorts/:cohort_id', () => {
  return HttpResponse.json({
    cohort_definition_id: 100,
    subject_id: 100,
    cohort_start_date: '2023-01-15',
    cohort_end_date: '2023-01-15',
  })
})

export const deleteCohortsCohortIdHandler = http.delete<
  { cohort_id: number },
  never,
  never
>('/cohorts/:cohort_id', () => {
  return HttpResponse.json(undefined)
})

export const getConceptAncestorsHandler = http.get<
  never,
  never,
  {
    data: Array<VocabularyConceptAncestor>
    pagination: { total: number; offset: number; limit: number; count: number }
  }
>('/concept-ancestors', () => {
  return HttpResponse.json({
    data: [
      {
        ancestor_concept_id: 8507,
        descendant_concept_id: 8507,
        min_levels_of_separation: 100,
        max_levels_of_separation: 100,
      },
    ],
  })
})

export const postConceptAncestorsHandler = http.post<
  never,
  VocabularyConceptAncestorCreate,
  VocabularyConceptAncestor
>('/concept-ancestors', () => {
  return HttpResponse.json({
    ancestor_concept_id: 8507,
    descendant_concept_id: 8507,
    min_levels_of_separation: 100,
    max_levels_of_separation: 100,
  })
})

export const getConceptAncestorsConceptAncestorIdHandler = http.get<
  { concept_ancestor_id: number },
  never,
  VocabularyConceptAncestor
>('/concept-ancestors/:concept_ancestor_id', () => {
  return HttpResponse.json({
    ancestor_concept_id: 8507,
    descendant_concept_id: 8507,
    min_levels_of_separation: 100,
    max_levels_of_separation: 100,
  })
})

export const putConceptAncestorsConceptAncestorIdHandler = http.put<
  { concept_ancestor_id: number },
  VocabularyConceptAncestorCreate,
  VocabularyConceptAncestor
>('/concept-ancestors/:concept_ancestor_id', () => {
  return HttpResponse.json({
    ancestor_concept_id: 8507,
    descendant_concept_id: 8507,
    min_levels_of_separation: 100,
    max_levels_of_separation: 100,
  })
})

export const patchConceptAncestorsConceptAncestorIdHandler = http.patch<
  { concept_ancestor_id: number },
  VocabularyConceptAncestorUpdate,
  VocabularyConceptAncestor
>('/concept-ancestors/:concept_ancestor_id', () => {
  return HttpResponse.json({
    ancestor_concept_id: 8507,
    descendant_concept_id: 8507,
    min_levels_of_separation: 100,
    max_levels_of_separation: 100,
  })
})

export const deleteConceptAncestorsConceptAncestorIdHandler = http.delete<
  { concept_ancestor_id: number },
  never,
  never
>('/concept-ancestors/:concept_ancestor_id', () => {
  return HttpResponse.json(undefined)
})

export const getConceptClasssHandler = http.get<
  never,
  never,
  {
    data: Array<VocabularyConceptClass>
    pagination: { total: number; offset: number; limit: number; count: number }
  }
>('/concept-classs', () => {
  return HttpResponse.json({
    data: [
      {
        concept_class_id: '12345',
        concept_class_name: 'Example value',
        concept_class_concept_id: 8507,
      },
    ],
  })
})

export const postConceptClasssHandler = http.post<
  never,
  VocabularyConceptClassCreate,
  VocabularyConceptClass
>('/concept-classs', () => {
  return HttpResponse.json({
    concept_class_id: '12345',
    concept_class_name: 'Example value',
    concept_class_concept_id: 8507,
  })
})

export const getConceptClasssConceptClassIdHandler = http.get<
  { concept_class_id: string },
  never,
  VocabularyConceptClass
>('/concept-classs/:concept_class_id', () => {
  return HttpResponse.json({
    concept_class_id: '12345',
    concept_class_name: 'Example value',
    concept_class_concept_id: 8507,
  })
})

export const putConceptClasssConceptClassIdHandler = http.put<
  { concept_class_id: string },
  VocabularyConceptClassCreate,
  VocabularyConceptClass
>('/concept-classs/:concept_class_id', () => {
  return HttpResponse.json({
    concept_class_id: '12345',
    concept_class_name: 'Example value',
    concept_class_concept_id: 8507,
  })
})

export const patchConceptClasssConceptClassIdHandler = http.patch<
  { concept_class_id: string },
  VocabularyConceptClassUpdate,
  VocabularyConceptClass
>('/concept-classs/:concept_class_id', () => {
  return HttpResponse.json({
    concept_class_id: '12345',
    concept_class_name: 'Example value',
    concept_class_concept_id: 8507,
  })
})

export const deleteConceptClasssConceptClassIdHandler = http.delete<
  { concept_class_id: string },
  never,
  never
>('/concept-classs/:concept_class_id', () => {
  return HttpResponse.json(undefined)
})

export const getConceptRelationshipsHandler = http.get<
  never,
  never,
  {
    data: Array<VocabularyConceptRelationship>
    pagination: { total: number; offset: number; limit: number; count: number }
  }
>('/concept-relationships', () => {
  return HttpResponse.json({
    data: [
      {
        relationship_id: 'Example value',
        valid_start_date: '2023-01-15',
        valid_end_date: '2023-01-15',
        invalid_reason: 'Example value',
      },
    ],
  })
})

export const postConceptRelationshipsHandler = http.post<
  never,
  VocabularyConceptRelationshipCreate,
  VocabularyConceptRelationship
>('/concept-relationships', () => {
  return HttpResponse.json({
    relationship_id: 'Example value',
    valid_start_date: '2023-01-15',
    valid_end_date: '2023-01-15',
    invalid_reason: 'Example value',
  })
})

export const getConceptRelationshipsConceptRelationshipIdHandler = http.get<
  { concept_relationship_id: number },
  never,
  VocabularyConceptRelationship
>('/concept-relationships/:concept_relationship_id', () => {
  return HttpResponse.json({
    relationship_id: 'Example value',
    valid_start_date: '2023-01-15',
    valid_end_date: '2023-01-15',
    invalid_reason: 'Example value',
  })
})

export const putConceptRelationshipsConceptRelationshipIdHandler = http.put<
  { concept_relationship_id: number },
  VocabularyConceptRelationshipCreate,
  VocabularyConceptRelationship
>('/concept-relationships/:concept_relationship_id', () => {
  return HttpResponse.json({
    relationship_id: 'Example value',
    valid_start_date: '2023-01-15',
    valid_end_date: '2023-01-15',
    invalid_reason: 'Example value',
  })
})

export const patchConceptRelationshipsConceptRelationshipIdHandler = http.patch<
  { concept_relationship_id: number },
  VocabularyConceptRelationshipUpdate,
  VocabularyConceptRelationship
>('/concept-relationships/:concept_relationship_id', () => {
  return HttpResponse.json({
    relationship_id: 'Example value',
    valid_start_date: '2023-01-15',
    valid_end_date: '2023-01-15',
    invalid_reason: 'Example value',
  })
})

export const deleteConceptRelationshipsConceptRelationshipIdHandler =
  http.delete<{ concept_relationship_id: number }, never, never>(
    '/concept-relationships/:concept_relationship_id',
    () => {
      return HttpResponse.json(undefined)
    },
  )

export const getConceptSynonymsHandler = http.get<
  never,
  never,
  {
    data: Array<VocabularyConceptSynonym>
    pagination: { total: number; offset: number; limit: number; count: number }
  }
>('/concept-synonyms', () => {
  return HttpResponse.json({
    data: [
      {
        concept_id: 8507,
        concept_synonym_name: 'Example value',
        language_concept_id: 8507,
      },
    ],
  })
})

export const postConceptSynonymsHandler = http.post<
  never,
  VocabularyConceptSynonymCreate,
  VocabularyConceptSynonym
>('/concept-synonyms', () => {
  return HttpResponse.json({
    concept_id: 8507,
    concept_synonym_name: 'Example value',
    language_concept_id: 8507,
  })
})

export const getConceptSynonymsConceptSynonymIdHandler = http.get<
  { concept_synonym_id: number },
  never,
  VocabularyConceptSynonym
>('/concept-synonyms/:concept_synonym_id', () => {
  return HttpResponse.json({
    concept_id: 8507,
    concept_synonym_name: 'Example value',
    language_concept_id: 8507,
  })
})

export const putConceptSynonymsConceptSynonymIdHandler = http.put<
  { concept_synonym_id: number },
  VocabularyConceptSynonymCreate,
  VocabularyConceptSynonym
>('/concept-synonyms/:concept_synonym_id', () => {
  return HttpResponse.json({
    concept_id: 8507,
    concept_synonym_name: 'Example value',
    language_concept_id: 8507,
  })
})

export const patchConceptSynonymsConceptSynonymIdHandler = http.patch<
  { concept_synonym_id: number },
  VocabularyConceptSynonymUpdate,
  VocabularyConceptSynonym
>('/concept-synonyms/:concept_synonym_id', () => {
  return HttpResponse.json({
    concept_id: 8507,
    concept_synonym_name: 'Example value',
    language_concept_id: 8507,
  })
})

export const deleteConceptSynonymsConceptSynonymIdHandler = http.delete<
  { concept_synonym_id: number },
  never,
  never
>('/concept-synonyms/:concept_synonym_id', () => {
  return HttpResponse.json(undefined)
})

export const getConceptsHandler = http.get<
  never,
  never,
  {
    data: Array<VocabularyConcept>
    pagination: { total: number; offset: number; limit: number; count: number }
  }
>('/concepts', () => {
  return HttpResponse.json({
    data: [
      {
        concept_id: 12345,
        concept_name: 'Example value',
        domain_id: 'Example value',
        vocabulary_id: 'Example value',
        concept_class_id: 'Example value',
        standard_concept: 'Example value',
        concept_code: 'Example value',
        valid_start_date: '2023-01-15',
        valid_end_date: '2023-01-15',
        invalid_reason: 'Example value',
      },
    ],
  })
})

export const postConceptsHandler = http.post<
  never,
  VocabularyConceptCreate,
  VocabularyConcept
>('/concepts', () => {
  return HttpResponse.json({
    concept_id: 12345,
    concept_name: 'Example value',
    domain_id: 'Example value',
    vocabulary_id: 'Example value',
    concept_class_id: 'Example value',
    standard_concept: 'Example value',
    concept_code: 'Example value',
    valid_start_date: '2023-01-15',
    valid_end_date: '2023-01-15',
    invalid_reason: 'Example value',
  })
})

export const getConceptsConceptIdHandler = http.get<
  { concept_id: number },
  never,
  VocabularyConcept
>('/concepts/:concept_id', () => {
  return HttpResponse.json({
    concept_id: 12345,
    concept_name: 'Example value',
    domain_id: 'Example value',
    vocabulary_id: 'Example value',
    concept_class_id: 'Example value',
    standard_concept: 'Example value',
    concept_code: 'Example value',
    valid_start_date: '2023-01-15',
    valid_end_date: '2023-01-15',
    invalid_reason: 'Example value',
  })
})

export const putConceptsConceptIdHandler = http.put<
  { concept_id: number },
  VocabularyConceptCreate,
  VocabularyConcept
>('/concepts/:concept_id', () => {
  return HttpResponse.json({
    concept_id: 12345,
    concept_name: 'Example value',
    domain_id: 'Example value',
    vocabulary_id: 'Example value',
    concept_class_id: 'Example value',
    standard_concept: 'Example value',
    concept_code: 'Example value',
    valid_start_date: '2023-01-15',
    valid_end_date: '2023-01-15',
    invalid_reason: 'Example value',
  })
})

export const patchConceptsConceptIdHandler = http.patch<
  { concept_id: number },
  VocabularyConceptUpdate,
  VocabularyConcept
>('/concepts/:concept_id', () => {
  return HttpResponse.json({
    concept_id: 12345,
    concept_name: 'Example value',
    domain_id: 'Example value',
    vocabulary_id: 'Example value',
    concept_class_id: 'Example value',
    standard_concept: 'Example value',
    concept_code: 'Example value',
    valid_start_date: '2023-01-15',
    valid_end_date: '2023-01-15',
    invalid_reason: 'Example value',
  })
})

export const deleteConceptsConceptIdHandler = http.delete<
  { concept_id: number },
  never,
  never
>('/concepts/:concept_id', () => {
  return HttpResponse.json(undefined)
})

export const getConditionErasHandler = http.get<
  never,
  never,
  {
    data: Array<DerivedConditionEra>
    pagination: { total: number; offset: number; limit: number; count: number }
  }
>('/condition-eras', () => {
  return HttpResponse.json({
    data: [
      {
        condition_era_id: 12345,
        person_id: 100,
        condition_concept_id: 8507,
        condition_era_start_date: '2023-01-15',
        condition_era_end_date: '2023-01-15',
        condition_occurrence_count: 100,
      },
    ],
  })
})

export const postConditionErasHandler = http.post<
  never,
  DerivedConditionEraCreate,
  DerivedConditionEra
>('/condition-eras', () => {
  return HttpResponse.json({
    condition_era_id: 12345,
    person_id: 100,
    condition_concept_id: 8507,
    condition_era_start_date: '2023-01-15',
    condition_era_end_date: '2023-01-15',
    condition_occurrence_count: 100,
  })
})

export const getConditionErasConditionEraIdHandler = http.get<
  { condition_era_id: number },
  never,
  DerivedConditionEra
>('/condition-eras/:condition_era_id', () => {
  return HttpResponse.json({
    condition_era_id: 12345,
    person_id: 100,
    condition_concept_id: 8507,
    condition_era_start_date: '2023-01-15',
    condition_era_end_date: '2023-01-15',
    condition_occurrence_count: 100,
  })
})

export const putConditionErasConditionEraIdHandler = http.put<
  { condition_era_id: number },
  DerivedConditionEraCreate,
  DerivedConditionEra
>('/condition-eras/:condition_era_id', () => {
  return HttpResponse.json({
    condition_era_id: 12345,
    person_id: 100,
    condition_concept_id: 8507,
    condition_era_start_date: '2023-01-15',
    condition_era_end_date: '2023-01-15',
    condition_occurrence_count: 100,
  })
})

export const patchConditionErasConditionEraIdHandler = http.patch<
  { condition_era_id: number },
  DerivedConditionEraUpdate,
  DerivedConditionEra
>('/condition-eras/:condition_era_id', () => {
  return HttpResponse.json({
    condition_era_id: 12345,
    person_id: 100,
    condition_concept_id: 8507,
    condition_era_start_date: '2023-01-15',
    condition_era_end_date: '2023-01-15',
    condition_occurrence_count: 100,
  })
})

export const deleteConditionErasConditionEraIdHandler = http.delete<
  { condition_era_id: number },
  never,
  never
>('/condition-eras/:condition_era_id', () => {
  return HttpResponse.json(undefined)
})

export const getConditionOccurrencesHandler = http.get<
  never,
  never,
  {
    data: Array<ClinicalConditionOccurrence>
    pagination: { total: number; offset: number; limit: number; count: number }
  }
>('/condition-occurrences', () => {
  return HttpResponse.json({
    data: [
      {
        condition_occurrence_id: 12345,
        person_id: 100,
        condition_concept_id: 8507,
        condition_start_date: '2023-01-15',
        condition_start_datetime: '2023-01-15',
        condition_end_date: '2023-01-15',
        condition_end_datetime: '2023-01-15',
        condition_type_concept_id: 8507,
        condition_status_concept_id: 8507,
        stop_reason: 'Example value',
        provider_id: 100,
        visit_occurrence_id: 100,
        visit_detail_id: 100,
        condition_source_value: 'Example value',
        condition_source_concept_id: 8507,
        condition_status_source_value: 'Example value',
      },
    ],
  })
})

export const postConditionOccurrencesHandler = http.post<
  never,
  ClinicalConditionOccurrenceCreate,
  ClinicalConditionOccurrence
>('/condition-occurrences', () => {
  return HttpResponse.json({
    condition_occurrence_id: 12345,
    person_id: 100,
    condition_concept_id: 8507,
    condition_start_date: '2023-01-15',
    condition_start_datetime: '2023-01-15',
    condition_end_date: '2023-01-15',
    condition_end_datetime: '2023-01-15',
    condition_type_concept_id: 8507,
    condition_status_concept_id: 8507,
    stop_reason: 'Example value',
    provider_id: 100,
    visit_occurrence_id: 100,
    visit_detail_id: 100,
    condition_source_value: 'Example value',
    condition_source_concept_id: 8507,
    condition_status_source_value: 'Example value',
  })
})

export const getConditionOccurrencesConditionOccurrenceIdHandler = http.get<
  { condition_occurrence_id: number },
  never,
  ClinicalConditionOccurrence
>('/condition-occurrences/:condition_occurrence_id', () => {
  return HttpResponse.json({
    condition_occurrence_id: 12345,
    person_id: 100,
    condition_concept_id: 8507,
    condition_start_date: '2023-01-15',
    condition_start_datetime: '2023-01-15',
    condition_end_date: '2023-01-15',
    condition_end_datetime: '2023-01-15',
    condition_type_concept_id: 8507,
    condition_status_concept_id: 8507,
    stop_reason: 'Example value',
    provider_id: 100,
    visit_occurrence_id: 100,
    visit_detail_id: 100,
    condition_source_value: 'Example value',
    condition_source_concept_id: 8507,
    condition_status_source_value: 'Example value',
  })
})

export const putConditionOccurrencesConditionOccurrenceIdHandler = http.put<
  { condition_occurrence_id: number },
  ClinicalConditionOccurrenceCreate,
  ClinicalConditionOccurrence
>('/condition-occurrences/:condition_occurrence_id', () => {
  return HttpResponse.json({
    condition_occurrence_id: 12345,
    person_id: 100,
    condition_concept_id: 8507,
    condition_start_date: '2023-01-15',
    condition_start_datetime: '2023-01-15',
    condition_end_date: '2023-01-15',
    condition_end_datetime: '2023-01-15',
    condition_type_concept_id: 8507,
    condition_status_concept_id: 8507,
    stop_reason: 'Example value',
    provider_id: 100,
    visit_occurrence_id: 100,
    visit_detail_id: 100,
    condition_source_value: 'Example value',
    condition_source_concept_id: 8507,
    condition_status_source_value: 'Example value',
  })
})

export const patchConditionOccurrencesConditionOccurrenceIdHandler = http.patch<
  { condition_occurrence_id: number },
  ClinicalConditionOccurrenceUpdate,
  ClinicalConditionOccurrence
>('/condition-occurrences/:condition_occurrence_id', () => {
  return HttpResponse.json({
    condition_occurrence_id: 12345,
    person_id: 100,
    condition_concept_id: 8507,
    condition_start_date: '2023-01-15',
    condition_start_datetime: '2023-01-15',
    condition_end_date: '2023-01-15',
    condition_end_datetime: '2023-01-15',
    condition_type_concept_id: 8507,
    condition_status_concept_id: 8507,
    stop_reason: 'Example value',
    provider_id: 100,
    visit_occurrence_id: 100,
    visit_detail_id: 100,
    condition_source_value: 'Example value',
    condition_source_concept_id: 8507,
    condition_status_source_value: 'Example value',
  })
})

export const deleteConditionOccurrencesConditionOccurrenceIdHandler =
  http.delete<{ condition_occurrence_id: number }, never, never>(
    '/condition-occurrences/:condition_occurrence_id',
    () => {
      return HttpResponse.json(undefined)
    },
  )

export const getCostsHandler = http.get<
  never,
  never,
  {
    data: Array<HealthsystemCost>
    pagination: { total: number; offset: number; limit: number; count: number }
  }
>('/costs', () => {
  return HttpResponse.json({
    data: [
      {
        cost_id: 12345,
        cost_event_id: 100,
        cost_domain_id: 'Example value',
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
        revenue_code_source_value: 'Example value',
        drg_concept_id: 8507,
        drg_source_value: 'Example value',
      },
    ],
  })
})

export const postCostsHandler = http.post<
  never,
  HealthsystemCostCreate,
  HealthsystemCost
>('/costs', () => {
  return HttpResponse.json({
    cost_id: 12345,
    cost_event_id: 100,
    cost_domain_id: 'Example value',
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
    revenue_code_source_value: 'Example value',
    drg_concept_id: 8507,
    drg_source_value: 'Example value',
  })
})

export const getCostsCostIdHandler = http.get<
  { cost_id: number },
  never,
  HealthsystemCost
>('/costs/:cost_id', () => {
  return HttpResponse.json({
    cost_id: 12345,
    cost_event_id: 100,
    cost_domain_id: 'Example value',
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
    revenue_code_source_value: 'Example value',
    drg_concept_id: 8507,
    drg_source_value: 'Example value',
  })
})

export const putCostsCostIdHandler = http.put<
  { cost_id: number },
  HealthsystemCostCreate,
  HealthsystemCost
>('/costs/:cost_id', () => {
  return HttpResponse.json({
    cost_id: 12345,
    cost_event_id: 100,
    cost_domain_id: 'Example value',
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
    revenue_code_source_value: 'Example value',
    drg_concept_id: 8507,
    drg_source_value: 'Example value',
  })
})

export const patchCostsCostIdHandler = http.patch<
  { cost_id: number },
  HealthsystemCostUpdate,
  HealthsystemCost
>('/costs/:cost_id', () => {
  return HttpResponse.json({
    cost_id: 12345,
    cost_event_id: 100,
    cost_domain_id: 'Example value',
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
    revenue_code_source_value: 'Example value',
    drg_concept_id: 8507,
    drg_source_value: 'Example value',
  })
})

export const deleteCostsCostIdHandler = http.delete<
  { cost_id: number },
  never,
  never
>('/costs/:cost_id', () => {
  return HttpResponse.json(undefined)
})

export const getDeathsHandler = http.get<
  never,
  never,
  {
    data: Array<ClinicalDeath>
    pagination: { total: number; offset: number; limit: number; count: number }
  }
>('/deaths', () => {
  return HttpResponse.json({
    data: [
      {
        person_id: 100,
        death_date: '2023-01-15',
        death_datetime: '2023-01-15',
        death_type_concept_id: 8507,
        cause_concept_id: 8507,
        cause_source_value: 'Example value',
        cause_source_concept_id: 8507,
      },
    ],
  })
})

export const postDeathsHandler = http.post<
  never,
  ClinicalDeathCreate,
  ClinicalDeath
>('/deaths', () => {
  return HttpResponse.json({
    person_id: 100,
    death_date: '2023-01-15',
    death_datetime: '2023-01-15',
    death_type_concept_id: 8507,
    cause_concept_id: 8507,
    cause_source_value: 'Example value',
    cause_source_concept_id: 8507,
  })
})

export const getDeathsDeathIdHandler = http.get<
  { death_id: number },
  never,
  ClinicalDeath
>('/deaths/:death_id', () => {
  return HttpResponse.json({
    person_id: 100,
    death_date: '2023-01-15',
    death_datetime: '2023-01-15',
    death_type_concept_id: 8507,
    cause_concept_id: 8507,
    cause_source_value: 'Example value',
    cause_source_concept_id: 8507,
  })
})

export const putDeathsDeathIdHandler = http.put<
  { death_id: number },
  ClinicalDeathCreate,
  ClinicalDeath
>('/deaths/:death_id', () => {
  return HttpResponse.json({
    person_id: 100,
    death_date: '2023-01-15',
    death_datetime: '2023-01-15',
    death_type_concept_id: 8507,
    cause_concept_id: 8507,
    cause_source_value: 'Example value',
    cause_source_concept_id: 8507,
  })
})

export const patchDeathsDeathIdHandler = http.patch<
  { death_id: number },
  ClinicalDeathUpdate,
  ClinicalDeath
>('/deaths/:death_id', () => {
  return HttpResponse.json({
    person_id: 100,
    death_date: '2023-01-15',
    death_datetime: '2023-01-15',
    death_type_concept_id: 8507,
    cause_concept_id: 8507,
    cause_source_value: 'Example value',
    cause_source_concept_id: 8507,
  })
})

export const deleteDeathsDeathIdHandler = http.delete<
  { death_id: number },
  never,
  never
>('/deaths/:death_id', () => {
  return HttpResponse.json(undefined)
})

export const getDeviceExposuresHandler = http.get<
  never,
  never,
  {
    data: Array<ClinicalDeviceExposure>
    pagination: { total: number; offset: number; limit: number; count: number }
  }
>('/device-exposures', () => {
  return HttpResponse.json({
    data: [
      {
        device_exposure_id: 12345,
        person_id: 100,
        device_concept_id: 8507,
        device_exposure_start_date: '2023-01-15',
        device_exposure_start_datetime: '2023-01-15',
        device_exposure_end_date: '2023-01-15',
        device_exposure_end_datetime: '2023-01-15',
        device_type_concept_id: 8507,
        unique_device_id: 'Example value',
        production_id: 'Example value',
        quantity: 100,
        provider_id: 100,
        visit_occurrence_id: 100,
        visit_detail_id: 100,
        device_source_value: 'Example value',
        device_source_concept_id: 8507,
        unit_concept_id: 8507,
        unit_source_value: 'Example value',
        unit_source_concept_id: 8507,
      },
    ],
  })
})

export const postDeviceExposuresHandler = http.post<
  never,
  ClinicalDeviceExposureCreate,
  ClinicalDeviceExposure
>('/device-exposures', () => {
  return HttpResponse.json({
    device_exposure_id: 12345,
    person_id: 100,
    device_concept_id: 8507,
    device_exposure_start_date: '2023-01-15',
    device_exposure_start_datetime: '2023-01-15',
    device_exposure_end_date: '2023-01-15',
    device_exposure_end_datetime: '2023-01-15',
    device_type_concept_id: 8507,
    unique_device_id: 'Example value',
    production_id: 'Example value',
    quantity: 100,
    provider_id: 100,
    visit_occurrence_id: 100,
    visit_detail_id: 100,
    device_source_value: 'Example value',
    device_source_concept_id: 8507,
    unit_concept_id: 8507,
    unit_source_value: 'Example value',
    unit_source_concept_id: 8507,
  })
})

export const getDeviceExposuresDeviceExposureIdHandler = http.get<
  { device_exposure_id: number },
  never,
  ClinicalDeviceExposure
>('/device-exposures/:device_exposure_id', () => {
  return HttpResponse.json({
    device_exposure_id: 12345,
    person_id: 100,
    device_concept_id: 8507,
    device_exposure_start_date: '2023-01-15',
    device_exposure_start_datetime: '2023-01-15',
    device_exposure_end_date: '2023-01-15',
    device_exposure_end_datetime: '2023-01-15',
    device_type_concept_id: 8507,
    unique_device_id: 'Example value',
    production_id: 'Example value',
    quantity: 100,
    provider_id: 100,
    visit_occurrence_id: 100,
    visit_detail_id: 100,
    device_source_value: 'Example value',
    device_source_concept_id: 8507,
    unit_concept_id: 8507,
    unit_source_value: 'Example value',
    unit_source_concept_id: 8507,
  })
})

export const putDeviceExposuresDeviceExposureIdHandler = http.put<
  { device_exposure_id: number },
  ClinicalDeviceExposureCreate,
  ClinicalDeviceExposure
>('/device-exposures/:device_exposure_id', () => {
  return HttpResponse.json({
    device_exposure_id: 12345,
    person_id: 100,
    device_concept_id: 8507,
    device_exposure_start_date: '2023-01-15',
    device_exposure_start_datetime: '2023-01-15',
    device_exposure_end_date: '2023-01-15',
    device_exposure_end_datetime: '2023-01-15',
    device_type_concept_id: 8507,
    unique_device_id: 'Example value',
    production_id: 'Example value',
    quantity: 100,
    provider_id: 100,
    visit_occurrence_id: 100,
    visit_detail_id: 100,
    device_source_value: 'Example value',
    device_source_concept_id: 8507,
    unit_concept_id: 8507,
    unit_source_value: 'Example value',
    unit_source_concept_id: 8507,
  })
})

export const patchDeviceExposuresDeviceExposureIdHandler = http.patch<
  { device_exposure_id: number },
  ClinicalDeviceExposureUpdate,
  ClinicalDeviceExposure
>('/device-exposures/:device_exposure_id', () => {
  return HttpResponse.json({
    device_exposure_id: 12345,
    person_id: 100,
    device_concept_id: 8507,
    device_exposure_start_date: '2023-01-15',
    device_exposure_start_datetime: '2023-01-15',
    device_exposure_end_date: '2023-01-15',
    device_exposure_end_datetime: '2023-01-15',
    device_type_concept_id: 8507,
    unique_device_id: 'Example value',
    production_id: 'Example value',
    quantity: 100,
    provider_id: 100,
    visit_occurrence_id: 100,
    visit_detail_id: 100,
    device_source_value: 'Example value',
    device_source_concept_id: 8507,
    unit_concept_id: 8507,
    unit_source_value: 'Example value',
    unit_source_concept_id: 8507,
  })
})

export const deleteDeviceExposuresDeviceExposureIdHandler = http.delete<
  { device_exposure_id: number },
  never,
  never
>('/device-exposures/:device_exposure_id', () => {
  return HttpResponse.json(undefined)
})

export const getDomainsHandler = http.get<
  never,
  never,
  {
    data: Array<VocabularyDomain>
    pagination: { total: number; offset: number; limit: number; count: number }
  }
>('/domains', () => {
  return HttpResponse.json({
    data: [
      {
        domain_id: '12345',
        domain_name: 'Example value',
        domain_concept_id: 8507,
      },
    ],
  })
})

export const postDomainsHandler = http.post<
  never,
  VocabularyDomainCreate,
  VocabularyDomain
>('/domains', () => {
  return HttpResponse.json({
    domain_id: '12345',
    domain_name: 'Example value',
    domain_concept_id: 8507,
  })
})

export const getDomainsDomainIdHandler = http.get<
  { domain_id: string },
  never,
  VocabularyDomain
>('/domains/:domain_id', () => {
  return HttpResponse.json({
    domain_id: '12345',
    domain_name: 'Example value',
    domain_concept_id: 8507,
  })
})

export const putDomainsDomainIdHandler = http.put<
  { domain_id: string },
  VocabularyDomainCreate,
  VocabularyDomain
>('/domains/:domain_id', () => {
  return HttpResponse.json({
    domain_id: '12345',
    domain_name: 'Example value',
    domain_concept_id: 8507,
  })
})

export const patchDomainsDomainIdHandler = http.patch<
  { domain_id: string },
  VocabularyDomainUpdate,
  VocabularyDomain
>('/domains/:domain_id', () => {
  return HttpResponse.json({
    domain_id: '12345',
    domain_name: 'Example value',
    domain_concept_id: 8507,
  })
})

export const deleteDomainsDomainIdHandler = http.delete<
  { domain_id: string },
  never,
  never
>('/domains/:domain_id', () => {
  return HttpResponse.json(undefined)
})

export const getDoseErasHandler = http.get<
  never,
  never,
  {
    data: Array<DerivedDoseEra>
    pagination: { total: number; offset: number; limit: number; count: number }
  }
>('/dose-eras', () => {
  return HttpResponse.json({
    data: [
      {
        dose_era_id: 12345,
        person_id: 100,
        drug_concept_id: 8507,
        unit_concept_id: 8507,
        dose_value: 98.6,
        dose_era_start_date: '2023-01-15',
        dose_era_end_date: '2023-01-15',
      },
    ],
  })
})

export const postDoseErasHandler = http.post<
  never,
  DerivedDoseEraCreate,
  DerivedDoseEra
>('/dose-eras', () => {
  return HttpResponse.json({
    dose_era_id: 12345,
    person_id: 100,
    drug_concept_id: 8507,
    unit_concept_id: 8507,
    dose_value: 98.6,
    dose_era_start_date: '2023-01-15',
    dose_era_end_date: '2023-01-15',
  })
})

export const getDoseErasDoseEraIdHandler = http.get<
  { dose_era_id: number },
  never,
  DerivedDoseEra
>('/dose-eras/:dose_era_id', () => {
  return HttpResponse.json({
    dose_era_id: 12345,
    person_id: 100,
    drug_concept_id: 8507,
    unit_concept_id: 8507,
    dose_value: 98.6,
    dose_era_start_date: '2023-01-15',
    dose_era_end_date: '2023-01-15',
  })
})

export const putDoseErasDoseEraIdHandler = http.put<
  { dose_era_id: number },
  DerivedDoseEraCreate,
  DerivedDoseEra
>('/dose-eras/:dose_era_id', () => {
  return HttpResponse.json({
    dose_era_id: 12345,
    person_id: 100,
    drug_concept_id: 8507,
    unit_concept_id: 8507,
    dose_value: 98.6,
    dose_era_start_date: '2023-01-15',
    dose_era_end_date: '2023-01-15',
  })
})

export const patchDoseErasDoseEraIdHandler = http.patch<
  { dose_era_id: number },
  DerivedDoseEraUpdate,
  DerivedDoseEra
>('/dose-eras/:dose_era_id', () => {
  return HttpResponse.json({
    dose_era_id: 12345,
    person_id: 100,
    drug_concept_id: 8507,
    unit_concept_id: 8507,
    dose_value: 98.6,
    dose_era_start_date: '2023-01-15',
    dose_era_end_date: '2023-01-15',
  })
})

export const deleteDoseErasDoseEraIdHandler = http.delete<
  { dose_era_id: number },
  never,
  never
>('/dose-eras/:dose_era_id', () => {
  return HttpResponse.json(undefined)
})

export const getDrugErasHandler = http.get<
  never,
  never,
  {
    data: Array<DerivedDrugEra>
    pagination: { total: number; offset: number; limit: number; count: number }
  }
>('/drug-eras', () => {
  return HttpResponse.json({
    data: [
      {
        drug_era_id: 12345,
        person_id: 100,
        drug_concept_id: 8507,
        drug_era_start_date: '2023-01-15',
        drug_era_end_date: '2023-01-15',
        drug_exposure_count: 100,
        gap_days: 100,
      },
    ],
  })
})

export const postDrugErasHandler = http.post<
  never,
  DerivedDrugEraCreate,
  DerivedDrugEra
>('/drug-eras', () => {
  return HttpResponse.json({
    drug_era_id: 12345,
    person_id: 100,
    drug_concept_id: 8507,
    drug_era_start_date: '2023-01-15',
    drug_era_end_date: '2023-01-15',
    drug_exposure_count: 100,
    gap_days: 100,
  })
})

export const getDrugErasDrugEraIdHandler = http.get<
  { drug_era_id: number },
  never,
  DerivedDrugEra
>('/drug-eras/:drug_era_id', () => {
  return HttpResponse.json({
    drug_era_id: 12345,
    person_id: 100,
    drug_concept_id: 8507,
    drug_era_start_date: '2023-01-15',
    drug_era_end_date: '2023-01-15',
    drug_exposure_count: 100,
    gap_days: 100,
  })
})

export const putDrugErasDrugEraIdHandler = http.put<
  { drug_era_id: number },
  DerivedDrugEraCreate,
  DerivedDrugEra
>('/drug-eras/:drug_era_id', () => {
  return HttpResponse.json({
    drug_era_id: 12345,
    person_id: 100,
    drug_concept_id: 8507,
    drug_era_start_date: '2023-01-15',
    drug_era_end_date: '2023-01-15',
    drug_exposure_count: 100,
    gap_days: 100,
  })
})

export const patchDrugErasDrugEraIdHandler = http.patch<
  { drug_era_id: number },
  DerivedDrugEraUpdate,
  DerivedDrugEra
>('/drug-eras/:drug_era_id', () => {
  return HttpResponse.json({
    drug_era_id: 12345,
    person_id: 100,
    drug_concept_id: 8507,
    drug_era_start_date: '2023-01-15',
    drug_era_end_date: '2023-01-15',
    drug_exposure_count: 100,
    gap_days: 100,
  })
})

export const deleteDrugErasDrugEraIdHandler = http.delete<
  { drug_era_id: number },
  never,
  never
>('/drug-eras/:drug_era_id', () => {
  return HttpResponse.json(undefined)
})

export const getDrugExposuresHandler = http.get<
  never,
  never,
  {
    data: Array<ClinicalDrugExposure>
    pagination: { total: number; offset: number; limit: number; count: number }
  }
>('/drug-exposures', () => {
  return HttpResponse.json({
    data: [
      {
        drug_exposure_id: 12345,
        person_id: 100,
        drug_concept_id: 8507,
        drug_exposure_start_date: '2023-01-15',
        drug_exposure_start_datetime: '2023-01-15',
        drug_exposure_end_date: '2023-01-15',
        drug_exposure_end_datetime: '2023-01-15',
        verbatim_end_date: '2023-01-15',
        drug_type_concept_id: 8507,
        stop_reason: 'Example value',
        refills: 100,
        quantity: 98.6,
        days_supply: 100,
        sig: 'Example value',
        route_concept_id: 8507,
        lot_number: 'Example value',
        provider_id: 100,
        visit_occurrence_id: 100,
        visit_detail_id: 100,
        drug_source_value: 'Example value',
        drug_source_concept_id: 8507,
        route_source_value: 'Example value',
        dose_unit_source_value: 'Example value',
      },
    ],
  })
})

export const postDrugExposuresHandler = http.post<
  never,
  ClinicalDrugExposureCreate,
  ClinicalDrugExposure
>('/drug-exposures', () => {
  return HttpResponse.json({
    drug_exposure_id: 12345,
    person_id: 100,
    drug_concept_id: 8507,
    drug_exposure_start_date: '2023-01-15',
    drug_exposure_start_datetime: '2023-01-15',
    drug_exposure_end_date: '2023-01-15',
    drug_exposure_end_datetime: '2023-01-15',
    verbatim_end_date: '2023-01-15',
    drug_type_concept_id: 8507,
    stop_reason: 'Example value',
    refills: 100,
    quantity: 98.6,
    days_supply: 100,
    sig: 'Example value',
    route_concept_id: 8507,
    lot_number: 'Example value',
    provider_id: 100,
    visit_occurrence_id: 100,
    visit_detail_id: 100,
    drug_source_value: 'Example value',
    drug_source_concept_id: 8507,
    route_source_value: 'Example value',
    dose_unit_source_value: 'Example value',
  })
})

export const getDrugExposuresDrugExposureIdHandler = http.get<
  { drug_exposure_id: number },
  never,
  ClinicalDrugExposure
>('/drug-exposures/:drug_exposure_id', () => {
  return HttpResponse.json({
    drug_exposure_id: 12345,
    person_id: 100,
    drug_concept_id: 8507,
    drug_exposure_start_date: '2023-01-15',
    drug_exposure_start_datetime: '2023-01-15',
    drug_exposure_end_date: '2023-01-15',
    drug_exposure_end_datetime: '2023-01-15',
    verbatim_end_date: '2023-01-15',
    drug_type_concept_id: 8507,
    stop_reason: 'Example value',
    refills: 100,
    quantity: 98.6,
    days_supply: 100,
    sig: 'Example value',
    route_concept_id: 8507,
    lot_number: 'Example value',
    provider_id: 100,
    visit_occurrence_id: 100,
    visit_detail_id: 100,
    drug_source_value: 'Example value',
    drug_source_concept_id: 8507,
    route_source_value: 'Example value',
    dose_unit_source_value: 'Example value',
  })
})

export const putDrugExposuresDrugExposureIdHandler = http.put<
  { drug_exposure_id: number },
  ClinicalDrugExposureCreate,
  ClinicalDrugExposure
>('/drug-exposures/:drug_exposure_id', () => {
  return HttpResponse.json({
    drug_exposure_id: 12345,
    person_id: 100,
    drug_concept_id: 8507,
    drug_exposure_start_date: '2023-01-15',
    drug_exposure_start_datetime: '2023-01-15',
    drug_exposure_end_date: '2023-01-15',
    drug_exposure_end_datetime: '2023-01-15',
    verbatim_end_date: '2023-01-15',
    drug_type_concept_id: 8507,
    stop_reason: 'Example value',
    refills: 100,
    quantity: 98.6,
    days_supply: 100,
    sig: 'Example value',
    route_concept_id: 8507,
    lot_number: 'Example value',
    provider_id: 100,
    visit_occurrence_id: 100,
    visit_detail_id: 100,
    drug_source_value: 'Example value',
    drug_source_concept_id: 8507,
    route_source_value: 'Example value',
    dose_unit_source_value: 'Example value',
  })
})

export const patchDrugExposuresDrugExposureIdHandler = http.patch<
  { drug_exposure_id: number },
  ClinicalDrugExposureUpdate,
  ClinicalDrugExposure
>('/drug-exposures/:drug_exposure_id', () => {
  return HttpResponse.json({
    drug_exposure_id: 12345,
    person_id: 100,
    drug_concept_id: 8507,
    drug_exposure_start_date: '2023-01-15',
    drug_exposure_start_datetime: '2023-01-15',
    drug_exposure_end_date: '2023-01-15',
    drug_exposure_end_datetime: '2023-01-15',
    verbatim_end_date: '2023-01-15',
    drug_type_concept_id: 8507,
    stop_reason: 'Example value',
    refills: 100,
    quantity: 98.6,
    days_supply: 100,
    sig: 'Example value',
    route_concept_id: 8507,
    lot_number: 'Example value',
    provider_id: 100,
    visit_occurrence_id: 100,
    visit_detail_id: 100,
    drug_source_value: 'Example value',
    drug_source_concept_id: 8507,
    route_source_value: 'Example value',
    dose_unit_source_value: 'Example value',
  })
})

export const deleteDrugExposuresDrugExposureIdHandler = http.delete<
  { drug_exposure_id: number },
  never,
  never
>('/drug-exposures/:drug_exposure_id', () => {
  return HttpResponse.json(undefined)
})

export const getDrugStrengthsHandler = http.get<
  never,
  never,
  {
    data: Array<VocabularyDrugStrength>
    pagination: { total: number; offset: number; limit: number; count: number }
  }
>('/drug-strengths', () => {
  return HttpResponse.json({
    data: [
      {
        drug_concept_id: 8507,
        ingredient_concept_id: 8507,
        amount_value: 98.6,
        amount_unit_concept_id: 8507,
        numerator_value: 98.6,
        numerator_unit_concept_id: 8507,
        denominator_value: 98.6,
        denominator_unit_concept_id: 8507,
        box_size: 100,
        valid_start_date: '2023-01-15',
        valid_end_date: '2023-01-15',
        invalid_reason: 'Example value',
      },
    ],
  })
})

export const postDrugStrengthsHandler = http.post<
  never,
  VocabularyDrugStrengthCreate,
  VocabularyDrugStrength
>('/drug-strengths', () => {
  return HttpResponse.json({
    drug_concept_id: 8507,
    ingredient_concept_id: 8507,
    amount_value: 98.6,
    amount_unit_concept_id: 8507,
    numerator_value: 98.6,
    numerator_unit_concept_id: 8507,
    denominator_value: 98.6,
    denominator_unit_concept_id: 8507,
    box_size: 100,
    valid_start_date: '2023-01-15',
    valid_end_date: '2023-01-15',
    invalid_reason: 'Example value',
  })
})

export const getDrugStrengthsDrugStrengthIdHandler = http.get<
  { drug_strength_id: number },
  never,
  VocabularyDrugStrength
>('/drug-strengths/:drug_strength_id', () => {
  return HttpResponse.json({
    drug_concept_id: 8507,
    ingredient_concept_id: 8507,
    amount_value: 98.6,
    amount_unit_concept_id: 8507,
    numerator_value: 98.6,
    numerator_unit_concept_id: 8507,
    denominator_value: 98.6,
    denominator_unit_concept_id: 8507,
    box_size: 100,
    valid_start_date: '2023-01-15',
    valid_end_date: '2023-01-15',
    invalid_reason: 'Example value',
  })
})

export const putDrugStrengthsDrugStrengthIdHandler = http.put<
  { drug_strength_id: number },
  VocabularyDrugStrengthCreate,
  VocabularyDrugStrength
>('/drug-strengths/:drug_strength_id', () => {
  return HttpResponse.json({
    drug_concept_id: 8507,
    ingredient_concept_id: 8507,
    amount_value: 98.6,
    amount_unit_concept_id: 8507,
    numerator_value: 98.6,
    numerator_unit_concept_id: 8507,
    denominator_value: 98.6,
    denominator_unit_concept_id: 8507,
    box_size: 100,
    valid_start_date: '2023-01-15',
    valid_end_date: '2023-01-15',
    invalid_reason: 'Example value',
  })
})

export const patchDrugStrengthsDrugStrengthIdHandler = http.patch<
  { drug_strength_id: number },
  VocabularyDrugStrengthUpdate,
  VocabularyDrugStrength
>('/drug-strengths/:drug_strength_id', () => {
  return HttpResponse.json({
    drug_concept_id: 8507,
    ingredient_concept_id: 8507,
    amount_value: 98.6,
    amount_unit_concept_id: 8507,
    numerator_value: 98.6,
    numerator_unit_concept_id: 8507,
    denominator_value: 98.6,
    denominator_unit_concept_id: 8507,
    box_size: 100,
    valid_start_date: '2023-01-15',
    valid_end_date: '2023-01-15',
    invalid_reason: 'Example value',
  })
})

export const deleteDrugStrengthsDrugStrengthIdHandler = http.delete<
  { drug_strength_id: number },
  never,
  never
>('/drug-strengths/:drug_strength_id', () => {
  return HttpResponse.json(undefined)
})

export const getEpisodeEventsHandler = http.get<
  never,
  never,
  {
    data: Array<DerivedEpisodeEvent>
    pagination: { total: number; offset: number; limit: number; count: number }
  }
>('/episode-events', () => {
  return HttpResponse.json({
    data: [
      {
        episode_id: 100,
        event_id: 100,
        episode_event_field_concept_id: 8507,
      },
    ],
  })
})

export const postEpisodeEventsHandler = http.post<
  never,
  DerivedEpisodeEventCreate,
  DerivedEpisodeEvent
>('/episode-events', () => {
  return HttpResponse.json({
    episode_id: 100,
    event_id: 100,
    episode_event_field_concept_id: 8507,
  })
})

export const getEpisodeEventsEpisodeEventIdHandler = http.get<
  { episode_event_id: number },
  never,
  DerivedEpisodeEvent
>('/episode-events/:episode_event_id', () => {
  return HttpResponse.json({
    episode_id: 100,
    event_id: 100,
    episode_event_field_concept_id: 8507,
  })
})

export const putEpisodeEventsEpisodeEventIdHandler = http.put<
  { episode_event_id: number },
  DerivedEpisodeEventCreate,
  DerivedEpisodeEvent
>('/episode-events/:episode_event_id', () => {
  return HttpResponse.json({
    episode_id: 100,
    event_id: 100,
    episode_event_field_concept_id: 8507,
  })
})

export const patchEpisodeEventsEpisodeEventIdHandler = http.patch<
  { episode_event_id: number },
  DerivedEpisodeEventUpdate,
  DerivedEpisodeEvent
>('/episode-events/:episode_event_id', () => {
  return HttpResponse.json({
    episode_id: 100,
    event_id: 100,
    episode_event_field_concept_id: 8507,
  })
})

export const deleteEpisodeEventsEpisodeEventIdHandler = http.delete<
  { episode_event_id: number },
  never,
  never
>('/episode-events/:episode_event_id', () => {
  return HttpResponse.json(undefined)
})

export const getEpisodesHandler = http.get<
  never,
  never,
  {
    data: Array<DerivedEpisode>
    pagination: { total: number; offset: number; limit: number; count: number }
  }
>('/episodes', () => {
  return HttpResponse.json({
    data: [
      {
        episode_id: 12345,
        person_id: 100,
        episode_concept_id: 8507,
        episode_start_date: '2023-01-15',
        episode_start_datetime: '2023-01-15',
        episode_end_date: '2023-01-15',
        episode_end_datetime: '2023-01-15',
        episode_parent_id: 100,
        episode_number: 100,
        episode_object_concept_id: 8507,
        episode_type_concept_id: 8507,
        episode_source_value: 'Example value',
        episode_source_concept_id: 8507,
      },
    ],
  })
})

export const postEpisodesHandler = http.post<
  never,
  DerivedEpisodeCreate,
  DerivedEpisode
>('/episodes', () => {
  return HttpResponse.json({
    episode_id: 12345,
    person_id: 100,
    episode_concept_id: 8507,
    episode_start_date: '2023-01-15',
    episode_start_datetime: '2023-01-15',
    episode_end_date: '2023-01-15',
    episode_end_datetime: '2023-01-15',
    episode_parent_id: 100,
    episode_number: 100,
    episode_object_concept_id: 8507,
    episode_type_concept_id: 8507,
    episode_source_value: 'Example value',
    episode_source_concept_id: 8507,
  })
})

export const getEpisodesEpisodeIdHandler = http.get<
  { episode_id: number },
  never,
  DerivedEpisode
>('/episodes/:episode_id', () => {
  return HttpResponse.json({
    episode_id: 12345,
    person_id: 100,
    episode_concept_id: 8507,
    episode_start_date: '2023-01-15',
    episode_start_datetime: '2023-01-15',
    episode_end_date: '2023-01-15',
    episode_end_datetime: '2023-01-15',
    episode_parent_id: 100,
    episode_number: 100,
    episode_object_concept_id: 8507,
    episode_type_concept_id: 8507,
    episode_source_value: 'Example value',
    episode_source_concept_id: 8507,
  })
})

export const putEpisodesEpisodeIdHandler = http.put<
  { episode_id: number },
  DerivedEpisodeCreate,
  DerivedEpisode
>('/episodes/:episode_id', () => {
  return HttpResponse.json({
    episode_id: 12345,
    person_id: 100,
    episode_concept_id: 8507,
    episode_start_date: '2023-01-15',
    episode_start_datetime: '2023-01-15',
    episode_end_date: '2023-01-15',
    episode_end_datetime: '2023-01-15',
    episode_parent_id: 100,
    episode_number: 100,
    episode_object_concept_id: 8507,
    episode_type_concept_id: 8507,
    episode_source_value: 'Example value',
    episode_source_concept_id: 8507,
  })
})

export const patchEpisodesEpisodeIdHandler = http.patch<
  { episode_id: number },
  DerivedEpisodeUpdate,
  DerivedEpisode
>('/episodes/:episode_id', () => {
  return HttpResponse.json({
    episode_id: 12345,
    person_id: 100,
    episode_concept_id: 8507,
    episode_start_date: '2023-01-15',
    episode_start_datetime: '2023-01-15',
    episode_end_date: '2023-01-15',
    episode_end_datetime: '2023-01-15',
    episode_parent_id: 100,
    episode_number: 100,
    episode_object_concept_id: 8507,
    episode_type_concept_id: 8507,
    episode_source_value: 'Example value',
    episode_source_concept_id: 8507,
  })
})

export const deleteEpisodesEpisodeIdHandler = http.delete<
  { episode_id: number },
  never,
  never
>('/episodes/:episode_id', () => {
  return HttpResponse.json(undefined)
})

export const getFactRelationshipsHandler = http.get<
  never,
  never,
  {
    data: Array<ResultsFactRelationship>
    pagination: { total: number; offset: number; limit: number; count: number }
  }
>('/fact-relationships', () => {
  return HttpResponse.json({
    data: [
      {
        relationship_concept_id: 8507,
      },
    ],
  })
})

export const postFactRelationshipsHandler = http.post<
  never,
  ResultsFactRelationshipCreate,
  ResultsFactRelationship
>('/fact-relationships', () => {
  return HttpResponse.json({
    relationship_concept_id: 8507,
  })
})

export const getFactRelationshipsFactRelationshipIdHandler = http.get<
  { fact_relationship_id: number },
  never,
  ResultsFactRelationship
>('/fact-relationships/:fact_relationship_id', () => {
  return HttpResponse.json({
    relationship_concept_id: 8507,
  })
})

export const putFactRelationshipsFactRelationshipIdHandler = http.put<
  { fact_relationship_id: number },
  ResultsFactRelationshipCreate,
  ResultsFactRelationship
>('/fact-relationships/:fact_relationship_id', () => {
  return HttpResponse.json({
    relationship_concept_id: 8507,
  })
})

export const patchFactRelationshipsFactRelationshipIdHandler = http.patch<
  { fact_relationship_id: number },
  ResultsFactRelationshipUpdate,
  ResultsFactRelationship
>('/fact-relationships/:fact_relationship_id', () => {
  return HttpResponse.json({
    relationship_concept_id: 8507,
  })
})

export const deleteFactRelationshipsFactRelationshipIdHandler = http.delete<
  { fact_relationship_id: number },
  never,
  never
>('/fact-relationships/:fact_relationship_id', () => {
  return HttpResponse.json(undefined)
})

export const getLocationsHandler = http.get<
  never,
  never,
  {
    data: Array<HealthsystemLocation>
    pagination: { total: number; offset: number; limit: number; count: number }
  }
>('/locations', () => {
  return HttpResponse.json({
    data: [
      {
        location_id: 12345,
        city: 'Example value',
        state: 'Example value',
        zip: 'Example value',
        county: 'Example value',
        location_source_value: 'Example value',
        country_concept_id: 8507,
        country_source_value: 'Example value',
        latitude: 98.6,
        longitude: 98.6,
      },
    ],
  })
})

export const postLocationsHandler = http.post<
  never,
  HealthsystemLocationCreate,
  HealthsystemLocation
>('/locations', () => {
  return HttpResponse.json({
    location_id: 12345,
    city: 'Example value',
    state: 'Example value',
    zip: 'Example value',
    county: 'Example value',
    location_source_value: 'Example value',
    country_concept_id: 8507,
    country_source_value: 'Example value',
    latitude: 98.6,
    longitude: 98.6,
  })
})

export const getLocationsLocationIdHandler = http.get<
  { location_id: number },
  never,
  HealthsystemLocation
>('/locations/:location_id', () => {
  return HttpResponse.json({
    location_id: 12345,
    city: 'Example value',
    state: 'Example value',
    zip: 'Example value',
    county: 'Example value',
    location_source_value: 'Example value',
    country_concept_id: 8507,
    country_source_value: 'Example value',
    latitude: 98.6,
    longitude: 98.6,
  })
})

export const putLocationsLocationIdHandler = http.put<
  { location_id: number },
  HealthsystemLocationCreate,
  HealthsystemLocation
>('/locations/:location_id', () => {
  return HttpResponse.json({
    location_id: 12345,
    city: 'Example value',
    state: 'Example value',
    zip: 'Example value',
    county: 'Example value',
    location_source_value: 'Example value',
    country_concept_id: 8507,
    country_source_value: 'Example value',
    latitude: 98.6,
    longitude: 98.6,
  })
})

export const patchLocationsLocationIdHandler = http.patch<
  { location_id: number },
  HealthsystemLocationUpdate,
  HealthsystemLocation
>('/locations/:location_id', () => {
  return HttpResponse.json({
    location_id: 12345,
    city: 'Example value',
    state: 'Example value',
    zip: 'Example value',
    county: 'Example value',
    location_source_value: 'Example value',
    country_concept_id: 8507,
    country_source_value: 'Example value',
    latitude: 98.6,
    longitude: 98.6,
  })
})

export const deleteLocationsLocationIdHandler = http.delete<
  { location_id: number },
  never,
  never
>('/locations/:location_id', () => {
  return HttpResponse.json(undefined)
})

export const getMeasurementsHandler = http.get<
  never,
  never,
  {
    data: Array<ClinicalMeasurement>
    pagination: { total: number; offset: number; limit: number; count: number }
  }
>('/measurements', () => {
  return HttpResponse.json({
    data: [
      {
        measurement_id: 12345,
        person_id: 100,
        measurement_concept_id: 8507,
        measurement_date: '2023-01-15',
        measurement_datetime: '2023-01-15',
        measurement_time: 'Example value',
        measurement_type_concept_id: 8507,
        operator_concept_id: 8507,
        value_as_number: 98.6,
        value_as_concept_id: 8507,
        unit_concept_id: 8507,
        range_low: 98.6,
        range_high: 98.6,
        provider_id: 100,
        visit_occurrence_id: 100,
        visit_detail_id: 100,
        measurement_source_value: 'Example value',
        measurement_source_concept_id: 8507,
        unit_source_value: 'Example value',
        unit_source_concept_id: 8507,
        value_source_value: 'Example value',
        measurement_event_id: 100,
        meas_event_field_concept_id: 8507,
      },
    ],
  })
})

export const postMeasurementsHandler = http.post<
  never,
  ClinicalMeasurementCreate,
  ClinicalMeasurement
>('/measurements', () => {
  return HttpResponse.json({
    measurement_id: 12345,
    person_id: 100,
    measurement_concept_id: 8507,
    measurement_date: '2023-01-15',
    measurement_datetime: '2023-01-15',
    measurement_time: 'Example value',
    measurement_type_concept_id: 8507,
    operator_concept_id: 8507,
    value_as_number: 98.6,
    value_as_concept_id: 8507,
    unit_concept_id: 8507,
    range_low: 98.6,
    range_high: 98.6,
    provider_id: 100,
    visit_occurrence_id: 100,
    visit_detail_id: 100,
    measurement_source_value: 'Example value',
    measurement_source_concept_id: 8507,
    unit_source_value: 'Example value',
    unit_source_concept_id: 8507,
    value_source_value: 'Example value',
    measurement_event_id: 100,
    meas_event_field_concept_id: 8507,
  })
})

export const getMeasurementsMeasurementIdHandler = http.get<
  { measurement_id: number },
  never,
  ClinicalMeasurement
>('/measurements/:measurement_id', () => {
  return HttpResponse.json({
    measurement_id: 12345,
    person_id: 100,
    measurement_concept_id: 8507,
    measurement_date: '2023-01-15',
    measurement_datetime: '2023-01-15',
    measurement_time: 'Example value',
    measurement_type_concept_id: 8507,
    operator_concept_id: 8507,
    value_as_number: 98.6,
    value_as_concept_id: 8507,
    unit_concept_id: 8507,
    range_low: 98.6,
    range_high: 98.6,
    provider_id: 100,
    visit_occurrence_id: 100,
    visit_detail_id: 100,
    measurement_source_value: 'Example value',
    measurement_source_concept_id: 8507,
    unit_source_value: 'Example value',
    unit_source_concept_id: 8507,
    value_source_value: 'Example value',
    measurement_event_id: 100,
    meas_event_field_concept_id: 8507,
  })
})

export const putMeasurementsMeasurementIdHandler = http.put<
  { measurement_id: number },
  ClinicalMeasurementCreate,
  ClinicalMeasurement
>('/measurements/:measurement_id', () => {
  return HttpResponse.json({
    measurement_id: 12345,
    person_id: 100,
    measurement_concept_id: 8507,
    measurement_date: '2023-01-15',
    measurement_datetime: '2023-01-15',
    measurement_time: 'Example value',
    measurement_type_concept_id: 8507,
    operator_concept_id: 8507,
    value_as_number: 98.6,
    value_as_concept_id: 8507,
    unit_concept_id: 8507,
    range_low: 98.6,
    range_high: 98.6,
    provider_id: 100,
    visit_occurrence_id: 100,
    visit_detail_id: 100,
    measurement_source_value: 'Example value',
    measurement_source_concept_id: 8507,
    unit_source_value: 'Example value',
    unit_source_concept_id: 8507,
    value_source_value: 'Example value',
    measurement_event_id: 100,
    meas_event_field_concept_id: 8507,
  })
})

export const patchMeasurementsMeasurementIdHandler = http.patch<
  { measurement_id: number },
  ClinicalMeasurementUpdate,
  ClinicalMeasurement
>('/measurements/:measurement_id', () => {
  return HttpResponse.json({
    measurement_id: 12345,
    person_id: 100,
    measurement_concept_id: 8507,
    measurement_date: '2023-01-15',
    measurement_datetime: '2023-01-15',
    measurement_time: 'Example value',
    measurement_type_concept_id: 8507,
    operator_concept_id: 8507,
    value_as_number: 98.6,
    value_as_concept_id: 8507,
    unit_concept_id: 8507,
    range_low: 98.6,
    range_high: 98.6,
    provider_id: 100,
    visit_occurrence_id: 100,
    visit_detail_id: 100,
    measurement_source_value: 'Example value',
    measurement_source_concept_id: 8507,
    unit_source_value: 'Example value',
    unit_source_concept_id: 8507,
    value_source_value: 'Example value',
    measurement_event_id: 100,
    meas_event_field_concept_id: 8507,
  })
})

export const deleteMeasurementsMeasurementIdHandler = http.delete<
  { measurement_id: number },
  never,
  never
>('/measurements/:measurement_id', () => {
  return HttpResponse.json(undefined)
})

export const getMetadatasHandler = http.get<
  never,
  never,
  {
    data: Array<MetadataMetadata>
    pagination: { total: number; offset: number; limit: number; count: number }
  }
>('/metadatas', () => {
  return HttpResponse.json({
    data: [
      {
        metadata_id: 12345,
        metadata_concept_id: 8507,
        metadata_type_concept_id: 8507,
        name: 'Example value',
        value_as_string: 'Example value',
        value_as_concept_id: 8507,
        value_as_number: 98.6,
        metadata_date: '2023-01-15',
        metadata_datetime: '2023-01-15',
      },
    ],
  })
})

export const postMetadatasHandler = http.post<
  never,
  MetadataMetadataCreate,
  MetadataMetadata
>('/metadatas', () => {
  return HttpResponse.json({
    metadata_id: 12345,
    metadata_concept_id: 8507,
    metadata_type_concept_id: 8507,
    name: 'Example value',
    value_as_string: 'Example value',
    value_as_concept_id: 8507,
    value_as_number: 98.6,
    metadata_date: '2023-01-15',
    metadata_datetime: '2023-01-15',
  })
})

export const getMetadatasMetadataIdHandler = http.get<
  { metadata_id: number },
  never,
  MetadataMetadata
>('/metadatas/:metadata_id', () => {
  return HttpResponse.json({
    metadata_id: 12345,
    metadata_concept_id: 8507,
    metadata_type_concept_id: 8507,
    name: 'Example value',
    value_as_string: 'Example value',
    value_as_concept_id: 8507,
    value_as_number: 98.6,
    metadata_date: '2023-01-15',
    metadata_datetime: '2023-01-15',
  })
})

export const putMetadatasMetadataIdHandler = http.put<
  { metadata_id: number },
  MetadataMetadataCreate,
  MetadataMetadata
>('/metadatas/:metadata_id', () => {
  return HttpResponse.json({
    metadata_id: 12345,
    metadata_concept_id: 8507,
    metadata_type_concept_id: 8507,
    name: 'Example value',
    value_as_string: 'Example value',
    value_as_concept_id: 8507,
    value_as_number: 98.6,
    metadata_date: '2023-01-15',
    metadata_datetime: '2023-01-15',
  })
})

export const patchMetadatasMetadataIdHandler = http.patch<
  { metadata_id: number },
  MetadataMetadataUpdate,
  MetadataMetadata
>('/metadatas/:metadata_id', () => {
  return HttpResponse.json({
    metadata_id: 12345,
    metadata_concept_id: 8507,
    metadata_type_concept_id: 8507,
    name: 'Example value',
    value_as_string: 'Example value',
    value_as_concept_id: 8507,
    value_as_number: 98.6,
    metadata_date: '2023-01-15',
    metadata_datetime: '2023-01-15',
  })
})

export const deleteMetadatasMetadataIdHandler = http.delete<
  { metadata_id: number },
  never,
  never
>('/metadatas/:metadata_id', () => {
  return HttpResponse.json(undefined)
})

export const getNoteNlpsHandler = http.get<
  never,
  never,
  {
    data: Array<ClinicalNoteNlp>
    pagination: { total: number; offset: number; limit: number; count: number }
  }
>('/note-nlps', () => {
  return HttpResponse.json({
    data: [
      {
        note_nlp_id: 12345,
        note_id: 100,
        section_concept_id: 8507,
        snippet: 'Example value',
        lexical_variant: 'Example value',
        note_nlp_concept_id: 8507,
        note_nlp_source_concept_id: 8507,
        nlp_system: 'Example value',
        nlp_date: '2023-01-15',
        nlp_datetime: '2023-01-15',
        term_exists: 'Example value',
        term_temporal: 'Example value',
        term_modifiers: 'Example value',
      },
    ],
  })
})

export const postNoteNlpsHandler = http.post<
  never,
  ClinicalNoteNlpCreate,
  ClinicalNoteNlp
>('/note-nlps', () => {
  return HttpResponse.json({
    note_nlp_id: 12345,
    note_id: 100,
    section_concept_id: 8507,
    snippet: 'Example value',
    lexical_variant: 'Example value',
    note_nlp_concept_id: 8507,
    note_nlp_source_concept_id: 8507,
    nlp_system: 'Example value',
    nlp_date: '2023-01-15',
    nlp_datetime: '2023-01-15',
    term_exists: 'Example value',
    term_temporal: 'Example value',
    term_modifiers: 'Example value',
  })
})

export const getNoteNlpsNoteNlpIdHandler = http.get<
  { note_nlp_id: number },
  never,
  ClinicalNoteNlp
>('/note-nlps/:note_nlp_id', () => {
  return HttpResponse.json({
    note_nlp_id: 12345,
    note_id: 100,
    section_concept_id: 8507,
    snippet: 'Example value',
    lexical_variant: 'Example value',
    note_nlp_concept_id: 8507,
    note_nlp_source_concept_id: 8507,
    nlp_system: 'Example value',
    nlp_date: '2023-01-15',
    nlp_datetime: '2023-01-15',
    term_exists: 'Example value',
    term_temporal: 'Example value',
    term_modifiers: 'Example value',
  })
})

export const putNoteNlpsNoteNlpIdHandler = http.put<
  { note_nlp_id: number },
  ClinicalNoteNlpCreate,
  ClinicalNoteNlp
>('/note-nlps/:note_nlp_id', () => {
  return HttpResponse.json({
    note_nlp_id: 12345,
    note_id: 100,
    section_concept_id: 8507,
    snippet: 'Example value',
    lexical_variant: 'Example value',
    note_nlp_concept_id: 8507,
    note_nlp_source_concept_id: 8507,
    nlp_system: 'Example value',
    nlp_date: '2023-01-15',
    nlp_datetime: '2023-01-15',
    term_exists: 'Example value',
    term_temporal: 'Example value',
    term_modifiers: 'Example value',
  })
})

export const patchNoteNlpsNoteNlpIdHandler = http.patch<
  { note_nlp_id: number },
  ClinicalNoteNlpUpdate,
  ClinicalNoteNlp
>('/note-nlps/:note_nlp_id', () => {
  return HttpResponse.json({
    note_nlp_id: 12345,
    note_id: 100,
    section_concept_id: 8507,
    snippet: 'Example value',
    lexical_variant: 'Example value',
    note_nlp_concept_id: 8507,
    note_nlp_source_concept_id: 8507,
    nlp_system: 'Example value',
    nlp_date: '2023-01-15',
    nlp_datetime: '2023-01-15',
    term_exists: 'Example value',
    term_temporal: 'Example value',
    term_modifiers: 'Example value',
  })
})

export const deleteNoteNlpsNoteNlpIdHandler = http.delete<
  { note_nlp_id: number },
  never,
  never
>('/note-nlps/:note_nlp_id', () => {
  return HttpResponse.json(undefined)
})

export const getNotesHandler = http.get<
  never,
  never,
  {
    data: Array<ClinicalNote>
    pagination: { total: number; offset: number; limit: number; count: number }
  }
>('/notes', () => {
  return HttpResponse.json({
    data: [
      {
        note_id: 12345,
        person_id: 100,
        note_date: '2023-01-15',
        note_datetime: '2023-01-15',
        note_type_concept_id: 8507,
        note_class_concept_id: 8507,
        note_title: 'Example value',
        note_text: 'Example value',
        encoding_concept_id: 8507,
        language_concept_id: 8507,
        provider_id: 100,
        visit_occurrence_id: 100,
        visit_detail_id: 100,
        note_source_value: 'Example value',
        note_event_id: 100,
        note_event_field_concept_id: 8507,
      },
    ],
  })
})

export const postNotesHandler = http.post<
  never,
  ClinicalNoteCreate,
  ClinicalNote
>('/notes', () => {
  return HttpResponse.json({
    note_id: 12345,
    person_id: 100,
    note_date: '2023-01-15',
    note_datetime: '2023-01-15',
    note_type_concept_id: 8507,
    note_class_concept_id: 8507,
    note_title: 'Example value',
    note_text: 'Example value',
    encoding_concept_id: 8507,
    language_concept_id: 8507,
    provider_id: 100,
    visit_occurrence_id: 100,
    visit_detail_id: 100,
    note_source_value: 'Example value',
    note_event_id: 100,
    note_event_field_concept_id: 8507,
  })
})

export const getNotesNoteIdHandler = http.get<
  { note_id: number },
  never,
  ClinicalNote
>('/notes/:note_id', () => {
  return HttpResponse.json({
    note_id: 12345,
    person_id: 100,
    note_date: '2023-01-15',
    note_datetime: '2023-01-15',
    note_type_concept_id: 8507,
    note_class_concept_id: 8507,
    note_title: 'Example value',
    note_text: 'Example value',
    encoding_concept_id: 8507,
    language_concept_id: 8507,
    provider_id: 100,
    visit_occurrence_id: 100,
    visit_detail_id: 100,
    note_source_value: 'Example value',
    note_event_id: 100,
    note_event_field_concept_id: 8507,
  })
})

export const putNotesNoteIdHandler = http.put<
  { note_id: number },
  ClinicalNoteCreate,
  ClinicalNote
>('/notes/:note_id', () => {
  return HttpResponse.json({
    note_id: 12345,
    person_id: 100,
    note_date: '2023-01-15',
    note_datetime: '2023-01-15',
    note_type_concept_id: 8507,
    note_class_concept_id: 8507,
    note_title: 'Example value',
    note_text: 'Example value',
    encoding_concept_id: 8507,
    language_concept_id: 8507,
    provider_id: 100,
    visit_occurrence_id: 100,
    visit_detail_id: 100,
    note_source_value: 'Example value',
    note_event_id: 100,
    note_event_field_concept_id: 8507,
  })
})

export const patchNotesNoteIdHandler = http.patch<
  { note_id: number },
  ClinicalNoteUpdate,
  ClinicalNote
>('/notes/:note_id', () => {
  return HttpResponse.json({
    note_id: 12345,
    person_id: 100,
    note_date: '2023-01-15',
    note_datetime: '2023-01-15',
    note_type_concept_id: 8507,
    note_class_concept_id: 8507,
    note_title: 'Example value',
    note_text: 'Example value',
    encoding_concept_id: 8507,
    language_concept_id: 8507,
    provider_id: 100,
    visit_occurrence_id: 100,
    visit_detail_id: 100,
    note_source_value: 'Example value',
    note_event_id: 100,
    note_event_field_concept_id: 8507,
  })
})

export const deleteNotesNoteIdHandler = http.delete<
  { note_id: number },
  never,
  never
>('/notes/:note_id', () => {
  return HttpResponse.json(undefined)
})

export const getObservationPeriodsHandler = http.get<
  never,
  never,
  {
    data: Array<ClinicalObservationPeriod>
    pagination: { total: number; offset: number; limit: number; count: number }
  }
>('/observation-periods', () => {
  return HttpResponse.json({
    data: [
      {
        observation_period_id: 12345,
        person_id: 100,
        observation_period_start_date: '2023-01-15',
        observation_period_end_date: '2023-01-15',
        period_type_concept_id: 8507,
      },
    ],
  })
})

export const postObservationPeriodsHandler = http.post<
  never,
  ClinicalObservationPeriodCreate,
  ClinicalObservationPeriod
>('/observation-periods', () => {
  return HttpResponse.json({
    observation_period_id: 12345,
    person_id: 100,
    observation_period_start_date: '2023-01-15',
    observation_period_end_date: '2023-01-15',
    period_type_concept_id: 8507,
  })
})

export const getObservationPeriodsObservationPeriodIdHandler = http.get<
  { observation_period_id: number },
  never,
  ClinicalObservationPeriod
>('/observation-periods/:observation_period_id', () => {
  return HttpResponse.json({
    observation_period_id: 12345,
    person_id: 100,
    observation_period_start_date: '2023-01-15',
    observation_period_end_date: '2023-01-15',
    period_type_concept_id: 8507,
  })
})

export const putObservationPeriodsObservationPeriodIdHandler = http.put<
  { observation_period_id: number },
  ClinicalObservationPeriodCreate,
  ClinicalObservationPeriod
>('/observation-periods/:observation_period_id', () => {
  return HttpResponse.json({
    observation_period_id: 12345,
    person_id: 100,
    observation_period_start_date: '2023-01-15',
    observation_period_end_date: '2023-01-15',
    period_type_concept_id: 8507,
  })
})

export const patchObservationPeriodsObservationPeriodIdHandler = http.patch<
  { observation_period_id: number },
  ClinicalObservationPeriodUpdate,
  ClinicalObservationPeriod
>('/observation-periods/:observation_period_id', () => {
  return HttpResponse.json({
    observation_period_id: 12345,
    person_id: 100,
    observation_period_start_date: '2023-01-15',
    observation_period_end_date: '2023-01-15',
    period_type_concept_id: 8507,
  })
})

export const deleteObservationPeriodsObservationPeriodIdHandler = http.delete<
  { observation_period_id: number },
  never,
  never
>('/observation-periods/:observation_period_id', () => {
  return HttpResponse.json(undefined)
})

export const getObservationsHandler = http.get<
  never,
  never,
  {
    data: Array<ClinicalObservation>
    pagination: { total: number; offset: number; limit: number; count: number }
  }
>('/observations', () => {
  return HttpResponse.json({
    data: [
      {
        observation_id: 12345,
        person_id: 100,
        observation_concept_id: 8507,
        observation_date: '2023-01-15',
        observation_datetime: '2023-01-15',
        observation_type_concept_id: 8507,
        value_as_number: 98.6,
        value_as_string: 'Example value',
        value_as_concept_id: 8507,
        qualifier_concept_id: 8507,
        unit_concept_id: 8507,
        provider_id: 100,
        visit_occurrence_id: 100,
        visit_detail_id: 100,
        observation_source_value: 'Example value',
        observation_source_concept_id: 8507,
        unit_source_value: 'Example value',
        qualifier_source_value: 'Example value',
        value_source_value: 'Example value',
        observation_event_id: 100,
        obs_event_field_concept_id: 8507,
      },
    ],
  })
})

export const postObservationsHandler = http.post<
  never,
  ClinicalObservationCreate,
  ClinicalObservation
>('/observations', () => {
  return HttpResponse.json({
    observation_id: 12345,
    person_id: 100,
    observation_concept_id: 8507,
    observation_date: '2023-01-15',
    observation_datetime: '2023-01-15',
    observation_type_concept_id: 8507,
    value_as_number: 98.6,
    value_as_string: 'Example value',
    value_as_concept_id: 8507,
    qualifier_concept_id: 8507,
    unit_concept_id: 8507,
    provider_id: 100,
    visit_occurrence_id: 100,
    visit_detail_id: 100,
    observation_source_value: 'Example value',
    observation_source_concept_id: 8507,
    unit_source_value: 'Example value',
    qualifier_source_value: 'Example value',
    value_source_value: 'Example value',
    observation_event_id: 100,
    obs_event_field_concept_id: 8507,
  })
})

export const getObservationsObservationIdHandler = http.get<
  { observation_id: number },
  never,
  ClinicalObservation
>('/observations/:observation_id', () => {
  return HttpResponse.json({
    observation_id: 12345,
    person_id: 100,
    observation_concept_id: 8507,
    observation_date: '2023-01-15',
    observation_datetime: '2023-01-15',
    observation_type_concept_id: 8507,
    value_as_number: 98.6,
    value_as_string: 'Example value',
    value_as_concept_id: 8507,
    qualifier_concept_id: 8507,
    unit_concept_id: 8507,
    provider_id: 100,
    visit_occurrence_id: 100,
    visit_detail_id: 100,
    observation_source_value: 'Example value',
    observation_source_concept_id: 8507,
    unit_source_value: 'Example value',
    qualifier_source_value: 'Example value',
    value_source_value: 'Example value',
    observation_event_id: 100,
    obs_event_field_concept_id: 8507,
  })
})

export const putObservationsObservationIdHandler = http.put<
  { observation_id: number },
  ClinicalObservationCreate,
  ClinicalObservation
>('/observations/:observation_id', () => {
  return HttpResponse.json({
    observation_id: 12345,
    person_id: 100,
    observation_concept_id: 8507,
    observation_date: '2023-01-15',
    observation_datetime: '2023-01-15',
    observation_type_concept_id: 8507,
    value_as_number: 98.6,
    value_as_string: 'Example value',
    value_as_concept_id: 8507,
    qualifier_concept_id: 8507,
    unit_concept_id: 8507,
    provider_id: 100,
    visit_occurrence_id: 100,
    visit_detail_id: 100,
    observation_source_value: 'Example value',
    observation_source_concept_id: 8507,
    unit_source_value: 'Example value',
    qualifier_source_value: 'Example value',
    value_source_value: 'Example value',
    observation_event_id: 100,
    obs_event_field_concept_id: 8507,
  })
})

export const patchObservationsObservationIdHandler = http.patch<
  { observation_id: number },
  ClinicalObservationUpdate,
  ClinicalObservation
>('/observations/:observation_id', () => {
  return HttpResponse.json({
    observation_id: 12345,
    person_id: 100,
    observation_concept_id: 8507,
    observation_date: '2023-01-15',
    observation_datetime: '2023-01-15',
    observation_type_concept_id: 8507,
    value_as_number: 98.6,
    value_as_string: 'Example value',
    value_as_concept_id: 8507,
    qualifier_concept_id: 8507,
    unit_concept_id: 8507,
    provider_id: 100,
    visit_occurrence_id: 100,
    visit_detail_id: 100,
    observation_source_value: 'Example value',
    observation_source_concept_id: 8507,
    unit_source_value: 'Example value',
    qualifier_source_value: 'Example value',
    value_source_value: 'Example value',
    observation_event_id: 100,
    obs_event_field_concept_id: 8507,
  })
})

export const deleteObservationsObservationIdHandler = http.delete<
  { observation_id: number },
  never,
  never
>('/observations/:observation_id', () => {
  return HttpResponse.json(undefined)
})

export const getPayerPlanPeriodsHandler = http.get<
  never,
  never,
  {
    data: Array<HealthsystemPayerPlanPeriod>
    pagination: { total: number; offset: number; limit: number; count: number }
  }
>('/payer-plan-periods', () => {
  return HttpResponse.json({
    data: [
      {
        payer_plan_period_id: 12345,
        person_id: 100,
        payer_plan_period_start_date: '2023-01-15',
        payer_plan_period_end_date: '2023-01-15',
        payer_concept_id: 8507,
        payer_source_value: 'Example value',
        payer_source_concept_id: 8507,
        plan_concept_id: 8507,
        plan_source_value: 'Example value',
        plan_source_concept_id: 8507,
        sponsor_concept_id: 8507,
        sponsor_source_value: 'Example value',
        sponsor_source_concept_id: 8507,
        family_source_value: 'Example value',
        stop_reason_concept_id: 8507,
        stop_reason_source_value: 'Example value',
        stop_reason_source_concept_id: 8507,
      },
    ],
  })
})

export const postPayerPlanPeriodsHandler = http.post<
  never,
  HealthsystemPayerPlanPeriodCreate,
  HealthsystemPayerPlanPeriod
>('/payer-plan-periods', () => {
  return HttpResponse.json({
    payer_plan_period_id: 12345,
    person_id: 100,
    payer_plan_period_start_date: '2023-01-15',
    payer_plan_period_end_date: '2023-01-15',
    payer_concept_id: 8507,
    payer_source_value: 'Example value',
    payer_source_concept_id: 8507,
    plan_concept_id: 8507,
    plan_source_value: 'Example value',
    plan_source_concept_id: 8507,
    sponsor_concept_id: 8507,
    sponsor_source_value: 'Example value',
    sponsor_source_concept_id: 8507,
    family_source_value: 'Example value',
    stop_reason_concept_id: 8507,
    stop_reason_source_value: 'Example value',
    stop_reason_source_concept_id: 8507,
  })
})

export const getPayerPlanPeriodsPayerPlanPeriodIdHandler = http.get<
  { payer_plan_period_id: number },
  never,
  HealthsystemPayerPlanPeriod
>('/payer-plan-periods/:payer_plan_period_id', () => {
  return HttpResponse.json({
    payer_plan_period_id: 12345,
    person_id: 100,
    payer_plan_period_start_date: '2023-01-15',
    payer_plan_period_end_date: '2023-01-15',
    payer_concept_id: 8507,
    payer_source_value: 'Example value',
    payer_source_concept_id: 8507,
    plan_concept_id: 8507,
    plan_source_value: 'Example value',
    plan_source_concept_id: 8507,
    sponsor_concept_id: 8507,
    sponsor_source_value: 'Example value',
    sponsor_source_concept_id: 8507,
    family_source_value: 'Example value',
    stop_reason_concept_id: 8507,
    stop_reason_source_value: 'Example value',
    stop_reason_source_concept_id: 8507,
  })
})

export const putPayerPlanPeriodsPayerPlanPeriodIdHandler = http.put<
  { payer_plan_period_id: number },
  HealthsystemPayerPlanPeriodCreate,
  HealthsystemPayerPlanPeriod
>('/payer-plan-periods/:payer_plan_period_id', () => {
  return HttpResponse.json({
    payer_plan_period_id: 12345,
    person_id: 100,
    payer_plan_period_start_date: '2023-01-15',
    payer_plan_period_end_date: '2023-01-15',
    payer_concept_id: 8507,
    payer_source_value: 'Example value',
    payer_source_concept_id: 8507,
    plan_concept_id: 8507,
    plan_source_value: 'Example value',
    plan_source_concept_id: 8507,
    sponsor_concept_id: 8507,
    sponsor_source_value: 'Example value',
    sponsor_source_concept_id: 8507,
    family_source_value: 'Example value',
    stop_reason_concept_id: 8507,
    stop_reason_source_value: 'Example value',
    stop_reason_source_concept_id: 8507,
  })
})

export const patchPayerPlanPeriodsPayerPlanPeriodIdHandler = http.patch<
  { payer_plan_period_id: number },
  HealthsystemPayerPlanPeriodUpdate,
  HealthsystemPayerPlanPeriod
>('/payer-plan-periods/:payer_plan_period_id', () => {
  return HttpResponse.json({
    payer_plan_period_id: 12345,
    person_id: 100,
    payer_plan_period_start_date: '2023-01-15',
    payer_plan_period_end_date: '2023-01-15',
    payer_concept_id: 8507,
    payer_source_value: 'Example value',
    payer_source_concept_id: 8507,
    plan_concept_id: 8507,
    plan_source_value: 'Example value',
    plan_source_concept_id: 8507,
    sponsor_concept_id: 8507,
    sponsor_source_value: 'Example value',
    sponsor_source_concept_id: 8507,
    family_source_value: 'Example value',
    stop_reason_concept_id: 8507,
    stop_reason_source_value: 'Example value',
    stop_reason_source_concept_id: 8507,
  })
})

export const deletePayerPlanPeriodsPayerPlanPeriodIdHandler = http.delete<
  { payer_plan_period_id: number },
  never,
  never
>('/payer-plan-periods/:payer_plan_period_id', () => {
  return HttpResponse.json(undefined)
})

export const getPersonsHandler = http.get<
  never,
  never,
  {
    data: Array<ClinicalPerson>
    pagination: { total: number; offset: number; limit: number; count: number }
  }
>('/persons', () => {
  return HttpResponse.json({
    data: [
      {
        person_id: 12345,
        gender_concept_id: 8507,
        year_of_birth: 100,
        month_of_birth: 100,
        day_of_birth: 100,
        birth_datetime: '2023-01-15',
        race_concept_id: 8507,
        ethnicity_concept_id: 8507,
        location_id: 100,
        provider_id: 100,
        care_site_id: 100,
        person_source_value: 'Example value',
        gender_source_value: 'Example value',
        gender_source_concept_id: 8507,
        race_source_value: 'Example value',
        race_source_concept_id: 8507,
        ethnicity_source_value: 'Example value',
        ethnicity_source_concept_id: 8507,
      },
    ],
  })
})

export const postPersonsHandler = http.post<
  never,
  ClinicalPersonCreate,
  ClinicalPerson
>('/persons', () => {
  return HttpResponse.json({
    person_id: 12345,
    gender_concept_id: 8507,
    year_of_birth: 100,
    month_of_birth: 100,
    day_of_birth: 100,
    birth_datetime: '2023-01-15',
    race_concept_id: 8507,
    ethnicity_concept_id: 8507,
    location_id: 100,
    provider_id: 100,
    care_site_id: 100,
    person_source_value: 'Example value',
    gender_source_value: 'Example value',
    gender_source_concept_id: 8507,
    race_source_value: 'Example value',
    race_source_concept_id: 8507,
    ethnicity_source_value: 'Example value',
    ethnicity_source_concept_id: 8507,
  })
})

export const getPersonsPersonIdHandler = http.get<
  { person_id: number },
  never,
  ClinicalPerson
>('/persons/:person_id', () => {
  return HttpResponse.json({
    person_id: 12345,
    gender_concept_id: 8507,
    year_of_birth: 100,
    month_of_birth: 100,
    day_of_birth: 100,
    birth_datetime: '2023-01-15',
    race_concept_id: 8507,
    ethnicity_concept_id: 8507,
    location_id: 100,
    provider_id: 100,
    care_site_id: 100,
    person_source_value: 'Example value',
    gender_source_value: 'Example value',
    gender_source_concept_id: 8507,
    race_source_value: 'Example value',
    race_source_concept_id: 8507,
    ethnicity_source_value: 'Example value',
    ethnicity_source_concept_id: 8507,
  })
})

export const putPersonsPersonIdHandler = http.put<
  { person_id: number },
  ClinicalPersonCreate,
  ClinicalPerson
>('/persons/:person_id', () => {
  return HttpResponse.json({
    person_id: 12345,
    gender_concept_id: 8507,
    year_of_birth: 100,
    month_of_birth: 100,
    day_of_birth: 100,
    birth_datetime: '2023-01-15',
    race_concept_id: 8507,
    ethnicity_concept_id: 8507,
    location_id: 100,
    provider_id: 100,
    care_site_id: 100,
    person_source_value: 'Example value',
    gender_source_value: 'Example value',
    gender_source_concept_id: 8507,
    race_source_value: 'Example value',
    race_source_concept_id: 8507,
    ethnicity_source_value: 'Example value',
    ethnicity_source_concept_id: 8507,
  })
})

export const patchPersonsPersonIdHandler = http.patch<
  { person_id: number },
  ClinicalPersonUpdate,
  ClinicalPerson
>('/persons/:person_id', () => {
  return HttpResponse.json({
    person_id: 12345,
    gender_concept_id: 8507,
    year_of_birth: 100,
    month_of_birth: 100,
    day_of_birth: 100,
    birth_datetime: '2023-01-15',
    race_concept_id: 8507,
    ethnicity_concept_id: 8507,
    location_id: 100,
    provider_id: 100,
    care_site_id: 100,
    person_source_value: 'Example value',
    gender_source_value: 'Example value',
    gender_source_concept_id: 8507,
    race_source_value: 'Example value',
    race_source_concept_id: 8507,
    ethnicity_source_value: 'Example value',
    ethnicity_source_concept_id: 8507,
  })
})

export const deletePersonsPersonIdHandler = http.delete<
  { person_id: number },
  never,
  never
>('/persons/:person_id', () => {
  return HttpResponse.json(undefined)
})

export const getProcedureOccurrencesHandler = http.get<
  never,
  never,
  {
    data: Array<ClinicalProcedureOccurrence>
    pagination: { total: number; offset: number; limit: number; count: number }
  }
>('/procedure-occurrences', () => {
  return HttpResponse.json({
    data: [
      {
        procedure_occurrence_id: 12345,
        person_id: 100,
        procedure_concept_id: 8507,
        procedure_date: '2023-01-15',
        procedure_datetime: '2023-01-15',
        procedure_end_date: '2023-01-15',
        procedure_end_datetime: '2023-01-15',
        procedure_type_concept_id: 8507,
        modifier_concept_id: 8507,
        quantity: 100,
        provider_id: 100,
        visit_occurrence_id: 100,
        visit_detail_id: 100,
        procedure_source_value: 'Example value',
        procedure_source_concept_id: 8507,
        modifier_source_value: 'Example value',
      },
    ],
  })
})

export const postProcedureOccurrencesHandler = http.post<
  never,
  ClinicalProcedureOccurrenceCreate,
  ClinicalProcedureOccurrence
>('/procedure-occurrences', () => {
  return HttpResponse.json({
    procedure_occurrence_id: 12345,
    person_id: 100,
    procedure_concept_id: 8507,
    procedure_date: '2023-01-15',
    procedure_datetime: '2023-01-15',
    procedure_end_date: '2023-01-15',
    procedure_end_datetime: '2023-01-15',
    procedure_type_concept_id: 8507,
    modifier_concept_id: 8507,
    quantity: 100,
    provider_id: 100,
    visit_occurrence_id: 100,
    visit_detail_id: 100,
    procedure_source_value: 'Example value',
    procedure_source_concept_id: 8507,
    modifier_source_value: 'Example value',
  })
})

export const getProcedureOccurrencesProcedureOccurrenceIdHandler = http.get<
  { procedure_occurrence_id: number },
  never,
  ClinicalProcedureOccurrence
>('/procedure-occurrences/:procedure_occurrence_id', () => {
  return HttpResponse.json({
    procedure_occurrence_id: 12345,
    person_id: 100,
    procedure_concept_id: 8507,
    procedure_date: '2023-01-15',
    procedure_datetime: '2023-01-15',
    procedure_end_date: '2023-01-15',
    procedure_end_datetime: '2023-01-15',
    procedure_type_concept_id: 8507,
    modifier_concept_id: 8507,
    quantity: 100,
    provider_id: 100,
    visit_occurrence_id: 100,
    visit_detail_id: 100,
    procedure_source_value: 'Example value',
    procedure_source_concept_id: 8507,
    modifier_source_value: 'Example value',
  })
})

export const putProcedureOccurrencesProcedureOccurrenceIdHandler = http.put<
  { procedure_occurrence_id: number },
  ClinicalProcedureOccurrenceCreate,
  ClinicalProcedureOccurrence
>('/procedure-occurrences/:procedure_occurrence_id', () => {
  return HttpResponse.json({
    procedure_occurrence_id: 12345,
    person_id: 100,
    procedure_concept_id: 8507,
    procedure_date: '2023-01-15',
    procedure_datetime: '2023-01-15',
    procedure_end_date: '2023-01-15',
    procedure_end_datetime: '2023-01-15',
    procedure_type_concept_id: 8507,
    modifier_concept_id: 8507,
    quantity: 100,
    provider_id: 100,
    visit_occurrence_id: 100,
    visit_detail_id: 100,
    procedure_source_value: 'Example value',
    procedure_source_concept_id: 8507,
    modifier_source_value: 'Example value',
  })
})

export const patchProcedureOccurrencesProcedureOccurrenceIdHandler = http.patch<
  { procedure_occurrence_id: number },
  ClinicalProcedureOccurrenceUpdate,
  ClinicalProcedureOccurrence
>('/procedure-occurrences/:procedure_occurrence_id', () => {
  return HttpResponse.json({
    procedure_occurrence_id: 12345,
    person_id: 100,
    procedure_concept_id: 8507,
    procedure_date: '2023-01-15',
    procedure_datetime: '2023-01-15',
    procedure_end_date: '2023-01-15',
    procedure_end_datetime: '2023-01-15',
    procedure_type_concept_id: 8507,
    modifier_concept_id: 8507,
    quantity: 100,
    provider_id: 100,
    visit_occurrence_id: 100,
    visit_detail_id: 100,
    procedure_source_value: 'Example value',
    procedure_source_concept_id: 8507,
    modifier_source_value: 'Example value',
  })
})

export const deleteProcedureOccurrencesProcedureOccurrenceIdHandler =
  http.delete<{ procedure_occurrence_id: number }, never, never>(
    '/procedure-occurrences/:procedure_occurrence_id',
    () => {
      return HttpResponse.json(undefined)
    },
  )

export const getProvidersHandler = http.get<
  never,
  never,
  {
    data: Array<HealthsystemProvider>
    pagination: { total: number; offset: number; limit: number; count: number }
  }
>('/providers', () => {
  return HttpResponse.json({
    data: [
      {
        provider_id: 12345,
        provider_name: 'Example value',
        npi: 'Example value',
        dea: 'Example value',
        specialty_concept_id: 8507,
        care_site_id: 100,
        year_of_birth: 100,
        gender_concept_id: 8507,
        provider_source_value: 'Example value',
        specialty_source_value: 'Example value',
        specialty_source_concept_id: 8507,
        gender_source_value: 'Example value',
        gender_source_concept_id: 8507,
      },
    ],
  })
})

export const postProvidersHandler = http.post<
  never,
  HealthsystemProviderCreate,
  HealthsystemProvider
>('/providers', () => {
  return HttpResponse.json({
    provider_id: 12345,
    provider_name: 'Example value',
    npi: 'Example value',
    dea: 'Example value',
    specialty_concept_id: 8507,
    care_site_id: 100,
    year_of_birth: 100,
    gender_concept_id: 8507,
    provider_source_value: 'Example value',
    specialty_source_value: 'Example value',
    specialty_source_concept_id: 8507,
    gender_source_value: 'Example value',
    gender_source_concept_id: 8507,
  })
})

export const getProvidersProviderIdHandler = http.get<
  { provider_id: number },
  never,
  HealthsystemProvider
>('/providers/:provider_id', () => {
  return HttpResponse.json({
    provider_id: 12345,
    provider_name: 'Example value',
    npi: 'Example value',
    dea: 'Example value',
    specialty_concept_id: 8507,
    care_site_id: 100,
    year_of_birth: 100,
    gender_concept_id: 8507,
    provider_source_value: 'Example value',
    specialty_source_value: 'Example value',
    specialty_source_concept_id: 8507,
    gender_source_value: 'Example value',
    gender_source_concept_id: 8507,
  })
})

export const putProvidersProviderIdHandler = http.put<
  { provider_id: number },
  HealthsystemProviderCreate,
  HealthsystemProvider
>('/providers/:provider_id', () => {
  return HttpResponse.json({
    provider_id: 12345,
    provider_name: 'Example value',
    npi: 'Example value',
    dea: 'Example value',
    specialty_concept_id: 8507,
    care_site_id: 100,
    year_of_birth: 100,
    gender_concept_id: 8507,
    provider_source_value: 'Example value',
    specialty_source_value: 'Example value',
    specialty_source_concept_id: 8507,
    gender_source_value: 'Example value',
    gender_source_concept_id: 8507,
  })
})

export const patchProvidersProviderIdHandler = http.patch<
  { provider_id: number },
  HealthsystemProviderUpdate,
  HealthsystemProvider
>('/providers/:provider_id', () => {
  return HttpResponse.json({
    provider_id: 12345,
    provider_name: 'Example value',
    npi: 'Example value',
    dea: 'Example value',
    specialty_concept_id: 8507,
    care_site_id: 100,
    year_of_birth: 100,
    gender_concept_id: 8507,
    provider_source_value: 'Example value',
    specialty_source_value: 'Example value',
    specialty_source_concept_id: 8507,
    gender_source_value: 'Example value',
    gender_source_concept_id: 8507,
  })
})

export const deleteProvidersProviderIdHandler = http.delete<
  { provider_id: number },
  never,
  never
>('/providers/:provider_id', () => {
  return HttpResponse.json(undefined)
})

export const getRelationshipsHandler = http.get<
  never,
  never,
  {
    data: Array<VocabularyRelationship>
    pagination: { total: number; offset: number; limit: number; count: number }
  }
>('/relationships', () => {
  return HttpResponse.json({
    data: [
      {
        relationship_id: '12345',
        relationship_name: 'Example value',
        is_hierarchical: 'Example value',
        defines_ancestry: 'Example value',
        reverse_relationship_id: 'Example value',
        relationship_concept_id: 8507,
      },
    ],
  })
})

export const postRelationshipsHandler = http.post<
  never,
  VocabularyRelationshipCreate,
  VocabularyRelationship
>('/relationships', () => {
  return HttpResponse.json({
    relationship_id: '12345',
    relationship_name: 'Example value',
    is_hierarchical: 'Example value',
    defines_ancestry: 'Example value',
    reverse_relationship_id: 'Example value',
    relationship_concept_id: 8507,
  })
})

export const getRelationshipsRelationshipIdHandler = http.get<
  { relationship_id: string },
  never,
  VocabularyRelationship
>('/relationships/:relationship_id', () => {
  return HttpResponse.json({
    relationship_id: '12345',
    relationship_name: 'Example value',
    is_hierarchical: 'Example value',
    defines_ancestry: 'Example value',
    reverse_relationship_id: 'Example value',
    relationship_concept_id: 8507,
  })
})

export const putRelationshipsRelationshipIdHandler = http.put<
  { relationship_id: string },
  VocabularyRelationshipCreate,
  VocabularyRelationship
>('/relationships/:relationship_id', () => {
  return HttpResponse.json({
    relationship_id: '12345',
    relationship_name: 'Example value',
    is_hierarchical: 'Example value',
    defines_ancestry: 'Example value',
    reverse_relationship_id: 'Example value',
    relationship_concept_id: 8507,
  })
})

export const patchRelationshipsRelationshipIdHandler = http.patch<
  { relationship_id: string },
  VocabularyRelationshipUpdate,
  VocabularyRelationship
>('/relationships/:relationship_id', () => {
  return HttpResponse.json({
    relationship_id: '12345',
    relationship_name: 'Example value',
    is_hierarchical: 'Example value',
    defines_ancestry: 'Example value',
    reverse_relationship_id: 'Example value',
    relationship_concept_id: 8507,
  })
})

export const deleteRelationshipsRelationshipIdHandler = http.delete<
  { relationship_id: string },
  never,
  never
>('/relationships/:relationship_id', () => {
  return HttpResponse.json(undefined)
})

export const getSourceToConceptMapsHandler = http.get<
  never,
  never,
  {
    data: Array<VocabularySourceToConceptMap>
    pagination: { total: number; offset: number; limit: number; count: number }
  }
>('/source-to-concept-maps', () => {
  return HttpResponse.json({
    data: [
      {
        source_code: 'Example value',
        source_concept_id: 8507,
        source_vocabulary_id: 'Example value',
        source_code_description: 'Example value',
        target_concept_id: 8507,
        target_vocabulary_id: 'Example value',
        valid_start_date: '2023-01-15',
        valid_end_date: '2023-01-15',
        invalid_reason: 'Example value',
      },
    ],
  })
})

export const postSourceToConceptMapsHandler = http.post<
  never,
  VocabularySourceToConceptMapCreate,
  VocabularySourceToConceptMap
>('/source-to-concept-maps', () => {
  return HttpResponse.json({
    source_code: 'Example value',
    source_concept_id: 8507,
    source_vocabulary_id: 'Example value',
    source_code_description: 'Example value',
    target_concept_id: 8507,
    target_vocabulary_id: 'Example value',
    valid_start_date: '2023-01-15',
    valid_end_date: '2023-01-15',
    invalid_reason: 'Example value',
  })
})

export const getSourceToConceptMapsSourceToConceptMapIdHandler = http.get<
  { source_to_concept_map_id: number },
  never,
  VocabularySourceToConceptMap
>('/source-to-concept-maps/:source_to_concept_map_id', () => {
  return HttpResponse.json({
    source_code: 'Example value',
    source_concept_id: 8507,
    source_vocabulary_id: 'Example value',
    source_code_description: 'Example value',
    target_concept_id: 8507,
    target_vocabulary_id: 'Example value',
    valid_start_date: '2023-01-15',
    valid_end_date: '2023-01-15',
    invalid_reason: 'Example value',
  })
})

export const putSourceToConceptMapsSourceToConceptMapIdHandler = http.put<
  { source_to_concept_map_id: number },
  VocabularySourceToConceptMapCreate,
  VocabularySourceToConceptMap
>('/source-to-concept-maps/:source_to_concept_map_id', () => {
  return HttpResponse.json({
    source_code: 'Example value',
    source_concept_id: 8507,
    source_vocabulary_id: 'Example value',
    source_code_description: 'Example value',
    target_concept_id: 8507,
    target_vocabulary_id: 'Example value',
    valid_start_date: '2023-01-15',
    valid_end_date: '2023-01-15',
    invalid_reason: 'Example value',
  })
})

export const patchSourceToConceptMapsSourceToConceptMapIdHandler = http.patch<
  { source_to_concept_map_id: number },
  VocabularySourceToConceptMapUpdate,
  VocabularySourceToConceptMap
>('/source-to-concept-maps/:source_to_concept_map_id', () => {
  return HttpResponse.json({
    source_code: 'Example value',
    source_concept_id: 8507,
    source_vocabulary_id: 'Example value',
    source_code_description: 'Example value',
    target_concept_id: 8507,
    target_vocabulary_id: 'Example value',
    valid_start_date: '2023-01-15',
    valid_end_date: '2023-01-15',
    invalid_reason: 'Example value',
  })
})

export const deleteSourceToConceptMapsSourceToConceptMapIdHandler = http.delete<
  { source_to_concept_map_id: number },
  never,
  never
>('/source-to-concept-maps/:source_to_concept_map_id', () => {
  return HttpResponse.json(undefined)
})

export const getSpecimensHandler = http.get<
  never,
  never,
  {
    data: Array<ClinicalSpecimen>
    pagination: { total: number; offset: number; limit: number; count: number }
  }
>('/specimens', () => {
  return HttpResponse.json({
    data: [
      {
        specimen_id: 12345,
        person_id: 100,
        specimen_concept_id: 8507,
        specimen_type_concept_id: 8507,
        specimen_date: '2023-01-15',
        specimen_datetime: '2023-01-15',
        quantity: 98.6,
        unit_concept_id: 8507,
        anatomic_site_concept_id: 8507,
        disease_status_concept_id: 8507,
        specimen_source_id: 'Example value',
        specimen_source_value: 'Example value',
        unit_source_value: 'Example value',
        anatomic_site_source_value: 'Example value',
        disease_status_source_value: 'Example value',
      },
    ],
  })
})

export const postSpecimensHandler = http.post<
  never,
  ClinicalSpecimenCreate,
  ClinicalSpecimen
>('/specimens', () => {
  return HttpResponse.json({
    specimen_id: 12345,
    person_id: 100,
    specimen_concept_id: 8507,
    specimen_type_concept_id: 8507,
    specimen_date: '2023-01-15',
    specimen_datetime: '2023-01-15',
    quantity: 98.6,
    unit_concept_id: 8507,
    anatomic_site_concept_id: 8507,
    disease_status_concept_id: 8507,
    specimen_source_id: 'Example value',
    specimen_source_value: 'Example value',
    unit_source_value: 'Example value',
    anatomic_site_source_value: 'Example value',
    disease_status_source_value: 'Example value',
  })
})

export const getSpecimensSpecimenIdHandler = http.get<
  { specimen_id: number },
  never,
  ClinicalSpecimen
>('/specimens/:specimen_id', () => {
  return HttpResponse.json({
    specimen_id: 12345,
    person_id: 100,
    specimen_concept_id: 8507,
    specimen_type_concept_id: 8507,
    specimen_date: '2023-01-15',
    specimen_datetime: '2023-01-15',
    quantity: 98.6,
    unit_concept_id: 8507,
    anatomic_site_concept_id: 8507,
    disease_status_concept_id: 8507,
    specimen_source_id: 'Example value',
    specimen_source_value: 'Example value',
    unit_source_value: 'Example value',
    anatomic_site_source_value: 'Example value',
    disease_status_source_value: 'Example value',
  })
})

export const putSpecimensSpecimenIdHandler = http.put<
  { specimen_id: number },
  ClinicalSpecimenCreate,
  ClinicalSpecimen
>('/specimens/:specimen_id', () => {
  return HttpResponse.json({
    specimen_id: 12345,
    person_id: 100,
    specimen_concept_id: 8507,
    specimen_type_concept_id: 8507,
    specimen_date: '2023-01-15',
    specimen_datetime: '2023-01-15',
    quantity: 98.6,
    unit_concept_id: 8507,
    anatomic_site_concept_id: 8507,
    disease_status_concept_id: 8507,
    specimen_source_id: 'Example value',
    specimen_source_value: 'Example value',
    unit_source_value: 'Example value',
    anatomic_site_source_value: 'Example value',
    disease_status_source_value: 'Example value',
  })
})

export const patchSpecimensSpecimenIdHandler = http.patch<
  { specimen_id: number },
  ClinicalSpecimenUpdate,
  ClinicalSpecimen
>('/specimens/:specimen_id', () => {
  return HttpResponse.json({
    specimen_id: 12345,
    person_id: 100,
    specimen_concept_id: 8507,
    specimen_type_concept_id: 8507,
    specimen_date: '2023-01-15',
    specimen_datetime: '2023-01-15',
    quantity: 98.6,
    unit_concept_id: 8507,
    anatomic_site_concept_id: 8507,
    disease_status_concept_id: 8507,
    specimen_source_id: 'Example value',
    specimen_source_value: 'Example value',
    unit_source_value: 'Example value',
    anatomic_site_source_value: 'Example value',
    disease_status_source_value: 'Example value',
  })
})

export const deleteSpecimensSpecimenIdHandler = http.delete<
  { specimen_id: number },
  never,
  never
>('/specimens/:specimen_id', () => {
  return HttpResponse.json(undefined)
})

export const getVisitDetailsHandler = http.get<
  never,
  never,
  {
    data: Array<ClinicalVisitDetail>
    pagination: { total: number; offset: number; limit: number; count: number }
  }
>('/visit-details', () => {
  return HttpResponse.json({
    data: [
      {
        visit_detail_id: 12345,
        person_id: 100,
        visit_detail_concept_id: 8507,
        visit_detail_start_date: '2023-01-15',
        visit_detail_start_datetime: '2023-01-15',
        visit_detail_end_date: '2023-01-15',
        visit_detail_end_datetime: '2023-01-15',
        visit_detail_type_concept_id: 8507,
        provider_id: 100,
        care_site_id: 100,
        visit_detail_source_value: 'Example value',
        visit_detail_source_concept_id: 8507,
        admitted_from_concept_id: 8507,
        admitted_from_source_value: 'Example value',
        discharged_to_source_value: 'Example value',
        discharged_to_concept_id: 8507,
        preceding_visit_detail_id: 100,
        parent_visit_detail_id: 100,
        visit_occurrence_id: 100,
      },
    ],
  })
})

export const postVisitDetailsHandler = http.post<
  never,
  ClinicalVisitDetailCreate,
  ClinicalVisitDetail
>('/visit-details', () => {
  return HttpResponse.json({
    visit_detail_id: 12345,
    person_id: 100,
    visit_detail_concept_id: 8507,
    visit_detail_start_date: '2023-01-15',
    visit_detail_start_datetime: '2023-01-15',
    visit_detail_end_date: '2023-01-15',
    visit_detail_end_datetime: '2023-01-15',
    visit_detail_type_concept_id: 8507,
    provider_id: 100,
    care_site_id: 100,
    visit_detail_source_value: 'Example value',
    visit_detail_source_concept_id: 8507,
    admitted_from_concept_id: 8507,
    admitted_from_source_value: 'Example value',
    discharged_to_source_value: 'Example value',
    discharged_to_concept_id: 8507,
    preceding_visit_detail_id: 100,
    parent_visit_detail_id: 100,
    visit_occurrence_id: 100,
  })
})

export const getVisitDetailsVisitDetailIdHandler = http.get<
  { visit_detail_id: number },
  never,
  ClinicalVisitDetail
>('/visit-details/:visit_detail_id', () => {
  return HttpResponse.json({
    visit_detail_id: 12345,
    person_id: 100,
    visit_detail_concept_id: 8507,
    visit_detail_start_date: '2023-01-15',
    visit_detail_start_datetime: '2023-01-15',
    visit_detail_end_date: '2023-01-15',
    visit_detail_end_datetime: '2023-01-15',
    visit_detail_type_concept_id: 8507,
    provider_id: 100,
    care_site_id: 100,
    visit_detail_source_value: 'Example value',
    visit_detail_source_concept_id: 8507,
    admitted_from_concept_id: 8507,
    admitted_from_source_value: 'Example value',
    discharged_to_source_value: 'Example value',
    discharged_to_concept_id: 8507,
    preceding_visit_detail_id: 100,
    parent_visit_detail_id: 100,
    visit_occurrence_id: 100,
  })
})

export const putVisitDetailsVisitDetailIdHandler = http.put<
  { visit_detail_id: number },
  ClinicalVisitDetailCreate,
  ClinicalVisitDetail
>('/visit-details/:visit_detail_id', () => {
  return HttpResponse.json({
    visit_detail_id: 12345,
    person_id: 100,
    visit_detail_concept_id: 8507,
    visit_detail_start_date: '2023-01-15',
    visit_detail_start_datetime: '2023-01-15',
    visit_detail_end_date: '2023-01-15',
    visit_detail_end_datetime: '2023-01-15',
    visit_detail_type_concept_id: 8507,
    provider_id: 100,
    care_site_id: 100,
    visit_detail_source_value: 'Example value',
    visit_detail_source_concept_id: 8507,
    admitted_from_concept_id: 8507,
    admitted_from_source_value: 'Example value',
    discharged_to_source_value: 'Example value',
    discharged_to_concept_id: 8507,
    preceding_visit_detail_id: 100,
    parent_visit_detail_id: 100,
    visit_occurrence_id: 100,
  })
})

export const patchVisitDetailsVisitDetailIdHandler = http.patch<
  { visit_detail_id: number },
  ClinicalVisitDetailUpdate,
  ClinicalVisitDetail
>('/visit-details/:visit_detail_id', () => {
  return HttpResponse.json({
    visit_detail_id: 12345,
    person_id: 100,
    visit_detail_concept_id: 8507,
    visit_detail_start_date: '2023-01-15',
    visit_detail_start_datetime: '2023-01-15',
    visit_detail_end_date: '2023-01-15',
    visit_detail_end_datetime: '2023-01-15',
    visit_detail_type_concept_id: 8507,
    provider_id: 100,
    care_site_id: 100,
    visit_detail_source_value: 'Example value',
    visit_detail_source_concept_id: 8507,
    admitted_from_concept_id: 8507,
    admitted_from_source_value: 'Example value',
    discharged_to_source_value: 'Example value',
    discharged_to_concept_id: 8507,
    preceding_visit_detail_id: 100,
    parent_visit_detail_id: 100,
    visit_occurrence_id: 100,
  })
})

export const deleteVisitDetailsVisitDetailIdHandler = http.delete<
  { visit_detail_id: number },
  never,
  never
>('/visit-details/:visit_detail_id', () => {
  return HttpResponse.json(undefined)
})

export const getVisitOccurrencesHandler = http.get<
  never,
  never,
  {
    data: Array<ClinicalVisitOccurrence>
    pagination: { total: number; offset: number; limit: number; count: number }
  }
>('/visit-occurrences', () => {
  return HttpResponse.json({
    data: [
      {
        visit_occurrence_id: 12345,
        person_id: 100,
        visit_concept_id: 8507,
        visit_start_date: '2023-01-15',
        visit_start_datetime: '2023-01-15',
        visit_end_date: '2023-01-15',
        visit_end_datetime: '2023-01-15',
        visit_type_concept_id: 8507,
        provider_id: 100,
        care_site_id: 100,
        visit_source_value: 'Example value',
        visit_source_concept_id: 8507,
        admitted_from_concept_id: 8507,
        admitted_from_source_value: 'Example value',
        discharged_to_concept_id: 8507,
        discharged_to_source_value: 'Example value',
        preceding_visit_occurrence_id: 100,
      },
    ],
  })
})

export const postVisitOccurrencesHandler = http.post<
  never,
  ClinicalVisitOccurrenceCreate,
  ClinicalVisitOccurrence
>('/visit-occurrences', () => {
  return HttpResponse.json({
    visit_occurrence_id: 12345,
    person_id: 100,
    visit_concept_id: 8507,
    visit_start_date: '2023-01-15',
    visit_start_datetime: '2023-01-15',
    visit_end_date: '2023-01-15',
    visit_end_datetime: '2023-01-15',
    visit_type_concept_id: 8507,
    provider_id: 100,
    care_site_id: 100,
    visit_source_value: 'Example value',
    visit_source_concept_id: 8507,
    admitted_from_concept_id: 8507,
    admitted_from_source_value: 'Example value',
    discharged_to_concept_id: 8507,
    discharged_to_source_value: 'Example value',
    preceding_visit_occurrence_id: 100,
  })
})

export const getVisitOccurrencesVisitOccurrenceIdHandler = http.get<
  { visit_occurrence_id: number },
  never,
  ClinicalVisitOccurrence
>('/visit-occurrences/:visit_occurrence_id', () => {
  return HttpResponse.json({
    visit_occurrence_id: 12345,
    person_id: 100,
    visit_concept_id: 8507,
    visit_start_date: '2023-01-15',
    visit_start_datetime: '2023-01-15',
    visit_end_date: '2023-01-15',
    visit_end_datetime: '2023-01-15',
    visit_type_concept_id: 8507,
    provider_id: 100,
    care_site_id: 100,
    visit_source_value: 'Example value',
    visit_source_concept_id: 8507,
    admitted_from_concept_id: 8507,
    admitted_from_source_value: 'Example value',
    discharged_to_concept_id: 8507,
    discharged_to_source_value: 'Example value',
    preceding_visit_occurrence_id: 100,
  })
})

export const putVisitOccurrencesVisitOccurrenceIdHandler = http.put<
  { visit_occurrence_id: number },
  ClinicalVisitOccurrenceCreate,
  ClinicalVisitOccurrence
>('/visit-occurrences/:visit_occurrence_id', () => {
  return HttpResponse.json({
    visit_occurrence_id: 12345,
    person_id: 100,
    visit_concept_id: 8507,
    visit_start_date: '2023-01-15',
    visit_start_datetime: '2023-01-15',
    visit_end_date: '2023-01-15',
    visit_end_datetime: '2023-01-15',
    visit_type_concept_id: 8507,
    provider_id: 100,
    care_site_id: 100,
    visit_source_value: 'Example value',
    visit_source_concept_id: 8507,
    admitted_from_concept_id: 8507,
    admitted_from_source_value: 'Example value',
    discharged_to_concept_id: 8507,
    discharged_to_source_value: 'Example value',
    preceding_visit_occurrence_id: 100,
  })
})

export const patchVisitOccurrencesVisitOccurrenceIdHandler = http.patch<
  { visit_occurrence_id: number },
  ClinicalVisitOccurrenceUpdate,
  ClinicalVisitOccurrence
>('/visit-occurrences/:visit_occurrence_id', () => {
  return HttpResponse.json({
    visit_occurrence_id: 12345,
    person_id: 100,
    visit_concept_id: 8507,
    visit_start_date: '2023-01-15',
    visit_start_datetime: '2023-01-15',
    visit_end_date: '2023-01-15',
    visit_end_datetime: '2023-01-15',
    visit_type_concept_id: 8507,
    provider_id: 100,
    care_site_id: 100,
    visit_source_value: 'Example value',
    visit_source_concept_id: 8507,
    admitted_from_concept_id: 8507,
    admitted_from_source_value: 'Example value',
    discharged_to_concept_id: 8507,
    discharged_to_source_value: 'Example value',
    preceding_visit_occurrence_id: 100,
  })
})

export const deleteVisitOccurrencesVisitOccurrenceIdHandler = http.delete<
  { visit_occurrence_id: number },
  never,
  never
>('/visit-occurrences/:visit_occurrence_id', () => {
  return HttpResponse.json(undefined)
})

export const getVocabularysHandler = http.get<
  never,
  never,
  {
    data: Array<VocabularyVocabulary>
    pagination: { total: number; offset: number; limit: number; count: number }
  }
>('/vocabularys', () => {
  return HttpResponse.json({
    data: [
      {
        vocabulary_id: '12345',
        vocabulary_name: 'Example value',
        vocabulary_reference: 'Example value',
        vocabulary_version: 'Example value',
        vocabulary_concept_id: 8507,
      },
    ],
  })
})

export const postVocabularysHandler = http.post<
  never,
  VocabularyVocabularyCreate,
  VocabularyVocabulary
>('/vocabularys', () => {
  return HttpResponse.json({
    vocabulary_id: '12345',
    vocabulary_name: 'Example value',
    vocabulary_reference: 'Example value',
    vocabulary_version: 'Example value',
    vocabulary_concept_id: 8507,
  })
})

export const getVocabularysVocabularyIdHandler = http.get<
  { vocabulary_id: string },
  never,
  VocabularyVocabulary
>('/vocabularys/:vocabulary_id', () => {
  return HttpResponse.json({
    vocabulary_id: '12345',
    vocabulary_name: 'Example value',
    vocabulary_reference: 'Example value',
    vocabulary_version: 'Example value',
    vocabulary_concept_id: 8507,
  })
})

export const putVocabularysVocabularyIdHandler = http.put<
  { vocabulary_id: string },
  VocabularyVocabularyCreate,
  VocabularyVocabulary
>('/vocabularys/:vocabulary_id', () => {
  return HttpResponse.json({
    vocabulary_id: '12345',
    vocabulary_name: 'Example value',
    vocabulary_reference: 'Example value',
    vocabulary_version: 'Example value',
    vocabulary_concept_id: 8507,
  })
})

export const patchVocabularysVocabularyIdHandler = http.patch<
  { vocabulary_id: string },
  VocabularyVocabularyUpdate,
  VocabularyVocabulary
>('/vocabularys/:vocabulary_id', () => {
  return HttpResponse.json({
    vocabulary_id: '12345',
    vocabulary_name: 'Example value',
    vocabulary_reference: 'Example value',
    vocabulary_version: 'Example value',
    vocabulary_concept_id: 8507,
  })
})

export const deleteVocabularysVocabularyIdHandler = http.delete<
  { vocabulary_id: string },
  never,
  never
>('/vocabularys/:vocabulary_id', () => {
  return HttpResponse.json(undefined)
})
