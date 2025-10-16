"use client";

import Link from "next/link";
import { Course } from "@/lib/markdown";
import { useTranslations } from "@/hooks/useTranslations";

interface HomePageContentProps {
  courses: Course[];
}

export default function HomePageContent({ courses }: HomePageContentProps) {
  const { t } = useTranslations();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-6">
            {t("yourMasterOfFinancialEngineeringNote")}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t("comprehensiveBilingualLearningJournal")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#courses"
              className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              {t("exploreCourses")}
            </Link>
            <Link
              href="/courses"
              className="border border-gray-300 text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              {t("viewAllLessons")}
            </Link>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-black mb-12">
            {t("learningCourses")}
          </h2>
          <div className="space-y-12">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-8"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-black mb-2">
                    {course.name}
                  </h3>
                  <p className="text-gray-600">
                    {course.modules.length} {t("modules")}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {course.modules.map((module) => (
                    <Link
                      key={module.id}
                      href={`/${module.id}`}
                      className="group bg-gray-50 rounded-lg p-6 hover:bg-black hover:text-white transition-all duration-200"
                    >
                      <div className="text-center">
                        <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-3 group-hover:bg-white group-hover:text-black transition-colors">
                          {module.name.replace(/\D/g, "")}
                        </div>
                        <h4 className="font-semibold mb-2 group-hover:text-white">
                          {module.name}
                        </h4>
                        <p className="text-sm text-gray-600 group-hover:text-gray-200">
                          {module.lessons.length}{" "}
                          {module.lessons.length !== 1
                            ? t("lessons")
                            : t("lesson")}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-black mb-12">
            {t("whyChooseThisLearningJournal")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">
                {t("bilingualContent")}
              </h3>
              <p className="text-gray-600">{t("bilingualContentDesc")}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">
                {t("realWorldExamples")}
              </h3>
              <p className="text-gray-600">{t("realWorldExamplesDesc")}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">
                {t("scalableStructure")}
              </h3>
              <p className="text-gray-600">{t("scalableStructureDesc")}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
