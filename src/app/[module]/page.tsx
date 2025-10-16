import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllCourses, getAllModules, getModuleById } from "@/lib/markdown";

interface ModulePageProps {
  params: Promise<{
    module: string;
  }>;
}

export async function generateStaticParams() {
  const modules = await getAllModules();
  return modules.map((moduleData) => ({
    module: moduleData.id,
  }));
}

export default async function ModulePage({ params }: ModulePageProps) {
  const { module: moduleId } = await params;
  const courses = await getAllCourses();
  const modules = await getAllModules();
  const currentModule = getModuleById(modules, moduleId);

  // Find the course that contains this module
  const currentCourse = courses.find((course) =>
    course.modules.some((module) => module.id === moduleId)
  );

  if (!currentModule) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-black transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                href="/courses"
                className="hover:text-black transition-colors"
              >
                Courses
              </Link>
            </li>
            <li>/</li>
            <li className="text-black font-medium">{currentCourse?.name}</li>
            <li>/</li>
            <li className="text-black font-medium">{currentModule.name}</li>
          </ol>
        </nav>

        {/* Module Header */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-black text-white rounded-full text-3xl font-bold mb-6">
            {currentModule.name.replace(/\D/g, "")}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-2">
            {currentModule.name}
          </h1>
          <p className="text-lg text-gray-600 mb-4">{currentCourse?.name}</p>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore {currentModule.lessons.length} comprehensive lesson
            {currentModule.lessons.length !== 1 ? "s" : ""}
            covering essential financial engineering concepts with bilingual
            content and real-world examples.
          </p>
        </header>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentModule.lessons.map((lesson) => (
            <Link
              key={lesson.slug}
              href={`/${moduleId}/${lesson.slug}`}
              className="group bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-black transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {lesson.metadata.lesson}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black group-hover:text-gray-600 transition-colors">
                      {lesson.metadata.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Lesson {lesson.metadata.lesson}
                    </p>
                  </div>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all"
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

              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <svg
                    className="w-4 h-4"
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
                  <span>Bilingual Content</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <svg
                    className="w-4 h-4"
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
                  <span>Real-world Examples</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <svg
                    className="w-4 h-4"
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
                  <span>Interactive Learning</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Module Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors"
            >
              <svg
                className="w-5 h-5"
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
              <span>Back to Home</span>
            </Link>

            <div className="text-center">
              <p className="text-sm text-gray-500">
                {currentModule.lessons.length} lesson
                {currentModule.lessons.length !== 1 ? "s" : ""} in this module
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-500">
                Start with the first lesson
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
