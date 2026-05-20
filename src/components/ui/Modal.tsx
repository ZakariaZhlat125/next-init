'use client';

import { ReactNode } from 'react';
import { Modal as AntModal, ModalProps as AntModalProps } from 'antd';
import { useTheme } from '@/lib/theme/use-theme';

export interface ModalProps extends Omit<AntModalProps, 'width'> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
  height?: string | number;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  showCloseButton = true,
  height,
  ...props
}: ModalProps) {
  const { tokens } = useTheme();

  const sizeWidth = {
    sm: 400,
    md: 600,
    lg: 800,
    xl: 1000,
  };

  return (
    <>
    <AntModal
      open={isOpen}
      onCancel={onClose}
      title={title}
      footer={footer}
      width={sizeWidth[size]}
      closable={showCloseButton}
      centered
      className="custom-modal"
      transitionName=""
      maskTransitionName=""
      styles={{
        header: {
          backgroundColor: 'var(--surface)',
          borderBottom: '1px solid var(--border)',
          // padding: '20px 24px',
          borderRadius: ' 16px',
          marginBottom: 0,
          color: 'var(--text)',
        },
        body: {
          backgroundColor: 'var(--surface)',
          paddingBottom: 0,
          color: 'var(--text)',
        },
        footer: {
          backgroundColor: 'var(--surface)',
          borderTop: '1px solid var(--border)',
          borderRadius: '0 0 16px 16px',
          padding: '16px 24px',
        },
        mask: {
          backdropFilter: 'blur(4px)',
          backgroundColor: 'rgba(0, 0, 0, 0.45)',
        },
      }}
      style={{
        borderRadius: '16px',
      }}
      {...props}
    >
      {children}
    </AntModal>
    <style jsx global>{`
      /* Custom Modal Styling */
      .custom-modal {
        box-shadow: 0 25px 50px -12px var(--shadow-dark), 0 0 0 1px var(--border);
        animation: modalFadeIn 0.3s ease-out; 
      }

      .custom-modal .ant-modal-container {
        padding: 0 !important;
        border-radius: 16px !important;
      }

      .custom-modal .ant-modal-content {
        overflow: hidden;
      }

      .custom-modal .ant-modal-body {
        max-height: 70vh;
        overflow-y: auto;
        border-radius: 16px !important;
      }

      /* Custom Modal Scrollbar */
      .custom-modal .ant-modal-body::-webkit-scrollbar {
        width: 6px;
      }

      .custom-modal .ant-modal-body::-webkit-scrollbar-track {
        background: var(--surface-muted);
      }

      .custom-modal .ant-modal-body::-webkit-scrollbar-thumb {
        background: var(--border-strong);
        border-radius: 3px;
      }

      .custom-modal .ant-modal-body::-webkit-scrollbar-thumb:hover {
        background: var(--text-muted);
      }

      /* Custom Modal Firefox Scrollbar */
      .custom-modal .ant-modal-body {
        scrollbar-color: var(--border-strong) var(--surface-muted);
        scrollbar-width: thin;
      }

      @keyframes modalFadeIn {
        from {
          opacity: 0;
          transform: scale(0.95) translateY(-20px);
        }

        to {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }
    `}</style>
  </>
  );
}
