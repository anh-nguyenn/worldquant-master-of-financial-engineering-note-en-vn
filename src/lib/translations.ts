import { Language } from "@/contexts/LanguageContext";

export const translations = {
  en: {
    home: "Home",
    courses: "Courses",
    exploreCourses: "Explore Courses",
    viewAllLessons: "View All Lessons",
    learningCourses: "Learning Courses",
    modules: "modules with comprehensive lessons",
    lesson: "lesson",
    lessons: "lessons",
    whyChooseThisLearningJournal: "Why Choose This Learning Journal?",
    bilingualContent: "Bilingual Content",
    bilingualContentDesc:
      "Learn in both English and Vietnamese with comprehensive translations and explanations.",
    realWorldExamples: "Real-world Examples",
    realWorldExamplesDesc:
      "Practical case studies and examples that connect theory to real financial scenarios.",
    scalableStructure: "Scalable Structure",
    scalableStructureDesc:
      "Easy to add new modules and lessons with a clean, organized content structure.",
    previous: "Previous",
    next: "Next",
    backTo: "Back to",
    yourMasterOfFinancialEngineeringNote:
      "Your Master of Financial Engineering Note",
    comprehensiveBilingualLearningJournal:
      "A comprehensive bilingual learning journal covering fundamental concepts to advanced financial engineering topics. Learn in both English and Vietnamese.",
  },
  vi: {
    home: "Trang chủ",
    courses: "Khóa học",
    exploreCourses: "Khám phá khóa học",
    viewAllLessons: "Xem tất cả bài học",
    learningCourses: "Khóa học học tập",
    modules: "mô-đun với các bài học toàn diện",
    lesson: "bài học",
    lessons: "bài học",
    whyChooseThisLearningJournal: "Tại sao chọn tạp chí học tập này?",
    bilingualContent: "Nội dung song ngữ",
    bilingualContentDesc:
      "Học bằng cả tiếng Anh và tiếng Việt với các bản dịch và giải thích toàn diện.",
    realWorldExamples: "Ví dụ thực tế",
    realWorldExamplesDesc:
      "Các nghiên cứu tình huống và ví dụ thực tế kết nối lý thuyết với các tình huống tài chính thực tế.",
    scalableStructure: "Cấu trúc có thể mở rộng",
    scalableStructureDesc:
      "Dễ dàng thêm mô-đun và bài học mới với cấu trúc nội dung sạch, có tổ chức.",
    previous: "Trước",
    next: "Tiếp theo",
    backTo: "Quay lại",
    yourMasterOfFinancialEngineeringNote:
      "Ghi chú Thạc sĩ Kỹ thuật Tài chính của bạn",
    comprehensiveBilingualLearningJournal:
      "Một tạp chí học tập song ngữ toàn diện bao gồm các khái niệm cơ bản đến các chủ đề kỹ thuật tài chính nâng cao. Học bằng cả tiếng Anh và tiếng Việt.",
  },
};

export function getTranslation(
  key: keyof typeof translations.en,
  language: Language
): string {
  return translations[language][key];
}
