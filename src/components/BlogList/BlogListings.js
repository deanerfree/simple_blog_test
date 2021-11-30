import { useContext, useState, useEffect } from "react"
import { Box } from "@mui/material"
// import axios from "axios"
import Search from "./Search"
import PaginationComp from "./PaginationComp"
import { Spinner } from "../../svg"
import BlogItem from "./BlogItem"
import BlogContext from "../../context/blogContext"

const BlogListings = () => {
	const [filteredArray, setFilteredArray] = useState([])
	const blogContext = useContext(BlogContext)
	const { blogList, currentPage, isLoading, query } = blogContext

	const filterData = (array, query) => {
		console.log("Before filter", array.length)
		const filteredArray = array.filter((val) => {
			if (query === "") {
				return val
			}
			console.log(query)
			return val.title.toLowerCase().includes(query.toLowerCase())
		})
		console.log("After filter", filteredArray.length)
		return filteredArray
	}

	useEffect(() => {
		setFilteredArray(blogList)
		if (query === "") {
			setFilteredArray(blogList)
		}
		console.log("query updated")
		let updatedData = filterData(blogList, query)
		console.log(updatedData)
		setFilteredArray(updatedData)
	}, [query, blogList])

	return (
		<Box>
			<Search />
			{isLoading ? (
				<Box className='LoadingContent'>
					<Spinner />
				</Box>
			) : (
				<Box className='ListContainer'>
					{filteredArray.length !== 0
						? filteredArray
								.slice((currentPage - 1) * 10, currentPage * 10)
								.map((blog) => <BlogItem blog={blog} key={blog.id} />)
						: blogList
								.slice((currentPage - 1) * 10, currentPage * 10)
								.map((blog) => <BlogItem blog={blog} key={blog.id} />)}

					<PaginationComp data={filteredArray} />
				</Box>
			)}
		</Box>
	)
}

export default BlogListings
