import { notFound } from "next/navigation";
import {
  getLessonBySlug,
  getAllCourses,
  getAllModules,
  getModuleById,
} from "@/lib/markdown";
import LessonPageContent from "@/components/LessonPageContent";

interface LessonPageProps {
  params: Promise<{
    module: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const modules = await getAllModules();
  const params: { module: string; slug: string }[] = [];

  for (const moduleData of modules) {
    for (const lesson of moduleData.lessons) {
      params.push({
        module: moduleData.id,
        slug: lesson.slug,
      });
    }
  }

  return params;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { module: moduleId, slug } = await params;
  const lesson = await getLessonBySlug(moduleId, slug);
  const courses = await getAllCourses();
  const modules = await getAllModules();
  const currentModule = getModuleById(modules, moduleId);

  // Find the course that contains this module
  const currentCourse = courses.find((course) =>
    course.modules.some((module) => module.id === moduleId)
  );

  if (!lesson || !currentModule) {
    notFound();
  }

  const currentLessonIndex = currentModule.lessons.findIndex(
    (l) => l.slug === slug
  );
  const prevLesson =
    currentLessonIndex > 0
      ? currentModule.lessons[currentLessonIndex - 1]
      : null;
  const nextLesson =
    currentLessonIndex < currentModule.lessons.length - 1
      ? currentModule.lessons[currentLessonIndex + 1]
      : null;

  return (
    <LessonPageContent
      lesson={lesson}
      currentModule={currentModule}
      currentCourse={currentCourse}
      moduleId={moduleId}
      prevLesson={prevLesson}
      nextLesson={nextLesson}
    />
  );
}
