import '../styles/globals.css'
import Nav from '../componanat/Nav.js'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
