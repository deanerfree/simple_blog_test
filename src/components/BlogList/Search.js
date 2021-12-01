import { useContext } from "react"
import BlogContext from "../../context/blogContext"
import {
	CardContent,
	TextField,
	FormControl,
	InputAdornment,
} from "@mui/material"
import { Search as SearchIcon } from "@mui/icons-material"

const Search = () => {
	const blogContext = useContext(BlogContext)
	const { setQuery } = blogContext

	return (
		<CardContent
			style={{
				backgroundColor: "#fff",
				padding: "40px",
				borderBottom: "solid 1px grey",
				boxShadow: "5px 5px 5px grey",
			}}>
			<FormControl>
				<TextField
					label='Search'
					type='text'
					placeholder='Search Blogs'
					variant='standard'
					onChange={(e) => setQuery(e.target.value)}
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<SearchIcon />
							</InputAdornment>
						),
					}}
				/>
			</FormControl>
		</CardContent>
	)
}

export default Search
