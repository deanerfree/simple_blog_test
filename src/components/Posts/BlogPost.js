import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Box, Card, CardContent } from "@mui/material"
import { Spinner } from "../../svg"
import { ArrowBackIosNew as BackArrow } from "@mui/icons-material"
import axios from "axios"

const BlogPost = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [post, setPost] = useState({})
	const navigate = useNavigate()

	let { id } = useParams()

	const returnToResults = () => {
		navigate({ pathname: "/", state: { redir: "ok" } })
	}
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
				backgroundColor: "rgba(209, 234, 255, 0.616)",
				padding: "20px",
				height: "90vh",
			}}>
			<div style={{ cursor: "pointer" }} onClick={returnToResults}>
				<BackArrow />
			</div>
			{isLoading ? (
				<CardContent className='LoadingContent'>
					<Spinner />
				</CardContent>
			) : (
				<Card className='BlogPost'>
					<CardContent>
						<h2>Blog Post {post.id}</h2>
						<h3>By: User {post.userId}</h3>
						<span>Title: {post.title}</span>
						<br />
						<br />
						<span>{post.body}</span>
						<br />
						<br />
						<span>This page has been viewed: {post.views}</span>
					</CardContent>
				</Card>
			)}
		</Box>
	)
}

export default BlogPost
