import { useContext } from "react"
import { Box } from "@mui/material"
// import axios from "axios"
import Search from "./Search"
import PaginationComp from "./PaginationComp"
import { Spinner } from "../../svg"
import BlogItem from "./BlogItem"
import BlogContext from "../../context/blogContext"

const BlogListings = () => {
	const blogContext = useContext(BlogContext)
	const { blogList, currentPage, isLoading, query } = blogContext

	return (
		<Box>
			<Search blogList={blogList} />
			{isLoading ? (
				<Box className='LoadingContent'>
					<Spinner />
				</Box>
			) : (
				<Box className='ListContainer'>
					{blogList
						.slice((currentPage - 1) * 10, currentPage * 10)
						.filter((val) => {
							if (query === "") {
								return val
							}
							return val.title.toLowerCase().includes(query.toLowerCase())
						})
						.map((blog) => (
							<BlogItem blog={blog} key={blog.id} />
						))}

					<PaginationComp
						data={blogList
							.slice((currentPage - 1) * 10, currentPage * 10)
							.filter((val) => {
								if (query === "") {
									return val
								}
								return val.title.toLowerCase().includes(query.toLowerCase())
							})}
					/>
				</Box>
			)}
		</Box>
	)
}

export default BlogListings
