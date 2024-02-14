import { useState, useEffect } from "react";

import appWriteServie from "../appwrite/aw-config";

import { Container, PostCard } from "../components/index";

function AllPosts() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        appWriteServie.getPosts()
        .then((posts) => {
            if(posts) {
                setPosts(posts.documents); // stored in posts
            }
        })
        .catch((e) => console.log(e.message));
    }, []);
    
    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {
                        posts.map((post) => {
                            return <div key={post.$id} className="p-2 w-1/4">
                                        <PostCard {...post} />
                                    </div>
                        })
                    }
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;