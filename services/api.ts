import {DocumentContext} from "next/document";
import {CollectionSchema, MetadataSchema, DocumentSchema, AllCollectionSchema} from "@apiTypes/apiSchema";

export class Api {
    public static host = process.env.NEXT_PUBLIC_API_URL;
    // public authorization: string;
    private context: DocumentContext;

    public hostName = (): string => {
        return Api.host;
    }

    public getInitialToken = async (context) => {
        this.context = context;
    }

    public removeCtx = () => {
        delete this.context;
    }

    private get = async (path: string): Promise<Response> => {
        const requestOptions = {
            method: 'GET',
        };

        return await fetch(`${Api.host}/${path}`, requestOptions);
    };

    private checkBadStatus = (res) => {
        if (res.status >= 300) {
            const messages = ["Bad Request", "Server Error"];
            const index = res.status >= 500;

            throw new Error(`${messages[Number(index)]}: ${res.status}`);
        }
    }

    public getMetadata = async (dbName: string, id: string): Promise<CollectionSchema> => {
        try {
            const res = await this.get(dbName + `/loadMetadata?id=${id}`);
            this.checkBadStatus(res);
            return await res.json();
        } catch (err) {
            console.log(err)
        }
    };

    public getAllCollections = async (dbName: string): Promise<AllCollectionSchema> => {
        try {
            const res = await this.get(dbName + "/loadAllCollections");
            this.checkBadStatus(res);
            return await res.json();
        } catch (err) {
            console.log(err)
        }
    };

    public getAllDocuments = async (dbName: string, collection: string): Promise<DocumentSchema> => {
        try {
            const res = await this.get(dbName + `/loadDocuments?id=${collection}`);
            this.checkBadStatus(res);
            return await res.json();
        } catch (err) {
            console.log(err)
        }
    };

}