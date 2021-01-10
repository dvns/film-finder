import '../styles/globals.css'
import { ThemeProvider } from "styled-components";
import Theme from "../components/Theme";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={Theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp
