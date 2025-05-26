import { Schema, model } from "mongoose";

const blogPostSchema = new Schema(
  {
    thumb: {
      type: String,
      required: true,
    },
    blogPostLink: {
      type: String,
      required: true,
    },
    blogImg: {
      type: String,
      required: false,
    },
    author: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
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
