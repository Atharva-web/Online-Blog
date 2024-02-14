import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

function RTE({name, control, label, defaultValue = ""}) {
    return (
        <div className="w-full">
            {
                label && <label className="inline-block mb-1 pl-1">{ label }</label>
            }
            <Controller
                name = {name || "content"}
                control = {control}
                render = {({field: {onChange}}) => (
                    <Editor
                        apiKey='at594heg2aqpcvxa8532ot8js0ggtd5cshpohfaembbogggy'
                        
                        initialValue = {defaultValue}
                        init = {
                            {
                                initialValue: defaultValue,
                                height: 500,
                                menubar: true,
                                plugins: [
                                    "image",
                                    "advlist",
                                    "autolink",
                                    "lists",
                                    "link",
                                    "charmap",
                                    "preview",
                                    "anchor",
                                    "searchplace",
                                    "visualblocks",
                                    "code",
                                    "fullscreen",
                                    "insertdatetime",
                                    "media",
                                    "table",
                                    "code",
                                    "help",
                                    "wordcount",
                                    "anchor"
                                ],
                                toolbar: "undo redo | blocks | bold italic | forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                                content_style: "body {font-family: Helventica, Arial, sans-serif; font-size: 14px}"
                            }
                        }

                        onEditorChange = {onChange}
                    />
                )}
            />
        </div>
    );
}

export default RTE;