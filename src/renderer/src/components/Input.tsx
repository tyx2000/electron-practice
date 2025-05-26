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
  useEffect(() => {
    // console.log('effect', val);

    const keydownHandler = (e) => {
      const el = document.getElementById('message-input')!;
      console.log(el);
      if (e.key === 'Enter' && el) {
        e.preventDefault();
        if (e.shiftKey) {
          console.log('换行');
          // setVal((v) => v + '\n');
        } else {
          console.log('发送');
        }
      }
    };
    document.addEventListener('keydown', keydownHandler);

    return () => {
      document.removeEventListener('keydown', keydownHandler);
    };
  }, []);

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
      <Textarea id="message-input" />
    </Wrapper>
  );
};

export default Input;
