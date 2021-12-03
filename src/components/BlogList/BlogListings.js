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
	const { blogList, currentPage, filterData, isLoading, query } = blogContext

	useEffect(() => {
		//Need to prep the data for the full list

		setFilteredArray(blogList)
		//  If query is blank setFilteredArray to original
		if (query === "") {
			setFilteredArray(blogList)
		}

		// Filter the array based on query data
		let updatedData = filterData(blogList, query)

		if (query && filteredArray.length === 0) {
			setFilteredArray(updatedData)
		}
		setFilteredArray(updatedData)
		// eslint-disable-next-line
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
						: query
						? filteredArray
								.slice((currentPage - 1) * 10, currentPage * 10)
								.map((blog) => <BlogItem blog={blog} key={blog.id} />)
						: blogList
								.slice((currentPage - 1) * 10, currentPage * 10)
								.map((blog) => <BlogItem blog={blog} key={blog.id} />)}

					<PaginationComp
						data={
							filteredArray.length !== 0
								? filteredArray
								: query
								? filteredArray
								: blogList
						}
					/>
				</Box>
			)}
		</Box>
	)
}

export default BlogListings
