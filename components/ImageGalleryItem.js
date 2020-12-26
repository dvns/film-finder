import { useState, useEffect, useRef } from 'react';

export default function ImageGalleryItem({image}) {
    const imageRef = useRef(null);
    const [span, setSpan] = useState(0);

    useEffect(() => {
      imageRef.current.addEventListener('load', updateSpan);
      window.addEventListener('resize', updateSpan);
      return () => {
        window.removeEventListener('resize', updateSpan);
      };
    }, [])

    function updateSpan() {
      const height = imageRef.current.clientHeight;
      const span = Math.ceil((height)/ 20);
      setSpan(span);
    }

    return (
      <div className="image-gallery-item" style={{gridRowEnd: `span ${span}` }}>
        <img
          onClick={() => window.open(`https://www.flickr.com/photos/${image.owner}/${image.id}`, '_blank')}
          src={image.url_z}
          ref={imageRef}
        />
      </div>
    )
  }