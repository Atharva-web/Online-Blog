import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";

import { Button } from "../components/index";

import appWriteService from "../appwrite/aw-config";

import Container from "../components/container/Container";

function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if(slug) {
            appWriteService.getPost(slug)
            .then((post) => {
                if(post) {
                    setPost(post);
                }
                else {
                    navigate("/");
                }
            })
        }
        else {
            navigate("/");
        }
    }, [slug, navigate]);

    function deletePost() {
        appWriteService.deletePost(post.$id)
        .then((status) => {
            if(status) {
                appWriteService.deleteFile(post.featureImage);
                navigate("/");
            }
        });
    }

    // console.log("POST: ", post)

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative rounded-xl p-2">
                    {console.log("post.featuredImage: ", post.featuredImage)}
                    <img
                        src={appWriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                        width={"500px"}
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {console.log("post.content: ", post.content)}
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}

export default Post;