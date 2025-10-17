import "@typespec/http";
import "@typespec/rest";
import "../common/models.tsp";

using TypeSpec.Http;
using TypeSpec.Rest;
using OmopCdm.Common;

namespace OmopCdm.Clinical;

/**
 * NoteNlp Resource
 *
 * The NOTE_NLP table encodes all output of NLP on clinical notes. Each
row represents a single extracted term from a note.
 *
 * **User Guide**: NA
 *
 * **ETL Conventions**: NA
 */

@doc("NoteNlp record in the OMOP CDM")
@example(#{
  id: 12345,
  note_id: 100,
  section_concept_id: 8507,
  snippet: "Example value",
  lexical_variant: "Example value",
  note_nlp_concept_id: 8507,
  note_nlp_source_concept_id: 8507,
  nlp_system: "Example value",
  nlp_date: "2023-01-15",
  nlp_datetime: "2023-01-15",
  term_exists: "Example value",
  term_temporal: "Example value",
  term_modifiers: "Example value"
})
model NoteNlp {
  @doc("A unique identifier for the NLP record.")
  id: int64;

  @doc("This is the NOTE_ID for the NOTE record the NLP record is associated to.")
  note_id: int64;

  @doc("The SECTION_CONCEPT_ID should be used to represent the note section contained in the NOTE_NLP record. These concepts can be found as parts of document panels and are based on the type of note written, i.e. a discharge summary. These panels can be found as concepts with the relationship ‘Subsumes’ to CONCEPT_ID [45875957](https://athena.ohdsi.org/search-terms/terms/45875957). References CONCEPT table.")
  section_concept_id?: ConceptId;

  @doc("A small window of text surrounding the term")
  @maxLength(250)
  snippet?: string;

  @doc("Raw text extracted from the NLP tool.")
  @maxLength(250)
  lexical_variant: string;

  @doc("References CONCEPT table.")
  note_nlp_concept_id?: ConceptId;

  @doc("References CONCEPT table.")
  note_nlp_source_concept_id?: ConceptId;

  @doc("Name and version of the NLP system that extracted the term. Useful for data provenance.")
  @maxLength(250)
  nlp_system?: string;

  @doc("The date of the note processing.")
  nlp_date: DateOnly;

  @doc("The date and time of the note processing.")
  nlp_datetime?: DateTime;

  @doc("Term_exists is defined as a flag that indicates if the patient actually has or had the condition. Any of the following modifiers would make Term_exists false: Negation = true Subject = [anything other than the patient] Conditional = true/li> Rule_out = true Uncertain = very low certainty or any lower certainties A complete lack of modifiers would make Term_exists true.")
  @maxLength(1)
  term_exists?: string;

  @doc("Term_temporal is to indicate if a condition is present or just in the past. The following would be past: - History = true - Concept_date = anything before the time of the report")
  @maxLength(50)
  term_temporal?: string;

  @doc("For the modifiers that are there, they would have to have these values: - Negation = false - Subject = patient - Conditional = false - Rule_out = false - Uncertain = true or high or moderate or even low (could argue about low). Term_modifiers will concatenate all modifiers for different types of entities (conditions, drugs, labs etc) into one string. Lab values will be saved as one of the modifiers.")
  @maxLength(2000)
  term_modifiers?: string;
}

/**
 * NoteNlp creation request
 */
@doc("Request body for creating a new NoteNlp record")
model NoteNlpCreate {
  @doc("This is the NOTE_ID for the NOTE record the NLP record is associated to.")
  note_id: int64;

  @doc("The SECTION_CONCEPT_ID should be used to represent the note section contained in the NOTE_NLP record. These concepts can be found as parts of document panels and are based on the type of note written, i.e. a discharge summary. These panels can be found as concepts with the relationship ‘Subsumes’ to CONCEPT_ID [45875957](https://athena.ohdsi.org/search-terms/terms/45875957). References CONCEPT table.")
  section_concept_id?: ConceptId;

  @doc("A small window of text surrounding the term")
  @maxLength(250)
  snippet?: string;

  @doc("Raw text extracted from the NLP tool.")
  @maxLength(250)
  lexical_variant: string;

  @doc("References CONCEPT table.")
  note_nlp_concept_id?: ConceptId;

  @doc("References CONCEPT table.")
  note_nlp_source_concept_id?: ConceptId;

  @doc("Name and version of the NLP system that extracted the term. Useful for data provenance.")
  @maxLength(250)
  nlp_system?: string;

  @doc("The date of the note processing.")
  nlp_date: DateOnly;

  @doc("The date and time of the note processing.")
  nlp_datetime?: DateTime;

  @doc("Term_exists is defined as a flag that indicates if the patient actually has or had the condition. Any of the following modifiers would make Term_exists false: Negation = true Subject = [anything other than the patient] Conditional = true/li> Rule_out = true Uncertain = very low certainty or any lower certainties A complete lack of modifiers would make Term_exists true.")
  @maxLength(1)
  term_exists?: string;

  @doc("Term_temporal is to indicate if a condition is present or just in the past. The following would be past: - History = true - Concept_date = anything before the time of the report")
  @maxLength(50)
  term_temporal?: string;

  @doc("For the modifiers that are there, they would have to have these values: - Negation = false - Subject = patient - Conditional = false - Rule_out = false - Uncertain = true or high or moderate or even low (could argue about low). Term_modifiers will concatenate all modifiers for different types of entities (conditions, drugs, labs etc) into one string. Lab values will be saved as one of the modifiers.")
  @maxLength(2000)
  term_modifiers?: string;
}

