import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Box, Card, CardContent } from "@mui/material"
import { Spinner } from "../../svg"
import axios from "axios"

const BlogPost = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [post, setPost] = useState({})

	let { id } = useParams()
	const getPost = async (id) => {
		try {
			setIsLoading(true)
			const response = await axios(
				`https://jsonplaceholder.typicode.com/posts/${id}`
			)
			if (response.status === 200) {
				console.log("the Post", response.data)
				let count = JSON.parse(sessionStorage.getItem("pageView"))
				count.map((value) => {
					if (value.id === id) {
						response.data.views = value.views
					}
					return value
				})

				setPost(response.data)
				setIsLoading(false)
			}
		} catch (error) {
			console.error("This is the error", error.message)
		}
	}

	useEffect(() => {
		//GET THE POST
		getPost(id)

		// Access count value from session storage
		let listOfPostsVisited = JSON.parse(sessionStorage.getItem("pageView"))

		//if the array doesn't exist create new array and push the new object
		if (listOfPostsVisited == null) {
			let listOfPostsVisited = []
			let pageView = {}
			pageView.id = id
			pageView.views = 1
			listOfPostsVisited.push(pageView)
			console.log("creating new list and item")
			sessionStorage.setItem("pageView", JSON.stringify(listOfPostsVisited))
		}

		//The listOfPostsVisited is not null
		if (listOfPostsVisited) {
			// want to find if the id exists in the array
			if (listOfPostsVisited.some((post) => post.id === id.toString())) {
				listOfPostsVisited.forEach((view) => {
					if (view.id === id.toString()) {
						view.views++
					}
				})
			}

			// if the post id doesn't exist in the array we want to add it
			if (!listOfPostsVisited.some((post) => post.id === id.toString())) {
				let pageView = {}
				pageView.id = id
				pageView.views = 1
				listOfPostsVisited.push(pageView)
			}
			//update the local storage
			sessionStorage.setItem("pageView", JSON.stringify(listOfPostsVisited))
		}
	}, [id])

	return (
		<Box
			style={{
				// backgroundColor: "rgba(209, 234, 255, 0.616)",
				display: "flex",
				justifyContent: "center",
				padding: "20px",
				height: "90vh",
			}}>
			{isLoading ? (
				<CardContent className='LoadingContent'>
					<Spinner />
				</CardContent>
			) : (
				<Card className='BlogPost'>
					<CardContent>
						<h2>Blog Post {post.id}</h2>
						<h3>By: User {post.userId}</h3>
						<h3>Title: {post.title}</h3>
						<br />
						<br />
						<p>{post.body}</p>
						<br />
						<br />
						<p>This page has been viewed: {post.views}</p>
					</CardContent>
				</Card>
			)}
		</Box>
	)
}

export default BlogPost
