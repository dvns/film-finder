import "../styles/globals.css";
import styled, { ThemeProvider } from "styled-components";
import Theme from "../components/Theme";

const date = new Date();

const AppFooter = styled.footer`
  margin-top: 50px;
  background: ${(props) => props.theme.brandPrimary};

  h1 {
    color: white;
    line-height: 0.9;
    margin-top: 0;
  }

  p {
    font-size: 12px;
    color: white;
  }

  a {
    text-decoration: underline;
  }
`;

const InnerWrapper = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 20px;
`;

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={Theme}>
      <Component {...pageProps} />
      <AppFooter>
        <InnerWrapper>
          <h1>
            FILM<br></br>STOCK<br></br>FRIDAY
          </h1>
          <p>
            Photos retrieved using the{" "}
            <a href="https://www.flickr.com/services/api/" target="_blank">
              Flickr API
            </a>
          </p>
          <p>
            Made by{" "}
            <a href="https://davinsuen.com" target="_blank">
              Davin Suen
            </a>
          </p>
          <p>© {date.getFullYear()} Film Stock Friday</p>
        </InnerWrapper>
      </AppFooter>
    </ThemeProvider>
  );
}

export default MyApp;
