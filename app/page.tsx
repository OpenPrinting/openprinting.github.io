import HeroSection from "@/components/hero-section"
import InfoSection from "@/components/info-section"
import ProjectsSection from "@/components/projects-section"
import NewsSection from "@/components/news-section"
import { getLatestPosts } from "@/lib/get-latest-posts"

export default function Home() {
  const latestPosts = getLatestPosts(3)
  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <NewsSection posts={latestPosts} />
      <InfoSection />
      <ProjectsSection />
    </main>
  )
}
