const SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

export async function fetchContent(query) {
  try {
    const res = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
        body: JSON.stringify({ query }),
      }
    );
    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error(`There was a problem retrieving entries with the query ${query}`);
    console.error(error);
  }
}

export async function fetchFilms() {
  const response = await fetchContent(`
    {
      filmCollection {
        items {
          slug
          name
          brand {
            name
            backgroundColor
          }
          iso
          type
          format
          image {
            title
            url
          }
          flickrQuery
          promote
        }
      }
    }
  `);

  const films = response.filmCollection.items;

  films.sort((a, b) => {
    const nameA = (a.brand.name + " " + a.name).toLowerCase();
    const nameB = (b.brand.name + " " + b.name).toLowerCase();
    if (nameA < nameB) {
      return -1;
    } else if (nameB > nameA) {
      return 1;
    } else {
      return 0;
    }
  });

  return films;
}