// import { useEffect, useCallback } from "react";

// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// import { Button, Input, Select, RTE } from "../index";

// import appWriteService from "../../appwrite/aw-config";

// function PostForm({post}) {
//     const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
//         defaultValues: {
//             title: post?.title || "",
//             slug: post?.$id || "",
//             content: post?.content || "",
//             status: post?.status || "active"
//         }
//     });

//     const navigate = useNavigate();
//     const userData = useSelector((state) => state.auth.userData);

//     async function submit(data) {
//         if(post) {
//             const file = data.image[0] ? await appWriteService.uploadFile(data.image[0]) : null;
//             if(file) {
//                 await appWriteService.deleteFile(post.featuredImage); // don't need to await this?
//             }

//             const dbPost = await appWriteService.updatePost(post.$id, {
//                 ...data,
//                 featuredImage: file ? file.$id : undefined
//             });

//             if(dbPost) {
//                 navigate(`/post/${dbPost.$id}`);
//             }
//         }
//         else {
//             console.log("Image file:", data.image[0]);
//             const file = await appWriteService.uploadFile(data.image[0]);
//             if(file) {
//                 data.featuredImage = file.$id; // updating properties
//                 const dbPost = await appWriteService.createPost({
//                     ...data,
//                     userId: userData.$id
//                 });

//                 if(dbPost) {
//                     navigate(`/post/${dbPost.$id}`);
//                 }
//             }
//         }
//     }

//     const slugTransform = useCallback((value) => {
//         if(value && typeof value === "string") {
//             return value.trim().toLowerCase()
//                         .replace(/[^a-zA-Z\d\s]+/g, "-") // plus removed
//                         .replace(/\s/g, "-")
//         }

//         return "";
//     }, []);

//     useEffect(() => {
//         const subscription = watch((value, { name }) => {
//             if(name === "title") {
//                 setValue("slug", slugTransform(value.title, {shouldValidate: true}))
//             }
//         })

//         return () => {
//             subscription.unsubscribe();
//         }
//     }, [watch, slugTransform, setValue]);

//     return (
//         <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
//             <div className="w-2/3 px-2">
//                 <Input
//                     label = "Title: "
//                     placeholder = "Title"
//                     className = "mb-4"
//                     {
//                         ...register("title", {required: true})
//                     }
//                 />
//                 <Input
//                     label = "Slug: "
//                     placeholder = "Slug"
//                     className = "mb-4"
//                     {
//                         ...register("slug", {required: true})
//                     }
//                     onInput = {
//                         (e) => {
//                             setValue("slug", slugTransform(e.currentTarget.value), {shouldValidate: true})
//                         }
//                     }
//                 />
//                 <RTE
//                     label = "Content: "
//                     name = "content"
//                     control = {control}
//                     defaultValue={getValues("content")}
//                 />
//             </div>
//             <div className="w-1/3 px-2">
//                 <Input
//                     label = "Featured Image: "
//                     type = "file"
//                     className = "mb-4"
//                     accept = "image/png, image/jpg, image/jpeg, image/gif"
//                     {
//                         ...register("image", {required: !post}) // !post
//                     }
//                 />
//                 {
//                     post && (
//                         <div className="w-full mb-4">
//                             <img
//                                 src = {appWriteService.getFilePreview(post.featuredImage)}
//                                 alt = {post.title}
//                                 className="rounded-lg"
//                             />
//                         </div>
//                     )
//                 }
//                 <Select
//                     options = {["active", "inactive"]}
//                     label = "Status"
//                     className = "mb-4"
//                     {
//                         ...register("status", {required: true})
//                     }
//                 />
//                 <Button
//                     type = "submit"
//                     children={post ? "update karo" : "submit karo"}
//                     bgColor = {post ? "bg-green-500" : undefined}
//                     className = "w-full"
//                 />
//             </div>
//         </form>
//     );
// }

// export default PostForm;

import { useEffect, useCallback } from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Button, Input, Select, RTE } from "../index";

import appWriteService from "../../appwrite/aw-config";

function PostForm({post}) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active"
        }
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    console.log("userData: ", userData)

    async function submit(data) {
        if(post) {
            const file = data.image[0] ? await appWriteService.uploadFile(data.image[0]) : null;
            if(file) {
                await appWriteService.deleteFile(post.featuredImage); // don't need to await this?
            }

            const dbPost = await appWriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined
            });

            if(dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        }
        else {
            // console.log("Data: ", data);
            const file = await appWriteService.uploadFile(data.image[0]);
            if(file) {
                console.log("file = ", file);
                data.featuredImage = file.$id; // updating properties
                const dbPost = await appWriteService.createPost({
                    ...data,
                    userId: userData.$id
                });

                if(dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if(value && typeof value === "string") {
            return value.trim().toLowerCase()
                        .replace(/[^a-zA-Z\d\s]+/g, "-") // plus removed
                        .replace(/\s/g, "-")
        }

        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if(name === "title") {
                setValue("slug", slugTransform(value.title, {shouldValidate: true}))
            }
        })

        return () => {
            subscription.unsubscribe();
        }
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label = "Title: "
                    placeholder = "Title"
                    className = "mb-4"
                    {
                        ...register("title", {required: true})
                    }
                />
                <Input
                    label = "Slug: "
                    placeholder = "Slug"
                    className = "mb-4"
                    {
                        ...register("slug", {required: true})
                    }
                    onInput = {
                        (e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), {shouldValidate: true})
                        }
                    }
                />
                <RTE
                    label = "Content: "
                    name = "content"
                    control = {control}
                    defaultValue={getValues("content")}
                />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label = "Featured Image: "
                    type = "file"
                    className = "mb-4"
                    accept = "image/png, image/jpg, image/jpeg, image/gif"
                    {
                        ...register("image", {required: !post}) // !post
                    }
                />
                {
                    post && (
                        <div className="w-full mb-4">
                            <img
                                src = {appWriteService.getFilePreview(post.featuredImage)}
                                alt = {post.title}
                                className="rounded-lg"
                            />
                        </div>
                    )
                }
                <Select
                    options = {["active", "inactive"]}
                    label = "Status"
                    className = "mb-4"
                    {
                        ...register("status", {required: true})
                    }
                />
                <Button
                    type = "submit"
                    children={post ? "update karo" : "submit karo"}
                    bgColor = {post ? "bg-green-500" : undefined}
                    className = "w-full"
                />
            </div>
        </form>
    );
}

export default PostForm;