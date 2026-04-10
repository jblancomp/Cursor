// Course types
export interface Course {
  id: number;
  title: string;
  teacher: string;
  duration: number;
  thumbnail: string;
  slug: string;
}

/** Item returned by GET /courses (Platziflix API contract) */
export interface CourseListItem {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  slug: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isCourseListItem(value: unknown): value is CourseListItem {
  if (!isRecord(value)) return false;
  return (
    typeof value.id === "number" &&
    typeof value.name === "string" &&
    typeof value.description === "string" &&
    typeof value.thumbnail === "string" &&
    typeof value.slug === "string"
  );
}

/** Validates and narrows the JSON body of GET /courses to CourseListItem[]. */
export function parseCoursesResponse(data: unknown): CourseListItem[] {
  if (!Array.isArray(data)) return [];
  return data.filter(isCourseListItem);
}

// class types
export interface Class {
  id: number;
  title: string;
  description: string;
  video: string;
  duration: number;
  slug: string;
}

// course detail type
export interface CourseDetail extends Course {
    description: string;
    classes: Class[];
}

// Progress types
export interface Progress {
progress: number;
user_id: number;
}

// Quiz types
export interface QuizOption {
    id: number;
    answer: string;
    correct: boolean;
}

export interface Quiz {
    id: number;
    question: string;
    options: QuizOption[];
}

// favorite types
export interface FavoriteToggle {
    course_id: number;
}