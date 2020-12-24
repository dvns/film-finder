import Prismic from 'prismic-javascript';
import {
  API_URL,
  API_TOKEN,
} from 'prismic-configuration';

// Client method to query documents from the Prismic repo
export const Client = (req = null) =>
  Prismic.client(API_URL, createClientOptions(req, API_TOKEN));

const createClientOptions = (req = null, prismicAccessToken = null) => {
  const reqOption = req ? { req } : {};
  const accessTokenOption = prismicAccessToken
    ? { accessToken: prismicAccessToken }
    : {};
  return {
    ...reqOption,
    ...accessTokenOption,
  };
};

export const getAllFilms = async () => {
  const client = Client();
  const res = await client.query(
    Prismic.Predicates.at('document.type', 'film_stock')
  );
  const films = res.results;
  return films;
}

export const getFilmByUID = async (uid) => {
  const client = Client();
  const res = await client.getByUID('film_stock', uid);
  return res;
}