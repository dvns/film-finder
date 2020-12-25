import { useState, useEffect } from 'react';

const API_KEY = process.env.NEXT_PUBLIC_FLICKR_API_KEY;

export default function ImageGallery({ queryString }) {
  const [images, setImages] = useState([]);
  const apiUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&text=${queryString.replace(/\s/g, '+')}&sort=relevance&extras=url_z&per_page=25&content_type=1&format=json&nojsoncallback=1`;
  

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch(apiUrl).then((r) => r.json());
      setImages(res.photos.photo);
    };

    fetchImages();
  }, [])

  return (
    <div>
      {images.map((img) => (
        <img
          key={img.id}
          src={img.url_z}
        />
      ))}
    </div>
  );
}