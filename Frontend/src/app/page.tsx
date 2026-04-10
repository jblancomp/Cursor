import styles from "./page.module.scss";
import { fetchCoursesList } from "@/lib/fetchCourses";

export default async function Home() {
  let errorMessage: string | null = null;
  let courses: Awaited<ReturnType<typeof fetchCoursesList>> = [];

  try {
    courses = await fetchCoursesList();
  } catch (err) {
    errorMessage =
      err instanceof Error ? err.message : "Error al cargar los cursos.";
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>MP Sistemas</h1>
        <p className={styles.subtitle}>Catálogo de cursos</p>
      </header>

      <main className={styles.main}>
        {errorMessage ? (
          <p className={styles.error} role="alert">
            {errorMessage}
          </p>
        ) : courses.length === 0 ? (
          <p className={styles.empty}>No hay cursos disponibles.</p>
        ) : (
          <ul className={styles.grid}>
            {courses.map((course) => (
              <li key={course.id}>
                <article className={styles.card}>
                  <div className={styles.cardImageWrap}>
                    {/* eslint-disable-next-line @next/next/no-img-element -- API thumbnails; arbitrary origins */}
                    <img
                      className={styles.cardImage}
                      src={course.thumbnail}
                      alt=""
                    />
                  </div>
                  <div className={styles.cardBody}>
                    <h2 className={styles.cardTitle}>{course.name}</h2>
                    <p className={styles.cardDescription}>
                      {course.description}
                    </p>
                    <p className={styles.cardMeta}>{course.slug}</p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
