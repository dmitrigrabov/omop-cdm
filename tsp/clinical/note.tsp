import "@typespec/http";
import "@typespec/rest";
import "../common/models.tsp";

using TypeSpec.Http;
using TypeSpec.Rest;
using OmopCdm.Common;

namespace OmopCdm.Clinical;

/**
 * Note Resource
 *
 * The NOTE table captures unstructured information that was recorded by
a provider about a patient in free text (in ASCII, or preferably in UTF8
format) notes on a given date. The type of note_text is CLOB or
varchar(MAX) depending on RDBMS.
 *
 * **User Guide**: NA
 *
 * **ETL Conventions**: HL7/LOINC CDO is a standard for consistent naming of documents to
support a range of use cases: retrieval, organization, display, and
exchange. It guides the creation of LOINC codes for clinical notes. CDO
annotates each document with 5 dimensions: 
- **Kind of Document**: Characterizes the general
structure of the document at a macro level (e.g. Anesthesia
Consent)
- **Type of Service**: Characterizes the kind of service
or activity (e.g. evaluations, consultations, and summaries). The notion
of time sequence, e.g., at the beginning (admission) at the end
(discharge) is subsumed in this axis. Example: Discharge Teaching.
- **Setting**: Setting is an extension of CMS’s
definitions (e.g. Inpatient, Outpatient)
- **Subject Matter Domain (SMD)**: Characterizes the
subject matter domain of a note (e.g. Anesthesiology)
- **Role**: Characterizes the training or professional
level of the author of the document, but does not break down to
specialty or subspecialty (e.g. Physician) Each combination of these 5
dimensions rolls up to a unique LOINC code.

According to CDO requirements, only 2 of the 5 dimensions are
required to properly annotate a document; Kind of Document and any one
of the other 4 dimensions. However, not all the permutations of the CDO
dimensions will necessarily yield an existing LOINC code. Each of these
dimensions are contained in the OMOP Vocabulary under the domain of
‘Meas Value’ with each dimension represented as a Concept Class.
 */
