import { HealthsystemCareSiteList } from '@/types/healthsystemCareSiteList.generated.ts'
import { http, HttpResponse } from 'msw'
import { HealthsystemCareSiteCreate } from '@/types/healthsystemCareSiteCreate.generated.ts'
import { HealthsystemCareSite } from '@/types/healthsystemCareSite.generated.ts'
import { HealthsystemCareSiteUpdate } from '@/types/healthsystemCareSiteUpdate.generated.ts'
import { MetadataCdmSourceList } from '@/types/metadataCdmSourceList.generated.ts'
import { MetadataCdmSourceCreate } from '@/types/metadataCdmSourceCreate.generated.ts'
import { MetadataCdmSource } from '@/types/metadataCdmSource.generated.ts'
import { MetadataCdmSourceUpdate } from '@/types/metadataCdmSourceUpdate.generated.ts'
import { ResultsCohortDefinitionList } from '@/types/resultsCohortDefinitionList.generated.ts'
import { ResultsCohortDefinitionCreate } from '@/types/resultsCohortDefinitionCreate.generated.ts'
import { ResultsCohortDefinition } from '@/types/resultsCohortDefinition.generated.ts'
import { ResultsCohortDefinitionUpdate } from '@/types/resultsCohortDefinitionUpdate.generated.ts'
import { ResultsCohortList } from '@/types/resultsCohortList.generated.ts'
import { ResultsCohortCreate } from '@/types/resultsCohortCreate.generated.ts'
import { ResultsCohort } from '@/types/resultsCohort.generated.ts'
import { ResultsCohortUpdate } from '@/types/resultsCohortUpdate.generated.ts'
import { VocabularyConceptAncestorList } from '@/types/vocabularyConceptAncestorList.generated.ts'
import { VocabularyConceptAncestorCreate } from '@/types/vocabularyConceptAncestorCreate.generated.ts'
import { VocabularyConceptAncestor } from '@/types/vocabularyConceptAncestor.generated.ts'
import { VocabularyConceptAncestorUpdate } from '@/types/vocabularyConceptAncestorUpdate.generated.ts'
import { VocabularyConceptClassList } from '@/types/vocabularyConceptClassList.generated.ts'
import { VocabularyConceptClassCreate } from '@/types/vocabularyConceptClassCreate.generated.ts'
import { VocabularyConceptClass } from '@/types/vocabularyConceptClass.generated.ts'
import { VocabularyConceptClassUpdate } from '@/types/vocabularyConceptClassUpdate.generated.ts'
import { VocabularyConceptRelationshipList } from '@/types/vocabularyConceptRelationshipList.generated.ts'
import { VocabularyConceptRelationshipCreate } from '@/types/vocabularyConceptRelationshipCreate.generated.ts'
import { VocabularyConceptRelationship } from '@/types/vocabularyConceptRelationship.generated.ts'
import { VocabularyConceptRelationshipUpdate } from '@/types/vocabularyConceptRelationshipUpdate.generated.ts'
import { VocabularyConceptSynonymList } from '@/types/vocabularyConceptSynonymList.generated.ts'
import { VocabularyConceptSynonymCreate } from '@/types/vocabularyConceptSynonymCreate.generated.ts'
import { VocabularyConceptSynonym } from '@/types/vocabularyConceptSynonym.generated.ts'
import { VocabularyConceptSynonymUpdate } from '@/types/vocabularyConceptSynonymUpdate.generated.ts'
import { VocabularyConceptList } from '@/types/vocabularyConceptList.generated.ts'
import { VocabularyConceptCreate } from '@/types/vocabularyConceptCreate.generated.ts'
import { VocabularyConcept } from '@/types/vocabularyConcept.generated.ts'
import { VocabularyConceptUpdate } from '@/types/vocabularyConceptUpdate.generated.ts'
import { DerivedConditionEraList } from '@/types/derivedConditionEraList.generated.ts'
import { DerivedConditionEraCreate } from '@/types/derivedConditionEraCreate.generated.ts'
import { DerivedConditionEra } from '@/types/derivedConditionEra.generated.ts'
import { DerivedConditionEraUpdate } from '@/types/derivedConditionEraUpdate.generated.ts'
import { ClinicalConditionOccurrenceList } from '@/types/clinicalConditionOccurrenceList.generated.ts'
import { ClinicalConditionOccurrenceCreate } from '@/types/clinicalConditionOccurrenceCreate.generated.ts'
import { ClinicalConditionOccurrence } from '@/types/clinicalConditionOccurrence.generated.ts'
import { ClinicalConditionOccurrenceUpdate } from '@/types/clinicalConditionOccurrenceUpdate.generated.ts'
import { HealthsystemCostList } from '@/types/healthsystemCostList.generated.ts'
import { HealthsystemCostCreate } from '@/types/healthsystemCostCreate.generated.ts'
import { HealthsystemCost } from '@/types/healthsystemCost.generated.ts'
import { HealthsystemCostUpdate } from '@/types/healthsystemCostUpdate.generated.ts'
import { ClinicalDeathList } from '@/types/clinicalDeathList.generated.ts'
import { ClinicalDeathCreate } from '@/types/clinicalDeathCreate.generated.ts'
import { ClinicalDeath } from '@/types/clinicalDeath.generated.ts'
import { ClinicalDeathUpdate } from '@/types/clinicalDeathUpdate.generated.ts'
import { ClinicalDeviceExposureList } from '@/types/clinicalDeviceExposureList.generated.ts'
import { ClinicalDeviceExposureCreate } from '@/types/clinicalDeviceExposureCreate.generated.ts'
import { ClinicalDeviceExposure } from '@/types/clinicalDeviceExposure.generated.ts'
import { ClinicalDeviceExposureUpdate } from '@/types/clinicalDeviceExposureUpdate.generated.ts'
import { VocabularyDomainList } from '@/types/vocabularyDomainList.generated.ts'
import { VocabularyDomainCreate } from '@/types/vocabularyDomainCreate.generated.ts'
import { VocabularyDomain } from '@/types/vocabularyDomain.generated.ts'
import { VocabularyDomainUpdate } from '@/types/vocabularyDomainUpdate.generated.ts'
import { DerivedDoseEraList } from '@/types/derivedDoseEraList.generated.ts'
import { DerivedDoseEraCreate } from '@/types/derivedDoseEraCreate.generated.ts'
import { DerivedDoseEra } from '@/types/derivedDoseEra.generated.ts'
import { DerivedDoseEraUpdate } from '@/types/derivedDoseEraUpdate.generated.ts'
import { DerivedDrugEraList } from '@/types/derivedDrugEraList.generated.ts'
import { DerivedDrugEraCreate } from '@/types/derivedDrugEraCreate.generated.ts'
import { DerivedDrugEra } from '@/types/derivedDrugEra.generated.ts'
import { DerivedDrugEraUpdate } from '@/types/derivedDrugEraUpdate.generated.ts'
import { ClinicalDrugExposureList } from '@/types/clinicalDrugExposureList.generated.ts'
import { ClinicalDrugExposureCreate } from '@/types/clinicalDrugExposureCreate.generated.ts'
import { ClinicalDrugExposure } from '@/types/clinicalDrugExposure.generated.ts'
import { ClinicalDrugExposureUpdate } from '@/types/clinicalDrugExposureUpdate.generated.ts'
import { VocabularyDrugStrengthList } from '@/types/vocabularyDrugStrengthList.generated.ts'
import { VocabularyDrugStrengthCreate } from '@/types/vocabularyDrugStrengthCreate.generated.ts'
import { VocabularyDrugStrength } from '@/types/vocabularyDrugStrength.generated.ts'
import { VocabularyDrugStrengthUpdate } from '@/types/vocabularyDrugStrengthUpdate.generated.ts'
import { DerivedEpisodeEventList } from '@/types/derivedEpisodeEventList.generated.ts'
import { DerivedEpisodeEventCreate } from '@/types/derivedEpisodeEventCreate.generated.ts'
import { DerivedEpisodeEvent } from '@/types/derivedEpisodeEvent.generated.ts'
import { DerivedEpisodeEventUpdate } from '@/types/derivedEpisodeEventUpdate.generated.ts'
import { DerivedEpisodeList } from '@/types/derivedEpisodeList.generated.ts'
import { DerivedEpisodeCreate } from '@/types/derivedEpisodeCreate.generated.ts'
import { DerivedEpisode } from '@/types/derivedEpisode.generated.ts'
import { DerivedEpisodeUpdate } from '@/types/derivedEpisodeUpdate.generated.ts'
import { ResultsFactRelationshipList } from '@/types/resultsFactRelationshipList.generated.ts'
import { ResultsFactRelationshipCreate } from '@/types/resultsFactRelationshipCreate.generated.ts'
import { ResultsFactRelationship } from '@/types/resultsFactRelationship.generated.ts'
import { ResultsFactRelationshipUpdate } from '@/types/resultsFactRelationshipUpdate.generated.ts'
import { HealthsystemLocationList } from '@/types/healthsystemLocationList.generated.ts'
import { HealthsystemLocationCreate } from '@/types/healthsystemLocationCreate.generated.ts'
import { HealthsystemLocation } from '@/types/healthsystemLocation.generated.ts'
import { HealthsystemLocationUpdate } from '@/types/healthsystemLocationUpdate.generated.ts'
import { ClinicalMeasurementList } from '@/types/clinicalMeasurementList.generated.ts'
import { ClinicalMeasurementCreate } from '@/types/clinicalMeasurementCreate.generated.ts'
import { ClinicalMeasurement } from '@/types/clinicalMeasurement.generated.ts'
import { ClinicalMeasurementUpdate } from '@/types/clinicalMeasurementUpdate.generated.ts'
import { MetadataMetadataList } from '@/types/metadataMetadataList.generated.ts'
import { MetadataMetadataCreate } from '@/types/metadataMetadataCreate.generated.ts'
import { MetadataMetadata } from '@/types/metadataMetadata.generated.ts'
import { MetadataMetadataUpdate } from '@/types/metadataMetadataUpdate.generated.ts'
import { ClinicalNoteNlpList } from '@/types/clinicalNoteNlpList.generated.ts'
import { ClinicalNoteNlpCreate } from '@/types/clinicalNoteNlpCreate.generated.ts'
import { ClinicalNoteNlp } from '@/types/clinicalNoteNlp.generated.ts'
import { ClinicalNoteNlpUpdate } from '@/types/clinicalNoteNlpUpdate.generated.ts'
import { ClinicalNoteList } from '@/types/clinicalNoteList.generated.ts'
import { ClinicalNoteCreate } from '@/types/clinicalNoteCreate.generated.ts'
import { ClinicalNote } from '@/types/clinicalNote.generated.ts'
import { ClinicalNoteUpdate } from '@/types/clinicalNoteUpdate.generated.ts'
import { ClinicalObservationPeriodList } from '@/types/clinicalObservationPeriodList.generated.ts'
import { ClinicalObservationPeriodCreate } from '@/types/clinicalObservationPeriodCreate.generated.ts'
import { ClinicalObservationPeriod } from '@/types/clinicalObservationPeriod.generated.ts'
import { ClinicalObservationPeriodUpdate } from '@/types/clinicalObservationPeriodUpdate.generated.ts'
import { ClinicalObservationList } from '@/types/clinicalObservationList.generated.ts'
import { ClinicalObservationCreate } from '@/types/clinicalObservationCreate.generated.ts'
import { ClinicalObservation } from '@/types/clinicalObservation.generated.ts'
import { ClinicalObservationUpdate } from '@/types/clinicalObservationUpdate.generated.ts'
import { HealthsystemPayerPlanPeriodList } from '@/types/healthsystemPayerPlanPeriodList.generated.ts'
import { HealthsystemPayerPlanPeriodCreate } from '@/types/healthsystemPayerPlanPeriodCreate.generated.ts'
import { HealthsystemPayerPlanPeriod } from '@/types/healthsystemPayerPlanPeriod.generated.ts'
import { HealthsystemPayerPlanPeriodUpdate } from '@/types/healthsystemPayerPlanPeriodUpdate.generated.ts'
import { ClinicalPersonList } from '@/types/clinicalPersonList.generated.ts'
import { ClinicalPersonCreate } from '@/types/clinicalPersonCreate.generated.ts'
import { ClinicalPerson } from '@/types/clinicalPerson.generated.ts'
import { ClinicalPersonUpdate } from '@/types/clinicalPersonUpdate.generated.ts'
import { ClinicalProcedureOccurrenceList } from '@/types/clinicalProcedureOccurrenceList.generated.ts'
import { ClinicalProcedureOccurrenceCreate } from '@/types/clinicalProcedureOccurrenceCreate.generated.ts'
import { ClinicalProcedureOccurrence } from '@/types/clinicalProcedureOccurrence.generated.ts'
import { ClinicalProcedureOccurrenceUpdate } from '@/types/clinicalProcedureOccurrenceUpdate.generated.ts'
import { HealthsystemProviderList } from '@/types/healthsystemProviderList.generated.ts'
import { HealthsystemProviderCreate } from '@/types/healthsystemProviderCreate.generated.ts'
import { HealthsystemProvider } from '@/types/healthsystemProvider.generated.ts'
import { HealthsystemProviderUpdate } from '@/types/healthsystemProviderUpdate.generated.ts'
import { VocabularyRelationshipList } from '@/types/vocabularyRelationshipList.generated.ts'
import { VocabularyRelationshipCreate } from '@/types/vocabularyRelationshipCreate.generated.ts'
import { VocabularyRelationship } from '@/types/vocabularyRelationship.generated.ts'
import { VocabularyRelationshipUpdate } from '@/types/vocabularyRelationshipUpdate.generated.ts'
import { VocabularySourceToConceptMapList } from '@/types/vocabularySourceToConceptMapList.generated.ts'
import { VocabularySourceToConceptMapCreate } from '@/types/vocabularySourceToConceptMapCreate.generated.ts'
import { VocabularySourceToConceptMap } from '@/types/vocabularySourceToConceptMap.generated.ts'
import { VocabularySourceToConceptMapUpdate } from '@/types/vocabularySourceToConceptMapUpdate.generated.ts'
import { ClinicalSpecimenList } from '@/types/clinicalSpecimenList.generated.ts'
import { ClinicalSpecimenCreate } from '@/types/clinicalSpecimenCreate.generated.ts'
import { ClinicalSpecimen } from '@/types/clinicalSpecimen.generated.ts'
import { ClinicalSpecimenUpdate } from '@/types/clinicalSpecimenUpdate.generated.ts'
import { ClinicalVisitDetailList } from '@/types/clinicalVisitDetailList.generated.ts'
import { ClinicalVisitDetailCreate } from '@/types/clinicalVisitDetailCreate.generated.ts'
import { ClinicalVisitDetail } from '@/types/clinicalVisitDetail.generated.ts'
import { ClinicalVisitDetailUpdate } from '@/types/clinicalVisitDetailUpdate.generated.ts'
import { ClinicalVisitOccurrenceList } from '@/types/clinicalVisitOccurrenceList.generated.ts'
import { ClinicalVisitOccurrenceCreate } from '@/types/clinicalVisitOccurrenceCreate.generated.ts'
import { ClinicalVisitOccurrence } from '@/types/clinicalVisitOccurrence.generated.ts'
import { ClinicalVisitOccurrenceUpdate } from '@/types/clinicalVisitOccurrenceUpdate.generated.ts'
import { VocabularyVocabularyList } from '@/types/vocabularyVocabularyList.generated.ts'
import { VocabularyVocabularyCreate } from '@/types/vocabularyVocabularyCreate.generated.ts'
import { VocabularyVocabulary } from '@/types/vocabularyVocabulary.generated.ts'
import { VocabularyVocabularyUpdate } from '@/types/vocabularyVocabularyUpdate.generated.ts'

