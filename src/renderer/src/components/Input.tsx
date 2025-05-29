import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Smile,
  File,
  Scissors,
  FolderOpen,
  Image,
  Phone,
  CalendarDays,
  EllipsisVertical,
  History,
} from 'lucide-react';

interface props {
  onSend: (val: string) => void;
}

const Wrapper = styled.div`
  width: 100%;
  height: 200px;
  border-top: 1px solid #ccc;
  display: flex;
  flex-direction: column;
`;

const Toolbar = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  padding: 8px 10px;
  & > svg:hover {
    cursor: pointer;
  }
`;

const Textarea = styled.textarea`
  flex: 1;
  width: 100%;
  height: 100%;
  border: none;
  resize: none;
  outline: none;
  font-size: 14px;
  font-weight: normal;
  padding: 10px;
  line-height: 20px;
`;

const Input: FC<props> = ({ onSend }) => {
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const keydownHandler = (e) => {
      const el = document.getElementById('message-input')! as HTMLTextAreaElement;
      if (e.key === 'Enter' && el) {
        e.preventDefault();
        if (e.shiftKey) {
          el.value += '\n';
        } else {
          const v = el.value;
          if (focused && v && v.trim()) {
            onSend(v.trim());
            el.value = '';
          }
        }
      }
    };
    document.addEventListener('keydown', keydownHandler);

    return () => {
      document.removeEventListener('keydown', keydownHandler);
    };
  }, [focused]);

  return (
    <Wrapper>
      <Toolbar>
        <Smile color="#3F4349" size={18} />
        <Scissors color="#3F4349" size={18} />
        <Image color="#3F4349" size={18} />
        <File color="#3F4349" size={18} />
        <CalendarDays color="#3F4349" size={18} />
        <FolderOpen color="#3F4349" size={18} />
        <Phone color="#3F4349" size={18} />
        <EllipsisVertical color="#3F4349" size={18} />
        <History color="#3F4349" size={18} />
      </Toolbar>
      <Textarea
        spellCheck={false}
        id="message-input"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </Wrapper>
  );
};

export default Input;
