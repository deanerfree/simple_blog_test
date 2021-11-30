import { Pagination } from "@mui/material"
import { useContext } from "react"
import BlogContext from "../../context/blogContext"

const PaginationComp = () => {
	const blogContext = useContext(BlogContext)
	const { blogList, currentPage, setCurrentPage } = blogContext

	//To change pages
	const handleChange = (e, value) => {
		console.log(value)
		setCurrentPage(value)
	}
	return (
		<Pagination
			count={
				blogList.length % 10 === 0
					? blogList.length / 10
					: blogList.length / 10 + 1
			}
			page={currentPage}
			onChange={handleChange}
		/>
	)
}
export default PaginationComp
