// frontend/src/components/Admin/PostForm/RichTextEditor.jsx
import { Editor } from "@tinymce/tinymce-react";
import "tinymce/tinymce";
import "tinymce/themes/silver";
import "tinymce/icons/default";

// Plugins
import "tinymce/plugins/advlist";
import "tinymce/plugins/autolink";
import "tinymce/plugins/lists";
import "tinymce/plugins/link";
import "tinymce/plugins/image";
import "tinymce/plugins/charmap";
import "tinymce/plugins/preview";
import "tinymce/plugins/anchor";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/code";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/media";
import "tinymce/plugins/table";
import "tinymce/plugins/help";
import "tinymce/plugins/wordcount";

export default function RichTextEditor({
  value,
  onChange,
  editorRef,
  onNodeChange,
}) {
  return (
    <Editor
      onInit={(evt, editor) => (editorRef.current = editor)}
      value={value}
      onEditorChange={onChange}
      init={{
        base_url: "/tinymce",
        suffix: ".min",
        plugins:
          "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table help wordcount",
        toolbar:
          "undo redo | formatselect fontsizeselect | bold italic | alignleft aligncenter alignright image | styleselect | bullist numlist outdent indent | removeformat | help",
        height: 500,
        branding: false,
        image_advtab: true,
        style_formats: [
          {
            title: "Image Left",
            selector: "img",
            styles: { float: "left", margin: "0 1em 1em 0" },
          },
          {
            title: "Image Right",
            selector: "img",
            styles: { float: "right", margin: "0 0 1em 1em" },
          },
          {
            title: "Centered Image",
            selector: "img",
            styles: { display: "block", margin: "0 auto" },
          },
        ],
        init_instance_callback: (editor) => {
          const promo = editor
            .getContainer()
            .querySelector(".tox-promotion-link");
          if (promo) promo.remove();

          if (onNodeChange) {
            editor.on("NodeChange", onNodeChange);
          }
        },
      }}
    />
  );
}
