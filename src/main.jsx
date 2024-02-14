import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'
import './index.css'

import { Provider } from 'react-redux';
import store from "./store/store.js";

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { AuthLayout } from "./components/index.js"; // remove js file extension?

import { HomePage, LoginPage, SignUpPage, AllPosts, AddPost, EditPost, Post } from "./pages/index.js";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
			path: "/",
			element: <HomePage />
			},
			{
			path: "/login",
			element: (
				// <AuthLayout authenticated={false}>
					<LoginPage />
				// </AuthLayout>
			)
			},
			{
			  path: "/signup",
			  element: (
			    // <AuthLayout authenticated={false}>
			      <SignUpPage />
			    // </AuthLayout>
			  )
			},
			{
			  path: "/all-posts",
			  element: (
			    <AuthLayout authenticated={true}> {/*once try to put false*/}
			      {/* {" "} */}
			      <AllPosts />
			    </AuthLayout>
			  )
			},
			{
			  path: "/add-post",
			  element: (
			    <AuthLayout authenticated={true} slug = {"/add-post"}>
				   {" "}
				<AddPost />
			    </AuthLayout>
			  )
			},
			{
			  path: "/edit-post/:slug",
			  element: (
			    <AuthLayout authenticated={true}>
			      {" "}
			      <EditPost />
			    </AuthLayout>
			  )
			},
			{
			  path: "/post/:slug",
			  element: <Post />
			}
		]
	}
]);

ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
<Provider store = {store}>
	<RouterProvider router={router} />
</Provider>
</React.StrictMode>,
)
