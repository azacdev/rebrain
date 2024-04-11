import { Pinecone } from "@pinecone-database/pinecone";

const apiKey = process.env.PINECONE_API_KEY;

if (!apiKey) {
  throw Error("PINECONE_API_KEY is undefined");
}

const pinecone = new Pinecone({
  apiKey,
});

export const notesIndex = pinecone.Index("rebrain");
