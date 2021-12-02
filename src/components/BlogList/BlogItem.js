import { Card } from "@mui/material"
import { Link } from "react-router-dom"
const BlogItem = ({ ...props }) => {
	const { key, blog } = props

	return (
		<Card key={key} className='ListItem'>
			<Link
				to={{ pathname: `/post/${blog.id}` }}
				style={{ textDecoration: "none", color: "#000" }}>
				<h2 className='title'>{blog.title}</h2>
			</Link>
			<div>{blog.body}</div>
		</Card>
	)
}

export default BlogItem
