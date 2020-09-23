import React from 'react';
import Router from 'next/router'
import { createBrowserHistory } from "history";
import Link from 'next/link'

function App() {
  return (
    <div>
		Welcome to Next.js!
		<p>This index page</p>
		<button onClick={() => Router.push({pathname : '/second', query : {name : 'foo', last : 'bar'}})}>
			Go to Posts
		</button>
		<br/>
		<Link href="/second">
			<a>Second page</a>
		</Link>
	</div>
  );
}

export default App;
