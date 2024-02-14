import { Client, Databases, ID, Storage, Query } from "appwrite";
import conf from "../config/conf";

class Service {
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId);
        
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    // post CRUD servies

    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            const document = await this.databases.createDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug, // acts as the document id; use these 3 to locate the document
                {
                    title,
                    featuredImage,
                    status,
                    userId,
                    content
                }
            );

            console.log(document)

            return document;
        }
        catch(error) {
            console.log("Appwrite service :: createPost", error);
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug
            )

            // return true;
        }
        catch (error) {
            console.log("Appwrite :: service :: getPost", error);
            // return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                queries
            );
        }
        catch(error) {
            console.log("Appwrite :: service :: getPosts", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}) {
        try {
            return await this.databases.updateDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    featuredImage,
                    status,
                    content
                }
            );
        }
        catch(error) {
            console.log("Appwrite :: service :: updatePost", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
            );

            return true;
        }
        catch(error) {
            console.log("Appwrite :: service :: deletePost", error);
            return false;
        }
    }

    // file upload services

    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file
            );
            
            // return true;
        }
        catch (error) {
            console.log("Appwrite :: service :: uploadFile", error);
            // return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                conf.appWriteBucketId,
                fileId
            )

            return true;
        }
        catch(error) {
            console.log("Appwrite service :: deleteFile", error);
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.storage.getFilePreview(
            conf.appWriteBucketId,
            fileId
        )
    }
}

const service = new Service();

export default service;