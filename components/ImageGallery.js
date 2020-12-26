import { useState, useEffect } from 'react';
import ImageGalleryItem from './ImageGalleryItem';

const API_KEY = process.env.NEXT_PUBLIC_FLICKR_API_KEY;
const sort = 'interestingness-desc';
const perPage = 100;
const getDate = (months) => {
  let d = new Date();
  d.setMonth(d.getMonth() - months);
  return d.getTime() / 1000;
};
const minDate = getDate(12);
const maxDate = getDate(1);
const extras = 'url_z';


export default function ImageGallery({ queryString }) {
  const [images, setImages] = useState([]);
  const apiUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&text=${queryString.replace(/\s/g, '+')}&sort=${sort}&extras=${extras}&min_upload_date=${minDate}&max_upload_date=${maxDate}&per_page=${perPage}&content_type=1&format=json&nojsoncallback=1`;
  const fetchImages = async () => {
    const res = await fetch(apiUrl).then((r) => r.json());
    setImages(res.photos.photo);
  };
  
  useEffect(() => {
    fetchImages();
  }, [])

  return (
    <div className="image-gallery">
      {images.map((image) => (
        <ImageGalleryItem key={image.id} img={image} />
      ))}
    </div>
  );
}