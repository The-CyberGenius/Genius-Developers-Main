import { revalidatePath } from "next/cache";

/**
 * Revalidates the main portfolio page cache.
 * Called after any admin-side data modification.
 */
export const revalidatePortfolio = () => {
  revalidatePath("/");
};
