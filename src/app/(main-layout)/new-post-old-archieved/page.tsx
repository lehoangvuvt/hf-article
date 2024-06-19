"use client";

import TextEditorEdit from "@/components/TextEditor/edit";
import AuthConditionalRenderWrapper from "@/middlewares/authConditionalRenderWrapper";

const NewPostOldArchieve = () => {
  return (
    <>
      <AuthConditionalRenderWrapper renderIf={"AUTH"}>
        <TextEditorEdit />
      </AuthConditionalRenderWrapper>
      <AuthConditionalRenderWrapper renderIf={"NOT_AUTH"}>
        <h1>Please login</h1>
      </AuthConditionalRenderWrapper>
    </>
  );
};

export default NewPostOldArchieve;
