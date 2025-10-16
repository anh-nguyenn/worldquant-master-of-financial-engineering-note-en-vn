import Link from "next/link";
import { getAllModules } from "@/lib/markdown";

export default async function ModulesPage() {
  const modules = await getAllModules();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            All Learning Modules
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive collection of financial engineering lessons organized
            by modules. Each module contains multiple lessons with bilingual
            content and practical examples.
          </p>
        </header>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {modules.map((module) => (
            <Link
              key={module.id}
              href={`/${module.id}`}
              className="group bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-black transition-all duration-200"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform">
                  {module.id.toUpperCase()}
                </div>
                <h3 className="text-xl font-semibold text-black mb-2 group-hover:text-gray-600 transition-colors">
                  Module {module.id.toUpperCase()}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {module.lessons.length} lesson
                  {module.lessons.length !== 1 ? "s" : ""}
                </p>
                <div className="space-y-2">
                  {module.lessons.slice(0, 3).map((lesson) => (
                    <div
                      key={lesson.slug}
                      className="text-sm text-gray-700 group-hover:text-black transition-colors truncate"
                    >
                      {lesson.metadata.title}
                    </div>
                  ))}
                  {module.lessons.length > 3 && (
                    <p className="text-xs text-gray-500">
                      +{module.lessons.length - 3} more lesson
                      {module.lessons.length - 3 !== 1 ? "s" : ""}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* All Lessons List */}
        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-black mb-6">All Lessons</h2>
          <div className="space-y-4">
            {modules.map((module) => (
              <div key={module.id} className="bg-white rounded-lg p-6">
                <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
                  <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    {module.id.toUpperCase()}
                  </span>
                  Module {module.id.toUpperCase()}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {module.lessons.map((lesson) => (
                    <Link
                      key={lesson.slug}
                      href={`/${module.id}/${lesson.slug}`}
                      className="block p-4 border border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition-all duration-200"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-black hover:text-gray-600 transition-colors">
                            {lesson.metadata.title}
                          </h4>
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
  );
}
