"use client";

import TextEditorEdit from "@/components/TextEditor/edit";
import AuthConditionalRenderWrapper from "@/middlewares/authConditionalRenderWrapper";

const NewPost = () => {
  return (
    <>
      <AuthConditionalRenderWrapper required={true}>
        <TextEditorEdit />
      </AuthConditionalRenderWrapper>
      <AuthConditionalRenderWrapper required={false}>
        <h1>Please login</h1>
      </AuthConditionalRenderWrapper>
    </>
  );
};

export default NewPost;
