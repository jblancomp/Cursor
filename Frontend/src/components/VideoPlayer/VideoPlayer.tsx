import { FC } from "react";
import styles from "./VideoPlayer.module.scss";

export interface VideoPlayerProps {
  src: string;
  title: string;
}

export const VideoPlayer: FC<VideoPlayerProps> = ({ src, title }) => {
  const isYoutube = src.includes("youtube.com");

  return (
    <div className={styles.videoPlayer}>
      <h2>{title}</h2>

      {isYoutube ? (
        <iframe
          className={styles.video}
          src={src}
          title={title}
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      ) : (
        <video key={src} controls className={styles.video}>
          <source src={src} type="video/mp4" />
        </video>
      )}
    </div>
  );
};