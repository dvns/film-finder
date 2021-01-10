import { useState, useEffect } from 'react'
import { fetchContent } from '../../utils/contentfulHelpers';
import LazyLoadImage from '../../components/LazyLoadImage';
import Masonry from '../../components/Masonry';

const API_KEY = process.env.NEXT_PUBLIC_FLICKR_API_KEY;
const sort = 'interestingness-desc';
const perPage = 100;
const getDate = (months) => {
  let d = new Date();
  d.setMonth(d.getMonth() - months);
  return d.getTime() / 1000;
};
const minDate = getDate(2);
const maxDate = getDate(1);
const extras = 'url_z';

export default function Film({ film }) {
  const [images, setImages] = useState([]);
  const apiUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&text=${film.flickrQuery.replace(/\s/g, '+')}&sort=${sort}&extras=${extras}&min_upload_date=${minDate}&max_upload_date=${maxDate}&per_page=${perPage}&content_type=1&format=json&nojsoncallback=1`;
  const fetchImages = async () => {
    const res = await fetch(apiUrl).then((r) => r.json());
    setImages(res.photos.photo);
  };
  
  useEffect(() => {
    fetchImages();
  }, [])


  return (
    <div>
      {/* {film.brand.name} {film.name} */}
      <Masonry gap="10px">
        {images.map((image) => (
          <LazyLoadImage
            key={image.id}
            src={image.url_z}
            width={image.width_z}
            height={image.height_z}
          />
        ))}
      </Masonry>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const response = await fetchContent(`
    {
      filmCollection(where: {slug: "${params.slug}"}, limit: 1) {
        items {
          slug
          name
          brand {
            name
          }
          iso
          type
          format
          flickrQuery
        }
      }
    }
  `);

  const film = response.filmCollection.items[0];

  return {
    props: {
      film,
    }
  }
}

export async function getStaticPaths() {
  const response = await fetchContent(`
    {
      filmCollection {
        items {
          slug
        }
      }
    }
  `);

  const films = response.filmCollection.items;

  const paths = films.map((film) => ({
    params: { slug: film.slug },
  }));

  return { paths, fallback: false };
}