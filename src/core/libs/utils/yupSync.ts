import type { AnyObjectSchema } from 'yup';

/**
 * Cầu nối giữa Yup Schema và Ant Design Form Rules
 * @param schema - Yup Schema dùng để validate
 * @returns Một validator function mà Ant Design có thể hiểu
 */
export const yupSync = (schema: AnyObjectSchema) => ({
  async validator({ field }: any, value: any) {
    await schema.validateAt(field, { [field]: value });
  },
});
