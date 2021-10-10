import { ChangeEvent, useState } from "react";

type TextInput = [string, (event: ChangeEvent<HTMLInputElement>) => void];
const useTextInput = (): TextInput => {
  const [text, setText] = useState("");

  const onChange = (event: ChangeEvent<HTMLInputElement>) =>
    setText(event.target.value);

  return [text, onChange];
};

export default useTextInput;
