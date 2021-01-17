import { useState, useEffect } from "react";
import styled from "styled-components";
import { fetchContent, fetchFilms } from "../../utils/contentfulHelpers";
import LazyLoadImage from "../../components/LazyLoadImage";
import Masonry from "../../components/Masonry";
import SearchHeader from "../../components/SearchHeader";

const API_KEY = process.env.NEXT_PUBLIC_FLICKR_API_KEY;
const sort = "interestingness-desc";
const perPage = 100;
const getDate = (months) => {
  let d = new Date();
  d.setMonth(d.getMonth() - months);
  return d.getTime() / 1000;
};
const minDate = getDate(2);
const maxDate = getDate(1);
const extras = "url_z";

const InnerWrapper = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const GalleryHeader = styled.div`
  margin-block-start: 1em;
  margin-block-end: 1em;
  h3 {
    font-size: 20px;
    margin: 0;
    color: ${(props) => props.theme.brandPrimary};
  }

  h1 {
    font-size: 36px;
    margin: 0;
    color: ${(props) => props.theme.brandPrimary};
  }
`;

export default function Film({ film, films }) {
  const [images, setImages] = useState([]);
  const [headerHeight, setHeaderHeight] = useState(0);
  
  const apiUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&text=${film.flickrQuery.replace(
    /\s/g,
    "+"
  )}&sort=${sort}&extras=${extras}&min_upload_date=${minDate}&max_upload_date=${maxDate}&per_page=${perPage}&content_type=1&format=json&nojsoncallback=1`;
  const fetchImages = async () => {
    console.log('fetch');
    const res = await fetch(apiUrl).then((r) => r.json());
    setImages(res.photos.photo);
  };

  useEffect(() => {
    fetchImages();
  }, [film]);

  return (
    <div>
      <SearchHeader onHeightChange={(h) => setHeaderHeight(h)} films={films} />
      <InnerWrapper style={{ marginTop: headerHeight }}>
        <GalleryHeader>
          <h3>Shot with</h3>
          <h1>
            {film.brand.name} {film.name}
          </h1>
        </GalleryHeader>
      </InnerWrapper>
      <InnerWrapper>
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
      </InnerWrapper>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const films = await fetchFilms();
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
      films,
      film,
    },
  };
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