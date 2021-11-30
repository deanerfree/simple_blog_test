import { Pagination } from "@mui/material"
import { useContext } from "react"
import BlogContext from "../../context/blogContext"

const PaginationComp = ({ ...props }) => {
	const { data } = props
	const blogContext = useContext(BlogContext)
	const { currentPage, setCurrentPage } = blogContext

	//To change pages
	const handleChange = (e, value) => {
		console.log(value)
		setCurrentPage(value)
	}
	return (
		<Pagination
			count={
				data.length % 10 === 0
					? Math.floor(data.length / 10)
					: Math.floor(data.length / 10 + 1)
			}
			page={currentPage}
			onChange={handleChange}
		/>
	)
}
export default PaginationComp
