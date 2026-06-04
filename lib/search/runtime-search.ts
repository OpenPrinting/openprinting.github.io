import MiniSearch, { type SearchResult } from "minisearch";
import { siteConfig } from "@/config/site.config";
import type {
  FoomaticSearchDocument,
  SearchDocument,
  SearchIndex,
} from "./types";

type SearchEngine<TDocument extends SearchDocument> = MiniSearch<TDocument>;

interface SearchRuntimeState<TDocument extends SearchDocument> {
  engine: SearchEngine<TDocument> | null;
  promise: Promise<SearchEngine<TDocument>> | null;
  error: Error | null;
}

const basePath = siteConfig.urls.basePath;

const staticState: SearchRuntimeState<SearchDocument> = {
  engine: null,
  promise: null,
  error: null,
};

const foomaticState: SearchRuntimeState<FoomaticSearchDocument> = {
  engine: null,
  promise: null,
  error: null,
};

function createSearchEngine<TDocument extends SearchDocument>() {
  const storeFields = [
    "id",
    "title",
    "url",
    "snippet",
    "type",
    "source",
    "teaserImage",
    "manufacturer",
    "model",
    "status",
    "driverCount",
  ];

  return new MiniSearch<TDocument>({
    fields: ["title", "content", "headings", "snippet"],
    storeFields,
    searchOptions: {
      boost: { title: 3, headings: 2 },
      fuzzy: 0.2,
    },
  });
}

async function initializeSearch<TDocument extends SearchDocument>(
  state: SearchRuntimeState<TDocument>,
  indexPath: string,
): Promise<SearchEngine<TDocument>> {
  if (state.engine) return state.engine;
  if (state.promise) return state.promise;
  if (state.error) throw state.error;

  state.promise = (async () => {
    const response = await fetch(`${basePath}${indexPath}`);

    if (!response.ok) {
      throw new Error(`Failed to load search index: ${response.status}`);
    }

    const data = (await response.json()) as SearchIndex<TDocument>;
    const engine = createSearchEngine<TDocument>();

    engine.addAll(data.documents);
    state.engine = engine;
    state.error = null;
    return engine;
  })();

  try {
    return await state.promise;
  } catch (error) {
    state.error =
      error instanceof Error ? error : new Error("Failed to initialize search");
    throw state.error;
  } finally {
    state.promise = null;
  }
}

export type SearchRuntimeResult = SearchResult &
  Pick<
    SearchDocument,
    "id" | "title" | "url" | "snippet" | "type" | "source" | "teaserImage"
  >;
export type FoomaticSearchRuntimeResult = SearchResult &
  Pick<
    FoomaticSearchDocument,
    | "id"
    | "title"
    | "url"
    | "snippet"
    | "type"
    | "source"
    | "manufacturer"
    | "model"
    | "status"
    | "driverCount"
  >;

export async function searchRuntime(
  query: string,
): Promise<SearchRuntimeResult[]> {
  if (!query.trim()) return [];

  const engine = await initializeSearch(staticState, "/search/static-index.json");
  return engine.search(query).slice(0, 8) as SearchRuntimeResult[];
}

export async function searchFoomaticRuntime(
  query: string,
): Promise<FoomaticSearchRuntimeResult[]> {
  if (!query.trim()) return [];

  const engine = await initializeSearch(
    foomaticState,
    "/search/foomatic-index.json",
  );

  return engine.search(query).slice(0, 8) as FoomaticSearchRuntimeResult[];
}
