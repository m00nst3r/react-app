import * as React from "react";
import './FlexComponent.css'

class FlexComponent extends React.Component {
  render() {
    return(
      <div className="wrapper">
        <header className="header">Header</header>
        <article className="main">
          <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
        </article>
        <aside className="aside aside-1">Aside 1</aside>
        <aside className="aside aside-2">Aside 2</aside>
        <footer className="footer">Footer</footer>
      </div>
    )
  }
}

export default FlexComponent;