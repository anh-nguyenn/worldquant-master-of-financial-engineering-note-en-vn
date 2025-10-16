import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";

const contentDirectory = path.join(process.cwd(), "content");

export interface LessonMetadata {
  title: string;
  course: string;
  module: string;
  lesson: string;
  order: number;
}

export interface Lesson {
  slug: string;
  metadata: LessonMetadata;
  content: string;
  htmlContent: string;
}

export interface Module {
  id: string;
  name: string;
  course: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  name: string;
  modules: Module[];
}

export async function getAllCourses(): Promise<Course[]> {
  const courseMap = new Map<string, Course>();

  // Read all module directories
  const moduleDirs = fs
    .readdirSync(contentDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
    .sort();

  for (const moduleDir of moduleDirs) {
    const modulePath = path.join(contentDirectory, moduleDir);
    const lessonFiles = fs
      .readdirSync(modulePath)
      .filter((file) => file.endsWith(".md"))
      .sort();

    const lessons: Lesson[] = [];

    for (const file of lessonFiles) {
      const slug = file.replace(/\.md$/, "");
      const lesson = await getLessonBySlug(moduleDir, slug);
      if (lesson) {
        lessons.push(lesson);
      }
    }

    if (lessons.length > 0) {
      const firstLesson = lessons[0];
      const courseName = firstLesson.metadata.course;
      const moduleName = firstLesson.metadata.module;

      if (!courseMap.has(courseName)) {
        courseMap.set(courseName, {
          id: courseName.toLowerCase().replace(/\s+/g, "-"),
          name: courseName,
          modules: [],
        });
      }

      const course = courseMap.get(courseName)!;
      course.modules.push({
        id: moduleDir,
        name: moduleName,
        course: courseName,
        lessons: lessons.sort((a, b) => a.metadata.order - b.metadata.order),
      });
    }
  }

  // Sort modules within each course
  for (const course of courseMap.values()) {
    course.modules.sort((a, b) => {
      const aNum = parseInt(a.name.replace(/\D/g, ""));
      const bNum = parseInt(b.name.replace(/\D/g, ""));
      return aNum - bNum;
    });
  }

  return Array.from(courseMap.values());
}

export async function getAllModules(): Promise<Module[]> {
  const courses = await getAllCourses();
  return courses.flatMap((course) => course.modules);
}

export async function getLessonBySlug(
  module: string,
  slug: string
): Promise<Lesson | null> {
  try {
    const fullPath = path.join(contentDirectory, module, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Process markdown to HTML
    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkHtml, { sanitize: false })
      .process(content);

    return {
      slug,
      metadata: data as LessonMetadata,
      content,
      htmlContent: processedContent.toString(),
    };
  } catch (error) {
    console.error(`Error reading lesson ${module}/${slug}:`, error);
    return null;
  }
}

export async function getAllLessons(): Promise<Lesson[]> {
  const modules = await getAllModules();
  return modules.flatMap((module) => module.lessons);
}

export function getModuleById(
  modules: Module[],
  id: string
): Module | undefined {
  return modules.find((module) => module.id === id);
}
