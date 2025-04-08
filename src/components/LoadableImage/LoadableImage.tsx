import { useEffect, useRef, useState } from "react";
import styles from "./LoadableImage.module.css";
import cn from "classnames";
import useOnScreen from "../../hooks/useOnScreen";

export interface ILoadableImage {
  src: string;
  alt?: string;
  onLoad?(): void;
  className?: string;
}

const LoadableImage = (props: ILoadableImage) => {
  const { src, alt = "", onLoad = () => {} } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isVisible = useOnScreen(containerRef);

  useEffect(() => {
    if (!isVisible || isLoaded) {
      return;
    }
    if (imageRef.current) {
      imageRef.current.onload = () => {
        setIsLoaded(true);
        onLoad();
      };
    }
  }, [isVisible, onLoad, isLoaded]);

  return (
    <div
      ref={containerRef}
      className={cn(styles.container, {
        [styles.containerLoaded]: isLoaded,
      })}
    >
      {(isVisible || isLoaded) && (
        <img
          ref={imageRef}
          className={cn(styles.image, {
            [styles.imageLoaded]: isLoaded,
          })}
          src={src}
          alt={alt}
        />
      )}
    </div>
  );
};

export default LoadableImage;
