"use client";

import Link from "next/link";
import { useState } from "react";
import { Course } from "@/lib/markdown";
import LanguageToggle from "./LanguageToggle";
import { useTranslations } from "@/hooks/useTranslations";

interface NavigationProps {
  courses: Course[];
}

export default function Navigation({ courses }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslations();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-xl font-bold text-black">
              {t("yourMasterOfFinancialEngineeringNote")}
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                href="/"
                className="text-black hover:text-gray-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {t("home")}
              </Link>
              {courses.map((course) => (
                <div key={course.id} className="relative group">
                  <button className="text-black hover:text-gray-600 px-3 py-2 text-sm font-medium transition-colors flex items-center">
                    {course.name}
                    <svg
                      className="ml-1 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div className="absolute left-0 mt-2 w-80 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        {course.name}
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {course.modules.map((module) => (
                          <Link
                            key={module.id}
                            href={`/${module.id}`}
                            className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-black transition-colors rounded"
                          >
                            {module.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <LanguageToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-black hover:text-gray-600 p-2"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              <Link
                href="/"
                className="text-black hover:text-gray-600 block px-3 py-2 text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {t("home")}
              </Link>
              {courses.map((course) => (
                <div key={course.id} className="space-y-1">
                  <div className="text-gray-500 px-3 py-2 text-sm font-semibold uppercase tracking-wider">
                    {course.name}
                  </div>
                  {course.modules.map((module) => (
                    <Link
                      key={module.id}
                      href={`/${module.id}`}
                      className="text-gray-700 hover:text-black block px-6 py-2 text-sm"
                      onClick={() => setIsOpen(false)}
                    >
                      {module.name}
                    </Link>
                  ))}
                </div>
              ))}
              <div className="px-3 py-2">
                <LanguageToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
