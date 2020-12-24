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