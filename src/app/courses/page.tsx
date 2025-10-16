import Link from "next/link";
import { getAllCourses } from "@/lib/markdown";

export default async function CoursesPage() {
  const courses = await getAllCourses();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            All Learning Courses
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive collection of financial engineering courses organized
            by subject areas. Each course contains multiple modules with
            bilingual content and practical examples.
          </p>
        </header>

        {/* Courses Grid */}
        <div className="space-y-12">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <div className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-black mb-2">
                    {course.name}
                  </h2>
                  <p className="text-gray-600">
                    {course.modules.length} modules with comprehensive lessons
                  </p>
                </div>

                {/* Modules Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {course.modules.map((module) => (
                    <Link
                      key={module.id}
                      href={`/${module.id}`}
                      className="group bg-gray-50 rounded-lg p-6 hover:bg-black hover:text-white transition-all duration-200"
                    >
                      <div className="text-center">
                        <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 group-hover:bg-white group-hover:text-black transition-colors">
                          {module.name.replace(/\D/g, "")}
                        </div>
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-white">
                          {module.name}
                        </h3>
                        <p className="text-sm text-gray-600 group-hover:text-gray-200">
                          {module.lessons.length} lesson
                          {module.lessons.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* All Lessons List */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-black mb-4">
                    All Lessons in {course.name}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {course.modules.map((module) => (
                      <div key={module.id} className="bg-white rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-black mb-3 flex items-center">
                          <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                            {module.name.replace(/\D/g, "")}
                          </span>
                          {module.name}
                        </h4>
                        <div className="space-y-2">
                          {module.lessons.map((lesson) => (
                            <Link
                              key={lesson.slug}
                              href={`/${module.id}/${lesson.slug}`}
                              className="block p-3 border border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition-all duration-200"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h5 className="font-medium text-black hover:text-gray-600 transition-colors">
                                    {lesson.metadata.title}
                                  </h5>
                                  <p className="text-sm text-gray-500 mt-1">
                                    Lesson {lesson.metadata.lesson}
                                  </p>
                                </div>
                                <svg
                                  className="w-4 h-4 text-gray-400 ml-2 flex-shrink-0"
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
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
