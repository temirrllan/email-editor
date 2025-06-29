import { Bold, Eraser, Italic, Underline } from "lucide-react";
import styles from "./EmailEditor.module.scss";
import { useRef, useState } from "react";
import { applyStyle, type TStyle } from "./apply-style";
import parse from 'html-react-parser'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { emailService } from "../../services/email.service";
export function EmailEditor() {

  

  const [text, setText] = useState(
    ''
  );

  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);

  const textRef = useRef<HTMLTextAreaElement | null>(null);

  const queryCLient = useQueryClient()

  const {mutate, isPending} = useMutation({
    mutationKey: ['create email'],
    mutationFn: () => emailService.sendEmail(text),
    onSuccess(){
      setText('')
      queryCLient.refetchQueries({    queryKey: ["email list"]})
    }
  })

  const updateSelection = () => {
    if(!textRef.current) return;
    setSelectionStart(textRef.current.selectionStart)
        setSelectionEnd(textRef.current.selectionEnd)

  }
  
  const applyFormat = (type: TStyle) => {
   

    const selectedText = text.substring(selectionStart, selectionEnd)
        if(!selectedText) return

            const before = text.substring(0, selectionStart)

    const after = text.substring(selectionEnd)

    setText(before + applyStyle(type, selectedText) + after)

  };




  return (
    <div>
      <h1>Email editor</h1>
      {text&&<div className={styles.preview}>
        
          {parse(text )}
        </div>}
      
      <div className={styles.card}>
        
        <textarea
        ref={textRef}
          className={styles.editor}
          spellCheck="false"
          onSelect={updateSelection}
          value={text}
          onChange={e => setText(e.target.value)}

        >
          {text}
        </textarea>
        <div className={styles.actions}>
          <div className={styles.tools}>
            <button onClick={()=> setText('')}>
              <Eraser size={17} />
            </button>
            <button onClick={()=> applyFormat('bold')}>
              <Bold size={17} />
            </button>
            <button onClick={()=> applyFormat('italic')}>
              <Italic size={17} />
            </button>
            <button onClick={()=> applyFormat('underline')}>
              <Underline size={17} />
            </button>
          </div>
          <button disabled={isPending} onClick={() => mutate()}>Send Now</button>
        </div>
      </div>
    </div>
  );
}
