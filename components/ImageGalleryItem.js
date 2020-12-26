import { useState, useEffect, useRef } from 'react';

const options = {
  threshold: 1.0,
  rootMargin: '0px 0px 500px 0px',
};

export default function ImageGalleryItem({img}) {
    const itemRef = useRef(null);
    const [span, setSpan] = useState(0);
    const [showImage, setShowImage] = useState(false);

    useEffect(() => {
      const callback = (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setShowImage(true);
        });
      };
      const observer = new IntersectionObserver(callback, options);
      
      observer.observe(itemRef.current);
      updateSpan();
      window.addEventListener('resize', updateSpan);
      return () => {
        window.removeEventListener('resize', updateSpan);
        observer.disconnect();
      };
    }, [])

    function updateSpan() {
      const aspectRatio = img.width_z / img.height_z;
      const width = itemRef.current.clientWidth;
      const height = width / aspectRatio;
      const span = Math.ceil(height/ 20);
      setSpan(span);
    }

    return (
      <div
        ref={itemRef}
        className="image-gallery-item"
        style={{ gridRowEnd: `span ${span}` }}
      >
        {showImage ? (
          <img
            onClick={() =>
              window.open(
                `https://www.flickr.com/photos/${img.owner}/${img.id}`,
                "_blank"
              )
            }
            src={img.url_z}
          />
        ) : (
          <div className="image-gallery-item-placeholder"></div>
        )}
      </div>
    );
  }