export const getCareSitesHandler = http.get<
  never,
  never,
  HealthsystemCareSiteList
>('/care-sites', () => {
  return HttpResponse.json({
    data: [
      {
        id: 12345,
        care_site_name: 'Example value',
        place_of_service_concept_id: 8507,
        location_id: 100,
        care_site_source_value: 'Example value',
        place_of_service_source_value: 'Example value',
      },
    ],
    pagination: {
      total: 1,
      offset: 0,
      limit: 100,
      count: 1,
    },
  })
})

export const toRoutesList = () => [
  getCareSitesHandler,
  postCareSitesHandler,
  getCareSitesIdHandler,
  putCareSitesIdHandler,
  patchCareSitesIdHandler,
  deleteCareSitesIdHandler,
  getCdmSourcesHandler,
  postCdmSourcesHandler,
  getCdmSourcesIdHandler,
  putCdmSourcesIdHandler,
  patchCdmSourcesIdHandler,
  deleteCdmSourcesIdHandler,
  getCohortDefinitionsHandler,
  postCohortDefinitionsHandler,
  getCohortDefinitionsIdHandler,
  putCohortDefinitionsIdHandler,
  patchCohortDefinitionsIdHandler,
  deleteCohortDefinitionsIdHandler,
  getCohortsHandler,
  postCohortsHandler,
  getCohortsIdHandler,
  putCohortsIdHandler,
  patchCohortsIdHandler,
  deleteCohortsIdHandler,
  getConceptAncestorsHandler,
  postConceptAncestorsHandler,
  getConceptAncestorsIdHandler,
  putConceptAncestorsIdHandler,
  patchConceptAncestorsIdHandler,
  deleteConceptAncestorsIdHandler,
  getConceptClasssHandler,
  postConceptClasssHandler,
  getConceptClasssIdHandler,
  putConceptClasssIdHandler,
  patchConceptClasssIdHandler,
  deleteConceptClasssIdHandler,
  getConceptRelationshipsHandler,
  postConceptRelationshipsHandler,
  getConceptRelationshipsIdHandler,
  putConceptRelationshipsIdHandler,
  patchConceptRelationshipsIdHandler,
  deleteConceptRelationshipsIdHandler,
  getConceptSynonymsHandler,
  postConceptSynonymsHandler,
  getConceptSynonymsIdHandler,
  putConceptSynonymsIdHandler,
  patchConceptSynonymsIdHandler,
  deleteConceptSynonymsIdHandler,
  getConceptsHandler,
  postConceptsHandler,
  getConceptsIdHandler,
  putConceptsIdHandler,
  patchConceptsIdHandler,
  deleteConceptsIdHandler,
  getConditionErasHandler,
  postConditionErasHandler,
  getConditionErasIdHandler,
  putConditionErasIdHandler,
  patchConditionErasIdHandler,
  deleteConditionErasIdHandler,
  getConditionOccurrencesHandler,
  postConditionOccurrencesHandler,
  getConditionOccurrencesIdHandler,
  putConditionOccurrencesIdHandler,
  patchConditionOccurrencesIdHandler,
  deleteConditionOccurrencesIdHandler,
  getCostsHandler,
  postCostsHandler,
  getCostsIdHandler,
  putCostsIdHandler,
  patchCostsIdHandler,
  deleteCostsIdHandler,
  getDeathsHandler,
  postDeathsHandler,
  getDeathsIdHandler,
  putDeathsIdHandler,
  patchDeathsIdHandler,
  deleteDeathsIdHandler,
  getDeviceExposuresHandler,
  postDeviceExposuresHandler,
  getDeviceExposuresIdHandler,
  putDeviceExposuresIdHandler,
  patchDeviceExposuresIdHandler,
  deleteDeviceExposuresIdHandler,
  getDomainsHandler,
  postDomainsHandler,
  getDomainsIdHandler,
  putDomainsIdHandler,
  patchDomainsIdHandler,
  deleteDomainsIdHandler,
  getDoseErasHandler,
  postDoseErasHandler,
  getDoseErasIdHandler,
  putDoseErasIdHandler,
  patchDoseErasIdHandler,
  deleteDoseErasIdHandler,
  getDrugErasHandler,
  postDrugErasHandler,
  getDrugErasIdHandler,
  putDrugErasIdHandler,
  patchDrugErasIdHandler,
  deleteDrugErasIdHandler,
  getDrugExposuresHandler,
  postDrugExposuresHandler,
  getDrugExposuresIdHandler,
  putDrugExposuresIdHandler,
  patchDrugExposuresIdHandler,
  deleteDrugExposuresIdHandler,
  getDrugStrengthsHandler,
  postDrugStrengthsHandler,
  getDrugStrengthsIdHandler,
  putDrugStrengthsIdHandler,
  patchDrugStrengthsIdHandler,
  deleteDrugStrengthsIdHandler,
  getEpisodeEventsHandler,
  postEpisodeEventsHandler,
  getEpisodeEventsIdHandler,
  putEpisodeEventsIdHandler,
  patchEpisodeEventsIdHandler,
  deleteEpisodeEventsIdHandler,
  getEpisodesHandler,
  postEpisodesHandler,
  getEpisodesIdHandler,
  putEpisodesIdHandler,
  patchEpisodesIdHandler,
  deleteEpisodesIdHandler,
  getFactRelationshipsHandler,
  postFactRelationshipsHandler,
  getFactRelationshipsIdHandler,
  putFactRelationshipsIdHandler,
  patchFactRelationshipsIdHandler,
  deleteFactRelationshipsIdHandler,
  getLocationsHandler,
  postLocationsHandler,
  getLocationsIdHandler,
  putLocationsIdHandler,
  patchLocationsIdHandler,
  deleteLocationsIdHandler,
  getMeasurementsHandler,
  postMeasurementsHandler,
  getMeasurementsIdHandler,
  putMeasurementsIdHandler,
  patchMeasurementsIdHandler,
  deleteMeasurementsIdHandler,
  getMetadatasHandler,
  postMetadatasHandler,
  getMetadatasIdHandler,
  putMetadatasIdHandler,
  patchMetadatasIdHandler,
  deleteMetadatasIdHandler,
  getNoteNlpsHandler,
  postNoteNlpsHandler,
  getNoteNlpsIdHandler,
  putNoteNlpsIdHandler,
  patchNoteNlpsIdHandler,
  deleteNoteNlpsIdHandler,
  getNotesHandler,
  postNotesHandler,
  getNotesIdHandler,
  putNotesIdHandler,
  patchNotesIdHandler,
  deleteNotesIdHandler,
  getObservationPeriodsHandler,
  postObservationPeriodsHandler,
  getObservationPeriodsIdHandler,
  putObservationPeriodsIdHandler,
  patchObservationPeriodsIdHandler,
  deleteObservationPeriodsIdHandler,
  getObservationsHandler,
  postObservationsHandler,
  getObservationsIdHandler,
  putObservationsIdHandler,
  patchObservationsIdHandler,
  deleteObservationsIdHandler,
  getPayerPlanPeriodsHandler,
  postPayerPlanPeriodsHandler,
  getPayerPlanPeriodsIdHandler,
  putPayerPlanPeriodsIdHandler,
  patchPayerPlanPeriodsIdHandler,
  deletePayerPlanPeriodsIdHandler,
  getPersonsHandler,
  postPersonsHandler,
  getPersonsIdHandler,
  putPersonsIdHandler,
  patchPersonsIdHandler,
  deletePersonsIdHandler,
  getProcedureOccurrencesHandler,
  postProcedureOccurrencesHandler,
  getProcedureOccurrencesIdHandler,
  putProcedureOccurrencesIdHandler,
  patchProcedureOccurrencesIdHandler,
  deleteProcedureOccurrencesIdHandler,
  getProvidersHandler,
  postProvidersHandler,
  getProvidersIdHandler,
  putProvidersIdHandler,
  patchProvidersIdHandler,
  deleteProvidersIdHandler,
  getRelationshipsHandler,
  postRelationshipsHandler,
  getRelationshipsIdHandler,
  putRelationshipsIdHandler,
  patchRelationshipsIdHandler,
  deleteRelationshipsIdHandler,
  getSourceToConceptMapsHandler,
  postSourceToConceptMapsHandler,
  getSourceToConceptMapsIdHandler,
  putSourceToConceptMapsIdHandler,
  patchSourceToConceptMapsIdHandler,
  deleteSourceToConceptMapsIdHandler,
  getSpecimensHandler,
  postSpecimensHandler,
  getSpecimensIdHandler,
  putSpecimensIdHandler,
  patchSpecimensIdHandler,
  deleteSpecimensIdHandler,
  getVisitDetailsHandler,
  postVisitDetailsHandler,
  getVisitDetailsIdHandler,
  putVisitDetailsIdHandler,
  patchVisitDetailsIdHandler,
  deleteVisitDetailsIdHandler,
  getVisitOccurrencesHandler,
  postVisitOccurrencesHandler,
  getVisitOccurrencesIdHandler,
  putVisitOccurrencesIdHandler,
  patchVisitOccurrencesIdHandler,
  deleteVisitOccurrencesIdHandler,
  getVocabularysHandler,
  postVocabularysHandler,
  getVocabularysIdHandler,
  putVocabularysIdHandler,
  patchVocabularysIdHandler,
  deleteVocabularysIdHandler,
]

