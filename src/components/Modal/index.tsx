import { FC, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";

import "./modal.css";

interface IProps {
  isOpen: boolean;
  title: string | JSX.Element;
  content: string | JSX.Element;
  onClose: () => void;
}

type FocusElement =
  | HTMLInputElement
  | HTMLAnchorElement
  | HTMLButtonElement
  | HTMLTextAreaElement
  | HTMLSelectElement;

const Modal: FC<IProps> = ({ isOpen, title, content, onClose }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  let currentElement: FocusElement;

  const handleTabKey = (e: KeyboardEvent) => {
    if (!modalRef.current) return;
    const focusableModalElements =
      modalRef.current.querySelectorAll<FocusElement>(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
      );
    const focusableModalElementsArr = Array.from(focusableModalElements);
    const lengthFocus = focusableModalElementsArr.length;
    if (!e.shiftKey) {
      if (
        focusableModalElementsArr.includes(
          document.activeElement as FocusElement
        )
      ) {
        const idxCurrent = focusableModalElementsArr.findIndex(
          (ele) => ele === currentElement
        );
        if (idxCurrent > -1) {
          if (idxCurrent + 1 < lengthFocus) {
            const nextElement = focusableModalElementsArr[idxCurrent + 1];
            nextElement.focus();
            currentElement = nextElement;
          } else {
            focusableModalElementsArr[0].focus();
            currentElement = focusableModalElementsArr[0];
          }
        }
        return e.preventDefault();
      } else {
        focusableModalElementsArr[0].focus();
        currentElement = focusableModalElementsArr[0];
        return e.preventDefault();
      }
    } else {
      if (
        focusableModalElementsArr.includes(
          document.activeElement as FocusElement
        )
      ) {
        const idxCurrent = focusableModalElementsArr.findIndex(
          (ele) => ele === currentElement
        );
        if (idxCurrent > -1) {
          if (idxCurrent !== 0) {
            const nextElement = focusableModalElementsArr[idxCurrent - 1];
            nextElement.focus();
            currentElement = nextElement;
          } else {
            focusableModalElementsArr[lengthFocus - 1].focus();
            currentElement = focusableModalElementsArr[lengthFocus - 1];
          }
        }
        return e.preventDefault();
      } else {
        focusableModalElementsArr[lengthFocus - 1].focus();
        currentElement = focusableModalElementsArr[lengthFocus - 1];
        return e.preventDefault();
      }
    }
  };

  const keyListeners = {
    Escape: onClose,
    Tab: handleTabKey,
  };

  useEffect(() => {
    function keyListener(e: KeyboardEvent) {
      const listener: any = keyListeners[e.key as keyof typeof keyListener];
      return listener && listener(e);
    }
    document.addEventListener("keydown", keyListener);

    return () => document.removeEventListener("keydown", keyListener);
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <section className="modal">
      <div
        role="dialog"
        aria-modal="true"
        id="dialog1"
        aria-labelledby="dialog1_label"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="modal-content"
      >
        <div className="modal-icon-exit">
          <button className="exit-icon" onClick={onClose}>
            <AiOutlineClose />
          </button>
        </div>
        <main className="modal-main-contents">
          <h5 id="dialog1_label" className="modal-title">{title}</h5>
          <hr />
          <div className="modal-text">{content}</div>
          <div className="modal-button">
            <button
              className="accept-btn"
              aria-label="Close"
              onClick={() => alert("ok")}
            >
              OK
            </button>
            <button className="close-btn" onClick={onClose}>
              Exit
            </button>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Modal;