@doc("Note record in the OMOP CDM")
@example(#{
  note_id: 12345,
  person_id: 100,
  note_date: "2023-01-15",
  note_datetime: "2023-01-15",
  note_type_concept_id: 8507,
  note_class_concept_id: 8507,
  note_title: "Example value",
  note_text: "Example value",
  encoding_concept_id: 8507,
  language_concept_id: 8507,
  provider_id: 100,
  visit_occurrence_id: 100,
  visit_detail_id: 100,
  note_source_value: "Example value",
  note_event_id: 100,
  note_event_field_concept_id: 8507,
})
model Note {
  @doc("A unique identifier for each note.")
  note_id: int64;

  @doc("References PERSON table.")
  person_id: int64;

  @doc("The date the note was recorded.")
  note_date: DateOnly;

  @doc("If time is not given set the time to midnight.")
  note_datetime?: DateTime;

  @doc("The provenance of the note. Most likely this will be EHR. ETL Convention: Put the source system of the note, as in EHR record. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?standardConcept=Standard&domain=Type+Concept&page=1&pageSize=15&query=). A more detailed explanation of each Type Concept can be found on the [vocabulary wiki](https://github.com/OHDSI/Vocabulary-v5.0/wiki/Vocab.-TYPE_CONCEPT). References CONCEPT table.")
  note_type_concept_id: ConceptId;

  @doc("A Standard Concept Id representing the HL7 LOINC Document Type Vocabulary classification of the note. ETL Convention: Map the note classification to a Standard Concept. For more information see the ETL Conventions in the description of the NOTE table. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?standardConcept=Standard&conceptClass=Doc+Kind&conceptClass=Doc+Role&conceptClass=Doc+Setting&conceptClass=Doc+Subject+Matter&conceptClass=Doc+Type+of+Service&domain=Meas+Value&page=1&pageSize=15&query=). This Concept can alternatively be represented by concepts with the relationship ‘Kind of (LOINC)’ to [706391](https://athena.ohdsi.org/search-terms/terms/706391) (Note). References CONCEPT table.")
  note_class_concept_id: ConceptId;

  @doc("The title of the note.")
  @maxLength(250)
  note_title?: string;

  @doc("The content of the note.")
  note_text: string;

  @doc("This is the Concept representing the character encoding type. ETL Convention: Put the Concept Id that represents the encoding character type here. Currently the only option is UTF-8 ([32678](https://athena.ohdsi.org/search-terms/terms/32678)). It the note is encoded in any other type, like ASCII then put 0. References CONCEPT table.")
  encoding_concept_id: ConceptId;

  @doc("The language of the note. ETL Convention: Use Concepts that are descendants of the concept [4182347](https://athena.ohdsi.org/search-terms/terms/4182347) (World Languages). References CONCEPT table.")
  language_concept_id: ConceptId;

  @doc("The Provider who wrote the note. ETL Convention: The ETL may need to make a determination on which provider to put here. References PROVIDER table.")
  provider_id?: int64;

  @doc("The Visit during which the note was written. References VISIT_OCCURRENCE table.")
  visit_occurrence_id?: int64;

  @doc("The Visit Detail during which the note was written. References VISIT_DETAIL table.")
  visit_detail_id?: int64;

  @doc("The source value mapped to the NOTE_CLASS_CONCEPT_ID.")
  @maxLength(50)
  note_source_value?: string;

  @doc("If the Note record is related to another record in the database, this field is the primary key of the linked record. ETL Convention: Put the primary key of the linked record, if applicable, here.")
  note_event_id?: int64;

  @doc("If the Note record is related to another record in the database, this field is the CONCEPT_ID that identifies which table the primary key of the linked record came from. ETL Convention: Put the CONCEPT_ID that identifies which table and field the NOTE_EVENT_ID came from. References CONCEPT table.")
  note_event_field_concept_id?: ConceptId;
}

/**
 * Note creation request
 */
@doc("Request body for creating a new Note record")
model NoteCreate {
  @doc("References PERSON table.")
  person_id: int64;

  @doc("The date the note was recorded.")
  note_date: DateOnly;

  @doc("If time is not given set the time to midnight.")
  note_datetime?: DateTime;

  @doc("The provenance of the note. Most likely this will be EHR. ETL Convention: Put the source system of the note, as in EHR record. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?standardConcept=Standard&domain=Type+Concept&page=1&pageSize=15&query=). A more detailed explanation of each Type Concept can be found on the [vocabulary wiki](https://github.com/OHDSI/Vocabulary-v5.0/wiki/Vocab.-TYPE_CONCEPT). References CONCEPT table.")
  note_type_concept_id: ConceptId;

  @doc("A Standard Concept Id representing the HL7 LOINC Document Type Vocabulary classification of the note. ETL Convention: Map the note classification to a Standard Concept. For more information see the ETL Conventions in the description of the NOTE table. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?standardConcept=Standard&conceptClass=Doc+Kind&conceptClass=Doc+Role&conceptClass=Doc+Setting&conceptClass=Doc+Subject+Matter&conceptClass=Doc+Type+of+Service&domain=Meas+Value&page=1&pageSize=15&query=). This Concept can alternatively be represented by concepts with the relationship ‘Kind of (LOINC)’ to [706391](https://athena.ohdsi.org/search-terms/terms/706391) (Note). References CONCEPT table.")
  note_class_concept_id: ConceptId;

  @doc("The title of the note.")
  @maxLength(250)
  note_title?: string;

  @doc("The content of the note.")
  note_text: string;

  @doc("This is the Concept representing the character encoding type. ETL Convention: Put the Concept Id that represents the encoding character type here. Currently the only option is UTF-8 ([32678](https://athena.ohdsi.org/search-terms/terms/32678)). It the note is encoded in any other type, like ASCII then put 0. References CONCEPT table.")
  encoding_concept_id: ConceptId;

  @doc("The language of the note. ETL Convention: Use Concepts that are descendants of the concept [4182347](https://athena.ohdsi.org/search-terms/terms/4182347) (World Languages). References CONCEPT table.")
  language_concept_id: ConceptId;

  @doc("The Provider who wrote the note. ETL Convention: The ETL may need to make a determination on which provider to put here. References PROVIDER table.")
  provider_id?: int64;

  @doc("The Visit during which the note was written. References VISIT_OCCURRENCE table.")
  visit_occurrence_id?: int64;

  @doc("The Visit Detail during which the note was written. References VISIT_DETAIL table.")
  visit_detail_id?: int64;

  @doc("The source value mapped to the NOTE_CLASS_CONCEPT_ID.")
  @maxLength(50)
  note_source_value?: string;

  @doc("If the Note record is related to another record in the database, this field is the primary key of the linked record. ETL Convention: Put the primary key of the linked record, if applicable, here.")
  note_event_id?: int64;

  @doc("If the Note record is related to another record in the database, this field is the CONCEPT_ID that identifies which table the primary key of the linked record came from. ETL Convention: Put the CONCEPT_ID that identifies which table and field the NOTE_EVENT_ID came from. References CONCEPT table.")
  note_event_field_concept_id?: ConceptId;
}

