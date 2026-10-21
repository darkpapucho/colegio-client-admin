import { WidthCss } from '../../types/globals';
import { ReactNode, useEffect, useRef } from 'react';
import { Button } from './Button';
import { Container } from './Container';
import { motion, useDragControls } from 'framer-motion';
import { createPortal } from 'react-dom';
import { Overlay } from './Overlay';

export default function Modal({
  children,
  width,
  title,
  onCloseModal,
  marginTop,
}: {
  marginTop?: string;
  children: ReactNode;
  width: WidthCss;
  title: string;
  onCloseModal: () => void;
}) {
  const controls = useDragControls();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.addEventListener('keyup', keyDownListener);
    document.getElementById('root')!.style.userSelect = 'none';
    return () => {
      document.getElementById('root')!.style.userSelect = 'auto';
      document.removeEventListener('keyup', keyDownListener);
    };
  }, []);
  return createPortal(
    <div ref={ref} className="absolute inset-0 flex h-full w-full touch-none select-none items-center justify-center origin-top">
      <div className="absolute left-1/2 z-[101] -translate-x-1/2 -translate-y-1/2" style={{ top: marginTop || '45%', width }}>
        <motion.div className="modal-container z-[102] flex w-full flex-col items-center justify-center overflow-hidden rounded-xl shadow-lift" drag dragListener={false} dragControls={controls} dragElastic={0} dragMomentum={false} dragConstraints={ref}>
          <div onPointerDown={(e) => controls.start(e)} className="flex w-full select-none items-center justify-between border-b border-white/15 bg-gradient-to-r from-brand-700 to-brand-600 px-4 py-2.5 font-display text-sm font-semibold text-white">
            {title}
            <Button $danger onClick={() => onCloseModal()} $width="max-content">
              X
            </Button>
          </div>
          <Container $direction="row" $width="100%" $bgColor="white" $padding="2rem">
            {children}
          </Container>
        </motion.div>
      </div>
      <Overlay />
    </div>,
    document.querySelector('#portal')!,
  );
  function keyDownListener(event: KeyboardEvent) {
    if (event.key == 'Escape') {
      onCloseModal();
    }
  }
}
