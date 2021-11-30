import { useContext } from "react"
import BlogContext from "../../context/blogContext"
import { CardContent, TextField, FormControl } from "@mui/material"

const Search = () => {
	const blogContext = useContext(BlogContext)
	const { setQuery } = blogContext

	return (
		<CardContent
			style={{
				margin: "20px",
				padding: "20px",
				borderBottom: "solid 1px #444",
			}}>
			<FormControl>
				<TextField
					label='Search'
					type='text'
					placeholder='Search Blogs'
					onChange={(e) => setQuery(e.target.value)}
				/>
			</FormControl>
		</CardContent>
	)
}

export default Search
