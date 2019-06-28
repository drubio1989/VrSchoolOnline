import React from 'react'
// import InstagramFeed from './InstagramFeed'
import './Footer.css'

export default () => (
  <div>
    <footer className="footer">
      <div className="container taCenter">
        <span>
          © Copyright {new Date().getFullYear()} All rights reserved. Crafted by{' '}
          <a href="https://thriveweb.com.au/">Thrive</a>.
        </span>
        <div>Icons made by <a href="https://www.flaticon.com/authors/itim2101" title="itim2101">itim2101</a> from <a href="https://www.flaticon.com/"                 title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
      </div>
    </footer>
  </div>
)

// Example of using the instagram feed
// <h2 className="taCenter">
//   Follow us{' '}
//   <a href="https://instagram.com/thrivegoldcoast/">@thrivegoldcoast</a>
// </h2>
// <br />
// <InstagramFeed count="8" />