/**
 * Note update request
 */
@doc("Request body for updating an existing Note record")
model NoteUpdate {
  @doc("References PERSON table.")
  person_id?: int64;

  @doc("The date the note was recorded.")
  note_date?: DateOnly;

  @doc("If time is not given set the time to midnight.")
  note_datetime?: DateTime;

  @doc("The provenance of the note. Most likely this will be EHR. ETL Convention: Put the source system of the note, as in EHR record. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?standardConcept=Standard&domain=Type+Concept&page=1&pageSize=15&query=). A more detailed explanation of each Type Concept can be found on the [vocabulary wiki](https://github.com/OHDSI/Vocabulary-v5.0/wiki/Vocab.-TYPE_CONCEPT). References CONCEPT table.")
  note_type_concept_id?: ConceptId;

  @doc("A Standard Concept Id representing the HL7 LOINC Document Type Vocabulary classification of the note. ETL Convention: Map the note classification to a Standard Concept. For more information see the ETL Conventions in the description of the NOTE table. [Accepted Concepts](https://athena.ohdsi.org/search-terms/terms?standardConcept=Standard&conceptClass=Doc+Kind&conceptClass=Doc+Role&conceptClass=Doc+Setting&conceptClass=Doc+Subject+Matter&conceptClass=Doc+Type+of+Service&domain=Meas+Value&page=1&pageSize=15&query=). This Concept can alternatively be represented by concepts with the relationship ‘Kind of (LOINC)’ to [706391](https://athena.ohdsi.org/search-terms/terms/706391) (Note). References CONCEPT table.")
  note_class_concept_id?: ConceptId;

  @doc("The title of the note.")
  note_title?: string;

  @doc("The content of the note.")
  note_text?: string;

  @doc("This is the Concept representing the character encoding type. ETL Convention: Put the Concept Id that represents the encoding character type here. Currently the only option is UTF-8 ([32678](https://athena.ohdsi.org/search-terms/terms/32678)). It the note is encoded in any other type, like ASCII then put 0. References CONCEPT table.")
  encoding_concept_id?: ConceptId;

  @doc("The language of the note. ETL Convention: Use Concepts that are descendants of the concept [4182347](https://athena.ohdsi.org/search-terms/terms/4182347) (World Languages). References CONCEPT table.")
  language_concept_id?: ConceptId;

  @doc("The Provider who wrote the note. ETL Convention: The ETL may need to make a determination on which provider to put here. References PROVIDER table.")
  provider_id?: int64;

  @doc("The Visit during which the note was written. References VISIT_OCCURRENCE table.")
  visit_occurrence_id?: int64;

  @doc("The Visit Detail during which the note was written. References VISIT_DETAIL table.")
  visit_detail_id?: int64;

  @doc("The source value mapped to the NOTE_CLASS_CONCEPT_ID.")
  note_source_value?: string;

  @doc("If the Note record is related to another record in the database, this field is the primary key of the linked record. ETL Convention: Put the primary key of the linked record, if applicable, here.")
  note_event_id?: int64;

  @doc("If the Note record is related to another record in the database, this field is the CONCEPT_ID that identifies which table the primary key of the linked record came from. ETL Convention: Put the CONCEPT_ID that identifies which table and field the NOTE_EVENT_ID came from. References CONCEPT table.")
  note_event_field_concept_id?: ConceptId;
}

