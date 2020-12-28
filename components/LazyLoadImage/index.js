import { useState, useEffect, useRef } from 'react';
import { LazyContainer, Image, Placeholder } from './styles';

const options = {
  threshold: 0.5,
  rootMargin: '0px 0px 300px 0px',
};

export default function LazyLoadImage({src, width, height}) {
  const itemRef = useRef(null);
  const [showImage, setShowImage] = useState(false);
  const [itemHeight, setItemHeight] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const callback = (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        setShowImage(true);
      });
    };
    const observer = new IntersectionObserver(callback, options);
    
    observer.observe(itemRef.current);
    resizeHandler();
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
      observer.disconnect();
    };
  }, [])

  function resizeHandler() {
    const aspectRatio = width / height;
    const newHeight = itemRef.current.clientWidth / aspectRatio;
    setItemHeight(newHeight);
  }

  return (
    <LazyContainer ref={itemRef}>
      {showImage && 
        <Image 
          src={src} 
          onLoad={() => setLoaded(true)}
          show={loaded}
        />
      }
      <Placeholder
        dataHeight={`${itemHeight}px`}
        hidden={loaded}
      />
    </LazyContainer>
  );
}