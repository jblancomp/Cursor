import { parseCoursesResponse, type CourseListItem } from "@/types";

const DEFAULT_API_BASE = "http://localhost:8000";

function normalizeBaseUrl(base: string): string {
  return base.replace(/\/$/, "");
}

export async function fetchCoursesList(
  baseUrl: string = process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_BASE
): Promise<CourseListItem[]> {
  const url = `${normalizeBaseUrl(baseUrl)}/courses`;
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error(
      `No se pudieron cargar los cursos (${res.status} ${res.statusText})`
    );
  }

  const json: unknown = await res.json();
  return parseCoursesResponse(json);
}
