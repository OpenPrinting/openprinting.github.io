export type SearchSource = "static" | "foomatic";

export type StaticContentType =
  | "post"
  | "documentation"
  | "project"
  | "page";

export type SearchContentType = StaticContentType | "printer" | "driver";

export interface SearchDocument {
  id: string;
  source: SearchSource;
  type: SearchContentType;

  title: string;
  url: string;
  teaserImage?: string;

  headings: string[];
  tags: string[];

  snippet: string;
  content: string;
}

export interface SearchIndex<TDocument extends SearchDocument = SearchDocument> {
  version: "1.0";
  documents: TDocument[];

  metadata: {
    documentCount: number;
    contentTypes: SearchContentType[];
  };
}

export type StaticSearchIndex = SearchIndex<SearchDocument>;

export interface FoomaticSearchDocument extends SearchDocument {
  source: "foomatic";
  type: "printer" | "driver";
  manufacturer?: string;
  model?: string;
  status?: string;
  driverCount?: number;
  supplier?: string;
  printerCount?: number;
}
