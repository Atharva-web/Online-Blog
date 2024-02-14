import { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import appWriteService from "../appwrite/aw-config";
import { Container, PostCard } from "../components/index";
import { useSelector } from "react-redux";

function HomePage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        appWriteService.getPosts()
        .then((posts) => {
            if(posts) {
                setPosts(posts.documents);
            }
        })
    }, []);

    // mcs
    const authStatus = useSelector((state) => state.auth.status);
    // mce

    if(posts.length === 0) {
        if(!authStatus) {
            return (
                <div className="w-full py-8 mt-4 text-center">
                    <Container>
                        <div className="flex flex-wrap">
                            <div className="p2 w-full">
                                <h1 className="text-2xl font-bold">
                                    Login to read posts
                                </h1>
                            </div>
                        </div>
                    </Container>
                </div>
            );
        }
        
        // mcs
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p2 w-full">
                        {/* <h1>Loading...</h1> */}
                        <ReactLoading type="spokes" color="#212121" height={100} width={50}  />
                        </div>
                    </div>
                </Container>
            </div>
        );
        // mce
    }

    return (
        <div className="w-full py-8">
            {/* <h2 style={{textAlign: "center", fontSize: 30}}>All Posts</h2> */}
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

export default HomePage;