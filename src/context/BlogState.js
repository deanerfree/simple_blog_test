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
				const modData = makeBlogValueSearchable(blogs.data)
				setBlogList(modData)
				setIsLoading(false)
			}
		} catch (error) {
			console.error(`This is the error: ${error.message}`)
			setErr(true)
		}
	}

	const makeBlogValueSearchable = (data) => {
		return data.map((item) => {
			const concatValue = `Blog Post ${item.id}: `
			item.title = concatValue.concat(item.title)
			return item
		})
	}

	const filterData = (array, query) => {
		const filteredArray = array.filter((val) => {
			if (query === "") {
				return val
			}

			return val.title.toLowerCase().includes(query.toLowerCase())
		})

		return filteredArray
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
				setBlogList,
				currentPage,
				setCurrentPage,
				filterData,
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
