import * as React from "react";
import {Link} from 'react-router'
import GeneratePdf from "./actions/generate-pdf";

class Navigation extends React.Component {
  render() {
    const navs = [
      { url: '/', name: 'Home' },
      { url: '/test', name: 'Test application' },
      { url: '/list', name: 'List Application' },
      { url: '/singlevalue', name: 'Single Value' },
      { url: '/resize', name: 'Resize' },
      { url: '/block', name: 'Block' },
      { url: '/flex', name: 'FlexBox' },
    ];
    return(
      <div className="navigation">
        { navs.map((nav, key) => (
          <span key={key}><Link to={nav.url}>{nav.name}</Link> | </span>
        )) }
        <div className='actions-bar'>
          <GeneratePdf/>
        </div>
      </div>
    )
  }
}

export default Navigation;