export const postCareSitesHandler = http.post<
  never,
  HealthsystemCareSiteCreate,
  HealthsystemCareSite
>('/care-sites', () => {
  return HttpResponse.json({
    id: 12345,
    care_site_name: 'Example value',
    place_of_service_concept_id: 8507,
    location_id: 100,
    care_site_source_value: 'Example value',
    place_of_service_source_value: 'Example value',
  })
})

export const getCareSitesIdHandler = http.get<
  { id: string },
  never,
  HealthsystemCareSite
>('/care-sites/:id', () => {
  return HttpResponse.json({
    id: 12345,
    care_site_name: 'Example value',
    place_of_service_concept_id: 8507,
    location_id: 100,
    care_site_source_value: 'Example value',
    place_of_service_source_value: 'Example value',
  })
})

export const putCareSitesIdHandler = http.put<
  { id: string },
  HealthsystemCareSiteCreate,
  HealthsystemCareSite
>('/care-sites/:id', () => {
  return HttpResponse.json({
    id: 12345,
    care_site_name: 'Example value',
    place_of_service_concept_id: 8507,
    location_id: 100,
    care_site_source_value: 'Example value',
    place_of_service_source_value: 'Example value',
  })
})

export const patchCareSitesIdHandler = http.patch<
  { id: string },
  HealthsystemCareSiteUpdate,
  HealthsystemCareSite
>('/care-sites/:id', () => {
  return HttpResponse.json({
    id: 12345,
    care_site_name: 'Example value',
    place_of_service_concept_id: 8507,
    location_id: 100,
    care_site_source_value: 'Example value',
    place_of_service_source_value: 'Example value',
  })
})

export const deleteCareSitesIdHandler = http.delete<
  { id: string },
  never,
  never
>('/care-sites/:id', () => {
  return HttpResponse.json(undefined)
})

export const getCdmSourcesHandler = http.get<
  never,
  never,
  MetadataCdmSourceList
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
    pagination: {
      total: 1,
      offset: 0,
      limit: 100,
      count: 1,
    },
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

export const getCdmSourcesIdHandler = http.get<
  { id: string },
  never,
  MetadataCdmSource
