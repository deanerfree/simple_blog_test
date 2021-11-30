import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import BlogListings from "./components/BlogList/BlogListings"
import BlogPost from "./components/Posts/BlogPost"
import BlogState from "./context/BlogState"

function App() {
	return (
		<BlogState>
			<BrowserRouter>
				<Routes>
					<Route exact path='/' element={<BlogListings />} />
					<Route path='/post/:id' element={<BlogPost />} />
				</Routes>
			</BrowserRouter>
		</BlogState>
	)
}

export default App
