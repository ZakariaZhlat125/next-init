'use client';

import { useState, useCallback } from 'react';

export interface CrudOptions<T> {
  initialData?: T[];
  onCreate?: (item: T) => Promise<void> | void;
  onUpdate?: (id: string, item: T) => Promise<void> | void;
  onDelete?: (id: string) => Promise<void> | void;
  idField?: keyof T;
}

export interface UseCrudReturn<T> {
  data: T[];
  isLoading: boolean;
  error: string | null;
  selectedItem: T | null;
  isModalOpen: boolean;
  isEditMode: boolean;
  setData: (data: T[]) => void;
  handleCreate: () => void;
  handleEdit: (item: T) => void;
  handleDelete: (id: string) => void;
  handleSave: (item: T) => Promise<void>;
  handleCancel: () => void;
  closeModal: () => void;
  refreshData: () => void;
}

export function useCrud<T extends Record<string, any>>(
  options: CrudOptions<T> = {}
): UseCrudReturn<T> {
  const {
    initialData = [],
    onCreate,
    onUpdate,
    onDelete,
    idField = 'id' as keyof T,
  } = options;

  const [data, setData] = useState<T[]>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleCreate = useCallback(() => {
    setSelectedItem(null);
    setIsEditMode(false);
    setIsModalOpen(true);
    setError(null);
  }, []);

  const handleEdit = useCallback((item: T) => {
    setSelectedItem(item);
    setIsEditMode(true);
    setIsModalOpen(true);
    setError(null);
  }, []);

  const handleDelete = useCallback(
    async (id: string) => {
      if (!window.confirm('Are you sure you want to delete this item?')) {
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        if (onDelete) {
          await onDelete(id);
        }
        setData((prev) => prev.filter((item) => String(item[idField]) !== id));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete item');
      } finally {
        setIsLoading(false);
      }
    },
    [onDelete, idField]
  );

  const handleSave = useCallback(
    async (item: T) => {
      setIsLoading(true);
      setError(null);

      try {
        if (isEditMode && selectedItem) {
          if (onUpdate) {
            await onUpdate(String(selectedItem[idField]), item);
          }
          setData((prev) =>
            prev.map((existing) =>
              String(existing[idField]) === String(selectedItem[idField])
                ? item
                : existing
            )
          );
        } else {
          if (onCreate) {
            await onCreate(item);
          }
          setData((prev) => [...prev, item]);
        }
        setIsModalOpen(false);
        setSelectedItem(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to save item');
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [isEditMode, selectedItem, onCreate, onUpdate, idField]
  );

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
    setSelectedItem(null);
    setError(null);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedItem(null);
  }, []);

  const refreshData = useCallback(() => {
    setData(initialData);
  }, [initialData]);

  return {
    data,
    isLoading,
    error,
    selectedItem,
    isModalOpen,
    isEditMode,
    setData,
    handleCreate,
    handleEdit,
    handleDelete,
    handleSave,
    handleCancel,
    closeModal,
    refreshData,
  };
}