/**
 * NoteNlp update request
 */
@doc("Request body for updating an existing NoteNlp record")
model NoteNlpUpdate {
  @doc("This is the NOTE_ID for the NOTE record the NLP record is associated to.")
  note_id?: int64;

  @doc("The SECTION_CONCEPT_ID should be used to represent the note section contained in the NOTE_NLP record. These concepts can be found as parts of document panels and are based on the type of note written, i.e. a discharge summary. These panels can be found as concepts with the relationship ‘Subsumes’ to CONCEPT_ID [45875957](https://athena.ohdsi.org/search-terms/terms/45875957). References CONCEPT table.")
  section_concept_id?: ConceptId;

  @doc("A small window of text surrounding the term")
  snippet?: string;

  @doc("Raw text extracted from the NLP tool.")
  lexical_variant?: string;

  @doc("References CONCEPT table.")
  note_nlp_concept_id?: ConceptId;

  @doc("References CONCEPT table.")
  note_nlp_source_concept_id?: ConceptId;

  @doc("Name and version of the NLP system that extracted the term. Useful for data provenance.")
  nlp_system?: string;

  @doc("The date of the note processing.")
  nlp_date?: DateOnly;

  @doc("The date and time of the note processing.")
  nlp_datetime?: DateTime;

  @doc("Term_exists is defined as a flag that indicates if the patient actually has or had the condition. Any of the following modifiers would make Term_exists false: Negation = true Subject = [anything other than the patient] Conditional = true/li> Rule_out = true Uncertain = very low certainty or any lower certainties A complete lack of modifiers would make Term_exists true.")
  term_exists?: string;

  @doc("Term_temporal is to indicate if a condition is present or just in the past. The following would be past: - History = true - Concept_date = anything before the time of the report")
  term_temporal?: string;

  @doc("For the modifiers that are there, they would have to have these values: - Negation = false - Subject = patient - Conditional = false - Rule_out = false - Uncertain = true or high or moderate or even low (could argue about low). Term_modifiers will concatenate all modifiers for different types of entities (conditions, drugs, labs etc) into one string. Lab values will be saved as one of the modifiers.")
  term_modifiers?: string;
}

/**
 * Query parameters for filtering note-nlp
 */
@doc("Filter parameters for NoteNlp list operations")
model NoteNlpQueryParams {
  ...PaginationParams;

  @doc("Filter by section concept id")
  @query
  section_concept_id?: ConceptId;

  @doc("Filter by note nlp concept id")
  @query
  note_nlp_concept_id?: ConceptId;

  @doc("Filter by note nlp source concept id")
  @query
  note_nlp_source_concept_id?: ConceptId;

  @doc("Sort field")
  @query
  sort_by?: "id";

  @doc("Sort order")
  @query
  sort_order?: SortOrder;
}

/**
 * NoteNlp API operations
 */
@route("/note-nlps")
@tag("Clinical - NoteNlps")
interface NoteNlps {
  @get
  @summary("List all note-nlps")
  @doc("Returns a paginated list of NoteNlp records.")
  list(
    ...NoteNlpQueryParams,
  ): {
    @statusCode statusCode: 200;
    @body body: PaginatedList<NoteNlp>;
  } | ErrorResponse;

  @get
  @summary("Get note-nlp by ID")
  @doc("Retrieve a single NoteNlp record by its unique identifier.")
  read(
    @path
    @doc("Unique note-nlp identifier")
    id: int64,
  ): {
    @statusCode statusCode: 200;
    @body body: NoteNlp;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @post
  @summary("Create a new note-nlp")
  @doc("Create a new NoteNlp record.")
  create(
    @body
    @doc("NoteNlp data to create")
    record: NoteNlpCreate,
  ): {
    @statusCode statusCode: 201;
    @body body: NoteNlp;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @put
  @summary("Update note-nlp (full replacement)")
  @doc("Replace all fields of an existing NoteNlp record.")
  update(
    @path
    @doc("Unique note-nlp identifier")
    id: int64,

    @body
    @doc("Complete note-nlp data")
    record: NoteNlpCreate,
  ): {
    @statusCode statusCode: 200;
    @body body: NoteNlp;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | {
    @statusCode statusCode: 400;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @patch(#{implicitOptionality: true})
  @summary("Update note-nlp (partial)")
  @doc("Update specific fields of an existing NoteNlp record.")
  patch(
    @path
    @doc("Unique note-nlp identifier")
    id: int64,

    @body
    @doc("Fields to update")
    record: NoteNlpUpdate,
  ): {
    @statusCode statusCode: 200;
    @body body: NoteNlp;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;

  @delete
  @summary("Delete note-nlp")
  @doc("Delete a NoteNlp record.")
  delete(
    @path
    @doc("Unique note-nlp identifier")
    id: int64,
  ): {
    @statusCode statusCode: 204;
  } | {
    @statusCode statusCode: 404;
    @body body: ErrorResponse;
  } | ErrorResponse;
}
