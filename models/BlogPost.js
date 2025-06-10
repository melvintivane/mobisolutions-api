import { Schema, model } from "mongoose";

const blogPostSchema = new Schema(
  {
    authorProfileImg: {
      type: String,
      required: true,
    },
    blogTitle: {
      type: String,
      required: true,
    },
    thumb: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    authorName: {
      type: String,
      required: true,
    },
    authorResume: {
      type: String, 
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    blogTitle: {
      type: String,
      required: true,
    },
    mainText: {
      type: String,
      required: true,
    },
    quoteText: {
      type: String,
      required: false,
    },
    btnText: {
      type: String,
      default: "Continuar Lendo",
    },
    btnIcon: {
      type: String,
      default: "fa-solid fa-arrow-right",
    },
  },
  {
    timestamps: true,
  }
);

export default model("BlogPost", blogPostSchema);
