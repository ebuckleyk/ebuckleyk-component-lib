import { Portal } from "@chakra-ui/portal";
import React, { useEffect, useRef } from "react";
import { Editor, Range } from "slate";
import { useFocused, useSlate } from "slate-react";

const HoveringToolbar = () => {
  const ref = useRef<HTMLDivElement | null>();
  const editor = useSlate();
  const inFocus = useFocused();

  useEffect(() => {
    const el = ref.current;
    const { selection } = editor;

    if (!el) return;

    if (!selection || !inFocus || Range.isCollapsed(selection) || Editor.string(editor, selection) === '') {
      el.removeAttribute('style');
      return;
    }

    const domSelection = window.getSelection();
    const domRange = domSelection?.getRangeAt(0);
    const rect = domRange?.getBoundingClientRect();
    el.style.opacity = '1'
    el.style.top = `${(rect?.top ?? 0) + window.pageYOffset - el.offsetHeight}px`
    el.style.left = `${(rect?.left ?? 0) +
      window.pageXOffset -
      el.offsetWidth / 2 +
      (rect?.width ?? 0) / 2}px`
  })

  return (
    <Portal>
      
    </Portal>
  )
}

export default HoveringToolbar;