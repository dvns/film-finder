import { getAllFilms, getFilmByUID } from '../../utils/prismicHelpers';

export default function Film({ film }) {
  return (
    <div>
      {film.data.name}
    </div>
  )
}

export async function getStaticProps({ params }) {
  const film = await getFilmByUID(params.uid);

  return {
    props: {
      film,
    }
  }
}

export async function getStaticPaths() {
  const films = await getAllFilms();

  const paths = films.map((film) => ({
    params: { uid: film.uid },
  }));

  return { paths, fallback: false };
}