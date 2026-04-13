import styles from "./Course.module.scss";
import { Course as CourseType } from "@/types";

type CourseProps = Omit<CourseType, "slug">;

export const Course = ({ title, teacher, duration, thumbnail }: CourseProps) => {
  return (
    <article className={styles.courseCard}>
      <div className={styles.thumbnailContainer}>
        <img src={thumbnail} alt={title} className={styles.thumbnail} />
      </div>
      <div className={styles.courseInfo}>
        <h2 className={styles.courseTitle}>{title}</h2>
        <p className={styles.teacher}>Profesor: {teacher}</p>
        <p className={styles.duration}>Duración: {duration} minutos</p>
      </div>
    </article>
  );
};