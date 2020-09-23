import Link from 'next/link';
import ReactGA from 'react-ga'

const linkStyle = {
  marginRight: 15
};

const Header = () => (
  <div>
    <ReactGA.OutboundLink
      eventLabel="Home"
      to="/"
      trackerNames={['Home']}>
        <span style={linkStyle}>Home</span>
      </ReactGA.OutboundLink>
      <ReactGA.OutboundLink
      eventLabel="About"
      to="/about"
      trackerNames={['about']}>
        <span style={linkStyle}>About</span>
      </ReactGA.OutboundLink>
    {/* <Link href="/">
       <a style={linkStyle}>Home</a>
    </Link>
    <Link href="/about">
      <a style={linkStyle}>About</a>
    </Link> */}
  </div>
);

export default Header;
