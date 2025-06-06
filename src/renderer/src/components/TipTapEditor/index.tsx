import './index.css';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { EditorContent, useEditor } from '@tiptap/react';

import Collaboration from '@tiptap/extension-collaboration';
import * as Y from 'yjs';

import { useEffect } from 'react';
import { TiptapCollabProvider } from '@hocuspocus/provider';

const doc = new Y.Doc();

const TipTapEditor = () => {
  // useEffect(() => {
  //   const provider = new TiptapCollabProvider({
  //     name: 'collaborate document demo',
  //     appId: '6kpj3elk',
  //     token: '',
  //     document: doc,
  //     onSynced() {
  //       if (!doc.getMap('config').get('initialContentLoaded') && editor) {
  //         doc.getMap('config').set('initialContentLoaded', true);
  //         editor.commands.setContent(`
  //           <p>
  //             This is a radically reduced version of Tiptap. It has support for a document, with paragraphs and text. That’s it. It’s probably too much for real minimalists though.
  //           </p>
  //           <p>
  //             The paragraph extension is not really required, but you need at least one node. Sure, that node can be something different.
  //           </p>
  //         `);
  //       }
  //     },
  //   });
  // }, []);

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Collaboration.configure({
        document: doc,
      }),
      // StarterKit.configure({
      //   history: false,
      // }),
    ],
    content: `
      <p>
        This is a radically reduced version of Tiptap. It has support for a document, with paragraphs and text. That’s it. It’s probably too much for real minimalists though.
      </p>
      <p>
        The paragraph extension is not really required, but you need at least one node. Sure, that node can be something different.
      </p>
    `,
  });

  return <EditorContent editor={editor} />;
};

export default TipTapEditor;
