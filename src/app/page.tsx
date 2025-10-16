import { getAllCourses } from "@/lib/markdown";
import HomePageContent from "@/components/HomePageContent";

export default async function Home() {
  const courses = await getAllCourses();

  return <HomePageContent courses={courses} />;
}
