export const LEGACY_REDIRECTS: Record<string, string> = {
  "/gsoc2019/01-legacy-drivers-to-printer-applications": "/gsoc/2019",
  "/gsoc2019/02-ipp-scan-server": "/gsoc/2019",
  "/gsoc2019/03-sane-module": "/gsoc/2019",
  "/gsoc2019/04-ipp-test-tool-for-ipp-system-service": "/gsoc/2019",
  "/gsoc2019/05-ipp-test-tool-for-ipp-errata-updates": "/gsoc/2019",
  "/gsoc2019/06-linux-gui-application": "/gsoc/2019",
  "/gsoc2019/07-pdftoraster-filter": "/gsoc/2019",
  "/gsoc2019/08-foomatic-generating-cups-ppd-generator": "/gsoc/2019",
  "/gsoc2019/09-add-printer-output-backends-to-mupdf": "/gsoc/2019",
  "/gsoc2019/10-common-print-dialog": "/gsoc/2019",
  "/gsoc2019/11-scp-dbus-service-into-c": "/gsoc/2019",
  "/gsoc2019/12-gcp-desktop-solution-for-local-cups-printers": "/gsoc/2019",
  "/gsoc2019/13-print-files-from-file-manager": "/gsoc/2019",
  "/gsoc2019/14-cairo-color-management-code": "/gsoc/2019",
  "/gsoc2020/01-Linux-GUI-Application": "/gsoc/2020",
  "/gsoc2020/02-common-print-dialog": "/gsoc/2020",
  "/gsoc2020/03-ipp-scan-application": "/gsoc/2020",
  "/gsoc2020/04-sane-module": "/gsoc/2020",
  "/gsoc2020/05-general-printer-sdk": "/gsoc/2020",
  "/gsoc2020/06-make-printer-application-configurable": "/gsoc/2020",
  "/gsoc2020/07-cups-browsed-printer-app": "/gsoc/2020",
  "/gsoc2020/08-optimization-cups-browsed": "/gsoc/2020",
  "/gsoc2020/09-wrapping-proprietary-drivers": "/gsoc/2020",
  "/gsoc2020/10-gutenprint-printer-application": "/gsoc/2020",
  "/gsoc2020/11-ipp-fax-out": "/gsoc/2020",
  "/gsoc2020/12-scp-dbus-service-into-c": "/gsoc/2020",
  "/gsoc2020/13-extract-raster-from-pdf": "/gsoc/2020",
  "/gsoc2020/14-roll-paper-support": "/gsoc/2020",
  "/gsoc2020/15-printer-output-backendto-mupdf": "/gsoc/2020",
  "/gsoc2020/16-print-files-directly-from-manager": "/gsoc/2020",
  "/gsoc2020/17-get-cairo-code-upstream": "/gsoc/2020",
  "/gsoc2021/01-Filter_withour-PPD": "/gsoc/2021",
  "/gsoc2021/02-GUI-for-IPP": "/gsoc/2021",
  "/gsoc2021/03-File-Handling-in-PAPPL": "/gsoc/2021",
  "/gsoc2021/04-Single-universal-filter": "/gsoc/2021",
  "/gsoc2021/05-Filters-to-Filter": "/gsoc/2021",
  "/gsoc2019": "/gsoc/2019",
  "/gsoc2020": "/gsoc/2020",
  "/gsoc2021": "/gsoc/2021",
  "/gsoc-2020-students": "/gsoc/2020",
  "/gsoc-2021-students": "/gsoc/2021",
  "/driverless/00-introduction": "/driverless/#introduction",
  "/driverless/01-standards-and-their-pdls": "/driverless/#standards",
  "/driverless/02-workflow": "/driverless/#workflow",
  "/lfmp-2020-students": "/lfmp",
  "/lfmp2020/01-Wrapping-proprietary-printer-drivers-into-a-Printer-Application": "/lfmp2020/#wrapping-proprietary-printer-drivers-into-a-printer-application",
  "/lfmp2020/02-Support-IPP-Fax-Out": "/lfmp2020/#support-for-ipp-fax-out",
  "/lfmp2020/03-ipp-scan-application": "/lfmp2020/#ipp-scan-or-virtual-mf-device-server-scanner-application"
};

export function getLegacyRedirect(pathOrSlug: string): string | undefined {
  const normalized = "/" + pathOrSlug.replace(/^\/+|\/+$/g, "");
  return LEGACY_REDIRECTS[normalized];
}

export function legacyRedirectParams(): { slug: string[] }[] {
  return Object.keys(LEGACY_REDIRECTS).map((p) => ({
    slug: p.replace(/^\/+/, "").split("/"),
  }));
}
