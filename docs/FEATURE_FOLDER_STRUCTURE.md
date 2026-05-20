# Feature Folder Structure

## Standard Feature Architecture

```
features/[FeatureName]/
│
├── types/
│   └── [feature].types.ts
│
├── constants/
│   └── [feature].constants.ts
│
├── services/
│   └── [feature].service.ts
│
├── hooks/
│   ├── [feature].ts
│   ├── use[Feature].ts
│   └── use[Feature]Form.ts
│
├── utils/
│   └── [feature].utils.ts
│
├── components/
│   ├── [Feature].tsx
│   ├── CreateForm/
│   │   └── Create[Feature].tsx
│   ├── EditForm/
│   │   └── Edit[Feature].tsx
│   └── Skeletons/
│       └── [Feature]Skeleton.tsx
│
├── __tests__/
│   ├── [feature].service.test.ts
│   ├── [feature].hooks.test.ts
│   └── [Feature].test.tsx
│
└── locales/
    ├── en.json
    └── ar.json
```

---

## Layer Responsibilities

| Layer | Purpose |
|-------|---------|
| `types/` | TypeScript interfaces only |
| `constants/` | Query keys, defaults, enums |
| `services/` | API calls (no React) |
| `hooks/` | Data fetching + business logic |
| `utils/` | Pure utility functions |
| `components/` | UI presentation only |
| `__tests__/` | Unit & integration tests |
| `locales/` | i18n translations |

---

## File Naming Conventions

| File Type | Pattern | Example |
|-----------|---------|---------|
| Types | `[feature].types.ts` | `product.types.ts` |
| Constants | `[feature].constants.ts` | `product.constants.ts` |
| Service | `[feature].service.ts` | `product.service.ts` |
| Data Hooks | `[feature].ts` | `product.ts` |
| Business Hook | `use[Feature].ts` | `useProduct.ts` |
| Form Hook | `use[Feature]Form.ts` | `useProductForm.ts` |
| Main Component | `[Feature].tsx` | `Product.tsx` |
| Skeleton | `[Feature]Skeleton.tsx` | `ProductSkeleton.tsx` |

---

## Quick Reference

### Types (`types/[feature].types.ts`)
```typescript
export interface Product { ... }
export interface CreateProductInput { ... }
export interface UpdateProductInput { ... }
export interface ProductFilters { ... }
```

### Constants (`constants/[feature].constants.ts`)
```typescript
export const QUERY_KEY = 'products';
export const DEFAULT_VALUES = { ... };
export enum ProductStatus { ... }
```

### Service (`services/[feature].service.ts`)
```typescript
export const productApi = {
  getAll: (filters?) => ...,
  getById: (id) => ...,
  create: (data) => ...,
  update: (id, data) => ...,
  delete: (id) => ...,
};
```

### Data Hooks (`hooks/[feature].ts`)
```typescript
export const useProducts = (filters?) => useQuery(...);
export const useProduct = (id) => useQuery(...);
export const useCreateProduct = () => useMutation(...);
export const useUpdateProduct = () => useMutation(...);
export const useDeleteProduct = () => useMutation(...);
```

### Business Hook (`hooks/use[Feature].ts`)
```typescript
export const useProduct = () => {
  // Returns: data, handlers, modal state, loading states
};
```

### Form Hook (`hooks/use[Feature]Form.ts`)
```typescript
export const useProductForm = (mode, entity?, onSuccess?) => {
  // Returns: form, handleSubmit, handleReset, isPending
};
```

---

## Shared Form Components (`src/components/forms/`)

All `CreateForm` and `EditForm` components **must** use these shared building blocks instead of raw HTML inputs or custom wrappers.

| Component | Import | Use for |
|-----------|--------|---------|
| `FormContainer` | `@/components/forms/FormContainer` | Form shell (title, error, success, submit handler, footer) |
| `RHFInput` | `@/components/forms/RHFInput` | Text / number / email / password inputs |
| `RHFSelect` | `@/components/forms/RHFSelect` | Dropdown selects |
| `RHFTextArea` | `@/components/forms/RHFTextArea` | Multi-line text |
| `RHFCheckbox` | `@/components/forms/RHFCheckbox` | Checkbox fields |
| `RHFSwitch` | `@/components/forms/RHFSwitch` | Toggle / switch fields |

> All `RHF*` components require a `methods` prop (`UseFormReturn<T>`) and a `name` prop that maps to a field in the form schema. Wire them directly to the `form` object returned by `use[Feature]Form`.

### Create / Edit Form pattern (`components/CreateForm/Create[Feature].tsx`)
```typescript
import { FormContainer } from "@/components/forms/FormContainer";
import { RHFInput } from "@/components/forms/RHFInput";
import { RHFSelect } from "@/components/forms/RHFSelect";
import { RHFTextArea } from "@/components/forms/RHFTextArea";
import { RHFCheckbox } from "@/components/forms/RHFCheckbox";
import { RHFSwitch } from "@/components/forms/RHFSwitch";
import { useProductForm } from "../../hooks/useProductForm";

export function CreateProduct({ onSuccess }: { onSuccess?: () => void }) {
  const { form, handleSubmit, isPending } = useProductForm("create", undefined, onSuccess);

  return (
    <FormContainer
      title="Create Product"
      onSubmit={form.handleSubmit(handleSubmit)}
      error={...}
      footer={<button type="submit" disabled={isPending}>Save</button>}
    >
      <RHFInput   methods={form} name="name"     label="Name" />
      <RHFSelect  methods={form} name="status"   label="Status" options={...} />
      <RHFTextArea methods={form} name="description" label="Description" />
      <RHFCheckbox methods={form} name="isActive" label="Active" />
      <RHFSwitch  methods={form} name="featured" label="Featured" />
    </FormContainer>
  );
}
```

> `EditForm/Edit[Feature].tsx` follows the same pattern with `mode="edit"` and `entity` passed to `use[Feature]Form`.
