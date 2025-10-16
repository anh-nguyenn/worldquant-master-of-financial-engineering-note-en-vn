"use client";

import Link from "next/link";
import { Lesson, Module, Course } from "@/lib/markdown";
import LanguageContent from "./LanguageContent";
import { useTranslations } from "@/hooks/useTranslations";

interface LessonPageContentProps {
  lesson: Lesson;
  currentModule: Module;
  currentCourse?: Course;
  moduleId: string;
  prevLesson: Lesson | null;
  nextLesson: Lesson | null;
}

export default function LessonPageContent({
  lesson,
  currentModule,
  currentCourse,
  moduleId,
  prevLesson,
  nextLesson,
}: LessonPageContentProps) {
  const { t } = useTranslations();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-black transition-colors">
                {t("home")}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                href="/courses"
                className="hover:text-black transition-colors"
              >
                {t("courses")}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                href={`/${moduleId}`}
                className="hover:text-black transition-colors"
              >
                {currentModule.name}
              </Link>
            </li>
            <li>/</li>
            <li className="text-black font-medium">{lesson.metadata.title}</li>
          </ol>
        </nav>

        {/* Lesson Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
            {lesson.metadata.title}
          </h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">
              {currentCourse?.name}
            </span>
            <span className="bg-black text-white px-3 py-1 rounded-full font-medium">
              {lesson.metadata.module}
            </span>
            <span>
              {t("lesson")} {lesson.metadata.lesson}
            </span>
          </div>
        </header>

        {/* Lesson Content */}
        <article className="prose prose-lg max-w-none">
          <LanguageContent
            markdownContent={lesson.content}
            title={lesson.metadata.title}
          />
        </article>

        {/* Navigation */}
        <nav className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              {prevLesson && (
                <Link
                  href={`/${moduleId}/${prevLesson.slug}`}
                  className="group flex items-center space-x-2 text-black hover:text-gray-600 transition-colors"
                >
                  <svg
                    className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500">{t("previous")}</p>
                    <p className="font-medium">{prevLesson.metadata.title}</p>
                  </div>
                </Link>
              )}
            </div>

            <div className="flex-1 text-center">
              <Link
                href={`/${moduleId}`}
                className="text-gray-600 hover:text-black transition-colors font-medium"
              >
                {t("backTo")} {moduleId.toUpperCase()}
              </Link>
            </div>

            <div className="flex-1 text-right">
              {nextLesson && (
                <Link
                  href={`/${moduleId}/${nextLesson.slug}`}
                  className="group flex items-center justify-end space-x-2 text-black hover:text-gray-600 transition-colors"
                >
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{t("next")}</p>
                    <p className="font-medium">{nextLesson.metadata.title}</p>
                  </div>
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
