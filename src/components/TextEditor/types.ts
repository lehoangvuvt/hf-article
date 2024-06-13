export enum FontStyle {
  TITLE = "TITLE",
  BOLD = "BOLD",
  ITALIC = "ITALIC",
  QUOTE = "QUOTE",
}

export enum Type {
  TEXT = "TEXT",
  LINK = "LINK",
  IMAGE = "IMAGE",
}

export type Title = {
  content: string;
  type: Type.TEXT;
  validFontStyles: FontStyle[];
  fontStyles: FontStyle[];
  validTypes: Type[];
};

export type Paragraph = {
  content: string;
  type: Type.TEXT | Type.IMAGE | Type.LINK;
  validFontStyles: FontStyle[];
  fontStyles: FontStyle[];
  validTypes: Type[];
  imgProperties?: {
    width: number;
    height: number;
  };
};

export type TextEditorContent = {
  title: Title;
  paragraphs: Paragraph[];
};

export type PackedData = {
  title: string;
  content: string;
  short_content: string;
  thumbnail_url: string;
};
