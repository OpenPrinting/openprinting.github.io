import {
  getGsocYearOverview,
  getGsocYears,
  getGsocPostsByYear,
  getGsocProjectsByYear,
} from "@/lib/gsoc";
import {
  getContributorsByYear,
  getOrgUrlByYear,
} from "@/data/gsoc-contributors";
import { getWorkSummariesByYear } from "@/data/gsoc-work-summaries";
import { GsocYearClient } from "@/components/gsoc-year-client";

export async function generateStaticParams() {
  const years = await getGsocYears();
  return years.map((year) => ({ year }));
}

export default async function GsocYearPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;
  const overview = await getGsocYearOverview(year);
  const projects = await getGsocProjectsByYear(year);
  const contributors = getContributorsByYear(Number(year));
  const orgUrl = getOrgUrlByYear(Number(year));
  const allPostsByYear = await getGsocPostsByYear();
  const relatedPosts = allPostsByYear[year] ?? [];
  const workSummaries = getWorkSummariesByYear(Number(year));

  return (
    <GsocYearClient
      year={year}
      yearTitle={overview.title}
      yearContent={overview.content}
      projects={projects}
      contributors={contributors}
      orgUrl={orgUrl}
      relatedPosts={relatedPosts}
      workSummaries={workSummaries}
    />
  );
}
