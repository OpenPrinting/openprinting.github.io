---
title: "Validation of the IANA IPP Registrations Database"
---
### Introduction
1 contributor, large-size (350 hours), Level of difficulty: Intermediate

IANA maintains the IPP protocol registrations database. This database contains formal definitions of all standard IPP attributes, including their groupings, names, syntax, and standard values for enumerations and keywords.

The database is available in a machine-readable format (a large XML file) and can be downloaded from the IANA website:

<https://www.iana.org/assignments/ipp-registrations/ipp-registrations.xml>

The go-mfp project uses this database as its source of knowledge about IPP attributes.

The database is very comprehensive (containing over 1,600 attributes) and largely accurate.

However, it still contains some errors. For example:

1. Job Template/stitching/stitching-method(extension): Broken syntax.

```
Currently: type2 keyword] (note the stray ']' character at the end)
Correct: type2 keyword
```

2. System Status/system-config-changes: Broken syntax.

```
Currently: integer:0:MAX
Correct: integer(0:MAX)
```

3. Operation/client-patches: Unnecessary apostrophes in syntax.

```
Currently: text(255) | 'no-value'
Correct: text(255) | no-value
```

4. Document Status/imposition-template-actual: Missing parentheses in syntax.

```
Currently: 1setOf type2 keyword | name
Correct: 1setOf type2 (keyword | name)
```

5. Job Status/force-front-side-actual: Duplicated 1setOf keyword.

```
Currently: 1setOf (1setOf integer(1:MAX))
Correct: 1setOf integer(1:MAX)
```

Note 1: `1setOf` cannot be nested.

Note 2: The same error exists in the `PWG-5100.8.pdf` standard document.

6. Job Template/job-accounting-sheets(deprecated): Missing member definitions.

7. Ambiguous collection references: Many attributes use syntax like <Any "cover-back" member attribute>. This is a reference to another collection where these attributes are defined. However, the reference to the "cover-back" collection is ambiguous because it is defined in both the Job Template and Document Template groups. This needs to be fixed, or disambiguation rules must be specified. The same applies to references to "cover-front", "finishings-col", etc.

8. Missing collection references: Sometimes, a reference to another collection is missing entirely, which makes a collection appear to have no members. Examples: Document Status/document-format-details(deprecated), Job Status/document-format-details-supplied.

9. Obsolete collections: Some obsolete collections are present (without members) in the registration database, but due to their obsolescence, their specifications cannot be located. Example: Document Template/pdl-init-file(obsolete).

10. Job Template/finishings-col(extension) shadows Job Template/finishings-col and contains no member attributes.

This list is not exhaustive and is provided only as an example. A more comprehensive list can be found here:

<https://github.com/OpenPrinting/go-mfp/blob/master/proto/ipp/iana/errata.xml>

The goal of this project is to develop a tool that validates the IANA IPP registration database for formal consistency and to collaborate with the IETF PWG group (e.g., M. Sweet) on reporting and fixing the identified issues.

The full validation of the database against relevant specification is the giant work and out of scope of this project. However, sometimes this is still required to look to the specification, so ability to read standards and specifications is required.

An ideal side product of this project would be a generic parser for the IANA IPP registration database, implemented as a reusable library.
### Mentors
 Till Kamppeter, organization lead OpenPrinting (till at linux dot com), TBD

Desired Knowledge: Programming in at least one of C or Go, reading standards and specifications.
### Code License
 BSD 2-Clause "Simplified" License
