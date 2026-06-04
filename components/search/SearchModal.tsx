"use client";

import { useEffect, useMemo, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import {
  searchFoomaticRuntime,
  searchRuntime,
} from "@/lib/search/runtime-search";
import type {
  FoomaticSearchRuntimeResult,
  SearchRuntimeResult,
} from "@/lib/search/runtime-search";
import { cn, getImageSrc } from "@/lib/utils";
import Link from "next/link";
import TeaserImage from "@/components/teaser-image";
import { Button } from "@/components/ui/button";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SearchScope = "site" | "foomatic";

type SearchSection = {
  key: string;
  label: string;
  results: SearchResultItem[];
};

type SearchResultItem = SearchRuntimeResult | FoomaticSearchRuntimeResult;

const SCOPES: Array<{
  key: SearchScope;
  label: string;
  shortcut: string;
}> = [
  { key: "site", label: "OpenPrinting", shortcut: "Tab" },
  { key: "foomatic", label: "Foomatic Lookup Site", shortcut: "Shift+Tab" },
];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [siteResults, setSiteResults] = useState<SearchRuntimeResult[]>([]);
  const [foomaticResults, setFoomaticResults] = useState<FoomaticSearchRuntimeResult[]>([]);
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scope, setScope] = useState<SearchScope>("site");
  const [foomaticError, setFoomaticError] = useState<string | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 200);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [siteResults, foomaticResults, scope]);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setSiteResults([]);
      setFoomaticResults([]);
      setFoomaticError(null);
      return;
    }

    const runSearch = async () => {
      setLoading(true);
      setFoomaticError(null);

      try {
        if (scope === "site") {
          const siteRes = await searchRuntime(debouncedQuery);
          setSiteResults(siteRes);
          setFoomaticResults([]);
        } else {
          setSiteResults([]);

          try {
            const foomaticRes = await searchFoomaticRuntime(debouncedQuery);
            setFoomaticResults(foomaticRes);
          } catch {
            setFoomaticResults([]);
            setFoomaticError("Foomatic results are temporarily unavailable.");
          }
        }
      } finally {
        setLoading(false);
      }
    };

    runSearch();
  }, [debouncedQuery, scope]);

  const sections = useMemo<SearchSection[]>(() => {
    const items: SearchSection[] = [];

    if (siteResults.length > 0) {
      items.push({
        key: "site",
        label: "OpenPrinting",
        results: siteResults,
      });
    }

    if (scope === "foomatic" && foomaticResults.length > 0) {
      items.push({
        key: "foomatic",
        label: "Foomatic Lookup Site",
        results: foomaticResults,
      });
    }

    return items;
  }, [foomaticResults, scope, siteResults]);

  const flatResults = useMemo(
    () => sections.flatMap((section) => section.results),
    [sections],
  );

  const resultIndexMap = useMemo(() => {
    return new Map(flatResults.map((result, index) => [result.id, index]));
  }, [flatResults]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      } else if (event.key === "Tab") {
        event.preventDefault();
        setScope((prev) =>
          event.shiftKey
            ? prev === "foomatic"
              ? "site"
              : "foomatic"
            : prev === "site"
              ? "foomatic"
              : "site",
        );
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex((prev) =>
          prev < flatResults.length - 1 ? prev + 1 : prev,
        );
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (event.key === "Enter" && flatResults.length > 0) {
        event.preventDefault();
        const selectedResult = flatResults[selectedIndex];
        if (selectedResult) {
          window.location.href = selectedResult.url;
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [flatResults, isOpen, onClose, selectedIndex]);

  if (!isOpen) return null;

  const showResultsPane =
    loading ||
    (query.trim().length > 0 &&
      (flatResults.length > 0 || !!foomaticError || !loading));

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[15vh]">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />

      <div className="relative flex w-full max-w-[42rem] flex-col overflow-hidden rounded-[24px] bg-[#1e1e1e]/80 shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_30px_60px_rgba(0,0,0,0.5)] backdrop-blur-[60px]">
        <div className="relative flex items-center gap-3 px-4 py-3">
          <SearchIcon size={24} className="ml-2 text-white/60" />
          <input
            autoFocus
            type="text"
            placeholder="OpenPrinting Search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full bg-transparent pr-20 text-lg tracking-tight text-white caret-blue-500 outline-none selection:bg-blue-500/50 selection:text-white placeholder:text-white/30 sm:text-[26px]"
            spellCheck={false}
          />
          <div className="absolute right-4 flex items-center gap-1.5 text-xs font-medium text-white/40">
            <kbd className="rounded-md border border-white/10 bg-white/10 px-1.5 py-0.5">
              ESC
            </kbd>
          </div>
        </div>

        <div className="px-4 pb-3">
          <div className="flex flex-wrap items-center gap-2">
            {SCOPES.map((option) => {
              const active = scope === option.key;

              return (
                <Button
                  key={option.key}
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setScope(option.key)}
                  className={cn(
                    "h-8 rounded-full border px-3 text-xs transition-colors",
                    active
                      ? "border-blue-400/60 bg-blue-500 text-white hover:bg-blue-500"
                      : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white",
                  )}
                  aria-pressed={active}
                >
                  <span>{option.label}</span>
                  <span className="rounded bg-black/20 px-1.5 py-0.5 text-[10px] text-white/75">
                    {option.shortcut}
                  </span>
                </Button>
              );
            })}
          </div>
          <p className="mt-2 text-xs text-white/45">
            {scope === "site"
              ? "Searching OpenPrinting..."
              : "Searching Foomatic database..."}
          </p>
        </div>

        {showResultsPane && <div className="h-px w-full bg-white/10" />}

        {showResultsPane && (
          <div className="relative flex max-h-[60vh] flex-col gap-1 overflow-x-hidden overflow-y-auto p-2">
            {loading && (
              <div className="px-4 py-3 text-sm text-white/50">Searching...</div>
            )}

            {!loading && foomaticError && scope === "foomatic" && (
              <div className="mx-2 rounded-xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-100/90">
                {foomaticError}
              </div>
            )}

            {!loading && query && flatResults.length === 0 && (
              <div className="px-4 py-8 text-center text-sm text-white/50">
                No results found for &quot;{query}&quot; in{" "}
                {scope === "site" ? "OpenPrinting" : "the Foomatic Lookup Site"}.
              </div>
            )}

            {sections.map((section) => (
              <div key={section.key} className="space-y-1">
                <div className="px-3 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">
                  {section.label}
                </div>

                {section.results.map((result) => {
                  const index = resultIndexMap.get(result.id) ?? -1;
                  const isSelected = index === selectedIndex;
                  const isFoomatic = result.source === "foomatic";

                  return (
                    <Link
                      key={result.id}
                      href={result.url}
                      onClick={onClose}
                      className={`group flex items-center gap-3 rounded-xl p-2 transition-colors duration-100 ${
                        isSelected ? "bg-blue-500" : "hover:bg-blue-500/50"
                      }`}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      {result.teaserImage ? (
                        <div className="relative aspect-video w-16 flex-shrink-0 overflow-hidden rounded-lg bg-white/5 shadow-sm">
                          <TeaserImage
                            src={getImageSrc(result.teaserImage)}
                            alt={result.title}
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div
                          className={cn(
                            "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg shadow-sm",
                            isFoomatic
                              ? "bg-gradient-to-b from-emerald-400 to-teal-600"
                              : "bg-gradient-to-b from-blue-400 to-blue-600",
                          )}
                        >
                          <span className="text-lg font-bold text-white">
                            {result.title.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}

                      <div className="flex min-w-0 flex-1 flex-col">
                        <div
                          className={`truncate text-[15px] font-medium ${
                            isSelected
                              ? "text-white"
                              : "text-white/90 group-hover:text-white"
                          }`}
                        >
                          {result.title}
                        </div>
                        <div
                          className={`truncate text-[13px] ${
                            isSelected
                              ? "text-white/80"
                              : "text-white/50 group-hover:text-white/70"
                          }`}
                        >
                          {result.snippet || result.url}
                        </div>
                      </div>
                      <div
                        className={`px-2 text-xs ${
                          isSelected
                            ? "flex items-center text-white/90"
                            : "hidden items-center text-white/50 group-hover:flex"
                        }`}
                      >
                        <span className="rounded bg-black/20 px-1.5 py-0.5">↵</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
