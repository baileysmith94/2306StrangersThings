import { fetchAllPosts } from "../API";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


export default function AllPosts () {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [searchParam, setSearchParam] = useState("")

    useEffect(() => {
        async function getAllPosts() {
            const APIResponse = await fetchAllPosts();
            if(APIResponse.success){
                setPosts(APIResponse.data.posts)
            } else {
                setError(APIResponse.error.message)
            }
        } 
        getAllPosts(); 
    },[]);

    const postToDisplay = searchParam
        ? posts.filter((posts) => 
        posts.title.toLowerCase().includes(searchParam))
        : posts; 
    return (
        <>
        <div>
         <label>
           Search:{" "}
          <input type="text" 
             placeholder="search"
           onChange={(e) => setSearchParam(e.target.value.toLowerCase())}/>
         </label>
        </div>
        {postToDisplay.map((post)=> {
            return <><div id="post">
            <h2 key={post.id}>{post.title}</h2>
            <p>{post.description}</p>
            <p>Price: {post.price}</p>
            <h3>Seller: {post.author.username}</h3>
            <p>Location: {post.location}</p> {/* add if the seller is willing to deliver */}
            <Link to={`/send-message/${post.author.username}`}> 
            Send Message to Author
          </Link> 
          </div>
            </>
        })}
        </>
        
        
    )

}