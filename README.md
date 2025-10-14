# OMOP CDM

Attempting to generate a React and Supabase app for the OMOP CDM v5.4 using Skmtc, TypeSpec and Claude. This is a work in progress.

Steps:

1. Convert the OMOP CDM v5.4 HTML specification to Markdown.
2. Convert the Markdown to RESTful API using TypeSpec.
3. Compile the TypeSpec to OpenAPI 3.0
4. Use TypeSpec to generate Supabase server and client code.

Todo:

- [ ] Generate Postgres database schema from Markdown specs
- [ ] Sping up Supabase and generate types from it
- [ ] Generate database services from API and DB types 
- [ ] Generate form fields from the OpenAPI specification
- [ ] Add Shadcn UI components