>('/cdm-sources/:id', () => {
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

export const putCdmSourcesIdHandler = http.put<
  { id: string },
  MetadataCdmSourceCreate,
  MetadataCdmSource
>('/cdm-sources/:id', () => {
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

export const patchCdmSourcesIdHandler = http.patch<
  { id: string },
  MetadataCdmSourceUpdate,
  MetadataCdmSource
>('/cdm-sources/:id', () => {
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

export const deleteCdmSourcesIdHandler = http.delete<
  { id: string },
  never,
  never
>('/cdm-sources/:id', () => {
  return HttpResponse.json(undefined)
})

export const getCohortDefinitionsHandler = http.get<
  never,
  never,
  ResultsCohortDefinitionList
>('/cohort-definitions', () => {
  return HttpResponse.json({
    data: [
      {
        id: 12345,
        cohort_definition_name: 'Example value',
        cohort_definition_description: 'Example value',
        definition_type_concept_id: 8507,
        cohort_definition_syntax: 'Example value',
        subject_concept_id: 8507,
        cohort_initiation_date: '2023-01-15',
      },
    ],
    pagination: {
      total: 1,
      offset: 0,
      limit: 100,
      count: 1,
    },
  })
})

export const postCohortDefinitionsHandler = http.post<
  never,
  ResultsCohortDefinitionCreate,
  ResultsCohortDefinition
>('/cohort-definitions', () => {
  return HttpResponse.json({
    id: 12345,
    cohort_definition_name: 'Example value',
    cohort_definition_description: 'Example value',
    definition_type_concept_id: 8507,
    cohort_definition_syntax: 'Example value',
    subject_concept_id: 8507,
    cohort_initiation_date: '2023-01-15',
  })
})

export const getCohortDefinitionsIdHandler = http.get<
  { id: string },
  never,
  ResultsCohortDefinition
>('/cohort-definitions/:id', () => {
  return HttpResponse.json({
    id: 12345,
    cohort_definition_name: 'Example value',
    cohort_definition_description: 'Example value',
    definition_type_concept_id: 8507,
    cohort_definition_syntax: 'Example value',
    subject_concept_id: 8507,
    cohort_initiation_date: '2023-01-15',
  })
})

export const putCohortDefinitionsIdHandler = http.put<
  { id: string },
  ResultsCohortDefinitionCreate,
  ResultsCohortDefinition
>('/cohort-definitions/:id', () => {
  return HttpResponse.json({
    id: 12345,
    cohort_definition_name: 'Example value',
    cohort_definition_description: 'Example value',
    definition_type_concept_id: 8507,
    cohort_definition_syntax: 'Example value',
    subject_concept_id: 8507,
    cohort_initiation_date: '2023-01-15',
  })
})

export const patchCohortDefinitionsIdHandler = http.patch<
  { id: string },
  ResultsCohortDefinitionUpdate,
  ResultsCohortDefinition
>('/cohort-definitions/:id', () => {
  return HttpResponse.json({
    id: 12345,
    cohort_definition_name: 'Example value',
    cohort_definition_description: 'Example value',
    definition_type_concept_id: 8507,
    cohort_definition_syntax: 'Example value',
    subject_concept_id: 8507,
    cohort_initiation_date: '2023-01-15',
  })
})

export const deleteCohortDefinitionsIdHandler = http.delete<
  { id: string },
  never,
  never
>('/cohort-definitions/:id', () => {
  return HttpResponse.json(undefined)
})

export const getCohortsHandler = http.get<never, never, ResultsCohortList>(
  '/cohorts',
  () => {
    return HttpResponse.json({
      data: [
        {
          cohort_definition_id: 100,
          subject_id: 100,
          cohort_start_date: '2023-01-15',
          cohort_end_date: '2023-01-15',
        },
      ],
      pagination: {
        total: 1,
        offset: 0,
        limit: 100,
        count: 1,
      },
    })
  },
)

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

export const getCohortsIdHandler = http.get<
  { id: string },
  never,
  ResultsCohort
>('/cohorts/:id', () => {
  return HttpResponse.json({
    cohort_definition_id: 100,
    subject_id: 100,
    cohort_start_date: '2023-01-15',
    cohort_end_date: '2023-01-15',
  })
})

export const putCohortsIdHandler = http.put<
  { id: string },
  ResultsCohortCreate,
  ResultsCohort
>('/cohorts/:id', () => {
  return HttpResponse.json({
    cohort_definition_id: 100,
    subject_id: 100,
    cohort_start_date: '2023-01-15',
    cohort_end_date: '2023-01-15',
  })
})

export const patchCohortsIdHandler = http.patch<
  { id: string },
  ResultsCohortUpdate,
  ResultsCohort
>('/cohorts/:id', () => {
  return HttpResponse.json({
    cohort_definition_id: 100,
    subject_id: 100,
    cohort_start_date: '2023-01-15',
    cohort_end_date: '2023-01-15',
  })
})

export const deleteCohortsIdHandler = http.delete<{ id: string }, never, never>(
  '/cohorts/:id',
  () => {
    return HttpResponse.json(undefined)
  },
)

export const getConceptAncestorsHandler = http.get<
  never,
  never,
  VocabularyConceptAncestorList
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
    pagination: {
      total: 1,
      offset: 0,
      limit: 100,
      count: 1,
    },
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

export const getConceptAncestorsIdHandler = http.get<
  { id: string },
  never,
  VocabularyConceptAncestor
>('/concept-ancestors/:id', () => {
  return HttpResponse.json({
    ancestor_concept_id: 8507,
    descendant_concept_id: 8507,
    min_levels_of_separation: 100,
    max_levels_of_separation: 100,
  })
})

export const putConceptAncestorsIdHandler = http.put<
  { id: string },
  VocabularyConceptAncestorCreate,
  VocabularyConceptAncestor
>('/concept-ancestors/:id', () => {
  return HttpResponse.json({
    ancestor_concept_id: 8507,
    descendant_concept_id: 8507,
    min_levels_of_separation: 100,
    max_levels_of_separation: 100,
  })
})

export const patchConceptAncestorsIdHandler = http.patch<
  { id: string },
  VocabularyConceptAncestorUpdate,
  VocabularyConceptAncestor
>('/concept-ancestors/:id', () => {
  return HttpResponse.json({
    ancestor_concept_id: 8507,
    descendant_concept_id: 8507,
    min_levels_of_separation: 100,
    max_levels_of_separation: 100,
  })
})

export const deleteConceptAncestorsIdHandler = http.delete<
  { id: string },
  never,
  never
>('/concept-ancestors/:id', () => {
  return HttpResponse.json(undefined)
})

export const getConceptClasssHandler = http.get<
  never,
  never,
  VocabularyConceptClassList
>('/concept-classs', () => {
  return HttpResponse.json({
    data: [
      {
        id: '12345',
        concept_class_name: 'Example value',
        concept_class_concept_id: 8507,
      },
    ],
    pagination: {
      total: 1,
      offset: 0,
      limit: 100,
      count: 1,
    },
  })
})

export const postConceptClasssHandler = http.post<
  never,
  VocabularyConceptClassCreate,
  VocabularyConceptClass
>('/concept-classs', () => {
  return HttpResponse.json({
    id: '12345',
    concept_class_name: 'Example value',
    concept_class_concept_id: 8507,
  })
})

export const getConceptClasssIdHandler = http.get<
  { id: string },
  never,
  VocabularyConceptClass
>('/concept-classs/:id', () => {
  return HttpResponse.json({
    id: '12345',
    concept_class_name: 'Example value',
    concept_class_concept_id: 8507,
  })
})

export const putConceptClasssIdHandler = http.put<
  { id: string },
  VocabularyConceptClassCreate,
  VocabularyConceptClass
>('/concept-classs/:id', () => {
  return HttpResponse.json({
    id: '12345',
    concept_class_name: 'Example value',
    concept_class_concept_id: 8507,
  })
})

export const patchConceptClasssIdHandler = http.patch<
  { id: string },
  VocabularyConceptClassUpdate,
  VocabularyConceptClass
>('/concept-classs/:id', () => {
  return HttpResponse.json({
    id: '12345',
    concept_class_name: 'Example value',
    concept_class_concept_id: 8507,
  })
})

export const deleteConceptClasssIdHandler = http.delete<
  { id: string },
  never,
  never
>('/concept-classs/:id', () => {
  return HttpResponse.json(undefined)
})

export const getConceptRelationshipsHandler = http.get<
  never,
  never,
  VocabularyConceptRelationshipList
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
    pagination: {
      total: 1,
      offset: 0,
      limit: 100,
      count: 1,
    },
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

export const getConceptRelationshipsIdHandler = http.get<
  { id: string },
  never,
  VocabularyConceptRelationship
>('/concept-relationships/:id', () => {
  return HttpResponse.json({
    relationship_id: 'Example value',
    valid_start_date: '2023-01-15',
    valid_end_date: '2023-01-15',
    invalid_reason: 'Example value',
  })
})

export const putConceptRelationshipsIdHandler = http.put<
  { id: string },
  VocabularyConceptRelationshipCreate,
  VocabularyConceptRelationship
>('/concept-relationships/:id', () => {
  return HttpResponse.json({
    relationship_id: 'Example value',
    valid_start_date: '2023-01-15',
    valid_end_date: '2023-01-15',
    invalid_reason: 'Example value',
  })
})

export const patchConceptRelationshipsIdHandler = http.patch<
  { id: string },
  VocabularyConceptRelationshipUpdate,
  VocabularyConceptRelationship
>('/concept-relationships/:id', () => {
  return HttpResponse.json({
    relationship_id: 'Example value',
    valid_start_date: '2023-01-15',
    valid_end_date: '2023-01-15',
    invalid_reason: 'Example value',
  })
})

export const deleteConceptRelationshipsIdHandler = http.delete<
  { id: string },
  never,
  never
>('/concept-relationships/:id', () => {
  return HttpResponse.json(undefined)
})

export const getConceptSynonymsHandler = http.get<
  never,
  never,
  VocabularyConceptSynonymList
>('/concept-synonyms', () => {
  return HttpResponse.json({
    data: [
      {
        concept_id: 8507,
        concept_synonym_name: 'Example value',
        language_concept_id: 8507,
      },
    ],
    pagination: {
      total: 1,
      offset: 0,
      limit: 100,
      count: 1,
    },
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

export const getConceptSynonymsIdHandler = http.get<
  { id: string },
  never,
  VocabularyConceptSynonym
>('/concept-synonyms/:id', () => {
  return HttpResponse.json({
    concept_id: 8507,
    concept_synonym_name: 'Example value',
    language_concept_id: 8507,
  })
})

export const putConceptSynonymsIdHandler = http.put<
  { id: string },
  VocabularyConceptSynonymCreate,
  VocabularyConceptSynonym
>('/concept-synonyms/:id', () => {
  return HttpResponse.json({
    concept_id: 8507,
    concept_synonym_name: 'Example value',
    language_concept_id: 8507,
  })
})

export const patchConceptSynonymsIdHandler = http.patch<
  { id: string },
  VocabularyConceptSynonymUpdate,
  VocabularyConceptSynonym
>('/concept-synonyms/:id', () => {
  return HttpResponse.json({
    concept_id: 8507,
    concept_synonym_name: 'Example value',
    language_concept_id: 8507,
  })
})

export const deleteConceptSynonymsIdHandler = http.delete<
  { id: string },
  never,
  never
>('/concept-synonyms/:id', () => {
  return HttpResponse.json(undefined)
})

export const getConceptsHandler = http.get<never, never, VocabularyConceptList>(
  '/concepts',
  () => {
    return HttpResponse.json({
      data: [
        {
          id: 12345,
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
      pagination: {
        total: 1,
        offset: 0,
        limit: 100,
        count: 1,
      },
    })
  },
)

export const postConceptsHandler = http.post<
  never,
  VocabularyConceptCreate,
  VocabularyConcept
>('/concepts', () => {
  return HttpResponse.json({
    id: 12345,
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

export const getConceptsIdHandler = http.get<
  { id: string },
  never,
  VocabularyConcept
>('/concepts/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const putConceptsIdHandler = http.put<
  { id: string },
  VocabularyConceptCreate,
  VocabularyConcept
>('/concepts/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const patchConceptsIdHandler = http.patch<
  { id: string },
  VocabularyConceptUpdate,
  VocabularyConcept
>('/concepts/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const deleteConceptsIdHandler = http.delete<
  { id: string },
  never,
  never
>('/concepts/:id', () => {
  return HttpResponse.json(undefined)
})

export const getConditionErasHandler = http.get<
  never,
  never,
  DerivedConditionEraList
>('/condition-eras', () => {
  return HttpResponse.json({
    data: [
      {
        id: 12345,
        person_id: 100,
        condition_concept_id: 8507,
        condition_era_start_date: '2023-01-15',
        condition_era_end_date: '2023-01-15',
        condition_occurrence_count: 100,
      },
    ],
    pagination: {
      total: 1,
      offset: 0,
      limit: 100,
      count: 1,
    },
  })
})

export const postConditionErasHandler = http.post<
  never,
  DerivedConditionEraCreate,
  DerivedConditionEra
>('/condition-eras', () => {
  return HttpResponse.json({
    id: 12345,
    person_id: 100,
    condition_concept_id: 8507,
    condition_era_start_date: '2023-01-15',
    condition_era_end_date: '2023-01-15',
    condition_occurrence_count: 100,
  })
})

export const getConditionErasIdHandler = http.get<
  { id: string },
  never,
  DerivedConditionEra
>('/condition-eras/:id', () => {
  return HttpResponse.json({
    id: 12345,
    person_id: 100,
    condition_concept_id: 8507,
    condition_era_start_date: '2023-01-15',
    condition_era_end_date: '2023-01-15',
    condition_occurrence_count: 100,
  })
})

export const putConditionErasIdHandler = http.put<
  { id: string },
  DerivedConditionEraCreate,
  DerivedConditionEra
>('/condition-eras/:id', () => {
  return HttpResponse.json({
    id: 12345,
    person_id: 100,
    condition_concept_id: 8507,
    condition_era_start_date: '2023-01-15',
    condition_era_end_date: '2023-01-15',
    condition_occurrence_count: 100,
  })
})

export const patchConditionErasIdHandler = http.patch<
  { id: string },
  DerivedConditionEraUpdate,
  DerivedConditionEra
>('/condition-eras/:id', () => {
  return HttpResponse.json({
    id: 12345,
    person_id: 100,
    condition_concept_id: 8507,
    condition_era_start_date: '2023-01-15',
    condition_era_end_date: '2023-01-15',
    condition_occurrence_count: 100,
  })
})

export const deleteConditionErasIdHandler = http.delete<
  { id: string },
  never,
  never
>('/condition-eras/:id', () => {
  return HttpResponse.json(undefined)
})

export const getConditionOccurrencesHandler = http.get<
  never,
  never,
  ClinicalConditionOccurrenceList
>('/condition-occurrences', () => {
  return HttpResponse.json({
    data: [
      {
        id: 12345,
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
    pagination: {
      total: 1,
      offset: 0,
      limit: 100,
      count: 1,
    },
  })
})

export const postConditionOccurrencesHandler = http.post<
  never,
  ClinicalConditionOccurrenceCreate,
  ClinicalConditionOccurrence
>('/condition-occurrences', () => {
  return HttpResponse.json({
    id: 12345,
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

export const getConditionOccurrencesIdHandler = http.get<
  { id: string },
  never,
  ClinicalConditionOccurrence
>('/condition-occurrences/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const putConditionOccurrencesIdHandler = http.put<
  { id: string },
  ClinicalConditionOccurrenceCreate,
  ClinicalConditionOccurrence
>('/condition-occurrences/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const patchConditionOccurrencesIdHandler = http.patch<
  { id: string },
  ClinicalConditionOccurrenceUpdate,
  ClinicalConditionOccurrence
>('/condition-occurrences/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const deleteConditionOccurrencesIdHandler = http.delete<
  { id: string },
  never,
  never
>('/condition-occurrences/:id', () => {
  return HttpResponse.json(undefined)
})

export const getCostsHandler = http.get<never, never, HealthsystemCostList>(
  '/costs',
  () => {
    return HttpResponse.json({
      data: [
        {
          id: 12345,
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
      pagination: {
        total: 1,
        offset: 0,
        limit: 100,
        count: 1,
      },
    })
  },
)

export const postCostsHandler = http.post<
  never,
  HealthsystemCostCreate,
  HealthsystemCost
>('/costs', () => {
  return HttpResponse.json({
    id: 12345,
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

export const getCostsIdHandler = http.get<
  { id: string },
  never,
  HealthsystemCost
>('/costs/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const putCostsIdHandler = http.put<
  { id: string },
  HealthsystemCostCreate,
  HealthsystemCost
>('/costs/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const patchCostsIdHandler = http.patch<
  { id: string },
  HealthsystemCostUpdate,
  HealthsystemCost
>('/costs/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const deleteCostsIdHandler = http.delete<{ id: string }, never, never>(
  '/costs/:id',
  () => {
    return HttpResponse.json(undefined)
  },
)

export const getDeathsHandler = http.get<never, never, ClinicalDeathList>(
  '/deaths',
  () => {
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
      pagination: {
        total: 1,
        offset: 0,
        limit: 100,
        count: 1,
      },
    })
  },
)

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

export const getDeathsIdHandler = http.get<
  { id: string },
  never,
  ClinicalDeath
>('/deaths/:id', () => {
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

export const putDeathsIdHandler = http.put<
  { id: string },
  ClinicalDeathCreate,
  ClinicalDeath
>('/deaths/:id', () => {
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

export const patchDeathsIdHandler = http.patch<
  { id: string },
  ClinicalDeathUpdate,
  ClinicalDeath
>('/deaths/:id', () => {
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

export const deleteDeathsIdHandler = http.delete<{ id: string }, never, never>(
  '/deaths/:id',
  () => {
    return HttpResponse.json(undefined)
  },
)

export const getDeviceExposuresHandler = http.get<
  never,
  never,
  ClinicalDeviceExposureList
>('/device-exposures', () => {
  return HttpResponse.json({
    data: [
      {
        id: 12345,
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
    pagination: {
      total: 1,
      offset: 0,
      limit: 100,
      count: 1,
    },
  })
})

export const postDeviceExposuresHandler = http.post<
  never,
  ClinicalDeviceExposureCreate,
  ClinicalDeviceExposure
>('/device-exposures', () => {
  return HttpResponse.json({
    id: 12345,
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

export const getDeviceExposuresIdHandler = http.get<
  { id: string },
  never,
  ClinicalDeviceExposure
>('/device-exposures/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const putDeviceExposuresIdHandler = http.put<
  { id: string },
  ClinicalDeviceExposureCreate,
  ClinicalDeviceExposure
>('/device-exposures/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const patchDeviceExposuresIdHandler = http.patch<
  { id: string },
  ClinicalDeviceExposureUpdate,
  ClinicalDeviceExposure
>('/device-exposures/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const deleteDeviceExposuresIdHandler = http.delete<
  { id: string },
  never,
  never
>('/device-exposures/:id', () => {
  return HttpResponse.json(undefined)
})

export const getDomainsHandler = http.get<never, never, VocabularyDomainList>(
  '/domains',
  () => {
    return HttpResponse.json({
      data: [
        {
          id: '12345',
          domain_name: 'Example value',
          domain_concept_id: 8507,
        },
      ],
      pagination: {
        total: 1,
        offset: 0,
        limit: 100,
        count: 1,
      },
    })
  },
)

export const postDomainsHandler = http.post<
  never,
  VocabularyDomainCreate,
  VocabularyDomain
>('/domains', () => {
  return HttpResponse.json({
    id: '12345',
    domain_name: 'Example value',
    domain_concept_id: 8507,
  })
})

export const getDomainsIdHandler = http.get<
  { id: string },
  never,
  VocabularyDomain
>('/domains/:id', () => {
  return HttpResponse.json({
    id: '12345',
    domain_name: 'Example value',
    domain_concept_id: 8507,
  })
})

export const putDomainsIdHandler = http.put<
  { id: string },
  VocabularyDomainCreate,
  VocabularyDomain
>('/domains/:id', () => {
  return HttpResponse.json({
    id: '12345',
    domain_name: 'Example value',
    domain_concept_id: 8507,
  })
})

export const patchDomainsIdHandler = http.patch<
  { id: string },
  VocabularyDomainUpdate,
  VocabularyDomain
>('/domains/:id', () => {
  return HttpResponse.json({
    id: '12345',
    domain_name: 'Example value',
    domain_concept_id: 8507,
  })
})

export const deleteDomainsIdHandler = http.delete<{ id: string }, never, never>(
  '/domains/:id',
  () => {
    return HttpResponse.json(undefined)
  },
)

export const getDoseErasHandler = http.get<never, never, DerivedDoseEraList>(
  '/dose-eras',
  () => {
    return HttpResponse.json({
      data: [
        {
          id: 12345,
          person_id: 100,
          drug_concept_id: 8507,
          unit_concept_id: 8507,
          dose_value: 98.6,
          dose_era_start_date: '2023-01-15',
          dose_era_end_date: '2023-01-15',
        },
      ],
      pagination: {
        total: 1,
        offset: 0,
        limit: 100,
        count: 1,
      },
    })
  },
)

export const postDoseErasHandler = http.post<
  never,
  DerivedDoseEraCreate,
  DerivedDoseEra
>('/dose-eras', () => {
  return HttpResponse.json({
    id: 12345,
    person_id: 100,
    drug_concept_id: 8507,
    unit_concept_id: 8507,
    dose_value: 98.6,
    dose_era_start_date: '2023-01-15',
    dose_era_end_date: '2023-01-15',
  })
})

export const getDoseErasIdHandler = http.get<
  { id: string },
  never,
  DerivedDoseEra
>('/dose-eras/:id', () => {
  return HttpResponse.json({
    id: 12345,
    person_id: 100,
    drug_concept_id: 8507,
    unit_concept_id: 8507,
    dose_value: 98.6,
    dose_era_start_date: '2023-01-15',
    dose_era_end_date: '2023-01-15',
  })
})

export const putDoseErasIdHandler = http.put<
  { id: string },
  DerivedDoseEraCreate,
  DerivedDoseEra
>('/dose-eras/:id', () => {
  return HttpResponse.json({
    id: 12345,
    person_id: 100,
    drug_concept_id: 8507,
    unit_concept_id: 8507,
    dose_value: 98.6,
    dose_era_start_date: '2023-01-15',
    dose_era_end_date: '2023-01-15',
  })
})

export const patchDoseErasIdHandler = http.patch<
  { id: string },
  DerivedDoseEraUpdate,
  DerivedDoseEra
>('/dose-eras/:id', () => {
  return HttpResponse.json({
    id: 12345,
    person_id: 100,
    drug_concept_id: 8507,
    unit_concept_id: 8507,
    dose_value: 98.6,
    dose_era_start_date: '2023-01-15',
    dose_era_end_date: '2023-01-15',
  })
})

export const deleteDoseErasIdHandler = http.delete<
  { id: string },
  never,
  never
>('/dose-eras/:id', () => {
  return HttpResponse.json(undefined)
})

export const getDrugErasHandler = http.get<never, never, DerivedDrugEraList>(
  '/drug-eras',
  () => {
    return HttpResponse.json({
      data: [
        {
          id: 12345,
          person_id: 100,
          drug_concept_id: 8507,
          drug_era_start_date: '2023-01-15',
          drug_era_end_date: '2023-01-15',
          drug_exposure_count: 100,
          gap_days: 100,
        },
      ],
      pagination: {
        total: 1,
        offset: 0,
        limit: 100,
        count: 1,
      },
    })
  },
)

export const postDrugErasHandler = http.post<
  never,
  DerivedDrugEraCreate,
  DerivedDrugEra
>('/drug-eras', () => {
  return HttpResponse.json({
    id: 12345,
    person_id: 100,
    drug_concept_id: 8507,
    drug_era_start_date: '2023-01-15',
    drug_era_end_date: '2023-01-15',
    drug_exposure_count: 100,
    gap_days: 100,
  })
})

export const getDrugErasIdHandler = http.get<
  { id: string },
  never,
  DerivedDrugEra
>('/drug-eras/:id', () => {
  return HttpResponse.json({
    id: 12345,
    person_id: 100,
    drug_concept_id: 8507,
    drug_era_start_date: '2023-01-15',
    drug_era_end_date: '2023-01-15',
    drug_exposure_count: 100,
    gap_days: 100,
  })
})

export const putDrugErasIdHandler = http.put<
  { id: string },
  DerivedDrugEraCreate,
  DerivedDrugEra
>('/drug-eras/:id', () => {
  return HttpResponse.json({
    id: 12345,
    person_id: 100,
    drug_concept_id: 8507,
    drug_era_start_date: '2023-01-15',
    drug_era_end_date: '2023-01-15',
    drug_exposure_count: 100,
    gap_days: 100,
  })
})

export const patchDrugErasIdHandler = http.patch<
  { id: string },
  DerivedDrugEraUpdate,
  DerivedDrugEra
>('/drug-eras/:id', () => {
  return HttpResponse.json({
    id: 12345,
    person_id: 100,
    drug_concept_id: 8507,
    drug_era_start_date: '2023-01-15',
    drug_era_end_date: '2023-01-15',
    drug_exposure_count: 100,
    gap_days: 100,
  })
})

export const deleteDrugErasIdHandler = http.delete<
  { id: string },
  never,
  never
>('/drug-eras/:id', () => {
  return HttpResponse.json(undefined)
})

export const getDrugExposuresHandler = http.get<
  never,
  never,
  ClinicalDrugExposureList
>('/drug-exposures', () => {
  return HttpResponse.json({
    data: [
      {
        id: 12345,
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
    pagination: {
      total: 1,
      offset: 0,
      limit: 100,
      count: 1,
    },
  })
})

export const postDrugExposuresHandler = http.post<
  never,
  ClinicalDrugExposureCreate,
  ClinicalDrugExposure
>('/drug-exposures', () => {
  return HttpResponse.json({
    id: 12345,
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

export const getDrugExposuresIdHandler = http.get<
  { id: string },
  never,
  ClinicalDrugExposure
>('/drug-exposures/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const putDrugExposuresIdHandler = http.put<
  { id: string },
  ClinicalDrugExposureCreate,
  ClinicalDrugExposure
>('/drug-exposures/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const patchDrugExposuresIdHandler = http.patch<
  { id: string },
  ClinicalDrugExposureUpdate,
  ClinicalDrugExposure
>('/drug-exposures/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const deleteDrugExposuresIdHandler = http.delete<
  { id: string },
  never,
  never
>('/drug-exposures/:id', () => {
  return HttpResponse.json(undefined)
})

export const getDrugStrengthsHandler = http.get<
  never,
  never,
  VocabularyDrugStrengthList
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
    pagination: {
      total: 1,
      offset: 0,
      limit: 100,
      count: 1,
    },
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

export const getDrugStrengthsIdHandler = http.get<
  { id: string },
  never,
  VocabularyDrugStrength
>('/drug-strengths/:id', () => {
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

export const putDrugStrengthsIdHandler = http.put<
  { id: string },
  VocabularyDrugStrengthCreate,
  VocabularyDrugStrength
>('/drug-strengths/:id', () => {
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

export const patchDrugStrengthsIdHandler = http.patch<
  { id: string },
  VocabularyDrugStrengthUpdate,
  VocabularyDrugStrength
>('/drug-strengths/:id', () => {
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

export const deleteDrugStrengthsIdHandler = http.delete<
  { id: string },
  never,
  never
>('/drug-strengths/:id', () => {
  return HttpResponse.json(undefined)
})

export const getEpisodeEventsHandler = http.get<
  never,
  never,
  DerivedEpisodeEventList
>('/episode-events', () => {
  return HttpResponse.json({
    data: [
      {
        episode_id: 100,
        event_id: 100,
        episode_event_field_concept_id: 8507,
      },
    ],
    pagination: {
      total: 1,
      offset: 0,
      limit: 100,
      count: 1,
    },
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

export const getEpisodeEventsIdHandler = http.get<
  { id: string },
  never,
  DerivedEpisodeEvent
>('/episode-events/:id', () => {
  return HttpResponse.json({
    episode_id: 100,
    event_id: 100,
    episode_event_field_concept_id: 8507,
  })
})

export const putEpisodeEventsIdHandler = http.put<
  { id: string },
  DerivedEpisodeEventCreate,
  DerivedEpisodeEvent
>('/episode-events/:id', () => {
  return HttpResponse.json({
    episode_id: 100,
    event_id: 100,
    episode_event_field_concept_id: 8507,
  })
})

export const patchEpisodeEventsIdHandler = http.patch<
  { id: string },
  DerivedEpisodeEventUpdate,
  DerivedEpisodeEvent
>('/episode-events/:id', () => {
  return HttpResponse.json({
    episode_id: 100,
    event_id: 100,
    episode_event_field_concept_id: 8507,
  })
})

export const deleteEpisodeEventsIdHandler = http.delete<
  { id: string },
  never,
  never
>('/episode-events/:id', () => {
  return HttpResponse.json(undefined)
})

export const getEpisodesHandler = http.get<never, never, DerivedEpisodeList>(
  '/episodes',
  () => {
    return HttpResponse.json({
      data: [
        {
          id: 12345,
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
      pagination: {
        total: 1,
        offset: 0,
        limit: 100,
        count: 1,
      },
    })
  },
)

export const postEpisodesHandler = http.post<
  never,
  DerivedEpisodeCreate,
  DerivedEpisode
>('/episodes', () => {
  return HttpResponse.json({
    id: 12345,
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

export const getEpisodesIdHandler = http.get<
  { id: string },
  never,
  DerivedEpisode
>('/episodes/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const putEpisodesIdHandler = http.put<
  { id: string },
  DerivedEpisodeCreate,
  DerivedEpisode
>('/episodes/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const patchEpisodesIdHandler = http.patch<
  { id: string },
  DerivedEpisodeUpdate,
  DerivedEpisode
>('/episodes/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const deleteEpisodesIdHandler = http.delete<
  { id: string },
  never,
  never
>('/episodes/:id', () => {
  return HttpResponse.json(undefined)
})

export const getFactRelationshipsHandler = http.get<
  never,
  never,
  ResultsFactRelationshipList
>('/fact-relationships', () => {
  return HttpResponse.json({
    data: [
      {
        relationship_concept_id: 8507,
      },
    ],
    pagination: {
      total: 1,
      offset: 0,
      limit: 100,
      count: 1,
    },
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

export const getFactRelationshipsIdHandler = http.get<
  { id: string },
  never,
  ResultsFactRelationship
>('/fact-relationships/:id', () => {
  return HttpResponse.json({
    relationship_concept_id: 8507,
  })
})

export const putFactRelationshipsIdHandler = http.put<
  { id: string },
  ResultsFactRelationshipCreate,
  ResultsFactRelationship
>('/fact-relationships/:id', () => {
  return HttpResponse.json({
    relationship_concept_id: 8507,
  })
})

export const patchFactRelationshipsIdHandler = http.patch<
  { id: string },
  ResultsFactRelationshipUpdate,
  ResultsFactRelationship
>('/fact-relationships/:id', () => {
  return HttpResponse.json({
    relationship_concept_id: 8507,
  })
})

export const deleteFactRelationshipsIdHandler = http.delete<
  { id: string },
  never,
  never
>('/fact-relationships/:id', () => {
  return HttpResponse.json(undefined)
})

export const getLocationsHandler = http.get<
  never,
  never,
  HealthsystemLocationList
>('/locations', () => {
  return HttpResponse.json({
    data: [
      {
        id: 12345,
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
    pagination: {
      total: 1,
      offset: 0,
      limit: 100,
      count: 1,
    },
  })
})

export const postLocationsHandler = http.post<
  never,
  HealthsystemLocationCreate,
  HealthsystemLocation
>('/locations', () => {
  return HttpResponse.json({
    id: 12345,
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

export const getLocationsIdHandler = http.get<
  { id: string },
  never,
  HealthsystemLocation
>('/locations/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const putLocationsIdHandler = http.put<
  { id: string },
  HealthsystemLocationCreate,
  HealthsystemLocation
>('/locations/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const patchLocationsIdHandler = http.patch<
  { id: string },
  HealthsystemLocationUpdate,
  HealthsystemLocation
>('/locations/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const deleteLocationsIdHandler = http.delete<
  { id: string },
  never,
  never
>('/locations/:id', () => {
  return HttpResponse.json(undefined)
})

export const getMeasurementsHandler = http.get<
  never,
  never,
  ClinicalMeasurementList
>('/measurements', () => {
  return HttpResponse.json({
    data: [
      {
        id: 12345,
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
    pagination: {
      total: 1,
      offset: 0,
      limit: 100,
      count: 1,
    },
  })
})

export const postMeasurementsHandler = http.post<
  never,
  ClinicalMeasurementCreate,
  ClinicalMeasurement
>('/measurements', () => {
  return HttpResponse.json({
    id: 12345,
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

export const getMeasurementsIdHandler = http.get<
  { id: string },
  never,
  ClinicalMeasurement
>('/measurements/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const putMeasurementsIdHandler = http.put<
  { id: string },
  ClinicalMeasurementCreate,
  ClinicalMeasurement
>('/measurements/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const patchMeasurementsIdHandler = http.patch<
  { id: string },
  ClinicalMeasurementUpdate,
  ClinicalMeasurement
>('/measurements/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const deleteMeasurementsIdHandler = http.delete<
  { id: string },
  never,
  never
>('/measurements/:id', () => {
  return HttpResponse.json(undefined)
})

export const getMetadatasHandler = http.get<never, never, MetadataMetadataList>(
  '/metadatas',
  () => {
    return HttpResponse.json({
      data: [
        {
          id: 12345,
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
      pagination: {
        total: 1,
        offset: 0,
        limit: 100,
        count: 1,
      },
    })
  },
)

export const postMetadatasHandler = http.post<
  never,
  MetadataMetadataCreate,
  MetadataMetadata
>('/metadatas', () => {
  return HttpResponse.json({
    id: 12345,
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

export const getMetadatasIdHandler = http.get<
  { id: string },
  never,
  MetadataMetadata
>('/metadatas/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const putMetadatasIdHandler = http.put<
  { id: string },
  MetadataMetadataCreate,
  MetadataMetadata
>('/metadatas/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const patchMetadatasIdHandler = http.patch<
  { id: string },
  MetadataMetadataUpdate,
  MetadataMetadata
>('/metadatas/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const deleteMetadatasIdHandler = http.delete<
  { id: string },
  never,
  never
>('/metadatas/:id', () => {
  return HttpResponse.json(undefined)
})

export const getNoteNlpsHandler = http.get<never, never, ClinicalNoteNlpList>(
  '/note-nlps',
  () => {
    return HttpResponse.json({
      data: [
        {
          id: 12345,
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
      pagination: {
        total: 1,
        offset: 0,
        limit: 100,
        count: 1,
      },
    })
  },
)

export const postNoteNlpsHandler = http.post<
  never,
  ClinicalNoteNlpCreate,
  ClinicalNoteNlp
>('/note-nlps', () => {
  return HttpResponse.json({
    id: 12345,
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

export const getNoteNlpsIdHandler = http.get<
  { id: string },
  never,
  ClinicalNoteNlp
>('/note-nlps/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const putNoteNlpsIdHandler = http.put<
  { id: string },
  ClinicalNoteNlpCreate,
  ClinicalNoteNlp
>('/note-nlps/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const patchNoteNlpsIdHandler = http.patch<
  { id: string },
  ClinicalNoteNlpUpdate,
  ClinicalNoteNlp
>('/note-nlps/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const deleteNoteNlpsIdHandler = http.delete<
  { id: string },
  never,
  never
>('/note-nlps/:id', () => {
  return HttpResponse.json(undefined)
})

export const getNotesHandler = http.get<never, never, ClinicalNoteList>(
  '/notes',
  () => {
    return HttpResponse.json({
      data: [
        {
          id: 12345,
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
      pagination: {
        total: 1,
        offset: 0,
        limit: 100,
        count: 1,
      },
    })
  },
)

export const postNotesHandler = http.post<
  never,
  ClinicalNoteCreate,
  ClinicalNote
>('/notes', () => {
  return HttpResponse.json({
    id: 12345,
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

export const getNotesIdHandler = http.get<{ id: string }, never, ClinicalNote>(
  '/notes/:id',
  () => {
    return HttpResponse.json({
      id: 12345,
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
  },
)

export const putNotesIdHandler = http.put<
  { id: string },
  ClinicalNoteCreate,
  ClinicalNote
>('/notes/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const patchNotesIdHandler = http.patch<
  { id: string },
  ClinicalNoteUpdate,
  ClinicalNote
>('/notes/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const deleteNotesIdHandler = http.delete<{ id: string }, never, never>(
  '/notes/:id',
  () => {
    return HttpResponse.json(undefined)
  },
)

export const getObservationPeriodsHandler = http.get<
  never,
  never,
  ClinicalObservationPeriodList
>('/observation-periods', () => {
  return HttpResponse.json({
    data: [
      {
        id: 12345,
        person_id: 100,
        observation_period_start_date: '2023-01-15',
        observation_period_end_date: '2023-01-15',
        period_type_concept_id: 8507,
      },
    ],
    pagination: {
      total: 1,
      offset: 0,
      limit: 100,
      count: 1,
    },
  })
})

export const postObservationPeriodsHandler = http.post<
  never,
  ClinicalObservationPeriodCreate,
  ClinicalObservationPeriod
>('/observation-periods', () => {
  return HttpResponse.json({
    id: 12345,
    person_id: 100,
    observation_period_start_date: '2023-01-15',
    observation_period_end_date: '2023-01-15',
    period_type_concept_id: 8507,
  })
})

export const getObservationPeriodsIdHandler = http.get<
  { id: string },
  never,
  ClinicalObservationPeriod
>('/observation-periods/:id', () => {
  return HttpResponse.json({
    id: 12345,
    person_id: 100,
    observation_period_start_date: '2023-01-15',
    observation_period_end_date: '2023-01-15',
    period_type_concept_id: 8507,
  })
})

export const putObservationPeriodsIdHandler = http.put<
  { id: string },
  ClinicalObservationPeriodCreate,
  ClinicalObservationPeriod
>('/observation-periods/:id', () => {
  return HttpResponse.json({
    id: 12345,
    person_id: 100,
    observation_period_start_date: '2023-01-15',
    observation_period_end_date: '2023-01-15',
    period_type_concept_id: 8507,
  })
})

export const patchObservationPeriodsIdHandler = http.patch<
  { id: string },
  ClinicalObservationPeriodUpdate,
  ClinicalObservationPeriod
>('/observation-periods/:id', () => {
  return HttpResponse.json({
    id: 12345,
    person_id: 100,
    observation_period_start_date: '2023-01-15',
    observation_period_end_date: '2023-01-15',
    period_type_concept_id: 8507,
  })
})

export const deleteObservationPeriodsIdHandler = http.delete<
  { id: string },
  never,
  never
>('/observation-periods/:id', () => {
  return HttpResponse.json(undefined)
})

export const getObservationsHandler = http.get<
  never,
  never,
  ClinicalObservationList
>('/observations', () => {
  return HttpResponse.json({
    data: [
      {
        id: 12345,
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
    pagination: {
      total: 1,
      offset: 0,
      limit: 100,
      count: 1,
    },
  })
})

export const postObservationsHandler = http.post<
  never,
  ClinicalObservationCreate,
  ClinicalObservation
>('/observations', () => {
  return HttpResponse.json({
    id: 12345,
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

export const getObservationsIdHandler = http.get<
  { id: string },
  never,
  ClinicalObservation
>('/observations/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const putObservationsIdHandler = http.put<
  { id: string },
  ClinicalObservationCreate,
  ClinicalObservation
>('/observations/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const patchObservationsIdHandler = http.patch<
  { id: string },
  ClinicalObservationUpdate,
  ClinicalObservation
>('/observations/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const deleteObservationsIdHandler = http.delete<
  { id: string },
  never,
  never
>('/observations/:id', () => {
  return HttpResponse.json(undefined)
})

export const getPayerPlanPeriodsHandler = http.get<
  never,
  never,
  HealthsystemPayerPlanPeriodList
>('/payer-plan-periods', () => {
  return HttpResponse.json({
    data: [
      {
        id: 12345,
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
    pagination: {
      total: 1,
      offset: 0,
      limit: 100,
      count: 1,
    },
  })
})

export const postPayerPlanPeriodsHandler = http.post<
  never,
  HealthsystemPayerPlanPeriodCreate,
  HealthsystemPayerPlanPeriod
>('/payer-plan-periods', () => {
  return HttpResponse.json({
    id: 12345,
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

export const getPayerPlanPeriodsIdHandler = http.get<
  { id: string },
  never,
  HealthsystemPayerPlanPeriod
>('/payer-plan-periods/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const putPayerPlanPeriodsIdHandler = http.put<
  { id: string },
  HealthsystemPayerPlanPeriodCreate,
  HealthsystemPayerPlanPeriod
>('/payer-plan-periods/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const patchPayerPlanPeriodsIdHandler = http.patch<
  { id: string },
  HealthsystemPayerPlanPeriodUpdate,
  HealthsystemPayerPlanPeriod
>('/payer-plan-periods/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const deletePayerPlanPeriodsIdHandler = http.delete<
  { id: string },
  never,
  never
>('/payer-plan-periods/:id', () => {
  return HttpResponse.json(undefined)
})

export const getPersonsHandler = http.get<never, never, ClinicalPersonList>(
  '/persons',
  () => {
    return HttpResponse.json({
      data: [
        {
          id: 12345,
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
      pagination: {
        total: 1,
        offset: 0,
        limit: 100,
        count: 1,
      },
    })
  },
)

export const postPersonsHandler = http.post<
  never,
  ClinicalPersonCreate,
  ClinicalPerson
>('/persons', () => {
  return HttpResponse.json({
    id: 12345,
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

export const getPersonsIdHandler = http.get<
  { id: string },
  never,
  ClinicalPerson
>('/persons/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const putPersonsIdHandler = http.put<
  { id: string },
  ClinicalPersonCreate,
  ClinicalPerson
>('/persons/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const patchPersonsIdHandler = http.patch<
  { id: string },
  ClinicalPersonUpdate,
  ClinicalPerson
>('/persons/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const deletePersonsIdHandler = http.delete<{ id: string }, never, never>(
  '/persons/:id',
  () => {
    return HttpResponse.json(undefined)
  },
)

export const getProcedureOccurrencesHandler = http.get<
  never,
  never,
  ClinicalProcedureOccurrenceList
>('/procedure-occurrences', () => {
  return HttpResponse.json({
    data: [
      {
        id: 12345,
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
    pagination: {
      total: 1,
      offset: 0,
      limit: 100,
      count: 1,
    },
  })
})

export const postProcedureOccurrencesHandler = http.post<
  never,
  ClinicalProcedureOccurrenceCreate,
  ClinicalProcedureOccurrence
>('/procedure-occurrences', () => {
  return HttpResponse.json({
    id: 12345,
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

export const getProcedureOccurrencesIdHandler = http.get<
  { id: string },
  never,
  ClinicalProcedureOccurrence
>('/procedure-occurrences/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const putProcedureOccurrencesIdHandler = http.put<
  { id: string },
  ClinicalProcedureOccurrenceCreate,
  ClinicalProcedureOccurrence
>('/procedure-occurrences/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const patchProcedureOccurrencesIdHandler = http.patch<
  { id: string },
  ClinicalProcedureOccurrenceUpdate,
  ClinicalProcedureOccurrence
>('/procedure-occurrences/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const deleteProcedureOccurrencesIdHandler = http.delete<
  { id: string },
  never,
  never
>('/procedure-occurrences/:id', () => {
  return HttpResponse.json(undefined)
})

export const getProvidersHandler = http.get<
  never,
  never,
  HealthsystemProviderList
>('/providers', () => {
  return HttpResponse.json({
    data: [
      {
        id: 12345,
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
    pagination: {
      total: 1,
      offset: 0,
      limit: 100,
      count: 1,
    },
  })
})

export const postProvidersHandler = http.post<
  never,
  HealthsystemProviderCreate,
  HealthsystemProvider
>('/providers', () => {
  return HttpResponse.json({
    id: 12345,
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

export const getProvidersIdHandler = http.get<
  { id: string },
  never,
  HealthsystemProvider
>('/providers/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const putProvidersIdHandler = http.put<
  { id: string },
  HealthsystemProviderCreate,
  HealthsystemProvider
>('/providers/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const patchProvidersIdHandler = http.patch<
  { id: string },
  HealthsystemProviderUpdate,
  HealthsystemProvider
>('/providers/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const deleteProvidersIdHandler = http.delete<
  { id: string },
  never,
  never
>('/providers/:id', () => {
  return HttpResponse.json(undefined)
})

export const getRelationshipsHandler = http.get<
  never,
  never,
  VocabularyRelationshipList
>('/relationships', () => {
  return HttpResponse.json({
    data: [
      {
        id: '12345',
        relationship_name: 'Example value',
        is_hierarchical: 'Example value',
        defines_ancestry: 'Example value',
        reverse_relationship_id: 'Example value',
        relationship_concept_id: 8507,
      },
    ],
    pagination: {
      total: 1,
      offset: 0,
      limit: 100,
      count: 1,
    },
  })
})

export const postRelationshipsHandler = http.post<
  never,
  VocabularyRelationshipCreate,
  VocabularyRelationship
>('/relationships', () => {
  return HttpResponse.json({
    id: '12345',
    relationship_name: 'Example value',
    is_hierarchical: 'Example value',
    defines_ancestry: 'Example value',
    reverse_relationship_id: 'Example value',
    relationship_concept_id: 8507,
  })
})

export const getRelationshipsIdHandler = http.get<
  { id: string },
  never,
  VocabularyRelationship
>('/relationships/:id', () => {
  return HttpResponse.json({
    id: '12345',
    relationship_name: 'Example value',
    is_hierarchical: 'Example value',
    defines_ancestry: 'Example value',
    reverse_relationship_id: 'Example value',
    relationship_concept_id: 8507,
  })
})

export const putRelationshipsIdHandler = http.put<
  { id: string },
  VocabularyRelationshipCreate,
  VocabularyRelationship
>('/relationships/:id', () => {
  return HttpResponse.json({
    id: '12345',
    relationship_name: 'Example value',
    is_hierarchical: 'Example value',
    defines_ancestry: 'Example value',
    reverse_relationship_id: 'Example value',
    relationship_concept_id: 8507,
  })
})

export const patchRelationshipsIdHandler = http.patch<
  { id: string },
  VocabularyRelationshipUpdate,
  VocabularyRelationship
>('/relationships/:id', () => {
  return HttpResponse.json({
    id: '12345',
    relationship_name: 'Example value',
    is_hierarchical: 'Example value',
    defines_ancestry: 'Example value',
    reverse_relationship_id: 'Example value',
    relationship_concept_id: 8507,
  })
})

export const deleteRelationshipsIdHandler = http.delete<
  { id: string },
  never,
  never
>('/relationships/:id', () => {
  return HttpResponse.json(undefined)
})

export const getSourceToConceptMapsHandler = http.get<
  never,
  never,
  VocabularySourceToConceptMapList
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
    pagination: {
      total: 1,
      offset: 0,
      limit: 100,
      count: 1,
    },
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

export const getSourceToConceptMapsIdHandler = http.get<
  { id: string },
  never,
  VocabularySourceToConceptMap
>('/source-to-concept-maps/:id', () => {
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

export const putSourceToConceptMapsIdHandler = http.put<
  { id: string },
  VocabularySourceToConceptMapCreate,
  VocabularySourceToConceptMap
>('/source-to-concept-maps/:id', () => {
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

export const patchSourceToConceptMapsIdHandler = http.patch<
  { id: string },
  VocabularySourceToConceptMapUpdate,
  VocabularySourceToConceptMap
>('/source-to-concept-maps/:id', () => {
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

export const deleteSourceToConceptMapsIdHandler = http.delete<
  { id: string },
  never,
  never
>('/source-to-concept-maps/:id', () => {
  return HttpResponse.json(undefined)
})

export const getSpecimensHandler = http.get<never, never, ClinicalSpecimenList>(
  '/specimens',
  () => {
    return HttpResponse.json({
      data: [
        {
          id: 12345,
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
      pagination: {
        total: 1,
        offset: 0,
        limit: 100,
        count: 1,
      },
    })
  },
)

export const postSpecimensHandler = http.post<
  never,
  ClinicalSpecimenCreate,
  ClinicalSpecimen
>('/specimens', () => {
  return HttpResponse.json({
    id: 12345,
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

export const getSpecimensIdHandler = http.get<
  { id: string },
  never,
  ClinicalSpecimen
>('/specimens/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const putSpecimensIdHandler = http.put<
  { id: string },
  ClinicalSpecimenCreate,
  ClinicalSpecimen
>('/specimens/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const patchSpecimensIdHandler = http.patch<
  { id: string },
  ClinicalSpecimenUpdate,
  ClinicalSpecimen
>('/specimens/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const deleteSpecimensIdHandler = http.delete<
  { id: string },
  never,
  never
>('/specimens/:id', () => {
  return HttpResponse.json(undefined)
})

export const getVisitDetailsHandler = http.get<
  never,
  never,
  ClinicalVisitDetailList
>('/visit-details', () => {
  return HttpResponse.json({
    data: [
      {
        id: 12345,
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
    pagination: {
      total: 1,
      offset: 0,
      limit: 100,
      count: 1,
    },
  })
})

export const postVisitDetailsHandler = http.post<
  never,
  ClinicalVisitDetailCreate,
  ClinicalVisitDetail
>('/visit-details', () => {
  return HttpResponse.json({
    id: 12345,
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

export const getVisitDetailsIdHandler = http.get<
  { id: string },
  never,
  ClinicalVisitDetail
>('/visit-details/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const putVisitDetailsIdHandler = http.put<
  { id: string },
  ClinicalVisitDetailCreate,
  ClinicalVisitDetail
>('/visit-details/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const patchVisitDetailsIdHandler = http.patch<
  { id: string },
  ClinicalVisitDetailUpdate,
  ClinicalVisitDetail
>('/visit-details/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const deleteVisitDetailsIdHandler = http.delete<
  { id: string },
  never,
  never
>('/visit-details/:id', () => {
  return HttpResponse.json(undefined)
})

export const getVisitOccurrencesHandler = http.get<
  never,
  never,
  ClinicalVisitOccurrenceList
>('/visit-occurrences', () => {
  return HttpResponse.json({
    data: [
      {
        id: 12345,
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
    pagination: {
      total: 1,
      offset: 0,
      limit: 100,
      count: 1,
    },
  })
})

export const postVisitOccurrencesHandler = http.post<
  never,
  ClinicalVisitOccurrenceCreate,
  ClinicalVisitOccurrence
>('/visit-occurrences', () => {
  return HttpResponse.json({
    id: 12345,
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

export const getVisitOccurrencesIdHandler = http.get<
  { id: string },
  never,
  ClinicalVisitOccurrence
>('/visit-occurrences/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const putVisitOccurrencesIdHandler = http.put<
  { id: string },
  ClinicalVisitOccurrenceCreate,
  ClinicalVisitOccurrence
>('/visit-occurrences/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const patchVisitOccurrencesIdHandler = http.patch<
  { id: string },
  ClinicalVisitOccurrenceUpdate,
  ClinicalVisitOccurrence
>('/visit-occurrences/:id', () => {
  return HttpResponse.json({
    id: 12345,
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

export const deleteVisitOccurrencesIdHandler = http.delete<
  { id: string },
  never,
  never
>('/visit-occurrences/:id', () => {
  return HttpResponse.json(undefined)
})

export const getVocabularysHandler = http.get<
  never,
  never,
  VocabularyVocabularyList
>('/vocabularys', () => {
  return HttpResponse.json({
    data: [
      {
        id: '12345',
        vocabulary_name: 'Example value',
        vocabulary_reference: 'Example value',
        vocabulary_version: 'Example value',
        vocabulary_concept_id: 8507,
      },
    ],
    pagination: {
      total: 1,
      offset: 0,
      limit: 100,
      count: 1,
    },
  })
})

export const postVocabularysHandler = http.post<
  never,
  VocabularyVocabularyCreate,
  VocabularyVocabulary
>('/vocabularys', () => {
  return HttpResponse.json({
    id: '12345',
    vocabulary_name: 'Example value',
    vocabulary_reference: 'Example value',
    vocabulary_version: 'Example value',
    vocabulary_concept_id: 8507,
  })
})

export const getVocabularysIdHandler = http.get<
  { id: string },
  never,
  VocabularyVocabulary
>('/vocabularys/:id', () => {
  return HttpResponse.json({
    id: '12345',
    vocabulary_name: 'Example value',
    vocabulary_reference: 'Example value',
    vocabulary_version: 'Example value',
    vocabulary_concept_id: 8507,
  })
})

export const putVocabularysIdHandler = http.put<
  { id: string },
  VocabularyVocabularyCreate,
  VocabularyVocabulary
>('/vocabularys/:id', () => {
  return HttpResponse.json({
    id: '12345',
    vocabulary_name: 'Example value',
    vocabulary_reference: 'Example value',
    vocabulary_version: 'Example value',
    vocabulary_concept_id: 8507,
  })
})

export const patchVocabularysIdHandler = http.patch<
  { id: string },
  VocabularyVocabularyUpdate,
  VocabularyVocabulary
>('/vocabularys/:id', () => {
  return HttpResponse.json({
    id: '12345',
    vocabulary_name: 'Example value',
    vocabulary_reference: 'Example value',
    vocabulary_version: 'Example value',
    vocabulary_concept_id: 8507,
  })
})

export const deleteVocabularysIdHandler = http.delete<
  { id: string },
  never,
  never
>('/vocabularys/:id', () => {
  return HttpResponse.json(undefined)
})
