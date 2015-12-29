{
  "title": "Isomorphic Javascript is not the Answer",
  "published": "2015-01-27 19:25",
  "categories": ["Development", "Javscript"],
  "authors": ["Paul Bailey"],
  "image": "/img/posts/isomorphic.jpg"
}

The new hotness lately is Isomorphic Javascript. Isomorphic Javascript basically means you can run the same code on the server as the client (aka the web browser). It was created to solve the problem of single page web apps running slowly. Since Javascript has been growing up, more and more code ends up running in the browser. The problem with this is that client side Javascript ends up increasing load times and thus ruining the initial user experience. There are other problems with client side JS that isomorphic JS solves but this is the main one. So Isomorphic JS renders the initial view on server so when you get the HTML your browser is ready to hit the ground running. All subsequent client side code is run as normal in the browser.

While this sounds good to get the ultimate performance from your web app, isn’t there a better way to speed up client side loads times without having to mix server side and client side code? The separation of frontend and backend in web development makes a really clean separation that I would hate to combine again.

Lets break down the performance problems to investigate. So what takes so long to render when everything is client side? Well first you have to get the HTML, CSS, and JS. Then you have to process the JS and after that call an API which when returned does some template processing and DOM manipulations. If you render server side then you can shorten the API request because you're not making an extra trip to get your data. Also because the the HTML is complete when it comes through, the DOM rendering will probably be a little faster. So all in all the main slow down is from having to request the initial API data because either way you’re rendering HTML somewhere. You can render it on a server with thousands of requests hitting it or a client who may be slower but probably doesn’t have as much a load on it.

So is there a way to fix the initial data load time without creating a new industry for the problem? I think so. You simply create a mapping of what URLs need what API data and map that on your server side. When a request comes in, load that initial data into the HTML returned. Now on the client side, abstract your API so that it checks this initial data set before calling the API itself. With the initial API data loaded into your page, you now only have to process your templates and you’re set. I’ve tried this technique a few times now and it works pretty easily. It gives you more freedom to use different backend tools and the two systems stay loosely coupled.

What do you think? Any better solutions out there? I’m going to try and release some libraries for this in the future so you can easily plug it into your own code.
