import { Card, CardContent } from "@mui/material"
import { Link } from "react-router-dom"
const BlogItem = ({ ...props }) => {
	const { key, blog } = props
	return (
		<Card key={key} className='ListItem'>
			<h2>Blog Post:</h2>
			<Link
				to={{ pathname: `/post/${blog.id}` }}
				style={{ textDecoration: "none", color: "#000" }}>
				<span
					style={{ cursor: "pointer", textDecoration: "none" }}
					href={`https://jsonplaceholder.typicode.com/posts/${blog.id}`}>
					{blog.title}
				</span>
			</Link>
		</Card>
	)
}

export default BlogItem
