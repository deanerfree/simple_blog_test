import React, { useState, useEffect } from "react"
import axios from "axios"
import BlogContext from "./blogContext"

const BlogState = (props) => {
	const [query, setQuery] = useState("")
	const [blogList, setBlogList] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [isLoading, setIsLoading] = useState(false)
	const [err, setErr] = useState(false)

	const getBlogList = async () => {
		try {
			setIsLoading(true)
			const blogs = await axios.get(
				"https://jsonplaceholder.typicode.com/posts"
				// {
				// 	params: {
				// 		_page: currentPage,
				// 		_limit: 10,
				// 	},
				// }
			)
			if (blogs.status === 200) {
				setBlogList(blogs.data)
				setIsLoading(false)
			}
		} catch (error) {
			console.error(`This is the error: ${error.message}`)
			setErr(true)
		}
	}

	useEffect(() => {
		getBlogList()
		if (err === true) {
			setIsLoading(true)
		}
		// eslint-disable-next-line
	}, [currentPage, err])

	return (
		<BlogContext.Provider
			value={{
				blogList,
				currentPage,
				setCurrentPage,
				getBlogList,
				isLoading,
				err,
				query,
				setQuery,
				setIsLoading,
				setErr,
			}}>
			{props.children}
		</BlogContext.Provider>
	)
}

export default BlogState
