"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";
import { siteConfig } from "@/config/site.config";

export default function GiscusComments() {
    const { resolvedTheme } = useTheme();

    return (
        <div className="mt-10">
            <Giscus
                id="comments"
                repo={siteConfig.discussion.repo}
                repoId={siteConfig.discussion.repoId}
                category={siteConfig.discussion.category}
                categoryId={siteConfig.discussion.categoryId}
                mapping="url"
                term={siteConfig.discussion.term}
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                theme={resolvedTheme === "dark" ? "transparent_dark" : "noborder_light"}
                lang="en"
                loading="lazy"
            />
        </div>
    );
}