/**
 * Query parameters for filtering note
 */
@doc("Filter parameters for Note list operations")
model NoteQueryParams {
  ...PaginationParams;

  @doc("Filter by person id")
  @query
  person_id?: int64;

  @doc("Filter by note type concept id")
  @query
  note_type_concept_id?: ConceptId;

  @doc("Filter by note class concept id")
  @query
  note_class_concept_id?: ConceptId;

  @doc("Filter by encoding concept id")
  @query
  encoding_concept_id?: ConceptId;

  @doc("Filter by language concept id")
  @query
  language_concept_id?: ConceptId;

  @doc("Filter by provider id")
  @query
  provider_id?: int64;

  @doc("Filter by visit occurrence id")
  @query
  visit_occurrence_id?: int64;

  @doc("Filter by visit detail id")
  @query
  visit_detail_id?: int64;

  @doc("Filter by note event field concept id")
  @query
  note_event_field_concept_id?: ConceptId;

  @doc("Sort field")
  @query
  sort_by?: "note_id";

  @doc("Sort order")
  @query
  sort_order?: SortOrder;
}

/**
 * Note API operations
 */
@route("/notes")
@tag("Clinical - Notes")
interface Notes {
  @get
  @summary("List all notes")
  @doc("Returns a paginated list of Note records.")
  list(...NoteQueryParams): {
    @statusCode statusCode: 200;
    @body body: PaginatedList<Note>;
  } | ErrorResponse;

  @get
  @summary("Get note by ID")
  @doc("Retrieve a single Note record by its unique identifier.")
  read(
    @path
    @doc("Unique note identifier")
    note_id: int64,
  ): {
    @statusCode statusCode: 200;
    @body body: Note;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @post
  @summary("Create a new note")
  @doc("Create a new Note record.")
  create(
    @body
    @doc("Note data to create")
    record: NoteCreate,
  ): {
    @statusCode statusCode: 201;
    @body body: Note;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @put
  @summary("Update note (full replacement)")
  @doc("Replace all fields of an existing Note record.")
  update(
    @path
    @doc("Unique note identifier")
    note_id: int64,

    @body
    @doc("Complete note data")
    record: NoteCreate,
  ):
    | {
        @statusCode statusCode: 200;
        @body body: Note;
      }
    | {
        @statusCode statusCode: 404;
        @body body: ErrorResponse;
      }
    | {
        @statusCode statusCode: 400;
        @body body: ErrorResponse;
      }
    | ErrorResponse;

  @patch(#{ implicitOptionality: true })
  @summary("Update note (partial)")
  @doc("Update specific fields of an existing Note record.")
  patch(
    @path
    @doc("Unique note identifier")
    note_id: int64,

    @body
    @doc("Fields to update")
    record: NoteUpdate,
  ): {
    @statusCode statusCode: 200;
    @body body: Note;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @delete
  @summary("Delete note")
  @doc("Delete a Note record.")
  delete(
    @path
    @doc("Unique note identifier")
    note_id: int64,
  ): {
    @statusCode statusCode: 204;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;
}
