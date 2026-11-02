import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <>
      <a className='skip-link' href='#main-content'>Skip to content</a>
      <Navbar />
      <main id='main-content' tabIndex={-1}>{children}</main>
      <footer className='container site-footer'><p>© {new Date().getFullYear()} Prathibha D</p><p>Built with curiosity. Grounded in data.</p><a href='#hero'>Back to top ↑</a></footer>
    </>
  );
}
