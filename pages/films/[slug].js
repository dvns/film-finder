import { fetchContent } from '../../utils/contentfulHelpers';
import ImageGallery from '../../components/ImageGallery';

export default function Film({ film }) {
  return (
    <div>
      {/* {film.brand.name} {film.name} */}
      <ImageGallery queryString={film.flickrQuery}></ImageGallery>
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